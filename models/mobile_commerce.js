// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

let mobile = {
  all: function(cb) {
    orm.all("commerce", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(table, cols, vals, cb) {
    for 
    orm.create(table, cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(table, objColVals, condition, cb) {
    orm.update(table, objColVals, condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = commerce;
