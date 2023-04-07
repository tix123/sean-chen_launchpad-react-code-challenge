import React from "react";
import * as Styles from "../../styles/styles";

// import material UI components
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";

const UniversityCard = (props) => {
  return (
    <Card sx={{ background: "#eee" }}>
      <CardContent sx={{ height: 500 }}>
        <Typography variant="h5" gutterBottom>
          {props.university.name}
        </Typography>
        <br />
        <Typography sx={Styles.itemStyle} color="text.secondary">
          Country
        </Typography>
        <Typography variant="body1" gutterBottom>
          {props.university.country}({props.university.alpha_two_code})
        </Typography>
        {props.university["state-province"] ? (
          <>
            <br />
            <Typography sx={Styles.itemStyle} color="text.secondary">
              {"State / Province"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.university["state-province"]}
            </Typography>
          </>
        ) : (
          <></>
        )}
        <br />
        <Typography sx={Styles.itemStyle} color="text.secondary">
          Domains
        </Typography>
        {props.university.domains.map((domain, index) => {
          return (
            <Typography key={index} variant="body1" gutterBottom>
              {domain}
            </Typography>
          );
        })}
        <br />
        <Typography sx={Styles.itemStyle} color="text.secondary">
          Web Pages
        </Typography>
        {props.university.web_pages.map((web, index) => {
          return (
            <Typography key={index} variant="body1" gutterBottom>
              <Link href={web} rel="noreferrer" target="_blank">
                {web}
              </Link>
            </Typography>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default UniversityCard;
