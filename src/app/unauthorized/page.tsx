"use client";

import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl text-red-500 mb-4">Access Denied</h2>
      <p className="text-lg mb-4">You do not have permission to view this page.</p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Go to Home
      </button>
    </div>
  );
};

export default UnauthorizedPage;
