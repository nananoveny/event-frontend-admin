import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import './css/detail-event.scss';
import { Avatar, Badge, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getListUserApi } from './event.api';
import PersonIcon from '@mui/icons-material/Person';
import FestivalIcon from '@mui/icons-material/Festival';
import IconBreadcrumbs from '../../components/shared/breadcrumb';
import { getItemEventApi } from './event.api';
import { getUrlImg } from '../../utils/helper.util';

const EventDetail = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await getItemEventApi(id);
        setEvent(response.data.data);
      } catch (error) {}
    })();
  }, [id]);

  const breadcrumb = useMemo(
    () => [
      {
        link: '/event',
        title: 'Event',
        icon: <FestivalIcon sx={{ mr: 0.5 }} fontSize='inherit' />,
      },
      {
        link: `/event/${id}`,
        title: 'Detail Event',
        isActive: true,
      },
    ],
    [id],
  );

  const castToRows = (users) =>
    users.map((user, index) => ({
      id: index + 1,
      _id: user._id,
      fullName: `${user.lastName} ${user.firstName}`,
      gender: user.gender,
      email: user.email,
      avatar: user.avatar
        ? user.avatar
        : 'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar-600x600.png',
      address: user.address,
    }));

  const [eventUsers, setEventUsers] = useState([]);

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'avatar',
        headerName: 'Avatar',
        width: 100,
        align: 'center',
        editable: false,
        renderCell: (params) => (
          <Avatar
            alt={params.firstName}
            src={params.value}
            sx={{ width: 48, height: 48 }}
          />
        ),
      },
      {
        field: 'fullName',
        headerName: 'Full Name',
        editable: false,
        flex: 1,
      },
      {
        field: 'gender',
        headerName: 'Gender',
        editable: false,
        renderCell: (params) => <>{params.value ? 'Male' : 'Female'}</>,
        flex: 1,
      },
      {
        field: 'address',
        headerName: 'Address',
        editable: false,
        flex: 1,
      },
      {
        field: 'email',
        headerName: 'Email',
        editable: false,
        flex: 1,
      },
    ],
    [],
  );
  useEffect(() => {
    const getEventUsers = async () => {
      try {
        const res = await getListUserApi(id);
        setEventUsers(castToRows(res.data.data));
      } catch (error) {
        console.log(error.response);
      }
    };
    getEventUsers();
  }, [id]);

  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />
        <IconBreadcrumbs breadcrumbs={breadcrumb} />
        {event && (
          <>
            <div className='top'>
              <div className='left'>
                <div className='editButton'>Edit</div>
                <h1 className='title'>Event Information</h1>
                <div className='item'>
                  <img
                    src={event.qrImage}
                    alt=''
                    className=''
                    width='300px'
                    height='50%'
                  />
                  <div className='details'>
                    <h1 className='itemTitle'>{event.title}</h1>
                    <div className='detailItem'>
                      <span className='itemKey'>Address:</span>
                      <span className='itemValue'>{event.address}</span>
                    </div>
                    <div className='detailItem'>
                      <span className='itemKey'>Place:</span>
                      <span className='itemValue'>{event.placeHost}</span>
                    </div>
                    <div className='detailItem'>
                      <span className='itemKey'>Date:</span>
                      <span className='itemValue'>
                        {new Date(event.date).toDateString()}
                      </span>
                    </div>
                    <div className='detailItem'>
                      <span className='itemKey'>Time Start:</span>
                      <span className='itemValue'>
                        {new Date(event.timeStart).toLocaleTimeString([], {
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                    <div className='detailItem'>
                      <span className='itemKey'>Time Finish:</span>
                      <span className='itemValue'>
                        {new Date(event.timeFinish).toLocaleTimeString([], {
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                    <div className='detailItem'>
                      <span className='itemKey'>Quantity:</span>
                      <span className='itemValue'>{event.quantity}</span>
                    </div>
                    <div className='detailItem'>
                      <span className='itemKey'>Total Registration:</span>
                      <span className='itemValue'>
                        {event.participantList.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='right'>
                <img
                  src={getUrlImg(event.image)}
                  alt=''
                  className=''
                  width='100%'
                  height='100%'
                />
              </div>
            </div>
            <div className='bottom'>
              <Box
                sx={{
                  display: 'flex',
                  p: 1,
                  alignItems: 'center',
                }}
              >
                <p>List Participant</p>
                <Badge
                  color='secondary'
                  sx={{ m: 1 }}
                  badgeContent={eventUsers.length}
                >
                  <PersonIcon />
                </Badge>
              </Box>
              <DataGrid
                rows={eventUsers}
                autoHeight
                columns={columns}
                pageSize={12}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
