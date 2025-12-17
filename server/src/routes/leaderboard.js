const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboard');


// Submit score
router.post('/', async (req, res) => {
const { quizId, username, score, timeTaken } = req.body;
if (!quizId || !username) return res.status(400).json({ error: 'quizId and username required' });
const item = await Leaderboard.create({ quizId, username, score, timeTaken });
res.json(item);
});


// Get leaderboard for a quiz
router.get('/:quizId', async (req, res) => {
const items = await Leaderboard.find({ quizId: req.params.quizId }).sort({ score: -1, timeTaken: 1 }).limit(50);
res.json(items);
});


module.exports = router;