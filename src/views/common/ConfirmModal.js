import * as React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  Stack
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '5%'
};

const useStyles = makeStyles((theme) => ({
  cssLabel: {
    color: 'orange'
  }
}));

export default function ConfirmModal({ open, setOpen, title, options }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(!open);
  };

  const handleItemClick = (func) => {
    setOpen(!open);
    func();
  };

  return (
    <Modal keepMounted open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h5" sx={{ mb: 3 }}>
          {title}
        </Typography>
        <Stack direction="row" justifyContent="flex-end">
          {options.map((item) => item)}
        </Stack>
      </Box>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};
