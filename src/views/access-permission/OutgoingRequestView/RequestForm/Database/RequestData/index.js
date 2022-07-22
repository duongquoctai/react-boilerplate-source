import React, { useState } from 'react';
import { Stack } from '@mui/material';
import RequestDataItem from './Item';

function RequestData({
	onChange = () => {},
	onDelete = () => {},
	defaultValue = [],
}) {
	const [rows, setRows] = useState(defaultValue);

	const handleAddRow = () => {
		const id = Date.now().toString();
		setRows([...rows, { id, ownerId: '', tag: '', table: '', columns: [] }]);
	};

	const handleDelete = id => {
		if (rows.length > 1) {
			const newRows = rows.filter(row => row.id !== id);
			onDelete(id);
			setRows(newRows);
		}
	};

	return (
		<Stack spacing={2}>
			{rows.map(row => (
				<RequestDataItem
					key={row.id}
					id={row.id}
					onAddRow={handleAddRow}
					onDelete={handleDelete}
					onChange={onChange}
					defaultValue={row}
					allowDelete={rows.length > 1}
				/>
			))}
		</Stack>
	);
}

export default RequestData;
