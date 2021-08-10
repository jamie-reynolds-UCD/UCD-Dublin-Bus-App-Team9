import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import {
  faDirections,
  faGlassCheers,
  faHiking,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarStyle from "./SidebarStyle";
import OriginDestinInput from "../RouteInput/OriginDestinInput";
import SpotifyWidget from "../Spotify/SpotifyWidget";
import UserSavedLocations from "../SavedLocations/UserSavedLocations";
import SavedLocationOptions from "../SavedLocations/SavedLocationOptions";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import ActivityOptionTab from "../Activities/ActivityOptionTab";
import { useMediaQuery } from "@material-ui/core";
import RouteDescription from "../RouteDescription/RouteDescription";
import QuickLocationContext from "../SavedLocations/QuickLocationContext";

const Sidebar = ({
  quick_location,
  current_location,
  place_service,
  route_object,
  toggle_display,
  toggle_display_updated,
}) => {
  const [toggledisplay, setToggleDisplay] = useState("planner");

  const menu_type = useMediaQuery("(max-width:600px)") ? "thumb" : "sidebar";

  useEffect(() => {
    setToggleDisplay(toggle_display);

    if (menu_type == "thumb") {
      setControlDisplay("route_planner");
    }
  }, [toggle_display, toggle_display_updated]);

  const [controlDisplay, setControlDisplay] = useState("route_planner");
  const [savedLocationOption, setSavedLocationOption] = useState("get_there");

  const style = SidebarStyle();

  /*let activities = [
    "Groceries",
    "Restaurants",
    "Pubs",
    "Banks",
    "Post Office",
    "Outdoor Walks",
  ];

  let activity_icons = {
    Groceries: faShoppingBasket,
    Restaurants: faUtensils,
    Pubs: faGlassCheers,
    Banks: faDonate,
    "Post Office": faEnvelope,
    "Outdoor Walks": faHiking,
  };*/

  const BorderBlocker = () => {
    return (
      <div
        style={{
          height: "100%",
          position: "absolute",
          width: "3px",
          left: "50%",
          transform: "translate(-50%, 0)",
          backgroundColor: "white",
          zIndex: "2",
        }}
      ></div>
    );
  };

  const SavedLocationsToggle = () => {
    if (controlDisplay != "saved_locations") {
      return null;
    }

    return (
      <Box style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <Box
          onClick={() => setSavedLocationOption("get_there")}
          boxShadow={savedLocationOption == "get_there" ? 0 : 2}
          className={
            savedLocationOption == "get_there"
              ? style.toggle_option_selected
              : style.toggle_option_not_selected
          }
        >
          <Typography>Get There</Typography>
        </Box>
        <Box
          onClick={() => setSavedLocationOption("edit_locations")}
          boxShadow={savedLocationOption == "edit_locations" ? 0 : 2}
          className={
            savedLocationOption == "edit_locations"
              ? style.toggle_option_selected
              : style.toggle_option_not_selected
          }
        >
          <Typography>Edit Locations</Typography>
        </Box>
      </Box>
    );
  };

  const RoutePlanToggle = () => {
    if (controlDisplay != "route_planner") {
      return null;
    }

    return (
      <Box style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <Box
          onClick={() => setToggleDisplay("planner")}
          boxShadow={toggledisplay == "planner" ? 0 : 2}
          className={
            toggledisplay == "planner"
              ? style.toggle_option_selected
              : style.toggle_option_not_selected
          }
        >
          <Typography>Route Input</Typography>
        </Box>
        <Box
          onClick={() => setToggleDisplay("description")}
          boxShadow={toggledisplay == "description" ? 0 : 2}
          className={
            toggledisplay == "description"
              ? style.toggle_option_selected
              : style.toggle_option_not_selected
          }
        >
          <Typography>Description</Typography>
        </Box>
      </Box>
    );
  };

  const ThumbMenu = () => {
    return (
      <div
        style={{
          height: "27vh",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            maxHeight: "100%",
            minHeight: "100%",
          }}
        >
          {" "}
          <Box
            boxShadow={1}
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "100%",
              overflow: "scroll",
            }}
          >
            <div
              id="origin-destination-input-container"
              className={
                controlDisplay == "route_planner"
                  ? style.DisplaySection
                  : style.HideSection
              }
            >
              {RoutePlanToggle()}

              <div
                style={
                  toggledisplay == "planner"
                    ? null
                    : { width: "0px", height: "0px", overflow: "hidden" }
                }
              >
                {" "}
                <OriginDestinInput
                  quick_location={quick_location}
                  current_location={current_location}
                  dis
                />
              </div>
              <div
                style={
                  toggledisplay == "description"
                    ? null
                    : { width: "0px", height: "0px", overflow: "hidden" }
                }
              >
                <RouteDescription route_object={route_object} />
              </div>
            </div>
            <div
              id="activity-option-groceries"
              className={
                controlDisplay == "groceries"
                  ? style.DisplaySection
                  : style.HideSection
              }
            >
              <ActivityOptionTab
                keyword="groceries"
                place_service={place_service}
                title="Groceries"
              />
            </div>
            <div
              id="activity-option-restaurants"
              className={
                controlDisplay == "restaurants"
                  ? style.DisplaySection
                  : style.HideSection
              }
            >
              <ActivityOptionTab
                keyword="restaurants"
                place_service={place_service}
                title="Restaurants"
              />
            </div>
            <div
              id="activity-option-pubs"
              className={
                controlDisplay == "pubs"
                  ? style.DisplaySection
                  : style.HideSection
              }
            >
              <ActivityOptionTab
                keyword="pubs"
                place_service={place_service}
                title="Pubs"
              />
            </div>
            <div
              id="activity-option-pubs"
              className={
                controlDisplay == "outdoorwalks"
                  ? style.DisplaySection
                  : style.HideSection
              }
            >
              <ActivityOptionTab
                keyword="outdoor walks"
                place_service={place_service}
                title="Outdoor Walks"
              />
            </div>

            <div
              id="spotify-container"
              className={
                controlDisplay == "spotify_dublin"
                  ? style.DisplaySection
                  : style.HideSection
              }
              style={{
                textAlign: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <SpotifyWidget />
            </div>

            {SavedLocationsToggle()}
            <div
              id="saved-locations"
              className={
                controlDisplay == "saved_locations"
                  ? style.DisplaySection
                  : style.HideSection
              }
              style={{ zIndex: "1000" }}
            >
              <UserSavedLocations
                display={savedLocationOption == "edit_locations"}
              />
              <SavedLocationOptions
                display={savedLocationOption == "get_there"}
              />
            </div>
          </Box>
        </div>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Button
            onClick={() => setControlDisplay("route_planner")}
            variant="contained"
            className={
              controlDisplay == "route_planner"
                ? style.TabButtonSelected
                : style.TabButtonNotSelected
            }
            style={{
              borderRadius: "0px",
              justifyContent: "center",
              minWidth: "0px",
              width: "14%",
            }}
          >
            <FontAwesomeIcon icon={faDirections} size="2x" />
          </Button>
          <Button
            onClick={() => setControlDisplay("saved_locations")}
            variant="contained"
            className={
              controlDisplay == "saved_locations"
                ? style.TabButtonSelected
                : style.TabButtonNotSelected
            }
            style={{
              borderRadius: "0px",
              justifyContent: "center",
              minWidth: "0px",
              width: "14%",
            }}
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
          </Button>
          <Button
            onClick={() => setControlDisplay("spotify_dublin")}
            variant="contained"
            className={
              controlDisplay == "spotify_dublin"
                ? style.TabButtonSelected
                : style.TabButtonNotSelected
            }
            style={{
              borderRadius: "0px",
              justifyContent: "center",
              minWidth: "0px",
              width: "14%",
            }}
          >
            <FontAwesomeIcon icon={faSpotify} size="2x" />
          </Button>
          <Button
            onClick={() => setControlDisplay("groceries")}
            variant="contained"
            className={
              controlDisplay == "groceries"
                ? style.TabButtonSelected
                : style.TabButtonNotSelected
            }
            style={{
              borderRadius: "0px",
              justifyContent: "center",
              minWidth: "0px",
              width: "14%",
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faShoppingBasket} size="2x" />
          </Button>
          <Button
            onClick={() => setControlDisplay("restaurants")}
            variant="contained"
            className={
              controlDisplay == "restaurants"
                ? style.TabButtonSelected
                : style.TabButtonNotSelected
            }
            style={{
              borderRadius: "0px",
              justifyContent: "center",
              minWidth: "0px",
              width: "14%",
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faUtensils} size="2x" />
          </Button>
          <Button
            onClick={() => setControlDisplay("pubs")}
            variant="contained"
            className={
              controlDisplay == "pubs"
                ? style.TabButtonSelected
                : style.TabButtonNotSelected
            }
            style={{
              borderRadius: "0px",
              justifyContent: "center",
              minWidth: "0px",
              width: "14%",
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faGlassCheers} size="2x" />
          </Button>
          <Button
            onClick={() => setControlDisplay("outdoorwalks")}
            variant="contained"
            className={
              controlDisplay == "outdoorwalks"
                ? style.TabButtonSelected
                : style.TabButtonNotSelected
            }
            style={{
              borderRadius: "0px",
              justifyContent: "center",
              minWidth: "0px",
              width: "14%",
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faHiking} size="2x" />
          </Button>
        </Box>
      </div>
    );
  };

  return (
    <Box>
      {menu_type == "thumb" ? (
        ThumbMenu()
      ) : (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            onClick={() => setControlDisplay("route_planner")}
            variant="contained"
            className={
              controlDisplay == "route_planner"
                ? style.TabButtonSelected
                : style.TabButtonNotSelected
            }
          >
            {controlDisplay == "route_planner" ? BorderBlocker() : null}
            <FontAwesomeIcon icon={faDirections} size="2x" />
            {controlDisplay.route_planner ? BorderBlocker() : null}
          </Button>
          <Button
            onClick={() => setControlDisplay("saved_locations")}
            variant="contained"
            className={
              controlDisplay == "saved_locations"
                ? style.TabButtonSelected
                : style.TabButtonNotSelected
            }
          >
            {controlDisplay == "saved_locations" ? BorderBlocker() : null}
            <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
          </Button>
          <Button
            onClick={() => setControlDisplay("spotify_dublin")}
            variant="contained"
            className={
              controlDisplay == "spotify_dublin"
                ? style.TabButtonSelected
                : style.TabButtonNotSelected
            }
          >
            {controlDisplay == "spotify_dublin" ? BorderBlocker() : null}
            <FontAwesomeIcon icon={faSpotify} size="2x" />
          </Button>
          <Button
            onClick={() => setControlDisplay("groceries")}
            variant="contained"
            className={
              controlDisplay == "groceries"
                ? style.TabButtonSelected
                : style.TabButtonNotSelected
            }
          >
            {" "}
            {controlDisplay == "groceries" ? BorderBlocker() : null}
            <FontAwesomeIcon icon={faShoppingBasket} size="2x" />
          </Button>
          <Button
            onClick={() => setControlDisplay("restaurants")}
            variant="contained"
            className={
              controlDisplay == "restaurants"
                ? style.TabButtonSelected
                : style.TabButtonNotSelected
            }
          >
            {" "}
            {controlDisplay == "restaurants" ? BorderBlocker() : null}
            <FontAwesomeIcon icon={faUtensils} size="2x" />
          </Button>
          <Button
            onClick={() => setControlDisplay("pubs")}
            variant="contained"
            className={
              controlDisplay == "pubs"
                ? style.TabButtonSelected
                : style.TabButtonNotSelected
            }
          >
            {" "}
            {controlDisplay == "pubs" ? BorderBlocker() : null}
            <FontAwesomeIcon icon={faGlassCheers} size="2x" />
          </Button>
          <Button
            onClick={() => setControlDisplay("outdoorwalks")}
            variant="contained"
            className={
              controlDisplay == "outdoorwalks"
                ? style.TabButtonSelected
                : style.TabButtonNotSelected
            }
          >
            {" "}
            {controlDisplay == "outdoorwalks" ? BorderBlocker() : null}
            <FontAwesomeIcon icon={faHiking} size="2x" />
          </Button>

          <Box
            boxShadow={1}
            style={{
              position: "absolute",
              left: "50px",
              backgroundColor: "white",
              minWidth: "200px",
              minHeight: "300px",

              zIndex: "1000",
              minHeight: "100%",
              maxHeight: "100%",
              overflow: "scroll",
            }}
          >
            <div
              id="origin-destination-input-container"
              className={
                controlDisplay == "route_planner"
                  ? style.DisplaySection
                  : style.HideSection
              }
            >
              <OriginDestinInput
                quick_location={quick_location}
                current_location={current_location}
              />
            </div>
            <div
              id="activity-option-groceries"
              className={
                controlDisplay == "groceries"
                  ? style.DisplaySection
                  : style.HideSection
              }
            >
              <ActivityOptionTab
                keyword="groceries"
                place_service={place_service}
                title="Groceries"
              />
            </div>
            <div
              id="activity-option-restaurants"
              className={
                controlDisplay == "restaurants"
                  ? style.DisplaySection
                  : style.HideSection
              }
            >
              <ActivityOptionTab
                keyword="restaurants"
                place_service={place_service}
                title="Restaurants"
              />
            </div>
            <div
              id="activity-option-pubs"
              className={
                controlDisplay == "pubs"
                  ? style.DisplaySection
                  : style.HideSection
              }
            >
              <ActivityOptionTab
                keyword="pubs"
                place_service={place_service}
                title="Pubs"
              />
            </div>
            <div
              id="activity-option-pubs"
              className={
                controlDisplay == "outdoorwalks"
                  ? style.DisplaySection
                  : style.HideSection
              }
            >
              <ActivityOptionTab
                keyword="outdoor walks"
                place_service={place_service}
                title="Outdoor Walks"
              />
            </div>

            <div
              id="spotify-container"
              className={
                controlDisplay == "spotify_dublin"
                  ? style.DisplaySection
                  : style.HideSection
              }
              style={{
                textAlign: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <SpotifyWidget />
            </div>

            {SavedLocationsToggle()}
            <div
              id="saved-locations"
              className={
                controlDisplay == "saved_locations"
                  ? style.DisplaySection
                  : style.HideSection
              }
              style={{ zIndex: "1000" }}
            >
              <UserSavedLocations
                display={savedLocationOption == "edit_locations"}
              />
              <SavedLocationOptions
                display={savedLocationOption == "get_there"}
              />
            </div>
          </Box>
        </div>
      )}
    </Box>
  );
};

export default Sidebar;
