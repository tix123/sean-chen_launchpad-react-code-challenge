import React, { useState } from "react";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { useSelector, useDispatch } from "react-redux"
import { addPost, editPost } from "../store/slices/homeSlice"
import { setMessage, setSeverity } from "../store/slices/alertSlice"
import NoticeBar from "./NoticeBar";
import axios from "axios";
import * as Settings from "../config/settings"

// import material UI components
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const InputForm = (props) => {

    // notice bar control
    const [barOpen, setBarOpen] = useState(false)

    const handleBarOpen = () => {
        setBarOpen(true)
    }

    const handleBarClose = () => {
        setBarOpen(false)
    }

    // Redux state setup
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    // submit function for editing a post
    const handleEditSubmit = async () => {
        let postObj = {};
        postObj.id = props.postId;
        postObj.userId = props.userId;
        postObj.title = props.title;
        postObj.body = props.body;

        await axios
            .put(Settings.POST_SERVER_URL + "/" + props.postId, postObj)
            .then(function (res) {
                // if edited successfully, update the redux state
                if (res.status === StatusCodes.OK) {
                    dispatch(editPost(res.data));
                    dispatch(setMessage(Settings.EDIT_SUCCESS));
                    dispatch(setSeverity(Settings.ALERT_SUCCESS));
                    props.handleDialogClose();
                } else {
                    let reason = getReasonPhrase(res.status)
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


    }

    // submit function for adding a new post
    const handleAddSubmit = async () => {
        let postObj = {};
        postObj.userId = props.userId;
        postObj.title = props.title;
        postObj.body = props.body;

        await axios
            .post(Settings.POST_SERVER_URL, postObj)
            .then(function (res) {
                // if created successfully, add to redux state
                if (res.status === StatusCodes.CREATED) {
                    dispatch(addPost(res.data));
                    dispatch(setMessage(Settings.ADD_SUCCESS));
                    dispatch(setSeverity(Settings.ALERT_SUCCESS));
                    props.handleDialogClose();
                } else {
                    let reason = getReasonPhrase(res.status)
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
    }

    return (
        <Box>
            {/* The input form */}
            <Dialog open={props.dialogOpen} onClose={props.handleDialogClose} fullWidth>
                <DialogTitle >{props.dialogTitle}</DialogTitle>
                <DialogContent >
                    <Grid container spacing={2} direction="column" sx={{ marginTop: "5px" }}>
                        {!props.isAddPost ? (
                            <Grid item >
                                <Typography variant="body1" gutterBottom sx={{ fontWeight: "bold", marginLeft: "10px" }}>
                                    Post ID: {props.postId}
                                </Typography>
                            </Grid>
                        ) : (
                            <></>
                        )}
                        <Grid item >
                            <TextField
                                label="User ID"
                                id="userId"
                                name="userId"
                                fullWidth
                                variant="outlined"
                                value={props.userId}
                                type="number"
                                onChange={(e) => props.setUserId(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Title"
                                id="title"
                                name="title"
                                fullWidth
                                variant="outlined"
                                value={props.title}
                                onChange={(e) => props.setTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Body"
                                id="body"
                                name="body"
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={5}
                                value={props.body}
                                onChange={(e) => props.setBody(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ textAlign: "right", marginTop: "20px" }}>
                        <Button onClick={() => props.handleDialogClose()}>Cancel</Button>
                        {props.isAddPost ? (
                            <Button onClick={() => handleAddSubmit()}>Submit</Button>
                        ) : (
                            <Button onClick={() => handleEditSubmit()}>Submit</Button>
                        )}

                    </Box>
                </DialogContent>
            </Dialog>

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

export default InputForm