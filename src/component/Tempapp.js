import React, { useState, useEffect } from "react";
// import { useTypewriter } from "react-simple-typewriter";
// import bgimg from "../bg-image.jpg";
import axios from "axios";
import Clock from "react-live-clock";
import moment from "moment";
import "./style.css";
import Forecast from "../component/Forecast.js";
import image from "../image/rightside-image.jpg";

const Api_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
const Api_keys = `92927e1709a9a99846c75f5225870fb1`;

function Tempapp() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Mumbai");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [responsedata, setResponseData] = useState({});

  //   useEffect(() => {
  //     const fetchApi = async () => {
  //       const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=92927e1709a9a99846c75f5225870fb1`;
  //       const response = await fetch(url);
  //       const resjson = await response.json();
  //       // console.log(resjson);
  //       setCity(resjson.main);
  //     };
  //     fetchApi();
  //   }, [search]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    const finalApi = `${Api_endpoint}lat=${latitude}&lon=${longitude}&appid=${Api_keys}`;
    axios.get(finalApi).then((response) => {
      console.log(response.data);
      setResponseData(response.data);
    });
  });

  return (
    <div className="body">
      <div className="container">
        <div className="currentLocationTemp">
          <div className="currentDetails">
            <div className="currentDateTime">
              <Clock format="HH:mm:ss" interval={1000} ticking={true} />
              <strong>{moment().format("dddd, Do MMM YYYY ")}</strong>
              <div className="currentTemp">
                <span>{Math.round(responsedata.main.temp - 273)}&deg;C</span>
                {/* <span>{responsedata.temp-273}&deg;C</span> */}
              </div>
            </div>

          </div>
          <div className="currentLocation">
            <p>{responsedata.name}</p>
            <span>{responsedata.sys.country}</span>

          </div>

        </div>
        <div className="forecast">
          <Forecast />
        </div>
      </div>
    </div>
  );
}

export default Tempapp;
