"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Login from "@/app/components/pages/Login";
import HomePage from "@/app/components/pages/Home";
import SignUp from "@/app/components/pages/SignUp";
import RecordPage from "@/app/components/pages/HealthRecords"; // Adjust the import if the file path is different.

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const route = searchParams.get("route");
  const [accToken, setAccToken] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setAccToken(token);

    // Handle routing based on token
    if (!token) {
      if (route !== "signup") {
        router.push("/?route=login");
      }
    } else {
      if (!route || route === "login") {
        router.push("/?route=home");
      }
    }
  }, [router, route]);

  const renderPage = () => {
    if (!accToken) {
      if (route === "signup") return <SignUp />;
      return <Login />;
    }

    // For authenticated users, render pages based on route
    switch (route) {
      case "home":
        return <HomePage />;
      case "medrecord":
        return <RecordPage />;
      default:
        router.push("/?route=home");
        return null;
    }
  };

  const showNavbar = accToken && route !== "signup" && route !== "login";

  return (
    <div>
      {showNavbar && (
        <nav>
          <a href="/?route=home"></a>
          <a href="/?route=medrecord"></a>
         
        </nav>
      )}

      <Suspense fallback={<div>Loading...</div>}>
       
        <div className="p-4">{renderPage()}</div>
      </Suspense>
    </div>
  );
}
