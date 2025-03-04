"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Login from "@/app/components/pages/Login";
import HomePage from "@/app/components/pages/Home";
import SignUp from "@/app/components/pages/SignUp";
import RecordPage from "@/app/components/pages/HealthRecords";

export default function Home() {
  const router = useRouter();
  const [route, setRoute] = useState();

  return (
    <div className="p-4">
    {route==="login" && <Login/>}
    {route==="signup" && <SignUp/>}
    {route === "home" && <HomePage />}
    {route === "healthrecords" && <RecordPage />}
    </div>
  );
}
