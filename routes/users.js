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

    db.query(`SELECT username, id
              FROM users`)
              .then(templateVars.username = user,
                    templateVars.id = id);

    db.query(`Select answer/`)

    db.query(`SELECT Quizzes_id, users.id as user_id,users.username AS users_name, Quizzes.title, Quizzes.description,public
    FROM Quizzes
    JOIN users ON user_id = users.id
    JOIN attemps ON
    WHERE user_id = 1$
    GROUP BY Quizzes.id, users.id, users.username,Quizzes.title,Quizzes.description,public;`, [req.params.id])
    .then (user => {
      const templateVars = {userData: user.rows, user_id: req.params.id };
      res.render("../views/account", templateVars);
    })

    .catch(error => {
      res
        .status(500)
        .json({ error: error.message });
    });
  });

  router.post('/user_id/createquiz',(req,res) => {
    const query = `INSERT INTO quizzes (user_id, title, description,public)
                 VALUES (1$,2$,3$,4$) RETURNING id`;
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

  router.post('/:user_id/delete/:quiz', (req,res) => {
    db.query(`DELETE FROM Quizzes WHERE id = 1$ AND user_id = 2$`)
  })

  return router;
};
