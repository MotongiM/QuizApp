const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // quiz in progress

  router.get('/:quizid', (req, res) => {
    db.query(`SELECT user_id, question_id, quizzes.title,questions.question, answers.answer, quiz_id, answers.correct_answer
              FROM answers
              JOIN questions ON questions.id = answers.question_id
              JOIN quizzes ON quizzes.id = questions.quiz_id
              JOIN users ON user_id = users.id
              WHERE quiz_id = $1
              GROUP BY user_id, question_id, quizzes.title, questions.question, answers.answer, quiz_id, answers.correct_answer
              ORDER BY questions.id;`, [req.params.quizid])
                .then(data => {
                  const templateVars = {quizInput: data.rows}
                  res.render('../views/takeQuiz', templateVars)
                });
  });
  return router;
};
