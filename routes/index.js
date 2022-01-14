const express = require('express');
const router = express.Router();

module.exports = (db) => {


  //Homepage of quizApp to see public quizzes

  router.get('/', (req, res) => {
    console.log(res.cookie);
    db.query(`SELECT * FROM quizzes WHERE public = TRUE;
    `)
    .then(data => {
      const templateVars = {quizzes: data.rows, user_id:1};
      res.render('../views/index.ejs', templateVars);
    })
    .catch(err => {
      err.message;
    })

  });
  return router;
};
