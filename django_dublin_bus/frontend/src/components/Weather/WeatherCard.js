import React from "react";
import { WeatherItem, WeatherIcon, WeatherText } from "../Navbar/Navbar.elements";

const WeatherCard = (props) =>{

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    const desc = capitalizeFirstLetter(props.description);
    
    return(
            <WeatherItem>
                <WeatherIcon src ={`http://openweathermap.org/img/w/${props.image}.png`} alt="weather img" />
                <WeatherText>{desc} {Math.round(props.temp)}°</WeatherText>
            </WeatherItem>
    );
}

export default WeatherCard;