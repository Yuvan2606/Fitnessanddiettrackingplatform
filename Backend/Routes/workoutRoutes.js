const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// Add Workout
router.post('/', async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.json(workout);
});

// Get Workouts
router.get('/:userId', async (req, res) => {
  const workouts = await Workout.find({ userId: req.params.userId });
  res.json(workouts);
});

module.exports = router;
