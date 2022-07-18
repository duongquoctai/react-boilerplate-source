import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  className: PropTypes.string,
};

function Logo({ className, ...other }) {
  return (
    <Box
      component="img"
      alt="logo"
      src="/static/brand/logo_ftel.png"
      height={64}
      className={className}
      {...other}
    />
  );
}

export default Logo;
