const express = require('express');
const router = express.Router();

module.exports = (db) => {


  //Homepage of quizApp to see public quizzes

  router.get('/:user_id', (req, res) => {
    req.session.user_id = req.params.user_id;
    db.query(`SELECT * FROM quizzes WHERE public = TRUE;
    `)
    .then(data => {
      const templateVars = {quizzes: data.rows, user_id:params.user_id};
      res.render('../views/index.ejs', templateVars);
    })

  });
  return router;
};
