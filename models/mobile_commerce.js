// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

let mobile = {
  all: function(cb) {
    orm.all("product_details", function(res) {
      console.log(res)
      cb(res);
    });
    
  },
  selectwhere: function(colToSearch, condition,cb)
  {
   orm.selectWhere("product_details",colToSearch,condition,function(res)
  {
    cb(res)
  }); 
  },
  one: function(table, condition, cb) {
    console.log('mobile_comm')
    orm.one(table, condition, function(res) {
      cb(res);
    });
  },
  selectallwhere: function(colToSearch1,colToSearch2,colToSearch3,condition1,condition2,condition3,cb)
  {
   orm.selectallWhere("product_details",colToSearch1,colToSearch2,colToSearch3,condition1,condition2,condition3,function(res)
  {
    cb(res)
  }); 
  },
  comparetwophone: function(colToSearch,condition1,condition2,cb)
  {
    orm.comparetwophone("product_details",colToSearch,condition1,condition2,function(res)
    {
      cb(res);
    });
  },
  searchphone: function(colToSearch1,colToSearch2,colToSearch3,colToSearch4,colToSearch5,condition,cb)
  {
    orm.searchphone("product_details",colToSearch1,colToSearch2,colToSearch3,colToSearch4,colToSearch5,condition,function(res)
  {
    cb(res);
  });
  }
  

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
