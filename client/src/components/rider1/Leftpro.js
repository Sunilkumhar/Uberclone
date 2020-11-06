import React from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "../../css/rider1/Leftpro.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import male from "../../img/male.png";

import axios from "../axios";

function Leftpro({ name, email, phone, avatar }) {
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
                  type: "rider",
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
    <div className="leftpro">
      <div className="riderimg">
        <img src={male} alt="male" style={{ width: "200px" }} />
      </div>
      <br />
      <br />
      <div className="riderinfo">
        <h3>Name : {name}</h3>
        <h3>Email : {email}</h3>
        <h3>Phone : {phone}</h3>
      </div>
      <br />
      <br />
      <div className="editpro">
        <Link to="/rider/update" style={{ textDecoration: "none" }}>
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

export default Leftpro;
