import React, { useState } from "react";
import axios from "axios";

const ChatbotWrapper = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = async () => {
        if (userMessage.trim() === "") return;
        setMessages([...messages, { sender: "user", text: userMessage }]);

        try {
            const response = await axios.post("/api/chatbot/query/", {
                message: userMessage,
            });
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: response.data.reply },
            ]);
        } catch (error) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: "Error communicating with server." },
            ]);
        }
        setUserMessage("");
    };

    return (
        <div style={{ position: "fixed", bottom: "20px", left: "20px", zIndex: 1000 }}>
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
                                    backgroundColor: msg.sender === "user" ? "#004080" : "#004d99",
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
