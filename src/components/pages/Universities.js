import React, { useEffect, useState } from "react";
import BannerPicture from "../../images/universities.jpg";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { useSelector, useDispatch } from "react-redux";
import {
  setUniversityList,
  fetchCountryList,
} from "../../store/slices/universitiesSlice";
import { setMessage, setSeverity } from "../../store/slices/alertSlice";
import axios from "axios";
import * as Settings from "../../config/settings";
import NoticeBar from "../utils/NoticeBar";
import Banner from "../utils/Banner";
import UniversityCard from "../utils/UniversityCard";
import CountrySelector from "../utils/CountrySelector";
import { countryConvert } from "../../services/universitiesService";

// import material UI components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

const Universities = () => {
  // notice bar control
  const [barOpen, setBarOpen] = useState(false);

  const handleBarOpen = () => {
    setBarOpen(true);
  };

  const handleBarClose = () => {
    setBarOpen(false);
  };

  // Redux state setup
  const countryList = useSelector((state) => state.universities.countryList);
  const universityList = useSelector(
    (state) => state.universities.universityList
  );
  const apiStatus = useSelector((state) => state.universities.status);
  const apiError = useSelector((state) => state.universities.error);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  // selected univesity list for current page
  const [selectedList, setSelectedList] = useState([]);

  // State for page selector
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

  // Handle API response
  useEffect(() => {
    switch (apiStatus) {
      case Settings.API_IDLE:
        dispatch(fetchCountryList());
        break;

      case Settings.API_FAILED:
        dispatch(setMessage(apiError));
        dispatch(setSeverity(Settings.ALERT_ERROR));
        handleBarOpen();
        break;

      default:
        break;
    }
  }, [dispatch, apiStatus, apiError]);

  // Search function
  const handleSearch = async (country) => {
    if (country && country.length > 0) {
      let countryName = countryConvert(country); // convert name to match the university server
      await axios
        .get(Settings.UNIVERSITY_SERVER_URL + "?country=" + countryName)
        .then(function (res) {
          // handle success
          if (res.status === StatusCodes.OK) {
            res.data.sort(sortMethod);
            dispatch(setUniversityList(res.data));

            // If the number of data less than data per page
            if (Settings.DATA_PER_PAGE >= res.data.length) {
              setSelectedList(res.data);
            } else {
              setSelectedList(res.data.slice(0, Settings.DATA_PER_PAGE));
            }

            // Set page to the first page
            setPage(1);

            // Set total page
            setCount(Math.ceil(res.data.length / Settings.DATA_PER_PAGE));

            // If no result, show notice bar
            if (res.data.length === 0) {
              dispatch(setMessage(Settings.NO_RESULT));
              dispatch(setSeverity(Settings.ALERT_WARNING));
              handleBarOpen();
            }
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

  const handlePageChange = (event, value) => {
    setPage(value);
    // Set data for this page
    if (value * Settings.DATA_PER_PAGE <= universityList.length) {
      setSelectedList(
        universityList.slice(
          (value - 1) * Settings.DATA_PER_PAGE,
          value * Settings.DATA_PER_PAGE
        )
      );
    } else {
      setSelectedList(
        universityList.slice(
          (value - 1) * Settings.DATA_PER_PAGE,
          universityList.length
        )
      );
    }
  };

  // sort method
  const sortMethod = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Banner and title */}
      <Banner
        bannerPicture={BannerPicture}
        bannerTitle={Settings.UNIVERSITIES_TITLE}
      />

      {/* Country select bar */}
      <Box sx={{ width: "90%", margin: "20px auto" }}>
        <CountrySelector
          handleSearch={handleSearch}
          countryList={countryList}
        />
      </Box>

      {/* Top page Selector */}
      {Settings.DATA_PER_PAGE >= universityList.length ? (
        <></>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Pagination
            count={count}
            page={page}
            size="large"
            variant="outlined"
            shape="rounded"
            color="primary"
            onChange={handlePageChange}
          />
        </Box>
      )}

      {/* Post grid */}
      <Box sx={{ width: "90%", margin: "20px auto" }}>
        <Grid container spacing={4}>
          {selectedList.map((university, index) => {
            return (
              <Grid item lg={4} md={6} xs={12} key={index}>
                <UniversityCard university={university} />
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Bottom page Selector */}
      {Settings.DATA_PER_PAGE >= universityList.length ? (
        <></>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Pagination
            count={count}
            page={page}
            size="large"
            variant="outlined"
            shape="rounded"
            color="primary"
            onChange={handlePageChange}
          />
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

export default Universities;
