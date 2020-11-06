import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import "../../css/homecss/Safety.css";
import safety from "../../img/safety.svg";

function Safety() {
  return (
    <div className="safetyh">
      <Grid container spacing={0}>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <div className="safetyhhead">
            <h1>Our commitment to your</h1>
            <h1>safety</h1>
          </div>
          <div className="safetyhinfo">
            <p>
              With every safety feature we add and every standard in our
              Community Guidelines we uphold, we're committed to working to
              create a safe environment for our users.
            </p>
          </div>
          <Link to="/safety" style={{ textDecoration: "none" }}>
            <p className="left">Sell all safety features</p>
          </Link>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <img src={safety} alt="safety" />
        </Grid>
      </Grid>
    </div>
  );
}

export default Safety;
