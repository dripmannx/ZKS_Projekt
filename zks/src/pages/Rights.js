import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Navbar from "../components/Navbar";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "./Rights.css";
function Rights() {
  const getRights = async () => {
    await fetch("http://localhost:2000/api/rights")
      .then((res) => res.json())
      .then((data) => {
        setRights(data);
      });
  };
  const [rights, setRights] = useState([]);
  const [RFID, setRFID] = useState("");
  const [entry, setEntry] = useState(1);
document.title="Berechtigungen"
  const edit = (e, id, value) => {
    e.preventDefault();
    axios
      .put("http://localhost:2000/api/rights/" + id, {
        access: value === 1 ? 0 : 1,
      })
      .then((response) => {
        console.log(response);
        getRights();
      })
      .catch((error) => {
        console.error("Something went wrong!", error);
      });
  };
  const remove = (e, id) => {
    e.preventDefault();
    axios
      .delete("http://localhost:2000/api/rights/" + id)
      .then((response) => {
        console.log(response);
        getRights();
      })
      .catch((error) => {
        console.error("Something went wrong!", error);
      });
  };
  const handleSubmit = (e) => {
      console.log(RFID,entry);
    e.preventDefault();
    axios
      .post("http://localhost:2000/api/rights", { rfid: RFID, access: entry})
      .then((response) => {
        console.log(response);
        setEntry("");
        setRFID("");
        getRights();
      })
      .catch((error) => {
        console.error("Something went wrong!", error);
      });
  };
  useEffect(() => {
    getRights();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="inputRight">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="rfid"
            value={RFID}
            placeholder="RFID Tag"
            className="rfid"
            onChange={(e) => setRFID(e.target.value)}
          />
          <label>Zutritt</label>
          <select
            name="entry"
            value={entry}
            className="entry"
            onChange={(e) => {
              setEntry(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option default value="1">
              Ja
            </option>
            <option value="0">Nein</option>
          </select>
          <input type="submit" className="submit" />
        </form>
      </div>
      <div className="top">
        {rights.map((right) => (
          <div className="cardHolder">
            <Card
              className="card"
              key={right.user_ID}
              sx={{ height: 140, width: 1000 }}
            >
              <CardContent>
                <Typography className="text-xs" variant="body1" component="h2">
                  ID: {right.user_ID}
                </Typography>
                <Typography className="text-xs" variant="body1" component="h2">
                  RFID Tag: {right.rfid}
                </Typography>
                <Typography className="text-xs" variant="body1" component="h2">
                  Hat Zutritt: {right.access === 1 ? "Ja" : "Nein"}
                </Typography>
                <Button onClick={(e) => remove(e, right.user_ID)}>
                  Löschen
                </Button>
                <Button onClick={(e) => edit(e, right.user_ID, right.access)}>
                  {right.access === 1 ? "Sperren" : "Zulassen"}
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rights;
