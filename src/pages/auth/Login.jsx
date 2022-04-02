import React, { useState } from 'react';
import {
  TextField,
  Box,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { loginApi } from './auth.api';
import SendIcon from '@mui/icons-material/Send';

const theme = createTheme();

export default function Login() {
  const { handleSubmit, control } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }

      const response = await loginApi(data);
      localStorage.setItem('token', response.data.data.accessToken);
    } catch (error) {
      const msg = error.response.data.errors.message;
      if (msg) {
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            {error && <Alert severity='error'>{error}</Alert>}
            <Controller
              name='email'
              control={control}
              defaultValue=''
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: 'Invalid email address',
                },
              }}
            />

            <Controller
              name='password'
              control={control}
              defaultValue=''
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: 'Password required',
              }}
            />
            <LoadingButton
              type='submit'
              fullWidth
              variant='contained'
              loading={isLoading}
              loadingPosition='start'
              startIcon={<SendIcon />}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
