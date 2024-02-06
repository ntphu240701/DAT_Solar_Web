import React, { useEffect, useState } from "react";
import "./Project.scss";
import AddGateway from "./AddGateway";
import { Empty, plantState, projectData, deviceData, device } from "./Project";
import { isMobile } from "../Navigation/Navigation";
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { IoIosArrowDown, IoIosArrowForward, IoIosCloud } from "react-icons/io";
import { IoArrowForward, IoMenu } from "react-icons/io5";
import { MdOutlineError, MdPermDataSetting } from "react-icons/md";
import { FaCheckCircle, FaTree } from "react-icons/fa";
import { RiMoneyCnyCircleFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsMenuButtonWide } from "react-icons/bs";
import { GoAlertFill } from "react-icons/go";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";

import { signal } from "@preact/signals-react";
import DataTable from "react-data-table-component";
import moment from "moment-timezone";
import Weather from "./Weather";
import AddSubsystem from "./AddSubsystem";
import { set } from "lodash";
import { data } from "jquery";

export const dropState = signal(false);
const tabMobile = signal(false);
const tabLable = signal("");
const tab = signal("inverter");

const tabMobileAlert = signal(false);
const tabLableAlert = signal("");
const tabAlert = signal("all");

const open = signal([]);
const close = signal([]);

const addNav = signal(false);
const addStateNav = signal([false, false]);

export const popupAddGateway = signal(false);
export const popupAddSubsystem = signal(false);

