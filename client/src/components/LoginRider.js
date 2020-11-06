import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Avatar, Grid } from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import rider from "../img/loginrider.jpg";
import "../css/LoginRider.css";

import axios from "./axios";

function LoginRider() {
  const [err, seterr] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [show, setshow] = useState("password");
  const [eyeicon, seteyeicon] = useState("VisibilityOffIcon");

  const handleChangeemail = (e) => {
    const email = e.target.value;
    setemail(email);
  };
  const handleChangepassword = (e) => {
    const password = e.target.value;
    setpassword(password);
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
    const user = {
      email,
      password,
    };
    await axios
      .post("http://localhost:5000/login", user, {
        headers: { type: "rider" },
      })
      .then((res) => {
        localStorage.setItem("token", res.data);
        localStorage.setItem("type", "rider");
        seterr("");
        window.location.href = "http://localhost:3000";
      })
      .catch((err) => {
        seterr("Invalid Email-Id or Password");
        setTimeout(() => {
          seterr("");
        }, 2000);
        console.log(err.message);
      });
  };
  const removeErr = () => {
    console.log(123);

    seterr("");
  };

  return (
    <div className="loginrider">
      <Grid container>
        <Grid item xs={8}>
          <div className="rider" style={{ border: "1px solid black" }}>
            <img src={rider} alt="rider" />
          </div>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <div className="loginform animate__animated animate__fadeInRight animate__delay-0.7s">
            {err !== "" ? (
              <div className="row error">
                <p className="col-10">{err}</p>
                <p className="remove col-2" onClick={removeErr}>
                  X
                </p>
              </div>
            ) : null}
            <Avatar style={{ margin: "auto", backgroundColor: "red" }}>
              <LockOutlinedIcon />
            </Avatar>
            <div className="heading">
              <h1
                className="display-4 text"
                style={{ textDecoration: "underline" }}
              >
                Log
              </h1>
              <h1
                className="display-4 text"
                style={{ textDecoration: "underline", color: "red" }}
              >
                In
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <TextField
                type="email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Id"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChangeemail}
              />
              <div className="passwordfield">
                <TextField
                  type={show}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="password"
                  name="password"
                  autoComplete="password"
                  onChange={handleChangepassword}
                />
                <div className="eye">
                  {eyeicon === "VisibilityOffIcon" ? (
                    <VisibilityOffIcon onClick={changeVisibilityOff} />
                  ) : (
                    <VisibilityIcon onClick={changeVisibility} />
                  )}
                </div>
              </div>
              <Grid container spacing={4}>
                <Grid item xs={8}>
                  <p>Don't have a account ?</p>
                </Grid>
                <Grid item xs>
                  <Link to="/registerrider" style={{ textDecoration: "none" }}>
                    <button type="button" className="btn btn-primary">
                      Sign-Up
                    </button>
                  </Link>
                </Grid>
              </Grid>
              <input
                type="submit"
                value="Log In"
                id="proceed"
                className="btn"
              />
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginRider;
