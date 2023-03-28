import * as React from 'react';

// import material UI components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';

// import pages
import Home from './components/Home'




function App() {

    const [value, setValue] = React.useState('1');

    const changePage = (page) => {
        setValue(page);
    }

    const tabPanelStyle = {
        padding: 0
    }


    return (
        <Box sx={{ width: '100%' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Sean Chen's Code Challenge
                    </Typography>
                    <Stack direction="row" spacing={5}>
                        <Button color="inherit" onClick={() => changePage("1")}>
                            home
                        </Button>
                        <Button color="inherit" onClick={() => changePage("2")}>
                            universities
                        </Button>
                        <Button color="inherit" onClick={() => changePage("3")}>
                            postal lookup
                        </Button>
                    </Stack>

                </Toolbar>
            </AppBar>


            <TabContext value={value}>
                <TabPanel value="1" sx={tabPanelStyle}>
                    <Home />
                </TabPanel>
                <TabPanel value="2" sx={tabPanelStyle}>

                </TabPanel>
                <TabPanel value="3" sx={tabPanelStyle}>

                </TabPanel>
            </TabContext>
        </Box>

    );
}

export default App;
