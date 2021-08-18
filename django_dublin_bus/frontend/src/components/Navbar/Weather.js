import React, { useState, useEffect } from "react";
import { WeatherDesc, WeatherIcon } from "./Navbar.elements";

const Weather = () => {
  const [info, setInfo] = useState({
    name: "loading",
    temp: "loading",
    humidity: "loading",
    desc: "loading",
    icon: "loading",
  });

  useEffect(() => {
    getWeather();
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getWeather = () => {
    fetch(
      `http://pro.openweathermap.org/data/2.5/weather?q=Dublin,ie&APPID=98310ef86bbb250277915291623ed079&units=metric`
    )
      .then((data) => data.json())
      .then((results) => {
        setInfo({
          name: results.name,
          temp: results.main.temp,
          humidity: results.main.humidity,
          desc: results.weather[0].description,
          icon: results.weather[0].icon,
          rain: (results.rain && results.rain["3h"]) || 0,
        });
      });
  };

  const desc = capitalizeFirstLetter(info.desc);

  return (
    <WeatherDesc>
      <WeatherIcon
        src={`https://openweathermap.org/img/w/${info.icon}.png`}
        alt="weather img"
      />
      {desc} {Math.round(info.temp)}°
    </WeatherDesc>
  );
};

export default Weather;
