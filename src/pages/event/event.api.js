import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from '../../utils/http.util';

const path = 'event';

export const getListEventApi = () => getRequest(path);

export const getItemEventApi = (id) => getRequest(`${path}/${id}`);

export const getListEventByUserIdApi = (id) => getRequest(`${path}/user/${id}`);

export const createEventApi = (payload) => {
  return postRequest(path, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getListUserApi = (id) => getRequest(`${path}/${id}/users`);

export const updateEventApi = (id, payload) =>
  putRequest(`${path}/${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const deleteEventApi = (id) => deleteRequest(`${path}/${id}`);
