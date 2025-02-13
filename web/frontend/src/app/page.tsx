"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Login from "@/app/components/pages/Login";
import HomePage from "@/app/components/pages/Home";
import SignUp from "@/app/components/pages/SignUp";
import RecordPage from "@/app/components/pages/HealthRecords";

export default function Home() {
  const router = useRouter();
  const accToken = useRef<string | null>(null);
  const [route, setRoute] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    accToken.current = sessionStorage.getItem("accessToken");

    // Get search param manually since we can't use useSearchParams directly
    const urlParams = new URLSearchParams(window.location.search);
    const routeParam = urlParams.get("route");
    setRoute(routeParam);

    if (!accToken.current) {
      if (routeParam !== "signup") {
        router.replace("/?route=login");
      }
    } else {
      if (!routeParam || routeParam === "login" || routeParam === "signup") {
        router.replace("/?route=home");
      }
    }

    setIsLoaded(true);
  }, [router]);

  if (!isLoaded) return <div>Loading...</div>;

  if (!accToken.current) {
    return <div className="p-4">{route === "signup" ? <SignUp /> : <Login />}</div>;
  }

  return (
    <div className="p-4">
      {route === "home" && <HomePage />}
      {route === "healthrecords" && <RecordPage />}
    </div>
  );
}
