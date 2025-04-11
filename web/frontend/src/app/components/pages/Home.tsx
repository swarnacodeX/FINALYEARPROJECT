"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BentoGrid, BentoGridItem } from "../../../components/ui/bento-grid"; // Adjust import paths
import Navbar from "../utils/Navbar";
import { IconClipboardCopy, IconFileBroken, IconLogout } from "@tabler/icons-react";

// Sample items for BentoGrid
const items = [
  {
    title: "STORE MEDICAL RECORDS AND PRESCRIPTIONS",
    description: "Don't search your cupboard, instead, visit us",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Get AI Assistance",
    description: "Dive into the intelligence of technology",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
];

export default function HomePage() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    setAccessToken(token);
    if (!token) {
      router.push("/?page=login"); // Fix query parameter
    }
  }, [router]); // Add router as a dependency

  const handleLogout = () => {
    localStorage.removeItem("accesstoken"); // Clear token on logout
    setAccessToken(null);
    router.push("/?page=login"); // Redirect to login
  };

  return (
    <div>
      <Navbar />

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 flex items-center px-4 py-2 text-black bg-white 
         hover:bg-black hover:text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 
         focus:ring-white focus:ring-offset-2 transition ease-in-out duration-200"
      >
        <IconLogout className="h-5 w-5 mr-2" />
        Logout
      </button>

      <BentoGrid className="max-w-4xl mx-auto mt-32">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
