import { useState, useEffect, useMemo } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import {
  TextField,
  Button,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/modern/AdapterDateFns';
import { useForm, Controller } from 'react-hook-form';
import { getItemUserApi, updateUserApi } from './user.api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import IconBreadcrumbs from '../../components/shared/breadcrumb';
import PersonIcon from '@mui/icons-material/Person';

const EditUser = () => {
  const { id } = useParams();
  const { handleSubmit, control, reset } = useForm();
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await getItemUserApi(id);
        const userData = response.data.data;
        setUser(userData);
        reset({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          address: userData.address,
          birthday: userData.birthday,
          isAdmin: userData.isAdmin,
          gender: userData.gender,
        });
      } catch (error) {}
    })();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const response = await updateUserApi(id, {
        ...data,
        isAdmin: data.isAdmin === 'admin',
        gender: data.gender === 'male',
      });
      if (response.data.statusCode === 200) {
        toast.success('Update successfully');
      }
    } catch (error) {
      if (error.response.data.statusCode === 422) {
        setErrors(error.response.data.errors);
      } else {
        toast.error('Opps. Something went wrong');
        console.log(error.response);
      }
    }
  };

  const breadcrumb = useMemo(
    () => [
      {
        link: '/user',
        title: 'User',
        icon: <PersonIcon sx={{ mr: 0.5 }} fontSize='inherit' />,
      },
      {
        link: `/user/create`,
        title: 'Create User',
        isActive: true,
      },
    ],
    [],
  );

  useEffect(() => {
    errors.map((error) => {
      return toast.error(error.message);
    });
    // setErrors([]);
  }, [errors]);

  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <IconBreadcrumbs breadcrumbs={breadcrumb} />
        <Grid
          container
          spacing={1}
          justifyContent='center'
          sx={{
            p: 2,
          }}
        >
          <Grid item>
            <Box
              component='p'
              sx={{
                p: 2,
                fontWeight: 500,
                fontSize: '1.2rem',
              }}
            >
              Create User
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                autoComplete='off'
              >
                <Controller
                  name='firstName'
                  control={control}
                  defaultValue=''
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label='Firstname'
                      name='firstName'
                      focused
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: 'Firstname is required' }}
                />

                <Controller
                  name='lastName'
                  control={control}
                  defaultValue=''
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label='Lastname'
                      name='lastName'
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: 'Lastname is required' }}
                />
              </Box>
              {/* <Box
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                autoComplete='off'
              >
                <Controller
                  name='password'
                  control={control}
                  defaultValue=''
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label='Password'
                      name='password'
                      type='password'
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: 'Password is required' }}
                />

                <Controller
                  name='repassword'
                  control={control}
                  defaultValue=''
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label='Confirm Password'
                      name='repassword'
                      value={value}
                      type='password'
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: 'Confirm password is required' }}
                />
              </Box> */}
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                autoComplete='off'
              >
                <Controller
                  name='email'
                  control={control}
                  defaultValue=''
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label='Email'
                      name='email'
                      type='email'
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: 'Email is required' }}
                />

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
              </Box>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                autoComplete='off'
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Controller
                    name='birthday'
                    control={control}
                    defaultValue=''
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <MobileDatePicker
                        label='Birthday'
                        name='birthday'
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
                </LocalizationProvider>
                <Controller
                  name='phoneNumber'
                  control={control}
                  defaultValue=''
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label='Phone'
                      name='phoneNumber'
                      value={value}
                      type='tel'
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: 'Phone number is required' }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  m: 1,
                }}
                noValidate
                autoComplete='off'
              >
                <Controller
                  name='gender'
                  control={control}
                  defaultValue=''
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormControl>
                      <InputLabel id='labelGender'>Gender</InputLabel>
                      <Select
                        sx={{
                          width: '54ch',
                        }}
                        labelId='labelGender'
                        name='gender'
                        value={value ? 'male' : 'female'}
                        onChange={onChange}
                        error={!!error}
                      >
                        <MenuItem value='male'>Male</MenuItem>
                        <MenuItem value='female'>Female</MenuItem>
                      </Select>
                      {error ? (
                        <FormHelperText sx={{ color: 'red' }}>
                          {error.message}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  )}
                  // rules={{ required: 'Gender is required' }}
                />
                <Controller
                  name='isAdmin'
                  control={control}
                  defaultValue=''
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormControl>
                      <InputLabel
                        sx={{
                          ml: 2,
                        }}
                        id='labelRole'
                      >
                        Role
                      </InputLabel>
                      <Select
                        sx={{
                          ml: 2,
                          width: '54ch',
                        }}
                        labelId='labelRole'
                        value={value ? 'admin' : 'user'}
                        label='Role'
                        onChange={onChange}
                        error={!!error}
                      >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='user'>User</MenuItem>
                      </Select>
                      {error ? (
                        <FormHelperText sx={{ color: 'red' }}>
                          {error.message}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  )}
                  // rules={{ required: 'Role is required' }}
                />
              </Box>
              <Box
                sx={{
                  mx: 1,
                  my: 2,
                }}
              >
                <Button type='submit' variant='contained' color='success'>
                  Update
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default EditUser;
