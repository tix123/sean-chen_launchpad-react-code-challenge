import React, { useState } from 'react';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { useDispatch } from 'react-redux'
import { addPostList } from '../store/slices/homeSlice'
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

    // alert message setup
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("error");

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
                        setAlertMessage("Post Added Successfully");
                        setAlertSeverity("success");
                        props.handleDialogClose();
                    } else {
                        let reason = getReasonPhrase(res.status)
                        setAlertMessage(reason);
                        setAlertSeverity("error");
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    setAlertMessage(error.message);
                    setAlertSeverity("error");
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
                alertMessage={alertMessage}
                alertSeverity={alertSeverity}
            />

        </Box>
    )
}

export default InputForm