// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

let mobile = {
  all: function(table, cb) {
    orm.all(table, function(res) {
      cb(res);
    });
  },
  one: function(table, condition, cb) {
    orm.one(table, condition, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(tables, cols, vals, cb) {
    orm.create(tables, cols, vals, function(res) {
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
module.exports = mobile;
