"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Login from "@/app/components/pages/Login";
import HomePage from "@/app/components/pages/Home";
import SignUp from "@/app/components/pages/SignUp";
import RecordPage from "@/app/components/pages/HealthRecords";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeWithParams />
    </Suspense>
  );
}

function HomeWithParams() {
  const searchParams = useSearchParams();
  const [route, setRoute] = useState("home"); // Default to home page

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setRoute(page);
    }
  }, [searchParams]);

  return (
    <div>
      {route === "home" && <HomePage />}
      {route === "login" && <Login />}
      {route === "signup" && <SignUp />}
      {route === "healthrecords" && <RecordPage />}
    </div>
  );
}
