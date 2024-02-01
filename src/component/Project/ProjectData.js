import React, { useState } from "react";
import "./Project.scss";
import { plantState, projectData } from "./Project";
import { isMobile } from "../Navigation/Navigation";
import {
  LineChart,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";
import { IoArrowForward } from "react-icons/io5";
import { MdOutlineError, MdPermDataSetting } from "react-icons/md";
import { IoIosCloud } from "react-icons/io";
import { FaCheckCircle, FaTree } from "react-icons/fa";
import { RiMoneyCnyCircleFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";
import { BsMenuButtonWide } from "react-icons/bs";
import { GoAlertFill } from "react-icons/go";
import { signal } from "@preact/signals-react";

export const dropState = signal(false);

const Graph = () => {
  return <></>;
};

const Production = () => {
  return (
    <div className="DAT_ProjectData_Body_Data_Center_Production">
      <div className="DAT_ProjectData_Body_Data_Center_Production_Data">
        <div className="DAT_ProjectData_Body_Data_Center_Production_Data_Chart">
          <div
            className="DAT_ProjectData_Body_Data_Center_Production_Data_Chart_Data"
            style={{ fontSize: "32px" }}
          >
            0%
          </div>
        </div>

        <div className="DAT_ProjectData_Body_Data_Center_Production_Data_Detail">
          <div style={{ marginBottom: "8px", color: "grey" }}>Năng suất</div>
          <div style={{ marginBottom: "8px" }}>
            {projectData.value.production}
            <span
              style={{
                marginLeft: "8px",
                fontSize: "12px",
                color: "grey",
              }}
            >
              kW
            </span>
          </div>
          <div
            style={{
              borderBottom: "solid 1px rgb(199, 199, 199)",
              width: "50%",
              marginBottom: "8px",
            }}
          />
          <div style={{ marginBottom: "8px", color: "grey" }}>Dung lượng</div>
          <div>
            {projectData.value.capacity}
            <span
              style={{
                marginLeft: "8px",
                fontSize: "12px",
                color: "grey",
              }}
            >
              kWp
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          borderBottom: "solid 1px rgb(199, 199, 199)",
          height: "16px",
          marginBottom: "16px",
        }}
      />

      <div className="DAT_ProjectData_Body_Data_Center_Production_Total">
        <div
          className="DAT_ProjectData_Body_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgb(245, 251, 255)" }}
        >
          <div className="DAT_ProjectData_Body_Data_Center_Production_Total_Item_Tit">
            Năng suất ngày
          </div>
          <div className="DAT_ProjectData_Body_Data_Center_Production_Total_Item_Data">
            --
          </div>
        </div>

        <div
          className="DAT_ProjectData_Body_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgb(255, 248, 247)" }}
        >
          <div className="DAT_ProjectData_Body_Data_Center_Production_Total_Item_Tit">
            Năng suất tháng
          </div>
          <div className="DAT_ProjectData_Body_Data_Center_Production_Total_Item_Data">
            --
          </div>
        </div>

        <div
          className="DAT_ProjectData_Body_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgb(246, 245, 255)" }}
        >
          <div className="DAT_ProjectData_Body_Data_Center_Production_Total_Item_Tit">
            Năng suất năm
          </div>
          <div className="DAT_ProjectData_Body_Data_Center_Production_Total_Item_Data">
            --
          </div>
        </div>

        <div
          className="DAT_ProjectData_Body_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgb(245, 250, 246)" }}
        >
          <div className="DAT_ProjectData_Body_Data_Center_Production_Total_Item_Tit">
            Tổng năng suất
          </div>
          <div className="DAT_ProjectData_Body_Data_Center_Production_Total_Item_Data">
            --
          </div>
        </div>
      </div>
    </div>
  );
};

