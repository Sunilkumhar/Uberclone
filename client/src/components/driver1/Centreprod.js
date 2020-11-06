import React from "react";
import "../../css/driver1/Centreprod.css";
import map from "../../img/main1.jpg";

function Centreprod({ history, display, setdisplay }) {
  return (
    <div className="centreprod">
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
          {history.map((x) => (
            <tr key={x._id}>
              <React.Fragment>
                <td>{x.start}</td>
                <td>{x.destination}</td>
                <td>{x.date}</td>
                <td>
                  <button
                    onClick={() => {
                      setdisplay(x._id);
                    }}
                  >
                    MORE
                  </button>
                </td>
              </React.Fragment>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Centreprod;
