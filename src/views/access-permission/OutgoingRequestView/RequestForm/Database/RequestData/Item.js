import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';
import SelectCustom from '~/views/access-permission/components/Select';
import { DATA_OWNERS } from '~/views/access-permission/constant';
import MultipleSelect from '~/views/access-permission/components/MultipleSelect';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Stack } from '@mui/material';

const useStyles = makeStyles(theme => ({
	icon: {
		color: theme.palette.grey[500],
		cursor: 'pointer',
		transition: 'all .35s',
	},
	deleteIcon: {
		'&:hover': {
			color: theme.palette.error.main,
		},
	},
	addIcon: {
		'&:hover': {
			color: theme.palette.primary.main,
		},
	},
	select: {
		width: '100%',
		color: alpha('#000', 0.6),
		borderRadius: 6,
		'&.disabled': {
			opacity: 0.45,
			pointerEvents: 'none',
			cursor: 'default',
			'& .MuiOutlinedInput-notchedOutline': {
				borderColor: `${theme.palette.grey[500]} !important`,
			},
		},
	},
	label: {
		marginBottom: '12px',
		color: alpha('#000', 0.87),
		fontSize: '14px',
	},
}));

function RequestDataItem({
	id = '',
	onAddRow = () => {},
	onDelete = () => {},
	onChange = () => {},
}) {
	const classes = useStyles();
	const [form, setForm] = useState({ ownerId: '', tag: '', columns: [] });

	const tagOptions =
		DATA_OWNERS.find(o => o.value === form.ownerId)?.tags || [];
	const columnOptions = tagOptions.length
		? tagOptions.find(t => t.value === form.tag)?.columns || []
		: [];

	const handleOwnerChange = ownerId => {
		const newForm = { ownerId, tag: '', columns: [] };
		onChange({ id, ...newForm });
		setForm(newForm);
	};

	const handleTagChange = tag => {
		const newForm = { ownerId: form.ownerId, tag, columns: [] };
		onChange({ id, ...newForm });
		setForm(newForm);
	};

	const handleColumnChange = columns => {
		const newForm = { ...form, columns };
		onChange({ id, ...newForm });
	};

	return (
		<Box>
			<Grid container columnSpacing={2}>
				<Grid item xs={10} sm={11}>
					<Grid container spacing={4.5}>
						<Grid item xs={12} sm={6} md={4}>
							<Box className={classes.label}>Data owner</Box>
							<SelectCustom
								showPlaceholderInValue={false}
								options={DATA_OWNERS}
								placeholder='Select table and their columns'
								formControlClass={classes.select}
								selectProps={{
									size: 'small',
									className: classes.select,
									value: form.ownerId,
								}}
								onChange={handleOwnerChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Box className={classes.label}>Tag:values</Box>
							<SelectCustom
								showPlaceholderInValue={false}
								placeholder='Select table and their columns'
								selectProps={{
									size: 'small',
									className: classes.select,
									value: form.tag,
								}}
								options={tagOptions}
								formControlClass={`${classes.select} ${
									!form.ownerId ? 'disabled' : ''
								}`}
								onChange={handleTagChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Box className={classes.label}>Table:columns</Box>
							<MultipleSelect
								placeholder='Select table and their columns'
								options={columnOptions}
								formControlClass={`${classes.select} ${
									!form.tag ? 'disabled' : ''
								}`}
								selectProps={{ size: 'small', className: classes.select }}
								onChange={handleColumnChange}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={2} sm={1}>
					<Stack
						direction='row'
						spacing={1}
						alignItems='center'
						height='100%'
						pt='33px'
					>
						<AddCircleIcon
							className={`${classes.icon} ${classes.addIcon}`}
							onClick={onAddRow}
						/>
						<DeleteForeverIcon
							className={`${classes.icon} ${classes.deleteIcon}`}
							onClick={() => onDelete(id)}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
}

export default RequestDataItem;
