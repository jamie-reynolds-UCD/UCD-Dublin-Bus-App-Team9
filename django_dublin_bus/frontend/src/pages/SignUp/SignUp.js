import React from "react";
import { Box, Typography, TextField, Button } from "@material-ui/core";
import { InputFieldContainer, VerticalSpacer } from "./SignUp.elements";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <InputFieldContainer>
        <VerticalSpacer />
        <TextField style={{ width: "100%" }} label="Email"></TextField>
        <TextField style={{ width: "100%" }} label="Username"></TextField>
        <TextField style={{ width: "100%" }} label="Password"></TextField>
        <TextField
          style={{ width: "100%" }}
          label="Confirm password"
        ></TextField>
        <Button
          variant="contained"
          onClick={() => console.log("Sign in")}
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
