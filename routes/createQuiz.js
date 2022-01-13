const express = require('express');
const router = express.Router();

module.exports = (db) => {


  //Create quiz page

  router.get('/', (req, res) => {``

      const templateVars = {user_id: req.params.user_id};
      res.render('../views/createQuiz.ejs', templateVars);
    })

  return router;
};

//submit quiz
router.post('/', (req, res) => {
  const templateVars = {user_id: req.params.user_id};
  console.log(req.body);
  const quizData = req.body;

  // quizData.questions = [{
  //   question:
  //   answers: [{
  //     answer:
  //     correct:
  //   }]
  // }]

  for (const [key, value] of Object.entries(quizData)) {

    //if key includes question
    //create question object array {question: value, answers: []}
    //crete question num from key.pop()
    //loop entries
    //if answerCorrect && answer num === question num
    //push {answer: value, correct: true} to question object dot answers array
    //if answerIncorrect && answer num === question num
    //loop for element of value
    //push {answer: element, correct: false} to question object dot answers array
    //
    //push question object to questions array




  };

  // db.query(`INSERT INTO quizzes (user_id, title, description, public)
  // VALUES (${req.params.user_id}, ${quizData.title}, ${quizData.description}, ${quizData.listing})`)
  //returning quiz id

  //insert quiz
  //returning quiz id
  //for length of questions
  //insert question ()
  //returning question id
  //insert answer x4
  res.render('createQuiz', templateVars);
})
