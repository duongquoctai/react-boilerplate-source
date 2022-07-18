import { createSlice } from '@reduxjs/toolkit';
import {
  CREATE_CONNECTION_ENDPOINT,
  GET_ALL_CONNECTION_ENDPOINT
} from '~/api/endpoint';
import apiSlice from './apiSlice';

// ----------------------------------------------------------------------

const initialState = {
  connections: [],
  isLoading: false
};

const slice = createSlice({
  name: 'connection',
  initialState,
  reducers: {}
});

// Reducer
export default slice.reducer;

// Actions
// export const { logout, setUser } = slice.actions;

// ----------------------------------------------------------------------

const connectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createConnection: builder.mutation({
      query: (cons) => ({
        url: CREATE_CONNECTION_ENDPOINT,
        method: 'POST',
        body: cons
      })
    }),
    getAllConnection: builder.query({
      query: (projectId) => ({
        url: `${GET_ALL_CONNECTION_ENDPOINT}/${projectId}`,
        method: 'GET'
      })
    })
  })
});

export const {
  useCreateConnectionMutation,
  useGetAllConnectionQuery
} = connectionApi;
