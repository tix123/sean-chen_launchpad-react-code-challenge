import * as React from 'react';
import BannerPicture from '../images/postal.jpg'

// import material UI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const Postal = () => {

    const titleStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: 1,
        color: "#fff",
        transform: "translateX(-50%) translateY(-50%)",
        letterSpacing: "10px",
        fontSize: "130px",
        width: "100%",
        textAlign: "center",
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', position: "relative" }}>
                <img src={BannerPicture} alt="banner-picture" style={{ width: "100%" }} />
                <Typography variant="h1" component="span" sx={titleStyle}>
                    POSTAL LOOKUP
                </Typography>
            </Box>
            <Box sx={{ margin: "10px" }}>
                <TextField
                    placeholder="Search by Postal"
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                    }}
                />
            </Box>
        </Box>
    )
}

export default Postal;