const Consumption = () => {
  return (
    <div className="DAT_ProjectData_Body_Data_Center_Consumption">
      <div className="DAT_ProjectData_Body_Data_Center_Consumption_Data">
        <div className="DAT_ProjectData_Body_Data_Center_Consumption_Data_Chart">
          <div
            className="DAT_ProjectData_Body_Data_Center_Consumption_Data_Chart_Data"
            style={{ fontSize: "32px" }}
          >
            0%
          </div>
        </div>

        <div className="DAT_ProjectData_Body_Data_Center_Consumption_Data_Detail">
          <div style={{ marginBottom: "8px", color: "grey" }}>Năng suất</div>
          <div style={{ marginBottom: "8px" }}>
            {projectData.value.production}
            <span
              style={{
                marginLeft: "8px",
                fontSize: "12px",
                color: "grey",
              }}
            >
              kW
            </span>
          </div>
          <div
            style={{
              borderBottom: "solid 1px rgb(199, 199, 199)",
              width: "50%",
              marginBottom: "8px",
            }}
          />
          <div style={{ marginBottom: "8px", color: "grey" }}>Dung lượng</div>
          <div>
            {projectData.value.capacity}
            <span
              style={{
                marginLeft: "8px",
                fontSize: "12px",
                color: "grey",
              }}
            >
              kWp
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          borderBottom: "solid 1px rgb(199, 199, 199)",
          height: "16px",
          marginBottom: "16px",
        }}
      />

      <div className="DAT_ProjectData_Body_Data_Center_Consumption_Total">
        <div
          className="DAT_ProjectData_Body_Data_Center_Consumption_Total_Item"
          style={{ backgroundColor: "rgb(245, 251, 255)" }}
        >
          <div className="DAT_ProjectData_Body_Data_Center_Consumption_Total_Item_Tit">
            Năng suất ngày
          </div>
          <div className="DAT_ProjectData_Body_Data_Center_Consumption_Total_Item_Data">
            --
          </div>
        </div>

        <div
          className="DAT_ProjectData_Body_Data_Center_Consumption_Total_Item"
          style={{ backgroundColor: "rgb(255, 248, 247)" }}
        >
          <div className="DAT_ProjectData_Body_Data_Center_Consumption_Total_Item_Tit">
            Năng suất tháng
          </div>
          <div className="DAT_ProjectData_Body_Data_Center_Consumption_Total_Item_Data">
            --
          </div>
        </div>

        <div
          className="DAT_ProjectData_Body_Data_Center_Consumption_Total_Item"
          style={{ backgroundColor: "rgb(246, 245, 255)" }}
        >
          <div className="DAT_ProjectData_Body_Data_Center_Consumption_Total_Item_Tit">
            Năng suất năm
          </div>
          <div className="DAT_ProjectData_Body_Data_Center_Consumption_Total_Item_Data">
            --
          </div>
        </div>

        <div
          className="DAT_ProjectData_Body_Data_Center_Consumption_Total_Item"
          style={{ backgroundColor: "rgb(245, 250, 246)" }}
        >
          <div className="DAT_ProjectData_Body_Data_Center_Consumption_Total_Item_Tit">
            Tổng năng suất
          </div>
          <div className="DAT_ProjectData_Body_Data_Center_Production_Total_Item_Data">
            --
          </div>
        </div>
      </div>
    </div>
  );
};

const Grid = () => {
  return <></>;
};

const Battery = () => {
  return <></>;
};

