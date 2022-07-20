export const REQUEST_STATUS = {
	0: {
		color: '#FF7000',
		label: 'In Process',
	},
	1: {
		color: '#00A266',
		label: 'Success',
	},
};

export const REQUEST_TYPE_OPTIONS = [
	{
		value: 0,
		label: 'All',
	},
	{
		value: 1,
		label: 'Database',
	},
	{
		value: 2,
		label: 'Filesystem',
	},
	{
		value: 3,
		label: 'Tools',
	},
];

export const CREATE_TIME_OPTIONS = [
	{
		label: 'Anytime',
		value: 0,
	},
	{
		label: '3 months ago',
		value: 1,
	},
];

export const PAGE_LIMIT = 5;

export const REQUEST_PROJECTS = [
	{
		label: 'FPT Telecom',
		value: 0,
	},
	{
		label: 'FPT Software',
		value: 1,
	},
];

export const REQUEST_DURATION = [
	{
		label: 'Forever',
		value: 0,
	},
	{
		label: '1 week',
		value: 1,
	},
];
