import React, { forwardRef, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = "", ...other }, ref) => {
  return (
    <div ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
