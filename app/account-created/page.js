"use client";

import { useRouter } from "next/navigation";

export default function AccountCreated() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Account Created!</h1>
        <p className="text-gray-700 mb-6">You can now log in with your credentials.</p>
        <button
          onClick={() => router.push("/login")}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
