import React from 'react';
import DatabaseSteps from './Database';
import FileSystem from './FileSystem';
import Tools from './Tools';

function RequestForm({ onSendSuccess, type }) {
	return (
		<>
			{type === 'Database' && <DatabaseSteps onSendSuccess={onSendSuccess} />}
			{type === 'File System' && <FileSystem />}
			{type === 'Tools' && <Tools />}
		</>
	);
}

export default RequestForm;
