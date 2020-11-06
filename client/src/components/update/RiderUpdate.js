import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../homecomps/Nav";
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
// import "../../css/update/RiderUpdate.css";

import axios from "../axios";

function RiderUpdate() {
  const [user, setuser] = useState([]);
  const [vals, setVal] = useState([]);
  const [showpass, setshowpass] = useState(0);
  const [show, setshow] = useState("password");
  const [eyeicon, seteyeicon] = useState("VisibilityOffIcon");
  const [shown, setshown] = useState("password");
  const [eyeiconn, seteyeiconn] = useState("VisibilityOffIconn");

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
  const changeVisibilityn = () => {
    setshown("password");
    seteyeiconn("VisibilityOffIconn");
  };
  const changeVisibilityOffn = () => {
    setshown("text");
    seteyeiconn("VisibilityIconn");
  };

  useEffect(async () => {
    await axios
      .get(`/${localStorage.getItem("_id")}`, {
        headers: { type: "rider" },
      })
      .then((res) => {
        setuser(res.data);
        let initVals = {
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        };
        setVal(initVals);
      })
      .catch((err) => {
        console.log(err.status);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(vals);
    await axios
      .put(`/${localStorage.getItem("_id")}/update`, vals, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          type: "rider",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.href = "http://localhost:3000/rider";
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    changepassword();
  }, [showpass]);

  const changepassword = () => {
    if (showpass > 0) {
      return (
        <div className="changepass">
          <TextField
            variant="outlined"
            type={shown}
            margin="normal"
            required
            fullWidth
            id="oldpassword"
            label="Old Password"
            name="oldpassword"
            autoComplete="oldpassword"
            onChange={handleChange}
          />
          <div
            className="eye"
            style={{ position: "relative", left: "90%", bottom: "40px" }}
          >
            {eyeiconn === "VisibilityOffIconn" ? (
              <VisibilityOffIcon onClick={changeVisibilityOffn} />
            ) : (
              <VisibilityIcon onClick={changeVisibilityn} />
            )}
          </div>
          <TextField
            variant="outlined"
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
        </div>
      );
    }
  };

  return (
    <div className="updatedriver">
      <Nav name={localStorage.getItem("name")} />
      <div className="breakline">
        <br />
      </div>

      <div className="maininfo">
        <Grid container spacing={3}>
          <Grid item xs={4}></Grid>
          <Grid item xs={3}>
            <div className="registerform">
              <h3 style={{ textDecoration: "underline" }}>Upate profile</h3>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  type="email"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Id"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  placeholder={user.email}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  type="text"
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Username"
                  name="name"
                  autoComplete="name"
                  placeholder={user.name}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  type="number"
                  margin="normal"
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  placeholder={user.phone}
                  onChange={handleChange}
                />
                <br />
                <div className="changepass">
                  <h5
                    onClick={() => {
                      var x = showpass + 1;
                      setshowpass(x);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Change Password ?
                  </h5>
                  {changepassword()}
                </div>
                <br />
                <div className="rbuton">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ justifyContent: "left", height: "40px" }}
                  >
                    Update
                    <ArrowRightAltIcon
                      style={{
                        position: "absolute",
                        right: "10px",
                        fontSize: "30px",
                      }}
                    />
                  </Button>
                </div>
                <br />
              </form>
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    </div>
  );
}

export default RiderUpdate;
