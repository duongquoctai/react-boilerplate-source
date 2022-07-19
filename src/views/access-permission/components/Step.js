import React from 'react';
import { Box, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
	top: {
		display: 'flex',
		alignItems: 'center',
	},
	bar: {
		height: '6px',
		backgroundColor: props =>
			props.done ? theme.palette.primary.main : theme.palette.grey[300],
	},
	title: {
		color: props =>
			props.active || props.done
				? theme.palette.primary.main
				: alpha('#000', 0.6),
		fontWeight: 500,
		marginLeft: '4px',
		fontSize: '14px',
	},
	checkIcon: {
		color: theme.palette.success.light,
		fontSize: '20px',
	},
}));

Step.propTypes = {
	active: PropTypes.bool,
	done: PropTypes.bool,
	title: PropTypes.string.isRequired,
};

function Step({ active, done, title }) {
	const classes = useStyles({ active, done });

	return (
		<Stack spacing={1}>
			<Box className={classes.top}>
				{done && <CheckCircleIcon className={classes.checkIcon} />}
				<span className={classes.title}>{title}</span>
			</Box>
			<div className={classes.bar}></div>
		</Stack>
	);
}

export default Step;
