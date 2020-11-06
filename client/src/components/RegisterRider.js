import React, { useState } from "react";
import Nav from "./homecomps/Nav";
import { Link } from "react-router-dom";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import "../css/RegisterRider.css";
import uber from "../img/uber1.png";

import axios from "./axios";

function Register() {
  let initVals = { name: "", email: "", phone: "", password: "" };
  const [vals, setVal] = useState(initVals);
  const [errmsg, seterrmsg] = useState("");
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
      await axios
        .post("/register", vals, {
          headers: { type: "rider" },
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.headers["x-auth-token"]);
          localStorage.setItem("type", "rider");
          window.location.href = "http://localhost:3000";
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
    <div className="registerrider">
      <Nav name={localStorage.getItem("name")} />
      <img src={uber} alt="uber" />
      <div className="registerform">
        <h3 className="signride">Sign up to ride</h3>
        <p className="reliable">Reliable trips in minutes</p>
        {errmsg !== "" ? (
          <div className=" row error">
            <p className="col-11">{errmsg}</p>
            <p className="col-1 remove" onClick={removeErr}>
              X
            </p>
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Username"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            type="email"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Id"
            name="email"
            autoComplete="email"
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
            style={{ display: "flex", fontSize: "14px", marginTop: "15px" }}
          >
            <p>Have an account ? </p>
            <Link
              to="/loginrider"
              style={{ textDecoration: "none", marginLeft: "3px" }}
            >
              <p> Log in</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
