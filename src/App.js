//import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import searchIcon from "./images/Search (2).png";
import clearIcon from "./images/clear.png";
import cloudIcon from "./images/cloud.png";
import drizzleIcon from "./images/drizzle.png";
import humidityIcon from "./images/humidity.png";
import rainIcon from "./images/rain.png";
import snowIcon from "./images/snow.png";
import windIcon from "./images/wind.png";

const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{
    return(
      <>
        <div className="image">
          <img src={icon} alt="image"></img>
        </div>
        <div className="temp">
            {temp}*C
        </div>
        <div className="location">
            {city}
        </div>
        <div className="country">{country}</div>
        <div className="cord">
            <div>
              <span classname="lat">Latitude</span>
              <span>{lat}</span>
            </div>
            <div>
              <span classname="log">Longitude</span>
              <span>{log}</span>
            </div>
        </div>
        <div className="data-container">
          <div className="element">
            <img src={humidityIcon} className="icon" alt="humidity"></img>
            <div className="data">
              <div className="humidity-percent">{humidity}%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={windIcon} className="icon" alt="wind"></img>
            <div className="data">
              <div className="wind-rate">{wind}km/hr</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </>
    );
}

const search= async()=>{
  let api_key="3623072a4c248f5b612819322b969b37";
  let url=`https://api.openweathermap.org/data/2.5/weather?q=london&appid=${api_key}&units=Metric`;
}

function App() {

  let api_key="3623072a4c248f5b612819322b969b37";

  const [text,setText]=useState("chennai");
  const [icon,setIcon]=useState(clearIcon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("Chennai");
  const [country,setCountry]=useState("in");
  const [lat,setLat]=useState(0);
  const [log,setLog]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [wind,setWind]=useState(0);

  const [cityNotFound,setCityNotFound]=useState(false);
  const [loading,setLoading]=useState(false);

  const weatherIconMap={
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    
  }

  const search= async()=>{
    
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try{
      let res=await fetch(url)
      let data=await res.json();
      if(data.cod == "404")
      {
        console.error("city not found")
        setCityNotFound(true);
        return;
      }
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setTemp(Math.floor(data.main.temp))
      setCity(data.name)
      setCountry(data.sys.country)
      setLat(data.coord.lat)
      setLog(data.coord.lon)
      const weatherIconCode=data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon)
    }catch(error){
      console.error("An error occured: ",error.message);
    }finally{

      
    }
  }
  
  const handleCity=(e)=>{
    setText(e.target.value);
  }

  const handleKeyDown=(e)=>{
    if(e.key=="Enter"){
      search()
    }
  }

  return (
    <div className="container">
      <div className="input-container">
        <input type="text" className="cityInput" 
        placeholder='Search city' 
        onChange={handleCity} 
        value={text}
        onKeyDown={handleKeyDown}
        ></input>
        <div className="search-icon">
          <img src={searchIcon} onClick={search()}></img>
        </div>
      </div>
      <WeatherDetails
        icon={icon}
        temp={temp}
        city={city}
        country={country}
        lat={lat}
        log={log}
        humidity={humidity}
        wind={wind}
      />
    </div>
  );
}

export default App;
