import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import EventList from './pages/event/EventList';
import CreateEvent from './pages/event/CreateEvent';
import EditEvent from './pages/event/EditEvent';
import EventDetail from './pages/event/EventDetail';
import UserList from './pages/user/UserList';
import CreateUser from './pages/user/CreateUser';
import EditUser from './pages/user/EditUser';
import DetailUser from './pages/user/DetailUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/shared/privateRoute';
import isValidToken from './utils/jwt.util';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route
              index
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path='login'
              element={isValidToken() ? <Navigate to='/' /> : <Login />}
            />
            <Route path='user'>
              <Route
                index
                element={
                  <PrivateRoute>
                    <UserList />
                  </PrivateRoute>
                }
              />
              <Route
                path=':id'
                element={
                  <PrivateRoute>
                    <DetailUser />
                  </PrivateRoute>
                }
              />
              <Route
                path='create'
                element={
                  <PrivateRoute>
                    <CreateUser />
                  </PrivateRoute>
                }
              />
              <Route
                path=':id/edit'
                element={
                  <PrivateRoute>
                    <EditUser />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path='event'>
              <Route
                index
                element={
                  <PrivateRoute>
                    <EventList />
                  </PrivateRoute>
                }
              />
              <Route
                path=':id'
                element={
                  <PrivateRoute>
                    <EventDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path='create'
                element={
                  <PrivateRoute>
                    <CreateEvent />
                  </PrivateRoute>
                }
              />
              <Route
                path=':id/edit'
                element={
                  <PrivateRoute>
                    <EditEvent />
                  </PrivateRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
