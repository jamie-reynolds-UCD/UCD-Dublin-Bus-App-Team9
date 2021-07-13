import React, { useContext, useState } from "react";
import { Typography, Box } from "@material-ui/core";
import AuthContext from "../../components/Auth/AuthContext";
import { ProfileContainer } from "./Profile.elements";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { CenteredDiv } from "./Profile.elements";
import UserSavedLocations from "../../components/SavedLocations/UserSavedLocations";

const Profile = () => {
  const { loggedin, username } = useContext(AuthContext);

  const [option, setOption] = useState("locations");

  const RenderSelectedComponent = () => {
    return (
      <>
        <UserSavedLocations display={option == "locations"} />
      </>
    );
  };

  return (
    <ProfileContainer>
      <Box
        style={{
          width: "100%",
          height: "100%",
          padding: "8px",
          minHeight: "300px",
        }}
        borderRadius={5}
        boxShadow={1}
      >
        <Typography
          variant="h6"
          style={{ color: "#4B59F7" }}
        >{`${username}'s Profile`}</Typography>
        <CenteredDiv>
          <ToggleButtonGroup
            exclusive
            style={{ margin: "auto" }}
            value={option}
            onChange={(ev, newformat) => setOption(newformat)}
          >
            <ToggleButton value="locations">Locations</ToggleButton>
            <ToggleButton value="events">Events</ToggleButton>
            <ToggleButton value="routes">Routes</ToggleButton>
          </ToggleButtonGroup>
        </CenteredDiv>

        {RenderSelectedComponent()}
      </Box>
    </ProfileContainer>
  );
};

export default Profile;
