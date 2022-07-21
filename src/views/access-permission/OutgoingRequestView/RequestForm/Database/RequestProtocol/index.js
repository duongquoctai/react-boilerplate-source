import React, { useState } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';
import { Stack } from '@mui/material';
import SelectCustom from '~/views/access-permission/components/Select';
import { FULFILL_REQUESTS } from '~/views/access-permission/constant';
import ApiForm from './ApiForm';

export const commonStyles = theme => ({
	field: {
		width: '100%',
		color: alpha('#000', 0.6),
		borderRadius: 6,
		height: '36px',
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: `${theme.palette.grey[500]} !important`,
		},
	},
	label: {
		marginBottom: '12px',
		color: alpha('#000', 0.87),
		fontSize: '14px',
	},
});

const useStyles = makeStyles(commonStyles);

function RequestProtocol({ onChange, defaultValue }) {
	const classes = useStyles();
	const [type, setType] = useState(defaultValue.type);

	const handleTypeChange = t => {
		onChange(false, { type: t, data: {} });
		setType(t);
	};

	return (
		<Stack spacing={1}>
			<Box>
				<Box className={classes.label}>Fulfill request</Box>
				<Box sx={{ width: '240px' }}>
					<SelectCustom
						options={FULFILL_REQUESTS}
						placeholder='Select a fulfill request'
						selectProps={{ className: classes.field, value: type }}
						formControlClass={classes.field}
						showPlaceholderInValue={false}
						onChange={handleTypeChange}
					/>
				</Box>
			</Box>
			<Box mt='6px'>
				{type === 'api' && (
					<ApiForm
						onChange={(valid, value) => onChange(valid, { type, data: value })}
						defaultValue={defaultValue.data}
					/>
				)}
			</Box>
		</Stack>
	);
}

export default RequestProtocol;
