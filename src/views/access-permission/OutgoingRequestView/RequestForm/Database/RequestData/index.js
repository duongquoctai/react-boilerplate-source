import React, { useRef, useState } from 'react';
import { Stack } from '@mui/material';
import RequestDataItem from './Item';

const initItems = [{ id: Date.now().toString() }];

function RequestData({ onChange = () => {}, onDelete = () => {} }) {
	const [rows, setRows] = useState(initItems);
	const rowRef = useRef(initItems);

	const handleAddRow = () => {
		const id = Date.now().toString();
		setRows([...rows, { id }]);
	};

	const handleDelete = id => {
		if (rows.length > 1) {
			const newRows = rows.filter(row => row.id !== id);
			onDelete(id);
			setRows(newRows);
		}
	};

	return (
		<Stack spacing={2} sx={{ maxHeight: '500px', overflow: 'auto' }}>
			{rows.map(row => (
				<RequestDataItem
					key={row.id}
					id={row.id}
					onAddRow={handleAddRow}
					onDelete={handleDelete}
					onChange={onChange}
				/>
			))}
		</Stack>
	);
}

export default RequestData;
