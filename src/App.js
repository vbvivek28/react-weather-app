import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5832d9480bca9d07158aba8fb996a403`;

  const searchLocation = (e) => {
    e.preventDefault();
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setLocation("");
  };

  return (
    <div className="app">
      <div className="heading"> Weather Info  </div>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          type="text"
        />

        <button onClick={searchLocation} placeholder="Enter Location">
          {" "}
          Search
        </button>
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ?  <img
                  src={
                    "http://openweathermap.org/img/wn/" +
                    data.weather[0].icon +
                    "@2x.png"
                  }
                ></img> : null}
          </div>
          <div >
            {data.weather ? <p className="des">{data.weather[0].description}</p> : null}
          </div>
        </div>

        {data.name  ?
        <>
          <div className="bottom">
            <div className="feels">
             <p>Feels Like</p> 
             {data.main ? 
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
               : null}
              
            </div>
            <div className="humidity">
              <p>Humidity</p>
               {data.main ? 
                <p className="bold">{data.main.humidity}%</p>
               : null}
            </div>
            <div className="wind">
              <p>Wind Speed</p>
                {data.wind ? 
                <p>{data.wind.speed}m/s</p>
               : null}
            </div>
            
          </div>
          </>:null}
      </div>
    </div>
  );
}

export default App;
