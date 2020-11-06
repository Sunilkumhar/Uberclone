import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import "../../css/homecss/Footer.css";

function Footer() {
  return (
    <div className="mainfooter">
      <footer className="registerdfooter">
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <p>&#169; 2020 Uber Technologies Inc.</p>
          </Grid>
          <Grid item xs={4}>
            <Link to="/safety" style={{ textDecoration: "none" }}>
              <p style={{ color: "#12949b", cursor: "pointer" }}>Safety</p>
            </Link>
          </Grid>
          <Grid item xs={2}>
            <Link to="/help" style={{ textDecoration: "none" }}>
              <p style={{ color: "#12949b", cursor: "pointer" }}>Help</p>
            </Link>
          </Grid>
        </Grid>
      </footer>
    </div>
  );
}

export default Footer;