const Day = () => {
  const v = "Sản lượng ngày";

  const data = [
    { time: "00:00", [v]: 1.234 },
    { time: "01:00", [v]: 2.345 },
    { time: "02:00", [v]: 3.456 },
    { time: "03:00", [v]: 4.567 },
    { time: "04:00", [v]: 5.678 },
    { time: "05:00", [v]: 6.789 },
    { time: "06:00", [v]: 7.89 },
    { time: "07:00", [v]: 8.901 },
    { time: "08:00", [v]: 9.012 },
    { time: "09:00", [v]: 1.013 },
    { time: "10:00", [v]: 1.124 },
    { time: "11:00", [v]: 1.235 },
    { time: "12:00", [v]: 1.346 },
    { time: "13:00", [v]: 1.457 },
    { time: "14:00", [v]: 1.568 },
    { time: "15:00", [v]: 1.679 },
    { time: "16:00", [v]: 1.78 },
    { time: "17:00", [v]: 1.891 },
    { time: "18:00", [v]: 1.902 },
    { time: "19:00", [v]: 2.013 },
    { time: "20:00", [v]: 2.124 },
    { time: "21:00", [v]: 2.235 },
    { time: "22:00", [v]: 2.346 },
    { time: "23:00", [v]: 2.457 },
  ];

  return (
    <div className="DAT_ProjectData_Body_History_Day">
      <div className="DAT_ProjectData_Body_History_Day_Tit">
        <div className="DAT_ProjectData_Body_History_Day_Tit-Unit">kWh</div>
        <div className="DAT_ProjectData_Body_History_Day_Tit-Label">
          Sản lượng ngày: 24.3 kWh
        </div>
      </div>
      <div className="DAT_ProjectData_Body_History_Day_Chart">
        <ResponsiveContainer
          style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
        >
          <LineChart width={100} height={300} data={data}>
            <XAxis dataKey="time" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey={v} stroke="#8884d8" />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Month = () => {
  const v = "Sản lượng tháng";

  const data = [
    { name: "1", [v]: 21.69 },
    { name: "2", [v]: 22.31 },
    { name: "3", [v]: 23.45 },
    { name: "4", [v]: 24.56 },
    { name: "5", [v]: 25.67 },
    { name: "6", [v]: 26.78 },
    { name: "7", [v]: 27.89 },
    { name: "8", [v]: 28.9 },
    { name: "9", [v]: 29.01 },
    { name: "10", [v]: 22.12 },
    { name: "11", [v]: 23.23 },
    { name: "12", [v]: 22.34 },
    { name: "13", [v]: 24.45 },
    { name: "14", [v]: 23.56 },
    { name: "15", [v]: 22.67 },
    { name: "16", [v]: 24.78 },
    { name: "17", [v]: 21.89 },
    { name: "18", [v]: 21.9 },
    { name: "19", [v]: 22.01 },
    { name: "20", [v]: 20.12 },
    { name: "21", [v]: 21.23 },
    { name: "22", [v]: 22.34 },
    { name: "23", [v]: 23.45 },
    { name: "24", [v]: 24.56 },
    { name: "25", [v]: 25.67 },
    { name: "26", [v]: 24.78 },
    { name: "27", [v]: 23.89 },
    { name: "28", [v]: 22.9 },
    { name: "29", [v]: 23.01 },
    { name: "30", [v]: 21.12 },
    { name: "31", [v]: 21.23 },
  ];

  return (
    <div className="DAT_ProjectData_Body_History_Month">
      <div className="DAT_ProjectData_Body_History_Month_Tit">
        <div className="DAT_ProjectData_Body_History_Month_Tit-Unit">kWh</div>
        <div className="DAT_ProjectData_Body_History_Month_Tit-Label">
          Sản lượng tháng: 775.327 kWh
        </div>
      </div>
      <div className="DAT_ProjectData_Body_History_Month_Chart">
        <ResponsiveContainer
          style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
        >
          <BarChart width={150} height={200} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={v}
              fill="#6495ed"
              barSize={15}
              legendType="circle"
              style={{ fill: "#6495ed" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Year = () => {
  const v = "Sản lượng tháng";

  const data = [
    {
      name: "1",
      [v]: 1.69,
    },
    {
      name: "2",
      [v]: 2.3,
    },
    {
      name: "3",
      [v]: 2.5,
    },
    {
      name: "4",
      [v]: 5.6,
    },
    {
      name: "5",
      [v]: 7.3,
    },
    {
      name: "6",
      [v]: 9.9,
    },
    {
      name: "7",
      [v]: 0.3,
    },
    {
      name: "8",
      [v]: 8.3,
    },
    {
      name: "9",
      [v]: 7.3,
    },
    {
      name: "10",
      [v]: 1.79,
    },
    {
      name: "11",
      [v]: 6.1,
    },
    {
      name: "12",
      [v]: 4.5,
    },
  ];

  return (
    <div className="DAT_ProjectData_Body_History_Year">
      <div className="DAT_ProjectData_Body_History_Year_Tit">
        <div className="DAT_ProjectData_Body_History_Year_Tit-Unit">MWh</div>
        <div className="DAT_ProjectData_Body_History_Year_Tit-Label">
          Sản lượng năm: 1.69 MWh
        </div>
      </div>
      <div className="DAT_ProjectData_Body_History_Year_Chart">
        <ResponsiveContainer
          style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
        >
          <BarChart width={150} height={200} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={v}
              fill="#6495ed"
              barSize={15}
              legendType="circle"
              style={{ fill: "#6495ed" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Total = () => {
  const v = "Sản lượng tổng";

  const data = [
    {
      name: "2018",
      [v]: 1.69,
    },
    {
      name: "2019",
      [v]: 1.87,
    },
    {
      name: "2020",
      [v]: 2.09,
    },
    {
      name: "2021",
      [v]: 2.01,
    },
    {
      name: "2022",
      [v]: 2.03,
    },
    {
      name: "2023",
      [v]: 2.12,
    },
    {
      name: "2024",
      [v]: 0.1,
    },
  ];

  return (
    <div className="DAT_ProjectData_Body_History_Total">
      <div className="DAT_ProjectData_Body_History_Total_Tit">
        <div className="DAT_ProjectData_Body_History_Total_Tit-Unit">MWh</div>
        <div className="DAT_ProjectData_Body_History_Total_Tit-Label">
          Sản lượng năm: 13.69 MWh
        </div>
      </div>
      <div className="DAT_ProjectData_Body_History_Total_Chart">
        <ResponsiveContainer
          style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
        >
          <BarChart width={150} height={200} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={v}
              fill="#6495ed"
              barSize={15}
              legendType="circle"
              style={{ fill: "#6495ed" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Custom = () => {
  return (
    <div className="DAT_ProjectData_Body_History_Custom">

    </div>
  )
}

function ProjectData(props) {
  const color = {
    cur: "blue",
    pre: "black",
  };

  const [nav, setNav] = useState("graph");
  const handleNav = (e) => {
    var id = e.currentTarget.id;
    setNav(id);
  };

  const [date, setDate] = useState("day");
  const [configname, setConfigname] = useState("Chọn thông số");
  const handleDate = (e) => {
    if(configname === "Chọn thông số"){
      setConfigname("Thu gọn");
    } else if (configname === "Thu gọn"){
      setConfigname("Chọn thông số");
    }
    var id = e.currentTarget.id;
    setDate(id);
  };

  return (
    <>
      <div className="DAT_ProjectData">
        {isMobile.value ? (
          <div className="DAT_ProjectData_Header">
            <div className="DAT_ProjectData_Header_Left">
              <div style={{ fontSize: 22, paddingBottom: 5 }}>
                {projectData.value.name}
              </div>

              <div style={{ color: "grey", fontSize: 14 }}>
                Cập nhật lần cuối {projectData.value.lastupdate}
              </div>
            </div>

            <div className="DAT_ProjectData_Header_Right">
              <div
                className="DAT_ProjectData_Header_Right_More"
                onClick={() => (dropState.value = !dropState.value)}
              >
                <IoMenu size={20} color="white" />
              </div>
              <div className="DAT_ProjectData_Header_Right_Close">
                <RxCross2
                  size={20}
                  color="white"
                  onClick={() => (plantState.value = "default")}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="DAT_ProjectData_Header">
            <div className="DAT_ProjectData_Header_Left">
              <div style={{ fontSize: 22, paddingBottom: 5 }}>
                {projectData.value.name}
              </div>

              <div style={{ color: "grey", fontSize: 14 }}>
                Cập nhật lần cuối {projectData.value.lastupdate}
              </div>
            </div>

            <div className="DAT_ProjectData_Header_Right">
              <div className="DAT_ProjectData_Header_Right_Dashboard">
                <AiOutlineDashboard size={20} color="white" />
              </div>
              <div className="DAT_ProjectData_Header_Right_Device">
                <BsMenuButtonWide size={14} color="white" />
              </div>
              <div className="DAT_ProjectData_Header_Right_Alert">
                <GoAlertFill size={16} color="white" />
              </div>
              {/* <div className="DAT_ProjectData_Header_Right_More">
                <IoMenu
                  size={20}
                  color="white"
                  onClick={() => (dropState.value = !dropState.value)}
                />
              </div> */}
              <div className="DAT_ProjectData_Header_Right_Close">
                <RxCross2
                  size={20}
                  color="white"
                  onClick={() => (plantState.value = "default")}
                />
              </div>
            </div>
          </div>
        )}

        <div className="DAT_ProjectData_Body">
          <div className="DAT_ProjectData_Body_Data">
            <div className="DAT_ProjectData_Body_Data_Left">
              <div className="DAT_ProjectData_Body_Data_Left_Img">
                <img src="/dat_picture/solar_panel.png" alt="" />
              </div>

              <div className="DAT_ProjectData_Body_Data_Left_Info">
                <div
                  className="DAT_ProjectData_Body_Data_Left_Info_Addr"
                  style={{ marginBottom: "16px" }}
                >
                  <div className="DAT_ProjectData_Body_Data_Left_Info_Addr_Title">
                    Địa chỉ
                  </div>
                  <div className="DAT_ProjectData_Body_Data_Left_Info_Addr_Content">
                    {projectData.value.addr}
                  </div>
                </div>

                <div
                  className="DAT_ProjectData_Body_Data_Left_Info_Addr"
                  style={{ marginBottom: "16px" }}
                >
                  <div className="DAT_ProjectData_Body_Data_Left_Info_Addr_Title">
                    Trạng thái
                  </div>
                  <div
                    className="DAT_ProjectData_Body_Data_Left_Info_Addr_Content"
                    style={{ textAlign: "right" }}
                  >
                    {projectData.value.status ? (
                      <>
                        <FaCheckCircle size={20} color="green" />
                      </>
                    ) : (
                      <>
                        <MdOutlineError size={20} color="red" />
                      </>
                    )}
                  </div>
                </div>

                <div
                  className="DAT_ProjectData_Body_Data_Left_Info_Addr"
                  style={{ marginBottom: "16px" }}
                >
                  <div className="DAT_ProjectData_Body_Data_Left_Info_Addr_Title">
                    Loại Dự Án
                  </div>
                  <div
                    className="DAT_ProjectData_Body_Data_Left_Info_Addr_Content"
                    style={{ textAlign: "right" }}
                  >
                    {projectData.value.plantype === "industrial" ? (
                      <>Nhà máy</>
                    ) : (
                      <>Hộ dân</>
                    )}
                  </div>
                </div>

                {/* <div
                className="DAT_ProjectData_Body_Data_Left_Info_Addr"
                style={{ marginBottom: "16px" }}
              >
                <div className="DAT_ProjectData_Body_Data_Left_Info_Addr_Title">
                  Loại Hệ Thống
                </div>
                <div
                  className="DAT_ProjectData_Body_Data_Left_Info_Addr_Content"
                  style={{ textAlign: "right" }}
                >
                  --
                </div>
              </div> */}

                <div className="DAT_ProjectData_Body_Data_Left_Info_Addr">
                  <div className="DAT_ProjectData_Body_Data_Left_Info_Addr_Title">
                    Số Điện Thoại
                  </div>
                  <div
                    className="DAT_ProjectData_Body_Data_Left_Info_Addr_Content"
                    style={{ textAlign: "right" }}
                  >
                    {projectData.value.phone}
                  </div>
                </div>
              </div>
            </div>

            <div className="DAT_ProjectData_Body_Data_Center">
              <div className="DAT_ProjectData_Body_Data_Center_Tit">
                <div
                  className="DAT_ProjectData_Body_Data_Center_Tit_Item"
                  id="graph"
                  style={{ color: nav === "graph" ? color.cur : color.pre }}
                  onClick={(e) => handleNav(e)}
                >
                  Đồ thị
                </div>
                <div
                  className="DAT_ProjectData_Body_Data_Center_Tit_Item"
                  id="production"
                  style={{
                    color: nav === "production" ? color.cur : color.pre,
                  }}
                  onClick={(e) => handleNav(e)}
                >
                  Sản xuất
                </div>
                <div
                  className="DAT_ProjectData_Body_Data_Center_Tit_Item"
                  id="consumption"
                  style={{
                    color: nav === "consumption" ? color.cur : color.pre,
                  }}
                  onClick={(e) => handleNav(e)}
                >
                  Tiêu thụ
                </div>
                <div
                  className="DAT_ProjectData_Body_Data_Center_Tit_Item"
                  id="grid"
                  style={{ color: nav === "grid" ? color.cur : color.pre }}
                  onClick={(e) => handleNav(e)}
                >
                  Lưới
                </div>
                <div
                  className="DAT_ProjectData_Body_Data_Center_Tit_Item"
                  id="battery"
                  style={{ color: nav === "battery" ? color.cur : color.pre }}
                  onClick={(e) => handleNav(e)}
                >
                  Pin
                </div>
              </div>

              {(() => {
                switch (nav) {
                  case "graph":
                    return <Graph />;
                  case "production":
                    return <Production />;
                  case "consumption":
                    return <Consumption />;
                  case "grid":
                    return <Grid />;
                  case "battery":
                    return <Battery />;
                  default:
                    <></>;
                }
              })()}
            </div>

            <div className="DAT_ProjectData_Body_Data_Right">
              <div className="DAT_ProjectData_Body_Data_Right_wheather"></div>
            </div>
          </div>

          <div className="DAT_ProjectData_Body_History">
            <div className="DAT_ProjectData_Body_History_Tit">
              <div className="DAT_ProjectData_Body_History_Tit_Left">
                Lịch sử
              </div>

              <div className="DAT_ProjectData_Body_History_Tit_Right">
                <div className="DAT_ProjectData_Body_History_Tit_Right_Date">
                  <div
                    className="DAT_ProjectData_Body_History_Tit_Right_Date_Item"
                    id="day"
                    style={{
                      borderRight: "solid 1px rgb(199, 199, 199)",
                      color: date === "day" ? color.cur : color.pre,
                    }}
                    onClick={(e) => handleDate(e)}
                  >
                    Ngày
                  </div>
                  <div
                    className="DAT_ProjectData_Body_History_Tit_Right_Date_Item"
                    id="month"
                    style={{
                      borderRight: "solid 1px rgb(199, 199, 199)",
                      color: date === "month" ? color.cur : color.pre,
                    }}
                    onClick={(e) => handleDate(e)}
                  >
                    Tháng
                  </div>
                  <div
                    className="DAT_ProjectData_Body_History_Tit_Right_Date_Item"
                    id="year"
                    style={{
                      borderRight: "solid 1px rgb(199, 199, 199)",
                      color: date === "year" ? color.cur : color.pre,
                    }}
                    onClick={(e) => handleDate(e)}
                  >
                    Năm
                  </div>
                  <div
                    className="DAT_ProjectData_Body_History_Tit_Right_Date_Item"
                    id="total"
                    style={{ color: date === "total" ? color.cur : color.pre }}
                    onClick={(e) => handleDate(e)}
                  >
                    Tổng
                  </div>
                </div>
                <div>
                  <button id="custom" onClick={(e) => handleDate(e)}>
                    {configname}
                  </button>
                </div>
                <div className="DAT_ProjectData_Body_History_Tit_Right_Export">
                  <button>Xuất Báo Cáo</button>
                </div>
                <input type="date"></input>
              </div>
            </div>

            {(() => {
              switch (date) {
                case "day":
                  return <Day />;
                case "month":
                  return <Month />;
                case "year":
                  return <Year />;
                case "total":
                  return <Total />;
                case "custom":
                  return <Custom />;
                default:
                  <></>;
              }
            })()}
          </div>

          <div className="DAT_ProjectData_Body_More">
            <div className="DAT_ProjectData_Body_More_Left">
              <div className="DAT_ProjectData_Body_More_Left_Tit">
                <span>Trình tự công việc</span>
                <div className="DAT_ProjectData_Body_More_Left_Tit_Button">
                  <IoArrowForward />
                </div>
              </div>

              <div className="DAT_ProjectData_Body_More_Left_Content">
                <div className="DAT_ProjectData_Body_More_Left_Content_Item">
                  <div
                    className="DAT_ProjectData_Body_More_Left_Content_Item_Value"
                    style={{
                      textAlign: "center",
                      fontSize: "32px",
                      color: "#048FFF",
                    }}
                  >
                    0
                  </div>

                  <div
                    className="DAT_ProjectData_Body_More_Left_Content_Item_Detail"
                    style={{
                      textAlign: "center",
                      fontSize: "14px",
                      color: "grey",
                      marginTop: "8px",
                    }}
                  >
                    Đang Thực Hiện
                  </div>
                </div>

                <div className="DAT_ProjectData_Body_More_Left_Content_Item">
                  <div
                    className="DAT_ProjectData_Body_More_Left_Content_Item_Value"
                    style={{
                      textAlign: "center",
                      fontSize: "32px",
                      color: "#41D068",
                    }}
                  >
                    0
                  </div>

                  <div
                    className="DAT_ProjectData_Body_More_Left_Content_Item_Detail"
                    style={{
                      textAlign: "center",
                      fontSize: "14px",
                      color: "grey",
                      marginTop: "8px",
                    }}
                  >
                    Hoàn Tất
                  </div>
                </div>
              </div>
            </div>

            <div className="DAT_ProjectData_Body_More_Right">
              <div className="DAT_ProjectData_Body_More_Right_Tit">
                Lợi ích môi trường và kinh tế
              </div>

              <div className="DAT_ProjectData_Body_More_Right_Content">
                <div className="DAT_ProjectData_Body_More_Right_Content_Col">
                  <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item">
                    <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item_Icon">
                      <MdPermDataSetting size={24} color="#6495ed" />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", color: "grey" }}>
                        Thang đo tiêu chuẩn
                      </div>
                      <div>--</div>
                    </div>
                  </div>
                  <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item">
                    <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item_Icon">
                      <FaTree size={24} color="#6495ed" />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", color: "grey" }}>
                        Sản lượng cây trồng
                      </div>
                      <div>--</div>
                    </div>
                  </div>
                </div>

                <div className="DAT_ProjectData_Body_More_Right_Content_Col">
                  <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item">
                    <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item_Icon">
                      <IoIosCloud size={24} color="#6495ed" />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", color: "grey" }}>
                        Giảm khí thải CO₂
                      </div>
                      <div>--</div>
                    </div>
                  </div>
                  <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item">
                    <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item_Icon">
                      <RiMoneyCnyCircleFill size={24} color="#6495ed" />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", color: "grey" }}>
                        Tổng sản lượng
                      </div>
                      <div>--</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobile.value ? (
        <>
          {dropState.value ? (
            <div className="DAT_ProjectDataDrop">
              <div className="DAT_ProjectDataDrop_Dashboard">
                <AiOutlineDashboard size={20} color="white" />
              </div>
              <div className="DAT_ProjectDataDrop_Device">
                <BsMenuButtonWide size={20} color="white" />
              </div>
              <div className="DAT_ProjectDataDrop_Alert">
                <GoAlertFill size={20} color="white" />
              </div>
              {/* <div className="DAT_ProjectData_Header_Right_Dashboard">
              <AiOutlineDashboard size={20} color="white" />
            </div>
            <div className="DAT_ProjectData_Header_Right_Device">
              <BsMenuButtonWide size={20} color="white" />
            </div>
            <div className="DAT_ProjectData_Header_Right_Alert">
              <GoAlertFill size={20} color="white" />
            </div> */}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {dropState.value ? (
            <div className="DAT_ProjectDataDrop">
              <div className="DAT_ProjectDataDrop_Item">Xem chi tiết</div>
              <div className="DAT_ProjectDataDrop_Item">Xem chi tiết</div>
              <div className="DAT_ProjectDataDrop_Item">Xem chi tiết</div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

export default ProjectData;
