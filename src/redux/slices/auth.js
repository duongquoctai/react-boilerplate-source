import { createSlice } from '@reduxjs/toolkit';
import { authService } from '~/api/auth';
import {
  CHANGE_PASSWORD_ENDPOINT,
  GET_USER_INFO_ENDPOINT,
  LOGIN_ENDPOINT,
  UPDATE_PROFILE_ENDPOINT
} from '~/api/endpoint';
import apiSlice from './apiSlice';

// ----------------------------------------------------------------------

const initialState = {
  error: false,
  loginLoading: false,
  accessToken: localStorage.getItem('accessToken') || null
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // SET USER
    setUser(state, action) {
      state.accessToken = action.payload.token;
      localStorage.setItem('accessToken', action.payload.token);
    },
    // // START LOADING
    // toggleLoading(state, action) {
    //   const { status, keyLoading } = action.payload;
    //   state[keyLoading] = status ? status : !state[keyLoading];
    // },

    // // HAS ERROR
    // hasError(state, action) {
    //   const { error, keyLoading } = action.payload;
    //   state[keyLoading] = false;
    //   state.error = error;
    // },

    // // LOGIN SUCCESS
    // loginSuccess(state, action) {
    //   const { access_token, exp, username } = action.payload.data;
    //   state.accessToken = access_token;
    //   state.username = username;
    // },

    // LOGIN SUCCESS
    logout(state, action) {
      state.accessToken = null;
      localStorage.removeItem('accessToken');
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { logout, setUser } = slice.actions;

// ----------------------------------------------------------------------

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: LOGIN_ENDPOINT,
        method: 'POST',
        body: userInfo
      })
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: GET_USER_INFO_ENDPOINT,
        method: 'GET'
      })
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: CHANGE_PASSWORD_ENDPOINT,
        method: 'POST',
        body
      })
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: UPDATE_PROFILE_ENDPOINT,
        method: 'POST',
        body
      })
    })
  })
});

export const {
  useLoginMutation,
  useGetUserInfoQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation
} = authApi;
