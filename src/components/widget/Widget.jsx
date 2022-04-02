import { useEffect, useState } from 'react';
import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { getListEventApi } from '../../pages/event/event.api';
import { getListUserApi } from '../../pages/user/user.api';

const Widget = ({ type }) => {
  const [totalUser, setTotalUser] = useState(0);
  const [totalEvent, setTotalEvent] = useState(0);

  useEffect(() => {
    (async () => {
      const responseUser = await getListUserApi();
      const responseEvent = await getListEventApi();
      setTotalUser(responseUser.data.data.length);
      setTotalEvent(responseEvent.data.data.length);
    })();
  }, []);

  let data;

  switch (type) {
    case 'user':
      data = {
        title: 'USERS',
        isUser: true,
        link: 'See all users',
        icon: (
          <PersonOutlinedIcon
            className='icon'
            style={{
              color: 'crimson',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
            }}
          />
        ),
      };
      break;
    case 'order':
      data = {
        title: 'EVENTS',
        isMoney: false,
        link: 'View all orders',
        icon: (
          <ShoppingCartOutlinedIcon
            className='icon'
            style={{
              backgroundColor: 'rgba(218, 165, 32, 0.2)',
              color: 'goldenrod',
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{data.title}</span>
        <span className='counter'>{data.isUser ? totalUser : totalEvent}</span>
        <span className='link'>{data.link}</span>
      </div>
      <div className='right'>
        <div className='percentage positive'>
          <KeyboardArrowUpIcon />
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
