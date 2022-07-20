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
import React, { useEffect, useRef, useState } from 'react';
import { useGetOutgoingRequestsQuery } from '~/redux/slices/access-permission';
import SelectCustom from '../components/Select';
import {
	REQUEST_TYPE_OPTIONS,
	CREATE_TIME_OPTIONS,
	PAGE_LIMIT,
} from '../constant';
import DataTable from './DataTable';
import RequestModal from './RequestModal';

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

function OutgoingRequestView() {
	const classes = useStyles();
	const searchRef = useRef('');
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(10);
	const [openRequestModal, setOpenRequestModal] = useState(true);
	const { isLoading, data: requests } = useGetOutgoingRequestsQuery(
		page,
		PAGE_LIMIT,
	);

	const handleChangeType = type => {
		console.log(type);
	};

	const handleCreateTimeChange = option => {
		console.log(option);
	};

	const handleToggleModal = () => {
		setOpenRequestModal(!openRequestModal);
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

			{isLoading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			) : (
				<>
					<DataTable requests={requests} />
					<Box mt={4} sx={{ display: 'flex', justifyContent: 'center' }}>
						<Pagination
							count={totalPage}
							color='primary'
							page={page}
							onChange={(_, p) => setPage(p)}
						/>
					</Box>
				</>
			)}

			<RequestModal open={openRequestModal} onClose={handleToggleModal} />
		</Container>
	);
}

export default OutgoingRequestView;
