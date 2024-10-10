import { getToken, removeToken } from '../utils/cookiesFunc';
import { API as customAxios } from './axiosUrl';

const requestHandler = (request: any) => {
  const tokenObj = getToken();
  if (tokenObj && tokenObj.token) {
    request.headers.Authorization = tokenObj.token;
  }
  return request;
};

const responseHandler = (response: any) => {
  if (response.status === 401) {
    removeToken();
  }
  return response;
};

const errorHandler = (error: Error) => {
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;
