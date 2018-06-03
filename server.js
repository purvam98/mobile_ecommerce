const express = require("express");
const bodyParser = require("body-parser");
//const session =  require('express-session');
const exphbs = require("express-handlebars");
const jwtExp = require('express-jwt');
const routes = require("./controllers/commerce_controller.js");
const expressValidator =  require('express-validator') ;
var cookieParser = require('cookie-parser')
const PORT = 8080;
const agentMan = require('./config/config.js');

let app = express();
app.use(cookieParser(agentMan.secret));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use('/protected/checkout/', jwtExp({
  secret: agentMan.secret,
  fail: function (req, res, next) {
    console.log(req.headers.authorization)
    if (!req.headers.authorization) res.send(400, 'missing authorization header');
    res.send(401);
 },
  getToken: (req) => {return (req.signedCookies) ? req.signedCookies.jwtAuthToken : null;},
}), function (req, res, next) {
  // if user is signed-in, next()
  console.log(req.user)
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { 
    res.redirect('/login');
  }
});

app.use(routes);

app.use(expressValidator());

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});