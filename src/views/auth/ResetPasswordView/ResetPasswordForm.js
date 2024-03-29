import React from "react";
import PropTypes from "prop-types";
import { Form, FormikProvider } from "formik";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  formik: PropTypes.object.isRequired,
};

// ----------------------------------------------------------------------

function ResetPasswordForm({ formik }) {
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          {...getFieldProps("email")}
          type="email"
          label="Email address"
        />
        <Box sx={{ mt: 3 }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            pending={isSubmitting}
          >
            Reset Password
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}

export default ResetPasswordForm;
