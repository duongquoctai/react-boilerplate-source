import React from 'react';
import { Box, Grid, TextareaAutosize } from '@mui/material';
import SelectCustom from '~/views/access-permission/components/Select';
import {
	REQUEST_DURATION,
	REQUEST_PROJECTS,
} from '~/views/access-permission/constant';
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
		fontSize: '14px',
	},
	textarea: {
		width: '100%',
		minWidth: '100%',
		maxWidth: '100%',
		maxHeight: '250px',
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

function RequestInfo({ onChange, defaultValue = {} }) {
	const classes = useStyles();
	const { project, duration, desc } = defaultValue;

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6} md={3}>
				<Box className={classes.label}>Request project</Box>
				<SelectCustom
					options={REQUEST_PROJECTS}
					defaultValue={project}
					placeholder=''
					formControlClass={classes.select}
					selectProps={{ size: 'small', className: classes.select }}
					onChange={value => onChange('project', value)}
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={3}>
				<Box className={classes.label}>Request duration</Box>
				<SelectCustom
					options={REQUEST_DURATION}
					defaultValue={duration}
					placeholder=''
					formControlClass={classes.select}
					selectProps={{ size: 'small', className: classes.select }}
					onChange={value => onChange('duration', value)}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<Box className={classes.label}>Description</Box>
				<TextareaAutosize
					minRows={4}
					defaultValue={desc}
					placeholder='Enter your ticket description'
					className={classes.textarea}
					onChange={e => onChange('desc', e.target.value?.trim())}
				/>
			</Grid>
		</Grid>
	);
}

export default RequestInfo;
