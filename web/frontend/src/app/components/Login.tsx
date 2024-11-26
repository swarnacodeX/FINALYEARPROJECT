"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useRouter } from "next/navigation";
import {useStore} from "../components/storeZustand";
import { cn } from "@/lib/utils";
import axios from 'axios';
// import {
//   IconArrowBigRightLineFilled,
//   IconBrandGithub,
//   IconBrandGoogle,
//   IconBrandOnlyfans,
// } from "@tabler/icons-react";

export default function Login() {
  const [email,setEmailTemp]=useState('');
  const [loginerror,setLoginerror]=useState('');
  const setEmail = useStore((state) => state.setEmail);
  const [password,setPassword]=useState('');
  const router=useRouter();
  
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/user/login", {
        email,
        password
      });

      if (response.status === 200 || response.status===201) {
        setEmail(email);
        console.log("User created:", response.data);
        // Redirect to login page or dashboard after successful signup
        sessionStorage.setItem("accessToken",response.data.accessToken);
        router.push("/?route=home");
      } else {
        console.error("Failed to sign up:", response.data);
      }
    } catch (error) {
      return setLoginerror("Invalid email or password")
    }
    console.log("Form submitted");
  };
  return (
    <div className="max-w-md w-full mx-auto mt-10 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Med-AI
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        LOGIN
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {loginerror}
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" value={email} placeholder="user@gmail.com" type="email" onChange={(e)=>setEmailTemp(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" type="password" />
        </LabelInputContainer>
       

        <button
          className="bg-gradient-to-br relative group/btn from-black
           dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block
            dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium 
            shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]
             dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>



        
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
