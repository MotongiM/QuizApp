const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //result page

  router.get('/:attempts/results', (req,res) => {
    db.query(`SELECT attempt_answers.id,answers.answer,questions.question,correct_answer,attempts_id,attempt.user_id
    FROM attempts
    JOIN attempt_answers ON attempts.id = attempt_id
    JOIN answers ON answers.id = answer_id
    JOIN quizzes ON attempt.quiz_id = quizzes.id
    JOIN questions ON questions.id = answers.question_id
    WHERE attempts.id = $1
    ORDER BY id;`, [1])
    .then (data => {
      const templateVars = {attempts: data.rows}
      res.render('../views/results',templateVars);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: error.message });
    });
  })

  //Inserting data into database
  const query = `INSERT INTO quizzes ( title, description,public)
  VALUES (2$,3$,4$) RETURNING id`;
const values = [req.body.title, req.body.description, req.body.public];
  router.post('/' ,(req,res) => {
    const query = `INSERT INTO attempts (quiz_id, user_id)
                  VALUES ($1, $2)
                  RETURNING *;`

    const values = [req.params.quiz_id, req.params.user_id]

    db.query(query,values)
      .then
  })

}
