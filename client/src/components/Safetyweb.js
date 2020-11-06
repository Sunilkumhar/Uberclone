import React, { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Grid } from "@material-ui/core";
import Nav from "./homecomps/Nav";
import Footer from "./homecomps/Footer";
import "../css/Safetyweb.css";
import commit from "../img/commit.jpg";
import one from "../img/1.png";
import two from "../img/2.png";
import three from "../img/3.png";
import four from "../img/4.png";
import five from "../img/5.png";
import six from "../img/6.png";

function Safetyweb() {
  const [page, setpage] = useState(1);
  const handleChange = (event, value) => {
    setpage(value);
  };
  return (
    <div className="safetyweb">
      <Nav name={localStorage.getItem("name")} />
      <div className="commitment">
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            <div className="commithead">
              <h1>Our commitment to</h1>
              <h1>safety</h1>
            </div>
            <div className="commitinfo">
              <p>
                We want you to move freely, make the most of your time, and be
                connected to the people and places that matter most to you.
                That’s why we are committed to safety, from the creation of new
                standards to the development of technology with the aim of
                reducing incidents.
              </p>
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <div className="commitimg">
              <img src={commit} alt="commit" />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="moresafety">
        {page === 1 ? (
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <img src={one} alt="one" />
              <div className="morehead">
                <h5>Our new Door-to-Door Safety Standard</h5>
              </div>
              <div className="moreinfo">
                <p>
                  We want you to feel safe riding with Uber as our communities
                  start to move again. That’s why we’re introducing our new
                  Door-to-Door Safety Standard. Powered by Uber’s innovative
                  technology, encouraging shared responsibility, and including
                  guidance from health experts, these new measures are designed
                  to help protect the health and safety of everyone who uses our
                  platform.
                </p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <img src={two} alt="two" />
              <div className="morehead">
                <h5>In this together</h5>
              </div>
              <div className="moreinfo">
                <p>
                  All riders and drivers must wear a face cover or mask when
                  using Uber.
                </p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <img src={three} alt="three" />
              <div className="morehead">
                <h5>Face Cover Check</h5>
              </div>
              <div className="moreinfo">
                <p>
                  We ask drivers to take a photo of themselves before they can
                  begin driving, and our technology helps verify that they are
                  wearing a face cover.
                </p>
              </div>
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <img src={four} alt="four" />
              <div className="morehead">
                <h5>Health and safety supplies for drivers</h5>
              </div>
              <div className="moreinfo">
                <p>
                  We are working to provide drivers and delivery people with
                  health and safety supplies like face covers, disinfectants,
                  and gloves to deliver food.
                </p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <img src={five} alt="five" />
              <div className="morehead">
                <h5>Expert-led guidance</h5>
              </div>
              <div className="moreinfo">
                <p>
                  We are working with the World Health Organization (WHO) to
                  share safety tips and resources.
                </p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <img src={six} alt="six" />
              <div className="morehead">
                <h5>Ride Safety Feedback</h5>
              </div>
              <div className="moreinfo">
                <p>
                  You’ll now be able to leave feedback on health issues, such as
                  a driver not wearing a face cover or a mask. This helps us
                  improve and holds everyone accountable.
                </p>
              </div>
            </Grid>
          </Grid>
        )}
        <div className="paginate">
          <Pagination count={2} onChange={handleChange} />
        </div>
      </div>
      <div className="buildsafety">
        <div className="buidhead">
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={10}>
              <div className="buildhead">
                <h1>How safety is built into your experience</h1>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <div className="buildinfo">
                <h5>Safety features in the app</h5>
                <p>
                  Share your trip details with loved ones. Track your trip
                  during your ride. Our technology helps put peace of mind at
                  your fingertips.
                </p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="buildinfo">
                <h5>An inclusive community</h5>
                <p>
                  Millions of riders and drivers share a set of Community
                  Guidelines, holding each other accountable to do the right
                  thing.
                </p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="buildinfo">
                <h5>Support at every turn</h5>
                <p>
                  A specially trained team is available 24/7. Reach them in the
                  app, day or night, with any questions or safety concerns.
                </p>
              </div>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Safetyweb;
