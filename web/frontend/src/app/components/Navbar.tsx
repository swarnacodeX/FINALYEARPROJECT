"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../../components/ui/navbar-menu";
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
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="HOME">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/?route=home">Home</HoveredLink>
            
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="AI Assistant">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              
              description="Prepare for tech interviews like never before."
            />
           
          </div>
        </MenuItem>
       
        <MenuItem  setActive={setActive} active={active} item="PROFILE">
        <div className="  text-sm grid grid-cols-2 gap-10 p-4">
        <ProductItem
              title="Profile"
              href="https://algochurn.com"
              
              description="Prepare for tech interviews like never before."
            />

        </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="HEALTH RECORDS">
          <div className="flex flex-col space-y-4 text-sm">
          <ProductItem
              title="Store Medical Data"
              href="/?route=medrecord"
              
              description="Your medical data storehouse"
            />
            
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