const Graph = () => {
  const path = document.querySelector(".infinity");
  const circle = document.querySelector(".circle");

  // Create an object that gsap can animate
  const val = { distance: 0 };
  // Create a tween
  // gsap.to(val, {
  //   // Animate from distance 0 to the total distance
  //   distance: path.getTotalLength(),
  //   // Loop the animation
  //   repeat: -1,
  //   // Make the animation lasts 5 seconds
  //   duration: 5,
  //   // Function call on each frame of the animation
  //   onUpdate: () => {
  //     // Query a point at the new distance value
  //     const point = path.getPointAtLength(val.distance);
  //     // Update the circle coordinates
  //     circle.setAttribute('cx', point.x);
  //     circle.setAttribute('cy', point.y);
  //   }
  // });

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Graph">
      {/* <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_Solar">
        <img src="/dat_picture/solar.png"></img>
      </div>
      <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_Load">
        <img src="/dat_picture/load.png"></img>
</div> */}
      <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop_P1">
          <svg width="120px" height="160px" version="1.1">
            <linearGradient
              id="style-1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgb(65, 109, 228)"></stop>
              <stop offset="100%" stopColor="rgb(247, 162, 25)"></stop>
            </linearGradient>
            <path
              className="path"
              d="M 105 7 L 25 7 C 14 7 7 14 7 25 L 7 155"
              style={{
                width: "100%",
                height: "100%",
                fill: "none",
                stroke: "url('#style-1')",
                strokeWidth: "3",
              }}
            ></path>
            <circle
              r={5}
              style={{
                fill: "none",
                stroke: "url('#style-1')",
                strokeWidth: "3",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            >
              <animateMotion
                path="M 105 7 L 25 7 C 14 7 7 14 7 25 L 7 155"
                dur="2s"
                repeatCount="indefinite"
              ></animateMotion>
            </circle>
          </svg>
          {/* <div className="DAT_ProjectData_Body_Data_Center_Graph_Line1_Ball"></div> */}
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop_P2">
          <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop_P2_Solar">
            <img src="/dat_picture/solar.png"></img>
          </div>
          <svg width="70px" height="40px" version="1.1">
            <linearGradient
              id="style-2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgb(65, 109, 228)"></stop>
              <stop offset="100%" stopColor="rgb(247, 162, 25)"></stop>
            </linearGradient>
            <path
              d="M 35 7 L 35 35"
              style={{
                width: "100%",
                height: "100%",
                fill: "none",
                stroke: "url('#style-2')",
                strokeWidth: "3",
              }}
            ></path>
            <circle
              r={5}
              style={{
                fill: "none",
                stroke: "url('#style-2')",
                strokeWidth: "3",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            >
              <animateMotion
                path="M 35 7 L 35 35"
                dur="2s"
                repeatCount="indefinite"
              ></animateMotion>
            </circle>
          </svg>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop_P2_Load">
            <img src="/dat_picture/load.png"></img>
          </div>
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop_P3">
          <svg width="120px" height="160px" version="1.1">
            <linearGradient
              id="style-2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgb(65, 109, 228)"></stop>
              <stop offset="100%" stopColor="rgb(247, 162, 25)"></stop>
            </linearGradient>
            <path
              d="M 10 7 L 90 7 C 101 7 109 14 109 25 L 109 155"
              style={{
                width: "100%",
                height: "100%",
                fill: "none",
                stroke: "url('#style-2')",
                strokeWidth: "3",
              }}
            ></path>
            <circle
              r={5}
              style={{
                fill: "none",
                stroke: "url('#style-2')",
                strokeWidth: "3",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            >
              <animateMotion
                path="M 10 7 L 90 7 C 101 7 109 14 109 25 L 109 155"
                dur="2s"
                repeatCount="indefinite"
              ></animateMotion>
            </circle>
          </svg>
          {/* <div className="DAT_ProjectData_Body_Data_Center_Graph_Line2_Ball"></div> */}
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_Pin">
          <img src="/dat_picture/battery.png"></img>
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_G">
          <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_G_T">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_G_P1">
              <svg width="120px" height="45px" version="1.1">
                <linearGradient
                  id="style-1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="rgb(65, 109, 228)"></stop>
                  <stop offset="100%" stopColor="rgb(247, 162, 25)"></stop>
                </linearGradient>
                <path
                  className="path"
                  d="M 15 36 L 90 36 C 101 36 109 29 109 22 L 109 7"
                  style={{
                    width: "100%",
                    height: "100%",
                    fill: "none",
                    stroke: "url('#style-1')",
                    strokeWidth: "3",
                  }}
                ></path>
                <circle
                  r={5}
                  style={{
                    fill: "none",
                    stroke: "url('#style-1')",
                    strokeWidth: "3",
                    position: "absolute",
                    top: "0",
                    left: "0",
                  }}
                >
                  <animateMotion
                    path="M 10 36 L 90 36 C 101 36 109 29 109 22 L 109 7"
                    dur="2s"
                    repeatCount="indefinite"
                  ></animateMotion>
                </circle>
              </svg>
              {/* <div className="DAT_ProjectData_Body_Data_Center_Graph_Line1_Ball"></div> */}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_G_P2">
              <svg width="110px" height="45px" version="1.1">
                <linearGradient
                  id="style-2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="rgb(65, 109, 228)"></stop>
                  <stop offset="100%" stopColor="rgb(247, 162, 25)"></stop>
                </linearGradient>
                <path
                  d="M 100 36 L 25 36 C 14 36 7 28 7 23 L 7 7"
                  style={{
                    width: "100%",
                    height: "100%",
                    fill: "none",
                    stroke: "url('#style-2')",
                    strokeWidth: "3",
                  }}
                ></path>
                <circle
                  r={5}
                  style={{
                    fill: "none",
                    stroke: "url('#style-2')",
                    strokeWidth: "3",
                    position: "absolute",
                    top: "0",
                    left: "0",
                  }}
                >
                  <animateMotion
                    path="M 105 36 L 25 36 C 14 36 7 28 7 23 L 7 7"
                    dur="2s"
                    repeatCount="indefinite"
                  ></animateMotion>
                </circle>
              </svg>
              {/* <div className="DAT_ProjectData_Body_Data_Center_Graph_Line2_Ball"></div> */}
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineBottom_G_B">
            <svg width="220px" height="25px" verssion="1.1">
              <linearGradient
                id="style-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="rgb(65, 109, 228)"></stop>
                <stop offset="100%" stopColor="rgb(247, 162, 25)"></stop>
              </linearGradient>
              <path
                className="path"
                d="M 220 7 L 14 7"
                style={{
                  width: "100%",
                  height: "100%",
                  fill: "none",
                  stroke: "url('#style-1')",
                  strokeWidth: "3",
                }}
              ></path>
              <circle
                r={5}
                style={{
                  fill: "none",
                  stroke: "url('#style-1')",
                  strokeWidth: "3",
                  position: "absolute",
                  top: "0",
                  left: "0",
                }}
              >
                <animateMotion
                  path="M 220 7 L 14 7"
                  dur="2s"
                  repeatCount="indefinite"
                ></animateMotion>
              </circle>
            </svg>
            {/* <div className="DAT_ProjectData_Body_Data_Center_Graph_Line1_Ball"></div> */}
          </div>
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_Grid">
          <img src="/dat_picture/grid.png"></img>
        </div>
      </div>
      {/* <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineBottom">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineBottom_P">

          <svg width="250px" height="45px" verssion="1.1">
            <linearGradient
              id="style-1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgb(65, 109, 228)"></stop>
              <stop offset="100%" stopColor="rgb(247, 162, 25)"></stop>
            </linearGradient>
            <path
              className="path"
              d="M 230 7 L 14 7"
              style={{
                width: "100%",
                height: "100%",
                fill: "none",
                stroke: "url('#style-1')",
                strokeWidth: "3",
              }}
            ></path>
            <circle
              r={5}
              style={{
                fill: "none",
                stroke: "url('#style-1')",
                strokeWidth: "3",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            >
              <animateMotion
                path="M 230.229 8 L 10.117 8"
                dur="2s"
                repeatCount="indefinite"
              ></animateMotion>
            </circle>
          </svg>

        </div>
      </div> */}
    </div>
  );
};

const Production = (props) => {
  const [capacity, setCapacity] = useState(0);
  const [production, setProduction] = useState(0);
  const [dailyproduction, setDailyproduction] = useState(0);
  const [monthlyproduction, setMonthlyproduction] = useState(0);
  const [yearlyproduction, setYearlyproduction] = useState(0);
  const [totalproduction, setTotalproduction] = useState(0);

  useEffect(() => {
    setCapacity(0);
    props.data.map((item) => {
      setCapacity((capacity) => capacity + item.capacity);
    });

    setProduction(0);
    props.data.map((item) => {
      setProduction((production) => production + item.production);
    });

    setDailyproduction(0);
    props.data.map((item) => {
      setDailyproduction(
        (dailyproduction) => dailyproduction + item.dailyproduction
      );
    });

    setMonthlyproduction(0);
    props.data.map((item) => {
      setMonthlyproduction(
        (monthlyproduction) => monthlyproduction + item.monthlyproduction
      );
    });

    setYearlyproduction(0);
    props.data.map((item) => {
      setYearlyproduction(
        (yearlyproduction) => yearlyproduction + item.yearlyproduction
      );
    });

    setTotalproduction(0);
    props.data.map((item) => {
      setTotalproduction(
        (totalproduction) => totalproduction + item.totalproduction
      );
    });
  }, [
    props.data,
    production,
    capacity,
    dailyproduction,
    monthlyproduction,
    yearlyproduction,
    totalproduction,
  ]);

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Production">
      <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart">
          <div
            className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart_Data"
            style={{ fontSize: "32px" }}
          >
            0%
          </div>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Detail">
          <div style={{ marginBottom: "8px", color: "grey" }}>Năng suất</div>
          <div style={{ marginBottom: "8px" }}>
            {production}
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
            {capacity}
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

      <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total">
        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgb(245, 251, 255)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Tit">
            Năng suất ngày
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Data">
            {dailyproduction} kW
          </div>
        </div>

        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgb(255, 248, 247)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Tit">
            Năng suất tháng
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Data">
            {monthlyproduction} kW
          </div>
        </div>

        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgb(246, 245, 255)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Tit">
            Năng suất năm
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Data">
            {yearlyproduction} kW
          </div>
        </div>

        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgb(245, 250, 246)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Tit">
            Tổng năng suất
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Data">
            {totalproduction} kW
          </div>
        </div>
      </div>
    </div>
  );
};

const Consumption = (props) => {
  const [consumption, setConsumption] = useState(0);
  const [dailyconsumption, setDailyconsumption] = useState(0);
  const [monthlyconsumption, setMonthlyconsumption] = useState(0);
  const [yearlyconsumption, setYearlyconsumption] = useState(0);
  const [totalconsumption, setTotalconsumption] = useState(0);

  useEffect(() => {
    setConsumption(0);
    props.data.map((item) => {
      setConsumption((consumption) => consumption + item.consumption);
    });

    setDailyconsumption(0);
    props.data.map((item) => {
      setDailyconsumption(
        (dailyconsumption) => dailyconsumption + item.dailyconsumption
      );
    });

    setMonthlyconsumption(0);
    props.data.map((item) => {
      setMonthlyconsumption(
        (monthlyconsumption) => monthlyconsumption + item.monthlyconsumption
      );
    });

    setYearlyconsumption(0);
    props.data.map((item) => {
      setYearlyconsumption(
        (yearlyconsumption) => yearlyconsumption + item.yearlyconsumption
      );
    });

    setTotalconsumption(0);
    props.data.map((item) => {
      setTotalconsumption(
        (totalconsumption) => totalconsumption + item.totalconsumption
      );
    });
  }, [
    props.data,
    consumption,
    dailyconsumption,
    monthlyconsumption,
    yearlyconsumption,
    totalconsumption,
  ]);
  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption">
      <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Data">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Data_Img">
          <img src="/dat_picture/load.png" alt="" />
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Data_Data">
          Tiêu thụ <span>{consumption}</span> kW
        </div>
      </div>

      <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left">
          <div
            className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item"
            style={{ backgroundColor: "rgb(245, 251, 255)" }}
          >
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Tit">
              Tiêu thụ ngày
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Data">
              {dailyconsumption} kWh
            </div>
          </div>

          <div
            className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item"
            style={{ backgroundColor: "rgb(246, 245, 255)" }}
          >
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Tit">
              Tiêu thụ năm
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Data">
              {yearlyconsumption} kWh
            </div>
          </div>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right">
          <div
            className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item"
            style={{ backgroundColor: "rgb(255, 248, 247)" }}
          >
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Tit">
              Tiêu thụ tháng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Data">
              {monthlyconsumption} kWh
            </div>
          </div>

          <div
            className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item"
            style={{ backgroundColor: "rgb(245, 250, 246)" }}
          >
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Tit">
              Tổng tiêu thụ
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Data">
              {totalconsumption} kWh
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Grid = (props) => {
  const [grid, setGrid] = useState(0);
  const [feedindailygrid, setFeedindailygrid] = useState(0);
  const [feedinmonthlygrid, setFeedinmonthlygrid] = useState(0);
  const [feedinyearlygrid, setFeedinyearlygrid] = useState(0);
  const [feedintotalgrid, setFeedintotalgrid] = useState(0);
  const [purchaseddailygrid, setPurchaseddailygrid] = useState(0);
  const [purchasedmonthlygrid, setPurchasedmonthlygrid] = useState(0);
  const [purchasedyearlygrid, setPurchasedyearlygrid] = useState(0);
  const [purchasedtotalgrid, setPurchasedtotalgrid] = useState(0);

  useEffect(() => {
    setGrid(0);
    props.data.map((item) => {
      setGrid((grid) => grid + item.grid);
    });

    setFeedindailygrid(0);
    props.data.map((item) => {
      setFeedindailygrid(
        (feedindailygrid) => feedindailygrid + item.feedindailygrid
      );
    });

    setFeedinmonthlygrid(0);
    props.data.map((item) => {
      setFeedinmonthlygrid(
        (feedinmonthlygrid) => feedinmonthlygrid + item.feedinmonthlygrid
      );
    });

    setFeedinyearlygrid(0);
    props.data.map((item) => {
      setFeedinyearlygrid(
        (feedinyearlygrid) => feedinyearlygrid + item.feedinyearlygrid
      );
    });

    setFeedintotalgrid(0);
    props.data.map((item) => {
      setFeedintotalgrid(
        (feedintotalgrid) => feedintotalgrid + item.feedintotalgrid
      );
    });

    setPurchaseddailygrid(0);
    props.data.map((item) => {
      setPurchaseddailygrid(
        (purchaseddailygrid) => purchaseddailygrid + item.purchaseddailygrid
      );
    });

    setPurchasedmonthlygrid(0);
    props.data.map((item) => {
      setPurchasedmonthlygrid(
        (purchasedmonthlygrid) =>
          purchasedmonthlygrid + item.purchasedmonthlygrid
      );
    });

    setPurchasedyearlygrid(0);
    props.data.map((item) => {
      setPurchasedyearlygrid(
        (purchasedyearlygrid) => purchasedyearlygrid + item.purchasedyearlygrid
      );
    });

    setPurchasedtotalgrid(0);
    props.data.map((item) => {
      setPurchasedtotalgrid(
        (purchasedtotalgrid) => purchasedtotalgrid + item.purchasedtotalgrid
      );
    });
  }, [
    props.data,
    grid,
    feedindailygrid,
    feedinmonthlygrid,
    feedinyearlygrid,
    feedintotalgrid,
    purchaseddailygrid,
    purchasedmonthlygrid,
    purchasedyearlygrid,
    purchasedtotalgrid,
  ]);

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Grid">
      <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Data">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Data_Img">
          <img src="/dat_picture/grid.png" alt="" />
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Data_Data">
          Lưới <span>{grid}</span> W
        </div>
      </div>

      <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row">
        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left"
          style={{ backgroundColor: "rgb(245, 251, 255)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Tit">
            Nạp vào
          </div>
          <div
            style={{
              borderLeft: "solid 1px rgb(231, 231, 231)",
            }}
          />
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Hôm nay
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              {feedindailygrid} kWh
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Tháng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              {feedinmonthlygrid} kWh
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Năm
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              {feedinyearlygrid} kWh
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Tổng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              {feedintotalgrid} kWh
            </div>
          </div>
        </div>

        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left"
          style={{ backgroundColor: "rgb(245, 251, 255)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Tit">
            Bán ra
          </div>
          <div
            style={{
              borderLeft: "solid 1px rgb(231, 231, 231)",
            }}
          />
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Hôm nay
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              {purchaseddailygrid} kWh
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Tháng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              {purchasedmonthlygrid} kWh
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Năm
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              {purchasedyearlygrid} kWh
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Tổng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              {purchasedtotalgrid} kWh
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Battery = (props) => {
  const [battery, setBattery] = useState(0);
  const [chargedailybattery, setChargedailybattery] = useState(0);
  const [chargemonthlybattery, setChargemonthlybattery] = useState(0);
  const [chargeyearlybattery, setChargeyearlybattery] = useState(0);
  const [chargetotalbattery, setChargetotalbattery] = useState(0);
  const [dischargedailybattery, setDischargedailybattery] = useState(0);
  const [dischargemonthlybattery, setDischargemonthlybattery] = useState(0);
  const [dischargeyearlybattery, setDischargeyearlybattery] = useState(0);
  const [dischargetotalbattery, setDischargetotalbattery] = useState(0);

  useEffect(() => {
    setBattery(0);
    props.data.map((item) => {
      setBattery((battery) => battery + item.battery);
    });

    setChargedailybattery(0);
    props.data.map((item) => {
      setChargedailybattery(
        (chargedailybattery) => chargedailybattery + item.chargedailybattery
      );
    });

    setChargemonthlybattery(0);
    props.data.map((item) => {
      setChargemonthlybattery(
        (chargemonthlybattery) =>
          chargemonthlybattery + item.chargemonthlybattery
      );
    });

    setChargeyearlybattery(0);
    props.data.map((item) => {
      setChargeyearlybattery(
        (chargeyearlybattery) => chargeyearlybattery + item.chargeyearlybattery
      );
    });

    setChargetotalbattery(0);
    props.data.map((item) => {
      setChargetotalbattery(
        (chargetotalbattery) => chargetotalbattery + item.chargetotalbattery
      );
    });

    setDischargedailybattery(0);
    props.data.map((item) => {
      setDischargedailybattery(
        (dischargedailybattery) =>
          dischargedailybattery + item.dischargedailybattery
      );
    });

    setDischargemonthlybattery(0);
    props.data.map((item) => {
      setDischargemonthlybattery(
        (dischargemonthlybattery) =>
          dischargemonthlybattery + item.dischargemonthlybattery
      );
    });

    setDischargeyearlybattery(0);
    props.data.map((item) => {
      setDischargeyearlybattery(
        (dischargeyearlybattery) =>
          dischargeyearlybattery + item.dischargeyearlybattery
      );
    });

    setDischargetotalbattery(0);
    props.data.map((item) => {
      setDischargetotalbattery(
        (dischargetotalbattery) =>
          dischargetotalbattery + item.dischargetotalbattery
      );
    });
  }, [
    props.data,
    battery,
    chargedailybattery,
    chargemonthlybattery,
    chargeyearlybattery,
    chargetotalbattery,
    dischargedailybattery,
    dischargemonthlybattery,
    dischargeyearlybattery,
    dischargetotalbattery,
  ]);

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Battery">
      <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Data">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Data_Img">
          <img src="/dat_picture/battery.png" alt="" />
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Data_Status">
          Sạc 95%
          <LiaLongArrowAltLeftSolid size={30} />
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Data_Data">
          Pin <span>{battery}</span> W
        </div>
      </div>

      <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row">
        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left"
          style={{ backgroundColor: "rgb(245, 251, 255)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Tit">
            Sạc điện
          </div>
          <div
            style={{
              borderLeft: "solid 1px rgb(231, 231, 231)",
            }}
          />
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Hôm nay
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              {chargedailybattery} kWh
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Tháng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              {chargemonthlybattery} kWh
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Năm
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              {chargeyearlybattery} kWh
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Tổng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              {chargetotalbattery} kWh
            </div>
          </div>
        </div>

        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left"
          style={{ backgroundColor: "rgb(245, 251, 255)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Tit">
            Phóng điện
          </div>
          <div
            style={{
              borderLeft: "solid 1px rgb(231, 231, 231)",
            }}
          />
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Hôm nay
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              {dischargedailybattery} kWh
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Tháng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              {dischargemonthlybattery} kWh
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Năm
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              {dischargeyearlybattery} kWh
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Tổng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              {dischargetotalbattery} kWh
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
    <div className="DAT_ProjectData_Dashboard_History_Day">
      <div className="DAT_ProjectData_Dashboard_History_Year_Tit">
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Unit">
          kWh
        </div>
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Label">
          Sản lượng ngày: 24.3 kWh
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_History_Year_Chart">
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
    <div className="DAT_ProjectData_Dashboard_History_Year">
      <div className="DAT_ProjectData_Dashboard_History_Year_Tit">
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Unit">
          kWh
        </div>
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Label">
          Sản lượng tháng: 775.327 kWh
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_History_Year_Chart">
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
  const v = "Sản lượng năm";

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
    <div className="DAT_ProjectData_Dashboard_History_Year">
      <div className="DAT_ProjectData_Dashboard_History_Year_Tit">
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Unit">
          MWh
        </div>
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Label">
          Sản lượng năm: 1.69 MWh
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_History_Year_Chart">
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
    <div className="DAT_ProjectData_Dashboard_History_Year">
      <div className="DAT_ProjectData_Dashboard_History_Year_Tit">
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Unit">
          MWh
        </div>
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Label">
          Sản lượng tổng: 13.69 MWh
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_History_Year_Chart">
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
  const handleDate = (e) => {
    var id = e.currentTarget.id;
    setDate(id);
  };

  const [view, setView] = useState("dashboard");
  const handleView = (e) => {
    var id = e.currentTarget.id;
    setView(id);
  };

  const tit = {
    dashboard: projectData.value.name,
    device: "Thiết bị",
    alert: "Cảnh báo",
  };

  const [configname, setConfigname] = useState("Chọn thông số");
  const [dropConfig, setDropConfig] = useState(false);
  const handleShowConfig = (e) => {
    if (configname === "Chọn thông số") {
      setConfigname("Thu gọn");
    } else if (configname === "Thu gọn") {
      setConfigname("Chọn thông số");
    }
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Số hàng",
    rangeSeparatorText: "đến",
    selectAllRowsItem: true,
    selectAllRowsItemText: "tất cả",
  };

  const dataInverter = [
    {
      id: 1,
      SN: "I0000145",
      name: "Inverter 01",
      plant: "Năng lượng DAT 01",
      status: true,
      production: "16",
      dailyproduction: "123.4",
      updated: "12/30/2023 12:07:12",
    },
    {
      id: 2,
      SN: "I0000012",
      name: "Inverter 02",
      plant: "Năng lượng DAT 01",
      status: true,
      production: "18",
      dailyproduction: "238.4",
      updated: "12/30/2023 12:07:12",
    },
    {
      id: 3,
      SN: "I0000001",
      name: "Inverter 03",
      plant: "Năng lượng DAT 01",
      status: false,
      production: "562",
      dailyproduction: "897.4",
      updated: "12/30/2023 12:07:12",
    },
  ];

  const columnInverter = [
    {
      name: "Tên",
      selector: (row) => (
        <div>
          <div>{row.name}</div>
          <div>{row.SN}</div>
        </div>
      ),
      sortable: true,
      // minWidth: "350px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Trạng thái",
      selector: (row) => (
        <>
          {row.status ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </>
      ),
      // width: "110px",
    },
    {
      name: "Sản lượng(kW)",
      selector: (row) => row.production,
      sortable: true,
      // width: "140px",
    },
    {
      name: "SL tức thời(kWh)",
      selector: (row) => row.dailyproduction,
      sortable: true,
      // width: "150px",
    },
    {
      name: "Hiệu suất",
      selector: (row) => "--",
      sortable: true,
    },
    {
      name: "Lần cập nhật cuối",
      selector: (row) => row.updated,
      sortable: true,
      // width: "180px",
    },
  ];

  const dataMeter = [
    // {
    //   id: 1,
    //   SN: "M0000223",
    //   name: "Meter 01",
    //   plant: "Năng lượng DAT 02",
    //   status: true,
    //   production: "66",
    //   dailyproduction: "895.4",
    //   updated: "12/30/2023 12:07:12",
    // },
    // {
    //   id: 2,
    //   SN: "M0000009",
    //   name: "Meter 02",
    //   plant: "Năng lượng DAT 02",
    //   status: true,
    //   production: "18",
    //   dailyproduction: "1238.4",
    //   updated: "12/30/2023 12:07:12",
    // },
    // {
    //   id: 3,
    //   SN: "M0000327",
    //   name: "Meter 03",
    //   plant: "Năng lượng DAT 02",
    //   status: true,
    //   production: "45",
    //   dailyproduction: "1024.4",
    //   updated: "12/30/2023 12:07:12",
    // },
  ];

  const columnMeter = [
    {
      name: "Tên",
      selector: (row) => (
        <div>
          <div>{row.name}</div>
          <div>{row.SN}</div>
        </div>
      ),
      sortable: true,
      // minWidth: "350px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Trạng thái",
      selector: (row) => (
        <>
          {row.status ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </>
      ),
      // width: "110px",
    },
    {
      name: "Sản lượng(kW)",
      selector: (row) => row.production,
      sortable: true,
      // width: "140px",
    },
    {
      name: "SL tức thời(kWh)",
      selector: (row) => row.dailyproduction,
      sortable: true,
      // width: "150px",
    },
    {
      name: "Hiệu suất",
      selector: (row) => "--",
      sortable: true,
    },
    {
      name: "Lần cập nhật cuối",
      selector: (row) => row.updated,
      sortable: true,
      // width: "180px",
    },
  ];

  const dataLogger = [
    {
      id: 1,
      SN: "L0000102",
      name: "Logger 01",
      plant: "Năng lượng DAT 01",
      status: true,
      updated: "12/30/2023 12:07:12",
    },
    {
      id: 2,
      SN: "L0000101",
      name: "Logger 02",
      plant: "Năng lượng DAT 01",
      status: true,
      updated: "12/30/2023 12:07:12",
    },
    {
      id: 3,
      SN: "L0000103",
      name: "Logger 03",
      plant: "Năng lượng DAT 02",
      status: false,
      updated: "12/30/2023 12:07:12",
    },
  ];

  const columnLogger = [
    {
      name: "Tên",
      selector: (row) => (
        <div>
          <div>{row.name}</div>
          <div>{row.SN}</div>
        </div>
      ),
      sortable: true,
      // minWidth: "350px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Trạng thái",
      selector: (row) => (
        <>
          {row.status ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </>
      ),
      // width: "110px",
    },
    {
      name: "Lần cập nhật cuối",
      selector: (row) => row.updated,
      sortable: true,
      // width: "180px",
    },
  ];

  const listDeviceTab = [
    { id: "inverter", name: "Inverter" },
    { id: "meter", name: "Meter" },
    { id: "logger", name: "Logger" },
  ];

  const handleTabMobileDevice = (e) => {
    const id = e.currentTarget.id;
    tab.value = id;
    const newLabel = listDeviceTab.find((item) => item.id == id);
    tabLable.value = newLabel.name;
  };

  const listAlertTab = [
    { id: "all", name: "Tất cả" },
    { id: "open", name: "Mở" },
    { id: "closed", name: "Đóng" },
  ];

  const handleTabMobileAlert = (e) => {
    const id = e.currentTarget.id;
    tabAlert.value = id;
    const newLabel = listAlertTab.find((item) => item.id == id);
    tabLableAlert.value = newLabel.name;
  };

  const dataAlert = [
    {
      id: 1,
      name: "Input UV",
      status: true,
      importance: "Cao",
      device: "Inverter 01",
      SN: "I0000145",
      openedtime: "12/30/2023 12:07:12",
      closedtime: "12/30/2023 15:07:12",
    },
    {
      id: 2,
      name: "Cmd Shut",
      status: false,
      importance: "Thấp",
      device: "Inverter 01",
      SN: "I0000145",
      openedtime: "12/30/2023 12:07:12",
      closedtime: "12/30/2023 15:07:12",
    },
  ];

  const columnAlert = [
    {
      name: "Tên",
      selector: (row) => (
        <div>
          <div>{row.name}</div>
        </div>
      ),
      sortable: true,
      // minWidth: "350px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Trạng thái",
      selector: (row) => (
        <>
          {row.status ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </>
      ),
      // width: "110px",
    },
    {
      name: "Mức quan trọng",
      selector: (row) => row.importance,
      sortable: true,
      // width: "140px",
    },
    {
      name: "Thiết bị",
      selector: (row) => (
        <div>
          <div>{row.device}</div>
          <div>{row.SN}</div>
        </div>
      ),
      sortable: true,
      // width: "150px",
    },
    {
      name: "Giờ mở",
      selector: (row) => row.openedtime,
      sortable: true,
    },
    {
      name: "Giờ đóng",
      selector: (row) => row.closedtime,
      sortable: true,
      // width: "180px",
    },
  ];

  useEffect(() => {
    open.value = dataAlert.filter((item) => item.status == true);
    close.value = dataAlert.filter((item) => item.status == false);
    tabLableAlert.value = listAlertTab[0].name;
  }, []);

  const handleOutsideAdd = () => {
    setTimeout(() => {
      if (addStateNav.value[1] == false) {
        addNav.value = false;
        addStateNav.value = [false, false];
      }
    }, 250);
  };

  const handleAddGateway = (e) => {
    popupAddGateway.value = true;
  };

  const handleAddSubsystem = (e) => {
    popupAddSubsystem.value = true;
  };

  const [temp, setTemp] = useState({});

  useEffect(() => {
    setTemp([]);
    deviceData.value.map((item) => {
      const db = device.value.find((data) => data.SN === item.SN);
      setTemp((old) => [...old, db]);
    });
  }, []);

  // useEffect(() => {
  //   console.log(temp);
  // }, [temp]);

  return (
    <>
      <div className="DAT_ProjectData">
        {isMobile.value ? (
          <div className="DAT_ProjectData_Header">
            {(() => {
              switch (view) {
                case "dashboard":
                  return (
                    <div className="DAT_ProjectData_Header_LeftDashboard">
                      <div style={{ fontSize: 22, paddingBottom: 5 }}>
                        {tit[view]}
                      </div>

                      <div style={{ color: "grey", fontSize: 14 }}>
                        Cập nhật lần cuối {projectData.value.lastupdate}
                      </div>
                    </div>
                  );
                case "device":
                  return (
                    <div className="DAT_ProjectData_Header_LeftDevice">
                      <div style={{ fontSize: 22 }}>{tit[view]}</div>
                    </div>
                  );
                case "alert":
                  return (
                    <div className="DAT_ProjectData_Header_LeftAlert">
                      <div style={{ fontSize: 22 }}>{tit[view]}</div>
                    </div>
                  );
                default:
                  <></>;
              }
            })()}

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
            {(() => {
              switch (view) {
                case "dashboard":
                  return (
                    <div className="DAT_ProjectData_Header_LeftDashboard">
                      <div style={{ fontSize: 22, paddingBottom: 5 }}>
                        {tit[view]}
                      </div>

                      <div style={{ color: "grey", fontSize: 14 }}>
                        Cập nhật lần cuối {projectData.value.lastupdate}
                      </div>
                    </div>
                  );
                case "device":
                  return (
                    <div className="DAT_ProjectData_Header_LeftDevice">
                      <div style={{ fontSize: 22 }}>{tit[view]}</div>

                      {/* <div className="DAT_ProjectData_Header_LeftDevice_Item">
                        <button>Rút gọn</button>
                        <button>Đầy đủ</button>
                      </div> */}
                    </div>
                  );
                case "alert":
                  return (
                    <div className="DAT_ProjectData_Header_LeftAlert">
                      <div style={{ fontSize: 22 }}>{tit[view]}</div>
                    </div>
                  );
                default:
                  <></>;
              }
            })()}

            <div className="DAT_ProjectData_Header_Right">
              <div
                className="DAT_ProjectData_Header_Right_Dashboard"
                id="dashboard"
                onClick={(e) => handleView(e)}
              >
                <AiOutlineDashboard size={20} color="white" />
              </div>
              <div
                className="DAT_ProjectData_Header_Right_Device"
                id="device"
                onClick={(e) => handleView(e)}
              >
                <BsMenuButtonWide size={14} color="white" />
              </div>
              <div
                className="DAT_ProjectData_Header_Right_Alert"
                id="alert"
                onClick={(e) => handleView(e)}
              >
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

        {(() => {
          switch (view) {
            case "dashboard":
              return (
                <div className="DAT_ProjectData_Dashboard">
                  <div className="DAT_ProjectData_Dashboard_Data">
                    <div className="DAT_ProjectData_Dashboard_Data_Left">
                      <div className="DAT_ProjectData_Dashboard_Data_Left_Img">
                        <img src="/dat_picture/solar_panel.png" alt="" />
                      </div>

                      <div className="DAT_ProjectData_Dashboard_Data_Left_Info">
                        <div
                          className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr"
                          style={{ marginBottom: "16px" }}
                        >
                          <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Title">
                            Địa chỉ
                          </div>
                          <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Content">
                            {projectData.value.addr}
                          </div>
                        </div>

                        <div
                          className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr"
                          style={{ marginBottom: "16px" }}
                        >
                          <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Title">
                            Trạng thái
                          </div>
                          <div
                            className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Content"
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
                          className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr"
                          style={{ marginBottom: "16px" }}
                        >
                          <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Title">
                            Loại Dự Án
                          </div>
                          <div
                            className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Content"
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
                    className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr"
                    style={{ marginBottom: "16px" }}
                  >
                    <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Title">
                      Loại Hệ Thống
                    </div>
                    <div
                      className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Content"
                      style={{ textAlign: "right" }}
                    >
                      --
                    </div>
                  </div> */}

                        <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr">
                          <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Title">
                            Số Điện Thoại
                          </div>
                          <div
                            className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Content"
                            style={{ textAlign: "right" }}
                          >
                            {projectData.value.phone}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="DAT_ProjectData_Dashboard_Data_Center">
                      <div className="DAT_ProjectData_Dashboard_Data_Center_Tit">
                        <div
                          className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item"
                          id="graph"
                          style={{
                            color: nav === "graph" ? color.cur : color.pre,
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          Đồ thị
                        </div>
                        <div
                          className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item"
                          id="production"
                          style={{
                            color: nav === "production" ? color.cur : color.pre,
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          Sản xuất
                        </div>
                        <div
                          className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item"
                          id="consumption"
                          style={{
                            color:
                              nav === "consumption" ? color.cur : color.pre,
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          Tiêu thụ
                        </div>
                        <div
                          className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item"
                          id="grid"
                          style={{
                            color: nav === "grid" ? color.cur : color.pre,
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          Lưới
                        </div>
                        <div
                          className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item"
                          id="battery"
                          style={{
                            color: nav === "battery" ? color.cur : color.pre,
                          }}
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
                            return <Production data={temp} />;
                          case "consumption":
                            return <Consumption data={temp} />;
                          case "grid":
                            return <Grid data={temp} />;
                          case "battery":
                            return <Battery data={temp} />;
                          default:
                            <></>;
                        }
                      })()}
                    </div>

                    <div className="DAT_ProjectData_Dashboard_Data_Right">
                      <div className="DAT_ProjectData_Dashboard_Data_Right_Weather">
                        <Weather />
                      </div>
                    </div>
                  </div>

                  <div className="DAT_ProjectData_Dashboard_History">
                    <div className="DAT_ProjectData_Dashboard_History_Tit">
                      <div className="DAT_ProjectData_Dashboard_History_Tit_Left">
                        Lịch sử
                      </div>

                      <div className="DAT_ProjectData_Dashboard_History_Tit_Right">
                        <div className="DAT_ProjectData_Dashboard_History_Tit_Right_Date">
                          <div
                            className="DAT_ProjectData_Dashboard_History_Tit_Right_Date_Item"
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
                            className="DAT_ProjectData_Dashboard_History_Tit_Right_Date_Item"
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
                            className="DAT_ProjectData_Dashboard_History_Tit_Right_Date_Item"
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
                            className="DAT_ProjectData_Dashboard_History_Tit_Right_Date_Item"
                            id="total"
                            style={{
                              color: date === "total" ? color.cur : color.pre,
                            }}
                            onClick={(e) => handleDate(e)}
                          >
                            Tổng
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={(e) => {
                              handleShowConfig(e);
                              setDropConfig(!dropConfig);
                            }}
                          >
                            {configname}
                          </button>
                        </div>
                        <div className="DAT_ProjectData_Dashboard_History_Tit_Right_Export">
                          <button>Xuất Báo Cáo</button>
                        </div>
                        <input
                          defaultValue={moment(new Date()).format("YYYY-MM-DD")}
                          type="date"
                        ></input>
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
                        default:
                          <></>;
                      }
                    })()}
                    <div
                      className="DAT_ProjectData_Dashboard_History_SubConfig"
                      style={{
                        height: dropConfig ? "500px" : "0px",
                        transition: "0.5s",
                      }}
                    >
                      {dropConfig ? (
                        <div
                          className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown"
                          style={{
                            height: dropConfig ? "200px" : "0px",
                            transition: "0.5s",
                          }}
                        >
                          <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Search">
                            <input
                              type="text"
                              placeholder="Search by parameter name"
                            ></input>
                            <CiSearch size={20} />
                          </div>
                          <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item">
                            <table className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table">
                              <tbody>
                                <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                  <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                    Production
                                  </th>
                                  <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                    <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                      <input
                                        id="Production"
                                        type="checkbox"
                                      ></input>
                                      <label htmlFor="Production">
                                        Production
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                  <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                    Environment
                                  </th>
                                  <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                    <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                      <input
                                        id="Weather"
                                        type="checkbox"
                                      ></input>
                                      <label htmlFor="Weather">Weather</label>
                                    </div>
                                    <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                      <input
                                        id="Temperature"
                                        type="checkbox"
                                      ></input>
                                      <label htmlFor="Temperature">
                                        Temperature
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>

                  <div className="DAT_ProjectData_Dashboard_More">
                    <div className="DAT_ProjectData_Dashboard_More_Left">
                      <div className="DAT_ProjectData_Dashboard_More_Left_Tit">
                        <span>Trình tự công việc</span>
                        <div className="DAT_ProjectData_Dashboard_More_Left_Tit_Button">
                          <IoArrowForward />
                        </div>
                      </div>

                      <div className="DAT_ProjectData_Dashboard_More_Left_Content">
                        <div className="DAT_ProjectData_Dashboard_More_Left_Content_Item">
                          <div
                            className="DAT_ProjectData_Dashboard_More_Left_Content_Item_Value"
                            style={{
                              textAlign: "center",
                              fontSize: "32px",
                              color: "#048FFF",
                            }}
                          >
                            0
                          </div>

                          <div
                            className="DAT_ProjectData_Dashboard_More_Left_Content_Item_Detail"
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

                        <div className="DAT_ProjectData_Dashboard_More_Left_Content_Item">
                          <div
                            className="DAT_ProjectData_Dashboard_More_Left_Content_Item_Value"
                            style={{
                              textAlign: "center",
                              fontSize: "32px",
                              color: "#41D068",
                            }}
                          >
                            0
                          </div>

                          <div
                            className="DAT_ProjectData_Dashboard_More_Left_Content_Item_Detail"
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

                    <div className="DAT_ProjectData_Dashboard_More_Right">
                      <div className="DAT_ProjectData_Dashboard_More_Right_Tit">
                        Lợi ích môi trường và kinh tế
                      </div>

                      <div className="DAT_ProjectData_Dashboard_More_Right_Content">
                        <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col">
                          <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item_Icon">
                              <MdPermDataSetting size={24} color="#6495ed" />
                            </div>
                            <div>
                              <div style={{ fontSize: "14px", color: "grey" }}>
                                Thang đo tiêu chuẩn
                              </div>
                              <div>--</div>
                            </div>
                          </div>
                          <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item_Icon">
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

                        <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col">
                          <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item_Icon">
                              <IoIosCloud size={24} color="#6495ed" />
                            </div>
                            <div>
                              <div style={{ fontSize: "14px", color: "grey" }}>
                                Giảm khí thải CO₂
                              </div>
                              <div>--</div>
                            </div>
                          </div>
                          <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item_Icon">
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
              );
            case "device":
              return (
                <div className="DAT_ProjectData_Device">
                  <div className="DAT_ProjectData_Device_Analysis">
                    <div className="DAT_ProjectData_Device_Analysis_Func">
                      <div className="DAT_ProjectData_Device_Analysis_Func_Select">
                        <select>
                          <option hidden>Trạng thái</option>
                          <option>Tất cả</option>
                          <option>Online</option>
                          <option>Cảnh báo</option>
                          <option>Offline</option>
                        </select>
                        <select>
                          <option hidden>Hiệu suất</option>
                          <option>Tắt</option>
                          <option>Rất thấp</option>
                          <option>Thấp</option>
                          <option>Bình thường</option>
                        </select>
                      </div>
                      <button
                        id="add"
                        onMouseEnter={() => {
                          addNav.value = true;
                          addStateNav.value = [true, false];
                        }}
                        onMouseLeave={() => handleOutsideAdd()}
                      >
                        Thêm
                      </button>
                    </div>

                    <div className="DAT_ProjectData_Device_Analysis_Table">
                      {isMobile.value ? (
                        <div className="DAT_Toollist_Tab_Mobile">
                          <button
                            className="DAT_Toollist_Tab_Mobile_content"
                            onClick={() => (tabMobile.value = !tabMobile.value)}
                          >
                            <span> {tabLable.value}</span>
                            {tabMobile.value ? (
                              <IoIosArrowDown />
                            ) : (
                              <IoIosArrowForward />
                            )}
                          </button>
                          <div className="DAT_Toollist_Tab_Mobile_list">
                            {listDeviceTab.map((item, i) => {
                              return (
                                <div
                                  className="DAT_Toollist_Tab_Mobile_list_item"
                                  style={{
                                    display: tabMobile.value ? "block" : "none",
                                  }}
                                  key={"tabmobile_" + i}
                                  id={item.id}
                                  onClick={(e) => handleTabMobileDevice(e)}
                                >
                                  {i + 1}: {item.name}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="DAT_Toollist_Tab">
                          {listDeviceTab.map((item, i) => {
                            return tab.value === item.id ? (
                              <div
                                key={"tab_" + i}
                                className="DAT_Toollist_Tab_main"
                              >
                                <p className="DAT_Toollist_Tab_main_left"></p>
                                <span
                                  className="DAT_Toollist_Tab_main_content1"
                                  id={item.id}
                                  style={{
                                    backgroundColor: "White",
                                    color: "black",
                                    borderRadius: "10px 10px 0 0",
                                  }}
                                  onClick={(e) => (tab.value = item.id)}
                                >
                                  {item.name}
                                </span>
                                <p className="DAT_Toollist_Tab_main_right"></p>
                              </div>
                            ) : (
                              <span
                                className="DAT_Toollist_Tab_main_content2"
                                key={"tab_" + i}
                                id={item.id}
                                style={{ backgroundColor: "#dadada" }}
                                onClick={(e) => (tab.value = item.id)}
                              >
                                {item.name}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      <div className="DAT_ProjectData_Device_Analysis_Table_Content">
                        {(() => {
                          switch (tab.value) {
                            case "inverter":
                              return (
                                <DataTable
                                  className="DAT_Table_Device"
                                  columns={columnInverter}
                                  data={dataInverter}
                                  pagination
                                  paginationComponentOptions={
                                    paginationComponentOptions
                                  }
                                  fixedHeader={true}
                                  noDataComponent={<Empty />}
                                />
                              );
                            case "meter":
                              return (
                                <DataTable
                                  className="DAT_Table_Device"
                                  columns={columnMeter}
                                  data={dataMeter}
                                  pagination
                                  paginationComponentOptions={
                                    paginationComponentOptions
                                  }
                                  fixedHeader={true}
                                  noDataComponent={<Empty />}
                                />
                              );
                            case "logger":
                              return (
                                <DataTable
                                  className="DAT_Table_Device"
                                  columns={columnLogger}
                                  data={dataLogger}
                                  pagination
                                  paginationComponentOptions={
                                    paginationComponentOptions
                                  }
                                  fixedHeader={true}
                                  noDataComponent={<Empty />}
                                />
                              );
                            default:
                              return <></>;
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            case "alert":
              return (
                <div className="DAT_ProjectData_Alert">
                  <div className="DAT_ProjectData_Alert_Data">
                    {isMobile.value ? (
                      <div className="DAT_Toollist_Tab_Mobile">
                        <button
                          className="DAT_Toollist_Tab_Mobile_content"
                          onClick={() =>
                            (tabMobileAlert.value = !tabMobileAlert.value)
                          }
                        >
                          <span> {tabLableAlert.value}</span>
                          {tabMobileAlert.value ? (
                            <IoIosArrowDown />
                          ) : (
                            <IoIosArrowForward />
                          )}
                        </button>
                        <div className="DAT_Toollist_Tab_Mobile_list">
                          {listAlertTab.map((item, i) => {
                            return (
                              <div
                                className="DAT_Toollist_Tab_Mobile_list_item"
                                style={{
                                  display: tabMobileAlert.value
                                    ? "block"
                                    : "none",
                                }}
                                key={"tabmobile_" + i}
                                id={item.id}
                                onClick={(e) => handleTabMobileAlert(e)}
                              >
                                {i + 1}: {item.name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="DAT_Toollist_Tab">
                        {listAlertTab.map((item, i) => {
                          return tabAlert.value === item.id ? (
                            <div
                              key={"tab_" + i}
                              className="DAT_Toollist_Tab_main"
                            >
                              <p className="DAT_Toollist_Tab_main_left"></p>
                              <span
                                className="DAT_Toollist_Tab_main_content1"
                                id={item.id}
                                style={{
                                  backgroundColor: "White",
                                  color: "black",
                                  borderRadius: "10px 10px 0 0",
                                }}
                                onClick={(e) => (tabAlert.value = item.id)}
                              >
                                {item.name}
                              </span>
                              <p className="DAT_Toollist_Tab_main_right"></p>
                            </div>
                          ) : (
                            <span
                              className="DAT_Toollist_Tab_main_content2"
                              key={"tab_" + i}
                              id={item.id}
                              style={{ backgroundColor: "#dadada" }}
                              onClick={(e) => (tabAlert.value = item.id)}
                            >
                              {item.name}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    <div className="DAT_ProjectData_Alert_Data_Table">
                      {(() => {
                        switch (tabAlert.value) {
                          case "all":
                            return (
                              <DataTable
                                className="DAT_Table_Alert"
                                columns={columnAlert}
                                data={dataAlert}
                                pagination
                                paginationComponentOptions={
                                  paginationComponentOptions
                                }
                                fixedHeader={true}
                                noDataComponent={<Empty />}
                              />
                            );
                          case "open":
                            return (
                              <DataTable
                                className="DAT_Table_Alert"
                                columns={columnAlert}
                                data={open.value}
                                pagination
                                paginationComponentOptions={
                                  paginationComponentOptions
                                }
                                fixedHeader={true}
                                noDataComponent={<Empty />}
                              />
                            );
                          case "closed":
                            return (
                              <DataTable
                                className="DAT_Table_Alert"
                                columns={columnAlert}
                                data={close.value}
                                pagination
                                paginationComponentOptions={
                                  paginationComponentOptions
                                }
                                fixedHeader={true}
                                noDataComponent={<Empty />}
                              />
                            );
                          default:
                            return <></>;
                        }
                      })()}
                    </div>
                  </div>
                </div>
              );
            default:
              <></>;
          }
        })()}
      </div>

      <div
        className="DAT_AddNav"
        style={{ display: addNav.value ? "block" : "none" }}
        onMouseEnter={() => (addStateNav.value = [true, true])}
        onMouseLeave={() => {
          addNav.value = false;
          addStateNav.value = [false, false];
        }}
      >
        <div className="DAT_AddNav-item">
          <span onClick={(e) => handleAddGateway(e)}>Thêm Gateway/Logger</span>
        </div>
        <div className="DAT_AddNav-item">
          <span onClick={(e) => handleAddSubsystem(e)}>Thêm Subsystem</span>
        </div>
      </div>

      {popupAddGateway.value ? (
        <div className="DAT_AddGatewayPopup">
          <AddGateway />
        </div>
      ) : (
        <></>
      )}

      {popupAddSubsystem.value ? (
        <div className="DAT_AddGatewayPopup">
          <AddSubsystem />
        </div>
      ) : (
        <></>
      )}

      {isMobile.value ? (
        <>
          {dropState.value ? (
            <div className="DAT_ProjectDataDrop">
              <div
                className="DAT_ProjectDataDrop_Dashboard"
                id="dashboard"
                onClick={(e) => handleView(e)}
              >
                <AiOutlineDashboard size={20} color="white" />
              </div>
              <div
                className="DAT_ProjectDataDrop_Device"
                id="device"
                onClick={(e) => handleView(e)}
              >
                <BsMenuButtonWide size={20} color="white" />
              </div>
              <div
                className="DAT_ProjectDataDrop_Alert"
                id="alert"
                onClick={(e) => handleView(e)}
              >
                <GoAlertFill size={20} color="white" />
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {dropState.value ? (
            <div className="DAT_ProjectDataDrop">
              {/* <div className="DAT_ProjectDataDrop_Item">Xem chi tiết</div>
              <div className="DAT_ProjectDataDrop_Item">Xem chi tiết</div>
              <div className="DAT_ProjectDataDrop_Item">Xem chi tiết</div> */}
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
