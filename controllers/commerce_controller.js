const express = require("express");
const router = express.Router();
const mobile = require("../models/mobile_commerce.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const agentMan = require('../config/config.js');
var first_phone;
var second_phone;

function decodeJwt(cookieSrting) {
  let token = cookieSrting.slice(17).split('.', 3).join('.')
  let decoded = jwt.verify(token, agentMan.secret);
  return decoded;
};

router.get("/", function (req, res) {
  res.redirect('/mobile');
});

let logging = (cooks) => { return (cooks && decodeJwt(cooks)) ? "Logout" : "Login" };

router.get('/mobile', function (req, res) {
  mobile.all("product_details", function (data) {
    let hbsObject = {
      mobiles: data,
      logining: logging(req.headers.cookie)
    };
    res.render('index', hbsObject);
  });
});

router.get('/register', function (req, res) {
  res.render('registration');
});

router.get('/logout', (req, res) => {
  res.clearCookie("jwtAuthToken");
  res.redirect('/mobile')
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  req.checkBody('password', 'Password is Required').notEmpty();
  req.checkBody('user_email', 'Email is required').notEmpty();
  req.checkBody('user_email', 'Please enter a valid email').isEmail();

  const errors = req.validationErrors();
  if (errors) {
    console.log(errors)
    res.redirect('/login');
  } else {
    let lookup = mobile.userlookup(req.body.user_email, function (data) {
    }).then((data) => {
      console.log(data)
      if (data[0]) {
        bcrypt.compare(req.body.password, data[0].password, function (err, valid) {
          if (valid && !err) {
            const jwtAuthToken = jwt.sign({
              'userId': data[0].userID,
              'username': data[0].username
            },
              agentMan.secret,
              { expiresIn: 3600000 });
            res.cookie('jwtAuthToken', jwtAuthToken, {
              maxAge: 3600000,
              httpOnly: false,
              signed: true,
            })
            res.redirect('/');
          } else {
            console.log('here2')
            res.redirect('login');
          }
        })
      } else {
        console.log('here')
        res.redirect('login', { status: 'Username or password is incorrect' })
      }
    }).catch(next);
  }
});

router.get('/mobile/product/:id', function (req, res) {
  const condition = "productID = " + req.params.id;
  mobile.one('product_details', condition, function (data) {
    data[0].product_specs = data[0].product_specs.split(":");
    let hbsObject = { mobiles: data };
    res.render('phone_detail', hbsObject);
  });
});

router.post("/mobile/users", function (req, res) {

  req.checkBody('username', 'Name is required').notEmpty();
  req.checkBody('user_email', 'Email is required').notEmpty();
  req.checkBody('user_email', 'Please enter a valid email').isEmail();
  req.checkBody('user_address', 'Address is required').notEmpty();
  req.checkBody('user_zipcode', 'Zipcode is required').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    console.log(errors)
    res.redirect('/register');
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        console.log(err)
        res.redirect('/register')
      } else {
        new Promise((resolve, reject) => {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) {
              reject(err);
            }
            else {
              resolve(
                mobile.create('users', [
                  "username", "first_name", "last_name", "password", "user_email", "user_phone", "user_address", "user_zipcode", "timestamp"
                ], [
                    req.body.username, req.body.first_name, req.body.last_name, hash, req.body.user_email, req.body.user_phone, req.body.user_address, req.body.user_zipcode, moment().format("YYYY-MM-DD HH:mm:ss")
                  ], function (result) {
                    if (result === 1062) {
                      res.redirect('/register')
                    } else {
                      res.redirect('/login')
                    }
                  })
              );
            }
          })
        }).catch((err) => {
          res.redirect('/register')
        })
      }
    });
  }
});

router.get('/auth/orders/:id', function (req, res, next) {
  const condition = "userID = " + req.params.id;
  let token_info = decodeJwt(req.headers.cookie);
  if (req.params.id != token_info.userId) {
    res.redirect('/auth/orders/' + token_info.userId)
  } else {
    mobile.joinOrders(token_info.userId, (data) => {
      let hbsObject = { orders: data };
      res.render('orders', hbsObject);
    })
  }
})

router.get('/auth/orders', function (req, res) {
  let token_info = decodeJwt(req.headers.cookie);
  res.redirect('/auth/orders/' + token_info.userId);
});

router.post("/auth/checkout/:id", function (req, res) {
  let token_info = decodeJwt(req.headers.cookie);
  mobile.create('orders', ["userID", "productID", "order_timestamp"],
    [token_info.userId, req.body.productID, moment().format("YYYY-MM-DD HH:mm:ss")], (result, error) => {
    });
  res.redirect('/auth/orders/' + token_info.userId)
});

router.post('/compare', function (req, res) {
  first_phone = req.body.mobile1;
  second_phone = req.body.mobile2;
  mobile.comparetwophone("productID", first_phone, second_phone, function (data) {
    var hbsObject = {
      mobiles: data
    };

    res.render("compare", hbsObject);
  });
});

router.get('/comparejoie', function (req, res) {

  mobile.comparetwophone("productID", first_phone, second_phone, function (data) {
    data[0].product_specs = data[0].product_specs.split(":");
    data[1].product_specs = data[1].product_specs.split(":");
    var hbsObject = {
      mobiles: data
    };

    res.render("compare", hbsObject);
  });
});

router.get("/allmobiles/:id", function (req, res) {
  var condition = req.params.id;
  mobile.selectwhere("categoryID", condition, function (data) {
    console.log(data, "here");
    var hbsObject = {
      mobiles: data
    };
    res.render("allmobiles", hbsObject);
  });
});

router.post('/search', function (req, res) {
  var search_field = req.body.search_field;
  console.log(search_field);
  mobile.searchphone("product_name", "product_price", "product_memory", "product_specs", "category_name", search_field, function (data) {
    var hbsObject = {
      mobiles: data
    };
    res.render("searchphone", hbsObject);
  });
});

router.post('/criteria', function (req, res) {
  var category = req.body.category;
  var price_range = req.body.price_range;
  var memory = req.body.memory;
  mobile.selectallwhere("categoryID", "product_price", "product_memory", category, price_range, memory, function (data) {
    var hbsObject = {
      mobiles: data
    };
    res.render("criteria_search", hbsObject);
  });
});
module.exports = router;