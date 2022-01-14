const express = require('express');
const router = express.Router();

module.exports = (db) => {


  //Homepage of quizApp to see public quizzes

  router.get('/:userid', (req, res) => {
    res.cookie('user_id', req.params.userid);
    res.redirect('/');
  })
  return router
}
