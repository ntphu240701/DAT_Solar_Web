import axios from "axios";
import React, { useEffect, useState } from "react";
import { WiStrongWind } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { isMobile } from "../Navigation/Navigation";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PacmanLoader } from "react-spinners";

const temp = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Weather() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const v = "Nhiệt độ";

  const lat = "10.8230989";
  const lon = "106.6296638";
  const q = lat + "," + lon;
  const APIkey = "d5e7a9e22d9b4bf997e73539240202";
  const url =
    "http://api.weatherapi.com/v1/forecast.json?key=" +
    APIkey +
    "&q=" +
    q +
    "&days=7&aqi=no&alerts=no&lang=vi";

  // CALL DATA BY FETCH()
  //   useEffect(() => {
  //     fetch(url)
  //         .then((response) => response.json())
  //       .then((data) => console.log(data));
  //     // console.log(url);
  //   });

  //CALL DATA BY AXIOS
  const [forecastdata, setForecastdata] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
      setForecastdata([]);
      console.log(response.data);
      response.data.forecast.forecastday.map((item) => {
        let dateObj = new Date(item.date);
        let weekday = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
        let day = weekday[dateObj.getUTCDay()];
        const db = {
          name: day,
          [v]: item.day.maxtemp_c,
        };
        setForecastdata((old) => [...old, db]);
      });
      setIsLoading(false);
    });
  }, []);

  const [type, setType] = useState("C");
  const handleChangeType = (e) => {
    console.log(e.currentTarget.id);
    setType(e.currentTarget.id);
  };

  useEffect(() => {
    console.log(isMobile.value);
    console.log(forecastdata);
  });

  return isLoading ? (
    <div style={{ display: "flex", justifyContent: "center" , alignItems: "center"}}>
      <PacmanLoader color="#0082CA" size={20} />
    </div>
  ) : (
    <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside">
      <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Current">
        <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Current_Left">
          <img
            src={"https:" + data.current.condition.icon}
            style={{ width: "70px", height: "70px" }}
          ></img>
          <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Current_Left_Deg">
            {type === "C" ? data.current.temp_c : data.current.temp_f}
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Current_Left_PickType">
            <div
              style={{
                color: type === "C" ? "black" : "#b7b7b7",
                fontWeight: "700",
              }}
              id="C"
              onClick={(e) => handleChangeType(e)}
            >
              °C
            </div>
            <div style={{ color: "#b7b7b7" }}>|</div>
            <div
              style={{
                fontWeight: "700",
                color: type === "C" ? "#b7b7b7" : "black",
              }}
              id="F"
              onClick={(e) => handleChangeType(e)}
            >
              °F
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Current_Left_Describe">
            <div style={{ display: "flex", alignItems: "center" }}>
              <WiHumidity />: {data.current.humidity} %
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <WiStrongWind size={20} />: {data.current.wind_kph} km/h
            </div>
            <div>UV: {data.current.uv} nm</div>
          </div>
        </div>

        {isMobile.value ? (
          <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Current_Right">
            <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Current_Right_Tit">
              {data.location.name}, 
              {/* {data.location.country} */}
              <div>{data.location.localtime}</div>
              <div>Mô tả: {data.current.condition.text}</div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Forecast">
        <ResponsiveContainer width={"100%"} height={150}>
          <AreaChart
            data={forecastdata}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient> */}
              <linearGradient
                id="colorforecastdata"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#FEB400" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FEB400" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" hide={true} />
            {/* <YAxis /> */}
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Tooltip animationEasing="ease-in-out" />
            <Area
              type="monotone"
              dataKey={v}
              stroke="#ff970f"
              fillOpacity={20}
              fill="url(#colorforecastdata)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Bottom">
        {data.forecast.forecastday.map((item, index) => {
          const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
          const dateObj = new Date(item.date);
          const weekday = weekdays[dateObj.getUTCDay()];
          return (
            <div
              key={index}
              className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Bottom_Box"
            >
              <div>{weekday}</div>
              <div
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontWeight: "550",
                }}
              >
                {item.day.avgtemp_c}°C
              </div>
              <img src={"https:" + item.day.condition.icon}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
}
