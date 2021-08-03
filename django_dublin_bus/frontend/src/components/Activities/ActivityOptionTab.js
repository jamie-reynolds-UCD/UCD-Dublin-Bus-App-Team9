import React, { useEffect, useState } from "react";
import ActivitySuggestion from "./ActivitySuggestion";
import { Typography } from "@material-ui/core";

const ActivityOptionTab = ({ keyword, place_service, title }) => {
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const SuggestionCallback = (results, status) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      let suggestions = [];
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        suggestions.push(place);
      }
      setPlaceSuggestions(suggestions);
    }
  };

  const GetSuggestions = () => {
    if (place_service == null) {
      return;
    }

    var location = new google.maps.LatLng(53.2857041368395, -6.243121977460595);
    var request = {
      location: location,
      radius: "500",
      query: keyword,
    };
    place_service.textSearch(request, SuggestionCallback);
  };

  useEffect(() => {
    GetSuggestions();
  }, [place_service]);

  return (
    <>
      <Typography variant="h6" style={{ color: "#4B59F7" }}>
        {title}
      </Typography>
      {placeSuggestions.map((place) => (
        <ActivitySuggestion activity_suggestion={place} />
      ))}
    </>
  );
};

export default ActivityOptionTab;
