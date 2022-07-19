import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import { Box, Stack } from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ProcessBar from '~/views/access-permission/components/ProcessBar';
import PropTypes from 'prop-types';
import { REQUEST_STATUS, REQUEST_TYPES } from '../constant';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const useStyles = makeStyles(theme => ({
	table: {
		borderRadius: 8,
		border: 'solid 1px rgba(33, 33, 33, 0.08)',

		'& td, & th': {
			boxShadow: 'none',
			fontSize: '16px',
			fontWeight: 400,
		},
		'& thead': {
			backgroundColor: 'rgba(33, 33, 33, 0.04)',
		},
		'& th': {},
		'& tr:hover': {
			backgroundColor: 'rgba(33, 33, 33, 0.04)',
		},
	},
	type: {
		padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
		backgroundColor: theme.palette.primary.light,
		borderRadius: 16,
		fontSize: '14px',
		color: '#fff',
		lineHeight: '20px',
	},
	owners: {
		maxWidth: '200px',
		wordBreak: 'break-word',
	},
	owner: {
		color: theme.palette.primary.main,
		marginRight: '4px',
	},
}));

function renderOwners(owners = [], classes) {
	const len = owners.length;
	return owners.map((owner, index) => (
		<Link to={`/owner/${owner.id}`} key={owner.id} className={classes.owner}>
			{owner.name}
			{index === len - 1 ? '' : ','}
		</Link>
	));
}

DataTable.propTypes = {
	requests: PropTypes.array.isRequired,
};

function DataTable({ requests = [] }) {
	const classes = useStyles();
	const [sort, setSort] = useState('asc');
	const SortIcon = sort === 'asc' ? ArrowDownwardIcon : ArrowUpwardIcon;

	const handleSort = () => {
		if (sort === 'asc') {
			setSort('desc');
		} else setSort('asc');
	};

	return (
		<TableContainer component={Box} className={classes.table}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Ticket ID</TableCell>
						<TableCell>
							<Stack direction='row' spacing={1}>
								<span>Name</span>
								<SortIcon onClick={handleSort} sx={{ cursor: 'pointer' }} />
							</Stack>
						</TableCell>
						<TableCell>Type</TableCell>
						<TableCell>Data owners</TableCell>
						<TableCell>Create Time</TableCell>
						<TableCell>Process</TableCell>
						<TableCell>Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{requests.map(req => (
						<TableRow key={req.ticketId}>
							<TableCell>{req.ticketId}</TableCell>
							<TableCell>{req.name}</TableCell>
							<TableCell>
								<span className={classes.type}>
									{REQUEST_TYPES.find(r => r.value === req.type)?.label ||
										'Unknown'}
								</span>
							</TableCell>
							<TableCell className={classes.owners}>
								{renderOwners(req.owners, classes)}
							</TableCell>
							<TableCell>
								{moment(req.createTime).format('DD/MM/YYYY')}
							</TableCell>
							<TableCell>
								<ProcessBar process={req.process} />
							</TableCell>
							<TableCell>
								<Box sx={{ color: REQUEST_STATUS[req.status]?.color }}>
									{REQUEST_STATUS[req.status]?.label}
								</Box>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default DataTable;
