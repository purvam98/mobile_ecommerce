const express = require("express");
const router = express.Router();
let mobile = require("../models/mobile_commerce.js");

router.get("/", function(req, res) {
    res.redirect('/mobile');
});

router.get('/mobile', function (req, res) {
	mobile.all(function (data) {
		let hbsObject = { burgers: data };
		res.render('index', hbsObject);
	});
});

router.post("/mobile/users", function(req, res) {
  mobile.create(users[
    "username", "first_name", "last_name", "user_email", "user_phone", "user_address", "user_zipcode"
  ], [
    req.body.username, req.body.first_name, req.body.last_name, req.body.user_email, req.body.user_phone, req.body.user_address, req.body.user_zipcode
  ], function(result) {
    res.redirect('/mobile');
  });
});
// function Person(first, last, age, eye) {
//   this.firstName = first;
//   this.lastName = last;
//   this.age = age;
//   this.eyeColor = eye;
// }
router.post("/mobile/order", function(req, res) {
  mobile.create([
    "userID", "productID", "order_timestamp", "payment_type"
  ], [
    req.body.userID, req.body.productID, req.body.order_timestamp, req.body.payment_type
  ], function(result) {
    res.redirect('/mobile');
  });
});

router.post("/mobile/users/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  mobile.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
        res.redirect('/mobile');
    }
  });
});

router.post('/burgers/delete/:id', function(req, res) {
  let condition = "id = " + req.params.id;
  mobile.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
        res.redirect('/burgers');
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
