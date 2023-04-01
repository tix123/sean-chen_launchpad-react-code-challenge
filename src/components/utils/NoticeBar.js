import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NoticeBar = (props) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={props.barOpen}
            autoHideDuration={6000}
            onClose={props.handleBarClose}
            sx={{ width: "100%" }}
        >
            <Alert onClose={props.handleBarClose} severity={props.alertSeverity} >
                {props.alertMessage}
            </Alert>
        </Snackbar>
    )
}

export default NoticeBar