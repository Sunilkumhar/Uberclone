import React, { useState, useEffect } from "react";
import Tippy from "@tippy.js/react";
import { TextField, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "../../css/driver1/Rightprod.css";
import "tippy.js/dist/tippy.css";

import axios from "../axios";

function Rightprod({ history, display }) {
  let initVals = { currlocation: "" };
  const [vals, setVal] = useState(initVals);
  const [currenthist, setcurrenthist] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVal({ ...vals, [name]: value });
  };
  useEffect(() => {
    for (let i = 0; i < history.length; i++) {
      if (history[i]._id === display) {
        setcurrenthist(history[i]);
        console.log(1234567);
      }
    }
  }, [display]);

  const handleSubmit = async (e) => {
    console.log(vals);

    e.preventDefault();
    await axios
      .put(`/${localStorage.getItem("_id")}/updateloc`, vals, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        // console.log(res);
        window.location.href = "http://localhost:3000";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="rightprod">
      <div className="current">
        <div className="currinfo" style={{ textAlign: "center" }}>
          <Tippy
            content={
              <span style={{ fontSize: "15px" }}>{currenthist.start}</span>
            }
          >
            <h4>Source : {currenthist.start}</h4>
          </Tippy>
          <Tippy
            content={
              <span style={{ fontSize: "15px" }}>
                {currenthist.destination}
              </span>
            }
          >
            <h4>Destination : {currenthist.destination}</h4>
          </Tippy>
          <Tippy
            content={
              <span style={{ fontSize: "15px" }}>{currenthist.price}</span>
            }
          >
            <h4>Price : {currenthist.price}</h4>
          </Tippy>
          <Tippy
            content={
              <span style={{ fontSize: "15px" }}>
                {currenthist.customer_name}
              </span>
            }
          >
            <h4>CustomerName : {currenthist.customer_name}</h4>
          </Tippy>
          <Tippy
            content={
              <span style={{ fontSize: "15px" }}>{currenthist.date}</span>
            }
          >
            <h4>Date : {currenthist.date}</h4>
          </Tippy>
        </div>
      </div>
      <div className="pickup">
        <h2 style={{ textAlign: "center" }}>Please Update your Location... </h2>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="pickup"
            name="currlocation"
            autoComplete="currlocation"
            placeholder="Enter current location"
            style={{ background: "#f6f6f6" }}
            onChange={handleChange}
            InputProps={{
              startAdornment: <SearchIcon className="findicon" />,
              endAdornment: <LocationOnIcon className="location" />,
            }}
          />

          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <input
                type="submit"
                value="UPDATE"
                id="request"
                className="btn"
                onClick={() => {
                  alert("Location Updated");
                }}
              />
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default Rightprod;
