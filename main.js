// This file contains the JavaScript code for the client-side functionality of the quiz system. 
// It handles user interactions, fetches quiz data from the server, and updates the UI dynamically.

document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-button');
    const resultContainer = document.getElementById('result-container');

    // Fetch quiz data from the server
    async function fetchQuiz() {
        try {
            const response = await fetch('/api/quizzes');
            const quizzes = await response.json();
            displayQuiz(quizzes);
        } catch (error) {
            console.error('Error fetching quiz data:', error);
        }
    }

    // Display the quiz questions
    function displayQuiz(quizzes) {
        quizzes.forEach(quiz => {
            const quizElement = document.createElement('div');
            quizElement.innerHTML = `
                <h2>${quiz.title}</h2>
                ${quiz.questions.map(question => `
                    <div>
                        <p>${question.text}</p>
                        ${question.options.map(option => `
                            <label>
                                <input type="radio" name="question-${question.id}" value="${option}">
                                ${option}
                            </label>
                        `).join('')}
                    </div>
                `).join('')}
            `;
            quizContainer.appendChild(quizElement);
        });
    }

    // Handle quiz submission
    submitButton.addEventListener('click', async () => {
        const answers = collectAnswers();
        const score = await submitAnswers(answers);
        displayResult(score);
    });

    // Collect answers from the quiz
    function collectAnswers() {
        const answers = {};
        const questionElements = quizContainer.querySelectorAll('div');
        questionElements.forEach((questionElement, index) => {
            const selectedOption = questionElement.querySelector(`input[name="question-${index + 1}"]:checked`);
            if (selectedOption) {
                answers[`question-${index + 1}`] = selectedOption.value;
            }
        });
        return answers;
    }

    // Submit answers to the server and get the score
    async function submitAnswers(answers) {
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });
            const result = await response.json();
            return result.score;
        } catch (error) {
            console.error('Error submitting answers:', error);
            return 0;
        }
    }

    // Display the result
    function displayResult(score) {
        resultContainer.innerHTML = `<h2>Your score: ${score}</h2>`;
    }

    // Initialize the quiz
    fetchQuiz();
});