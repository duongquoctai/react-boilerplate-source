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
		value: -1,
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
		value: 1,
	},
	{
		label: '3 months ago',
		value: 2,
	},
];

export const PAGE_LIMIT = 5;

export const REQUEST_PROJECTS = [
	{
		label: 'FPT Telecom',
		value: 1,
	},
	{
		label: 'FPT Software',
		value: 2,
	},
];

export const REQUEST_DURATION = [
	{
		label: 'Forever',
		value: 1,
	},
	{
		label: '1 week',
		value: 2,
	},
];

export const DATA_OWNERS = [
	{
		value: 1,
		label: 'FPT Online',
		tags: [
			{
				value: 1,
				label: 'Tag 1',
				columns: [
					{ value: 1, label: 'Column 1' },
					{ value: 2, label: 'Column 2' },
					{ value: 15, label: 'Column 15' },
				],
			},
			{
				value: 2,
				label: 'Tag 2',
				columns: [
					{ value: 3, label: 'Column 3' },
					{ value: 4, label: 'Column 3' },
				],
			},
		],
	},
	{
		value: 2,
		label: 'FPT Offline',
		tags: [
			{
				value: 3,
				label: 'Tag 3',
				columns: [
					{ value: 5, label: 'Column 5' },
					{ value: 6, label: 'Column 6' },
				],
			},
			{
				value: 4,
				label: 'Tag 4',
				columns: [
					{ value: 7, label: 'Column 7' },
					{ value: 8, label: 'Column 8' },
				],
			},
		],
	},
	{
		value: 3,
		label: 'FPT Outlier',
		tags: [
			{
				value: 5,
				label: 'Tag 5',
				columns: [
					{ value: 9, label: 'Column 9' },
					{ value: 10, label: 'Column 10' },
				],
			},
			{
				value: 6,
				label: 'Tag 6',
				columns: [
					{ value: 11, label: 'Column 11' },
					{ value: 12, label: 'Column 12' },
				],
			},
		],
	},
];

export const FULFILL_REQUESTS = [{ label: 'API', value: 'api' }];

export const REQUEST_FREQUENCIES = [{ label: 'Weekly', value: 1 }];
