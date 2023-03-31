import * as React from "react";

// import material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

const NavBar = () => {

    const titleStyle ={
        fontWeight: "bold",
        display: { xs: "none", md: "block" }
    }

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Grid container justifyContent={"space-between"}>
                    <Grid item>
                        <Typography variant="h6" component="div" sx={titleStyle}>
                            Sean Chen's Code Challenge
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" spacing={5}>
                            <Button color="inherit" href="home">
                                home
                            </Button>
                            <Button color="inherit" href="universities">
                                universities
                            </Button>
                            <Button color="inherit" href="postal">
                                postal lookup
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar