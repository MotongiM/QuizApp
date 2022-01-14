const express = require('express');
const router = express.Router();

module.exports = (db) => {


  //Create quiz page

  router.get('/', (req, res) => {``

      const templateVars = {user_id: req.params.user_id};
      res.render('../views/createQuiz.ejs', templateVars);
    })

//submit quiz
router.post('/', (req, res) => {
  console.log(req.body);
  const quizData = req.body;

      //we must first convert our form data to a more queriable format:

      const quizDataConverted = {
        title: quizData.title,
        description: quizData.description,
        questions: [],
        public: Boolean(quizData.public),
        userId: req.cookies.user_id || null
      };

      // format for quizDataConverted.questions:
      //   questions: [
      //     {
      //       question: question,
      //       answers: [{
      //         answer: answer,
      //         correct: boolean
      //       }]
      //     }
      //   ]

      for (const [key, value] of Object.entries(quizData)) {

        // add questions to converted question object
        if (key.slice(0,8) === 'question') {
          const question = {
            question: value,
            answers: []
          };
          const questionNumber = key.slice(8);

          // add answers to their respective question objects
          for (const [key, value] of Object.entries(quizData)) {

            //push correct answer
            if (key.slice(0,13) === 'answerCorrect' && key.slice(13) === questionNumber) {

              const rightAnswer = {
                answer: value,
                correct_answer: true
              };
              question.answers.push(rightAnswer);
            }

            //push inccorrect answers
            if (key.slice(0,15) === 'answerIncorrect' && key.slice(15) === questionNumber) {
              for (answer of value) {

                const wrongAnswer = {
                  answer: answer,
                  correct_answer: false
                };
                question.answers.push(wrongAnswer);
              }
            }
          }

          quizDataConverted.questions.push(question);
        }
      }

      //insert quiz into quizzes
      const quizValues = [quizDataConverted.userId, quizDataConverted.title, quizDataConverted.description, quizDataConverted.public];

      db.query(`INSERT INTO quizzes (user_id, title, description, public)
      VALUES ($1, $2, $3, $4)
      RETURNING id;`, quizValues)
        .then((query) => {

          //insert questions into questions
          const quizId = query.rows[0].id;
          for (question of quizDataConverted.questions) {
            const questionValues = [quizId, question.question];
            db.query(`INSERT INTO questions (quiz_id, question)
          VALUES ($1, $2)
          RETURNING id;`, questionValues)
              .then((query) => {

                //insert the answers for the question into answers
                const questionId = query.rows[0].id;
                for (answer of question.answers) {
                  console.log(answer);
                  const answerValues = [questionId, answer.answer, answer.correct_answer];
                  db.query(`INSERT INTO answers (question_id, answer, correct_answer)
              VALUES ($1, $2, $3);`, answerValues);
                }
              });
          }
          res.redirect(`/quiz/${quizId}`);
        })
        .catch(err => err.message);
})

return router;

};
