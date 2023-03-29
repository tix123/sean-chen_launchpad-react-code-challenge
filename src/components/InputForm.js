import React, { useState } from 'react';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { useSelector, useDispatch } from 'react-redux'
import { addPostList } from '../store/slices/homeSlice'
import { setMessage, setSeverity } from '../store/slices/alertSlice'
import NoticeBar from './NoticeBar';
import axios from 'axios';

// import material UI components
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


const InputForm = (props) => {

    // notice bar control
    const [barOpen, setBarOpen] = useState(false)

    const handleBarOpen = () => {
        setBarOpen(true)
    }

    const handleBarClose = () => {
        setBarOpen(false)
    }

    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {

        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // Convert FromData to JSON
        let formJson = Object.fromEntries(formData.entries());

        // for add post
        if (props.isAddPost) {
            await axios
                .post("https://jsonplaceholder.typicode.com/posts", formData)
                .then(function (res) {
                    // if created successfully, add to redux state
                    if (res.status == StatusCodes.CREATED) {
                        formJson.id = res.data.id;
                        dispatch(addPostList(formJson));
                        dispatch(setMessage("Post Added Successfully"));
                        dispatch(setSeverity("success"));
                        props.handleDialogClose();
                    } else {
                        let reason = getReasonPhrase(res.status)
                        dispatch(setMessage(reason));
                        dispatch(setSeverity("error"));
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    dispatch(setMessage(error.message));
                    dispatch(setSeverity("error"));
                })
                .finally(function () {
                    // always executed
                    handleBarOpen();
                });

        }
        //for edit post
        else {

        }
    }

    return (
        <Box>
            {/* The input form */}
            <Dialog open={props.dialogOpen} onClose={props.handleDialogClose} fullWidth>
                <DialogTitle >{props.dialogTitle}</DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} direction="column" sx={{ marginTop: "5px" }}>
                            <Grid item >
                                <TextField
                                    label="User ID"
                                    name="userId"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Title"
                                    name="title"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Body"
                                    name="body"
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rows={5}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ textAlign: "right", marginTop: "20px" }}>
                            <Button onClick={props.handleDialogClose}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </Box>
                    </form>
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