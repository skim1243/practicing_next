"use client";

import { useEffect, useRef, useState } from "react";

export default function Chatbot() {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!query.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    setLoading(true);
    setQuery("");

    try {
      const res = await fetch("/api/rag", {
        method: "POST",
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {show ? (
        <div className="w-[90vw] sm:w-96 bg-white border shadow-lg rounded-lg flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <h2 className="text-lg font-bold">Chatbot</h2>
            <button
              onClick={() => setShow(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 max-h-80 overflow-y-auto px-4 py-2 space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm ${msg.sender === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === "user" ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && (
              <div className="text-left text-sm text-gray-500">
                <span className="inline-block px-3 py-2 rounded-lg bg-gray-100 animate-pulse">
                  Thinking...
                </span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="flex border-t px-2 py-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
              className="flex-1 px-2 py-1 text-sm border rounded-l outline-none disabled:opacity-50"
              placeholder="Ask something..."
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-500 text-white px-3 py-1 rounded-r text-sm hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShow(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          💬
        </button>
      )}
    </div>
  );
}
