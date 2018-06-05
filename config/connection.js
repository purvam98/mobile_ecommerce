let mysql = require("mysql");
let connection;
if (process.env.CLEARDB_DATABASE_URL) {
  connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL)
} else {
connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "HamburglarMcNasty92",
  database: "commerce_db"
});
}

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;