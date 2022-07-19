import { Box, Button, Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
import Step from '~/views/access-permission/components/Step';
import RequestInfo from './RequestInfo';

const STEPS = ['1. Request Info', '2. Request Data'];
const gridRows = ~~(12 / STEPS.length);

function DatabaseSteps() {
	const [currentStep, setCurrentStep] = useState(0);
	const form = useRef({});

	return (
		<Box>
			<Grid container spacing={2}>
				{STEPS.map((step, index) => (
					<Grid item xs={12} sm={gridRows} key={step}>
						<Step
							title={step}
							active={currentStep === index}
							done={currentStep > index}
						/>
					</Grid>
				))}
			</Grid>

			<Box mt={3}>
				<RequestInfo />
			</Box>

			<Box mt={3} pt={3} textAlign='right'>
				<Button
					variant='contained'
					sx={{ boxShadow: 'none', borderRadius: 0, fontWeight: 400 }}
				>
					Continue
				</Button>
			</Box>
		</Box>
	);
}

export default DatabaseSteps;
