"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";

const AdminPage = () => {
    const router = useRouter();
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const userSession = await getSession();
                if (!userSession) {
                    setError("Unauthorized access. Redirecting...");
                    setTimeout(() => router.push("/sign-in"), 2000);
                } else {
                    setSession(userSession);
                }
            } catch (error) {
                console.error("Error fetching session:", error);
                setError("An error occurred while fetching user data.");
            } finally {
                setLoading(false);
            }
        };
        fetchSession();
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {loading ? (
                <h2 className="text-2xl mb-4">Loading...</h2>
            ) : error ? (
                <>
                    <h2 className="text-2xl mb-4 text-red-500">{error}</h2>
                    <button
                        onClick={() => router.push("/sign-in")}
                        className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-700 mt-4"
                    >
                        Sign In
                    </button>
                </>
            ) : session?.user ? (
                <>
                    <h2 className="text-2xl mb-4">
                        Admin Dashboard - Welcome back, {session.user.username}!
                    </h2>
                    <p className="mb-4">Email: {session.user.email}</p>
                    <p className="mb-4">Role: {session.user.role}</p>
                    
                    <button
                        onClick={() => router.push("/")}
                        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 mb-4"
                    >
                        Go to Home
                    </button>

                    <button
                        onClick={() => signOut()}
                        className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-700"
                    >
                        Sign Out
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-2xl mb-4">Redirecting to login...</h2>
                    <button
                        onClick={() => router.push("/sign-in")}
                        className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-700 mt-4"
                    >
                        Sign In
                    </button>
                </>
            )}
        </div>
    );
};

export default AdminPage;
