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
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <nav className="relative rounded-full border border-transparent
       dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6">
        <NavItem link="/?page=home" item="Home" />
        <NavItem link="/?page=aipage" item="AI ASSISTANT" />
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
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
    </Link>
  );
};

export default Navbar;
