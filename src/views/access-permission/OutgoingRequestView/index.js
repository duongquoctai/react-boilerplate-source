import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button, CircularProgress, InputBase, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useGetOutgoingRequestsQuery } from '~/redux/slices/access-permission';
import SelectCustom from '../components/Select';
import { REQUEST_TYPES, CREATE_TIME_OPTIONS } from '../constant';
import DataTable from './DataTable';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 1148,
	},
	searchWrap: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'wrap',
		margin: `${theme.spacing(3)} 0px`,
	},
	searchField: {
		borderRadius: 4,
		border: `solid 1px ${theme.palette.grey[500]}`,
		padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
		height: '100%',
		fontSize: '14px',
		height: theme.spacing(4.5),
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	button: {
		borderRadius: 0,
		fontWeight: 500,
		boxShadow: 'none',
		fontSize: '14px',
		height: theme.spacing(4.5),
		[theme.breakpoints.down('sm')]: {
			marginTop: theme.spacing(1.5),
			width: '100%',
		},
	},
	select: {
		borderRadius: 4,
		minWidth: '160px',
		height: theme.spacing(4.5),
		fontSize: 14,
		[theme.breakpoints.down('md')]: {
			width: '100%',
		},
	},
}));

function OutgoingRequestView() {
	const classes = useStyles();
	const searchRef = useRef('');
	const { isLoading, data: requests } = useGetOutgoingRequestsQuery();

	const handleChangeType = type => {
		console.log(type);
	};

	const handleCreateTimeChange = option => {
		console.log(option);
	};

	// Search when press enter
	useEffect(() => {
		searchRef.current?.addEventListener('keydown', function(e) {
			if (e.code === 'Enter') {
				console.log(e.target.value.trim());
			}
		});
		return () => searchRef.current?.removeEventListener('keydown', () => {});
	}, []);

	return (
		<Container className={classes.root}>
			<Box className={classes.searchWrap}>
				<Stack
					direction={{ xs: 'column', md: 'row' }}
					alignItems='center'
					spacing={2}
				>
					<InputBase
						inputProps={{ ref: searchRef }}
						className={classes.searchField}
						placeholder='Search requests ...'
					/>
					<Box className={classes.select}>
						<SelectCustom
							placeholder='Type'
							options={REQUEST_TYPES}
							selectProps={{ className: classes.select }}
							defaultValue={REQUEST_TYPES[0].value}
							onChange={handleChangeType}
						/>
					</Box>
					<Box className={classes.select}>
						<SelectCustom
							placeholder='Created'
							selectProps={{ className: classes.select }}
							options={CREATE_TIME_OPTIONS}
							defaultValue={CREATE_TIME_OPTIONS[0].value}
							onChange={handleCreateTimeChange}
						/>
					</Box>
				</Stack>

				<Button
					variant='contained'
					sx={{ height: '100%' }}
					startIcon={<AddOutlinedIcon fontSize='small' />}
					className={classes.button}
				>
					New Request
				</Button>
			</Box>

			{isLoading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			) : (
				<DataTable requests={requests} />
			)}
		</Container>
	);
}

export default OutgoingRequestView;
