import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PAGE_LIMIT } from '~/views/access-permission/constant';

const BASE_URL = 'http://localhost:8000/';

export const accessPermissionApi = createApi({
	reducerPath: 'accessPermissionApi',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: builder => ({
		getOutgoingRequests: builder.query({
			query: (page = 1, limit = PAGE_LIMIT) =>
				`outgoingRequests?_page=${page}&_limit=${limit}`,
		}),
	}),
});

export const { useGetOutgoingRequestsQuery } = accessPermissionApi;
