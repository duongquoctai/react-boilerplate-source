import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 12,
    marginLeft: 4,
    overflow: 'inherit',
    boxShadow: theme.shadows[25].z20,
    border: `solid 1px ${theme.palette.grey[500_8]}`
  },
  arrow: {
    [theme.breakpoints.up('sm')]: {
      top: -7,
      zIndex: 1,
      width: 12,
      right: 20,
      height: 12,
      content: "''",
      position: 'absolute',
      borderRadius: '0 0 4px 0',
      transform: 'rotate(-135deg)',
      background: theme.palette.background.paper,
      borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
      borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`
    }
  }
}));

// ----------------------------------------------------------------------

DropdownMenu.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  className: PropTypes.string
};

function DropdownMenu({ children, width, className, ...other }) {
  const classes = useStyles();

  return (
    <Popover
      getcontentanchorel={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      className={className}
      classes={{
        root: classes.root,
        paper: classes.paper
      }}
      {...other}
    >
      <span className={classes.arrow} />

      <Box sx={{ width, maxWidth: '100%' }}>{children}</Box>
    </Popover>
  );
}

export default DropdownMenu;
