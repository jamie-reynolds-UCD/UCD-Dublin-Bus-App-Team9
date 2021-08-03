import React, { useState } from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  EditBackground,
  DeleteContainer,
  HorizontalDiv,
} from "./SavedLocations.elements";
import { DeleteLocation } from "../../Api/ApiFunctions";

const SavedLocation = ({ loc }) => {
  const [AreYourSureDelete, setAreYouSureDelete] = useState(false);

  const [deleted, setDeleted] = useState(false);

  const Delete_Location = async () => {
    await DeleteLocation(loc.id);
    setDeleted(true);
    setAreYouSureDelete(false);
  };

  return (
    <div
      style={
        deleted
          ? { height: "0px", width: "0px", overflow: "hidden" }
          : { zIndex: "100000" }
      }
    >
      <Box
        border={1}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          borderColor: "rgba(0, 0, 0, 0.4)",
          borderTop: "0px",
          borderLeft: "0px",
          borderRight: "0px",
          zIndex: "100000",
        }}
      >
        <Box
          style={{
            width: "30%",
            borderRight: "1px solid rgba(0, 0, 0, 0.4)",

            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(75, 89, 247, 0.8)",
              padding: "10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              color: "white",
            }}
          >
            {loc.location_name}
          </Typography>
        </Box>
        <Box
          style={{
            width: "70%",
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, overflow: "scroll" }}>
            <Typography style={{ fontSize: "11px" }}>
              {loc.full_address}
            </Typography>
          </div>
          <Button
            style={{ minWidth: "0px", minHeight: "0px", padding: "1px" }}
            onClick={() => setAreYouSureDelete(true)}
          >
            <Typography>
              <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faTrash} />
            </Typography>
          </Button>
        </Box>
        <EditBackground
          style={
            AreYourSureDelete == false
              ? {
                  width: "0px",
                  height: "0px",
                  overflow: "hidden",
                  zIndex: "1000000",
                }
              : null
          }
        >
          <DeleteContainer
            style={
              AreYourSureDelete == false
                ? { width: "0px", height: "0px", overflow: "hidden" }
                : null
            }
          >
            <Box
              style={{
                backgroundColor: "white",
                borderRadius: "7px",
                padding: "10px",
              }}
            >
              <HorizontalDiv
                style={{ justifyContent: "center", width: "100%" }}
              >
                <Typography>Delete this location?</Typography>
              </HorizontalDiv>
              <HorizontalDiv
                style={{
                  justifyContent: "center",
                  width: "100%",
                  marginTop: "15px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => Delete_Location()}
                  style={{
                    color: "white",
                    backgroundColor: "rgba(75, 89, 247, 0.8)",
                    textTransform: "none",
                  }}
                >
                  <Typography>Delete</Typography>
                </Button>
              </HorizontalDiv>
              <HorizontalDiv
                style={{
                  justifyContent: "center",
                  width: "100%",
                  marginTop: "15px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => setAreYouSureDelete(false)}
                  style={{
                    color: "white",
                    backgroundColor: "rgba(75, 89, 247, 0.8)",
                    textTransform: "none",
                  }}
                >
                  <Typography>Cancel</Typography>
                </Button>
              </HorizontalDiv>
            </Box>
          </DeleteContainer>
        </EditBackground>
      </Box>
    </div>
  );
};

export default SavedLocation;
