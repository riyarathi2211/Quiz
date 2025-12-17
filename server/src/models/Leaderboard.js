const mongoose = require('mongoose');


const LeaderboardSchema = new mongoose.Schema({
quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
username: String,
score: Number,
timeTaken: Number,
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Leaderboard', LeaderboardSchema);