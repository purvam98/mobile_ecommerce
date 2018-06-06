let mysql = require("mysql");
let connection;

connection = mysql.createConnection({
  host: "nuskkyrsgmn5rw8c.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "yz88pijz0j4st1r5",
  password: "",
  database: "r7o3qzw952f78424",
  max: 10,
idleTimeoutMillis: 30000,
});


connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
//mysql://bee747c0cbee0e:34570445@us-cdbr-iron-east-04.cleardb.net/heroku_825b14b8ea9a46b?reconnect=true
module.exports = connection;
