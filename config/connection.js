let mysql = require("mysql");
let connection;

connection = mysql.createConnection({
  host: "nuskkyrsgmn5rw8c.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "ocejmnq5b9s1z5l0",
  password: "rav6er2taesykvm7",
  database: "emkvh1nji9vooy3w"
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