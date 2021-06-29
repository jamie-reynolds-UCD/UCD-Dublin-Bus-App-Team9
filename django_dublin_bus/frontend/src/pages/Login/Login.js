import React, { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import {
  InputFieldContainer,
  VerticalSpacer,
  Underline,
} from "../SignUp/SignUp.elements";
import { Link } from "react-router-dom";

const Login = () => {
  const [LoginDetails, setLoginDetails] = useState({
    username: null,
    password: null,
    usernameerror: null,
    passworderror: null,
  });

  const LoginUser = () => {
    let usernameerror;
    let passworderror;
    let anyerror;

    if (LoginDetails.username == null) {
      usernameerror = "*Field is required*";
      anyerror = true;
    }

    if (LoginDetails.password == null) {
      passworderror = "*Field is required*";
      anyerror = true;
    }

    if (anyerror) {
      setLoginDetails({ ...LoginDetails, usernameerror, passworderror });
    }
  };

  const HandleChange = (ev) => {
    let key = ev.target.id;
    let value = ev.target.value;
    let new_val = {};
    new_val[key] = value;

    setLoginDetails({ ...LoginDetails, ...new_val });
  };

  console.log(LoginDetails);

  return (
    <>
      <VerticalSpacer />
      <Underline>
        <Typography style={{ color: "#4B59F7" }}>Login</Typography>
      </Underline>
      <InputFieldContainer>
        <VerticalSpacer />

        <TextField
          style={{ width: "100%" }}
          label={`Username ${
            LoginDetails.usernameerror ? LoginDetails.usernameerror : ""
          }`}
          error={LoginDetails.usernameerror !== null}
          id="username"
          onChange={HandleChange}
        ></TextField>
        <TextField
          style={{ width: "100%" }}
          label={`Password ${
            LoginDetails.passworderror ? LoginDetails.passworderror : ""
          }`}
          onChange={HandleChange}
          error={LoginDetails.passworderror !== null}
          id="password"
        ></TextField>

        <Button
          variant="contained"
          onClick={() => LoginUser()}
          variant="contained"
          style={{
            backgroundColor: "#4B59F7",
            color: "white",
            marginTop: "15px",
            width: "100%",
          }}
        >
          LOGIN
        </Button>
        <Typography style={{ marginTop: "10px", marginBottom: "10px" }}>
          OR
        </Typography>

        <Button component={Link} to="/signup">
          <Typography variant="caption" style={{ color: "#4B59F7" }}>
            Click here to sign-up
          </Typography>
        </Button>
      </InputFieldContainer>
    </>
  );
};

export default Login;
