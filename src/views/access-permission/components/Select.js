import React, { useState } from 'react';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

SelectCustom.propTypes = {
	placeholder: PropTypes.string,
	formControlClass: PropTypes.string,
	options: PropTypes.array.isRequired,
	selectProps: PropTypes.object,
	defaultValue: PropTypes.any,
	onChange: PropTypes.func,
	showPlaceholderInValue: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
	formControl: {
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: `${theme.palette.primary.light} !important`,
		},
	},
}));

function renderSelectValue(
	options,
	selected,
	placeholder,
	showPlaceholderInValue,
) {
	const Placeholder = (
		<Box
			component='span'
			sx={{ color: 'grey.500', fontWeight: 400, fontSize: '14px' }}
			mr={1}
		>
			{placeholder}
		</Box>
	);

	if ((!selected || !selected.length === 0) && placeholder) {
		return Placeholder;
	}

	return (
		<>
			{placeholder && showPlaceholderInValue && Placeholder}
			<span>{options.find(o => o.value === selected)?.label}</span>
		</>
	);
}

function SelectCustom({
	placeholder = '',
	options = [],
	selectProps = {},
	defaultValue = '',
	onChange = () => {},
	formControlClass = '',
	showPlaceholderInValue = true,
}) {
	const classes = useStyles();
	const [value, setValue] = useState(defaultValue);

	return (
		<FormControl className={`${classes.formControl} ${formControlClass}`}>
			<Select
				displayEmpty
				value={value}
				onChange={e => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				renderValue={selected =>
					renderSelectValue(
						options,
						selected,
						placeholder,
						showPlaceholderInValue,
					)
				}
				{...selectProps}
			>
				<MenuItem disabled value=''>
					{placeholder}
				</MenuItem>

				{options.map(option => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export default SelectCustom;
