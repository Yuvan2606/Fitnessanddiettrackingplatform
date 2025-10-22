import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Workouts() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [workouts, setWorkouts] = useState([]);
  const [workout, setWorkout] = useState({ workoutType: "", duration: 0 });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/workouts/${user._id}`).then(res => setWorkouts(res.data));
  }, []);

  const addWorkout = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/workouts", { ...workout, userId: user._id });
    window.location.reload();
  };

  return (
    <div className="center">
      <h2>Workout Tracker</h2>
      <form onSubmit={addWorkout}>
        <input placeholder="Workout Type" onChange={(e) => setWorkout({ ...workout, workoutType: e.target.value })} />
        <input placeholder="Duration (min)" onChange={(e) => setWorkout({ ...workout, duration: e.target.value })} />
        <button>Add Workout</button>
      </form>
      <ul>
        {workouts.map((w) => (
          <li key={w._id}>{w.workoutType} - {w.duration} min</li>
        ))}
      </ul>
    </div>
  );
}
