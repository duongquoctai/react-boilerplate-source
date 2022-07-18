// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { apiConfig } from '~/config';
import { logout } from './auth';

const baseQuery = fetchBaseQuery({
  baseUrl: apiConfig.apiUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set('authorization', token);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

const apiSlice = createApi({
  reducerPath: 'api',
  refetchOnReconnect: true,
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({})
});

export default apiSlice;
