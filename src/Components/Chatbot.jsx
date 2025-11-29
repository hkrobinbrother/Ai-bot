import React, { useState } from "react";
import { useNavigate } from "react-router";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    // user msg
    setInput('')
    const setMsg = [...message, { sender: "user", text: input }];
    setMessage(setMsg);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // api
    const res = await fetch("https://api.winaclaim.com/api/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: input }),
    });
    const data = await res.json();
    // bot
    console.log(data.ai_message.content);
    const contentText = data.ai_message.content;

    setMessage([...setMsg, { sender: "bot", text: contentText }]);
    
  };
  return (
    <div className=" bg-[#D8FFEA]">
      <div className="w-10/12 mx-auto min-h-screen flex flex-col">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mt-8 text-green-500">
            Introducing Monica
          </h1>
          {message.map((msg, i) => (
            <p
              key={i}
              className={`my-2 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              
              <span
                className={`px-4 py-2 rounded-2xl inline-block max-w-[70%] ${
                  message.sender
                    ? " bg-gray-400 px-4 p-2"
                    : "bg-green-300 px-4 p-2  rounded-lg"
                }`}
              >
                {msg.text}
              </span>
            </p>
          ))}
        </div>
        <div className="flex gap-2 mt-4 justify-end mb-4">
          <input
            type="text"
            className="w-full rounded-full border-2 border-green-500 p-2 bg-white"
            value={input}
            placeholder="Type your massage"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleClick}
            className=" bg-green-400 rounded-lg px-4 "
          >
            click
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
