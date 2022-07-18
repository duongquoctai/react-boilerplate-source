import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, CircularProgress, InputBase, Tab, Tabs } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DataTable from './DataTable';
import { useGetOutgoingRequestsQuery } from '~/redux/slices/access-permission';
import { REQUEST_TYPES } from '../constant';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 1148,
	},
	tabs: {
		borderBottom: `solid 1px ${theme.palette.primary.main}`,
		letterSpacing: '0.5px',
	},
	tab: {
		fontWeight: 400,
		padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
	},
	selectedTab: {
		color: `${theme.palette.primary.contrastText} !important`,
		fontWeight: 600,
		backgroundColor: theme.palette.primary.main,
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
			marginBottom: theme.spacing(1.5),
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
			width: '100%',
		},
	},
}));

function OutgoingRequestView() {
	const [type, setType] = useState(REQUEST_TYPES[0].value);
	const classes = useStyles();
	const { isLoading, data: requests } = useGetOutgoingRequestsQuery();

	const handleTabChange = (_, requestType) => {
		setType(requestType);
	};

	return (
		<Container className={classes.root}>
			<Box className={classes.tabs}>
				<Tabs
					value={type}
					onChange={handleTabChange}
					TabIndicatorProps={{ style: { display: 'none' } }}
				>
					{REQUEST_TYPES.map(requestType => (
						<Tab
							classes={{ root: classes.tab, selected: classes.selectedTab }}
							key={requestType.value}
							label={requestType.label}
							value={requestType.value}
						/>
					))}
				</Tabs>
			</Box>

			<Box className={classes.searchWrap}>
				<InputBase
					className={classes.searchField}
					placeholder='Search requests ...'
				/>

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
