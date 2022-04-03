import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import {
  Box,
  CardContent,
  CardMedia,
  Typography,
  Card,
  Badge,
  LinearProgress,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import FestivalIcon from '@mui/icons-material/Festival';
import PersonIcon from '@mui/icons-material/Person';
import { getItemUserApi } from './user.api';
import { DataGrid } from '@mui/x-data-grid';
import { getUrlImg } from '../../utils/helper.util';
import IconBreadcrumbs from '../../components/shared/breadcrumb';
import { getListEventByUserIdApi } from '../event/event.api';

const DetailUser = () => {
  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const [user, setUser] = useState(null);

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'image',
        headerName: 'Thumbnail',
        width: 250,
        editable: false,
        renderCell: (params) => (
          <img
            src={getUrlImg(params.row.image)}
            width='100'
            height='80'
            alt={params.row.title}
          />
        ),
        flex: 1,
      },
      {
        field: 'title',
        headerName: 'Title',
        width: 150,
        editable: false,
        flex: 1,
      },
      {
        field: 'date',
        headerName: 'Date',
        editable: false,
        flex: 1,
      },
      {
        field: 'address',
        headerName: 'Address',
        editable: false,
        flex: 1,
      },
      {
        field: 'quantity',
        headerName: 'Quantity',
        editable: false,
        flex: 1,
      },
      {
        field: 'total',
        headerName: 'Total Registration',
        editable: false,
        flex: 1,
      },
    ],
    [],
  );

  const breadcrumb = useMemo(
    () => [
      {
        link: '/user',
        title: 'User',
        icon: <PersonIcon sx={{ mr: 0.5 }} fontSize='inherit' />,
      },
      {
        link: `/user/${id}`,
        title: 'Detail User',
        isActive: true,
      },
    ],
    [id],
  );

  const castToRows = (events) =>
    events.map((event, index) => ({
      _id: event._id,
      id: index + 1,
      image: event.image,
      title: event.title,
      date: new Date(event.date).toDateString(),
      address: event.address,
      quantity: event.quantity,
      total: event.participantList.length,
      action: '',
      event: event,
    }));

  useEffect(() => {
    (async () => {
      try {
        const response = await getItemUserApi(id);
        setUser(response.data.data);
        const res = await getListEventByUserIdApi(id);
        setRows(castToRows(res.data.data));
      } catch (error) {}
    })();
  }, [id]);

  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />
        <IconBreadcrumbs breadcrumbs={breadcrumb} />
        {user && (
          <>
            <Box sx={{ m: 2 }}>
              <Card sx={{ display: 'flex' }}>
                <CardMedia
                  component='img'
                  sx={{ width: 151 }}
                  image={
                    user.avatar
                      ? user.avatar
                      : 'https://www.w3schools.com/howto/img_avatar.png'
                  }
                  alt={user.lastName + ' ' + user.firstName}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography
                      component='div'
                      variant='h5'
                      sx={{
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {user.lastName + ' ' + user.firstName}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        sx={{ mr: 1, fontWeight: 700 }}
                      >
                        Email:
                      </Typography>
                      <Typography variant='body1' color='text.secondary'>
                        {user.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        sx={{ mr: 1, fontWeight: 700 }}
                      >
                        Gender:
                      </Typography>
                      <Typography variant='body1' color='text.secondary'>
                        {user.gender ? 'Male' : 'Female'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        sx={{ mr: 1, fontWeight: 700 }}
                      >
                        Address:
                      </Typography>
                      <Typography variant='body1' color='text.secondary'>
                        {user.address}
                      </Typography>
                    </Box>
                    {user.birthday && (
                      <Box sx={{ display: 'flex' }}>
                        <Typography
                          variant='body1'
                          color='text.secondary'
                          sx={{ mr: 1, fontWeight: 700 }}
                        >
                          Birthday:
                        </Typography>
                        <Typography variant='body1' color='text.secondary'>
                          {new Date(user.birthday).toDateString()}
                        </Typography>
                      </Box>
                    )}

                    <Box sx={{ display: 'flex' }}>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        sx={{ mr: 1, fontWeight: 700 }}
                      >
                        Role:
                      </Typography>
                      <Typography variant='body1' color='text.secondary'>
                        {user.gender ? 'Admin' : 'User'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Box>
            <Box
              sx={{
                my: 1,
                mx: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  p: 1,
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{ fontSize: '1.2rem', fontWeight: 650, color: '#5e5e5c' }}
                >
                  List Event
                </Box>
                <Badge
                  color='secondary'
                  sx={{ m: 1 }}
                  badgeContent={rows.length}
                >
                  <FestivalIcon sx={{ color: '#5e5e5c', fontSize: '1.2rem' }} />
                </Badge>
              </Box>
              <DataGrid
                rows={rows}
                autoHeight
                columns={columns}
                pageSize={12}
                rowsPerPageOptions={[5]}
                components={{
                  LoadingOverlay: LinearProgress,
                }}
                disableSelectionOnClick
              />
            </Box>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailUser;
