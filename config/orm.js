
const connection = require("../config/connection.js");

function printQuestionMarks(num) {
  let arr = new Array(num);
  let i = 0;
  while (i < num) { arr[i] = "?"; i++; }
  return arr.toString();
}

function objToSql(ob) {
  let arr = [];
  for (let key in ob) {
    let value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

let orm = {
  all: function (tableInput, cb) {
    let queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  one: function (tableInput, criteria, cb) {
    let queryString = "SELECT * FROM " + tableInput + " WHERE " + criteria + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  selectWhere: function (tableInput, colToSearch, condition, cb) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";

    console.log('Query: ', `SELECT * FROM ${tableInput} WHERE ${colToSearch} = ${condition}`);

    connection.query(queryString, [tableInput, colToSearch, condition], function (err, result) {
      if (err) throw err;
      console.log(tableInput, colToSearch, condition);
      cb(result);
    });
  },
  joinOrders: function (condition, cb) {
    let queryString = "SELECT orders.orderID , orders.userID , orders.order_timestamp , product_details.product_price , product_details.productID , product_details.product_name FROM orders LEFT JOIN product_details ON orders.productID = product_details.productID AND orders.userID = " + condition
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  userlookup: function (val, cb) {
    let queryString = "SELECT * FROM users WHERE user_email = '" + val + "';"
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  check: function (table, cols, vals, cb) {
    let queryString = "SELECT * FROM " + table + " WHERE " + cols[0] + " = ?";
    let i = 1;
    while (i < vals.length) { queryString += " OR " + cols[i] + " = ?"; i++; }
    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  create: function (table, cols, vals, cb) {
    let queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    connection.query(queryString, vals, function (err, result) {
      if (err) {
        cb(err.errno);
      } else {
        cb(result);
      }
    });
  },

  update: function (table, objColVals, condition, cb) {
    let queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  selectallWhere:function(tableInput,colToSearch1,colToSearch2,colToSearch3,condition1,condition2,condition3,cb)
  {
    console.log('Query: ', `SELECT * FROM ${tableInput} WHERE ${colToSearch1} = ${condition1} AND ${colToSearch2} <= ${condition2} AND ${colToSearch3} <= ${condition3}`);
    var queryString = "SELECT * FROM ?? WHERE ?? = ? AND ?? <= ? AND ?? <= ?";
    connection.query(queryString, [tableInput,colToSearch1,condition1,colToSearch2,condition2,colToSearch3,condition3], function(err, result) {
      if (err) throw err;
      
      cb(result);
    });    
  },
  comparetwophone:function(tableInput,colToSearch,condition1,condition2,cb)
  {
    console.log(condition1,condition2);
    console.log(`SELECT * FROM ${tableInput} WHERE ${colToSearch} IN ${(condition1,condition2)}`);
    var queryString="SELECT * FROM "+ tableInput + " WHERE " + colToSearch +" IN " +"(" + condition1 + ","+condition2+")";
    console.log(queryString);
    connection.query(queryString,function(err,result){
      if(err) throw err;
      cb(result);
    });
  },
  searchphone:function(tableInput,colToSearch1,colToSearch2,colToSearch3,colToSearch4,colToSearch5,condition,cb)
  {
    console.log(condition);
    //"SELECT * FROM products where UPPER(concat(productCode,productName,productVendor)) LIKE '%".strtoupper($a)."%'"; 
    var queryString="SELECT * FROM "+ tableInput + " WHERE concat(" +colToSearch1+","+colToSearch2+","+colToSearch3+","+colToSearch4+","+colToSearch5+") LIKE " +"'%"+condition+"%'";  
    console.log(queryString);
    connection.query(queryString,function(err,result){
      if(err) throw err;
      cb(result);
    });

  }
}


module.exports = orm;
