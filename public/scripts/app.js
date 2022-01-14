// Client facing scripts here
$(() => {
  $login = $('#login');
  // document.cookie;
  $(document).cookie ? $login.replaceWith(`<span>No cookies</span>`) : $login.replaceWith(`<a href='/user/'>User ${document.cookie.slice(8)}</a>`);

  new ClipboardJS('.share');


})
