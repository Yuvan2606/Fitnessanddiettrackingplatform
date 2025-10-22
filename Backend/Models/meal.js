const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  mealName: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meal', mealSchema);
