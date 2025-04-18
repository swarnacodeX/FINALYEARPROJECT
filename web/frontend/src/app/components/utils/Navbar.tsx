"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import bgImage from "./navbar.jpg"; // Make sure this image exists in the same folder

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const Navbar = ({ className }: { className?: string }) => {
  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      
      <div className="absolute inset-0 z-[-1] rounded-full overflow-hidden">
        <Image
          src={bgImage}
          alt="Navbar background"
          layout="fill"
          objectFit="cover"
          quality={100}
          // optional: add transparency
        />
      </div>

      {/* Navbar Content */}
      <nav
        className="relative rounded-full border border-transparent dark:border-white/[0.2] 
        shadow-input flex justify-center space-x-4 px-8 py-6 backdrop-blur-md bg-black/30"
      >
        <NavItem link="/?page=home" item="HOME" />
        <NavItem link="/?page=chatbot" item="AI ASSISTANT" />
        <NavItem link="/?page=healthrecords" item="HEALTH RECORDS" />
        <NavItem link="/?page=profile" item="PROFILE" />
      </nav>
    </div>
  );
};

const NavItem = ({ link, item }: { link: string; item: string }) => {
  return (
    <Link href={link} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer hover:opacity-[0.9] text-white"
      >
        {item}
      </motion.p>
    </Link>
  );
};

export default Navbar;
