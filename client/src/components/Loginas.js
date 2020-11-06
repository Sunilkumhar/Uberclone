import React from "react";
import Nav from "./homecomps/Nav";
import { Link } from "react-router-dom";
import "../css/Loginas.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

function Loginas() {
  return (
    <React.Fragment>
      <Nav name={localStorage.getItem("name")} />
      <div className="loginas">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1
            style={{ textAlign: "right", margin: "10px 150px", color: "black" }}
          >
            X
          </h1>
        </Link>
        <div className="options">
          <Link to="/logindriver" style={{ textDecoration: "none" }}>
            <div className="driver">
              <div style={{ display: "flex" }}>
                <h1>Driver Login</h1>
                <ArrowForwardIcon
                  style={{ marginLeft: "14%", fontSize: "50px" }}
                />
              </div>
              <h3>_____________________________</h3>
            </div>
          </Link>
          <Link to="/loginrider" style={{ textDecoration: "none" }}>
            <div className="rider">
              <div style={{ display: "flex" }}>
                <h1>Rider Login</h1>
                <ArrowForwardIcon
                  style={{ marginLeft: "20%", fontSize: "50px" }}
                />
              </div>
              <h2>_________________________</h2>
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Loginas;
