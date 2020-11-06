import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import "../../css/homecss/Vehicle.css";
import carfront from "../../img/carfront.png";
import cycle from "../../img/cycle.png";
import scooty from "../../img/scooty1.png";
import carback from "../../img/carback.png";

function Vehicle_img() {
  return (
    <div className="vehicleimg" style={{ background: "#f6f6f6" }}>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={5}>
          <div className="citiesinfo">
            <div className="cities">
              <h1>Setting 10,000+ cities in</h1>
              <h1>motion</h1>
            </div>
            <Link to="/allcities" style={{ textDecoration: "none" }}>
              <p className="left">View all cities</p>
            </Link>
          </div>
        </Grid>
      </Grid>
      <div className="vehicle">
        <img src={carfront} alt="car" className="carfront" />
        <img src={scooty} alt="scooty" className="scooty" />
        <img src={cycle} alt="cycle" className="cycle" />
        <img src={carback} alt="car" className="carback" />
      </div>
    </div>
  );
}

export default Vehicle_img;
