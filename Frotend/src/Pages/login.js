import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
    alert("Login Successful!");
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };

  return (
    <div className="center">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <button>Login</button>
      </form>
    </div>
  );
}
