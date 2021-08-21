import React, { useContext } from "react";
import { Box, Typography, Button } from "@material-ui/core";
import StarRatings from "react-star-ratings";
import QuickLocationContext from "../SavedLocations/QuickLocationContext";

const ActivitySuggestion = ({ activity_suggestion }) => {
  let name = activity_suggestion.name;
  let address = activity_suggestion.formatted_address;
  let latitude = activity_suggestion.geometry.location.lat();
  let longitude = activity_suggestion.geometry.location.lng();
  let photo = activity_suggestion.photos
    ? activity_suggestion.photos[0].getUrl()
    : activity_suggestion.icon;
  let price_level = activity_suggestion.price_level;
  let rating = activity_suggestion.rating;
  let num_ratings = activity_suggestion.user_ratings_total;

  const { quick_location_updater } = useContext(QuickLocationContext);

  const PriceLevel = () => {
    let euro_signs = [];

    for (var i = 0; i < price_level; i++) {
      euro_signs.push(<Typography>€</Typography>);
    }

    for (var i = euro_signs.length; i < 3; i++) {
      euro_signs.push(
        <Typography style={{ color: "rgba(0, 0, 0, 0.3)" }}>€</Typography>
      );
    }

    return euro_signs;
  };

  const GetDirections = () => {
    quick_location_updater({ address_string: name, latitude, longitude });
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: "5px",
        width: "100%",
      }}
    >
      <div>
        <img
          width="30"
          height="30"
          src={photo}
          style={{ borderRadius: "5px" }}
        />
      </div>
      <Box style={{ marginLeft: "3px", flex: 1 }}>
        <Typography style={{ fontSize: "10px" }}>{name}</Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <StarRatings
            rating={rating}
            numberOfStars={5}
            starDimension="10px"
            starSpacing="1px"
            starRatedColor="gold"
          />
          <Typography
            variant="caption"
            style={{ marginLeft: "2px" }}
          >{`(${num_ratings})`}</Typography>
          <div
            style={{
              flex: 1,
              justifyContent: "flex-end",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {PriceLevel().map((euro_sign) => euro_sign)}
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {" "}
          <Button
            style={{
              textTransform: "none",
              minHeight: "0px",
              minWidth: "0px",
              padding: "1px",
            }}
            onClick={GetDirections}
          >
            <Typography style={{ fontSize: "10px" }}>Get there</Typography>
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default ActivitySuggestion;
