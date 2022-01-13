const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // router.get('/', (req, res) => {``

  // const templateVars = {user_id: req.params.user_id};
  // res.render('../views/result', templateVars);
  // })
  //result page

  router.get('/:quizId/result', (req,res) => {
    const quizId = req.params.quizId;
    db.query(`SELECT attempt_answers.id,answers.answer,questions.question,correct_answer,attempt_id,attempts.user_id,quizzes.title
    FROM attempts
    JOIN attempt_answers ON attempts.id = attempt_id
    JOIN answers ON answers.id = answer_id
    JOIN quizzes ON attempts.quiz_id = quizzes.id
    JOIN questions ON questions.id = answers.question_id
    WHERE quizzes.id = $1
    ORDER BY quizzes.id;`, [quizId])
    .then (data => {
      console.log('check ', data);
      const templateVars = {attempts: data.rows}
      res.render('../views/result.ejs', templateVars);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: error.message });
    });
  })


  //Inserting data into database
  router.post('/:quiz_id/result/:user_id' ,(req,res) => {
    const query = `INSERT INTO attempts (quiz_id, user_id)
                  VALUES ($1, $2)
                  RETURNING *;`

    const values = [req.params.quiz_id, req.params.user_id]

    db.query(query,values)
      .then((data) => {
        const questions = Object.keys(req.body);
        const text = `INSERT INTO attempt_answers (answer_id, user_id, attempt_id,question_id) VALUES `
        for (let question of questions) {
          if (questions.indexOf(question) === (questions.length - 1)) {
            text += `(${req.body[question]}, ${req.params.user_id}, ${data.rows[0].id}, ${question}) RETURNING *;`
          } else {
            text += `(${req.body[question]}, ${req.params.user_id}, ${data.rows[0].id}, ${question}) `;

          }
        }
        db.query(text)
        return data.rows[0].id;
      })
      .then(id => {
        res.redirect(`/attempts/${id}/results`)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  return router;

};
