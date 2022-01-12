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
    `<label for="quiz-question-${questionNumber}">
    Question #${questionNumber}
  </label>
  <input type="text" id="quiz-question-${questionNumber}">

  <label for="quiz-answer-correct-${questionNumber}">
    Correct answer
  </label>
  <input type="text" id="quiz-answer-correct-${questionNumber}">

  <label for="quiz-answer-incorrect-${questionNumber}-A">
    Incorrect answer
  </label>
  <input type="text" id="quiz-answer-incorrect-${questionNumber}-A">

  <label for="quiz-answer-incorrect-${questionNumber}-B">
    Incorrect answer
  </label>
  <input type="text" id="quiz-answer-incorrect-${questionNumber}-B">

  <label for="quiz-answer-incorrect-${questionNumber}-C">
    Incorrect answer
  </label>
  <input type="text" id="quiz-answer-incorrect-${questionNumber}-C">`
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



