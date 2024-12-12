import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTES } from "../routes/apiRoute";
import Groq from "groq-sdk";


const ChatbotWrapper = () => {
  const [isOpen, setIsOpen] = useState(false); // is chat bot open
  const [messages, setMessages] = useState([]);  // sender text object state
  const [userMessage, setUserMessage] = useState("");  // text input state
  const [isAIProcessing, setIsAIProcessing] = useState(false);


  const groq = new Groq({
    apiKey: import.meta.env.VITE_REACT_APP_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // New function to handle AI bot response
  const handleAIBotResponse = async (prompt) => {
    setIsAIProcessing(true);

    // Modify the prompt to ask for a specific format
    const chatPrompt = `Return it as a JSON object with only one key "answer" containing the message. For example, {"answer": "your answer here"}. Only return the JSON object, in any case dont put any other wording apart from the answer expected in the start of your answer. Input: "${prompt}"`;

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: chatPrompt,
          },
        ],
        model: "llama3-8b-8192", // Ensure this model is available in your API
      });

      // Extract the AI response
      const aiResponse = chatCompletion.choices[0]?.message?.content || "{}";

      // Try parsing the response as JSON
      let decodedResponse;
      try {
        decodedResponse = JSON.parse(aiResponse);
      } catch (error) {
        console.error("Failed to parse AI response:", error);
        decodedResponse = {}; // fallback in case parsing fails
      }

      // Extract the rewritten message from the decoded JSON
      const answer = decodedResponse.answer || "No valid response";
      setIsAIProcessing(false);
      return {
        sender: "bot",
        text: answer
      };
    } catch (error) {
      console.error("AI response error:", error);
      showNotification({
        message: "Failed to get AI response",
        variant: "danger",
      });
      setIsAIProcessing(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-messages");
    if(chatContainer){
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (userMessage.trim() === "" || isAIProcessing) return;
    setMessages([...messages, { sender: "user", text: userMessage }]);

    try {
      const botMessage = await handleAIBotResponse(userMessage);

      setMessages((prevMessages) => [
        ...prevMessages,
        botMessage
      ]);

    } catch (error) {
      console.log(error);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Error communicating with server." },
      ]);
    }
    setUserMessage("");
  };

  return (
    <div
      style={{ position: "fixed", bottom: "20px", left: "20px", zIndex: 1000 }}
    >
      {!isOpen ? (
        <div
          onClick={toggleChat}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#001f3f",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <span style={{ color: "#fff", fontSize: "20px" }}>💬</span>
        </div>
      ) : (
        <div
          style={{
            width: "300px",
            height: "400px",
            backgroundColor: "#001f3f",
            color: "#fff",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              padding: "10px",
              backgroundColor: "#00264d",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Chatbot
            <span
              onClick={toggleChat}
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                color: "red",
              }}
            >
              ✖
            </span>
          </div>
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.sender === "user" ? "#004080" : "#004d99",
                  padding: "8px",
                  borderRadius: "10px",
                  maxWidth: "80%",
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #003366",
            }}
          >
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "5px",
                border: "none",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: "10px",
                padding: "8px 12px",
                backgroundColor: "#004080",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWrapper;
