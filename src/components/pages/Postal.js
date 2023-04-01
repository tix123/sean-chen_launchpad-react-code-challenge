import React, { useState } from "react";
import BannerPicture from "../../images/postal.jpg";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { useSelector, useDispatch } from "react-redux";
import { setPostalData } from "../../store/slices/postalSlice";
import { setMessage, setSeverity } from "../../store/slices/alertSlice";
import axios from "axios";
import * as Settings from "../../config/settings";
import NoticeBar from "../utils/NoticeBar";
import * as Styles from "../../styles/styles";

// import material UI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const Postal = () => {
  // notice bar control
  const [barOpen, setBarOpen] = useState(false);

  const handleBarOpen = () => {
    setBarOpen(true);
  };

  const handleBarClose = () => {
    setBarOpen(false);
  };

  // record the input
  const [zip, setZip] = useState(0);

  // Redux state setup
  const postalData = useSelector((state) => state.postal.postalData);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  // Search function
  const handleSearch = async (zip) => {
    // if the zip is not 5 digit
    if (zip.length !== 5) {
      dispatch(setMessage(Settings.ZIP_FORMAT));
      dispatch(setSeverity(Settings.ALERT_ERROR));
      handleBarOpen();
    } else {
      await axios
        .get(Settings.US_POSTAL_SERVER_URL + "/" + zip)
        .then(function (res) {
          // handle success
          if (res.status === StatusCodes.OK) {
            dispatch(setPostalData(res.data));
          } else {
            let reason = getReasonPhrase(res.status);
            dispatch(setMessage(reason));
            dispatch(setSeverity(Settings.ALERT_ERROR));
            handleBarOpen();
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          dispatch(setMessage(error.message));
          dispatch(setSeverity(Settings.ALERT_ERROR));
          handleBarOpen();
        });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Banner and title */}
      <Box sx={{ width: "100%", position: "relative" }}>
        <img src={BannerPicture} alt="banner" style={{ width: "100%" }} />
        <Typography variant="h1" component="span" sx={Styles.titleStyle}>
          POSTAL LOOKUP
        </Typography>
      </Box>

      {/* search bar */}
      <Box sx={{ width: "90%", margin: "20px auto" }}>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              placeholder="Search by Postal"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setZip(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={Styles.buttonStyle}
              onClick={() => handleSearch(zip)}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* display postal information */}
      {Object.keys(postalData).length === 0 ? (
        <></>
      ) : (
        <Box sx={{ width: "90%", margin: "50px auto" }}>
          <Grid container direction="column" spacing={2}>
            {/* postal code and country */}
            <Grid item>
              <Grid container rowSpacing={2} columnSpacing={20}>
                <Grid item>
                  <Typography sx={Styles.itemStyle} color="text.secondary">
                    POSTAL CODE
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {postalData["post code"]}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={Styles.itemStyle} color="text.secondary">
                    COUNTRY
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {postalData.country}({postalData["country abbreviation"]})
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Places in this postal code */}
            {postalData.places.map((place, index) => {
              return (
                <Grid item>
                  <Grid container rowSpacing={2} columnSpacing={20} key={index}>
                    <Grid item>
                      <Typography sx={Styles.itemStyle} color="text.secondary">
                        PLACE NAME
                      </Typography>
                      <Typography variant="h5" gutterBottom>
                        {place["place name"]}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={Styles.itemStyle} color="text.secondary">
                        STATE
                      </Typography>
                      <Typography variant="h5" gutterBottom>
                        {place.state}({place["state abbreviation"]})
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={Styles.itemStyle} color="text.secondary">
                        {"LATITUDE / LONGITUDE"}
                      </Typography>
                      <Typography variant="h5" gutterBottom>
                        ( {place.latitude} , {place.longitude} )
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {/* Notice bar */}
      <NoticeBar
        barOpen={barOpen}
        handleBarClose={handleBarClose}
        alertMessage={alert.message}
        alertSeverity={alert.severity}
      />
    </Box>
  );
};

export default Postal;
