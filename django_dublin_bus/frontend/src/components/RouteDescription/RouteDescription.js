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

const generateBusIcon = (route) => {
  return (
    <div
      style={{
        borderRadius: "50%",
        backgroundColor: "#E1E137",
        color: "black",
        width: "21px",
        height: "21px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
      }}
    >
      {route}
    </div>
  );
};

const NewLeg = (leg) => {
  let walking = leg.short_instructions.substring(0, 4) == "Walk";
  let color = walking ? "#003366" : "#006600";

  let bus_icon;

  if (walking) {
    bus_icon = null;
  } else {
    bus_icon = generateBusIcon(leg.route_name);
  }

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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faBus}
                  style={{
                    fontSize: "15px",
                    marginRight: "3px",
                    marginRight: "2px",
                  }}
                />
                {bus_icon}
              </div>
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
            color: "#006600",
          }}
        >
          <Typography style={{ fontSize: "15px", color: "#006600" }}>
            {" "}
            <FontAwesomeIcon icon={faCircle} />
          </Typography>

          <Typography style={{ marginLeft: "5px" }}>{leg.end_name}</Typography>
        </div>
      ) : null}
    </div>
  );
};

const RouteSummary = (summary) => {
  return (
    <Box
      style={{
        marginTop: "5px",
        marginBottom: "5px",
        backgroundColor: "rgba(232, 232, 232, 0.7)",
        padding: "7px",
      }}
      boxShadow={1}
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Typography style={{ marginRight: "3px", fontSize: "13px" }}>
          Trip time:{" "}
        </Typography>
        <Typography
          style={{ fontSize: "13px" }}
        >{`${summary["Trip Time"]} mins`}</Typography>
        <Typography
          style={{
            color:
              summary.message.includes("longer") |
              summary.message.includes("Longer")
                ? "red"
                : "green",
            fontSize: "11px",
            marginLeft: "2px",
          }}
        >
          {`(${summary.message})`}
        </Typography>
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "3px" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Typography style={{ marginRight: "3px", fontSize: "11px" }}>
            Bus:{" "}
          </Typography>
          <Typography
            style={{ fontSize: "11px" }}
          >{`${summary["Bus"]} mins`}</Typography>
        </div>
        <Typography style={{ fontSize: "11px", marginRight: "3px" }}>
          ,
        </Typography>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Typography style={{ marginRight: "3px", fontSize: "11px" }}>
            Walking:{" "}
          </Typography>
          <Typography
            style={{ fontSize: "11px" }}
          >{`${summary["Walking"]} mins`}</Typography>
        </div>
        <Typography style={{ fontSize: "11px", marginRight: "3px" }}>
          ,
        </Typography>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Typography style={{ marginRight: "3px", fontSize: "11px" }}>
            Waiting:{" "}
          </Typography>
          <Typography style={{ fontSize: "11px" }}>{`${Math.max(
            summary["Waiting"],
            0
          )} mins`}</Typography>
        </div>
      </div>
    </Box>
  );
};

const RouteDescription = ({ route_object }) => {
  if ((route_object == null) | (route_object.length == 0)) {
    return null;
  }

  let route_summary = route_object[route_object.length - 1];

  route_object = route_object.filter((obj) => obj != route_summary);

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

        {RouteSummary(route_summary)}

        <Typography
          style={{ marginLeft: "2px", fontWeight: "bold", color: "#003366" }}
        >
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
        <Typography
          style={{ marginLeft: "2px", fontWeight: "bold", color: "#003366" }}
        >
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
