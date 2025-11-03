import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

ProcessBar.propTypes = {
	process: PropTypes.number,
	className: PropTypes.string,
	width: PropTypes.number,
	color: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
	root: ({ process, width, color }) => ({
		height: theme.spacing(0.75),
		width: `${width}px`,
		backgroundColor: alpha(theme.palette.grey[800], 0.08),
		position: 'relative',
		borderRadius: '100px',
		overflow: 'hidden',

		'&::before': {
			content: "''",
			position: 'absolute',
			top: 0,
			left: 0,
			width: `${process}%`,
			height: '100%',
			backgroundColor: color
				? color
				: process === 100
				? theme.palette.success.main
				: theme.palette.primary.main,
			borderRadius: '100px',
		},
	}),
}));

function ProcessBar({ className = '', process = 0, color = '', width = 70 }) {
	const classes = useStyles({ process, width, color });

	return <div className={`${classes.root} ${className}`}></div>;
}

export default ProcessBar;
