/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //Account Page where they can see the quizzes they created

  router.get('/',(req,res) => {
    const templateVars = {};

    const correctCount = `SELECT count(attempt_answers.id)
    FROM answers
    JOIN attempt_answers ON answers.id = attempt_answers.answer_id
    JOIN attempts ON attempts.id = attempt_answers.attempt_id
    WHERE attempts.user_id = $1
    AND answers.correct_answer = TRUE
    GROUP BY attempts.id
    ORDER BY attempts.id
    ;`;

    const totalCount = `SELECT count(attempt_answers.id)
    FROM attempt_answers
    JOIN attempts ON attempts.id = attempt_answers.attempt_id
    WHERE attempts.user_id = $1
    GROUP BY attempts.id
    ORDER BY attempts.id
    ;`;

    db.query(correctCount, [req.cookies.user_id])
    .then( result => {
      templateVars.correctCount = result.rows;

      db.query(totalCount, [req.cookies.user_id])
      .then(result => {
        templateVars.totalCount = result.rows;

        db.query(`SELECT quizzes.title, attempts.id
        FROM quizzes
        JOIN attempts ON attempts.quiz_id = quizzes.id
        WHERE attempts.user_id = $1
        ORDER BY attempts.id;`, [req.cookies.user_id])
        .then(result => {
          console.log(result.rows);
          templateVars.quizNames = result.rows;
          templateVars.user_id = req.cookies.user_id;

          db.query(`SELECT title, description, id
          FROM quizzes
          WHERE user_id =  $1`, [req.cookies.user_id])
          .then(result => {
            templateVars.quizzes = result.rows;
            // console.log({templateVars});
            res.render("../views/account", templateVars);
          })
        })
      })
      })
  });

  //POST delete a new quiz
  //stretch instead of delete add a boolean for active or not

  router.post('/:user_id/delete/:quiz', (req,res) => {
    db.query(`DELETE FROM Quizzes WHERE id = $1 AND user_id = $2`)
  })

  return router;
};
