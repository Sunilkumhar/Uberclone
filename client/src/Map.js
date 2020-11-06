import React, { useState } from "react";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Autocomplete from "@material-ui/lab/Autocomplete";

function Map() {
  const provider = new OpenStreetMapProvider();
  const [nearby, setNearby] = useState([]);
  const [currloc, setcurrloc] = useState("");

  const handlechange = async (e) => {
    const results = await provider.search({ query: e.target.value });
    // console.log(results);
    setNearby(results);
    setcurrloc(results[0].label);
    // console.log(currloc);
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    // console.log(results);
    console.log(nearby[0].label);
  };

  const searchControl = new GeoSearchControl({
    provider: provider,
    showMarker: true,
    showPopup: false,
    marker: {
      icon: new L.Icon.Default(),
      draggable: false,
    },
    popupFormat: ({ query, result }) => result.label,
    maxMarkers: 1,
    retainZoomLevel: false,
    animateZoom: true,
    autoClose: false,
    searchLabel: "Enter address",
    keepResult: false,
  });

  const map = new L.Map("map");
  map.addControl(searchControl);

  return (
    <React.Fragment>
      <Autocomplete
        id="combo-box-demo"
        options={nearby}
        getOptionLabel={(option) => option.label}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Combo box"
            variant="outlined"
            onChange={handlechange}
          />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        href="#contained-buttons"
        onSubmit={handlesubmit}
      >
        Link
      </Button>
    </React.Fragment>
  );
}

export default Map;
