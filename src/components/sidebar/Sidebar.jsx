import './sidebar.scss';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StoreIcon from '@mui/icons-material/Store';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { useContext, useState } from 'react';
import ModalConfirm from '../../components/shared/modalConfirm';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  const { dispatch } = useContext(DarkModeContext);

  const handleLogout = () => {
    setIsShowModal(false);
    localStorage.clear();
    navigate('/login');
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };
  return (
    <div className='sidebar'>
      <div className='top'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className='logo'>Seventevents</span>
        </Link>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <Link to='/user' style={{ textDecoration: 'none' }}>
            <li>
              <PersonOutlineIcon className='icon' />
              <span>Users</span>
            </li>
          </Link>
          <Link to='/event' style={{ textDecoration: 'none' }}>
            <li>
              <StoreIcon className='icon' />
              <span>Events</span>
            </li>
          </Link>
          <li
            onClick={() => {
              setIsShowModal(true);
            }}
          >
            <ExitToAppIcon className='icon' />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className='bottom'>
        <div
          className='colorOption'
          onClick={() => dispatch({ type: 'LIGHT' })}
        ></div>
        <div
          className='colorOption'
          onClick={() => dispatch({ type: 'DARK' })}
        ></div>
      </div>
      <ModalConfirm
        isOpen={isShowModal}
        onAgree={handleLogout}
        onCancel={handleCloseModal}
        content='Are you sure you want to log out?'
        title='Confirm logout'
      />
    </div>
  );
};

export default Sidebar;
