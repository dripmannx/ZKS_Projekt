//importing and initialize all required packages
const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();
const PORT = 2000;
app.use(cors());
app.use(express.json());

// Route to get all sensor data from the database
app.get("/api/rights", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log(err);
    }
    
    res.send(result);
  });
});



// Route to update the user setting from the database
app.put("/api/rights/:user_id", (req, res) => {
  
  db.query(`UPDATE user SET access='${req.body.access}' WHERE user_ID=${req.params.user_id}`, (err, result) => {
    console.log(req.body.access);
    if (err) {
      console.log(err);
    }
   console.log(result)
    res.send(result);
  });
  
});
app.delete("/api/rights/:user_id", (req, res) => {
  db.query(`DELETE FROM user WHERE user_ID=${req.params.user_id}`, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  }
)})
app.post("/api/rights", (req, res) => {
  console.log(req.body.access);
  db.query(`INSERT INTO user (rfid, access) VALUES ('${req.body.rfid}', '${req.body.access}')`, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  })
})
// Portsetting, currently on PORT 2000
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})
