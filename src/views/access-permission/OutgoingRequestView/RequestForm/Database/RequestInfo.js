import React from 'react';
import { Box, Grid, TextareaAutosize } from '@mui/material';
import SelectCustom from '~/views/access-permission/components/Select';
import { REQUEST_PROJECTS } from '~/views/access-permission/constant';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

const useStyles = makeStyles(theme => ({
	select: {
		width: '100%',
		color: alpha('#000', 0.6),
		borderRadius: 6,
	},
	label: {
		marginBottom: '12px',
		color: alpha('#000', 0.87),
	},
	textarea: {
		width: '100%',
		borderRadius: 6,
		border: `solid 1px ${theme.palette.primary.light}`,
		padding: '6px 12px',
		outline: 'none',
		fontSize: '14px',
		fontWeight: 400,
		lineHeight: '20px',
		color: '#333',
	},
}));

function RequestInfo() {
	const classes = useStyles();

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6} md={3}>
				<Box className={classes.label}>Request project</Box>
				<SelectCustom
					options={REQUEST_PROJECTS}
					defaultValue={REQUEST_PROJECTS[0].value}
					placeholder=''
					formControlClass={classes.select}
					selectProps={{ size: 'small', className: classes.select }}
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={3}>
				<Box className={classes.label}>Request duration</Box>
				<SelectCustom
					options={REQUEST_PROJECTS}
					defaultValue={REQUEST_PROJECTS[0].value}
					placeholder=''
					formControlClass={classes.select}
					selectProps={{ size: 'small', className: classes.select }}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<Box className={classes.label}>Description</Box>
				<TextareaAutosize
					minRows={3}
					placeholder='Enter your ticket description'
					className={classes.textarea}
				/>
			</Grid>
		</Grid>
	);
}

export default RequestInfo;
