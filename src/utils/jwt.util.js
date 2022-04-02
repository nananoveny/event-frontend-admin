import jwt_decode from 'jwt-decode';

const isValidToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return true;
  const { iat } = jwt_decode(token);
  return iat * 1000 < Date.now();
};

export default isValidToken;
