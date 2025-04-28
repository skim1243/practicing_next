"use client";

import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard!</h1>
        <p className="text-gray-600 mb-6">You're now logged in. 🎉</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
