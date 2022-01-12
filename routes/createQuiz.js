const express = require('express');
const router = express.Router();

module.exports = (db) => {


  //Create quiz page

  router.get('/', (req, res) => {``

      const templateVars = {user_id: req.params.user_id};
      res.render('../views/createQuiz.ejs', templateVars);
    })

  return router;
};

//submit quiz
router.post('/', (req, res) => {
  const templateVars = {user_id: req.params.user_id};
  console.log(req.body);
  res.render('createQuiz', templateVars);
})
