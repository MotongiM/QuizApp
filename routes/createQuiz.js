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
