import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../Context";
import { TextField, Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
// import LocationOnIcon from "@material-ui/icons/LocationOn";
import "../../css/homecss/Main.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";

function Main() {
  let history = useHistory();
  const provider = new OpenStreetMapProvider();
  const [nearby, setNearby] = useState([]);

  let initVals = { pickup: "", destination: "" };
  const [vals, setVal] = useState(initVals);
  const { source1, destination1 } = useContext(UserContext);
  const [source, setSource] = source1;
  const [destination, setDestination] = destination1;

  const [page, setpage] = useState(0);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setVal({ ...vals, [name]: value });
    const results = await provider.search({ query: value });
    setNearby(results);
  };
  const prevpage = () => {
    var present = page - 1;
    if (present === -1) {
      present = 1;
    }
    setpage(present);
  };
  const nextpage = () => {
    var present = page + 1;
    if (present === 2) {
      present = 0;
    }
    setpage(present);
  };
  // const getlocation = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     function (position) {
  //       // success cb
  //       // console.log(position);
  //     },
  //     function () {
  //       // fail cb
  //     }
  //   );
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await setSource(vals.pickup);
    await setDestination(vals.destination);
    await history.push("/ride");
    console.log(vals);
  };
  useEffect(() => {
    setTimeout(function () {
      nextpage();
    }, 150000);
  }, []);

  useEffect(() => {
    setTimeout(function () {
      nextpage();
    }, 150000);
  }, [page]);

  return (
    <React.Fragment>
      {page === 0 ? (
        <div className="page1">
          <Grid container>
            <Grid item xs={1}>
              <ArrowBackIosIcon className="backarrow" onClick={prevpage} />
            </Grid>
            <Grid item xs={4}>
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
                      <input
                        type="submit"
                        value="Scheduled for later"
                        id="later"
                        className="btn"
                      />
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={1}>
              <ArrowForwardIosIcon className="frontarrow" onClick={nextpage} />
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className="page2">
          <Grid container>
            <Grid item xs={1}>
              <ArrowBackIosIcon className="backarrow" onClick={prevpage} />
            </Grid>{" "}
            <Grid item xs={4}>
              <div className="driverprofit">
                <div className="profithead">
                  <h1>Get in the driver's seat </h1>
                  <h1>and get paid</h1>
                </div>
                <div className="profitinfo">
                  <p>
                    Drive on the platform with the largest network of active
                    riders.
                  </p>
                </div>
                <Grid container>
                  <Grid item xs={6}>
                    <Link
                      to="/registerdriver"
                      style={{ textDecoration: "none" }}
                    >
                      <input
                        type="submit"
                        value="Sign up to drive"
                        id="request"
                        className="btn"
                      />
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={1}>
              <ArrowForwardIosIcon className="frontarrow" onClick={nextpage} />
            </Grid>
          </Grid>
        </div>
      )}
    </React.Fragment>
  );
}

export default Main;
