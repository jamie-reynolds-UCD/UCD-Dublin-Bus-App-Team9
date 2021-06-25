import React from "react";

const RouteDescription = ({ route_object }) => {
  if ((route_object == null) | (route_object.length == 0)) {
    return null;
  }

  return (
    <div>
      Route Description
      {route_object.map((leg) => {
        return (
          <div>
            {leg.description}, {leg.distance}, {leg.duration}
          </div>
        );
      })}
    </div>
  );
};

export default RouteDescription;
