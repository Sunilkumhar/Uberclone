import React from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "../../css/driver1/Leftprod.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import male from "../../img/male.png";

import axios from "../axios";

function Leftprod({
  name,
  email,
  phone,
  city,
  currlocation,
  carsize,
  carnumber,
  carname,
  avatar,
}) {
  const deleteaccount = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            console.log("YES");
            await axios
              .delete(`/${localStorage.getItem("_id")}/delete`, {
                headers: {
                  "x-auth-token": localStorage.getItem("token"),
                  type: "driver",
                },
              })
              .then((res) => {
                window.location.href = "http://localhost:3000/logout";
              })
              .catch((err) => {
                console.log(err.message);
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            console.log("NO");
          },
        },
      ],
    });
  };
  return (
    <div className="leftprod">
      <div className="riderimg">
        <img src={male} alt="male" style={{ width: "200px" }} />
      </div>
      <br />
      <br />
      <div className="riderinfo">
        <h3>Name : {name}</h3>
        <h3>Email : {email}</h3>
        <h3>Phone : {phone}</h3>
        <h3>city : {city}</h3>
      </div>
      <br />
      <div className="editpro">
        <Link to="/driver/update" style={{ textDecoration: "none" }}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            style={{ margin: "auto" }}
          >
            Edit Profile
          </Button>
        </Link>
      </div>
      <br />
      <br />
      <div className="riderinfo">
        <h3>Current location : {currlocation}</h3>
        <h3>Car Size : {carsize}</h3>
        <h3>Car Model : {carname}</h3>
        <h3>Car Number : {carnumber}</h3>
      </div>
      <br />
      <div className="editpro">
        <Link to="/driver/updateadd" style={{ textDecoration: "none" }}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            style={{ margin: "auto" }}
          >
            Edit Additional Info
          </Button>
        </Link>
      </div>
      <br />
      <br />
      <div className="editpro">
        <Button
          size="large"
          variant="contained"
          color="secondary"
          startIcon={<DeleteForeverIcon />}
          style={{ margin: "auto" }}
          onClick={deleteaccount}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}

export default Leftprod;
