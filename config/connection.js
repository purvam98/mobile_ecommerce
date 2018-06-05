// Set up MySQL connection.
let mysql = require("mysql");
var connection;
var JAWSDB_URL="mysql://m8s4cswrtyk8pr2n:lstlhwlmihvohzz4@nuskkyrsgmn5rw8c.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/rziwiqa48l991pia";
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hetal@123",
    database: "commerce_db"
  });
};


// Make connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;