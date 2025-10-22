import React from "react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="center">
      <h2>Welcome, {user?.name || "User"}!</h2>
      <p>Track your meals and workouts using the menu above.</p>
    </div>
  );
}
