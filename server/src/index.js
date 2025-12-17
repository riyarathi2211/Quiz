// require("dotenv").config();
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

console.log("ENV FILE LOADED FROM:", path.resolve(__dirname, "../.env"));
console.log("MONGO_URI CHECK:", process.env.MONGODB_URI);


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const quizzesRouter = require('./routes/quizzes');
const leaderboardRouter = require('./routes/leaderboard');


const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));


const PORT = process.env.PORT || 5000;

console.log("MONGO_URI:", process.env.MONGODB_URI);
console.log("OPENAI:", process.env.OPENAI_API_KEY ? "OK" : "MISSING");

mongoose
.connect("mongodb://localhost:27017/quizapp")
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error', err));


app.use('/api/quizzes', quizzesRouter);
app.use('/api/leaderboard', leaderboardRouter);


app.get('/', (req, res) => res.send('Quiz API running'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
