import React, { useState } from "react";
import { Button, Typography, Box } from "@material-ui/core";
import ActivitySuggestionList from "./ActivitySuggestionList";

const ActivityOption = ({ activity_object, place_service }) => {
  const [suggestionDetails, setSuggestionDetails] = useState({
    suggestions: [],
    display_suggestions: false,
  });

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
        onClick={() => FindSuggestions()}
        variant="contained"
        style={{
          width: "100%",
          color: "white",
          marginTop: "5px",
          backgroundColor: "rgba(75, 89, 247, 1)",
          fontSize: "12px",
        }}
      >
        <Typography>{activity_object}</Typography>
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
