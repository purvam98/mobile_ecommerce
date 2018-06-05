const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const jwtExp = require('express-jwt');
const routes = require("./controllers/commerce_controller.js");
const expressValidator =  require('express-validator') ;
var cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 8080;
const agentMan = require('./config/config.js');

let app = express();
app.use(cookieParser(agentMan.secret));
app.use(expressValidator());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use('/auth/', jwtExp({
  secret: agentMan.secret,
  getToken: (req) => {return (req.signedCookies) ? req.signedCookies.jwtAuthToken : null},
}), (req, res, next) => {
  (req.user) ? next() : res.redirect('/login');
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') { 
    res.redirect('/login');
  }
});

app.use('/',routes);

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});