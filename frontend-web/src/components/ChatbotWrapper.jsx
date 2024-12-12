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
    //const chatPrompt = `Return it as a JSON object with only one key "answer" containing the message. For example, {"answer": "your answer here"}. Only return the JSON object, in any case dont put any other wording apart from the answer expected in the start of your answer. Input: "${prompt}"`;

//     const chatPrompt = `You are a chatbot designed to answer questions about the ShikshaSangam platform. Respond to user queries in the following format: Return it as a JSON object with only one key "answer" containing the message. For example, {"answer": "your answer here"}. Only return the JSON object, in any case don't put any other wording apart from the answer expected in the start of your answer. Input: "${prompt}"

// Answer questions based on the following headers:
// 1. Welcome to ShikshaSangam! How can I assist you today? (General inquiries about the platform)
// 2. Looking for guidance? Ask me anything about career advice, alumni interactions, or mentorship!
// 3. Need help navigating ShikshaSangam? I'm here to help!
// 4. Have questions about your profile or account settings? Let me guide you!
// 5. Interested in connecting with alumni or students? Ask me how!
// 6. Stuck somewhere? I'm here to answer common questions about ShikshaSangam!
// 7. Want to learn about ShikshaSangam’s features? Just ask!

// Respond accurately based on the user’s input while ensuring the answer is specific and concise."`

const chatPrompt = `You are a chatbot designed to answer questions about the ShikshaSangam platform. Respond to user queries in the following format: Return it as a JSON object with only one key \"answer\" containing the message. For example, {\"answer\": \"your answer here\"}. Only return the JSON object, in any case don't put any other wording apart from the answer expected in the start of your answer. Input: \"${prompt}\"

Answer questions based on the following headers:
1. Welcome to ShikshaSangam! How can I assist you today? (General inquiries about the platform)
2. Looking for guidance? Ask me anything about career advice, alumni interactions, or mentorship!
3. Need help navigating ShikshaSangam? I'm here to help!
4. Have questions about your profile or account settings? Let me guide you!
5. Interested in connecting with alumni or students? Ask me how!
6. Stuck somewhere? I'm here to answer common questions about ShikshaSangam!
7. Want to learn about ShikshaSangam’s features? Just ask!
8. Want to know about ongoing events? Here are the details of current events:

when answering about events please convey the necessary and describe in brief in the input asks for it.

EVENT 1 : **Smart India Hackathon (SIH) 2024**
- Description: Smart India Hackathon (SIH) 2024 is a nationwide innovation initiative by the Ministry of Education, encouraging students to solve real-world challenges through creativity and collaboration. It features two tracks—Software (digital solutions) and Hardware (physical prototypes)—across themes like healthcare, education, sustainability, and more. Participants gain mentorship, teamwork experience, and exposure to industry leaders, with winners receiving cash prizes and opportunities for large-scale implementation. SIH 2024 aims to foster innovation, entrepreneurship, and technological advancement in India.
- Timings: Starts at 4:38 AM
- Entry Fees: Free
- Category & Type: Innovation
- Prizes Worth:
  - First Prize: ₹100000
  - Second Prize: ₹50000
  - Third Prize: ₹25000
- Organised by: LPU Innovation Studio
- Location: Innovation Studio Block 39, Innovation Studio, LPU Punjab Jalandhar
- Organizer Contacts:
  - Dr. A.K. Sharma (Director, Ministry of Education): aksharma@education.nic.in
  - Suresh Gupta (CEO, Tech Solutions Pvt. Ltd.): suresh@techsolutions.in
  - Priya Verma (Event Coordinator): priyaverma@eventmanagement.co.in
- Event Plan:
  - Day 1 (9:00 AM - 3:00 PM):
    - Welcome Address by Dr. A.K. Sharma
    - Keynote Speech by John Doe, CEO of Tech Innovations
    - Team Formation & Ideation Session
    - Introduction to Problem Statements:
      - Problem 1: Smart Traffic Management
      - Problem 2: AI-based Health Monitoring System
  - Day 2 (10:00 AM - 4:00 PM):
    - Mentorship Sessions with Industry Experts
    - Development of Solutions
    - Final Presentations and Judging
    - Announcement of Winners & Prize Distribution:
      - 1st Place: ₹1,00,000
      - 2nd Place: ₹50,000
      - 3rd Place: ₹25,000
- Logistics:
  - Mentorship: Engage experienced mentors from various industries
  - Venue Setup: Online platform (Zoom and Slack) for seamless collaboration
  - Communication: Utilize collaborative tools like Trello, Notion, and GitHub
  - Safety & Security: Implement security protocols for online participation

EVENT 2 : **Global Alumni Leadership Summit 2024**
- Description: The Global Alumni Leadership Summit brings together accomplished alumni from diverse industries to foster networking, share insights, and explore collaborative opportunities. This annual event aims to strengthen the alumni community, provide mentorship, and create a platform for knowledge exchange and professional growth.
- Timings: Starts at 5:22 AM
- Entry Fees: ₹2500
- Category & Type: Networking Conference
- Organised by: Alumni Relations Office, Indian Institute of Management
- Organizer Contacts:
  - Dr. Rahul Mehta (Director of Alumni Relations): rahul.mehta@iim.edu.in
  - Priya Singh (Event Coordinator): priya.alumni@iim.edu.in
  - Arun Sharma (Senior Alumni Engagement Manager): arun.sharma@iim.edu.in
- Event Plan:
  - Day 1 (9:00 AM - 5:00 PM):
    - Keynote Address by Global Business Leader
    - Panel Discussion: 'Future of Leadership in a Changing World'
    - Industry Sector Breakout Sessions
    - Networking Lunch
    - Alumni Success Stories Showcase
    - Mentorship Matching Workshop
  - Day 2 (9:00 AM - 4:00 PM):
    - Innovation and Entrepreneurship Pitch Session
    - Career Development Workshops
    - Cross-Industry Networking Roundtables
    - Closing Remarks and Future Vision Discussion
    - Networking Cocktail Reception

Respond accurately based on the user’s input while ensuring the answer is specific and concise.`;


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
            width: "350px",
            height: "500px",
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


