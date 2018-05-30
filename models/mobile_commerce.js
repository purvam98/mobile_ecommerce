// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

let mobile = {
  all: function(cb) {
    orm.all("product_details", function(res) {
      console.log(res)
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
//   create: function(cols, vals, cb) {
//     orm.create("users", cols, vals, function(res) {
//       cb(res);
//     });
//   },
//   update: function(objColVals, condition, cb) {
//     orm.update("product_details", objColVals, condition, function(res) {
//       cb(res);
//     });
//   }
 };

// Export the database functions for the controller (catsController.js).
module.exports = mobile;
