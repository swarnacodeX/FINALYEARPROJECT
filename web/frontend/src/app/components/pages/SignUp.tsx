"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import { IconArrowBigRightLineFilled } from "@tabler/icons-react";
import axios from "axios";
import { useStore } from "../utils/storeZustand";
export default function SignUp() {
  const router = useRouter();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [signuperror, setSignuperror] = useState("");
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (email.current?.value && email.current?.value.length >= 7 && 
      firstname.current?.value && firstname.current?.value.length > 0 
      && lastname.current?.value && lastname.current?.value.length > 0
       && password.current?.value && password.current?.value.length > 0) 
      {
      try {
        const response = await axios.post("http://localhost:8081/api/user/signup", {
          email: email.current?.value,
          firstname: firstname.current?.value,
          lastname: lastname.current?.value,
          password: password.current?.value,
        });
        if (response.status === 200 || response.status === 201) {
          localStorage.setItem("accesstoken", response.data.accessToken);
          localStorage.setItem("email", email.current?.value);
          useStore.setState({ email: email.current?.value });
          router.push("/?page=home");
        } else {
          setSignuperror("Error while signing up");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        setSignuperror("An error occurred. Please try again.");
      }
    } else {
      setSignuperror("Please fill all the fields correctly.");
    }
  }

  return (
    <div className="max-w-md w-full mx-auto mt-10 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Med-AI
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        SIGN-UP
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {signuperror && (
          <p className="text-red-500 text-sm mb-4">{signuperror}</p>
        )}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" ref={firstname} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" ref={lastname} />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="user@gmail.com" type="email" ref={email} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" ref={password} />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900
          dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full
          text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
          dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="flex flex-col space-y-4 mt-4">
          <p className="text-neutral-600 text-sm max-w-sm dark:text-neutral-300">
            ALREADY A USER?
          </p>
          <button
            onClick={() => router.push("/?page=login")}
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <IconArrowBigRightLineFilled className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              LOGIN
            </span>
            <BottomGradient />
          </button>
        </div>
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
