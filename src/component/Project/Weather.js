import axios from "axios";
import React, { useEffect, useState } from "react";
import { WiStrongWind } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PacmanLoader } from "react-spinners";
import { projectData } from "./Project";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { IoLocation } from "react-icons/io5";

export default function Weather() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dataLang = useIntl();

  const v = dataLang.formatMessage({ id: "temperature" });

  const lang = useSelector((state) => state.admin.lang);
  const lat = projectData.value.lat;
  const lon = projectData.value.long;
  const q = lat + "," + lon;
  const APIkey = "d5e7a9e22d9b4bf997e73539240202";
  const url =
    "http://api.weatherapi.com/v1/forecast.json?key=" +
    APIkey +
    "&q=" +
    q +
    "&days=7&aqi=no&alerts=no&lang=" +
    lang;

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
        let weekday = [];
        if (lang === "en") {
          weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
        } else if (lang === "vi") {
          weekday = [
            "Chủ nhật",
            "Thứ hai",
            "Thứ ba",
            "Thứ tư",
            "Thứ năm",
            "Thứ sáu",
            "Thứ bảy",
          ];
        }
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
    // console.log(e.currentTarget.id);
    setType(e.currentTarget.id);
  };

  // useEffect(() => {
  //   console.log(isMobile.value);
  //   console.log(forecastdata);
  // });

  return isLoading ? (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PacmanLoader color="#0082CA" size={20} />
    </div>
  ) : (
    <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside">
      <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Current">
        <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Current_Left">
          <img
            src={"/dat_picture/station.jpg"}
            alt=""
            style={{ width: "140px", height: "80px" }}
          ></img>
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Current_Right">
          <img
            src={"https:" + data.current.condition.icon}
            style={{ width: "70px", height: "70px" }}
            alt=""
          />
          <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Current_Right_Tit">
            <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Current_Right_Tit_Temp">
              {data.current.temp_c}°C
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Current_Right_Tit_Des">
              {data.current.condition.text}
            </div>
          </div>
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Describe">
        <IoLocation color="rgba(97,88,194,0.8)" size={15} />
        {data.location.name},{data.location.country}, {data.location.localtime}
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
                <stop offset="5%" stopColor="rgba(97,88,194,0.8)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="rgba(97,88,194,0.8)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" hide={true} />
            {/* <YAxis /> */}
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Tooltip animationEasing="ease-in-out" />
            <Area
              type="monotone"
              dataKey={v}
              stroke="rgba(97,88,194,0.8)"
              fillOpacity={20}
              fill="url(#colorforecastdata)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Describe">
        <div style={{ display: "flex", alignItems: "center" }}>
          <WiHumidity />: {data.current.humidity} % |
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <WiStrongWind size={20} />: {data.current.wind_kph} km/h |
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          UV: {data.current.uv} nm
        </div>
      </div> */}
      <div className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Bottom">
        {data.forecast.forecastday.map((item, index) => {
          let weekdays = [];
          if (lang === "en") {
            weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          } else if (lang === "vi") {
            weekdays = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
          }
          const dateObj = new Date(item.date);
          const weekday = weekdays[dateObj.getUTCDay()];
          return (
            <div
              key={index}
              className="DAT_ProjectData_Dashboard_Data_Right_Weather_Inside_Bottom_Box"
            >
              <div>{weekday}</div>
              <div>
                <img
                  src={"https:" + item.day.condition.icon}
                  style={{ width: "40px", height: "40px" }}
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
