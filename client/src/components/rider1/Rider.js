import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Nav from "../homecomps/Nav";
import Leftpro from "./Leftpro";
import Rightpro from "./Rightpro";
import Centrepro from "./Centrepro";

import axios from "../axios";

function Rider() {
  const [display, setdisplay] = useState(1);
  const [user, setuser] = useState([]);
  const [history, sethistory] = useState([]);

  useEffect(async () => {
    await axios
      .get(`/${localStorage.getItem("_id")}`, {
        headers: { type: "rider" },
      })
      .then((res) => {
        setuser(res.data);
        sethistory(res.data.ridinghistory);
      })
      .catch((err) => {
        console.log(err.status);
      });
  }, []);

  useEffect(async () => {
    history.reverse();
    const x = history.length;
    const d = history[0];
    await setdisplay(d._id);
  }, [history]);

  return (
    <div style={{ background: "rgb(175, 173, 173)" }}>
      <Nav name={localStorage.getItem("name")} />
      <Grid container>
        <Grid item xs={3}>
          <Leftpro {...user} />
        </Grid>
        <Grid item xs={6}>
          <Centrepro
            ridinghistory={history}
            display={display}
            setdisplay={setdisplay}
          />
        </Grid>
        <Grid item xs={3}>
          <Rightpro ridinghistory={history} display={display} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Rider;
