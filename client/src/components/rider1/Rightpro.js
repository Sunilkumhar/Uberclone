import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../Context";
import Tippy from "@tippy.js/react";
import { TextField, Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "../../css/rider1/Rightpro.css";
import "tippy.js/dist/tippy.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";

function Rightpro({ ridinghistory, display }) {
  let history = useHistory();
  const provider = new OpenStreetMapProvider();

  let initVals = { pickup: "", destination: "" };
  const [nearby, setNearby] = useState([]);
  const [vals, setVal] = useState(initVals);
  const [currenthist, setcurrenthist] = useState([]);
  const { source1, destination1 } = useContext(UserContext);
  const [source, setSource] = source1;
  const [destination, setDestination] = destination1;

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setVal({ ...vals, [name]: value });
    const results = await provider.search({ query: value });
    setNearby(results);
  };
  useEffect(() => {
    for (let i = 0; i < ridinghistory.length; i++) {
      if (ridinghistory[i]._id === display) {
        setcurrenthist(ridinghistory[i]);
        console.log(ridinghistory[i]);
      }
    }
  }, [display]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSource(vals.pickup);
    setDestination(vals.destination);
    history.push("/ride");
    console.log(vals);
  };
  return (
    <div className="rightpro">
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
                {currenthist.driver_name}
              </span>
            }
          >
            <h4>DriverName : {currenthist.driver_name}</h4>
          </Tippy>
          <Tippy
            content={
              <span style={{ fontSize: "15px" }}>{currenthist.carnumber}</span>
            }
          >
            <h4>CarNumber : {currenthist.carnumber}</h4>
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
        <h2 style={{ textAlign: "center" }}>Take a ride </h2>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            id="combo-box-demo"
            options={nearby}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="pickup"
                name="pickup"
                autoFocus
                placeholder="Enter pickup location"
                style={{ background: "#f6f6f6" }}
                onChange={handleChange}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <SearchIcon className="findicon" />,
                  // endAdornment: <LocationOnIcon className="location" />,
                }}
              />
            )}
          />
          <Autocomplete
            id="combo-box-demo"
            options={nearby}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="destination"
                name="destination"
                autoComplete="destination"
                placeholder="Enter destination"
                style={{ background: "#f6f6f6" }}
                onChange={handleChange}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <SearchIcon className="findicon" />,
                }}
              />
            )}
          />
          <Grid container>
            <Grid item xs={6}>
              <input
                type="submit"
                value="Request now"
                id="request"
                className="btn"
              />
            </Grid>
            <Grid item xs={6}>
              <Link to="/ride" style={{ textDecoration: "none" }}>
                <input
                  type="submit"
                  value="Scheduled for later"
                  id="later"
                  className="btn"
                  style={{ width: "130px", fontSize: "15px", height: "48px" }}
                />
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default Rightpro;
