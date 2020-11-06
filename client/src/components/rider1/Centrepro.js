import React from "react";
import Button from "@material-ui/core/Button";
import "../../css/rider1/Centrepro.css";
import map from "../../img/main1.jpg";

function Centrepro({ ridinghistory, display, setdisplay }) {
  return (
    <div className="centrepro">
      <div className="map">
        <img src={map} alt="map" />
      </div>
      <div className="historyr">
        <table id="customers">
          <tr>
            <th>Source</th>
            <th>Destination</th>
            <th>Date</th>
            <th>MORE </th>
          </tr>
          {ridinghistory.map((x) => (
            <tr key={x._id}>
              <React.Fragment>
                <td>{x.start}</td>
                <td>{x.destination}</td>
                <td>{x.date}</td>
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    href="#contained-buttons"
                    onClick={() => {
                      setdisplay(x._id);
                    }}
                  >
                    MORE
                  </Button>
                </td>
              </React.Fragment>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Centrepro;
