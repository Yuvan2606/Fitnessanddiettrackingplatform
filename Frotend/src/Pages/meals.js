import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Meals() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [meals, setMeals] = useState([]);
  const [meal, setMeal] = useState({ mealName: "", calories: 0 });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/meals/${user._id}`).then(res => setMeals(res.data));
  }, []);

  const addMeal = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/meals", { ...meal, userId: user._id });
    window.location.reload();
  };

  return (
    <div className="center">
      <h2>Meal Tracker</h2>
      <form onSubmit={addMeal}>
        <input placeholder="Meal Name" onChange={(e) => setMeal({ ...meal, mealName: e.target.value })} />
        <input placeholder="Calories" onChange={(e) => setMeal({ ...meal, calories: e.target.value })} />
        <button>Add Meal</button>
      </form>
      <ul>
        {meals.map((m) => (
          <li key={m._id}>{m.mealName} - {m.calories} kcal</li>
        ))}
      </ul>
    </div>
  );
}
