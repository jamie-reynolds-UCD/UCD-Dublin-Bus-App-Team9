import React from "react";

const WeatherCard = (props) =>{
    
    return(
        <div>
        
            <img src ={`http://openweathermap.org/img/w/${props.image}.png`} alt="weather img" />
            <h3>Temp:{Math.round(props.temp)}</h3>
            <h3>Description:{props.description}</h3>
            <h3>Humidity:{props.humidity}</h3>
            <h3>Rain:{props.rain}</h3>
        </div>
    );
}

export default WeatherCard;