import { useState, useEffect, useMemo } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './css/create-event.scss';
import { TextField, Box, Grid, Paper } from '@mui/material';
import { LocalizationProvider, MobileDatePicker, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/modern/AdapterDateFns';
import { useForm, Controller } from 'react-hook-form';
import { createEventApi } from './event.api';
import UploadDropzone from '../../components/form/dropzone';
import { coverTimeToDate } from '../../utils/date.util';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import IconBreadcrumbs from '../../components/shared/breadcrumb';
import AddIcon from '@mui/icons-material/Add';
import FestivalIcon from '@mui/icons-material/Festival';

const CreateEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const { handleSubmit, control, reset } = useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === 'timeStart' || key === 'timeFinish') {
          formData.append(key, coverTimeToDate(data[key]));
        } else formData.append(key, data[key]);
      });
      formData.append('image', image);
      const response = await createEventApi(formData);
      if (response.data.statusCode === 200) {
        reset({});
        return navigate(`/event/${response.data.data._id}`, {
          replace: true,
        });
      }
    } catch (error) {
      if (error.response.data.statusCode === 422) {
        setErrors(error.response.data.errors);
      } else {
        toast.error('Opps. Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const breadcrumb = useMemo(
    () => [
      {
        link: '/event',
        title: 'Event',
        icon: <FestivalIcon sx={{ mr: 0.5 }} fontSize='inherit' />,
      },
      {
        link: `/event/create`,
        title: 'Create Event',
        isActive: true,
      },
    ],
    [],
  );

  useEffect(() => {
    errors.map((error) => {
      return toast.error(error.message);
    });
    return () => {
      setErrors([]);
    };
  }, [errors]);

  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <IconBreadcrumbs breadcrumbs={breadcrumb} />
        <Grid container spacing={1}>
          <Grid item xs={12} lg={5}>
            <Box sx={{ m: 1 }}>
              <UploadDropzone onChange={setImage} />
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center'>
              <Paper variant='outlined'>
                <Box
                  component='img'
                  sx={{
                    height: 300,
                    width: 500,
                  }}
                  alt='Image'
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : 'https://getuikit.com/v2/docs/images/placeholder_600x400.svg'
                  }
                />
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} lg={7}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                autoComplete='off'
              >
                <Controller
                  name='title'
                  control={control}
                  defaultValue=''
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label='Title'
                      name='title'
                      focused
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: 'Title is required' }}
                />

                <Controller
                  name='placeHost'
                  control={control}
                  defaultValue=''
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label='Place Host'
                      name='placeHost'
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: 'Place host is required' }}
                />
                <Controller
                  name='quantity'
                  control={control}
                  defaultValue=''
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label='Quantity'
                      name='quantity'
                      value={value}
                      type='number'
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{
                    required: 'Quantity is required',
                  }}
                />
              </Box>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                autoComplete='off'
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Controller
                    name='date'
                    control={control}
                    defaultValue=''
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <MobileDatePicker
                        label='Date'
                        name='date'
                        value={value}
                        inputFormat='dd/MM/yyyy'
                        onChange={onChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        )}
                      />
                    )}
                    rules={{ required: 'Date is required' }}
                  />
                  <Controller
                    name='timeStart'
                    control={control}
                    defaultValue=''
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TimePicker
                        label='Time start'
                        name='timeStart'
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        )}
                      />
                    )}
                    rules={{ required: 'Time start is required' }}
                  />
                  <Controller
                    name='timeFinish'
                    control={control}
                    defaultValue=''
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TimePicker
                        label='Time finish'
                        name='timeFinish'
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        )}
                      />
                    )}
                    rules={{ required: 'Time finish is required' }}
                  />
                </LocalizationProvider>
              </Box>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '79ch' },
                }}
                noValidate
                autoComplete='off'
              >
                <Controller
                  name='address'
                  control={control}
                  defaultValue=''
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label='Address'
                      name='address'
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: 'Address is required' }}
                />
                <Controller
                  name='description'
                  control={control}
                  defaultValue=''
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label='Description'
                      name='description'
                      multiline
                      rows={6}
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: 'Description is required' }}
                />
              </Box>
              <Box margin={1}>
                <LoadingButton
                  type='submit'
                  color='success'
                  variant='contained'
                  loadingPosition='start'
                  loading={isLoading}
                  startIcon={<AddIcon />}
                >
                  Create New
                </LoadingButton>
              </Box>
            </form>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CreateEvent;
