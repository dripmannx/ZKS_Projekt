//Config for mySQL Connection
const mysql = require("mysql");
const db = mysql.createConnection({
  host:"localhost",
  user: "root",
  password: "usbw",
  database: "rfid_user",
  
});

module.exports = db;
