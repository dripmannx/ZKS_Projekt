import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Rights from "../pages/Rights";

function Routing() {
  return (
    <Router>
      

      <Routes>
        <Route path="/" exact element={<Rights />}></Route>
      </Routes>
    </Router>
  );
}

export default Routing;
