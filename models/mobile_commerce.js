// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

let mobile = {
  all: function(table, cb) {
    orm.all(table, function(res) {
      cb(res);
    });
  },
  joinOrders: function(condition, cb) {
    orm.joinOrders(condition, function(res) {
      cb(res);
    });
  },
  one: function(table, condition, cb) {
    orm.one(table, condition, function(res) {
      cb(res);
    });
  },
  userlookup: function(val, cb) {
    return new Promise((resolve, reject) => { orm.userlookup(val, (res) => {
      resolve(res);
    });
  });
  },
  create: function(tables, cols, vals, cb) {
    orm.create(tables, cols, vals, function(res) {
      cb(res);
    });
  },
  check: function(tables, cols, vals, cb) {
    orm.check(tables, cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(table, objColVals, condition, cb) {
    orm.update(table, objColVals, condition, function(res) {
      cb(res);
    });
  },
  selectwhere: function(colToSearch, condition,cb) {
   orm.selectWhere("product_details",colToSearch,condition,function(res) {
    cb(res)
  }); 
  },
  selectallwhere: function(colToSearch1,colToSearch2,colToSearch3,condition1,condition2,condition3,cb) {
   orm.selectallWhere("product_details",colToSearch1,colToSearch2,colToSearch3,condition1,condition2,condition3,function(res) {
    cb(res)
  }); 
  },
  comparetwophone: function(colToSearch,condition1,condition2,cb) {
    orm.comparetwophone("product_details",colToSearch,condition1,condition2,function(res) {
      cb(res);
    });
  },
  searchphone: function(colToSearch1,colToSearch2,colToSearch3,colToSearch4,colToSearch5,condition,cb) {
    orm.searchphone("product_details",colToSearch1,colToSearch2,colToSearch3,colToSearch4,colToSearch5,condition,function(res) {
    cb(res);
  });
  }
};

module.exports = mobile;
