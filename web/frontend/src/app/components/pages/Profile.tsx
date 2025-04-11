"use client";

import { Card } from "@/components/ui/card"; // optional, or replace with a <div>

export default function Profile() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Full-stack developer. Coffee lover. Open-source contributor.",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white dark:bg-zinc-900 text-center">
      <img
        src={user.avatar}
        alt="User Avatar"
        className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"
      />
      <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
      <p className="text-zinc-500">{user.email}</p>
      <p className="mt-2 text-zinc-600 dark:text-zinc-300">{user.bio}</p>
    </Card>
  );
}
