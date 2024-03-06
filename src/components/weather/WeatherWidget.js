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
    const weatherLocationElement = document.getElementsByClassName("weatherLocation");
    const weatherIconElement = document.getElementsByClassName("weatherIcon");

    const searchFunction = async() => {
        
        if (cityInputFieldElement[0].value === "") {
            return 0;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputFieldElement[0].value}&units=Metric&appid=${apiKey}`;

        let response = await fetch(url);
        let data = await response.json();

        weatherTemperatureElement[0].innerHTML = data.main.temp;
        weatherLocationElement[0].innerHTML = data.name;

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
        <div className="weatherIconSection">
            <img className="weatherIcon" src={sunIcon} alt="clearIcon"/>
            <div>
                <div className="weatherTemperature">24°</div>
            </div>
            <div>
                <div className="weatherLocation">London</div>
            </div>
        </div>
        
    </div>
  );
}

export default WeatherWidget;