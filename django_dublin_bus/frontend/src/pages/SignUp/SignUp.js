import React, { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import {
  InputFieldContainer,
  VerticalSpacer,
  Underline,
} from "./SignUp.elements";
import { Link } from "react-router-dom";
import { SignUpRequest } from "../../Api/ApiFunctions";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [SignUpDetails, setSignUpDetails] = useState({
    email: null,
    username: null,
    password: null,
    confirmpassword: null,
    emailerror: null,
    usernameerror: null,
    passworderror: null,
    confirmpassworderror: null,
  });

  const HandleSignUp = async () => {
    let response = await SignUpRequest(SignUpDetails);

    if (response.status != 200) {
      setSignUpDetails({ ...SignUpDetails, ...response.data.errors });
    } else {
      history.push({ pathname: "/login", state: { initial_login: true } });
    }
  };

  const HandleChange = (ev) => {
    let key = ev.target.id;
    let value = ev.target.value;
    let new_val = {};
    new_val[key] = value;

    setSignUpDetails({ ...SignUpDetails, ...new_val });
  };

  const SignIn = () => {
    let emailerror;
    let usernameerror;
    let passworderror;
    let confirmpassworderror;
    let anyerror = false;

    if (SignUpDetails.email == null) {
      emailerror = "*Field is required*";
      anyerror = true;
    }

    if (SignUpDetails.username == null) {
      usernameerror = "*Field is required*";
      anyerror = true;
    } else {
      if (SignUpDetails.username.length < 8) {
        usernameerror = "*Must be >= 8 characters*";
        anyerror = true;
      }
    }

    if (SignUpDetails.password == null) {
      passworderror = "*Field is required*";
      anyerror = true;
    } else {
      if (SignUpDetails.password.length < 8) {
        passworderror = "*Must be >= 8 characters*";
        anyerror = true;
      }
    }

    if (SignUpDetails.confirmpassword == null) {
      confirmpassworderror = "*Field is required*";
      anyerror = true;
    } else {
      if (SignUpDetails.confirmpassword != SignUpDetails.password) {
        confirmpassworderror = "*Passwords do not match*";
        anyerror = true;
      }
    }

    if (anyerror) {
      setSignUpDetails({
        ...SignUpDetails,
        emailerror,
        usernameerror,
        passworderror,
        confirmpassworderror,
      });
      return;
    }

    //if no errors detect then call the api route to sign the user up

    HandleSignUp();
  };

  return (
    <>
      <VerticalSpacer />
      <Underline>
        <Typography style={{ color: "#4B59F7" }}>Sign-Up</Typography>
      </Underline>
      <InputFieldContainer>
        <VerticalSpacer />
        <TextField
          style={{ width: "100%" }}
          error={SignUpDetails.emailerror != null}
          label={`Email ${
            SignUpDetails.emailerror ? SignUpDetails.emailerror : ""
          }`}
          id="email"
          onChange={HandleChange}
        ></TextField>
        <TextField
          style={{ width: "100%", marginTop: "5px" }}
          label={`Username ${
            SignUpDetails.usernameerror ? SignUpDetails.usernameerror : ""
          }`}
          error={SignUpDetails.usernameerror != null}
          id="username"
          onChange={HandleChange}
        ></TextField>
        <TextField
          style={{ width: "100%", marginTop: "5px" }}
          label={`Password ${
            SignUpDetails.passworderror ? SignUpDetails.passworderror : ""
          }`}
          error={SignUpDetails.passworderror != null}
          id="password"
          onChange={HandleChange}
          type="password"
        ></TextField>
        <TextField
          style={{ width: "100%", marginTop: "5px" }}
          error={SignUpDetails.confirmpassworderror != null}
          label={`Confirm Password ${
            SignUpDetails.confirmpassworderror
              ? SignUpDetails.confirmpassworderror
              : ""
          }`}
          id="confirmpassword"
          onChange={HandleChange}
          type="password"
        ></TextField>
        <Button
          variant="contained"
          onClick={() => SignIn()}
          variant="contained"
          style={{
            backgroundColor: "#4B59F7",
            color: "white",
            marginTop: "15px",
            width: "100%",
          }}
        >
          SIGN UP
        </Button>
        <Typography style={{ marginTop: "10px", marginBottom: "10px" }}>
          OR
        </Typography>

        <Button component={Link} to="/login">
          <Typography variant="caption" style={{ color: "#4B59F7" }}>
            Click here to login
          </Typography>
        </Button>
      </InputFieldContainer>
    </>
  );
};

export default SignUp;
