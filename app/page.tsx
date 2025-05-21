"use client";
import Chatbot from "./chatbot/Chatbot";

export default function ChatbotPage() {

  return (
    <div className="min-h-screen items-center p-6 flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to the WI Chatbot!</h1>

      <Chatbot />
    </div>
  );
}
