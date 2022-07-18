import { Icon } from '@iconify/react';
import React, { useRef, useState, memo } from 'react';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  menu: {
    width: 220,
    maxWidth: '100%'
  },
  menuItem: { color: theme.palette.text.secondary }
}));

// ----------------------------------------------------------------------

function MoreButton({ className, options, setDeleteId, id }) {
  const classes = useStyles();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (func) => {
    setIsOpen(!isOpen);
    func();
  };

  return (
    <>
      <IconButton
        ref={ref}
        className={className}
        onClick={(e) => {
          setIsOpen(!isOpen);
          setDeleteId(e.target.id);
        }}
        id={id}
      >
        <Icon
          icon={moreVerticalFill}
          width={20}
          height={20}
          style={{ zIndex: -1 }}
        />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(!isOpen)}
        PaperProps={{ className: classes.menu }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {options.map((item) => (
          <MenuItem
            key={item.text}
            onClick={() => {
              handleItemClick(item.action);
            }}
            className={classes.menuItem}
          >
            <ListItemIcon>
              <Icon icon={item.icon} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default memo(MoreButton);

MoreButton.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array.isRequired
};
