"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "./components/storeZustand";
import Login from "@/app/components/Login";
import HomePage from "@/app/components/Home";
import SignUp from "@/app/components/SignUp";
import recordPage from "./components/HealthRecords";


export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const route = searchParams.get("route");
  const [accToken, setAccToken] = useState<string | null>(null);
  const setEmail = useStore((state) => state.setEmail);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setAccToken(token); // Set the access token in state
    if (!token) {
      router.push("/?route=signup");
    } else {
      router.push("/?route=home"); // Redirect to dashboard or home if authenticated
    }
  }, [router]);

  return (
    <div>
      <nav>
        {accToken === null && ( // Ensure to check the state instead
          <>
            <a href="/?route=signup"></a>
            <a href="/?route=login"></a>
            <a href="/?route=home"></a>
            <a href="/?route=healthrecord"></a>
          </>
        )}
      </nav>

      <div>
        {route=="medrecord" && <recordPage/>}
        {route === "home" && <HomePage />}
        {route === "signup" && <SignUp />}
        {route === "login" && <Login />}
      </div>
    </div>
  );
}
