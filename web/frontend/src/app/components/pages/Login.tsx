"use client";
import { cn } from "@/lib/utils";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { useRouter } from "next/navigation";
import { useStore } from "../utils/storeZustand";
import axios from "axios";
import medai from '../../../../public/WELCOME.png'; // Import the image

export default function Login() {
  const email = useRef<HTMLInputElement>(null);
  const [loginError, setLoginError] = useState<string>("");
  const setEmail = useStore((state) => state.setEmail);
  const password = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      router.push("/?page=home");
    }
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.current) {
      setLoginError("Email input is not available.");
      return;
    }

    if (!email.current.value || !password.current) {
      setLoginError("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8001/api/user/login", {
        email: email.current?.value,
        password: password.current?.value,
      });

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("accesstoken", response.data.accesstoken);
        localStorage.setItem("email", email.current.value);
        localStorage.setItem("firstname", response.data.firstname);
        localStorage.setItem("lastname", response.data.lastname);
        setEmail(email.current.value);
        router.push("/?page=home"); // Redirect to home page after successful login
      } else {
        setLoginError("Login failed. Please try again.");
      }
    } catch (error) {
      setLoginError("Invalid email or password.");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Image in top left corner */}
      <img
        src={medai.src}
        alt="Welcome"
        className="absolute top-4 left-4 w-64 h-32" // Adjust size as needed
      />

      <div className="relative max-w-md w-full mx-auto mt-10 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Med-AI
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          LOGIN
        </p>
        <form className="my-8" onSubmit={handleSubmit}>
          {loginError && (
            <p className="text-red-500 text-sm mb-4">{loginError}</p>
          )}

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              ref={email}
              placeholder="user@gmail.com"
              type="email"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              ref={password}
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block
           dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]
            dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            onClick={handleSubmit}
          >
            Login &rarr;
            <BottomGradient />
          </button>
          <h3 className="mt-4">Don't have an Account?</h3>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full
           text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
           dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission
              router.push("/?page=signup"); // Navigate to signup
            }}
          >
            Register
          </button>
        </form>
      </div>
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

export const LabelInputContainer = ({
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
