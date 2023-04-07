import React from "react";

// import material UI components
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CountrySelector = (props) => {
  return (
    <FormControl sx={{ width: "400px" }}>
      <InputLabel id="country-select-label">Country</InputLabel>
      <Select
        labelId="country-select-label"
        label="Country"
        defaultValue=""
        onChange={(e) => props.handleSearch(e.target.value)}
      >
        <MenuItem value="">
          <br />
        </MenuItem>
        {props.countryList.map((country, index) => {
          return (
            <MenuItem key={index} value={country.name}>
              {country.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CountrySelector;
