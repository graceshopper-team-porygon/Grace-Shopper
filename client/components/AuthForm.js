import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { CssBaseline, Container, Box, Avatar, Typography, TextField, Button } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar id="avatar">
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" id="log-title">
          {displayName}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} name={name} >
          <TextField
            margin="normal"
            required
            fullWidth
            // variant="outlined"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            id="sign-in-btn"
          >
            {displayName}
          </Button>
          {error && error.response && <div> {error.response.data} </div>}
        </Box>
      </Box>
    </Container>
  );
};

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
