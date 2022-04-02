import { Navigate, useLocation } from 'react-router-dom';
import isValidToken from '../../utils/jwt.util';

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  if (!isValidToken()) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
