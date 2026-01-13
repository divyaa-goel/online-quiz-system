class QuizController {
    constructor(quizModel) {
        this.quizModel = quizModel;
    }

    async getQuizzes(req, res) {
        try {
            const quizzes = await this.quizModel.getAllQuizzes();
            res.status(200).json(quizzes);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching quizzes', error });
        }
    }

    async submitAnswer(req, res) {
        const { quizId, userId, answer } = req.body;
        try {
            const result = await this.quizModel.saveUserAnswer(quizId, userId, answer);
            res.status(200).json({ message: 'Answer submitted successfully', result });
        } catch (error) {
            res.status(500).json({ message: 'Error submitting answer', error });
        }
    }

    async calculateScore(req, res) {
        const { quizId, userId } = req.body;
        try {
            const score = await this.quizModel.calculateUserScore(quizId, userId);
            res.status(200).json({ score });
        } catch (error) {
            res.status(500).json({ message: 'Error calculating score', error });
        }
    }
}

export default QuizController;