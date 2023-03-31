import React, { useEffect, useState } from "react";
import BannerPicture from "../images/universities.jpg"
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { useSelector, useDispatch } from "react-redux"
import { setCountryList, setUniversityList } from "../store/slices/universitiesSlice"
import { setMessage, setSeverity } from "../store/slices/alertSlice"
import axios from "axios";
import * as Settings from "../config/settings"
import NoticeBar from "./NoticeBar";
import { countryConvert } from "../services/universitiesService"

// import material UI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Pagination from '@mui/material/Pagination';


const Universities = () => {

    // notice bar control
    const [barOpen, setBarOpen] = useState(false)

    const handleBarOpen = () => {
        setBarOpen(true)
    }

    const handleBarClose = () => {
        setBarOpen(false)
    }

    // Redux state setup
    const countryList = useSelector(state => state.universities.countryList);
    const universityList = useSelector(state => state.universities.universityList);
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    // selected univesity list for current page
    const [selectedList, setSelectedList] = useState([])

    // State for page selector
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(1)

    // Get country list (only once)
    useEffect(() => {
        fetchCountryList();
    }, [])

    // Get country list and set data to Redux
    const fetchCountryList = async () => {
        await axios
            .get(Settings.COUNTRY_SERVER_URL + "/info?returns=none")
            .then(function (res) {
                // handle success
                if (res.status === StatusCodes.OK) {
                    res.data.data.sort(sortMethod);   // sort the list
                    dispatch(setCountryList(res.data.data))
                } else {
                    let reason = getReasonPhrase(res.status)
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

    // Search function
    const handleSearch = async (country) => {
        if (country && country.length > 0) {
            let countryName = countryConvert(country); // convert name to match the university server
            await axios
                .get(Settings.UNIVERSITY_SERVER_URL + "?country=" + countryName)
                .then(function (res) {
                    // handle success
                    if (res.status === StatusCodes.OK) {
                        res.data.sort(sortMethod)
                        dispatch(setUniversityList(res.data))

                        // If the number of data less than data per page
                        if (Settings.DATA_PER_PAGE >= res.data.length) {
                            setSelectedList(res.data)
                        } else {
                            setSelectedList(res.data.slice(0, Settings.DATA_PER_PAGE))
                        }

                        // Set page to the first page
                        setPage(1)

                        // Set total page
                        setCount(Math.ceil(res.data.length / Settings.DATA_PER_PAGE))

                        // If no result, show notice bar
                        if (res.data.length === 0) {
                            dispatch(setMessage(Settings.NO_RESULT));
                            dispatch(setSeverity(Settings.ALERT_WARNING));
                            handleBarOpen();
                        }

                    } else {
                        let reason = getReasonPhrase(res.status)
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
    }

    const handlePageChange = (event, value) => {
        setPage(value)
        // Set data for this page
        if (value * Settings.DATA_PER_PAGE <= universityList.length) {
            setSelectedList(universityList.slice((value - 1) * Settings.DATA_PER_PAGE, value * Settings.DATA_PER_PAGE))
        } else {
            setSelectedList(universityList.slice((value - 1) * Settings.DATA_PER_PAGE, universityList.length))
        }
    }

    // sort method
    const sortMethod = (a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
    }

    // CSS style for title
    const titleStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: 1,
        color: "#fff",
        transform: "translateX(-50%) translateY(-50%)",
        letterSpacing: "10px",
    }

    // CSS style for the title of items
    const itemStyle = {
        fontSize: 12,
        fontStyle: "italic",
    }

    return (
        <Box sx={{ width: "100%" }}>

            {/* Banner and title */}
            <Box sx={{ width: "100%", position: "relative" }}>
                <img src={BannerPicture} alt="banner" style={{ width: "100%" }} />
                <Typography variant="h1" component="div" sx={titleStyle}>
                    UNIVERSITIES
                </Typography>
            </Box>

            {/* Country select bar */}
            <Box sx={{ width: "90%", margin: "20px auto" }}>
                <FormControl sx={{ width: "400px" }}>
                    <InputLabel id="country-select-label">Country</InputLabel>
                    <Select
                        labelId="country-select-label"
                        label="Country"
                        defaultValue=""
                        onChange={(e) => handleSearch(e.target.value)}
                    >
                        <MenuItem value=""><br /></MenuItem>
                        {countryList.map((country, index) => {
                            return (
                                <MenuItem key={index} value={country.name}>{country.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>

            {/* Top page Selector */}
            {Settings.DATA_PER_PAGE >= universityList.length ? (
                <></>
            ) : (
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0" }}>
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
                                <Card sx={{ background: "#eee" }}>
                                    <CardContent sx={{ height: 500 }}>
                                        <Typography variant="h5" gutterBottom>
                                            {university.name}
                                        </Typography>
                                        <br />
                                        <Typography sx={itemStyle} color="text.secondary">
                                            Country
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {university.country}({university.alpha_two_code})
                                        </Typography>
                                        {university["state-province"] ? (
                                            <>
                                                <br />
                                                <Typography sx={itemStyle} color="text.secondary">
                                                    {"State\/Province"}
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    {university["state-province"]}
                                                </Typography>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        <br />
                                        <Typography sx={itemStyle} color="text.secondary">
                                            Domains
                                        </Typography>
                                        {university.domains.map((domain, index) => {
                                            return (
                                                <Typography key={index} variant="body1" gutterBottom>
                                                    {domain}
                                                </Typography>
                                            )
                                        })}
                                        <br />
                                        <Typography sx={itemStyle} color="text.secondary">
                                            Web Pages
                                        </Typography>
                                        {university.web_pages.map((web, index) => {
                                            return (
                                                <Typography key={index} variant="body1" gutterBottom>
                                                    <Link href={web} rel="noreferrer" target="_blank" >{web}</Link>
                                                </Typography>
                                            )
                                        })}
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>

            {/* Bottom page Selector */}
            {Settings.DATA_PER_PAGE >= universityList.length ? (
                <></>
            ) : (
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0" }}>
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
    )
}

export default Universities;