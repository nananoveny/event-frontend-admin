import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from '../../utils/http.util';

const path = 'user';

export const getListUserApi = () => getRequest(path);

export const getItemUserApi = (id) => getRequest(`${path}/${id}`);

export const createUserApi = (payload) => {
  return postRequest(path, payload);
};

export const updateUserApi = (id, payload) =>
  putRequest(`${path}/${id}`, payload);

export const deleteUserApi = (id) => deleteRequest(`${path}/${id}`);
