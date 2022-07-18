import { apiConfig } from '../config';

export const OVERVIEW_ENDPOINT = '/overview';
export const OVERVIEW_GENERAL_ENDPOINT = `${OVERVIEW_ENDPOINT}/general`;
export const OVERVIEW_NEW_ENDPOINT = `${OVERVIEW_ENDPOINT}/new`;
export const OVERVIEW_CHURN_ENDPOINT = `${OVERVIEW_ENDPOINT}/churn`;
export const OVERVIEW_FILTER_ENDPOINT = `${OVERVIEW_ENDPOINT}/filters`;

export const LOGIN_ENDPOINT = '/auth/account/login';
export const CENTRAL_LOGOUT_ENDPOINT = `${apiConfig.baseUrl}/centralLogout`;
export const LOGOUT_ENDPOINT = `${apiConfig.baseUrl}/logout`;
export const GET_TOKEN_ENDPOINT = `${apiConfig.baseUrl}/getToken`;
export const VALIDATE_TOKEN_ENDPOINT = `${apiConfig.baseUrl}/validateToken`;

// PROJECT
export const CREATE_PROJECT_ENDPOINT = '/projects/create';
export const GET_ALL_PROJECT_ENDPOINT = '/projects/getAll';
export const GET_PROJECT_DETAILS_ENDPOINT = '/projects/get';

// DATASET
export const CREATE_DATASET_ENDPOINT = '/datasets/create';
export const GET_ALL_DATASET_ENDPOINT = '/datasets/getAll';
export const DATASET_UPLOAD_FILE_ENDPOINT = '/datasets/createByUploadFile';
export const DELETE_DATASET_ENDPOINT = '/datasets/delete';
export const CREATE_CONNECTION_ENDPOINT = '/connections/create';
export const GET_ALL_CONNECTION_ENDPOINT = '/connections/getAll';

// SCENARIO
export const TRAIN_MODEL_ENDPOINT = '/scenarios/train';
export const GET_MODELING_ENDPOINT = '/scenarios/getModeling';
export const DELETE_SCENARIO_ENDPOINT = '/scenarios/delete';
export const CREATE_SCENARIO_ENDPOINT = '/scenarios/create';
export const GET_ALL_SCENARIO_ENDPOINT = '/scenarios/getAll';
export const GET_MODELING_STATUS_ENDPOINT = '/scenarios/getModelingStatus';
export const POSTPROCESSING_CONFIG_ENDPOINT = '/scenarios/postProcess';

export const GET_MODEL_TYPE_ENDPOINT = '/configurations/getModelType';

// JOB
export const CREATE_JOB_ENDPOINT = '/jobs/create';
export const GET_ALL_JOB_ENDPOINT = '/jobs/getAll';
export const DELETE_JOB_ENDPOINT = '/jobs/delete';

// PROFILE
export const GET_USER_INFO_ENDPOINT = '/auth/account/getUserInfo';
export const CHANGE_PASSWORD_ENDPOINT = '/auth/account/changePassword';
export const UPDATE_PROFILE_ENDPOINT = '/auth/account/updateUserInfo';
