class QuizModel {
    constructor(db) {
        this.db = db;
    }

    async getAllQuizzes() {
        const query = 'SELECT * FROM quizzes';
        const quizzes = await this.db.query(query);
        return quizzes;
    }

    async getQuizById(id) {
        const query = 'SELECT * FROM quizzes WHERE id = ?';
        const quiz = await this.db.query(query, [id]);
        return quiz;
    }

    async saveUserResponse(quizId, userId, answers) {
        const query = 'INSERT INTO user_responses (quiz_id, user_id, answers) VALUES (?, ?, ?)';
        await this.db.query(query, [quizId, userId, JSON.stringify(answers)]);
    }
}

export default QuizModel;