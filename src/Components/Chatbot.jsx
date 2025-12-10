import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId") || "";
  

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    fetch(`https://api.winaclaim.com/api/chat/?session_id=${sessionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    })
    
      .then((res) => res.json())
      .then((data) => {setMessages(data.messages)}
      
      );
  }, [sessionId, token]);
  

  const handleClick = async (e) => {
    e.preventDefault();
    if (!input) return alert("input have not");

    if (!token) {
      navigate("/login");
      return;
    }

    // Add user message to UI
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    

    // Send user message to backend
    const res = await fetch("https://api.winaclaim.com/api/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: input,
        session_id: sessionId || "",
      }),
    });

    const data = await res.json();

    console.log(data);

    if (data.session?.session_id) {
      setMessages(data.session.session_id);
    }

    // Add bot reply to UI
    const botReply = {
      content: '',
      flag_type: null,
      flagged: null,
      id: 791,
      sender: null,
      session: null,
      timestamp: null,
      user: null,
    };
    console.log(botReply.content)

    setMessages((prev) => [...prev,botReply]);
    
    setInput("");
  };

  return (
    <div className="bg-[#D8FFEA] min-h-screen">
      <div className="w-10/12 mx-auto flex flex-col pt-6">
        <h1 className="text-2xl font-bold text-green-500 mb-4">
          Introducing Monica
        </h1>

        <div className="flex-1 overflow-y-auto h-[70vh]">
          {messages.map((msg, i) => (
            <p
              key={i}
              className={`my-2 ${
                msg.sender === "User" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`px-4 py-2 rounded-2xl inline-block max-w-[70%] ${
                  msg.sender === "User"
                    ? "bg-gray-400 text-white"
                    : "bg-green-300"
                }`}
              >
                {msg.content}
              </span>
            </p>
          ))}
        </div>

        <div className="flex gap-2 mt-4 mb-6">
          <input
            type="text"
            className="w-full rounded-full border-2 border-green-500 p-2 bg-white"
            value={input}
            placeholder="Type your message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleClick}
            className="bg-green-500 text-white px-4 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
