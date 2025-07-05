"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {session ? (
        <div>
          <p>Welcome {session.user?.name}. Hope you enjoy our platform!</p>
          <button
            className="px-2 py-1 bg-blue-200 hover:cursor-pointer"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <p>If you haven&apos;t signed in, please sign in</p>
          <button
            className="px-2 py-1 bg-blue-200 hover:cursor-pointer"
            onClick={() => signIn("google")}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}
