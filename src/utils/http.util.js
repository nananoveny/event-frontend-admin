import axios from 'axios';

const axiosConfig = {
  baseURL: 'https://events-api-nhatan.herokuapp.com',
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  timout: 500,
};

const Http = axios.create(axiosConfig);

const baseURL = 'https://events-api-nhatan.herokuapp.com';

export function getRequest(url, option = {}) {
  return Http.get(`${baseURL}/${url}`, option);
}

export function postRequest(url, payload, option = {}) {
  return Http.post(`${baseURL}/${url}`, payload, option);
}

export function patchRequest(url, payload, option = {}) {
  return Http.patch(`${baseURL}/${url}`, payload, option);
}

export function putRequest(url, payload, option = {}) {
  return Http.put(`${baseURL}/${url}`, payload, option);
}

export function deleteRequest(url, option = {}) {
  return Http.delete(`${baseURL}/${url}`, option);
}

export default Http;
