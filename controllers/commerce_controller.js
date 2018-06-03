const express = require("express");
const router = express.Router();
const mobile = require("../models/mobile_commerce.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const agentMan = require('../config/config.js');

function decodeJwt (cookieSrting) {
  let token = cookieSrting.slice(17).split('.', 3).join('.')
  let decoded = jwt.verify(token, agentMan.secret);
  return decoded;
};

router.get("/", function (req, res) {
  res.redirect('/mobile');
});

router.get('/mobile', function (req, res) {
  //if (req.headers.c)
  //decodeJwt(req.headers.cookie);
  mobile.all("product_details", function (data) {
    let hbsObject = { mobiles: data };
    res.render('index', hbsObject);
  });
});

router.get('/register', function (req, res) {
  res.render('registration');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  console.log(req.body)
  // req.checkBody('password', 'Password is Required').notEmpty();
  // req.checkBody('user_email', 'Email is required').notEmpty();
  // req.checkBody('user_email', 'Please enter a valid email').isEmail();

  // const errors = req.asyncValidationErrors();
  // if (errors) {
  //   res.redirect('/login');
  // } else {
    let lookup = mobile.userlookup(req.body.user_email, function(data) {
    }).then((data) => {
      if (data[0]) {
        bcrypt.compare(req.body.password, data[0].password, function (err, valid) {
          if (valid && !err) {
            const oneHour = Math.floor(Date.now() / 1000) + (3600);
            const payload = {
                id: req.body.userID,
                name: req.body.username
            }
            console.log(req.body.userID)
            const jwtAuthToken = jwt.sign({
              'userId': data[0].userID,
              'username': data[0].username
            }, agentMan.secret, {expiresIn: 3600000});
            console.log(jwtAuthToken)
            res.cookie('jwtAuthToken', jwtAuthToken, {
              maxAge: 3600000,
              httpOnly: false,
              signed: true,
            })
            res.redirect('/');
          } else {
            res.render('login', { status: 'Username or password is incorrect' });
          }
        })
      } else {
        res.render('login', { status: 'Username or password is incorrect' })
      }
    }).catch(next);
  //}
});

router.get('/protected/user/:id', function (req, res) {
  res.render('account', { user: req.user });
});

router.get('/mobile/product/:id', function (req, res) {
  const condition = "productID = " + req.params.id;
  mobile.one('product_details', condition, function (data) {
    data[0].product_specs = data[0].product_specs.split(":");
    let hbsObject = { mobiles: data };
    res.render('phone_detail', hbsObject);
    //res.send(hbsObject);
  });
});

router.post("/mobile/users", function (req, res) {

  // req.checkBody('username', 'Name is required').notEmpty();
  // req.checkBody('user_email', 'Email is required').notEmpty();
  // req.checkBody('user_email', 'Please enter a valid email').isEmail();
  // req.checkBody('user_address', 'Address is required').notEmpty();
  // req.checkBody('user_zipcode', 'Zipcode is required').notEmpty();

  // const errors = req.asyncValidationErrors();
  // // errors ? req.session.errors = errors && res.redirect('/user') : req.session.success = true && res.redirect('/');
  // if (errors) {
  //   res.redirect('/registration');
  // } else {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        res.render('login', {
          status: 'Unable to create username with password provided',
          error: err
        })
      } else {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          mobile.create('users', [
            "username", "first_name", "last_name", "password", "user_email", "user_phone", "user_address", "user_zipcode"
          ], [
              req.body.username, req.body.first_name, req.body.last_name, hash, req.body.user_email, req.body.user_phone, req.body.user_address, req.body.user_zipcode
            ], function (result) {
            });
        }).then(() => { res.redirect('/auth/sign-in') }).catch((err) => {
          res.render('sign-up', {
            status: 'Unable to create username with password provided',
            error: err
          })
        })
      }
    });
  //}
});


router.post("/protected/checkout/:id/", function (req, res) {
  // var token = req.headers['x-access-token'];
  // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  // jwt.verify(token, config.secret, function(err, decoded) {
  //   if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  //   res.status(200).send(decoded);
  // });
  let token_info = decodeJwt(req.headers.cookie);
  console.log(req.body)
  mobile.create('orders',
    ["userID", "productID", "order_timestamp"],
    [token_info.userId, req.body.productID, moment().format("YYYY-MM-DD HH:mm:ss")], (result) => {
      res.redirect('/');
    });
});

module.exports = router;
