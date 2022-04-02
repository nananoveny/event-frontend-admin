import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LinearProgress, IconButton, Box, Button } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './css/list-event.scss';
import { getListEventApi, deleteEventApi } from './event.api';
import { DataGrid } from '@mui/x-data-grid';
import IconBreadcrumbs from '../../components/shared/breadcrumb';
import FestivalIcon from '@mui/icons-material/Festival';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalConfirm from '../../components/shared/modalConfirm';
import { getUrlImg } from '../../utils/helper.util';
import { toast } from 'react-toastify';

const EventList = () => {
  const [rows, setRows] = useState([]);
  const [idItem, setIdItem] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const breadcrumb = useMemo(
    () => [
      {
        link: '/event',
        title: 'Event',
        icon: <FestivalIcon sx={{ mr: 0.5 }} fontSize='inherit' />,
        isActive: true,
      },
    ],
    [],
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
      {
        field: 'action',
        headerName: '',
        editable: false,
        width: 140,
        renderCell: (params) => (
          <>
            <Link to={{ pathname: `/event/${params.row._id}` }}>
              <IconButton aria-label='view' color='secondary'>
                <RemoveRedEyeIcon />
              </IconButton>
            </Link>

            <Link to={{ pathname: `/event/${params.row._id}/edit` }}>
              <IconButton aria-label='edit' color='secondary'>
                <EditIcon />
              </IconButton>
            </Link>
            {params.row.event.participantList.length === 0 && (
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
        const response = await deleteEventApi(id);
        if (response.status === 204) {
          const listEvents = rows.filter((row) => row._id !== id);
          setRows(listEvents);
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
    const getEvents = async () => {
      try {
        const res = await getListEventApi();
        setRows(castToRows(res.data.data));
      } catch (error) {}
    };
    getEvents();
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
              List Event
            </Box>
            <Link
              to={{ pathname: `/event/create` }}
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

export default EventList;
