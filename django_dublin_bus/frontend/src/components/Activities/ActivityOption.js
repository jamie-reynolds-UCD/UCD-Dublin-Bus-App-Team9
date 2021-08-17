import React, { useState, useContext } from "react";
import { Button, Typography, Box } from "@material-ui/core";
import ActivitySuggestionList from "./ActivitySuggestionList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../Auth/AuthContext";

const ActivityOption = ({ activity_object, place_service, icon }) => {
  const [suggestionDetails, setSuggestionDetails] = useState({
    suggestions: [],
    display_suggestions: false,
  });

  const { current_location } = useContext(AuthContext);

  const SuggestionCallback = (results, status) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      let suggestions = [];
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        suggestions.push(place);
      }
      setSuggestionDetails({
        ...suggestionDetails,
        suggestions: suggestions,
        display_suggestions: true,
      });
    }
  };

  const FindSuggestions = () => {
    var location = new google.maps.LatLng(53.2857041368395, -6.243121977460595);

    var request = {
      location: location,
      radius: "500",
      query: activity_object,
    };

    place_service.textSearch(request, SuggestionCallback);
  };

  return (
    <>
      <Button
        onClick={() => {
          if (suggestionDetails.display_suggestions) {
            setSuggestionDetails({
              ...suggestionDetails,
              display_suggestions: false,
            });
          } else {
            if (suggestionDetails.suggestions.length > 0) {
              setSuggestionDetails({
                ...suggestionDetails,
                display_suggestions: true,
              });
            } else {
              FindSuggestions();
            }
          }
        }}
        variant="contained"
        style={{
          width: "100%",
          color: "white",
          marginTop: "5px",
          backgroundColor: "rgba(75, 89, 247, 1)",
          fontSize: "12px",
          textTransform: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div style={{ flex: 1 }}>
            <Typography>
              <FontAwesomeIcon style={{ marginRight: "5px" }} icon={icon} />
              {activity_object}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",

              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon={
                suggestionDetails.display_suggestions
                  ? faChevronUp
                  : faChevronDown
              }
            />
          </div>
        </div>
      </Button>

      <ActivitySuggestionList
        activity_type={activity_object}
        suggestions={suggestionDetails.suggestions}
        display={suggestionDetails.display_suggestions}
      />
    </>
  );
};

export default ActivityOption;
