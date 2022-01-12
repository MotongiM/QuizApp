$(() => {


  //append question set
  $newQuestion = $(`<p>Clicked!<p>`)

  const $questionButton = $('#new-question')
  $questionButton.on('click', () => {
    console.log('clicked!');
    $questionButton.append($newQuestion);
  });

});

