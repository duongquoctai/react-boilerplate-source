import React, { useState } from 'react';
import {
	Box,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Grid,
	Radio,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';
import SelectCustom from '~/views/access-permission/components/Select';
import {
	DATA_OWNERS,
	DB_OPTIONS,
	RBAC,
} from '~/views/access-permission/constant';
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
	checkboxGroup: {
		border: `solid 1px ${theme.palette.primary.light}`,
		borderRadius: '8px',
		paddingLeft: '4px',
		paddingRight: '4px',
		height: '40px',

		'& .MuiRadio-root': {
			padding: '2px',
		},
	},
	checkboxLabel: {
		fontSize: '12px !important',
		color: 'rgba(0, 0, 0, 0.6)',
	},
}));

function InternalRequestDataItem({
	id = '',
	onAddRow = () => {},
	onDelete = () => {},
	onChange = () => {},
	defaultValue = {},
	allowDelete = true,
}) {
	const classes = useStyles();
	const [form, setForm] = useState(defaultValue);

	const tableOptions = DB_OPTIONS.find(t => t.value === form.db)?.tables || [];
	const columnOptions = tableOptions.length
		? tableOptions.find(t => t.value === form.table)?.columns || []
		: [];

	const handleDbChange = db => {
		const newForm = { ...form, db, table: '', columns: [] };
		onChange({ id, ...newForm });
		setForm(newForm);
	};

	const handleTableChange = table => {
		const newForm = { ...form, table, columns: [] };
		onChange({ id, ...newForm });
		setForm(newForm);
	};

	const handleColumnChange = columns => {
		const newForm = { ...form, columns };
		setForm(newForm);
		onChange({ id, ...newForm });
	};

	const handleRbacChange = rbac => {
		const newForm = { ...form, rbac: [...form.rbac, rbac] };
		setForm(newForm);
		onChange({ id, ...newForm });
	};

	return (
		<Box>
			<Grid container columnSpacing={2}>
				<Grid item xs={10} sm={11}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={3}>
							<Box className={classes.label}>Database</Box>
							<SelectCustom
								showPlaceholderInValue={false}
								placeholder='Select database'
								selectProps={{
									size: 'small',
									className: classes.select,
									value: form.db,
								}}
								options={DB_OPTIONS}
								formControlClass={classes.select}
								defaultValue={defaultValue.db}
								onChange={handleDbChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<Box className={classes.label}>Table</Box>
							<SelectCustom
								showPlaceholderInValue={false}
								placeholder='Select tables'
								selectProps={{
									size: 'small',
									className: classes.select,
									value: form.table,
								}}
								options={tableOptions}
								formControlClass={`${classes.select} ${
									!form.db ? 'disabled' : ''
								}`}
								defaultValue={defaultValue.table}
								onChange={handleTableChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<Box className={classes.label}>Columns</Box>
							<MultipleSelect
								placeholder='Select table and their columns'
								options={columnOptions}
								formControlClass={`${classes.select} ${
									!form.table ? 'disabled' : ''
								}`}
								selectProps={{
									size: 'small',
									className: classes.select,
									value: form.columns,
								}}
								onChange={handleColumnChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<Box className={classes.label}>Roled-base access control</Box>
							<Stack
								direction='row'
								spacing={0.5}
								className={classes.checkboxGroup}
							>
								<Stack spacing={0.25} direction='row' alignItems='center'>
									<Radio
										size='small'
										id='read'
										checked={form.rbac?.includes(RBAC.READ)}
										onChange={_ => handleRbacChange(RBAC.READ)}
									/>
									<label className={classes.checkboxLabel} htmlFor='read'>
										Read
									</label>
								</Stack>
								<Stack spacing={0.25} direction='row' alignItems='center'>
									<Radio
										size='small'
										id='write'
										checked={form.rbac?.includes(RBAC.WRITE)}
										onChange={_ => handleRbacChange(RBAC.WRITE)}
									/>
									<label htmlFor='write' className={classes.checkboxLabel}>
										Write
									</label>
								</Stack>
								<Stack spacing={0.25} direction='row' alignItems='center'>
									<Radio size='small' disabled />
									<label
										className={classes.checkboxLabel}
										style={{ color: 'rgba(151, 151, 151, 0.8)' }}
									>
										Execute
									</label>
								</Stack>
							</Stack>
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
						{allowDelete && (
							<DeleteForeverIcon
								className={`${classes.icon} ${classes.deleteIcon}`}
								onClick={() => onDelete(id)}
							/>
						)}
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
}

export default InternalRequestDataItem;
