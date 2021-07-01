import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@material-ui/core";
import {
  InputFieldContainer,
  VerticalSpacer,
  Underline,
} from "../SignUp/SignUp.elements";
import { Link } from "react-router-dom";
import { LoginRequest } from "../../Api/ApiFunctions";

const Login = () => {
  const [LoginDetails, setLoginDetails] = useState({
    username: null,
    password: null,
    usernameerror: null,
    passworderror: null,
    auth_error: null,
  });

  const LoginUser = async () => {
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

    //if any errors identified here then don't even send request to backend
    if (anyerror) {
      setLoginDetails({ ...LoginDetails, usernameerror, passworderror });
      return;
    }

    //if no errors then try to login
    let response = await LoginRequest(LoginDetails);

    if (response.status != 200) {
      setLoginDetails({ ...LoginDetails, auth_error: response.data.error });
    } else {
      console.log("successful!");
      //on successful login do something here
    }
  };

  const HandleChange = (ev) => {
    let key = ev.target.id;
    let value = ev.target.value;
    let new_val = {};
    new_val[key] = value;

    setLoginDetails({ ...LoginDetails, ...new_val });
  };

  return (
    <>
      <VerticalSpacer />
      <Underline>
        <Typography style={{ color: "#4B59F7" }}>Login</Typography>
      </Underline>
      <InputFieldContainer>
        <VerticalSpacer />
        <Box
          style={{
            width: "100",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{ color: "red", marginTop: "10px", marginBottom: "10px" }}
          >
            {LoginDetails.auth_error == null ? "" : LoginDetails.auth_error}
          </Typography>
        </Box>

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
          type="password"
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
