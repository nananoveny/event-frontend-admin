import './sidebar.scss';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StoreIcon from '@mui/icons-material/Store';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ModalConfirm from '../../components/shared/modalConfirm';

const Sidebar = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleLogout = () => {
    setIsShowModal(false);
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };
  return (
    <div className='sidebar'>
      <div className='top'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className='logo'>DASHBOARD</span>
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
