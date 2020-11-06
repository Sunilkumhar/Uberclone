import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./components/Context";
import Loginas from "./components/Loginas";
import Registeras from "./components/Registeras";
import LoginRider from "./components/LoginRider";
import LoginDriver from "./components/LoginDriver";
import Logout from "./components/Logout";
import RegisterDriver from "./components/RegisterDriver";
import DriverUpdate from "./components/update/DriverUpdate";
import Driveradd from "./components/update/Driveradd";
import RegisterRider from "./components/RegisterRider";
import RiderUpdate from "./components/update/RiderUpdate";
import Drivermore from "./components/Drivermore";
import Help from "./components/Help";
import Driver from "./components/driver1/Driver";
import Rider from "./components/rider1/Rider";
import Ride from "./components/Ride";
import Safetyweb from "./components/Safetyweb";
import Home from "./components/homecomps/Home";
import Map from "./Map";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/map">
              <Map />
            </Route>
            <Route exact path="/loginas">
              <Loginas />
            </Route>
            <Route exact path="/registeras">
              <Registeras />
            </Route>
            <Route exact path="/loginrider">
              <LoginRider />
            </Route>
            <Route exact path="/logindriver">
              <LoginDriver />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
            <Route exact path="/registerdriver">
              <RegisterDriver />
            </Route>
            <Route exact path="/registerrider">
              <RegisterRider />
            </Route>
            <Route exact path="/registerdriver/more">
              <Drivermore />
            </Route>
            <Route exact path="/help">
              <Help />
            </Route>
            <Route exact path="/safety">
              <Safetyweb />
            </Route>
            <Route exact path="/rider">
              <Rider />
            </Route>
            <Route exact path="/rider/update">
              <RiderUpdate />
            </Route>
            <Route exact path="/driver">
              <Driver />
            </Route>
            <Route exact path="/driver/update">
              <DriverUpdate />
            </Route>
            <Route exact path="/driver/updateadd">
              <Driveradd />
            </Route>
            <Route exact path="/ride">
              <Ride />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
