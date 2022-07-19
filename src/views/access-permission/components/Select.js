import React from 'react';
import { Box, MenuItem, Select } from '@mui/material';

function SelectCustom({
	placeholder = '',
	options = [],
	selectProps = {},
	defaultValue = null,
	onChange = () => {},
}) {
	return (
		<Select
			defaultValue={defaultValue}
			onChange={e => onChange(e.target.value)}
			renderValue={selected => (
				<>
					<Box
						component='span'
						sx={{ color: 'grey.500', fontWeight: 400 }}
						mr={1}
					>
						{placeholder}:
					</Box>
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
	);
}

export default SelectCustom;
