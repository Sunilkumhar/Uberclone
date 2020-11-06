import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Nav from "../homecomps/Nav";
import Leftprod from "./Leftprod";
import Rightprod from "./Rightprod";
import Centreprod from "./Centreprod";

import axios from "../axios";

function Driver() {
  const [display, setdisplay] = useState(1);
  const [user, setuser] = useState([]);
  const [history, sethistory] = useState([]);

  useEffect(async () => {
    console.log(display);

    await axios
      .get(`/${localStorage.getItem("_id")}`, {
        headers: { type: "driver" },
      })
      .then((res) => {
        setuser(res.data);
        console.log(res.data);
        sethistory(res.data.drivinghistory);
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
    <div style={{ background: "rgb(175, 173, 173)", height: "107vh" }}>
      <Nav name={localStorage.getItem("name")} />
      <Grid container>
        <Grid item xs={3}>
          <Leftprod {...user} />
        </Grid>
        <Grid item xs={6}>
          <Centreprod
            history={history}
            display={display}
            setdisplay={setdisplay}
          />
        </Grid>
        <Grid item xs={3}>
          <Rightprod history={history} display={display} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Driver;
