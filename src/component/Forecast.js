import React, { useState, useEffect } from "react";
import "./style.css";
const Api_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
const Api_keys = `92927e1709a9a99846c75f5225870fb1`;

export default function Forecast() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Mumbai");

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

  return (
    <div className="tempapp">
      <p style={{ color: "white" }}>Type the name of the city</p>
      <div className="input">
        <input
          type="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      {!city ? (
        <p>No Data Found</p>
      ) : (
        <div>
          <div className="info">
            <h2 className="location">
              {/* <i className="fa-solid fa-street-view"></i> */}
              {search}
            </h2>
            <h1 className="temp" style={{ color: "white" }}>
              {Math.round(city.temp)}
            </h1>
            <h3 className="tempin_max" style={{ color: "white" }}>
              Min:{Math.round(city.temp_min)}|Max:{Math.round(city.temp_max)}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
