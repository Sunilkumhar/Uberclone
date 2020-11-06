import React, { useState, useEffect } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import "../css/Drivermore.css";

import axios from "./axios";

function Drivermore() {
  let initVals = { carname: "", carnumber: "", carsize: -1 };
  const [vals, setVal] = useState(initVals);
  const [errmsg, seterrmsg] = useState("");
  const [size, setSize] = useState(-1);
  const [alignment, setAlignment] = React.useState("");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVal({ ...vals, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    vals.carsize = size;
    if (size === -1) {
      seterrmsg("Please select carsize");
    } else {
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
    }
    setTimeout(() => {
      seterrmsg("");
    }, 2000);
  };
  const removeErr = () => {
    seterrmsg("");
  };
  return (
    <div>
      <div className="drivermore">
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <div className="drivercar">
              {errmsg !== "" ? (
                <div className=" row error">
                  <p className="col-11">{errmsg}</p>
                  <p className="col-1 remove" onClick={removeErr}>
                    X
                  </p>
                </div>
              ) : null}
              <div className="carhead">
                <h1>Additional Info : </h1>
              </div>
              <div className="carmain">
                <form onSubmit={handleSubmit}>
                  <TextField
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    id="carname"
                    label="Car Name"
                    name="carname"
                    autoComplete="carname"
                    autoFocus
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
                    required
                    fullWidth
                    id="carnumber"
                    label="Car Number"
                    name="carnumber"
                    autoComplete="carnumber"
                    onChange={handleChange}
                  />

                  <div className="carbuton">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{
                        justifyContent: "left",
                        marginTop: "20px",
                        height: "40px",
                      }}
                    >
                      Proceed
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

export default Drivermore;
