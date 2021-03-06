// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/account");
const widgetsRoutes = require("./routes/widgets");
const indexRoutes = require("./routes/index");
const createQuizRoutes = require("./routes/createQuiz");
const resultRoutes = require("./routes/result");
const quizRoutes = require("./routes/takeQuiz")
const loginRoutes = require("./routes/login")
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/user", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/",indexRoutes(db));
app.use("/create",createQuizRoutes(db));
app.use("/result",resultRoutes(db));
app.use("/quiz", quizRoutes(db));
app.use("/login", loginRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

//app.get("/", (req, res) => {
//  res.render("index");
//});

app.listen(PORT, () => {
  console.log(`???? Quizapp listening on port ${PORT}`);
});
