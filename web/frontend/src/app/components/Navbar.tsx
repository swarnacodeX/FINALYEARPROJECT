"use client";
import React, { useState } from "react";
import { Menu, MenuItem} from "../../components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu>
        <MenuItem  item="Home" >
        
        </MenuItem>
        <MenuItem item="AI ASSISTANT">
         
        </MenuItem>
       
        <MenuItem  item="HEALTH RECORDS">
       
        </MenuItem>
        <MenuItem  item="PROFILE">
       
        </MenuItem>
       
      </Menu>
    </div>
  );
}
