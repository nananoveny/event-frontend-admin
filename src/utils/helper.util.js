import configData from '../config.json';

export const getUrlImg = (path) => {
  if (path && path.startsWith('public/files')) {
    return new URL(path, configData.API_ENDPOINT);
  }
  return path;
};
