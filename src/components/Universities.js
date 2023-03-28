import * as React from 'react';
import BannerPicture from '../images/universities.jpg'

// import material UI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Universities = () => {

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

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', position: "relative" }}>
                <img src={BannerPicture} alt="banner-picture" style={{ width: "100%" }} />
                <Typography variant="h1" component="div" sx={titleStyle}>
                    UNIVERSITIES
                </Typography>
            </Box>
            <Box sx={{ margin: "10px", width: "200px" }}>
                <FormControl fullWidth>
                    <InputLabel id="country-select-label">Country</InputLabel>
                    <Select labelId="country-select-label">

                    </Select>
                </FormControl>
            </Box>
        </Box>
    )
}

export default Universities;