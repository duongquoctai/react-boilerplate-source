import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { PATH_PAGE } from "~/routes/paths";
import eyeFill from "@iconify-icons/eva/eye-fill";
import eyeOffFill from "@iconify-icons/eva/eye-off-fill";
import PropTypes from "prop-types";
import {
  Box,
  Link,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

function LoginForm({ loading, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const loginValue = {
    email: "",
    password: "",
  };
  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .max(255)
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: loginValue,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        type="email"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        label="Email address"
      />
      <Box sx={{ mb: 3 }} />
      <TextField
        fullWidth
        type={showPassword ? "text" : "password"}
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        label="Password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword} edge="end">
                <Icon icon={showPassword ? eyeFill : eyeOffFill} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          variant="subtitle2"
          to={PATH_PAGE.auth.resetPassword}
          component={RouterLink}
        >
          Forgot password?
        </Link>
        <Box sx={{ typography: "body2", textAlign: "center" }}>
          Don’t have an account?&nbsp;
          <Link
            variant="subtitle2"
            to={PATH_PAGE.auth.register}
            component={RouterLink}
          >
            Get started
          </Link>
        </Box>
      </Box>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={loading}
      >
        Login
      </LoadingButton>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginForm;
