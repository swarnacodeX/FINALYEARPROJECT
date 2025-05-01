"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../utils/Navbar";
import { IconClipboardCopy, IconFileBroken, IconLogout } from "@tabler/icons-react";
import medai from "../../../../public/WELCOME.png";
import Image from "next/image";

const items = [
  {
    title: "STORE MEDICAL RECORDS AND PRESCRIPTIONS",
    description: "Imagine never having to dig through drawers or worry about losing a vital prescription again. Digitizing your medical records and prescriptions means having instant, secure access to your entire health history—anytime, anywhere. Whether you're visiting a new doctor, managing chronic conditions, or caring for a loved one, storing your records digitally ensures that critical information is always at your fingertips. It reduces errors, saves time during emergencies, and streamlines your healthcare experience. With encrypted cloud storage and smart organization, you're not just saving paperwork—you're empowering yourself with control, convenience, and peace of mind in your healthcare journey.",
    icon: <IconClipboardCopy className="h-6 w-6 text-neutral-700" />,
    imageUrl: "DIGITAL HEALTH RECORDS.jpg", // fallback or second image
  },
  {
    title: "Get AI Assistance",
    description: "Imagine a world where chest diseases like pneumonia, tuberculosis, or even early-stage lung cancer can be detected before symptoms become life-threatening. That’s the power of AI in healthcare. By analyzing chest X-rays, CT scans, and patient data with incredible speed and accuracy, AI can spot patterns that even trained eyes might miss—leading to faster, more precise diagnoses. This means earlier treatment, better outcomes, and potentially saving countless lives. Using AI to predict chest diseases isn’t just about innovation—it’s about giving every patient a fighting chance with the smartest tools available. It's healthcare, upgraded.",
    icon: <IconFileBroken className="h-6 w-6 text-neutral-700" />,
    imageUrl: "AIHOME.png", // fallback or second image
  },
];

export default function HomePage() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    setAccessToken(token);
    if (!token) {
      router.push("/?page=login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("email");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    setAccessToken(null);
    router.push("/?page=login");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="min-h-screen bg-black bg-opacity-50">
        <Navbar />

        <Image
          src={medai}
          alt="Welcome"
          className="absolute top-4 left-4 w-64 h-32 object-contain"
        />

        <button
          onClick={handleLogout}
          className="fixed top-8 right-20 z-50 flex items-center px-4 py-2 text-black bg-white 
          hover:bg-black hover:text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 
          focus:ring-white focus:ring-offset-2 transition ease-in-out duration-200"
        >
          <IconLogout className="h-5 w-5 mr-2" />
          Logout
        </button>

        <div className="container mx-auto px-4 py-32 space-y-32">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              } items-center gap-6`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className=" w-5/6 h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 text-white space-y-4">
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                </div>
                <p className="text-lg">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
