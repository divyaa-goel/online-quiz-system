const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const query = (text, params) => {
    return pool.query(text, params);
};

const getQuizzes = async () => {
    const res = await query('SELECT * FROM quizzes');
    return res.rows;
};

const getQuizById = async (id) => {
    const res = await query('SELECT * FROM quizzes WHERE id = $1', [id]);
    return res.rows[0];
};

const saveUserResponse = async (quizId, userId, answers) => {
    const res = await query('INSERT INTO responses(quiz_id, user_id, answers) VALUES($1, $2, $3)', [quizId, userId, answers]);
    return res.rowCount > 0;
};

module.exports = {
    query,
    getQuizzes,
    getQuizById,
    saveUserResponse,
};