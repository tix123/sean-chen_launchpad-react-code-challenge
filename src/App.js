import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import Universities from "./components/Universities"
import Postal from "./components/Postal"
import Toolbar from "@mui/material/Toolbar";
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';


function App() {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter >
                <NavBar />
                <Toolbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="universities" element={<Universities />} />
                    <Route path="postal" element={<Postal />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
