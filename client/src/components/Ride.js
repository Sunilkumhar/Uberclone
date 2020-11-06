import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./Context";
import Nav from "./homecomps/Nav";
import { TextField, Grid, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import GroupIcon from "@material-ui/icons/Group";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import "../css/Ride.css";
import ubergo from "../img/ubergo.png";
import ubergos from "../img/uber1.png";
import { OpenStreetMapProvider } from "leaflet-geosearch";

import axios from "./axios";

function Ride() {
  const provider = new OpenStreetMapProvider();

  let initVals = { pickup: "", destination: "" };
  const [nearby, setNearby] = useState([]);
  const [vals, setVal] = useState(initVals);
  const [clicked, setclicked] = useState(0);
  const [drivers, setdrivers] = useState([]);
  const [price, setPrice] = useState(356);
  const { source1, destination1 } = useContext(UserContext);
  const [source, setSource] = source1;
  const [destination, setDestination] = destination1;

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setVal({ ...vals, [name]: value });
    const results = await provider.search({ query: value });
    setNearby(results);
  };
  const getlocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // success cb
        // console.log(position);
      },
      function () {
        // fail cb
      }
    );
  };
  const requestnow = () => {
    setclicked(clicked + 1);
  };
  const addriderhistory = async (id, name, carnumber) => {
    const driverhistory = {
      start: vals.pickup,
      destination: vals.destination,
      price: price,
      customer_name: localStorage.getItem("name"),
    };
    await axios
      .post(`/${id}/driverhistory`, driverhistory, {
        headers: {
          type: "driver",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });

    const riderhistory = {
      start: vals.pickup,
      destination: vals.destination,
      price: price,
      driver_name: name,
      carnumber: carnumber,
    };
    await axios
      .post(`/${localStorage.getItem("_id")}/riderhistory`, riderhistory, {
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

  useEffect(async () => {
    vals.pickup = source;
    vals.destination = destination;
    console.log(vals);
    await axios
      .get(`/allusers`, {
        headers: { type: "driver" },
      })
      .then((res) => {
        console.log(res.data);
        setdrivers(res.data.filter((x) => x.currlocation === source));
      })
      .catch((err) => {
        console.log(err.status);
      });
  }, []);

  useEffect(() => {
    now();
  }, [clicked]);
  const now = (id, name, carnumber) => {
    if (clicked % 2 === 1) {
      return (
        <Button
          variant="contained"
          style={{
            backgroundColor: "#00a152",
            margin: "auto",
            display: "block",
            marginBottom: "20px",
          }}
          onClick={() => {
            addriderhistory(id, name, carnumber);
          }}
        >
          Ride now
        </Button>
      );
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .get(`http://localhost:5000/allusers`, {
        headers: { type: "driver" },
      })
      .then((res) => {
        setdrivers(res.data.filter((x) => x.currlocation === vals.pickup));
      })
      .catch((err) => {
        console.log(err.status);
      });
  };
  useEffect(() => {
    // console.log(drivers);
  }, [drivers]);
  return (
    <div className="takeride">
      <Nav name={localStorage.getItem("name")} />

      <div className="breakline">
        <br />
        <br />
      </div>

      <div className="maininfo">
        <Grid container spacing={3}>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <div className="pickup">
              <h1>Request a ride now</h1>
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
                      placeholder={vals.pickup}
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
                      placeholder={vals.destination}
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
                    <input
                      type="submit"
                      value="Scheduled for later"
                      id="later"
                      className="btn"
                    />
                  </Grid>
                </Grid>
              </form>
              <br />
              <div className="driverslist">
                {drivers.map((x) => (
                  <div className="availablity" key={x._id}>
                    <div className="driver1" onClick={requestnow}>
                      <img
                        src={ubergo}
                        alt={ubergos}
                        style={{ width: "100px" }}
                      />
                      <div className="mid">
                        <h3>{x.name} </h3>
                        <p>
                          <GroupIcon style={{ marginRight: "5px" }} />{" "}
                          {x.carsize}
                        </p>
                      </div>
                      <h3>&#x20B9;{price}</h3>
                    </div>
                    {now(x._id, x.name, x.carnumber)}
                  </div>
                ))}
              </div>
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Ride;
