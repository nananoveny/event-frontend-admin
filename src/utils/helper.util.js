export const getUrlImg = (path) => {
  if (path && path.includes('public/files')) {
    return 'https://events-api-nhatan.herokuapp.com/' + path;
  }
  return path;
};
