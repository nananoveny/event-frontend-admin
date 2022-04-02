import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import './style/dark.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { useSelector } from 'react-redux';
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

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
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
              element={user ? <Navigate to='/' /> : <Login />}
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
    </div>
    // <Table/>
  );
}

export default App;
