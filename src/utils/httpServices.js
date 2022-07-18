import { apiConfig } from '../config';
import { getLocalStorage } from './localStorage';
import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: apiConfig.apiUrl
});

const getToken = () => {
  const accessToken = getLocalStorage('accessToken');
  if (accessToken) {
    return `Bearer ${accessToken}`;
  }
  return null;
};

axiosInstance.interceptors.request.use(
  config => {
    // Do something before request is sent
    config.headers['Authorization'] = getToken();
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.log('error', error);
    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    );
  }
);

export default axiosInstance;

export const requestAll = (requests, keys) => {
  return Promise.all(requests)
    .then(values => {
      return keys.map((k, index) => {
        return {
          [k]: values[index]
        };
      });
    })
    .catch(err => {
      console.log(err);
    });
};
