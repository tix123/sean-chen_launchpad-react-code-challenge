import React, { useEffect, useState } from "react";
import BannerPicture from "../../images/sea.jpg";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePost,
  fetchPostList,
  searchPost,
} from "../../store/slices/homeSlice";
import { setMessage, setSeverity } from "../../store/slices/alertSlice";
import axios from "axios";
import InputForm from "../utils/InputForm";
import PostCard from "../utils/PostCard";
import Banner from "../utils/Banner";
import NoticeBar from "../utils/NoticeBar";
import * as Settings from "../../config/settings";
import * as Styles from "../../styles/styles";

// import material UI components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

const Home = () => {
  // input form open/close control
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // notice bar control
  const [barOpen, setBarOpen] = useState(false);

  const handleBarOpen = () => {
    setBarOpen(true);
  };

  const handleBarClose = () => {
    setBarOpen(false);
  };

  const [dialogTitle, setDialogTitle] = useState("");
  const [isAddPost, setIsAddPost] = useState(true);

  // Keep post data for input fields
  const [postId, setPostId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Redux state setup
  const postList = useSelector((state) => state.home.postList);
  const apiStatus = useSelector((state) => state.home.status);
  const apiError = useSelector((state) => state.home.error);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  console.log("apiStatus", apiStatus);
  console.log("apiError", apiError);

  // Handle API response
  useEffect(() => {
    switch (apiStatus) {
      case Settings.API_IDLE:
        dispatch(fetchPostList());
        break;

      case Settings.API_FAILED:
        dispatch(setMessage(apiError));
        dispatch(setSeverity(Settings.ALERT_ERROR));
        handleBarOpen();
        break;

      case Settings.API_ADD_POST_SUCCESSED:
        dispatch(setMessage(Settings.ADD_SUCCESS));
        dispatch(setSeverity(Settings.ALERT_SUCCESS));
        handleDialogClose();
        handleBarOpen();
        break;

      case Settings.API_EDIT_POST_SUCCESSED:
        dispatch(setMessage(Settings.EDIT_SUCCESS));
        dispatch(setSeverity(Settings.ALERT_SUCCESS));
        handleDialogClose();
        handleBarOpen();
        break;

      default:
        break;
    }
  }, [dispatch, apiStatus, apiError]);

  // Edit function
  const handleEdit = (post) => {
    setPostId(post.id);
    setUserId(post.userId);
    setTitle(post.title);
    setBody(post.body);
    setDialogTitle(Settings.EDIT_TITLE);
    setIsAddPost(false);
    handleDialogOpen();
  };

  // Add function
  const handleAdd = () => {
    setUserId(0);
    setTitle("");
    setBody("");
    setDialogTitle(Settings.ADD_TITLE);
    setIsAddPost(true);
    handleDialogOpen();
  };

  // Delete function
  const handleDelete = async (id) => {
    await axios
      .delete(Settings.POST_SERVER_URL + "/" + id)
      .then(function (res) {
        // if deleted successfully, remove from the redux state
        if (res.status === StatusCodes.OK) {
          dispatch(deletePost(id));
          dispatch(setMessage(Settings.DELETE_SUCCESS));
          dispatch(setSeverity(Settings.ALERT_SUCCESS));
        } else {
          let reason = getReasonPhrase(res.status);
          dispatch(setMessage(reason));
          dispatch(setSeverity(Settings.ALERT_ERROR));
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        dispatch(setMessage(error.message));
        dispatch(setSeverity(Settings.ALERT_ERROR));
      })
      .finally(function () {
        // always executed
        handleBarOpen();
      });
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Banner and title */}
      <Banner bannerPicture={BannerPicture} bannerTitle={Settings.HOME_TITLE} />

      {/* Search field and add button */}
      <Box sx={{ width: "90%", margin: "20px auto" }}>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              placeholder="Search by ID"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => dispatch(searchPost(e.target.value))}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={Styles.buttonStyle}
              onClick={() => handleAdd()}
            >
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
              <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                <PostCard
                  post={post}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </Grid>
            );
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
  );
};

export default Home;
