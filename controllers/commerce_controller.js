const express = require("express");
const router = express.Router();
var first_phone;
var second_phone;
let mobile = require("../models/mobile_commerce.js");
router.get("/", function (req, res) {
  console.log('/ route hit');
  mobile.all(function (data) {
    //console.log(data)
    var hbsObject = {
      mobiles: data
    };

    res.render("index", hbsObject);
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
router.get('/mobile/product/:id', function (req, res) {
  const condition = "productID = " + req.params.id;
  console.log('here')
  mobile.one('product_details', condition, function (data) {
    data[0].product_specs = data[0].product_specs.split(":");
    let hbsObject = { mobiles: data };
    console.log(data[0])
    res.render('phone_details', hbsObject);
    //res.send(hbsObject);
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
router.post('/search',function(req,res)
{
  var search_field=req.body.search_field;
  console.log(search_field);
  mobile.searchphone("product_name","product_price","product_memory","product_specs","category_name",search_field,function(data)
{
  var hbsObject = {
    mobiles: data
  };
  res.render("searchphone", hbsObject);
});
});



// router.get('/mobile', function (req, res) {
// 	mobile.all(function (data) {
// 		var hbsObject = { burgers: data };
// 		res.render('index', hbsObject);
// 	});
// });

// router.post("/burgers/", function(req, res) {
//   mobile.create([
//     "burger_name", "devoured"
//   ], [
//     req.bodreqy.burger_name, req.body.devoured
//   ], function(result) {
//     res.redirect('/burgers');
//   });
// });

// router.post("/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;
//   mobile.update({
//     devoured: req.body.devoured
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       return res.status(404).end();
//     } else {
//         res.redirect('/burgers');
//     }
//   });
// });

// router.post('/burgers/delete/:id', function(req, res) {
//   let condition = "id = " + req.params.id;
//   mobile.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       return res.status(404).end();
//     } else {
//         res.redirect('/burgers');
//     }
//   });
// });

// Export routes for server.js to use.
module.exports = router;
