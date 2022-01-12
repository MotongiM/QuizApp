// $(() => {


//   //append question set
//   $newQuestion = $(`<p>Clicked!<p>`)

//   const $questionButton = $('#new-question')
//   $questionButton.on('click', () => {
//     console.log('clicked!');
//     $questionButton.append($newQuestion);
//   });

// });

$(() => {

  const loadTweets = function () {
    $.ajax({

      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.err(err);
      }
    });
  };


 const createTweetElement = (questionNumber) => {

  const $tweet = $(
    `  <div class="question-box">

    <label for="quiz-question-${questionNumber}">
      Question #${questionNumber}
    </label>
    <input required="required" type="text" id="quiz-question-${questionNumber}" name="question${questionNumber}">

    <label for="quiz-answer-correct-${questionNumber}">
      Correct answer
    </label>
    <input required="required" type="text" id="quiz-answer-correct-${questionNumber}" name ="answerCorrect${questionNumber}">

    <label for="quiz-answer-incorrect-${questionNumber}-A">
      Incorrect answer
    </label>
    <input required="required" type="text" id="quiz-answer-incorrect-${questionNumber}-A" name="answerIncorrect${questionNumber}">

    <label for="quiz-answer-incorrect-${questionNumber}-B">
      Incorrect answer
    </label>
    <input required="required" type="text" id="quiz-answer-incorrect-${questionNumber}-B" name="answerIncorrect${questionNumber}">

    <label for="quiz-answer-incorrect-${questionNumber}-C">
      Incorrect answer
    </label>
    <input required="required" type="text" id="quiz-answer-incorrect-${questionNumber}-C" name="answerIncorrect${questionNumber}">

  </div>`
  )

  return $tweet;
 }

 //render tweets in descending order by date

 const renderTweets = function(questionNumber) {

  const $tweetsContainer = $('#questions-container')

  const $tweet = createTweetElement(questionNumber);
  $tweetsContainer.append($tweet);
  };

  let counter = 2;
  //handle press new question

  $('#new-question').on('click', function (event) {
    event.preventDefault();
    console.log('Clicked!');

      // const $serializeQuestion = $(this).serialize();
      // $.post('/tweets', $serializeQuestion)
      // .then(loadTweets);
      renderTweets(counter);
      counter ++;

  });


})



