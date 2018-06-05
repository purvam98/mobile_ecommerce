
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
  }
}

module.exports = orm;
