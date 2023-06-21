import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";

const Api_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
const Api_keys = `92927e1709a9a99846c75f5225870fb1`;

export default function Forecast() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [responsedata, setResponseData] = useState({});



  useEffect(() => {
    const fetchApi = async () => {
      const url = `${Api_endpoint}q=${search}&units=metric&appid=${Api_keys}`;
      const response = await fetch(url);
      const resjson = await response.json();
      // console.log(resjson);
      setCity(resjson.main);
    };
    fetchApi();
  }, [search]);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setLatitude(position.coords.latitude);
  //     setLongitude(position.coords.longitude);
  //   });
  //   const finalApi = `${Api_endpoint}lat=${latitude}&lon=${longitude}&appid=${Api_keys}`;
  //   axios.get(finalApi).then((response) => {
  //     console.log(response.data);
  //     setResponseData(response.data);
  //   });
  // });

  return (
    <div className="tempapp">
      <p style={{ color: "white", align: "center" }}>Haze</p>
      <div className="input">
        <input
          type="search"
          placeholder="Search any city"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />

        {/* <h5 style={{ color: "white" }}>{responsedata.name},{responsedata.sys.country}</h5> */}
      </div>
      {!city ? (
        <p>No Data Found</p>
      ) : (
        <div>
          <div className="info">
            <h2 className="location">
              <i className="fa-solid fa-street-view"></i>
              {search}
            </h2>
            <h1 className="temp" style={{ color: "white" }}>
              {Math.round(city.main.temp)}
            </h1>
            <h3 className="tempin_max" style={{ color: "white" }}>
              Min:{Math.round(city.main.temp_min)}|Max:{Math.round(city.main.temp_max)}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
