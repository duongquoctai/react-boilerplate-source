import { Box, ButtonGroup, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import RequestForm from './RequestForm';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';

const REQUEST_TYPES = ['Database', 'File System', 'Tools'];

const useStyles = makeStyles(theme => ({
	root: {
		'& .MuiDialog-paper': {
			width: '1020px',
			maxWidth: '1020px',
		},
	},
	title: {
		display: 'flex',
		justifyContent: 'space-between',
		fontWeight: 500,
		'& .main': {
			fontSize: '20px',
		},
		'& .role': {
			fontSize: '14px',
			color: '#fff',
			padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
			backgroundColor: theme.palette.primary.light,
			borderRadius: 8,
		},
	},
	button: {
		borderRadius: 0,
		fontWeight: 500,
		boxShadow: 'none',
		fontSize: '14px',
	},
	requestType: {
		fontSize: '14px',
		color: alpha('#000', 0.6),
	},
	typeButton: {
		borderColor: `${alpha(theme.palette.grey[800], 0.08)} !important`,
		fontWeight: 400,
		color: alpha('#000', 0.6),
		'&.active': {
			color: alpha('#000', 0.87),
			backgroundColor: theme.palette.primary.lighter,
			borderColor: theme.palette.primary.light,
		},
	},
}));

function RequestModal({ open = false, onClose = () => {} }) {
	const classes = useStyles();
	const [requestType, setRequestType] = useState(REQUEST_TYPES[0]);

	const handleSendSuccess = () => {
		toast.success('Send request successfully');
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose} className={classes.root}>
			<DialogTitle>
				<Box className={classes.title}>
					<span className='main'>Create new Outgoing request</span>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<span className='role'>Internal</span>
						<CloseIcon
							sx={{ cursor: 'pointer', ml: 1, color: 'grey.500' }}
							onClick={onClose}
						/>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Stack direction='row' my={3} spacing={2} alignItems='center'>
					<span className={classes.requestType}>Request Types:</span>
					<ButtonGroup size='medium'>
						{REQUEST_TYPES.map(type => (
							<Button
								key={type}
								variant='outlined'
								className={`${classes.typeButton} ${
									type === requestType ? 'active' : ''
								}`}
							>
								{type}
							</Button>
						))}
					</ButtonGroup>
				</Stack>
				<RequestForm onSendSuccess={handleSendSuccess} />
			</DialogContent>
		</Dialog>
	);
}

export default RequestModal;
