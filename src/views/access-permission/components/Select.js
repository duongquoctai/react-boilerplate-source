import React from 'react';
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
};

const useStyles = makeStyles(theme => ({
	formControl: {
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: `${theme.palette.primary.light} !important`,
		},
	},
}));

function SelectCustom({
	placeholder = '',
	options = [],
	selectProps = {},
	defaultValue = null,
	onChange = () => {},
	formControlClass = '',
}) {
	const classes = useStyles();
	return (
		<FormControl className={`${classes.formControl} ${formControlClass}`}>
			<Select
				defaultValue={defaultValue}
				onChange={e => onChange(e.target.value)}
				renderValue={selected => (
					<>
						{placeholder && (
							<Box
								component='span'
								sx={{ color: 'grey.500', fontWeight: 400 }}
								mr={1}
							>
								{placeholder}
							</Box>
						)}
						<span>{options.find(o => o.value === selected)?.label}</span>
					</>
				)}
				{...selectProps}
			>
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
