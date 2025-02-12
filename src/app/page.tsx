"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome!</h1>
      
      {/* Buttons for Sign Up and Sign In */}
      <div className="flex space-x-4">
        <Link href="/sign-up">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            Sign Up
          </button>
        </Link>

        <Link href="/sign-in">
          <button className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-700">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
