// =========================
// Fitness & Diet Tracking Platform (Single File)
// Backend + Frontend using Node.js, Express, MongoDB, EJS
// =========================

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// ----- CONFIG -----
const PORT = 3000;
const JWT_SECRET = "super_secret_key"; // change for production
const MONGO_URI = "mongodb://localhost:27017/fitness_diet_app";

// ----- MIDDLEWARE -----
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ----- DATABASE -----
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ----- SCHEMAS -----
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  height: Number,
  weight: Number,
  goals: String
});

const mealSchema = new mongoose.Schema({
  userId: String,
  mealName: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  date: { type: Date, default: Date.now }
});

const workoutSchema = new mongoose.Schema({
  userId: String,
  workoutType: String,
  duration: Number,
  caloriesBurned: Number,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Meal = mongoose.model('Meal', mealSchema);
const Workout = mongoose.model('Workout', workoutSchema);

// ----- AUTH MIDDLEWARE -----
function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.redirect('/login');
  }
}

// ----- ROUTES -----

// Home page
app.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const meals = await Meal.find({ userId: req.user.id }).sort({ date: -1 }).limit(5);
  const workouts = await Workout.find({ userId: req.user.id }).sort({ date: -1 }).limit(5);
  res.render('dashboard', { user, meals, workouts });
});

// Register page
app.get('/register', (req, res) => res.render('register'));
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.send("User already exists. <a href='/login'>Login</a>");
  const hash = await bcrypt.hash(password, 10);
  user = new User({ name, email, password: hash });
  await user.save();
  res.redirect('/login');
});

// Login page
app.get('/login', (req, res) => res.render('login'));
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.send("User not found. <a href='/register'>Register</a>");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.send("Invalid password");
  const token = jwt.sign({ user: { id: user._id } }, JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/');
});

// Logout
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

// Profile page
app.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.render('profile', { user });
});
app.post('/profile', auth, async (req, res) => {
  const { name, age, height, weight, goals } = req.body;
  await User.findByIdAndUpdate(req.user.id, { name, age, height, weight, goals });
  res.redirect('/');
});

// Meals
app.get('/meals', auth, async (req, res) => {
  const meals = await Meal.find({ userId: req.user.id }).sort({ date: -1 });
  res.render('meals', { meals });
});
app.post('/meals', auth, async (req, res) => {
  const { mealName, calories, protein, carbs, fat } = req.body;
  await new Meal({ userId: req.user.id, mealName, calories, protein, carbs, fat }).save();
  res.redirect('/meals');
});

// Workouts
app.get('/workouts', auth, async (req, res) => {
  const workouts = await Workout.find({ userId: req.user.id }).sort({ date: -1 });
  res.render('workouts', { workouts });
});
app.post('/workouts', auth, async (req, res) => {
  const { workoutType, duration, caloriesBurned } = req.body;
  await new Workout({ userId: req.user.id, workoutType, duration, caloriesBurned }).save();
  res.redirect('/workouts');
});

// ----- SERVER START -----
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
