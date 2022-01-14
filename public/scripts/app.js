// Client facing scripts here
$(() => {
  console.log('loaded');
  $login = $('#login');
  // document.cookie;
  console.log(document.cookie);
  $(document).cookie ? $login.replaceWith(`<span>No cookies</span>`) : $login.replaceWith(`<a href='/user/'>User ${document.cookie.slice(8)}</a>`);


})
