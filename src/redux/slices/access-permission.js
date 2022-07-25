import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8000/';

export const accessPermissionApi = createApi({
	reducerPath: 'accessPermissionApi',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: builder => ({
		getOutgoingRequests: builder.query({
			query: () => 'urp/outgoing-requests',
		}),
		addOutgoingRequest: builder.mutation({
			query: form => ({
				url: 'urp/outgoing-requests',
				method: 'POST',
				body: form,
			}),
		}),
	}),
});

export const {
	useGetOutgoingRequestsQuery,
	useLazyGetOutgoingRequestsQuery,
	useAddOutgoingRequestMutation,
} = accessPermissionApi;
