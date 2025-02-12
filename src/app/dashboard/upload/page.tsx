"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";

const UploadTeamPage = () => {
    const router = useRouter();
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const userSession = await getSession();
            setSession(userSession);
            setLoading(false);
        };
        fetchSession();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {loading ? (
                <h2 className="text-2xl mb-4">Loading...</h2>
            ) : session?.user ? (
                <>
                    <h2 className="text-2xl mb-4">
                        Upload Team Dashboard - Welcome, {session.user.username}!
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
                <h2 className="text-2xl mb-4">Unauthorized Access</h2>
            )}
        </div>
    );
};

export default UploadTeamPage;
