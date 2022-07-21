import React from 'react';
import DatabaseSteps from './Database';

function RequestForm({ onSendSuccess }) {
	return (
		<div>
			<DatabaseSteps onSendSuccess={onSendSuccess} />
		</div>
	);
}

export default RequestForm;
