import * as React from 'react';


import BannerPicture from '../images/sea.jpg'

// import material UI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

const Home = () => {

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
                        <Button variant="contained" sx={addButtonStyle}>
                            Add a new post
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Home