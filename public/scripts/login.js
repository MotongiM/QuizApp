$(() => {
  $login = $('#login');
  $('document').on('load', () => {
    document.cookie ? $login.value('there are cookies') : $login.value('no cookies');
  })
})
