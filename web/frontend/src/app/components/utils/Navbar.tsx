"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
    <div className={cn("fixed top-6 inset-x-0 flex justify-center z-50", className)}>
      {/* Shrink Navbar */}
      <nav
        className="relative rounded-full border border-gray-300 shadow-lg
        flex justify-center items-center space-x-10
        px-10 py-4 backdrop-blur-md bg-white/80
        max-w-[600px] w-full"
      >
        <NavItem link="/?page=home" item="Home" />
        <NavItem link="/?page=chatbot" item="AI Assistant" />
        <NavItem link="/?page=healthrecords" item="Health Records" />
        <NavItem link="/?page=profile" item="Profile" />
      </nav>
    </div>
  );
};

const NavItem = ({ link, item }: { link: string; item: string }) => {
  return (
    <Link href={link} className="relative group">
      <motion.p
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="cursor-pointer text-gray-800 text-sm font-semibold tracking-wide
        group-hover:text-black transition-all"
      >
        {item}
        <span
          className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black rounded-full
          group-hover:w-full transition-all duration-300 ease-in-out"
        />
      </motion.p>
    </Link>
  );
};

export default Navbar;
