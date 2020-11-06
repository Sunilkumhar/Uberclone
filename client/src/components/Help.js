import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import SearchIcon from "@material-ui/icons/Search";

function Help() {
  const provider = new OpenStreetMapProvider();
  const [nearby, setNearby] = useState([]);

  const handleChange = async (e) => {
    e.preventDefault();
    // console.log(e);
    const results = await provider.search({ query: e.target.value });
    console.log(results);
    setNearby(results);
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      options={nearby}
      getOptionLabel={(option) => option.label}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          type="text"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="destination"
          name="destination"
          autoComplete="destination"
          placeholder="Enter destination"
          style={{ background: "#f6f6f6" }}
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            startAdornment: <SearchIcon className="findicon" />,
          }}
        />
      )}
    />
  );
}

export default Help;
