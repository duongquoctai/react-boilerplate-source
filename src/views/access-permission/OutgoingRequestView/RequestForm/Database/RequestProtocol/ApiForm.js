import React, { useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { commonStyles } from '.';
import SelectCustom from '~/views/access-permission/components/Select';
import { REQUEST_FREQUENCIES } from '~/views/access-permission/constant';
import * as yup from 'yup';
import { debounce } from '~/views/access-permission/helper';

let timeout = null;

const useStyles = makeStyles(theme => ({
	...commonStyles(theme),
	root: {
		borderRadius: '8px',
		padding: '12px',
		backgroundColor: 'rgba(33, 33, 33, 0.03)',
		border: '1px solid rgba(33, 33, 33, 0.08)',
	},
	title: {
		display: 'flex',
		alignItems: 'center',
		fontSize: '14px',
		marginBottom: '10px',

		'& .main': {
			textTransform: 'uppercase',
			fontWeight: 700,
			marginRight: '6px',
			lineHeight: '24px',
			color: theme.palette.primary.main,
		},
		'& .sub': {
			fontSize: '12px',
			fontWeight: 400,
			color: 'rgba(0, 0, 0, 0.38)',
			lineHeight: '16px',
		},
	},
	input: {
		outline: 'none',
		padding: '6px 12px',
		height: '36px',
		width: '100%',
		borderRadius: '6px',
		border: `solid 1px ${theme.palette.grey[500]}`,
		fontSize: '14px',
		color: 'rgba(0, 0, 0, 0.87)',
	},
}));

const schema = yup.object().shape({
	frequency: yup.number().required(),
	numOfRows: yup.number().required(),
	serverIP: yup.string().matches(/^(\d|\.)+$/),
	host: yup.string().required(),
	port: yup.number().required(),
	dbName: yup.string().required(),
});

function ApiForm({ onChange, defaultValue = {} }) {
	const classes = useStyles();
	const form = useRef({
		frequency: '',
		numOfRows: '',
		serverIP: '',
		port: '',
		dbName: '',
	});

	const handleChange = (field, value) => {
		form.current[field] = value;
		timeout = debounce(timeout, 250, () => {
			schema.isValid(form.current).then(valid => {
				onChange(valid, form.current);
			});
		});
	};

	return (
		<Box className={classes.root}>
			<Box className={classes.title}>
				<Typography className='main' component='h5'>
					API
				</Typography>
				<Typography className='sub' component='p'>
					Please full-fill the configurations for us to correctly connect to
					your API
				</Typography>
			</Box>
			<Grid container spacing={3.75}>
				<Grid item xs={6} md={2}>
					<Box className={classes.label}>Request frequency</Box>
					<SelectCustom
						options={REQUEST_FREQUENCIES}
						formControlClass={classes.field}
						selectProps={{ className: classes.field }}
						placeholder='Frequency'
						showPlaceholderInValue={false}
						onChange={value => handleChange('frequency', value)}
						defaultValue={defaultValue.frequency}
					/>
				</Grid>
				<Grid item xs={6} md={2}>
					<Box className={classes.label}>Number of rows</Box>
					<input
						className={classes.input}
						type='number'
						onChange={e => handleChange('numOfRows', Number(e.target.value))}
						defaultValue={defaultValue.numOfRows}
					/>
				</Grid>
				<Grid item xs={6} md={2}>
					<Box className={classes.label}>Server IP</Box>
					<input
						className={classes.input}
						onChange={e => handleChange('serverIP', e.target.value)}
						defaultValue={defaultValue.serverIP}
					/>
				</Grid>
				<Grid item xs={6} md={2}>
					<Box className={classes.label}>Host</Box>
					<input
						className={classes.input}
						onChange={e => handleChange('host', e.target.value)}
						defaultValue={defaultValue.host}
					/>
				</Grid>
				<Grid item xs={6} md={2}>
					<Box className={classes.label}>Port</Box>
					<input
						className={classes.input}
						type='number'
						onChange={e => handleChange('port', Number(e.target.value))}
						defaultValue={defaultValue.port}
					/>
				</Grid>
				<Grid item xs={6} md={2}>
					<Box className={classes.label}>Database name</Box>
					<input
						className={classes.input}
						onChange={e => handleChange('dbName', e.target.value)}
						defaultValue={defaultValue.dbName}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}

export default ApiForm;
