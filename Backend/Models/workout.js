const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  workoutType: String,
  duration: Number,
  caloriesBurned: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workout', workoutSchema);
