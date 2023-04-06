import React from "react";
import * as Styles from "../../styles/styles";

// import material UI components
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const PostCard = (props) => {
  return (
    <Card sx={{ background: "#eee" }}>
      <CardContent sx={{ height: 400 }}>
        <Stack spacing={5} direction="row">
          <Box>
            <Typography sx={Styles.itemStyle} color="text.secondary">
              POST ID
            </Typography>
            <Typography variant="h4" gutterBottom>
              {props.post.id}
            </Typography>
          </Box>
          <Box>
            <Typography sx={Styles.itemStyle} color="text.secondary">
              USER ID
            </Typography>
            <Typography variant="h4" gutterBottom>
              {props.post.userId}
            </Typography>
          </Box>
        </Stack>
        <br />
        <Typography sx={Styles.itemStyle} color="text.secondary">
          TITLE
        </Typography>
        <Typography variant="body1" gutterBottom>
          {props.post.title}
        </Typography>
        <br />
        <Typography sx={Styles.itemStyle} color="text.secondary">
          BODY
        </Typography>
        <Typography variant="body1" gutterBottom>
          {props.post.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" justifyContent="flex-end" sx={{ width: "100%" }}>
          <IconButton onClick={() => props.handleEdit(props.post)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => props.handleDelete(props.post.id)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default PostCard;
