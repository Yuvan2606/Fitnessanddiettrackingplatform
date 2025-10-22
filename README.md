# Fitnessanddiettrackingplatform

HACKATHON PHASE 1
Project Tittle:Fitness & Diet Tracking Platform

Definition :-
 
• A full-stack web application that helps users manage their fitness goals, diet plans, and daily progress through an intuitive dashboard.
• Built using Node.js, Express, MongoDB, and EJS — this project provides both backend and frontend functionalities in one unified platform.

Features :-

1. User Management

• User registration and secure login (with bcrypt and JWT authentication).

• Profile creation with personal fitness data (age, weight, height, gender, goals).


2. Diet Tracking

• Add, update, or delete meals with calorie information.

• View daily nutrient summary (calories, protein, carbs, fats).

• Track total intake vs. daily goal.


3. Fitness Tracker

• Log workout routines and exercises.

• Set fitness goals (e.g., weight loss, muscle gain).

• Monitor progress with graphs and activity logs.


4. Dashboard

• View combined stats for workouts, calories, and goals.

• Visual insights using progress bars and charts.


5. Admin Panel (optional)

• Manage users and review activity logs.

• Edit or remove inappropriate entries.

Tech Stack :-

Layer	Technology

Frontend	: HTML, CSS, EJS Templates, JavaScript
Backend   :	Node.js, Express.js
Database	: MongoDB (Mongoose ORM)
Authentication : JWT (JSON Web Token), bcrypt.js
Environment	: Node.js Runtime

Installation & Setup :-

→ Prerequisites

• Node.js and npm installed

• MongoDB (local or cloud-based like MongoDB Atlas)

→ Steps 

1. Clone the Repository

git clone https://github.com/Yuvan2606/Fitnessanddiettrackingplatform.git 
cd fitnessanddiettrackingplotform


2. Install Dependencies

npm install


3. Set up Environment Variables Create a .env file in the root directory with:



4. Run the Application

npm start

The app will run at: http://localhost:3000

Security Highlights :-

• Encrypted passwords using bcrypt.js

• Token-based authentication via JWT

• Secure API routes with authorization middleware

Future Enhancements :-

• Mobile-friendly PWA version

• Integration with fitness wearables (Fitbit, Apple Health)

• AI-based diet recommendations

• Water intake & sleep tracking

Contributors :-

1. Yuvan Kumar .A (Team Leader)
2. Mohammed Ammar .C
3. Prakash .A
4. Naveen Kumar .S

License :-

This project is licensed under the MIT License
