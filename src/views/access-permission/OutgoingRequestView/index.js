import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {
	Button,
	CircularProgress,
	InputBase,
	Pagination,
	Stack,
} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { filter } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useGetOutgoingRequestsQuery } from '~/redux/slices/access-permission';
import SelectCustom from '../components/Select';
import {
	REQUEST_TYPE_OPTIONS,
	CREATE_TIME_OPTIONS,
	PAGE_LIMIT,
} from '../constant';
import { debounce } from '../helper';
import DataTable from './DataTable';
import RequestModal from './RequestModal';

let searchTimeout = null;

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
	formControl: {
		borderRadius: 4,
		minWidth: '160px',
		height: theme.spacing(4.5),
		fontSize: 14,
		[theme.breakpoints.down('md')]: {
			width: '100%',
		},
	},
}));

const ALL_TYPE = -1;

function OutgoingRequestView() {
	const classes = useStyles();
	const searchRef = useRef('');
	const filter = useRef({
		keyword: '',
		type: ALL_TYPE,
		created: ALL_TYPE,
		sort: '',
	});
	const { isFetching, data = [], refetch } = useGetOutgoingRequestsQuery();

	const [requests, setRequests] = useState([]);
	const [page, setPage] = useState(1);
	const [openRequestModal, setOpenRequestModal] = useState(false);
	const totalPage = Math.ceil(requests.length / PAGE_LIMIT);

	const requestPaginated = requests.slice(
		(page - 1) * PAGE_LIMIT,
		page * PAGE_LIMIT,
	);

	const handleFilter = () => {
		const { keyword, type, created, sort } = filter.current;
		let newData = [...data];

		if (type !== ALL_TYPE) {
			newData = newData.filter(req => req.type === type);
		}

		if (created !== ALL_TYPE) {
			newData = newData.filter(() => true);
		}

		if (keyword) {
			newData = newData.filter(
				req =>
					req.ticketId?.includes(keyword) ||
					req.name?.toLowerCase().includes(keyword) ||
					req.owners.findIndex(o => o.name?.toLowerCase().includes(keyword)) !==
						-1,
			);
		}

		// Sort by name
		if (sort === 'asc') {
			newData.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
		} else if (sort === 'desc') {
			newData.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0));
		}

		setPage(1);
		setRequests(newData);
	};

	const handleChangeType = type => {
		filter.current.type = type;
		handleFilter();
	};

	const handleCreateTimeChange = option => {
		filter.current.created = option;
		handleFilter();
	};

	const handleSearch = e => {
		if (data.length) {
			searchTimeout = debounce(searchTimeout, 250, () => {
				const keyword = e.target?.value.trim().toLowerCase();
				filter.current.keyword = keyword;
				handleFilter();
			});
		}
	};

	const handleSortByName = (sortType = 'asc') => {
		filter.current.sort = sortType;
		handleFilter();
	};

	const handleToggleModal = () => {
		setOpenRequestModal(!openRequestModal);
	};

	const handleRefetchData = () => {
		setTimeout(refetch, 500);
	};

	useEffect(() => {
		if (!isFetching) {
			setRequests([...data]);
		}
	}, [isFetching]);

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
						onChange={handleSearch}
						placeholder='Search requests ...'
					/>
					<Box className={classes.formControl}>
						<SelectCustom
							placeholder='Type'
							options={REQUEST_TYPE_OPTIONS}
							selectProps={{ className: classes.formControl }}
							onChange={handleChangeType}
							formControlClass={classes.formControl}
						/>
					</Box>
					<Box className={classes.formControl}>
						<SelectCustom
							placeholder='Created'
							selectProps={{ className: classes.formControl }}
							options={CREATE_TIME_OPTIONS}
							onChange={handleCreateTimeChange}
							formControlClass={classes.formControl}
						/>
					</Box>
				</Stack>

				<Button
					variant='contained'
					sx={{ height: '100%' }}
					startIcon={<AddOutlinedIcon fontSize='small' />}
					className={classes.button}
					onClick={handleToggleModal}
				>
					New Request
				</Button>
			</Box>

			{isFetching ? (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			) : (
				<>
					<DataTable requests={requestPaginated} onSort={handleSortByName} />
					{totalPage > 0 && (
						<Box mt={4} sx={{ display: 'flex', justifyContent: 'center' }}>
							<Pagination
								count={totalPage}
								color='primary'
								page={page}
								onChange={(_, p) => setPage(p)}
							/>
						</Box>
					)}
				</>
			)}

			<RequestModal
				open={openRequestModal}
				onClose={handleToggleModal}
				onRefetchData={handleRefetchData}
			/>
		</Container>
	);
}

export default OutgoingRequestView;
