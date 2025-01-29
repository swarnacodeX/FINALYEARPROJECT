"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { BentoGrid, BentoGridItem } from "../../../components/ui/bento-grid"; // Adjust the import paths as needed
import Navbar from "../utils/Navbar"; // Import NavbarDemo
import {IconClipboardCopy, IconFileBroken } from "@tabler/icons-react";
// Sample items for BentoGrid
const items = [
  {
    title: "STORE MEDICAL RECORDS AND PRESCRIPTIONS",
    description: "Dont search your cupboard, instead, visit us",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Get AI Assistance",
    description: "Dive into the intelligence of technology",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  
  
];

// HomePage Component
export default function HomePage() {
  const router = useRouter();

  
  return (
    <div>
      <Navbar />
      
      <BentoGrid className="max-w-4xl mx-auto mt-32"> {/* Increased margin-top for more spacing */}
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
