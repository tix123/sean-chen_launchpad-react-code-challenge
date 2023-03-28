import React, { useEffect, useState } from 'react';
import BannerPicture from '../images/sea.jpg'
import { StatusCodes } from 'http-status-codes';
import { useSelector, useDispatch } from 'react-redux'
import { setPostList } from '../store/slices/homeSlice'
import axios from 'axios';

// import material UI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const Home = () => {

    const postList = useSelector(state => state.home.postList);
    const dispatch = useDispatch();

    console.log("postList", postList)

    // Get post list (only once)
    useEffect(() => {
        fetchPostList();
    }, [])

    // Get post list and set data to Redux
    const fetchPostList = async () => {
        const res = await axios
            .get("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=20")
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        if (res.status == StatusCodes.OK) {
            dispatch(setPostList(res.data))
        }
    }

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

    const addButtonStyle = {
        height: "100%",
        fontSize: "20px",
    }

    const itemStyle = {
        fontSize: 12,
        fontStyle: "italic",
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', position: "relative" }}>
                <img src={BannerPicture} alt="banner-picture" style={{ width: "100%" }} />
                <Typography variant="h1" component="div" sx={titleStyle}>
                    HOME
                </Typography>
            </Box>
            <Box sx={{ margin: "10px" }}>
                <Grid container spacing={2}>
                    <Grid item>
                        <TextField
                            placeholder="Search by ID"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" sx={addButtonStyle} >
                            Add a new post
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ width: '90%', margin: "20px auto" }}>
                <Grid container spacing={2}>
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
                                            <IconButton>
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
        </Box>
    )
}

export default Home