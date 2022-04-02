import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import './css/detail-event.scss';
import { Avatar, Badge, Box, Modal } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getListUserApi } from './event.api';
import PersonIcon from '@mui/icons-material/Person';
import FestivalIcon from '@mui/icons-material/Festival';
import IconBreadcrumbs from '../../components/shared/breadcrumb';
import { getItemEventApi } from './event.api';
import { getUrlImg } from '../../utils/helper.util';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const EventDetail = () => {
  const [isShowQR, setIsShowQR] = useState(false);
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '1px solid #f1f1f1',
    boxShadow: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: 4,
  };

  const handleShowQR = () => setIsShowQR(true);
  const handleCloseQR = () => setIsShowQR(false);

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
          <Card sx={{ m: 2 }}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='350'
                sx={{
                  objectFit: 'fill',
                }}
                image={getUrlImg(event.image)}
                alt='green iguana'
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h5'
                  sx={{ fontSize: '2rem', fontWeight: 'bold' }}
                  component='div'
                >
                  {event.title}
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{ mr: 1, fontWeight: 700 }}
                  >
                    Address:
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    {event.address}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{ mr: 1, fontWeight: 700 }}
                  >
                    Place:
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    {event.placeHost}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{ mr: 1, fontWeight: 700 }}
                  >
                    Date:
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    {new Date(event.date).toDateString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex' }}>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{ mr: 1, fontWeight: 700 }}
                  >
                    Time Start:
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    {new Date(event.timeStart).toLocaleTimeString([], {
                      timeStyle: 'short',
                    })}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{ mr: 1, fontWeight: 700 }}
                  >
                    Time Finish:
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    {new Date(event.timeFinish).toLocaleTimeString([], {
                      timeStyle: 'short',
                    })}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{ mr: 1, fontWeight: 700 }}
                  >
                    Quantity
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    {event.quantity}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{ mr: 1, fontWeight: 700 }}
                  >
                    Total Registration:
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    {event.participantList.length}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
            <CardActions
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button color='primary' onClick={handleShowQR}>
                Show QR Code
              </Button>
            </CardActions>
          </Card>
        )}
        <Box sx={{ m: 2 }}>
          <Box
            sx={{
              display: 'flex',
              p: 1,
              alignItems: 'center',
            }}
          >
            <Box sx={{ fontSize: '1.2rem', fontWeight: 650 }}>
              List Participant
            </Box>
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
            rowsPerPageOptions={[5, 10, 15, 20]}
            disableSelectionOnClick
          />
        </Box>
        <Modal
          open={isShowQR}
          onClose={handleCloseQR}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <img
              src={event.qrImage}
              alt={event.title}
              width='300px'
              height='50%'
            />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default EventDetail;
