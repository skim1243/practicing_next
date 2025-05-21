"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase-config";
import Chatbot from "../chatbot/Chatbot";
import type { User } from "firebase/auth";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
  const unsub = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) setUser(currentUser);
    else router.push("/login");
  });
  return () => unsub();
}, [router]); // ✅ stable dependency array


  const logout = () => {
    signOut(auth);
    router.push("/login");
  };

  return (
    <div className="min-h-screen items-center p-6 flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.email}</h1>

      <button
        onClick={logout}
        className="w-1/4 bg-red-500 text-white px-2 py-1 text-sm rounded"
      >
        Logout
      </button>
      <Chatbot />
    </div>
  );
}
