import React from "react";
import Nav from "./homecomps/Nav";
import { Link } from "react-router-dom";
import "../css/Registeras.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

function Registeras() {
  return (
    <React.Fragment>
      <Nav name={localStorage.getItem("name")} />
      <div className="registeras">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1
            style={{ textAlign: "right", margin: "10px 150px", color: "black" }}
          >
            X
          </h1>
        </Link>
        <div className="optionsr">
          <Link to="/registerdriver" style={{ textDecoration: "none" }}>
            <div className="driverr">
              <div style={{ display: "flex" }}>
                <h1>Sign up to drive </h1>
                <ArrowForwardIcon
                  style={{ marginLeft: "13%", fontSize: "50px" }}
                />
              </div>
              <h3>________________________________</h3>
            </div>
          </Link>
          <Link to="/registerrider" style={{ textDecoration: "none" }}>
            <div className="riderr">
              <div style={{ display: "flex" }}>
                <h1>Sign up to ride</h1>
                <ArrowForwardIcon
                  style={{ marginLeft: "15%", fontSize: "50px" }}
                />
              </div>
              <h2>____________________________</h2>
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Registeras;
