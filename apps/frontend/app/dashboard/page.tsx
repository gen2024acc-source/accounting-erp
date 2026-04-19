"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ ADD THIS

export default function Dashboard() {
   const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const lastActive = localStorage.getItem("lastActive");

    const now = Date.now();
    const DAY = 24 * 60 * 60 * 1000;

    // ❌ No login
    if (!token) {
      router.push("/login");
      return;
    }

    // ❌ inactive > 24 hours
    if (!lastActive || now - Number(lastActive) > DAY) {
      localStorage.removeItem("token");
      localStorage.removeItem("lastActive");
      router.push("/login");
      return;
    }

    // ✅ user is active → update activity timestamp
    localStorage.setItem("lastActive", Date.now().toString());
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your accounting app</p>
    </div>
  );
}