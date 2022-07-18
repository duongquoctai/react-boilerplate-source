import React from 'react';
import Section from './Section';
import { useDispatch, useSelector } from 'react-redux';
import Page from '~/components/Page';
import LoginForm from './LoginForm';
import { makeStyles } from '@mui/styles';
import { toast } from 'react-toastify';
import { setUser, useLoginMutation } from '~/redux/slices/auth';
import { Box, Hidden, Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    },
    background: 'rgb(249, 247, 246)'
  },
  header: {
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(7, 5, 0, 7)
    }
  },
  content: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
  },
  divider: {
    margin: theme.spacing(3, 0)
  }
}));

// ----------------------------------------------------------------------

function LoginView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [
    login,
    { isLoading, data, error, isSuccess, status }
  ] = useLoginMutation();
  const { loginLoading, accessToken } = useSelector((state) => state.auth);

  // Submit login
  const handleSubmit = (values) => {
    dispatch(login(values));
  };

  // Check login
  if (status === 'fulfilled' && data && data.code === 200) {
    dispatch(setUser(data));
  }
  if ((data && data.code !== 200) || error) {
    toast.error('Login fail!');
  }

  return (
    <Page title="DMC | Login" className={classes.root}>
      <Hidden mdDown>
        <Section />
      </Hidden>

      <Container>
        <div className={classes.content}>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to Recommendation Platform
            </Typography>
            <Typography color="textSecondary">Click to the login</Typography>
          </Box>
          <LoginForm loading={isLoading} onSubmit={handleSubmit} />
        </div>
      </Container>
    </Page>
  );
}

export default LoginView;
