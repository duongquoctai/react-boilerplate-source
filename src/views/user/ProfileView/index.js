import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import Page from '~/components/Page';
import {
  useChangePasswordMutation,
  useGetUserInfoQuery,
  useUpdateProfileMutation
} from '~/redux/slices/auth';

const TabPanel = ({ children, value, index }) => {
  return (
    <Box role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </Box>
  );
};

const Input = styled('input')({
  display: 'none'
});

export default function Scenario() {
  const [tabValue, setTabValue] = useState(0);

  const { data: profile } = useGetUserInfoQuery();
  const [
    changePassword,
    { isError: isChangePasswordError }
  ] = useChangePasswordMutation();
  const [
    updateProfile,
    { isError: isUpdateProfileError }
  ] = useUpdateProfileMutation();

  const profileFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      apiKey: '',
      avatar: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      const response = await updateProfile({
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address
      });
      if (isUpdateProfileError) toast('Failed!');
      else toast('Successful!');
    }
  });

  const changePasswordFormik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: yup.object({
      oldPassword: yup
        .string()
        .max(255, 'Must be less than 255 characters')
        .required('Required'),
      newPassword: yup
        .string()
        .max(255, 'Must be less than 255 characters')
        .required('Required'),
      confirmPassword: yup
        .string()
        .max(255, 'Must be less than 255 characters')
        .required('Required')
    }),
    onSubmit: async (values) => {
      const response = await changePassword(values);
      if (isChangePasswordError) toast('Failed!');
      else if (response?.data?.code === 202) toast('Wrong password!');
      else toast('Successful!');
      changePasswordFormik.resetForm();
    }
  });

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    profileFormik.setFieldValue('name', profile?.data?.name);
    profileFormik.setFieldValue('email', profile?.data?.email);
    profileFormik.setFieldValue('phone', profile?.data?.phone);
    profileFormik.setFieldValue('address', profile?.data?.address);
    profileFormik.setFieldValue('apiKey', profile?.data?.apiKey);
  }, [profile]);

  return (
    <Page title="Scenario">
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label="General"
                  icon={<AccountBoxIcon />}
                  iconPosition="start"
                />
                <Tab
                  label="Change password"
                  icon={<LockResetIcon />}
                  iconPosition="start"
                />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <form onSubmit={profileFormik.handleSubmit}>
                <Grid container spacing={2} p={2}>
                  <Grid item md={8} sm={12}>
                    <Grid container spacing={2}>
                      <Grid item sm={12}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          label="Full name *"
                          name="name"
                          value={profileFormik.values.name}
                          onChange={profileFormik.handleChange}
                          error={
                            profileFormik.touched.name &&
                            Boolean(profileFormik.errors.name)
                          }
                          helperText={
                            profileFormik.touched.name &&
                            profileFormik.errors.name
                          }
                        />
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <TextField
                          variant="outlined"
                          disabled
                          fullWidth
                          name="email"
                          label="Email *"
                          value={profileFormik.values.email}
                        />
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          label="Phone"
                          name="phone"
                          value={profileFormik.values.phone}
                          onChange={profileFormik.handleChange}
                        />
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          label="Address"
                          name="address"
                          value={profileFormik.values.address}
                          onChange={profileFormik.handleChange}
                        />
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <TextField
                          variant="outlined"
                          disabled
                          fullWidth
                          name="apiKey"
                          label="API Key"
                          value={profileFormik.values.apiKey}
                        />
                      </Grid>
                      <Grid item sm={12} textAlign="right">
                        <Button variant="contained" type="submit">
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={4} sm={12}>
                    <Stack spacing={2} textAlign="center">
                      <Divider />
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                        width={200}
                        alt="Avatar"
                        style={{
                          margin: '1rem auto'
                        }}
                      />
                      <Typography variant="body2" fontSize={12}>
                        ALLOW *.JPEG, *.JPG, *.PNG, *.GIF MAX SIZE OF 3.1 MB
                      </Typography>
                      <Divider />
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          type="file"
                          value={profileFormik.values.avatar}
                          onChange={(e) => {
                            profileFormik.setFieldValue(
                              'avatar',
                              // todo: de tam thoi
                              //   e.target.files[0]
                              e.target.value
                            );
                          }}
                        />
                        <Button variant="contained" component="span">
                          Upload
                        </Button>
                      </label>
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <form onSubmit={changePasswordFormik.handleSubmit}>
                <Stack spacing={2} p={2}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="password"
                    label="Old password"
                    name="oldPassword"
                    value={changePasswordFormik.values.oldPassword}
                    onChange={changePasswordFormik.handleChange}
                    error={
                      changePasswordFormik.touched.oldPassword &&
                      Boolean(changePasswordFormik.errors.oldPassword)
                    }
                    helperText={
                      changePasswordFormik.touched.oldPassword &&
                      changePasswordFormik.errors.oldPassword
                    }
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="password"
                    label="New password"
                    name="newPassword"
                    value={changePasswordFormik.values.newPassword}
                    onChange={changePasswordFormik.handleChange}
                    error={
                      changePasswordFormik.touched.newPassword &&
                      Boolean(changePasswordFormik.errors.newPassword)
                    }
                    helperText={
                      changePasswordFormik.touched.newPassword &&
                      changePasswordFormik.errors.newPassword
                    }
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="password"
                    label="Confirm password"
                    name="confirmPassword"
                    value={changePasswordFormik.values.confirmPassword}
                    onChange={changePasswordFormik.handleChange}
                    error={
                      changePasswordFormik.touched.confirmPassword &&
                      Boolean(changePasswordFormik.errors.confirmPassword)
                    }
                    helperText={
                      changePasswordFormik.touched.confirmPassword &&
                      changePasswordFormik.errors.confirmPassword
                    }
                  />
                  <Box textAlign="right">
                    <Button variant="contained" type="submit">
                      Save
                    </Button>
                  </Box>
                </Stack>
              </form>
            </TabPanel>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
