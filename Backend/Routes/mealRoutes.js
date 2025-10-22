const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');

// Add Meal
router.post('/', async (req, res) => {
  const meal = new Meal(req.body);
  await meal.save();
  res.json(meal);
});

// Get Meals
router.get('/:userId', async (req, res) => {
  const meals = await Meal.find({ userId: req.params.userId });
  res.json(meals);
});

module.exports = router;
