const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quizController');

const quizController = new QuizController();

// Define API routes
router.get('/quizzes', quizController.getQuizzes);
router.post('/quizzes/:id/submit', quizController.submitQuiz);
router.get('/quizzes/:id', quizController.getQuizById);

module.exports = router;