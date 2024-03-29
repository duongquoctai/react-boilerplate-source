import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Box, Card } from "@mui/material";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 464,
    display: "flex",
    background: "linear-gradient(to bottom, #F8DCC5, #F9F7F6)",
    flexDirection: "column",
    justifyContent: "center",
    margin: theme.spacing(2, 0, 2, 2),
  },
}));

// ----------------------------------------------------------------------

Section.propTypes = {
  className: PropTypes.string,
};

function Section({ className }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <Box component="h3" sx={{ typography: "h3", px: 5, mt: 5, mb: 15 }}>
        Hi, Welcome Back
      </Box>
      <img src="/static/images/login.png" alt="login" />
    </Card>
  );
}

export default Section;
