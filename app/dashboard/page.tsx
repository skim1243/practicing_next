"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      const botMessage = data.reply;

      setMessages((prev) => [...prev, { sender: "bot", text: botMessage }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error getting response." }]);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Welcome to the Dashboard!</h1>

      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg"
      >
        💬
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white border rounded-2xl shadow-lg w-80 max-h-[500px] flex flex-col overflow-hidden">
          <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
            <span>Chatbot</span>
            <button onClick={toggleChat} className="text-white font-bold">
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === "user" ? "bg-blue-200" : "bg-gray-300"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div className="p-2 border-t flex">
            <input
              className="flex-1 border p-2 rounded-xl"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-xl ml-2 hover:bg-blue-600"
              onClick={sendMessage}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
