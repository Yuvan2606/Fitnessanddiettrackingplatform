import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ margin: "10px", color: "white" }}>Dashboard</Link>
      <Link to="/meals" style={{ margin: "10px", color: "white" }}>Meals</Link>
      <Link to="/workouts" style={{ margin: "10px", color: "white" }}>Workouts</Link>
      <Link to="/profile" style={{ margin: "10px", color: "white" }}>Profile</Link>
    </nav>
  );
}
