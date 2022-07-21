import { Box, Button, Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Step from '~/views/access-permission/components/Step';
import RequestInfo from './RequestInfo';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { makeStyles } from '@mui/styles';
import RequestProtocol from './RequestProtocol';
import RequestData from './RequestData';

const STEPS = [
	{ key: 'info', title: '1. Request Info' },
	{ key: 'data', title: '2. Request Data' },
	{ key: 'protocol', title: '3. Request Protocol' },
];

const gridRows = ~~(12 / STEPS.length);

const useStyles = makeStyles(theme => ({
	continueBtn: props => ({
		boxShadow: 'none',
		borderRadius: 0,
		fontWeight: 400,
		padding: '6px 12px',
	}),
}));

const initialForm = {
	info: {
		project: -1,
		duration: -1,
		desc: '',
	},
	data: [{ id: Date.now().toString(), ownerId: '', tag: '', columns: [] }], // [{ id, ownerId, tag, columns: [] }]
	protocol: {},
};

const yupSchemas = {
	info: yup.object().shape({
		project: yup
			.number()
			.min(0, 'Project is a required field')
			.typeError('Project is a required field')
			.required('Project is a required field'),
		duration: yup
			.number()
			.typeError('Duration is a required field')
			.min(0, 'Duration is a required field')
			.required('Duration is a required field'),
		desc: yup
			.string()
			.typeError('Descriptions a required field')
			.required('Description is a required field'),
	}),
	data: yup
		.array()
		.required()
		.of(
			yup.object().shape({
				id: yup.string().required(),
				ownerId: yup.string().required(),
				tag: yup.string().required(),
				columns: yup.array().required(),
			}),
		),
	protocol: yup.object().shape({}),
};

function DatabaseSteps() {
	const [currentStep, setCurrentStep] = useState(0);
	const [isValidStep, setIsValidStep] = useState(false);
	const form = useRef(initialForm);
	const classes = useStyles({ isValidStep });

	const validateStep = stepKey => {
		const yupValidator = yupSchemas[stepKey];
		if (yupValidator) {
			yupValidator.isValid(form.current[stepKey]).then(valid => {
				setIsValidStep(valid);
			});
		}
	};

	const handleFormChange = (key, field, value) => {
		form.current[key][field] = value;
		validateStep(key);
	};

	const handleNextStep = () => {
		if (currentStep === 2) {
			console.log(form.current);
			return;
		}
		if (currentStep === STEPS.length - 1 || !isValidStep) return;

		const stepKey = STEPS[currentStep].key;
		const yupValidator = yupSchemas[stepKey];
		const stepData = form.current[stepKey];

		// Step validation
		if (yupValidator) {
			yupValidator
				.validate(stepData)
				.then(() => {
					setCurrentStep(currentStep + 1);
				})
				.catch(err => {
					const { message } = err;
					if (message) {
						toast.error(message);
					}
				});
		}
	};

	const handlePreviousStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleChangeStep = step => {
		if (step === 0) setCurrentStep(step);
		else {
			// check validate previous step
			const stepKey = STEPS[step - 1].key;
			const yupValidator = yupSchemas[stepKey];
			if (yupValidator) {
				yupValidator.isValid(form.current[stepKey]).then(valid => {
					if (valid) {
						setCurrentStep(step);
					}
				});
			}
		}
	};

	const handleOwnerDataChange = row => {
		const index = form.current.data.findIndex(d => d.id === row.id);
		if (index === -1) {
			form.current.data.push(row);
		} else {
			form.current.data[index] = { ...row };
		}
		validateStep('data');
	};

	const handleOwnerDataDelete = id => {
		const newData = form.current.data.filter(d => d.id !== id);
		form.current.data = newData;
		validateStep('data');
	};

	useEffect(() => {
		const stepKey = STEPS[currentStep].key;
		validateStep(stepKey);
	}, [currentStep]);

	return (
		<Box>
			<Grid container spacing={1}>
				{STEPS.map((step, index) => (
					<Grid item xs={12} sm={gridRows} key={step.key}>
						<Step
							onClick={() => handleChangeStep(index)}
							title={step.title}
							active={currentStep === index}
							done={currentStep > index}
						/>
					</Grid>
				))}
			</Grid>

			<Box mt={3}>
				{currentStep === 0 && (
					<RequestInfo
						onChange={(field, value) => handleFormChange('info', field, value)}
						defaultValue={form.current.info}
					/>
				)}
				{currentStep === 1 && (
					<RequestData
						onChange={handleOwnerDataChange}
						onDelete={handleOwnerDataDelete}
						defaultValue={form.current.data}
					/>
				)}
				{currentStep === 2 && <RequestProtocol />}
			</Box>

			<Box mt={3} pt={3} textAlign='right'>
				{currentStep > 0 && (
					<Button sx={{ fontWeight: 400, mr: 1 }} onClick={handlePreviousStep}>
						Back
					</Button>
				)}
				<Button
					variant='contained'
					className={classes.continueBtn}
					onClick={handleNextStep}
					sx={{
						backgroundColor: isValidStep
							? 'primary.main'
							: 'rgba(0,0,0,0.38) !important',
						cursor: isValidStep ? 'pointer' : 'default',
						pointerEvents: isValidStep ? '' : 'none',
					}}
				>
					Continue
				</Button>
			</Box>
		</Box>
	);
}

export default DatabaseSteps;
