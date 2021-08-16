import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";

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
  return (
    <div className="weatherBox">
      <WeatherCard
        temp={info.temp}
        description={info.desc}
        image={info.icon}
        humidity={info.humidity}
        rain={info.rain}
      />
    </div>
  );
};

export default Weather;
