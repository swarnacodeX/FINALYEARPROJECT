"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Login from "@/app/components/pages/Login";
import HomePage from "@/app/components/pages/Home";
import SignUp from "@/app/components/pages/SignUp";
import RecordPage from "@/app/components/pages/HealthRecords";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const route = searchParams.get("route");

  // Store token persistently
  const accToken = useRef<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    accToken.current = sessionStorage.getItem("accessToken");

    if (!accToken.current) {
      // If not logged in and not on signup, redirect to login
      if (route !== "signup") {
        router.replace("/?route=login");
      }
    } else {
      // If logged in and on login or signup, redirect to home
      if (!route || route === "login" || route === "signup") {
        router.replace("/?route=home");
      }
    }

    setIsLoaded(true);
  }, [route, router]);

  // Instead of returning null, use an empty div to prevent invalid returns
  if (!isLoaded) return <div>Loading...</div>;

  // If not logged in, allow access to login and signup pages
  if (!accToken.current) {
    return <div className="p-4">{route === "signup" ? <SignUp /> : <Login />}</div>;
  }

  // If logged in, render the correct page
  return (
    <div className="p-4">
      {route === "home" && <HomePage />}
      {route === "healthrecords" && <RecordPage />}
    </div>
  );
}
