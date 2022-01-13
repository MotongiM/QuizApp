const quizData =
  {
  title: 'Avatar characters!',
  description: 'Can you name the characters from Avatar: the Last Airbender?',
  question1: 'Who was banished by his father?',
  answerCorrect1: 'Zuko',
  answerIncorrect1: [ 'Katara', 'Azula', 'Iroh' ],
  question2: 'Who is the greatest Earthbender of all time?',
  answerCorrect2: 'Toph',
  answerIncorrect2: [ 'Lionturtle', 'the boulder', 'Saka' ],
  question3: 'What show is better than Avatar?',
  answerCorrect3: 'No show',
  answerIncorrect3: [ 'Lost', 'Adele', 'Pizza' ],
  public: 'true'
};

  // quizDataConverted.questions = [{
  //   question:
  //   answers: [{
  //     answer:
  //     correct:
  //   }]
  // }]
  quizDataConverted = {
    title: quizData.title,
    description: quizDataConverted.description,
    questions: []
  }

  //we must convert our form data to a more queriable form

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
        if (key.slice(0,13) === 'answerCorrect') {

          const rightAnswer = {
            answer: value,
            correct_answer: true
          };
          question.answers.push(rightAnswer);
        };

        console.log(question.answers);

        //push inccorrect answers
        if (key.slice(0,15) === 'answerIncorrect') {
          for (wrongAnswer of value) {

            const answer = {

            }
          }
        }

      }

      console.log(questionNumber);
    }




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
