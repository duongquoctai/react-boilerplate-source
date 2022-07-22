import {
	Box,
	Checkbox,
	FormControl,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
	formControl: {
		maxHeight: '100px',
		width: '100%',
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: `${theme.palette.primary.light} !important`,
		},
	},
	menu: {
		maxHeight: '238px',
	},
	selectAllText: {
		fontWeight: 500,
	},
	selectedAll: {
		backgroundColor: 'rgba(0, 0, 0, 0.08)',
		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.08)',
		},
	},
	selectedOption: {
		backgroundColor: theme.palette.primary.lighter,
		borderRadius: 6,
		padding: '2px 6px',
		color: alpha('#000', 0.87),
		fontSize: '14px',
		marginRight: '4px',
	},
}));

function renderSelectValue(options = [], selected = [], placeholder, classes) {
	const selectedLen = selected.length;

	if (selectedLen === 0) {
		return (
			<Box
				component='span'
				sx={{ color: 'grey.500', fontWeight: 400, fontSize: '14px' }}
			>
				{placeholder}
			</Box>
		);
	}

	const items = selectedLen === options.length ? '*' : selectedLen;
	return <span className={classes.selectedOption}>All ({items})</span>;
}

MultipleSelect.propTypes = {
	placeholder: PropTypes.string,
	formControlClass: PropTypes.string,
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func,
	selectProps: PropTypes.object,
};

function MultipleSelect({
	formControlClass = '',
	placeholder = '',
	onChange = () => {},
	options = [],
	selectProps = {},
}) {
	const classes = useStyles();
	const [selected, setSelected] = useState([]);
	const isAllSelected =
		options.length > 0 && selected.length === options.length;

	const handleChange = event => {
		const value = event.target.value;
		let newSelected = value;
		if (value[value.length - 1] === 'all') {
			newSelected =
				selected.length === options.length ? [] : options.map(o => o.value);
		}
		onChange(newSelected);
		setSelected(newSelected);
	};

	useEffect(() => {
		setSelected([]);
	}, [options]);

	return (
		<FormControl className={`${classes.formControl} ${formControlClass}`}>
			<Select
				multiple
				displayEmpty
				value={selected}
				onChange={handleChange}
				renderValue={selected =>
					renderSelectValue(options, selected, placeholder, classes)
				}
				MenuProps={{ classes: { list: classes.menu } }}
				{...selectProps}
			>
				<MenuItem
					value='all'
					classes={{ root: isAllSelected ? classes.selectedAll : '' }}
				>
					<ListItemIcon>
						<Checkbox
							classes={{ indeterminate: classes.indeterminateColor }}
							checked={isAllSelected}
							indeterminate={
								selected.length > 0 && selected.length < options.length
							}
						/>
					</ListItemIcon>
					<ListItemText
						classes={{ primary: classes.selectAllText }}
						primary='Select All'
					/>
				</MenuItem>
				{options.map(option => (
					<MenuItem key={option.value} value={option.value} sx={{ ml: 2 }}>
						<ListItemIcon>
							<Checkbox checked={selected.indexOf(option.value) > -1} />
						</ListItemIcon>
						<ListItemText primary={option.label} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export default MultipleSelect;
