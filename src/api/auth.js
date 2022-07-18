import axios from '../utils/httpServices';

import {
  LOGIN_ENDPOINT,
  GET_TOKEN_ENDPOINT,
  CENTRAL_LOGOUT_ENDPOINT,
  VALIDATE_TOKEN_ENDPOINT
} from './endpoint';

/**
 * LOGIN
 */
export const authService = {
  _login: data => {
    const endpoint = LOGIN_ENDPOINT;
    return axios.post(endpoint, data);
  },
  _centralLogout: () => {
    const endpoint = CENTRAL_LOGOUT_ENDPOINT;
    return fetch(endpoint).then(response => response.json());
  },
  _getToken: () => {
    const endpoint = GET_TOKEN_ENDPOINT;
    return fetch(endpoint).then(response => response.json());
  },
  _validateToken: ({ token }) => {
    const endpoint = VALIDATE_TOKEN_ENDPOINT;
    return fetch(`${endpoint}?acToken=${token}`).then(response =>
      response.json()
    );
  }
};
