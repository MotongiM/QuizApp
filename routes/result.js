const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //result page

  router.get('/:attempts/results', (req,res) => {
    db.query(`SELECT attempt_answers.id,answers.answer,questions.question,correct_answer,attempt_id,attempts.user_id
    FROM attempts
    JOIN attempt_answers ON attempts.id = attempt_id
    JOIN answers ON answers.id = answer_id
    JOIN quizzes ON attempts.quiz_id = quizzes.id
    JOIN questions ON questions.id = answers.question_id
    WHERE attempts.id = $1
    ORDER BY id;`, [1])
    .then (data => {
      const templateVars = {attempts: data.rows}
      res.render('../views/result',templateVars);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: error.message });
    });
  })


  //Inserting data into database
  router.post('/:quiz_id/results/:user_id' ,(req,res) => {
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
