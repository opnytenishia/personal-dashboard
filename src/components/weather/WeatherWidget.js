import React, { useEffect } from 'react';
import './WeatherWidget.css';

import cloudIcon from "../../assets/cloud.png";
import rainIcon from "../../assets/rain.png";
import searchIcon from "../../assets/search.png";
import snowIcon from "../../assets/snow.png";
import sunIcon from "../../assets/sun.png";

function WeatherWidget() {

    let apiKey = "d91a592c744d6284ffa77d8fb275e331";

    const cityInputFieldElement = document.getElementsByClassName("cityInput");
    const weatherTemperatureElement = document.getElementsByClassName("weatherTemperature");
    const weatherTemperatureMBElement = document.getElementsByClassName("weatherTemperatureMB");
    const weatherLocationMBElement = document.getElementsByClassName("weatherLocationMB");
    const weatherIconElement = document.getElementsByClassName("weatherIcon");

    let latitude = null;
    let longitude = null;

    useEffect(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            searchFunction();
          });
        } else {
          console.log("Geolocation is not available in your browser.");
        }
      }, []);

    const searchFunction = async() => {
        
        if (cityInputFieldElement[0].value === "" && latitude === null && longitude === null) {
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?units=Metric&appid=${apiKey}&`;

        if (cityInputFieldElement[0].value !== "") {
            url = url + `q=${cityInputFieldElement[0].value}`
        } else {
            url = url + `lat=${latitude}&lon=${longitude}`;
        }

        let response = await fetch(url);
        let data = await response.json();

        if (weatherTemperatureElement !== "") {
            weatherTemperatureElement[0].innerHTML = data.main.temp + "° | " + data.name;
        }
        if (weatherTemperatureMBElement !== "") {
            weatherTemperatureMBElement[0].innerHTML = data.main.temp + "°";
        }
        if (weatherLocationMBElement !== "") {
            weatherLocationMBElement[0].innerHTML = data.name;
        }

        if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n" || 
        data.weather[0].icon === "03d" || data.weather[0].icon === "03n" || 
        data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            weatherIconElement[0].src = cloudIcon;
        }  else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n" ||
        data.weather[0].icon === "10d" || data.weather[0].icon === "10n" || 
        data.weather[0].icon === "11d" || data.weather[0].icon === "11n") {
            weatherIconElement[0].src = rainIcon;
        } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            weatherIconElement[0].src = snowIcon;
        } else {
            weatherIconElement[0].src = sunIcon;
        }
    }

  return (
    <div>
        <div className="searchSection">
            <input type="text" className="cityInput" placeholder="Enter City"/>
            <div className="search" onClick={()=>{searchFunction()}}>
                <img src={searchIcon} alt="searchIcon"/>
            </div>
        </div>

        <div className="desktop-content">
            <div className="weatherIconSection">
                <img className="weatherIcon" src={sunIcon} alt="clearIcon"/>
                <div className="weatherTemperature">24° | London</div>
            </div>
        </div>
        <div className="mobile-content">
            <div className="weatherIconSectionMB">
                <img className="weatherIconMB" src={sunIcon} alt="clearIcon"/>
                <div>
                    <div className="weatherTemperatureMB">24°</div>
                </div>
                <div>
                    <div className="weatherLocationMB">London</div>
                </div>
            </div>
        </div>
        
    </div>
  );
}

export default WeatherWidget;