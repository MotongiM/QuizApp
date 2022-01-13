const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // quiz in progress

  router.get('/:quizid', (req, res) => {
    const quizData = {
      id: req.params.quizid,
      title: "",
      description: "",
      questions: []
    };

    // quizData.questions format:
    // [
    // {
    //   id,
    //   question,
    //   answers: [
    //     {
    //       id?,
    //       answer,
    //       correct_answer
    //     }
    //   ]
    // }
    // ]

    db.query(`SELECT title, description
    FROM quizzes
    WHERE id = $1;`, [quizData.id])
      .then(query => {
        quizData.title = query.rows[0].title;
        quizData.description = query.rows[0].description;
        db.query(`SELECT id, question
        FROM questions
        WHERE quiz_id = $1;`, [quizData.id])
        .then( query => {
          for (question of query.rows) {
            const questionData = {
              id: question.id,
              question: question.question,
              answers: []
            };
            db.query(`SELECT id, answer, correct_answer
            FROM answers
            WHERE question_id = $1;`, [question.id])
            .then(query => {
              for (answer of query.rows) {
                const answerData = {
                  id: answer.id,
                  answer: answer.answer,
                  correct_answer: answer.correct_answer
                };
                questionData.answers.push(answerData);
              }})
              .then(() => {
                quizData.questions.push(questionData);
                if (quizData.questions.length === query.rows.length) {
                  console.log('last');
                  res.render('takeQuiz', quizData);
                }})}})})
        .catch(err => err.message)
  });

  //POST quiz attempt

  router.post('/:quizid', (req, res) => {
    const attemptValues = [req.params.quizid, null];
    db.query(`INSERT INTO attempts (quiz_id, user_id)
    VALUES ($1, $2)
    RETURNING id`, attemptValues)
    .then((query) => {
      let counter = 0;
      for (const [questionId, answerId] of Object.entries(req.body)) {
        counter ++;
        const attemptAnswerValues = [Number(query.rows[0].id), Number(answerId)]
        db.query(`INSERT INTO attempt_answers (attempt_id, answer_id)
        VALUES ($1, $2)`, attemptAnswerValues)
        .then(() => {
          if (counter === Object.keys(req.body).length) {
            counter = 0;
            res.redirect('/')
          }
        })
      }
    }
    )
    .catch(err => err.message);

  })

  return router;
};
