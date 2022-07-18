import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import createAvatar from "~/utils/createAvatar";
import { MAvatar } from "~/@material-extend";

// ----------------------------------------------------------------------

MyAvatar.propTypes = {
  className: PropTypes.string,
};

function MyAvatar({ className, ...other }) {
  const photoURL = "/static/brand/logo_ftel.png";
  const displayName = "";
  return (
    <MAvatar
      src={photoURL}
      alt={displayName}
      color={photoURL ? "default" : createAvatar(displayName).color}
      className={className}
      {...other}
    >
      {createAvatar(displayName).name}
    </MAvatar>
  );
}

export default MyAvatar;
