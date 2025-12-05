import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);

  const navigate = useNavigate();

  // local storage

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const saved = localStorage.getItem(`chatMessage_${userId}`);
    setMessage(saved ? JSON.parse(saved) : []);
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!input) return;
    // user msg
    setInput("");
    const setMsg = [...message, { sender: "user", text: input }];
    setMessage(setMsg);

    const token = localStorage.getItem("token");
    console.log("access token", token);
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
    console.log(res);

    // bot

    const botReplay = { sender: "bot", text: data.ai_message.content };
    const updatedMessage = [...setMsg, botReplay];
    setMessage(updatedMessage);
    const userId = localStorage.getItem("userId");
    localStorage.setItem(
      `chatMessage_${userId}`,
      JSON.stringify(updatedMessage)
    );
    console.log("Saving chat for user:", userId);

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
                  msg.sender === "user"
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
