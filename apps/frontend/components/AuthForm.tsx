"use client";

import { useState } from "react";
import { login, signup } from "../services/auth.service";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
    // 1. Create user
    await signup(email, password);

    // 2. Login immediately after signup
    const res = await login(email, password);

    // 3. Save token
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("lastActive", Date.now().toString());

    // 4. Redirect to products page
    router.replace("/products");


  } catch (err: any) {
    alert(err.response?.data || "Signup failed");
  }
  };

  const handleLogin = async () => {
  try {
    const res = await login(email, password);
    // save token
    localStorage.setItem("token", res.data.token);
    // 🔥 store login time
    localStorage.setItem("lastActive", Date.now().toString());
     // 🔥 notify app BEFORE redirect
    window.dispatchEvent(new Event("authChanged"));
    // 🔥 REDIRECT HERE
      router.push("/dashboard");
  } catch (err: any) {
    alert(err.response?.data || "Login failed");
  }
};

  return (
    <div>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {mode === "signup" ? (
        <button onClick={handleSignup}>Sign Up</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
        {/* 🔥 NEW LINK */}
      {mode === "signup" && (
        <p style={{ marginTop: "10px" }}>
          Already registered?{" "}
          <button
            onClick={() => router.push("/login")}
            style={{
              background: "none",
              border: "none",
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Log In
          </button>
        </p>
      )}
    </div>
  );
}