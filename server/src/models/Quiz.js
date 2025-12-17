const mongoose = require('mongoose');


const OptionSchema = new mongoose.Schema({
text: String
});


const QuestionSchema = new mongoose.Schema({
question: String,
options: [String],
answer: String
});


const QuizSchema = new mongoose.Schema({
title: String,
prompt: String,
questions: [QuestionSchema],
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Quiz', QuizSchema);