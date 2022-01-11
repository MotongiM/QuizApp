/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //Test

  router.get('/', (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //Account Page where they can see the quizzes they created

  router.get('/:id',(req,res) => {
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
    FROM answers
    JOIN attempt_answers ON answers.id = attempt_answers.answer_id
    JOIN attempts ON attempts.id = attempt_answers.attempt_id
    WHERE attempts.user_id = $1
    GROUP BY attempts.id
    ORDER BY attempts.id
    ;`;

    db.query(correctCount, [req.params.id])
    .then( result => {
      // templateVars.correctCount = (result.rows[0].count);
      templateVars.correctCount = [2,3,6];
      db.query(totalCount, [req.params.id])
      .then(result => {
        // templateVars.totalCount = (result.rows[0].count);
        templateVars.totalCount = [7,7,6]
        db.query(`SELECT quizzes.id, users.id as user_id,users.username AS users_name, Quizzes.title, Quizzes.description,public
        FROM Quizzes
        JOIN users ON quizzes.user_id = users.id
        JOIN attempts ON users.id = attempts.user_id
        WHERE users.id = $1
        GROUP BY Quizzes.id, users.id, users.username,Quizzes.title,Quizzes.description,public;`, [req.params.id])
        .then(user => {
          templateVars.userData = user.rows;
          templateVars.user_id = req.params.id;
          console.log({templateVars});
          res.render("../views/account", templateVars);
        })
      })
      })
  });

  //POST a new quiz to the database

  router.post('/user_id/createquiz',(req,res) => {
    const query = `INSERT INTO quizzes (user_id, title, description,public)
                 VALUES ($1,$2,$3,$4) RETURNING id`;
    const values = [req.params.user_id, req.body.title, req.body.description, req.body.public];
    db.query(query,values)
      .then(data => {
        const quiz = data.rows;
        const quiz_id = data.rows[0].id;
        res.redirect(`/quiz/${quiz_id}/Questions`)
      })
      .catch(err => {
        res.send(`Please complete the form first.`)
      });
  });

  //POST delete a new quiz
  //stretch instead of delete add a boolean for active or not

  router.post('/:user_id/delete/:quiz', (req,res) => {
    db.query(`DELETE FROM Quizzes WHERE id = $1 AND user_id = $2`)
  })

  return router;
};
