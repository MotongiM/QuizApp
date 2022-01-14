// Client facing scripts here
$(() => {
  console.log('loaded');
  $login = $('#login');
  // document.cookie;
  console.log(document.cookie);
  $(document).cookie ? $login.replaceWith(`<span>No cookies</span>`) : $login.replaceWith(`<span>${document.cookie}</span>`);

})
