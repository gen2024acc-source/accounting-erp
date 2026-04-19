"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setShow(!!token);
    };

    checkAuth();

    window.addEventListener("authChanged", checkAuth);

    return () => {
      window.removeEventListener("authChanged", checkAuth);
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lastActive");

    window.dispatchEvent(new Event("authChanged"));
    router.replace("/login");
  };

  if (!show) return null;

  return (
    <button
      onClick={handleLogout}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "10px 15px",
        backgroundColor: "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        zIndex: 1000,
      }}
    >
      Logout
    </button>
  );
}