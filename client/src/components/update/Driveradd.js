import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../homecomps/Nav";
import { TextField, Grid, Button } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import "../../css/update/DriverUpdate.css";

import axios from "../axios";

function DriverUpdate() {
  const [user, setuser] = useState([]);
  const [vals, setVal] = useState([]);
  const [size, setSize] = useState(0);
  const [alignment, setAlignment] = React.useState("");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVal({ ...vals, [name]: value });
  };

  useEffect(async () => {
    await axios
      .get(`/${localStorage.getItem("_id")}`, {
        headers: { type: "driver" },
      })
      .then((res) => {
        setuser(res.data);
        let initVals = {
          carname: res.data.carname,
          carnumber: res.data.carnumber,
        };
        setVal(initVals);
      })
      .catch((err) => {
        console.log(err.status);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setVal({ ...vals, carsize: size });
    console.log(vals);
    await axios
      .put(`/${localStorage.getItem("_id")}/update`, vals, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          type: "driver",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.href = "http://localhost:3000/driver";
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="drivermore">
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <div className="drivercar">
              <div className="carhead">
                <h1>Update Additional Info : </h1>
              </div>
              <div className="carmain">
                <form onSubmit={handleSubmit}>
                  <TextField
                    type="text"
                    margin="normal"
                    fullWidth
                    id="carname"
                    label="Car Name"
                    name="carname"
                    autoComplete="carname"
                    autoFocus
                    placeholder={user.carname}
                    onChange={handleChange}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <label
                      htmlFor="carsize"
                      style={{
                        marginRight: "10%",
                        marginTop: "10px",
                        paddingTop: "10px",
                      }}
                    >
                      <h5>Car Size</h5>
                    </label>
                    <ToggleButtonGroup
                      size="small"
                      value={alignment}
                      exclusive
                      onChange={handleAlignment}
                      aria-label="text alignment"
                      className="carsize"
                    >
                      <ToggleButton value="left" aria-label="left aligned">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{
                            margin: "0px 10px",
                            marginTop: "10px",
                            width: "50px",
                          }}
                          onClick={() => {
                            setSize(4);
                          }}
                        >
                          4
                        </Button>
                      </ToggleButton>
                      <ToggleButton value="center" aria-label="centered">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{
                            margin: "0px 10px",
                            marginTop: "10px",
                            width: "50px",
                          }}
                          onClick={() => {
                            setSize(5);
                          }}
                        >
                          5
                        </Button>
                      </ToggleButton>
                      <ToggleButton value="right" aria-label="right aligned">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{
                            margin: "0px 10px",
                            marginTop: "10px",
                            width: "50px",
                          }}
                          onClick={() => {
                            setSize(6);
                          }}
                        >
                          6
                        </Button>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>

                  <TextField
                    type="text"
                    margin="normal"
                    fullWidth
                    id="carnumber"
                    label="Car Number"
                    name="carnumber"
                    autoComplete="carnumber"
                    placeholder={user.carnumber}
                    onChange={handleChange}
                  />

                  <br />
                  <div className="rbuton">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{
                        justifyContent: "left",
                        height: "40px",
                        marginTop: "20px",
                      }}
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
                </form>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </div>
    </div>
  );
}

export default DriverUpdate;
