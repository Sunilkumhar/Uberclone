import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Grid } from "@material-ui/core";
import Nav from "./Nav";
import VehicleImg from "./Vehicle_img";
import Main from "./Main";
import Safety from "./Safety";
import Footer from "./Footer";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "../../css/homecss/Home.css";

function Home() {
  const [name, setname] = useState("");

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      localStorage.setItem("name", user.name);
      console.log(user);
      // if (user.drivinghistory) {
      //   localStorage.setItem("type", "driver");
      // } else {
      // localStorage.setItem("type", user.carname);
      // }
      localStorage.setItem("_id", user._id);
      setname(user.name);
    } catch {}
  }, []);

  return (
    <div>
      <Nav name={name} />
      <Main />
      <VehicleImg />
      <Safety />
      <div className="homesignup">
        <Grid container spacing={7}>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <Link to="/registerdriver" style={{ textDecoration: "none" }}>
              <div className="driver">
                <div style={{ display: "flex", marginBottom: "40px" }}>
                  <h2 style={{ fontSize: "35px" }}>Sign up to drive</h2>
                  <ArrowForwardIcon
                    style={{ marginLeft: "auto", fontSize: "50px" }}
                  />
                </div>
              </div>
            </Link>
          </Grid>

          <Grid item xs={5}>
            {" "}
            <Link to="/registerrider" style={{ textDecoration: "none" }}>
              <div className="rider">
                <div style={{ display: "flex", marginBottom: "40px" }}>
                  <h2 style={{ fontSize: "35px" }}> Sign up to ride</h2>
                  <ArrowForwardIcon
                    style={{ marginLeft: "auto", fontSize: "50px" }}
                  />
                </div>
              </div>
            </Link>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
