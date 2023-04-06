import React from "react";
import * as Styles from "../../styles/styles";

// import material UI components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Banner = (props) => {
  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <img src={props.bannerPicture} alt="banner" style={{ width: "100%" }} />
      <Typography variant="h1" component="div" sx={Styles.titleStyle}>
        {props.bannerTitle}
      </Typography>
    </Box>
  );
};

export default Banner;
