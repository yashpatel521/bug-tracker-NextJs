"use client";
import { User } from "@/types";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <button
          onClick={() => signIn()}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Sign In
        </button>
      </main>
    );
  }

  // Log session and user data to inspect
  console.log("Session Data:", session);
  const user = session.user as User;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* User Info Section */}
      <section className="mt-8 p-4 rounded-lg shadow-md bg-gray-10">
        <h2 className="text-2xl font-semibold">User Information</h2>
        <p>
          <strong>First Name:</strong> {user.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Status:</strong> {user.status}
        </p>

        <button
          onClick={() => signOut()}
          className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Sign Out
        </button>
      </section>
    </main>
  );
}
