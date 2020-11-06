import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippy.js/react";
import { Avatar } from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import PersonIcon from "@material-ui/icons/Person";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "tippy.js/dist/tippy.css";
import "../../css/homecss/Nav.css";

function Nav({ name }) {
  const [type, setType] = useState(localStorage.getItem("type"));
  return (
    <div className="navp" style={{ backgroundColor: "black" }}>
      <nav className="navbar-light ">
        <div className="nav-left">
          <Link to="/" className="navbar-brand" style={{ color: "White" }}>
            <h3>Uber</h3>
          </Link>
          <Link
            to="/safety"
            className="navbar-brand"
            style={{ color: "White", marginLeft: "20px" }}
          >
            <h6>Safety</h6>
          </Link>
          <Link
            to="/help"
            className="navbar-brand"
            style={{ color: "White", marginLeft: "20px" }}
          >
            <h6>Help</h6>
          </Link>
        </div>
        {name === "" ? (
          <div className="usericon btn  my-2 my-sm-0">
            <div className="log">
              <Link to="/loginas" style={{ textDecoration: "none" }}>
                <div className="btn welcome">
                  <PersonIcon />
                  <p style={{ color: "white" }}>Log in</p>
                </div>
              </Link>
            </div>
            <div className="sign">
              <Link to="/registeras" style={{ textDecoration: "none" }}>
                <div className="btn welcome">
                  <p style={{ color: "black" }}>Sign up</p>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="usericon btn  my-2 my-sm-0">
            <Link to={`/${type}`} style={{ textDecoration: "none" }}>
              <div className="avatar">
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
                <h2>{name}</h2>
              </div>
            </Link>
            <Tippy content={<span style={{ fontSize: "15px" }}>Log-out</span>}>
              <Link to="/logout" style={{ textDecoration: "none" }}>
                <div className="btn welcome">
                  <PowerSettingsNewIcon />
                </div>
              </Link>
            </Tippy>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Nav;
