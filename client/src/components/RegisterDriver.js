import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import "../css/RegisterDriver.css";
import earn from "../img/earn.png";
import set from "../img/set.png";
import sign from "../img/sign.png";

import axios from "./axios";

function Registerdriver() {
  let history = useHistory();

  let initVals = {
    name: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    carsize: null,
    carnumber: null,
    carname: null,
    currlocation: "",
  };
  const [errmsg, seterrmsg] = useState("");
  const [vals, setVal] = useState(initVals);
  const [agree, setagree] = useState(false);
  const [show, setshow] = useState("password");
  const [eyeicon, seteyeicon] = useState("VisibilityOffIcon");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVal({ ...vals, [name]: value });
  };
  const changeVisibility = () => {
    setshow("password");
    seteyeicon("VisibilityOffIcon");
  };
  const changeVisibilityOff = () => {
    setshow("text");
    seteyeicon("VisibilityIcon");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (vals.phone.length !== 10) {
      seterrmsg("Please enter a valid phone number");
    } else if (!agree) {
      seterrmsg("Please Agree terms & conditons");
    } else {
      vals.currlocation = vals.city;
      await axios
        .post("http://localhost:5000/register", vals, {
          headers: { type: "driver" },
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.headers["x-auth-token"]);
          localStorage.setItem("_id", res.data._id);
          localStorage.setItem("type", "driver");
          history.push("/registerdriver/more");
          seterrmsg("");
        })
        .catch((err) => {
          seterrmsg("User already registered");
        });
    }
    setTimeout(() => {
      seterrmsg("");
    }, 2000);
  };
  const removeErr = () => {
    seterrmsg("");
  };

  return (
    <div className="registerdriver">
      <div className="breakline">
        <br />
      </div>
      <div className="head">
        <Grid container spacing={3}>
          <Grid item xs={1}></Grid>
          <Grid item xs={7}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <h2 style={{ color: "black" }}>Uber</h2>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link to="/registerrider" style={{ textDecoration: "none" }}>
              <p style={{ color: "#279ea6" }}>Ride with Uber &gt; </p>
            </Link>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
      <div className="maininfo">
        <Grid container spacing={3}>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <div className="info" style={{ color: "white" }}>
              <h1>Drive With Uber</h1>
              <h1>Make money on your schedule</h1>
            </div>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={3}>
            <div className="registerform">
              {errmsg !== "" ? (
                <div className=" row error">
                  <p className="col-10">{errmsg}</p>
                  <p className="col-2 remove" onClick={removeErr}>
                    X
                  </p>
                </div>
              ) : null}
              <h3 style={{ textDecoration: "underline" }}>Sign up now</h3>
              <form onSubmit={handleSubmit}>
                <TextField
                  type="email"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Id"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleChange}
                />
                <TextField
                  type="text"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  name="name"
                  autoComplete="name"
                  onChange={handleChange}
                />
                <TextField
                  type="number"
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  onChange={handleChange}
                />
                <TextField
                  type={show}
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  onChange={handleChange}
                />
                <div
                  className="eye"
                  style={{ position: "relative", left: "90%", bottom: "40px" }}
                >
                  {eyeicon === "VisibilityOffIcon" ? (
                    <VisibilityOffIcon onClick={changeVisibilityOff} />
                  ) : (
                    <VisibilityIcon onClick={changeVisibility} />
                  )}
                </div>
                <TextField
                  type="text"
                  margin="normal"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={state.checkedB}
                      onChange={() => {
                        setagree(!agree);
                      }}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Agree Terms &amp; Conditions"
                />
                <div className="rbuton">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ justifyContent: "left" }}
                  >
                    NEXT
                    <ArrowRightAltIcon
                      style={{
                        position: "absolute",
                        right: "10px",
                        fontSize: "30px",
                      }}
                    />
                  </Button>
                </div>
                <div
                  className="already"
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    marginTop: "15px",
                  }}
                >
                  <p>Have an account ? </p>
                  <Link
                    to="/logindriver"
                    style={{ textDecoration: "none", marginLeft: "3px" }}
                  >
                    <p> Log in</p>
                  </Link>
                </div>
              </form>
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
      <div className="moreinfo">
        <Grid container spacing={4}>
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <h1 style={{ marginBottom: "50px" }}>Drive when you want</h1>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={2}></Grid>
          <Grid item xs={3}>
            <img src={earn} alt="earn" style={{ width: "160px" }} />
            <h4>Earn any time, anywhere</h4>
            <p style={{ fontSize: "15px", marginTop: "15px" }}>
              Drive when and where you want to. And choose how and when you want
              to get paid.
            </p>
          </Grid>
          {/* <Grid item xs={1}></Grid> */}
          <Grid item xs={3}>
            <img src={set} alt="set" style={{ width: "160px" }} />
            <h4>Set your own schedule</h4>
            <p style={{ fontSize: "15px", marginTop: "15px" }}>
              Only drive when it works for you. There’s no office or boss. That
              means you’ll always start and stop when you like – because with
              the Uber app, you’re in charge.
            </p>
          </Grid>
          <Grid item xs={3}>
            <img src={sign} alt="sign" style={{ width: "160px" }} />
            <h4>Signing up is easy</h4>
            <p style={{ fontSize: "15px", marginTop: "15px" }}>
              Sign up to gain access to the app. After your account activation
              is complete, you can start earning.
            </p>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
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

export default Registerdriver;
