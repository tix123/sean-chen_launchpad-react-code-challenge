import React, { useEffect, useState } from "react";
import BannerPicture from "../images/sea.jpg"
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { useSelector, useDispatch } from "react-redux"
import { setPostList } from "../store/slices/homeSlice"
import { setMessage, setSeverity } from "../store/slices/alertSlice"
import axios from "axios";
import InputForm from "./InputForm";
import NoticeBar from "./NoticeBar";
import * as Settings from "../config/settings"

// import material UI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const Home = () => {

    // input form open/close control
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    // notice bar control
    const [barOpen, setBarOpen] = useState(false)

    const handleBarOpen = () => {
        setBarOpen(true)
    }

    const handleBarClose = () => {
        setBarOpen(false)
    }

    const [dialogTitle, setDialogTitle] = useState("");
    const [isAddPost, setIsAddPost] = useState(true);

    // Keep post data for input fields
    const [postId, setPostId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    // Redux state setup
    const postList = useSelector(state => state.home.postList);
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    // Get post list (only once)
    useEffect(() => {
        fetchPostList();
    }, [])

    // Get post list and set data to Redux
    const fetchPostList = async () => {
        await axios
            .get(Settings.POST_SERVER_URL + "?_start=0&_limit=20")
            .then(function (res) {
                // handle success
                if (res.status == StatusCodes.OK) {
                    dispatch(setPostList(res.data))
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

    // Edit function
    const handleEdit = (post) => {
        setPostId(post.id)
        setUserId(post.userId);
        setTitle(post.title)
        setBody(post.body)
        setDialogTitle(Settings.EDIT_TITLE);
        setIsAddPost(false);
        handleDialogOpen();
    }

    // Add function
    const handleAdd = () => {
        setUserId(0);
        setTitle("");
        setBody("");
        setDialogTitle(Settings.ADD_TITLE);
        setIsAddPost(true);
        handleDialogOpen();
    }

    // Search function 
    const handleSearch = async (id) => {
        await axios
            .get(Settings.POST_SERVER_URL + "/" + id)
            .then(function (res) {
                // handle success
                if (res.status == StatusCodes.OK) {
                    let newList = [];
                    newList.push(res.data);
                    dispatch(setPostList(newList))
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

    // CSS style for title
    const titleStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: 1,
        color: "#fff",
        transform: "translateX(-50%) translateY(-50%)",
        letterSpacing: "10px",
        fontSize: "130px"
    }

    // CSS style for the add button
    const addButtonStyle = {
        height: "100%",
        fontSize: "20px",
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
                    HOME
                </Typography>
            </Box>

            {/* Search field and add button */}
            <Box sx={{ width: "90%", margin: "20px auto" }}>
                <Grid container spacing={2}>
                    <Grid item>
                        <TextField
                            placeholder="Search by ID"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                            }}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" sx={addButtonStyle} onClick={() => handleAdd()}>
                            Add a new post
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Post grid */}
            <Box sx={{ width: "90%", margin: "20px auto" }}>
                <Grid container spacing={3}>
                    {postList.map((post, index) => {
                        return (
                            <Grid item xs={3} key={index}>
                                <Card sx={{ background: "#eee" }}>
                                    <CardContent sx={{ height: 400 }}>
                                        <Stack spacing={5} direction="row">
                                            <Box>
                                                <Typography sx={itemStyle} color="text.secondary">
                                                    POST ID
                                                </Typography>
                                                <Typography variant="h4" gutterBottom>
                                                    {post.id}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={itemStyle} color="text.secondary">
                                                    USER ID
                                                </Typography>
                                                <Typography variant="h4" gutterBottom>
                                                    {post.userId}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                        <br />
                                        <Typography sx={itemStyle} color="text.secondary">
                                            TITLE
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {post.title}
                                        </Typography>
                                        <br />
                                        <Typography sx={itemStyle} color="text.secondary">
                                            BODY
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {post.body}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Stack direction="row" justifyContent="flex-end" sx={{ width: "100%" }}>
                                            <IconButton onClick={() => handleEdit(post)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>

            {/* the modal window  to add a post */}
            <InputForm
                dialogTitle={dialogTitle}
                dialogOpen={dialogOpen}
                handleDialogClose={handleDialogClose}
                isAddPost={isAddPost}
                postId={postId}
                userId={userId}
                setUserId={setUserId}
                title={title}
                setTitle={setTitle}
                body={body}
                setBody={setBody}
            />

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

export default Home