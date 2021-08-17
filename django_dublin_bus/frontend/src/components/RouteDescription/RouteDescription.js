import React from "react";
import { Box, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWalking,
  faMapPin,
  faCircle,
  faBus,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@material-ui/core";

const NewLeg = (leg) => {
  let walking = leg.short_instructions.substring(0, 4) == "Walk";
  let color = walking ? "blue" : "darkorange";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "2px",
          }}
        >
          <Typography style={{ fontSize: "10px", color: color }}>
            {" "}
            <FontAwesomeIcon icon={faCircle} />
          </Typography>

          <Typography style={{ fontSize: "10px", color: color }}>
            {" "}
            <FontAwesomeIcon icon={faCircle} />
          </Typography>

          <Typography style={{ fontSize: "10px", color: color }}>
            {" "}
            <FontAwesomeIcon icon={faCircle} />
          </Typography>
        </div>
        <div>
          {leg.departure_time ? (
            <Typography
              style={{
                marginLeft: "5px",
                fontSize: "10px",
                marginBottom: "5px",
                color: color,
              }}
            >
              {leg.departure_time}
            </Typography>
          ) : null}
          <Typography
            style={{ fontSize: "10px", color: color, marginLeft: "5px" }}
          >
            {walking ? (
              <FontAwesomeIcon
                icon={faWalking}
                style={{ fontSize: "15px", marginRight: "3px" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faBus}
                style={{ fontSize: "15px", marginRight: "3px" }}
              />
            )}

            {`${
              leg.predicted_journey_time
                ? `${leg.predicted_journey_time} mins`
                : leg.short_instructions
                    .replace("Walk ", "")
                    .replace("Bus ", "")
            } 
            `}
          </Typography>
        </div>
      </div>
      {leg.end_name ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            color: "darkorange",
          }}
        >
          <Typography style={{ fontSize: "15px", color: "darkorange" }}>
            {" "}
            <FontAwesomeIcon icon={faCircle} />
          </Typography>

          <Typography style={{ marginLeft: "5px" }}>{leg.end_name}</Typography>
        </div>
      ) : null}
    </div>
  );
};

const RouteDescription = ({ route_object }) => {
  if ((route_object == null) | (route_object.length == 0)) {
    return null;
  }

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      boxShadow={isMobile ? 0 : 1}
      borderRadius={7}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        marginTop: isMobile ? "2px" : "12px",
        marginLeft: "5px",
      }}
    >
      <div>
        {isMobile ? null : (
          <Typography variant="h6">Route Description</Typography>
        )}

        <Typography style={{ marginLeft: "2px", fontWeight: "bold" }}>
          {" "}
          <FontAwesomeIcon icon={faMapPin} style={{ marginRight: "2px" }} />
          {`${route_object[0].origin} ${
            route_object[0].time ? `, ${route_object[0].time}` : ""
          }`}
        </Typography>

        {route_object.slice(1, -1).map((leg) => {
          return (
            <div style={{ display: "flex", flexDirection: "row" }}>
              {NewLeg(leg)}
            </div>
          );
        })}
        <Typography style={{ marginLeft: "2px", fontWeight: "bold" }}>
          {" "}
          <FontAwesomeIcon icon={faMapPin} style={{ marginRight: "2px" }} />
          {`Arrive at ${route_object[route_object.length - 1].destination} ${
            route_object[route_object.length - 1].time
              ? `, ${route_object[route_object.length - 1].time}`
              : ""
          }`}
        </Typography>
      </div>
    </Box>
  );
};

export default RouteDescription;
