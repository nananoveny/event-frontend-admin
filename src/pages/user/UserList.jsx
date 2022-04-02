import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LinearProgress, IconButton, Box, Button, Avatar } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { getListUserApi, deleteUserApi } from './user.api';
import { DataGrid } from '@mui/x-data-grid';
import IconBreadcrumbs from '../../components/shared/breadcrumb';
import PersionIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalConfirm from '../../components/shared/modalConfirm';
import { toast } from 'react-toastify';

const UserList = () => {
  const [rows, setRows] = useState([]);
  const [idItem, setIdItem] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const breadcrumb = useMemo(
    () => [
      {
        link: '/user',
        title: 'User',
        icon: <PersionIcon sx={{ mr: 0.5 }} fontSize='inherit' />,
        isActive: true,
      },
    ],
    [],
  );

  const castToRows = (users) =>
    users.map((user, index) => ({
      _id: user._id,
      id: index + 1,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      address: user.address,
      email: user.email,
      user: user,
      action: '',
    }));

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
        field: 'firstName',
        headerName: 'Firstname',
        width: 150,
        editable: false,
        flex: 1,
      },
      {
        field: 'lastName',
        headerName: 'Lastname',
        editable: false,
        flex: 1,
      },
      {
        field: 'email',
        headerName: 'Email',
        editable: false,
        flex: 1,
      },
      {
        field: 'gender',
        headerName: 'Gender',
        editable: false,
        flex: 1,
        renderCell: (params) => <>{params.value ? 'Male' : 'Female'}</>,
      },
      {
        field: 'address',
        headerName: 'Address',
        editable: false,
        flex: 1,
      },
      {
        field: 'action',
        headerName: '',
        editable: false,
        width: 140,
        renderCell: (params) => (
          <>
            <Link to={{ pathname: `/user/${params.row._id}` }}>
              <IconButton aria-label='view' color='secondary'>
                <RemoveRedEyeIcon />
              </IconButton>
            </Link>

            <Link to={{ pathname: `/user/${params.row._id}/edit` }}>
              <IconButton aria-label='edit' color='secondary'>
                <EditIcon />
              </IconButton>
            </Link>
            {params.row.user.events.length === 0 && (
              <IconButton
                aria-label='delete'
                color='secondary'
                onClick={() => {
                  setIdItem(params.row._id);
                  setIsShowModal(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </>
        ),
      },
    ],
    [],
  );

  const handleDelete = async (id) => {
    setIsShowModal(false);
    if (id) {
      try {
        const response = await deleteUserApi(id);
        if (response.status === 204) {
          const listUsers = rows.filter((row) => row._id !== id);
          setRows(listUsers);
          toast.success('Delete successfully');
        }
      } catch (error) {
        toast.error('Opps something went wrong');
        console.log(error.response);
      }
    }
    setIdItem(null);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    setIdItem(null);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await getListUserApi();
        setRows(castToRows(res.data.data));
      } catch (error) {}
    };

    getUsers();
  }, []);

  return (
    <div className='list'>
      <Sidebar />
      <div className='listContainer'>
        <Navbar />
        <div className='datatable'>
          <IconBreadcrumbs breadcrumbs={breadcrumb} />
          <Box
            sx={{
              p: 2,
              m: 0.5,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box
              component='p'
              sx={{
                fontWeight: 600,
                color: '#5c5959',
                fontSize: '1.2rem',
              }}
            >
              List Users
            </Box>
            <Link
              to={{ pathname: `/user/create` }}
              style={{ textDecoration: 'none' }}
            >
              <Button variant='contained'>Add New</Button>
            </Link>
          </Box>
          <Box
            sx={{
              my: 1,
              mx: 2,
            }}
          >
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
        </div>
      </div>
      <ModalConfirm
        isOpen={isShowModal}
        onAgree={() => handleDelete(idItem)}
        onCancel={handleCloseModal}
        content='Once deleted, you will not be able to recover this data!'
        title='Do you want to delete?'
      />
    </div>
  );
};

export default UserList;
