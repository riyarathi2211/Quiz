const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const { generateQuizFromPrompt } = require('../utils/openai');


// Create/generate quiz
router.post('/generate', async (req, res) => {
try {
const { prompt, title, numQuestions } = req.body;
if (!prompt) return res.status(400).json({ error: 'prompt required' });


const questions = await generateQuizFromPrompt(prompt, numQuestions || 5);
console.log("Questions generated (raw):", questions);

const quiz = await Quiz.create({ title: title || prompt, prompt, questions });
console.log("Quiz saved to DB:", quiz._id);

res.json(quiz);
} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
});


// List quizzes
router.get('/', async (req, res) => {
const quizzes = await Quiz.find().sort({ createdAt: -1 }).limit(50);
res.json(quizzes);
});


// Get quiz by id
router.get('/:id', async (req, res) => {
const quiz = await Quiz.findById(req.params.id);
if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
res.json(quiz);
});


module.exports = router;