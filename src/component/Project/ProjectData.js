import React, { useEffect, useState, useRef } from "react";
import "./Project.scss";

import AddGateway from "./AddGateway";
import { Empty, plantState, projectData, popupState } from "./Project";
import { isMobile } from "../Navigation/Navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, } from "recharts";
import { signal } from "@preact/signals-react";
import DataTable from "react-data-table-component";
import moment from "moment-timezone";
import Weather from "./Weather";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { Token, convertUnit, ruleInfor, showUnit, showUnitk, } from "../../App";
import axios from "axios";
import Popup from "./Popup";
import { useIntl } from "react-intl";
import { info, infoState, tab } from "../Device/Device";
import Info from "../Device/Info";
import PopupState, { bindHover, bindPopper } from "material-ui-popup-state";
import { Fade, Paper, Popper, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExportData from "./ExportData";

import { IoIosArrowDown, IoIosArrowForward, IoIosCloud, IoMdMore, } from "react-icons/io";
import { IoAddOutline, IoCalendarOutline, IoClose, IoTrashOutline, } from "react-icons/io5";
import { MdDelete, MdEdit, MdOutlineError, } from "react-icons/md";
import { FaCheckCircle, FaMoneyBill, FaTree } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { GiCoalWagon } from "react-icons/gi";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { CiClock1 } from "react-icons/ci";

export const dropState = signal(false);
export const popupAddGateway = signal(false);
export const popupAddSubsystem = signal(false);
export const temp = signal([]);
export const inverterDB = signal([]);
export const coalsave = signal({
  value: 1,
  ef: 0.7221,
  avr: 0.517,
  tree: 0.054,
});

const tabMobile = signal(false);
const tabLable = signal("");
const tab_ = signal("logger");
const tabMobileAlert = signal(false);
const tabLableAlert = signal("");
const tabAlert = signal("all");
const open = signal([]);
const close = signal([]);
const cal = signal({});

const dataMeter = [];

const dataAlert = [];

const filterchart = signal({
  grid: {
    date: {
      productionData: true,
    },
    month: {
      productionData: true,
    },
    year: {
      productionData: true,
    },
    total: {
      productionData: true,
    },
  },
  consumption: {
    date: {
      productionData: true,
      gridData: true,
      consumptionData: true,


    },
    month: {
      productionData: true,
      consumptionData: true,
      dailygridin: true,
      dailygridout: true,

    },
    year: {
      productionData: true,
      consumptionData: true,
      dailygridin: true,
      dailygridout: true,

    },
    total: {
      productionData: true,
      consumptionData: true,
      dailygridin: true,
      dailygridout: true,

    },
  },
  hybrid: {
    date: {
      productionData: true,
      gridData: true,
      consumptionData: true,
      batteryData: true,
    },
    month: {
      productionData: true,
      consumptionData: true,
      dailygridin: true,
      dailygridout: true,
      charge: true,
      discharge: true,
    },
    year: {
      productionData: true,
      consumptionData: true,
      dailygridin: true,
      dailygridout: true,
      charge: true,
      discharge: true,
    },
    total: {
      productionData: true,
      consumptionData: true,
      dailygridin: true,
      dailygridout: true,
      charge: true,
      discharge: true,
    },
  },
});

export default function ProjectData(props) {
  const dataLang = useIntl();
  const lang = useSelector((state) => state.admin.lang);
  const user = useSelector((state) => state.admin.usr);
  // const [nav, setNav] = useState(projectData.value.plantmode === "grid" ? "production" : "graph");
  const [nav, setNav] = useState("production");
  const [timeRemaining, setTimeRemaining] = useState(300000);
  const [dateType, setDateType] = useState("date");
  const [view, setView] = useState("dashboard");
  const [configname, setConfigname] = useState(
    dataLang.formatMessage({ id: "choosePara" })
  );
  const [dropConfig, setDropConfig] = useState(false);
  // const [tempInverter, setTempInverter] = useState([]);
  const [dataDay, setDataDay] = useState([]);
  const [vDay, setVDay] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vDay2, setVDay2] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vDay3, setVDay3] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vDay4, setVDay4] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [dataMonth, setDataMonth] = useState([]);
  const [vMonth, setVMonth] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vMonth2, setVMonth2] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vMonth3, setVMonth3] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vMonth4, setVMonth4] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vMonth5, setVMonth5] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vMonth6, setVMonth6] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [dataYear, setDataYear] = useState([]);
  const [vYear, setVYear] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vYear2, setVYear2] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vYear3, setVYear3] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vYear4, setVYear4] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vYear5, setVYear5] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vYear6, setVYear6] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [dataTotal, setDataTotal] = useState([]);
  const [vTotal, setVTotal] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vTotal2, setVTotal2] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vTotal3, setVTotal3] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vTotal4, setVTotal4] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vTotal5, setVTotal5] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [vTotal6, setVTotal6] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [snlogger, setSnlogger] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [exportReport, setExportReport] = useState(false);
  const [type, setType] = useState("");
  const [invt, setInvt] = useState({});
  const box = useRef();

  const [d, setD] = useState({
    date: moment(new Date()).format("MM/DD/YYYY"),
    month: moment(new Date()).format("MM/YYYY"),
    year: moment(new Date()).format("YYYY"),
    total: "Tổng",
  });

  const [datetime_, setDatatime_] = useState(moment(new Date()).format("MM/DD/YYYY"));

  const color = {
    cur: "blue",
    pre: "black",
  };

  const tit = {
    dashboard: projectData.value.plantname,
    device: dataLang.formatMessage({ id: "device" }),
    alert: "Cảnh báo",
  };

  const paginationComponentOptions = {
    rowsPerPageText: dataLang.formatMessage({ id: "row" }),
    rangeSeparatorText: dataLang.formatMessage({ id: "to" }),
    selectAllRowsItem: true,
    selectAllRowsItemText: dataLang.formatMessage({ id: "showAll" }),
  };

  const listDeviceTab = [
    { id: "logger", name: "Logger" },
    { id: "inverter", name: "Inverter" },
    // { id: "meter", name: "Meter" },
  ];

  const columnInverter = [
    {
      name: dataLang.formatMessage({ id: "name" }),
      selector: (row) => (
        <div
          onClick={(e) => handleInfoInverter(e)}
          style={{ cursor: "pointer" }}
        >
          <div>{row.name}</div>
          <div style={{ color: "grey" }}>{row.sn}</div>
        </div>
      ),
      sortable: true,
      minWidth: "350px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: "status" }),
      selector: (row) => (
        <>
          {invt[row.logger_]?.[row.data.status] == 2 ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </>
      ),
      width: "110px",
    },
    {
      name: dataLang.formatMessage({ id: "production" }),
      selector: (row) => {
        // console.log(row.data.mode)
        let power = 0;
        let d = JSON.parse(row.data.total?.register || "[]");

        if (row.data.mode === "HYBRID") {
          let num = [];
          // console.log(invt[row.logger_])
          d.map((item, i) => {
            num[i] = invt[row.logger_]?.[item];
          });
          power = parseFloat(
            num.reduce((a, b) => Number(a) + Number(b), 0) * row.data.total?.cal
          ).toFixed(2);
        }
        if (row.data.mode === "GRID") {
          power =
            convertToDoublewordAndFloat(
              [invt[row.logger_]?.[d[0]], invt[row.logger_]?.[d[1]]],
              "int"
            ) * row.data.total?.cal;
        }

        return <div>{parseFloat(power / 1000).toFixed(2)} kW</div>;
      },
      sortable: true,
      width: "300px",
    },
    {
      name: dataLang.formatMessage({ id: "daily" }),
      selector: (row) => (
        <>
          {row.data.daily?.register
            ? parseFloat(
              invt[row.logger_]?.[row.data.daily.register] *
              row.data.daily?.cal
            ).toFixed(2)
            : 0}{" "}
          kWh
        </>
      ),
      sortable: true,
      width: "300px",
    },
    {
      name: dataLang.formatMessage({ id: "ogLog" }),
      selector: (row) => row.logger_,
      sortable: true,
      width: "300px",
    },
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

  const columnLogger = [
    {
      name: dataLang.formatMessage({ id: "name" }),
      selector: (row) => (
        <div style={{ cursor: "pointer" }} onClick={(e) => handleInfoLogger(e)}>
          <div>{row.name}</div>
          <div style={{ color: "grey" }}>{row.sn}</div>
        </div>
      ),
      sortable: true,
      // minWidth: "350px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: "status" }),
      selector: (row) => (
        <>
          {row.state === 1 ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </>
      ),
      // width: "110px",
    },
    {
      name: dataLang.formatMessage({ id: "type" }),
      selector: (row) => row.type,
      sortable: true,
      // width: "180px",
    },
    {
      name: dataLang.formatMessage({ id: "edits" }),
      selector: (row) => (
        <>
          {ruleInfor.value.setting.project.modify === true ||
            ruleInfor.value.setting.project.delete === true ? (
            <div className="DAT_TableEdit">
              <span
                id={row.sn + "_MORE"}
                // onMouseEnter={(e) => handleModify(e, "block")}
                onClick={(e) => handleModify(e, "block")}
              >
                <IoMdMore size={20} />
              </span>
            </div>
          ) : (
            <div></div>
          )}
          <div
            className="DAT_ModifyBox"
            id={row.sn + "_Modify"}
            style={{ display: "none" }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            {/* <div className="DAT_ModifyBox_Fix"
              id={row.sn + "_sync"}
              onClick={(e) => handleSync(e)}
            >
              <IoSyncOutline size={14} />
              &nbsp;
              Dong bo
            </div> */}
            <div
              className="DAT_ModifyBox_Fix"
              id={row.sn + "_edit"}
              onClick={(e) => handleEdit(e)}
            >
              <FiEdit size={14} />
              &nbsp;
              {dataLang.formatMessage({ id: "change" })}
            </div>
            <div
              className="DAT_ModifyBox_Remove"
              id={row.sn + "_remove"}
              onClick={(e) => handleDelete(e)}
            >
              <IoTrashOutline size={16} />
              &nbsp;
              {dataLang.formatMessage({ id: "remove" })}
            </div>
          </div>
        </>
      ),
      width: "100px",
    },
  ];

  const listAlertTab = [
    { id: "all", name: "Tất cả" },
    { id: "open", name: "Mở" },
    { id: "closed", name: "Đóng" },
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

  const handleInfoLogger = (e) => {
    dropState.value = false
    infoState.value = true;
    tab.value = "logger";
    let plantname = projectData.value.plantname;
    info.value = {
      psn: temp.value[0].sn,
      pname: temp.value[0].name,
      pplantname: plantname,
      pstate: temp.value[0].state,
      pversion: temp.value[0].version,
    };
  };

  const handleInfoInverter = (e) => {
    dropState.value = false
    infoState.value = true;
    tab.value = "inverter";
    let plantname = projectData.value.plantname;
    info.value = {
      psn: inverterDB.value[0].sn,
      pname: inverterDB.value[0].name,
      pplantname: plantname,
      pdata: inverterDB.value[0].data,
    };
    info.value.invt = invt[inverterDB.value[0].logger_];
    // console.log(info.value)
    // console.log(tempInverter)
  };

  const invtCloud = async (data, token) => {
    var reqData = {
      data: data,
      token: token,
    };

    try {
      const response = await axios({
        url: host.CLOUD,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: Object.keys(reqData)
          .map(function (key) {
            return (
              encodeURIComponent(key) + "=" + encodeURIComponent(reqData[key])
            );
          })
          .join("&"),
      });

      return response.data;
    } catch (e) {
      return { ret: 1, msg: "cloud err" };
    }
  };

  const convertToDoublewordAndFloat = (word, type) => {
    var doubleword = (word[1] << 16) | word[0];
    var buffer = new ArrayBuffer(4);
    var intView = new Int32Array(buffer);
    var floatView = new Float32Array(buffer);
    intView[0] = doubleword;
    var float_value = floatView[0];
    return type === "int"
      ? parseFloat(doubleword).toFixed(2)
      : parseFloat(float_value).toFixed(2) || 0;
  };

  const handleNav = (e) => {
    var id = e.currentTarget.id;
    setNav(id);
  };

  const handleDate = (e) => {
    var id = e.currentTarget.id;
    setDropConfig(false);
    setDateType(id);
  };

  const handleView = (e) => {
    var id = e.currentTarget.id;
    setView(id);
    if (id === "dashboard") {
      setNav("production");
    }
    dropState.value = !dropState.value;
  };

  const handleShowConfig = (e) => {
    if (configname === dataLang.formatMessage({ id: "choosePara" })) {
      setConfigname(dataLang.formatMessage({ id: "minimize" }));
    } else if (configname === dataLang.formatMessage({ id: "minimize" })) {
      setConfigname(dataLang.formatMessage({ id: "choosePara" }));
    }
  };

  const handleTabMobileDevice = (e) => {
    const id = e.currentTarget.id;
    tab_.value = id;
    const newLabel = listDeviceTab.find((item) => item.id == id);
    tabLable.value = newLabel.name;
  };

  const handleTabMobileAlert = (e) => {
    const id = e.currentTarget.id;
    tabAlert.value = id;
    const newLabel = listAlertTab.find((item) => item.id == id);
    tabLableAlert.value = newLabel.name;
  };

  const handleChart = (date) => {
    if (dateType === "date") {
      setDatatime_(moment(date).format("MM/DD/YYYY"));
      setD({ ...d, date: moment(date).format("DD/MM/YYYY") });
      const getDaily = async () => {
        const d = await callApi("post", host.DATA + "/getChart", {
          plantid: projectData.value.plantid_,
          date: moment(date).format("MM/DD/YYYY"),
        });
        setDataDay([]);
        // console.log(projectData.value.plantid_)
        // console.log(d)
        let x = [];
        if (d.status) {
          let vDay_ = dataLang.formatMessage({ id: "productionData" });
          let vDay2_ = dataLang.formatMessage({ id: "gridData" });
          let vDay3_ = dataLang.formatMessage({ id: "consumptionData" });
          let vDay4_ = dataLang.formatMessage({ id: "batteryData" });
          d.data.data.map((item) => {
            let arr = item.time.split(":");
            // console.log(item);
            // if (projectData.value.plantmode === "grid") {
            //   x = [...x, { time: `${arr[0]}:${arr[1]}`, [vDay_]: item.value }];
            // }
            // if (projectData.value.plantmode === "hybrid") {
            x = [
              ...x,
              {
                time: `${arr[0]}:${arr[1]}`,
                [vDay_]: item.value,
                [vDay2_]: item.value2,
                [vDay3_]: item.value3,
                [vDay4_]: item.value4,
              },
            ];
            // }
          });

          // if (projectData.value.plantmode === "grid") {
          //   for (let i = x.length; i < 287; i++) {
          //     if (
          //       moment(x[x.length - 1].time, "HH:mm") < moment("23:55", "HH:mm")
          //     ) {
          //       let nextTime = moment(x[x.length - 1].time, "HH:mm")
          //         .add(5, "minutes")
          //         .format("HH:mm");
          //       x.push({ time: nextTime, [vDay_]: 0 });
          //     }
          //   }
          // }

          // if (projectData.value.plantmode === "hybrid") {
          for (let i = x.length; i < 287; i++) {
            if (
              moment(x[x.length - 1].time, "HH:mm") < moment("23:55", "HH:mm")
            ) {
              let nextTime = moment(x[x.length - 1].time, "HH:mm")
                .add(5, "minutes")
                .format("HH:mm");
              x.push({
                time: nextTime,
                [vDay_]: 0,
                [vDay2_]: 0,
                [vDay3_]: 0,
                [vDay4_]: 0,
              });
            }
          }
          // }
          // console.log(x)
          setDataDay(x);
          setVDay(dataLang.formatMessage({ id: "productionData" }));
          setVDay2(dataLang.formatMessage({ id: "consumptionData" }));
          setVDay3(dataLang.formatMessage({ id: "gridData" }));
          setVDay4(dataLang.formatMessage({ id: "batteryData" }));
        } else {
          setDataDay([]);
          setVDay(dataLang.formatMessage({ id: "unknown" }));
          setVDay2(dataLang.formatMessage({ id: "unknown" }));
          setVDay3(dataLang.formatMessage({ id: "unknown" }));
          setVDay4(dataLang.formatMessage({ id: "unknown" }));
        }
      };

      getDaily();
    } else if (dateType === "month") {
      setDatatime_(moment(date).format("MM/YYYY"));
      setD({ ...d, month: moment(date).format("MM/YYYY") });

      const getMonth = async () => {
        const d = await callApi("post", host.DATA + "/getMonthChart", {
          plantid: projectData.value.plantid_,
          month: moment(date).format("MM/YYYY"),
        });
        if (d.status) {
          let vMonth = dataLang.formatMessage({ id: "dailyproduction" });
          let vMonth2 = dataLang.formatMessage({ id: "dailyconsumption" });
          let vMonth3 = dataLang.formatMessage({ id: "dailygridin" });
          let vMonth4 = dataLang.formatMessage({ id: "dailygridout" });
          let vMonth5 = dataLang.formatMessage({ id: "dailybatteryin" });
          let vMonth6 = dataLang.formatMessage({ id: "dailybatteryout" });
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0 nên cần cộng thêm 1
          const currentYear = currentDate.getFullYear();
          const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
          let datamonth_ = [];
          for (let i = 1; i <= daysInMonth; i++) {
            datamonth_ = [
              ...datamonth_,
              { date: i < 10 ? `0${i}` : `${i}`, [vMonth]: 0 },
            ];
          }
          let sum_month = [];
          let sum_month2 = [];
          let sum_month3 = [];
          let sum_month4 = [];
          let sum_month5 = [];
          let sum_month6 = [];
          d.data.data.map((item, i) => {
            let index = datamonth_.findIndex((d) => d.date == item.date);
            // if (projectData.value.plantmode === "grid") {
            //   datamonth_[index][vMonth] = item.value;
            //   sum_month[i] = item.value;
            // }
            // if (projectData.value.plantmode === "hybrid") {
            datamonth_[index][vMonth] = item.value;
            datamonth_[index][vMonth2] = item.value2;
            datamonth_[index][vMonth3] = item.value3;
            datamonth_[index][vMonth4] = item.value4;
            datamonth_[index][vMonth5] = item.value5;
            datamonth_[index][vMonth6] = item.value6;
            sum_month[i] = item.value;
            sum_month2[i] = item.value2;
            sum_month3[i] = item.value3;
            sum_month4[i] = item.value4;
            sum_month5[i] = item.value5;
            sum_month6[i] = item.value6;
            // }

            if (i == d.data.data.length - 1) {
              // if (projectData.value.plantmode === "grid") {
              //   cal.value["pro_month"] = parseFloat(
              //     sum_month.reduce((a, b) => Number(a) + Number(b), 0)
              //   ).toFixed(2);
              // }
              // if (projectData.value.plantmode === "hybrid") {
              cal.value["pro_month"] = parseFloat(
                sum_month.reduce((a, b) => Number(a) + Number(b), 0)
              ).toFixed(2);
              cal.value["con_month"] = parseFloat(
                sum_month.reduce((a, b) => Number(a) + Number(b), 0)
              ).toFixed(2);
              cal.value["grid_in_month"] = parseFloat(
                sum_month.reduce((a, b) => Number(a) + Number(b), 0)
              ).toFixed(2);
              cal.value["grid_out_month"] = parseFloat(
                sum_month.reduce((a, b) => Number(a) + Number(b), 0)
              ).toFixed(2);
              cal.value["bat_in_month"] = parseFloat(
                sum_month.reduce((a, b) => Number(a) + Number(b), 0)
              ).toFixed(2);
              cal.value["bat_out_month"] = parseFloat(
                sum_month.reduce((a, b) => Number(a) + Number(b), 0)
              ).toFixed(2);
              // }
            }
          });
          setVMonth(vMonth);
          setVMonth2(vMonth2);
          setVMonth3(vMonth3);
          setVMonth4(vMonth4);
          setVMonth5(vMonth5);
          setVMonth6(vMonth6);
          setDataMonth(datamonth_);
        } else {
          setDataMonth([]);
          setVMonth(dataLang.formatMessage({ id: "unknown" }));
          setVMonth2(dataLang.formatMessage({ id: "unknown" }));
          setVMonth3(dataLang.formatMessage({ id: "unknown" }));
          setVMonth4(dataLang.formatMessage({ id: "unknown" }));
          setVMonth5(dataLang.formatMessage({ id: "unknown" }));
          setVMonth6(dataLang.formatMessage({ id: "unknown" }));
        }
      };
      getMonth();
    } else if (dateType === "year") {
      setDatatime_(moment(date).format("YYYY"));
      setD({ ...d, year: moment(date).format("YYYY") });

      const getYear = async () => {
        const d = await callApi("post", host.DATA + "/getYearChart", {
          plantid: projectData.value.plantid_,
          year: moment(date).format("YYYY"),
        });

        if (d.status) {
          //console.log(d.data)
          let vYear = dataLang.formatMessage({ id: "monthlyproduction" });
          let vYear2 = dataLang.formatMessage({ id: "monthlyconsumption" });
          let vYear3 = dataLang.formatMessage({ id: "monthlygridin" });
          let vYear4 = dataLang.formatMessage({ id: "monthlygridout" });
          let vYear5 = dataLang.formatMessage({ id: "monthlybatteryin" });
          let vYear6 = dataLang.formatMessage({ id: "monthlybatteryout" });
          let sum_year = [];
          let sum_year2 = [];
          let sum_year3 = [];
          let sum_year4 = [];
          let sum_year5 = [];
          let sum_year6 = [];
          let datayear_ = [];
          for (let i = 1; i <= 12; i++) {
            datayear_ = [
              ...datayear_,
              {
                month: i < 10 ? `0${i}` : `${i}`,
                [vYear]: 0,
                [vYear2]: 0,
                [vYear3]: 0,
                [vYear4]: 0,
                [vYear5]: 0,
                [vYear6]: 0,
              },
            ];
          }
          d.data.data.map((item, i) => {
            let index = datayear_.findIndex((d) => d.month == item.month);
            datayear_[index][vYear] = item.value;
            datayear_[index][vYear2] = item.value2;
            datayear_[index][vYear3] = item.value3;
            datayear_[index][vYear4] = item.value4;
            datayear_[index][vYear5] = item.value5;
            datayear_[index][vYear6] = item.value6;
            sum_year[i] = item.value;
            sum_year2[i] = item.value2;
            sum_year3[i] = item.value3;
            sum_year4[i] = item.value4;
            sum_year5[i] = item.value5;
            sum_year6[i] = item.value6;
            if (i == d.data.data.length - 1) {
              cal.value["pro_year"] = parseFloat(
                sum_year.reduce((a, b) => Number(a) + Number(b), 0)
              ).toFixed(2);
              cal.value["con_year"] = parseFloat(
                sum_year2.reduce((a, b) => Number(a) + Number(b), 0)
              ).toFixed(2);
              cal.value["grid_in_year"] = parseFloat(
                sum_year3.reduce((a, b) => Number(a) + Number(b), 0)
              ).toFixed(2);
              cal.value["grid_out_year"] = parseFloat(
                sum_year4.reduce((a, b) => Number(a) + Number(b), 0)
              ).toFixed(2);
              cal.value["bat_in_year"] = parseFloat(
                sum_year5.reduce((a, b) => Number(a) + Number(b), 0)
              ).toFixed(2);
              cal.value["bat_out_year"] = parseFloat(
                sum_year6.reduce((a, b) => Number(a) + Number(b), 0)
              ).toFixed(2);
            }
          });
          setVYear(vYear);
          setVYear2(vYear2);
          setVYear3(vYear3);
          setVYear4(vYear4);
          setVYear5(vYear5);
          setVYear6(vYear6);
          setDataYear(datayear_);
        } else {
          setDataYear([]);
          setVYear(dataLang.formatMessage({ id: "unknown" }));
          setVYear2(dataLang.formatMessage({ id: "unknown" }));
          setVYear3(dataLang.formatMessage({ id: "unknown" }));
          setVYear4(dataLang.formatMessage({ id: "unknown" }));
          setVYear5(dataLang.formatMessage({ id: "unknown" }));
          setVYear6(dataLang.formatMessage({ id: "unknown" }));
        }
      };
      getYear();
    }
  };

  const handleModify = (e, type) => {
    const id = e.currentTarget.id;
    var arr = id.split("_");
    const mod = document.getElementById(arr[0] + "_Modify");
    mod.style.display = type;
  };

  const handleOutsideUser = (e) => {
    // if(!box.current.contains(e.target)){
    //   plantState.value = "default";
    // }
  };

  const handleEdit = (e) => {
    popupState.value = true;
    const id = e.currentTarget.id;
    const idArr = id.split("_");
    setSnlogger(idArr[0]);
    setType(idArr[1]);
  };

  const handleDelete = (e) => {
    popupState.value = true;
    const id = e.currentTarget.id;
    const idArr = id.split("_");
    setSnlogger(idArr[0]);
    setType(idArr[1]);
  };

  const handleInvt = async (sn) => {
    const res = await invtCloud(
      '{"deviceCode":"' + sn + '"}',
      Token.value.token
    );
    if (res.ret === 0) {
      setInvt((pre) => ({ ...pre, [sn]: res.data }));
    }
  };

  const handlefilterchart = (e) => {
    const state = e.currentTarget.checked;
    const chartfield = e.currentTarget.id.split("_");
    const temp = filterchart.value;
    temp[chartfield[1]][dateType][chartfield[0]] = state;
    filterchart.value = temp;
  };

  const Checkboxfilter = (props) => {
    return (
      <table className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table">
        <tbody>
          <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
            <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
              {dataLang.formatMessage({
                id: "production",
              })}
            </th>
            <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
              <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                <input
                  id={"productionData_" + projectData.value.plantmode}
                  type="checkbox"
                  defaultChecked={
                    filterchart.value[projectData.value.plantmode][dateType]
                      .productionData
                  }
                  onChange={(e) => {
                    handlefilterchart(e);
                  }}
                />
                <label
                  htmlFor={"productionData_" + projectData.value.plantmode}
                >
                  {dataLang.formatMessage({
                    id: "production",
                  })}
                </label>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody>
          <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
            <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
              {dataLang.formatMessage({
                id: "consumption",
              })}
            </th>
            <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
              <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                <input
                  id={"consumptionData_" + projectData.value.plantmode}
                  type="checkbox"
                  defaultChecked={
                    filterchart.value[projectData.value.plantmode][dateType]
                      .consumptionData
                  }
                  onChange={(e) => {
                    handlefilterchart(e);
                  }}
                />
                <label
                  htmlFor={"consumptionData_" + projectData.value.plantmode}
                >
                  {dataLang.formatMessage({
                    id: "consumption",
                  })}
                </label>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody>
          <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
            <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
              {dataLang.formatMessage({
                id: "grid",
              })}
            </th>
            <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
              <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                <input
                  id={"dailygridin_" + projectData.value.plantmode}
                  type="checkbox"
                  defaultChecked={
                    filterchart.value[projectData.value.plantmode][dateType]
                      .dailygridin
                  }
                  onChange={(e) => {
                    handlefilterchart(e);
                  }}
                />
                <label htmlFor={"dailygridin_" + projectData.value.plantmode}>
                  {dataLang.formatMessage({
                    id: "gridfeed",
                  })}
                </label>
              </div>
            </td>
            <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
              <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                <input
                  id={"dailygridout_" + projectData.value.plantmode}
                  type="checkbox"
                  defaultChecked={
                    filterchart.value[projectData.value.plantmode][dateType]
                      .dailygridout
                  }
                  onChange={(e) => {
                    handlefilterchart(e);
                  }}
                />
                <label htmlFor={"dailygridout_" + projectData.value.plantmode}>
                  {dataLang.formatMessage({
                    id: "purchaseE",
                  })}
                </label>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody>
          <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
            <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
              {dataLang.formatMessage({
                id: "batteryData",
              })}
            </th>
            <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
              <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                <input
                  id={"charge_" + projectData.value.plantmode}
                  type="checkbox"
                  defaultChecked={
                    filterchart.value[projectData.value.plantmode][dateType]
                      .charge
                  }
                  onChange={(e) => {
                    handlefilterchart(e);
                  }}
                />
                <label htmlFor={"charge_" + projectData.value.plantmode}>
                  {dataLang.formatMessage({
                    id: "charge",
                  })}
                </label>
              </div>
            </td>
            <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
              <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                <input
                  id={"discharge_" + projectData.value.plantmode}
                  type="checkbox"
                  defaultChecked={
                    filterchart.value[projectData.value.plantmode][dateType]
                      .discharge
                  }
                  onChange={(e) => {
                    handlefilterchart(e);
                  }}
                />
                <label htmlFor={"discharge_" + projectData.value.plantmode}>
                  {dataLang.formatMessage({
                    id: "discharge",
                  })}
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const handleExport = () => {
    setExportReport(true);
    // console.log(exportReport);
  }

  const handleClose = () => {
    setExportReport(false);
  }

  const popup_state = {
    pre: { transform: "rotate(0deg)", transition: "0.5s", color: 'rgba(11, 25, 103)' },
    new: { transform: "rotate(90deg)", transition: "0.5s", color: 'rgba(11, 25, 103)' },
  };

  const handlePopup = (state) => {
    const popup = document.getElementById("Popup_");
    popup.style.transform = popup_state[state].transform;
    popup.style.transition = popup_state[state].transition;
    popup.style.color = popup_state[state].color;
  };

  useEffect(() => {
    let d = document.getElementById("datepicker");
    let v = d.querySelector("span");
    // console.log(v.innerHTML);
    setDatatime_(v.innerHTML);

  }, [dateType])

  useEffect(() => {
    // filter data AlertTable
    open.value = dataAlert.filter((item) => item.status == true);
    close.value = dataAlert.filter((item) => item.status == false);
    tabLableAlert.value = listAlertTab[0].name;
    tabLable.value = listDeviceTab[0].name;

    // data Day
    const getDaily = async () => {
      const d = await callApi("post", host.DATA + "/getChart", {
        plantid: projectData.value.plantid_,
        date: moment(new Date()).format("MM/DD/YYYY"),
      });
      setDataDay([]);
      let x = [];
      if (d.status) {
        let vDay_ = dataLang.formatMessage({ id: "productionData" });
        let vDay2_ = dataLang.formatMessage({ id: "gridData" });
        let vDay3_ = dataLang.formatMessage({ id: "consumptionData" });
        let vDay4_ = dataLang.formatMessage({ id: "batteryData" });
        d.data.data.map((item) => {
          let arr = item.time.split(":");
          x = [
            ...x,
            {
              time: `${arr[0]}:${arr[1]}`,
              [vDay_]: item.value,
              [vDay2_]: item.value2,
              [vDay3_]: item.value3,
              [vDay4_]: item.value4,
            },
          ];
        });

        for (let i = x.length; i < 287; i++) {
          if (
            moment(x[x.length - 1].time, "HH:mm") < moment("23:55", "HH:mm")
          ) {
            let nextTime = moment(x[x.length - 1].time, "HH:mm")
              .add(5, "minutes")
              .format("HH:mm");
            x.push({
              time: nextTime,
              [vDay_]: 0,
              [vDay2_]: 0,
              [vDay3_]: 0,
              [vDay4_]: 0,
            });
          }
        }
        setDataDay(x);
        setVDay(dataLang.formatMessage({ id: "productionData" }));
        setVDay2(dataLang.formatMessage({ id: "consumptionData" }));
        setVDay3(dataLang.formatMessage({ id: "gridData" }));
        setVDay4(dataLang.formatMessage({ id: "batteryData" }));
      } else {
        setDataDay([]);
        setVDay(dataLang.formatMessage({ id: "unknown" }));
        setVDay2(dataLang.formatMessage({ id: "unknown" }));
        setVDay3(dataLang.formatMessage({ id: "unknown" }));
        setVDay4(dataLang.formatMessage({ id: "unknown" }));
      }
    };
    getDaily();

    //data Month
    const getMonth = async () => {
      const d = await callApi("post", host.DATA + "/getMonthChart", {
        plantid: projectData.value.plantid_,
        month: moment(new Date()).format("MM/YYYY"),
      });
      if (d.status) {
        let vMonth = dataLang.formatMessage({ id: "dailyproduction" });
        let vMonth2 = dataLang.formatMessage({ id: "dailyconsumption" });
        let vMonth3 = dataLang.formatMessage({ id: "dailygridin" });
        let vMonth4 = dataLang.formatMessage({ id: "dailygridout" });
        let vMonth5 = dataLang.formatMessage({ id: "dailybatteryin" });
        let vMonth6 = dataLang.formatMessage({ id: "dailybatteryout" });
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0 nên cần cộng thêm 1
        const currentYear = currentDate.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
        let datamonth_ = [];
        for (let i = 1; i <= daysInMonth; i++) {
          datamonth_ = [
            ...datamonth_,
            { date: i < 10 ? `0${i}` : `${i}`, [vMonth]: 0 },
          ];
        }
        let sum_month = [];
        let sum_month2 = [];
        let sum_month3 = [];
        let sum_month4 = [];
        let sum_month5 = [];
        let sum_month6 = [];
        d.data.data.map((item, i) => {
          let index = datamonth_.findIndex((d) => d.date == item.date);
          datamonth_[index][vMonth] = item.value;
          datamonth_[index][vMonth2] = item.value2;
          datamonth_[index][vMonth3] = item.value3;
          datamonth_[index][vMonth4] = item.value4;
          datamonth_[index][vMonth5] = item.value5;
          datamonth_[index][vMonth6] = item.value6;
          sum_month[i] = item?.value || 0;
          sum_month2[i] = item?.value2 || 0;
          sum_month3[i] = item?.value3 || 0;
          sum_month4[i] = item?.value4 || 0;
          sum_month5[i] = item?.value5 || 0;
          sum_month6[i] = item?.value6 || 0;

          if (i == d.data.data.length - 1) {
            cal.value["pro_month"] = parseFloat(
              sum_month.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
            cal.value["con_month"] = parseFloat(
              sum_month2.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
            cal.value["grid_in_month"] = parseFloat(
              sum_month3.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
            cal.value["grid_out_month"] = parseFloat(
              sum_month4.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
            cal.value["bat_in_month"] = parseFloat(
              sum_month5.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
            cal.value["bat_out_month"] = parseFloat(
              sum_month6.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
          }
        });
        setVMonth(vMonth);
        setVMonth2(vMonth2);
        setVMonth3(vMonth3);
        setVMonth4(vMonth4);
        setVMonth5(vMonth5);
        setVMonth6(vMonth6);
        setDataMonth(datamonth_);
      } else {
        setDataMonth([]);
        setVMonth(dataLang.formatMessage({ id: "unknown" }));
        setVMonth2(dataLang.formatMessage({ id: "unknown" }));
        setVMonth3(dataLang.formatMessage({ id: "unknown" }));
        setVMonth4(dataLang.formatMessage({ id: "unknown" }));
        setVMonth5(dataLang.formatMessage({ id: "unknown" }));
        setVMonth6(dataLang.formatMessage({ id: "unknown" }));
      }
    };
    getMonth();

    //data Year
    const getYear = async () => {
      const d = await callApi("post", host.DATA + "/getYearChart", {
        plantid: projectData.value.plantid_,
        year: moment(new Date()).format("YYYY"),
      });
      if (d.status) {
        let vYear = dataLang.formatMessage({ id: "monthlyproduction" });
        let vYear2 = dataLang.formatMessage({ id: "monthlyconsumption" });
        let vYear3 = dataLang.formatMessage({ id: "monthlygridin" });
        let vYear4 = dataLang.formatMessage({ id: "monthlygridout" });
        let vYear5 = dataLang.formatMessage({ id: "monthlybatteryin" });
        let vYear6 = dataLang.formatMessage({ id: "monthlybatteryout" });
        let sum_year = [];
        let sum_year2 = [];
        let sum_year3 = [];
        let sum_year4 = [];
        let sum_year5 = [];
        let sum_year6 = [];
        let datayear_ = [];
        for (let i = 1; i <= 12; i++) {
          datayear_ = [
            ...datayear_,
            {
              month: i < 10 ? `0${i}` : `${i}`,
              [vYear]: 0,
              [vYear2]: 0,
              [vYear3]: 0,
              [vYear4]: 0,
              [vYear5]: 0,
              [vYear6]: 0,
            },
          ];
        }
        d.data.data.map((item, i) => {
          let index = datayear_.findIndex((d) => d.month == item.month);
          datayear_[index][vYear] = item.value;
          datayear_[index][vYear2] = item.value2;
          datayear_[index][vYear3] = item.value3;
          datayear_[index][vYear4] = item.value4;
          datayear_[index][vYear5] = item.value5;
          datayear_[index][vYear6] = item.value6;
          sum_year[i] = item?.value || 0;
          sum_year2[i] = item?.value2 || 0;
          sum_year3[i] = item?.value3 || 0;
          sum_year4[i] = item?.value4 || 0;
          sum_year5[i] = item?.value5 || 0;
          sum_year6[i] = item?.value6 || 0;
          if (i == d.data.data.length - 1) {
            cal.value["pro_year"] = parseFloat(
              sum_year.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
            cal.value["con_year"] = parseFloat(
              sum_year2.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
            cal.value["grid_in_year"] = parseFloat(
              sum_year3.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
            cal.value["grid_out_year"] = parseFloat(
              sum_year4.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
            cal.value["bat_in_year"] = parseFloat(
              sum_year5.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
            cal.value["bat_out_year"] = parseFloat(
              sum_year6.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
          }
        });
        setVYear(vYear);
        setVYear2(vYear2);
        setVYear3(vYear3);
        setVYear4(vYear4);
        setVYear5(vYear5);
        setVYear6(vYear6);
        setDataYear(datayear_);
      } else {
        setDataYear([]);
        setVYear(dataLang.formatMessage({ id: "unknown" }));
        setVYear2(dataLang.formatMessage({ id: "unknown" }));
        setVYear3(dataLang.formatMessage({ id: "unknown" }));
        setVYear4(dataLang.formatMessage({ id: "unknown" }));
        setVYear5(dataLang.formatMessage({ id: "unknown" }));
        setVYear6(dataLang.formatMessage({ id: "unknown" }));
      }
    };
    getYear();

    //data Total
    const getTotal = async () => {
      const d = await callApi("post", host.DATA + "/getTotalChart", {
        plantid: projectData.value.plantid_,
      });
      setDataTotal([]);
      if (d.status) {
        let vTotal = dataLang.formatMessage({ id: "yearproduction" });
        let vTotal2 = dataLang.formatMessage({ id: "yearconsumption" });
        let vTotal3 = dataLang.formatMessage({ id: "yeargridin" });
        let vTotal4 = dataLang.formatMessage({ id: "yeargridout" });
        let vTotal5 = dataLang.formatMessage({ id: "yearbatteryin" });
        let vTotal6 = dataLang.formatMessage({ id: "yearbatteryout" });

        let sum_total = [];
        let sum_total2 = [];
        let sum_total3 = [];
        let sum_total4 = [];
        let sum_total5 = [];
        let sum_total6 = [];
        d.data.data.map((item, i) => {
          setDataTotal((old) => [
            ...old,
            {
              year: item.year,
              [vTotal]: item.value,
              [vTotal2]: item.value2,
              [vTotal3]: item.value3,
              [vTotal4]: item.value4,
              [vTotal5]: item.value5,
              [vTotal6]: item.value6,
            },
          ]);
          sum_total[i] = item?.value || 0;
          sum_total2[i] = item?.value2 || 0;
          sum_total3[i] = item?.value3 || 0;
          sum_total4[i] = item?.value4 || 0;
          sum_total5[i] = item?.value5 || 0;
          sum_total6[i] = item?.value6 || 0;
          if (i == d.data.data.length - 1) {
            cal.value["pro_total"] = parseFloat(
              sum_total.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
            cal.value["con_total"] = parseFloat(
              sum_total2.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
            cal.value["grid_in_total"] = parseFloat(
              sum_total3.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
            cal.value["grid__out_total"] = parseFloat(
              sum_total4.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
            cal.value["bat_in_total"] = parseFloat(
              sum_total5.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
            cal.value["bat_out_total"] = parseFloat(
              sum_total6.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
          }
        });
        setVTotal(vTotal);
        setVTotal2(vTotal2);
        setVTotal3(vTotal3);
        setVTotal4(vTotal4);
        setVTotal5(vTotal5);
        setVTotal6(vTotal6);
      } else {
        setVTotal(dataLang.formatMessage({ id: "unknown" }));
        setVTotal2(dataLang.formatMessage({ id: "unknown" }));
        setVTotal3(dataLang.formatMessage({ id: "unknown" }));
        setVTotal4(dataLang.formatMessage({ id: "unknown" }));
        setVTotal5(dataLang.formatMessage({ id: "unknown" }));
        setVTotal6(dataLang.formatMessage({ id: "unknown" }));
        setDataYear([]);
      }
    };
    getTotal();

    //data Logger
    return () => {
      cal.value = {};
      tab_.value = "logger";
      infoState.value = false;
    };

    // eslint-disable-next-line
  }, [lang]);

  useEffect(() => {
    const getLogger = async () => {
      let d = await callApi("post", host.DATA + "/getLogger", {
        plantid: projectData.value.plantid_,
      });
      temp.value = d;
      d.map(async (item) => {
        const res = await invtCloud(
          '{"deviceCode":"' + item.sn + '"}',
          Token.value.token
        );
        if (res.ret === 0) {
          let res_ = await callApi("post", host.DATA + "/updateLogger", {
            sn: item.sn,
            type: 'state',
            data: res.data.enabled
          })
          setInvt((pre) => ({ ...pre, [item.sn]: res.data }));
          const decimalArray = JSON.parse(item.setting.sn);
          const hexString = decimalArray
            .map((num) => parseInt(res.data[num]).toString(16))
            .join("");
          const asciiString = hexString
            .match(/.{2}/g)
            .map((byte) => String.fromCharCode(parseInt(byte, 16)))
            .join("");
        } else {
          setInvt((pre) => ({ ...pre, [item.sn]: {} }));
        }

        let inverter = await callApi("post", host.DATA + "/getInverter", {
          loggerid: item.sn,
        });
        if (inverter.length > 0) {
          inverterDB.value = [...inverter];
        } else {
          inverterDB.value = [];
        }
      });
    };
    getLogger();
    return () => {
      temp.value = [];
      inverterDB.value = [];
    };
  }, []);

  useEffect(() => {
    var num_ = {
      bat_1: [],
      bat_2: [],
      bat_in_1: [],
      bat_out_1: [],
      con_1: [],
      con_2: [],
      grid_1: [],
      grid_in_1: [],
      grid_in_2: [],
      grid_out_1: [],
      grid_out_2: [],
      pro_1: [],
      pro_2: [],
      pro_3: [],
    };
    temp.value.map(async (item, i) => {
      Object.entries(item.data).map(([key, value]) => {
        switch (value.type) {
          case "sum":
            let inum = [];
            let register_ = JSON.parse(value.register);
            register_.map((reg, j) => {
              inum[j] = parseFloat(invt[item.sn]?.[reg] || 0);
            });

            num_[key][i] = inum.reduce((accumulator, currentValue) => {
              return Number(accumulator) + Number(currentValue);
            }, 0);

            if (i == temp.value.length - 1) {
              cal.value[key] = parseFloat(
                num_[key].reduce((accumulator, currentValue) => {
                  return Number(accumulator) + Number(currentValue);
                }, 0) * parseFloat(value.cal)
              ).toFixed(2);
            }
            break;
          case "word":
            let d = JSON.parse(value.register);
            let e = [invt[item.sn]?.[d[0]] || 0, invt[item.sn]?.[d[1]] || 0];

            const convertToDoublewordAndFloat = (word, type) => {
              var doubleword = (word[1] << 16) | word[0];
              var buffer = new ArrayBuffer(4);
              var intView = new Int32Array(buffer);
              var floatView = new Float32Array(buffer);
              intView[0] = doubleword;
              var float_value = floatView[0];
              return type === "int"
                ? parseFloat(doubleword).toFixed(2)
                : parseFloat(float_value).toFixed(2) || 0;
            };
            num_[key][i] = convertToDoublewordAndFloat(e, "int");

            if (i == temp.value.length - 1) {
              cal.value[key] = parseFloat(
                num_[key].reduce((accumulator, currentValue) => {
                  return Number(accumulator) + Number(currentValue);
                }, 0) * parseFloat(value.cal)
              ).toFixed(2);
            }
            break;
          default:
            num_[key][i] =
              parseFloat(invt[item.sn]?.[value.register] || 0) *
              parseFloat(value.cal);
            if (i == temp.value.length - 1) {
              cal.value[key] = parseFloat(
                num_[key].reduce((accumulator, currentValue) => {
                  return accumulator + currentValue;
                })
              ).toFixed(2);
            }
            break;
        }
      });
    });

    coalsave.value = {
      ...coalsave.value,
      value: cal.value.pro_3,
    };

    document.addEventListener("mousedown", handleOutsideUser);
    return () => {
      document.removeEventListener("mousedown", handleOutsideUser);
    };
  }, [invt]);

  return (
    <div ref={box}>
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
                        {dataLang.formatMessage({ id: "lastupdate" })}
                        &nbsp;
                        {projectData.value.lastupdate}
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
                <BsThreeDotsVertical size={20} color="#9e9e9e" />
              </div>
              {ruleInfor.value.setting.device.add ? (
                <div
                  className="DAT_ProjectData_Header_Right_Add"
                  style={{ display: view === "device" ? "block" : "none" }}
                >
                  <button
                    id="add"
                    onClick={() => (popupAddGateway.value = true)}
                  >
                    <IoAddOutline size={25} color="white" />
                  </button>
                </div>
              ) : (
                <div></div>
              )}

              <div
                className="DAT_ProjectData_Header_Right_Close"
                onClick={() => (plantState.value = "default")}
              >
                <IoClose
                  size={25}
                  color="rgba(11, 25, 103)"
                  id="Popup"
                  onMouseEnter={(e) => handlePopup("new")}
                  onMouseLeave={(e) => handlePopup("pre")} />
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
                      <div
                        className="DAT_ProjectData_Header_LeftDashboard_Top"
                        style={{ fontSize: 22 }}
                      >
                        <img
                          src={
                            projectData.value.img
                              ? projectData.value.img
                              : "/dat_picture/solar_panel.png"
                          }
                          alt=""
                        />
                        <div className="DAT_ProjectData_Header_LeftDashboard_Top_Content">
                          <div className="DAT_ProjectData_Header_LeftDashboard_Top_Content_Name">
                            {projectData.value.plantname}
                            {projectData.value.state === 1 ? (
                              <>
                                <FaCheckCircle size={20} color="green" />
                              </>
                            ) : (
                              <>
                                <MdOutlineError size={20} color="red" />
                              </>
                            )}
                          </div>
                          <div className="DAT_ProjectData_Header_LeftDashboard_Top_Content_Addr">
                            {projectData.value.addr}
                          </div>
                          {/* <div style={{ color: "grey", fontSize: 14 }}>
                            {dataLang.formatMessage({ id: "lastupdate" })}{" "}
                            {projectData.value.lastupdate}
                          </div> */}
                        </div>
                      </div>
                    </div>
                  );
                case "device":
                  return (
                    // <div className="DAT_ProjectData_Header_LeftDevice">
                    //   <div style={{ fontSize: 22 }}>{tit[view]}</div>
                    // </div>
                    <div className="DAT_ProjectData_Header_LeftDashboard">
                      <div
                        className="DAT_ProjectData_Header_LeftDashboard_Top"
                        style={{ fontSize: 22 }}
                      >
                        <img
                          src={
                            projectData.value.img
                              ? projectData.value.img
                              : "/dat_picture/solar_panel.png"
                          }
                          alt=""
                        />
                        <div className="DAT_ProjectData_Header_LeftDashboard_Top_Content">
                          <div className="DAT_ProjectData_Header_LeftDashboard_Top_Content_Name">
                            {projectData.value.plantname}
                            {projectData.value.state === 1 ? (
                              <>
                                <FaCheckCircle size={20} color="green" />
                              </>
                            ) : (
                              <>
                                <MdOutlineError size={20} color="red" />
                              </>
                            )}
                          </div>
                          <div className="DAT_ProjectData_Header_LeftDashboard_Top_Content_Addr">
                            {projectData.value.addr}
                          </div>
                          {/* <div style={{ color: "grey", fontSize: 14 }}>
                            {dataLang.formatMessage({ id: "lastupdate" })}{" "}
                            {projectData.value.lastupdate}
                          </div> */}
                        </div>
                      </div>
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
              <div className="DAT_ProjectData_Header_Right_More">
                <BsThreeDotsVertical
                  size={20}
                  color="#9e9e9e"
                  onClick={() => (dropState.value = !dropState.value)}
                />
              </div>
              {ruleInfor.value.setting.device.add ? (
                <div
                  className="DAT_ProjectData_Header_Right_Add"
                  style={{ display: view === "device" ? "block" : "none" }}
                >
                  <button
                    id="add"
                    onClick={() => {
                      (popupAddGateway.value = true);
                      (dropState.value = false)
                    }}
                  >
                    <IoAddOutline size={25} color="white" />
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              <div
                className="DAT_ProjectData_Header_Right_Close"
                onClick={() => {
                  plantState.value = "default";
                  dropState.value = false;
                }}
              >
                <IoClose
                  size={25}
                  color="rgba(11, 25, 103)"
                  id="Popup_"
                  onMouseEnter={(e) => handlePopup("new")}
                  onMouseLeave={(e) => handlePopup("pre")}
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
                      <div className="DAT_ProjectData_Dashboard_Data_Left_Tit">
                        <div className="DAT_ProjectData_Dashboard_Data_Left_Tit_Item"
                          id="production"
                          style={{ color: nav === "production" ? color.cur : color.pre, }}
                          onClick={(e) => handleNav(e)}
                        >
                          {dataLang.formatMessage({ id: "productionData" })}
                        </div>
                        <div className="DAT_ProjectData_Dashboard_Data_Left_Tit_Item"
                          id="consumption"
                          style={{
                            color: nav === "consumption" ? color.cur : color.pre,
                            display: projectData.value.plantmode === "grid" ? "none" : "block",
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          {dataLang.formatMessage({ id: "consumptionData" })}
                        </div>
                        <div className="DAT_ProjectData_Dashboard_Data_Left_Tit_Item"
                          id="grid"
                          style={{
                            color: nav === "grid" ? color.cur : color.pre,
                            display: projectData.value.plantmode === "grid" ? "none" : "block",
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          {dataLang.formatMessage({ id: "grid" })}
                        </div>
                        <div className="DAT_ProjectData_Dashboard_Data_Left_Tit_Item"
                          id="battery"
                          style={{
                            color: nav === "battery" ? color.cur : color.pre,
                            display: projectData.value.plantmode === "grid" || projectData.value.plantmode === "consumption" ? "none" : "block",
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          {dataLang.formatMessage({ id: "batteryData" })}
                        </div>
                      </div>

                      {(() => {
                        switch (nav) {
                          case "production":
                            return <Production cal={cal.value} />;
                          case "consumption":
                            return <Consumption cal={cal.value} />;
                          case "grid":
                            return <Grid cal={cal.value} />;
                          case "battery":
                            return <Battery cal={cal.value} />;
                          default:
                            <></>;
                        }
                      })()}
                    </div>

                    <div className="DAT_ProjectData_Dashboard_Data_Center">
                      <div className="DAT_ProjectData_Dashboard_Data_Center_Tit">
                        <div className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item">
                          {(() => {
                            switch (projectData.value.plantmode) {
                              case "consumption":
                                return (
                                  <>
                                    {dataLang.formatMessage({
                                      id: "consumptionType",
                                    })}
                                  </>
                                );
                              case "hybrid":
                                return (
                                  <>
                                    {dataLang.formatMessage({
                                      id: "hybridType",
                                    })}
                                  </>
                                );
                              case "ESS":
                                return (
                                  <>{dataLang.formatMessage({ id: "ESS" })}</>
                                );
                              default:
                                return (
                                  <>
                                    {dataLang.formatMessage({ id: "gridType" })}
                                  </>
                                );
                            }
                          })()}
                        </div>
                        <div className="DAT_ProjectData_Dashboard_Data_Center_Tit_Timer">
                          <CiClock1 size={13} color="13px" />
                          {/* {minutes}:{seconds < 10 ? `0${seconds}` : seconds} */}
                        </div>
                      </div>
                      <Graph
                        type={projectData.value.plantmode}
                        cal={cal.value}
                      />
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
                        {dataLang.formatMessage({ id: "history" })}
                      </div>

                      <div className="DAT_ProjectData_Dashboard_History_Tit_Right">
                        <div className="DAT_ProjectData_Dashboard_History_Tit_Right_Date">
                          <div
                            className="DAT_ProjectData_Dashboard_History_Tit_Right_Date_Item"
                            id="date"
                            style={{
                              borderRight: "solid 1px rgb(199, 199, 199)",
                              color:
                                dateType === "date" ? color.cur : color.pre,
                            }}
                            onClick={(e) => handleDate(e)}
                          >
                            {dataLang.formatMessage({ id: "day" })}
                          </div>
                          <div
                            className="DAT_ProjectData_Dashboard_History_Tit_Right_Date_Item"
                            id="month"
                            style={{
                              borderRight: "solid 1px rgb(199, 199, 199)",
                              color:
                                dateType === "month" ? color.cur : color.pre,
                            }}
                            onClick={(e) => handleDate(e)}
                          >
                            {dataLang.formatMessage({ id: "month" })}
                          </div>
                          <div
                            className="DAT_ProjectData_Dashboard_History_Tit_Right_Date_Item"
                            id="year"
                            style={{
                              borderRight: "solid 1px rgb(199, 199, 199)",
                              color:
                                dateType === "year" ? color.cur : color.pre,
                            }}
                            onClick={(e) => handleDate(e)}
                          >
                            {dataLang.formatMessage({ id: "year" })}
                          </div>
                          <div
                            className="DAT_ProjectData_Dashboard_History_Tit_Right_Date_Item"
                            id="total"
                            style={{
                              color:
                                dateType === "total" ? color.cur : color.pre,
                            }}
                            onClick={(e) => handleDate(e)}
                          >
                            {dataLang.formatMessage({ id: "total" })}
                          </div>
                        </div>

                        <div className="DAT_ProjectData_Dashboard_History_Tit_Right_Config">
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
                          <button onClick={(e) => handleExport(e)}>
                            {dataLang.formatMessage({ id: "export" })}
                          </button>
                        </div>

                        <DatePicker
                          id="datepicker"
                          onChange={(date) => handleChart(date)}
                          showMonthYearPicker={
                            dateType === "date" ? false : true
                          }
                          showYearPicker={
                            dateType === "date" || dateType === "month"
                              ? false
                              : true
                          }
                          disabled={dateType === "total" ? true : false}
                          customInput={
                            <button className="DAT_CustomPicker">
                              <span>{d[dateType]}</span>
                              <IoCalendarOutline color="gray" />
                            </button>
                          }
                        />
                      </div>
                    </div>

                    {(() => {
                      switch (dateType) {
                        case "date":
                          return (
                            <Day
                              data={dataDay}
                              dateType={dateType}
                              v={vDay}
                              v2={vDay2}
                              v3={vDay3}
                              v4={vDay4}
                            />
                          );
                        case "month":
                          return (
                            <Month
                              data={dataMonth}
                              dateType={dateType}
                              v={vMonth}
                              v2={vMonth2}
                              v3={vMonth3}
                              v4={vMonth4}
                              v5={vMonth5}
                              v6={vMonth6}
                            />
                          );
                        case "year":
                          return (
                            <Year
                              data={dataYear}
                              dateType={dateType}
                              v={vYear}
                              v2={vYear2}
                              v3={vYear3}
                              v4={vYear4}
                              v5={vYear5}
                              v6={vYear6}
                            />
                          );
                        case "total":
                          return (
                            <Total
                              data={dataTotal}
                              dateType={dateType}
                              v={vTotal}
                              v2={vTotal2}
                              v3={vTotal3}
                              v4={vTotal4}
                              v5={vTotal5}
                              v6={vTotal6}
                            />
                          );
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
                          <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item">
                            {(() => {
                              switch (projectData.value.plantmode) {
                                case "consumption":
                                  // return (
                                  //   <table className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table">
                                  //     <tbody>
                                  //       <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                  //         <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                  //           {dataLang.formatMessage({
                                  //             id: "production",
                                  //           })}
                                  //         </th>
                                  //         <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                  //           <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                  //             <input
                                  //               id={
                                  //                 "productionData_" +
                                  //                 projectData.value.plantmode
                                  //               }
                                  //               type="checkbox"
                                  //               defaultChecked={
                                  //                 filterchart.value[
                                  //                   projectData.value.plantmode
                                  //                 ][dateType].production
                                  //               }
                                  //               onChange={(e) => {
                                  //                 handlefilterchart(e);
                                  //               }}
                                  //             />
                                  //             <label
                                  //               htmlFor={
                                  //                 "productionData_" +
                                  //                 projectData.value.plantmode
                                  //               }
                                  //             >
                                  //               {dataLang.formatMessage({
                                  //                 id: "production",
                                  //               })}
                                  //             </label>
                                  //           </div>
                                  //         </td>
                                  //       </tr>
                                  //     </tbody>

                                  //     <tbody>
                                  //       <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                  //         <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                  //           {dataLang.formatMessage({
                                  //             id: "consumption",
                                  //           })}
                                  //         </th>
                                  //         <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                  //           <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                  //             <input
                                  //               id={
                                  //                 "consumptionData_" +
                                  //                 projectData.value.plantmode
                                  //               }
                                  //               type="checkbox"
                                  //               defaultChecked={
                                  //                 filterchart.value[
                                  //                   projectData.value.plantmode
                                  //                 ][dateType].consumption
                                  //               }
                                  //               onChange={(e) => {
                                  //                 handlefilterchart(e);
                                  //               }}
                                  //             />
                                  //             <label
                                  //               htmlFor={
                                  //                 "consumptionData_" +
                                  //                 projectData.value.plantmode
                                  //               }
                                  //             >
                                  //               {dataLang.formatMessage({
                                  //                 id: "consumption",
                                  //               })}
                                  //             </label>
                                  //           </div>
                                  //         </td>
                                  //       </tr>
                                  //     </tbody>

                                  //     <tbody>
                                  //       <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                  //         <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                  //           {dataLang.formatMessage({
                                  //             id: "grid",
                                  //           })}
                                  //         </th>
                                  //         <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                  //           <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                  //             <input
                                  //               id={
                                  //                 "dailygridin_" +
                                  //                 projectData.value.plantmode
                                  //               }
                                  //               type="checkbox"
                                  //               defaultChecked={
                                  //                 filterchart.value[
                                  //                   projectData.value.plantmode
                                  //                 ][dateType].gridfeed
                                  //               }
                                  //               onChange={(e) => {
                                  //                 handlefilterchart(e);
                                  //               }}
                                  //             />
                                  //             <label
                                  //               htmlFor={
                                  //                 "dailygridin_" +
                                  //                 projectData.value.plantmode
                                  //               }
                                  //             >
                                  //               {dataLang.formatMessage({
                                  //                 id: "gridfeed",
                                  //               })}
                                  //             </label>
                                  //           </div>
                                  //         </td>
                                  //         <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                  //           <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                  //             <input
                                  //               id={
                                  //                 "dailygridout_" +
                                  //                 projectData.value.plantmode
                                  //               }
                                  //               type="checkbox"
                                  //               defaultChecked={
                                  //                 filterchart.value[
                                  //                   projectData.value.plantmode
                                  //                 ][dateType].purchasee
                                  //               }
                                  //               onChange={(e) => {
                                  //                 handlefilterchart(e);
                                  //               }}
                                  //             />
                                  //             <label
                                  //               htmlFor={
                                  //                 "dailygridout_" +
                                  //                 projectData.value.plantmode
                                  //               }
                                  //             >
                                  //               {dataLang.formatMessage({
                                  //                 id: "purchaseE",
                                  //               })}
                                  //             </label>
                                  //           </div>
                                  //         </td>
                                  //       </tr>
                                  //     </tbody>
                                  //   </table>
                                  // );
                                  switch (dateType) {
                                    case "date":
                                      return (
                                        <table className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table">
                                          <tbody>
                                            <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                              <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                {dataLang.formatMessage({
                                                  id: "production",
                                                })}
                                              </th>
                                              <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                                <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                  <input
                                                    id={
                                                      "productionData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                    type="checkbox"
                                                    defaultChecked={
                                                      filterchart.value[
                                                        projectData.value
                                                          .plantmode
                                                      ][dateType].productionData
                                                    }
                                                    onChange={(e) => {
                                                      handlefilterchart(e);
                                                    }}
                                                  />
                                                  <label
                                                    htmlFor={
                                                      "productionData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                  >
                                                    {dataLang.formatMessage({
                                                      id: "production",
                                                    })}
                                                  </label>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>

                                          <tbody>
                                            <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                              <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                {dataLang.formatMessage({
                                                  id: "consumption",
                                                })}
                                              </th>
                                              <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                                <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                  <input
                                                    id={
                                                      "consumptionData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                    type="checkbox"
                                                    defaultChecked={
                                                      filterchart.value[
                                                        projectData.value
                                                          .plantmode
                                                      ][dateType]
                                                        .consumptionData
                                                    }
                                                    onChange={(e) => {
                                                      handlefilterchart(e);
                                                    }}
                                                  />
                                                  <label
                                                    htmlFor={
                                                      "consumptionData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                  >
                                                    {dataLang.formatMessage({
                                                      id: "consumption",
                                                    })}
                                                  </label>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>

                                          <tbody>
                                            <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                              <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                {dataLang.formatMessage({
                                                  id: "grid",
                                                })}
                                              </th>
                                              <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                                <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                  <input
                                                    id={
                                                      "gridData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                    type="checkbox"
                                                    defaultChecked={
                                                      filterchart.value[
                                                        projectData.value
                                                          .plantmode
                                                      ][dateType].gridData
                                                    }
                                                    onChange={(e) => {
                                                      handlefilterchart(e);
                                                    }}
                                                  />
                                                  <label
                                                    htmlFor={
                                                      "gridData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                  >
                                                    {dataLang.formatMessage({
                                                      id: "grid",
                                                    })}
                                                  </label>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>

                                          {/* <tbody>
                                            <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                              <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                {dataLang.formatMessage({
                                                  id: "batteryData",
                                                })}
                                              </th>
                                              <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                                <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                  <input
                                                    id={
                                                      "batteryData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                    type="checkbox"
                                                    defaultChecked={
                                                      filterchart.value[
                                                        projectData.value
                                                          .plantmode
                                                      ][dateType].batteryData
                                                    }
                                                    onChange={(e) => {
                                                      handlefilterchart(e);
                                                    }}
                                                  />
                                                  <label
                                                    htmlFor={
                                                      "batteryData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                  >
                                                    {dataLang.formatMessage({
                                                      id: "batteryData",
                                                    })}
                                                  </label>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody> */}
                                        </table>
                                      );
                                    case "month":
                                      return <Checkboxfilter></Checkboxfilter>;
                                    case "year":
                                      return <Checkboxfilter></Checkboxfilter>;
                                    case "total":
                                      return <Checkboxfilter></Checkboxfilter>;
                                    default:
                                      return <></>;
                                  }
                                case "hybrid":
                                  switch (dateType) {
                                    case "date":
                                      return (
                                        <table className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table">
                                          <tbody>
                                            <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                              <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                {dataLang.formatMessage({
                                                  id: "production",
                                                })}
                                              </th>
                                              <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                                <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                  <input
                                                    id={
                                                      "productionData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                    type="checkbox"
                                                    defaultChecked={
                                                      filterchart.value[
                                                        projectData.value
                                                          .plantmode
                                                      ][dateType].productionData
                                                    }
                                                    onChange={(e) => {
                                                      handlefilterchart(e);
                                                    }}
                                                  />
                                                  <label
                                                    htmlFor={
                                                      "productionData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                  >
                                                    {dataLang.formatMessage({
                                                      id: "production",
                                                    })}
                                                  </label>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>

                                          <tbody>
                                            <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                              <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                {dataLang.formatMessage({
                                                  id: "consumption",
                                                })}
                                              </th>
                                              <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                                <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                  <input
                                                    id={
                                                      "consumptionData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                    type="checkbox"
                                                    defaultChecked={
                                                      filterchart.value[
                                                        projectData.value
                                                          .plantmode
                                                      ][dateType]
                                                        .consumptionData
                                                    }
                                                    onChange={(e) => {
                                                      handlefilterchart(e);
                                                    }}
                                                  />
                                                  <label
                                                    htmlFor={
                                                      "consumptionData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                  >
                                                    {dataLang.formatMessage({
                                                      id: "consumption",
                                                    })}
                                                  </label>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>

                                          <tbody>
                                            <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                              <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                {dataLang.formatMessage({
                                                  id: "grid",
                                                })}
                                              </th>
                                              <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                                <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                  <input
                                                    id={
                                                      "gridData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                    type="checkbox"
                                                    defaultChecked={
                                                      filterchart.value[
                                                        projectData.value
                                                          .plantmode
                                                      ][dateType].gridData
                                                    }
                                                    onChange={(e) => {
                                                      handlefilterchart(e);
                                                    }}
                                                  />
                                                  <label
                                                    htmlFor={
                                                      "gridData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                  >
                                                    {dataLang.formatMessage({
                                                      id: "grid",
                                                    })}
                                                  </label>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>

                                          <tbody>
                                            <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                              <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                {dataLang.formatMessage({
                                                  id: "batteryData",
                                                })}
                                              </th>
                                              <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                                <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                  <input
                                                    id={
                                                      "batteryData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                    type="checkbox"
                                                    defaultChecked={
                                                      filterchart.value[
                                                        projectData.value
                                                          .plantmode
                                                      ][dateType].batteryData
                                                    }
                                                    onChange={(e) => {
                                                      handlefilterchart(e);
                                                    }}
                                                  />
                                                  <label
                                                    htmlFor={
                                                      "batteryData_" +
                                                      projectData.value
                                                        .plantmode
                                                    }
                                                  >
                                                    {dataLang.formatMessage({
                                                      id: "batteryData",
                                                    })}
                                                  </label>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      );
                                    case "month":
                                      return <Checkboxfilter></Checkboxfilter>;
                                    case "year":
                                      return <Checkboxfilter></Checkboxfilter>;
                                    case "total":
                                      return <Checkboxfilter></Checkboxfilter>;
                                    default:
                                      return <></>;
                                  }

                                case "ESS":
                                  return (
                                    <table className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table">
                                      <tbody>
                                        <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                          <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                            {dataLang.formatMessage({
                                              id: "production",
                                            })}
                                          </th>
                                          <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                            <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                              <input
                                                id={
                                                  "productionData_" +
                                                  projectData.value.plantmode
                                                }
                                                type="checkbox"
                                                defaultChecked={
                                                  filterchart.value[
                                                    projectData.value.plantmode
                                                  ][dateType].production
                                                }
                                                onChange={(e) => {
                                                  handlefilterchart(e);
                                                }}
                                              />
                                              <label
                                                htmlFor={
                                                  "productionData_" +
                                                  projectData.value.plantmode
                                                }
                                              >
                                                {dataLang.formatMessage({
                                                  id: "production",
                                                })}
                                              </label>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>

                                      <tbody>
                                        <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                          <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                            {dataLang.formatMessage({
                                              id: "consumption",
                                            })}
                                          </th>
                                          <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                            <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                              <input
                                                id={
                                                  "consumptionData_" +
                                                  projectData.value.plantmode
                                                }
                                                type="checkbox"
                                                defaultChecked={
                                                  filterchart.value[
                                                    projectData.value.plantmode
                                                  ][dateType].consumption
                                                }
                                                onChange={(e) => {
                                                  handlefilterchart(e);
                                                }}
                                              />
                                              <label
                                                htmlFor={
                                                  "consumptionData_" +
                                                  projectData.value.plantmode
                                                }
                                              >
                                                {dataLang.formatMessage({
                                                  id: "consumption",
                                                })}
                                              </label>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>

                                      <tbody>
                                        <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                          <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                            {dataLang.formatMessage({
                                              id: "grid",
                                            })}
                                          </th>
                                          <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                            <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                              <input
                                                id={
                                                  "grid_" +
                                                  projectData.value.plantmode
                                                }
                                                type="checkbox"
                                                defaultChecked={
                                                  filterchart.value[
                                                    projectData.value.plantmode
                                                  ][dateType].grid
                                                }
                                                onChange={(e) => {
                                                  handlefilterchart(e);
                                                }}
                                              />
                                              <label
                                                htmlFor={
                                                  "grid_" +
                                                  projectData.value.plantmode
                                                }
                                              >
                                                {dataLang.formatMessage({
                                                  id: "grid",
                                                })}
                                              </label>
                                            </div>
                                          </td>
                                          <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                            <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                              <input
                                                id={
                                                  "dailygridin_" +
                                                  projectData.value.plantmode
                                                }
                                                type="checkbox"
                                                defaultChecked={
                                                  filterchart.value[
                                                    projectData.value.plantmode
                                                  ][dateType].gridfeed
                                                }
                                                onChange={(e) => {
                                                  handlefilterchart(e);
                                                }}
                                              />
                                              <label
                                                htmlFor={
                                                  "dailygridin_" +
                                                  projectData.value.plantmode
                                                }
                                              >
                                                {dataLang.formatMessage({
                                                  id: "gridfeed",
                                                })}
                                              </label>
                                            </div>
                                          </td>
                                          <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                            <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                              <input
                                                id={
                                                  "dailygridout_" +
                                                  projectData.value.plantmode
                                                }
                                                type="checkbox"
                                                defaultChecked={
                                                  filterchart.value[
                                                    projectData.value.plantmode
                                                  ][dateType].purchasee
                                                }
                                                onChange={(e) => {
                                                  handlefilterchart(e);
                                                }}
                                              />
                                              <label
                                                htmlFor={
                                                  "dailygridout_" +
                                                  projectData.value.plantmode
                                                }
                                              >
                                                {dataLang.formatMessage({
                                                  id: "purchaseE",
                                                })}
                                              </label>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>

                                      <tbody>
                                        <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                          <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                            {dataLang.formatMessage({
                                              id: "batteryData",
                                            })}
                                          </th>
                                          <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                            <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                              <input
                                                id={
                                                  "batteryData_" +
                                                  projectData.value.plantmode
                                                }
                                                type="checkbox"
                                                defaultChecked={
                                                  filterchart.value[
                                                    projectData.value.plantmode
                                                  ][dateType].batterydata
                                                }
                                                onChange={(e) => {
                                                  handlefilterchart(e);
                                                }}
                                              />
                                              <label
                                                htmlFor={
                                                  "batteryData_" +
                                                  projectData.value.plantmode
                                                }
                                              >
                                                {dataLang.formatMessage({
                                                  id: "batteryData",
                                                })}
                                              </label>
                                            </div>
                                          </td>
                                          <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                            <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                              <input
                                                id={
                                                  "charge_" +
                                                  projectData.value.plantmode
                                                }
                                                type="checkbox"
                                                defaultChecked={
                                                  filterchart.value[
                                                    projectData.value.plantmode
                                                  ][dateType].charge
                                                }
                                                onChange={(e) => {
                                                  handlefilterchart(e);
                                                }}
                                              />
                                              <label
                                                htmlFor={
                                                  "charge_" +
                                                  projectData.value.plantmode
                                                }
                                              >
                                                {dataLang.formatMessage({
                                                  id: "charge",
                                                })}
                                              </label>
                                            </div>
                                          </td>
                                          <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                            <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                              <input
                                                id={
                                                  "discharge_" +
                                                  projectData.value.plantmode
                                                }
                                                type="checkbox"
                                                defaultChecked={
                                                  filterchart.value[
                                                    projectData.value.plantmode
                                                  ][dateType].discharge
                                                }
                                                onChange={(e) => {
                                                  handlefilterchart(e);
                                                }}
                                              />
                                              <label
                                                htmlFor={
                                                  "discharge_" +
                                                  projectData.value.plantmode
                                                }
                                              >
                                                {dataLang.formatMessage({
                                                  id: "discharge",
                                                })}
                                              </label>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  );
                                default:
                                  return (
                                    <table className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table">
                                      <tbody>
                                        <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                          <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                            {dataLang.formatMessage({
                                              id: "production",
                                            })}
                                          </th>
                                          <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                            <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                              <input
                                                id={
                                                  "productionData_" +
                                                  projectData.value.plantmode
                                                }
                                                type="checkbox"
                                                defaultChecked={
                                                  filterchart.value[
                                                    projectData.value.plantmode
                                                  ][dateType].productionData
                                                }
                                                onChange={(e) => {
                                                  handlefilterchart(e);
                                                }}
                                              />
                                              <label
                                                htmlFor={
                                                  "productionData_" +
                                                  projectData.value.plantmode
                                                }
                                              >
                                                {dataLang.formatMessage({
                                                  id: "production",
                                                })}
                                              </label>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  );
                              }
                            })()}
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
                        <span>Thông tin dự án</span>
                      </div>

                      <div className="DAT_ProjectData_Dashboard_More_Left_Content">
                        <div className="DAT_ProjectData_Dashboard_More_Left_Content_Left">
                          <div className="DAT_ProjectData_Dashboard_More_Left_Content_Left_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Left_Content_Left_Item_Title">
                              {dataLang.formatMessage({ id: "projType" })}:
                            </div>
                            <div className="DAT_ProjectData_Dashboard_More_Left_Content_Left_Item_Content">
                              {projectData.value.planttype === "industrial" ? (
                                <>{dataLang.formatMessage({ id: "factory" })}</>
                              ) : (
                                <>
                                  {dataLang.formatMessage({ id: "household" })}
                                </>
                              )}
                            </div>
                          </div>

                          <div className="DAT_ProjectData_Dashboard_More_Left_Content_Left_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Left_Content_Left_Item_Title">
                              {dataLang.formatMessage({ id: "companyName" })}:
                            </div>
                            <div className="DAT_ProjectData_Dashboard_More_Left_Content_Left_Item_Content">
                              {projectData.value.business}
                            </div>
                          </div>
                        </div>

                        <div className="DAT_ProjectData_Dashboard_More_Left_Content_Right">
                          <div className="DAT_ProjectData_Dashboard_More_Left_Content_Right_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Left_Content_Right_Item_Title">
                              {dataLang.formatMessage({ id: "contactName" })}:
                            </div>
                            <div className="DAT_ProjectData_Dashboard_More_Left_Content_Right_Item_Content">
                              {projectData.value.contact}
                            </div>
                          </div>

                          <div className="DAT_ProjectData_Dashboard_More_Left_Content_Right_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Left_Content_Right_Item_Title">
                              {dataLang.formatMessage({ id: "phone" })}:
                            </div>
                            <div className="DAT_ProjectData_Dashboard_More_Left_Content_Right_Item_Content">
                              {projectData.value.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="DAT_ProjectData_Dashboard_More_Right">
                      <div className="DAT_ProjectData_Dashboard_More_Right_Tit">
                        {dataLang.formatMessage({ id: "environment" })}
                        &nbsp;
                        <PopupState
                          variant="popper"
                          popupId="demo-popup-popper"
                        >
                          {(popupState) => (
                            <div style={{ cursor: "pointer" }}>
                              <HelpOutlineIcon
                                {...bindHover(popupState)}
                                color="action"
                                fontSize="9px"
                              />
                              <Popper {...bindPopper(popupState)} transition>
                                {({ TransitionProps }) => (
                                  <Fade {...TransitionProps} timeout={350}>
                                    <Paper
                                      sx={{
                                        width: "400px",
                                        marginTop: "10px",
                                        marginLeft: "335px",
                                        p: 2,
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontSize: "12px",
                                          textAlign: "justify",
                                          marginBottom: 1.7,
                                        }}
                                      >
                                        1.{" "}
                                        {dataLang.formatMessage({
                                          id: "environment1",
                                        })}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: "12px",
                                          textAlign: "justify",
                                          marginBottom: 1.7,
                                        }}
                                      >
                                        2.{" "}
                                        {dataLang.formatMessage({
                                          id: "environment2",
                                        })}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: "12px",
                                          textAlign: "justify",
                                          marginBottom: 1.7,
                                        }}
                                      >
                                        3.{" "}
                                        {dataLang.formatMessage({
                                          id: "environment3",
                                        })}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: "12px",
                                          textAlign: "justify",
                                        }}
                                      >
                                        4.{" "}
                                        {dataLang.formatMessage({
                                          id: "environment4",
                                        })}
                                      </Typography>
                                    </Paper>
                                  </Fade>
                                )}
                              </Popper>
                            </div>
                          )}
                        </PopupState>
                      </div>

                      <div className="DAT_ProjectData_Dashboard_More_Right_Content">
                        <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col">
                          <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item_Icon">
                              <GiCoalWagon size={24} color="#6495ed" />
                            </div>
                            <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item_Tit">
                              <div style={{ fontSize: "14px", color: "grey" }}>
                                {dataLang.formatMessage({ id: "coalSave" })}
                              </div>
                              <div>
                                {Number(
                                  parseFloat(
                                    coalsave.value.value * coalsave.value.ef
                                  ).toFixed(2)
                                ).toLocaleString("en-US")}
                                &nbsp;
                                <span
                                  style={{ color: "grey", fontSize: "12px" }}
                                >
                                  t
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item_Icon">
                              <FaTree size={24} color="#6495ed" />
                            </div>
                            <div>
                              <div style={{ fontSize: "14px", color: "grey" }}>
                                {dataLang.formatMessage({ id: "cropYield" })}
                              </div>
                              <div>
                                {Number(
                                  parseFloat(
                                    coalsave.value.value * coalsave.value.tree
                                  ).toFixed(2)
                                ).toLocaleString("en-US")}
                                &nbsp;
                                <span
                                  style={{ color: "grey", fontSize: "12px" }}
                                >
                                  {dataLang.formatMessage({ id: "tree" })}
                                </span>
                              </div>
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
                                {dataLang.formatMessage({ id: "C02" })}
                              </div>
                              <div>
                                {Number(
                                  parseFloat(
                                    coalsave.value.value * coalsave.value.avr
                                  ).toFixed(2)
                                ).toLocaleString("en-US")}
                                &nbsp;
                                <span
                                  style={{ color: "grey", fontSize: "12px" }}
                                >
                                  t
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item_Icon">
                              <FaMoneyBill size={24} color="#6495ed" />
                            </div>
                            <div>
                              <div style={{ fontSize: "14px", color: "grey" }}>
                                {dataLang.formatMessage({ id: "totalRevenue" })}
                              </div>
                              <div>
                                {Number(
                                  parseFloat(
                                    (coalsave.value.value *
                                      projectData.value.price) /
                                    1000
                                  ).toFixed(2)
                                ).toLocaleString("en-US")}
                                &nbsp;
                                <span
                                  style={{ color: "grey", fontSize: "12px" }}
                                >
                                  k{projectData.value.currency}
                                </span>
                              </div>
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
                  {isMobile.value ? (
                    <div className="DAT_ProjectData_Device_TableMobile">
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
                        {tabMobile.value ? (
                          <div
                            className="DAT_Toollist_Tab_Mobile_list"
                            onMouseLeave={() => (tabMobile.value = false)}
                          >
                            {listDeviceTab.map((item, i) => {
                              return (
                                <div
                                  className="DAT_Toollist_Tab_Mobile_list_item"
                                  key={"tabmobile_" + i}
                                  id={item.id}
                                  onClick={(e) => handleTabMobileDevice(e)}
                                >
                                  {i + 1}: {item.name}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>

                      {(() => {
                        switch (tab_.value) {
                          case "logger":
                            return (
                              <>
                                {temp.value?.map((item, i) => {
                                  return (
                                    <div
                                      key={i}
                                      className="DAT_ProjectData_Device_TableMobile_Content"
                                    >
                                      <div className="DAT_ProjectData_Device_TableMobile_Content_Top">
                                        <div className="DAT_ProjectData_Device_TableMobile_Content_Top_Left">
                                          <div className="DAT_ProjectData_Device_TableMobile_Content_Top_Left_Name">
                                            {dataLang.formatMessage({
                                              id: "name",
                                            })}
                                            : {item.name}
                                          </div>

                                          <div className="DAT_ProjectData_Device_TableMobile_Content_Top_Left_Sn">
                                            SN: {item.sn}
                                          </div>
                                        </div>

                                        <div className="DAT_ProjectData_Device_TableMobile_Content_Top_Right">
                                          {ruleInfor.value.setting.device
                                            .modify === true ? (
                                            <div
                                              className="DAT_ProjectData_Device_TableMobile_Content_Top_Right_Item"
                                              onClick={(e) => handleEdit(e)}
                                            >
                                              <MdEdit
                                                size={20}
                                                color="#216990"
                                              />
                                            </div>
                                          ) : (
                                            <div></div>
                                          )}
                                          {ruleInfor.value.setting.device
                                            .remove === true ? (
                                            <div
                                              className="DAT_ProjectData_Device_TableMobile_Content_Top_Right_Item"
                                              id={item.sn}
                                              onClick={(e) => handleDelete(e)}
                                            >
                                              <MdDelete size={20} color="red" />
                                            </div>
                                          ) : (
                                            <div></div>
                                          )}
                                        </div>
                                      </div>

                                      <div className="DAT_ProjectData_Device_TableMobile_Content_Bottom">
                                        <div className="DAT_ProjectData_Device_TableMobile_Content_Bottom_State">
                                          {item.state ? (
                                            <>
                                              <FaCheckCircle
                                                size={20}
                                                color="green"
                                              />
                                              <span>
                                                {dataLang.formatMessage({
                                                  id: "online",
                                                })}
                                              </span>
                                            </>
                                          ) : (
                                            <>
                                              <MdOutlineError
                                                size={22}
                                                color="red"
                                              />
                                              <span>
                                                {dataLang.formatMessage({
                                                  id: "offline",
                                                })}
                                              </span>
                                            </>
                                          )}
                                        </div>

                                        <div className="DAT_ProjectData_Device_TableMobile_Content_Bottom_Type">
                                          {dataLang.formatMessage({
                                            id: "type",
                                          })}
                                          : {item.type}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </>
                            );
                          case "inverter":
                            return <></>;
                          case "meter":
                            return (
                              <>
                                {/* {tempInverter.value?.map((item, i) => {
                                  return (
                                    <div
                                      key={i}
                                      className="DAT_ProjectData_Device_TableMobile_Content"
                                    >
                                      <div className="DAT_ProjectData_Device_TableMobile_Content_Top">
                                        <div className="DAT_ProjectData_Device_TableMobile_Content_Top_Left">
                                          <div className="DAT_ProjectData_Device_TableMobile_Content_Top_Left_Name">
                                            {dataLang.formatMessage({
                                              id: "name",
                                            })}
                                            : {item.name}
                                          </div>

                                          <div className="DAT_ProjectData_Device_TableMobile_Content_Top_Left_Sn">
                                            SN: {item.sn}
                                          </div>
                                        </div>

                                        <div className="DAT_ProjectData_Device_TableMobile_Content_Top_Right">
                                          {ruleInfor.value.setting.device
                                            .modify === true ? (
                                            <div
                                              className="DAT_ProjectData_Device_TableMobile_Content_Top_Right_Item"
                                              onClick={(e) => handleEdit(e)}
                                            >
                                              <MdEdit size={20} color="#216990" />
                                            </div>
                                          ) : (
                                            <div></div>
                                          )}
                                          {ruleInfor.value.setting.device
                                            .remove === true ? (
                                            <div
                                              className="DAT_ProjectData_Device_TableMobile_Content_Top_Right_Item"
                                              id={item.sn}
                                              onClick={(e) => handleDelete(e)}
                                            >
                                              <MdDelete size={20} color="red" />
                                            </div>
                                          ) : (
                                            <div></div>
                                          )}
                                        </div>
                                      </div>

                                      <div className="DAT_ProjectData_Device_TableMobile_Content_Bottom">
                                        <div className="DAT_ProjectData_Device_TableMobile_Content_Bottom_State">
                                          {item.state ? (
                                            <>
                                              <FaCheckCircle
                                                size={20}
                                                color="green"
                                              />
                                              <span>
                                                {dataLang.formatMessage({
                                                  id: "online",
                                                })}
                                              </span>
                                            </>
                                          ) : (
                                            <>
                                              <MdOutlineError
                                                size={22}
                                                color="red"
                                              />
                                              <span>
                                                {dataLang.formatMessage({
                                                  id: "offline",
                                                })}
                                              </span>
                                            </>
                                          )}
                                        </div>

                                        <div className="DAT_ProjectData_Device_TableMobile_Content_Bottom_Type">
                                          {dataLang.formatMessage({
                                            id: "type",
                                          })}
                                          : {item.type}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })} */}
                              </>
                            );
                          default:
                            return <></>;
                        }
                      })()}
                    </div>
                  ) : (
                    <div className="DAT_ProjectData_Device_Table">
                      <div className="DAT_Toollist_Tab">
                        {listDeviceTab.map((item, i) => {
                          return tab_.value === item.id ? (
                            <div
                              className="DAT_Toollist_Tab_main"
                              key={"tab_" + i}
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
                                onClick={(e) => (tab_.value = item.id)}
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
                              onClick={(e) => (tab_.value = item.id)}
                            >
                              {item.name}
                            </span>
                          );
                        })}
                      </div>

                      <div className="DAT_ProjectData_Device_Table_Content">
                        {(() => {
                          switch (tab_.value) {
                            case "inverter":
                              return (
                                <DataTable
                                  className="DAT_Table_Device"
                                  columns={columnInverter}
                                  data={inverterDB.value}
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
                                  data={temp.value}
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
                  )}
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
                              className="DAT_Toollist_Tab_main"
                              key={"tab_" + i}
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

      {popupAddGateway.value ? (
        <div className="DAT_AddGatewayPopup">
          <AddGateway data={temp.value} handleInvt={handleInvt} />
        </div>
      ) : (
        <></>
      )}

      {popupState.value ? (
        <div className="DAT_DevicePopup">
          <Popup
            plantid={projectData.value.plantid_}
            type="logger"
            sn={snlogger}
            data={temp.value}
            func={type}
          />
        </div>
      ) : (
        <> </>
      )}

      {exportReport ? (
        <div className="DAT_RolePopup" style={{
          height: exportReport === "default" ? "0px" : "100vh",
        }}>
          <ExportData handleClose={handleClose} typereport={dateType} plant={projectData.value} datetime={datetime_} />
        </div>
      ) : (
        <> </>
      )}

      {isMobile.value ? (
        <>
          {dropState.value ? (
            <div className="DAT_ProjectDataDrop">
              {view === "dashboard" ? (
                <>
                  <div
                    className="DAT_ProjectDataDrop_Item"
                    id="device"
                    // style={{ borderBottom: "solid 1px rgb(199, 199, 199)" }}
                    onClick={(e) => handleView(e)}
                  >
                    {dataLang.formatMessage({ id: "device" })}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="DAT_ProjectDataDrop_Item"
                    id="dashboard"
                    // style={{ borderBottom: "solid 1px rgb(199, 199, 199)" }}
                    onClick={(e) => handleView(e)}
                  >
                    {dataLang.formatMessage({ id: "monitor" })}
                  </div>
                </>
              )}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {dropState.value ? (
            <div className="DAT_ProjectDataDrop">
              {view === "dashboard" ? (
                <>
                  <div
                    className="DAT_ProjectDataDrop_Item"
                    id="device"
                    // style={{ borderBottom: "solid 1px rgb(199, 199, 199)" }}
                    onClick={(e) => handleView(e)}
                  >
                    {dataLang.formatMessage({ id: "device" })}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="DAT_ProjectDataDrop_Item"
                    id="dashboard"
                    // style={{ borderBottom: "solid 1px rgb(199, 199, 199)" }}
                    onClick={(e) => handleView(e)}
                  >
                    {dataLang.formatMessage({ id: "monitor" })}
                  </div>
                </>
              )}
            </div>
          ) : (
            <></>
          )}
        </>
      )}

      <div className="DAT_DeviceInfor"
        style={{ height: infoState.value ? "100%" : "0px", transition: "0.5s" }}
      >
        {infoState.value ? <Info /> : <></>}
      </div>
    </div>
  );
}

// Thẻ Data
const Graph = (props) => {
  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Graph">
      {(() => {
        switch (props.type) {
          case "grid":
            return <GraphGrid cal={props.cal} />;
          case "consumption":
            return <GraphConsumption cal={cal.value} />;
          case "hybrid":
            return <GraphFull cal={cal.value} />;
          case "ESS":
            return <GraphFull cal={cal.value} />;
          default:
            <></>;
        }
      })()}
    </div>
  );
};

const GraphGrid = (props) => {
  const [lineA_, setLinA] = useState("Default");

  useEffect(() => {
    if (parseFloat(props.cal?.pro_1 / 1000).toFixed(2) > 0) {
      setLinA("moveLtoR");
    } else {
      setLinA("Default");
    }
  }, [props.cal.pro_1]);

  const LineA = (props) => {
    return (
      <>
        <path
          className="path"
          d="M 230.857 133.65 L 231.165 38.854 C 231.618 33.403 228.857 31.82 223.463 32.163 L 82.444 32.537"
          style={{
            width: "100%",
            height: "100%",
            fill: "none",
            stroke: lineA_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(43, 195, 253)",
            strokeWidth: props.strokeWidth,
            strokeLinecap: "round",
            overflow: "hidden",
            strokeDasharray: lineA_ === "Default" ? "0" : "20",
            animation: `${lineA_} ${props.dur} linear infinite`,
          }}
        />
      </>
    );
  };

  const LineB = (props) => {
    return (
      <>
        <path
          d="M 258.136 132.82 L 258.703 39.488 C 258.59 34.811 259.013 31.481 266.609 31.554 L 413.676 31.085"
          style={{
            width: "100%",
            height: "100%",
            fill: "none",
            stroke: "rgba(43, 195, 253)",
            strokeWidth: props.strokeWidth,
            strokeLinecap: "round",
            overflow: "hidden",
          }}
        />

      </>
    );
  };

  const LineD = (props) => {
    return (
      <>
        <path
          d="M 241.751 145.923 L 242.029 243.54"
          width="100%"
          height="100%"
          style={{
            fill: "none",
            stroke: "rgba(43, 195, 253)",
            strokeWidth: props.strokeWidth,
            strokeLinecap: "round",
            overflow: "hidden",
          }}
        />

      </>
    );
  };

  const Solar = (props) => {
    return (
      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px", width: "100%", height: "100%", border: "1px solid rgba(233, 233, 233, 0.8)", borderRadius: "3px", padding: "5px", boxSizing: "border-box", backgroundColor: "white", overflow: "hidden" }}>
        <img src={props.src} width={`${props.width}px`} height={`${props.height}px`} alt="" />
        <div>
          <div style={{ color: props.color }}>
            {props.val}
          </div>
          <span style={{ color: "gray", fontSize: "13px" }}>{props.unit}</span>
        </div>
      </div>
    );
  };

  const SolarImg = (props) => {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", width: "100%", height: "100%", border: "1px solid rgba(233, 233, 233, 0.8)", borderRadius: "3px", padding: "5px", boxSizing: "border-box", backgroundColor: "white", overflow: "hidden" }}>
        <img src={props.src} width={`${props.width}px`} height={`${props.height}px`} alt="" />
      </div>
    );
  };

  return (
    <>
      <svg
        viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" width={"100%"} height={"100%"}
        style={{
          backgroundColor: "white"
        }}
      >
        <LineA dur="10s" strokeWidth="3" />
        <LineB dur="10s" strokeWidth="3" />
        <LineD dur="10s" strokeWidth="3" />

        <foreignObject x="5" y="5" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
          <Solar src="/dat_icon/production.png" width="30" color="black" height="30" val={Number(parseFloat(props.cal?.pro_1 / 1000).toFixed(3) || 0).toLocaleString("en-US")} unit="kW" />
        </foreignObject>

        <foreignObject x="395" y="5" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
          <SolarImg src="/dat_icon/consumption.png" width="30" height="30" />
        </foreignObject>


        <foreignObject x="193" y="233" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
          <SolarImg src="/dat_icon/grid.png" width="30" height="30" />
        </foreignObject>

        <foreignObject x="193" y="92" width="102.628" height="68.353" style={{ overflow: "hidden", padding: "2px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", border: "1px solid rgba(233, 233, 233, 0.8)", backgroundColor: "white", borderRadius: "3px" }}>
            DC/AC
          </div>
        </foreignObject>
      </svg>
    </>
  );
};

const GraphConsumption = (props) => {
  const [lineA_, setLinA] = useState("Default");
  const [lineB_, setLinB] = useState("Default");
  const [lineD_, setLinD] = useState("Default");

  useEffect(() => {
    if (parseFloat(props.cal?.pro_1 / 1000).toFixed(2) > 0) {
      setLinA("moveLtoR");
    } else {
      setLinA("Default");
    }

    if (parseFloat(props.cal?.con_1).toFixed(2) > 0) {
      setLinB("moveRtoL");
    } else {
      setLinB("Default");
    }

    if (parseFloat(props.cal?.grid_1 / 1000).toFixed(2) > 0) {
      setLinD("moveRtoL");
    } else if (parseFloat(props.cal?.grid_1 / 1000).toFixed(2) < 0) {
      setLinD("moveLtoR");
    } else {
      setLinD("Default");
    }
  }, [props.cal.pro_1, props.cal.con_1, props.cal.grid_1]);

  const LineA = (props) => {
    return (
      <>
        <path
          className="path"
          d="M 230.857 133.65 L 231.165 38.854 C 231.618 33.403 228.857 31.82 223.463 32.163 L 82.444 32.537"
          style={{
            width: "100%",
            height: "100%",
            fill: "none",
            stroke: lineA_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(43, 195, 253)",
            strokeWidth: props.strokeWidth,
            strokeLinecap: "round",
            overflow: "hidden",
            strokeDasharray: lineA_ === "Default" ? "0" : "20",
            animation: `${lineA_} ${props.dur} linear infinite`,
          }}
        />
      </>
    );
  };

  const LineB = (props) => {
    return (
      <>
        <path
          d="M 258.136 132.82 L 258.703 39.488 C 258.59 34.811 259.013 31.481 266.609 31.554 L 413.676 31.085"
          style={{
            width: "100%",
            height: "100%",
            fill: "none",
            stroke: lineB_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(247, 148, 29)",
            strokeWidth: props.strokeWidth,
            strokeLinecap: "round",
            overflow: "hidden",
            strokeDasharray: lineB_ === "Default" ? "0" : "20",
            animation: `${lineB_}  ${props.dur} linear infinite`,

          }}
        />

      </>
    );
  };

  const LineD = (props) => {
    return (
      <>
        <path
          d="M 241.751 145.923 L 242.029 243.54"
          width="100%"
          height="100%"
          style={{
            fill: "none",
            stroke: lineD_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(0, 163, 0)",
            strokeWidth: props.strokeWidth,
            strokeLinecap: "round",
            overflow: "hidden",
            strokeDasharray: lineD_ === "Default" ? "0" : "20",
            animation: `${lineD_} ${props.dur} linear infinite`,
          }}
        />

      </>
    );
  };

  const Solar = (props) => {
    return (
      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px", width: "100%", height: "100%", border: "1px solid rgba(233, 233, 233, 0.8)", borderRadius: "3px", padding: "5px", boxSizing: "border-box", backgroundColor: "white", overflow: "hidden" }}>
        <img src={props.src} width={`${props.width}px`} height={`${props.height}px`} alt="" />
        <div>
          <div style={{ color: props.color }}>
            {props.val}
          </div>
          <span style={{ color: "gray", fontSize: "13px" }}>{props.unit}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <svg
        viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" width={"100%"} height={"100%"}
        style={{
          backgroundColor: "white"
        }}
      >
        <LineA dur="10s" />
        <LineB dur="10s" />
        <LineD dur="10s" />

        <foreignObject x="5" y="5" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
          <Solar src="/dat_icon/production.png" width="30" height="30" color="black" val={Number(parseFloat(props.cal?.pro_1 / 1000).toFixed(2) || 0).toLocaleString("en-US")} unit="kW" />
        </foreignObject>

        <foreignObject x="395" y="5" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
          <Solar src="/dat_icon/consumption.png" width="30" height="30" color="black" val={Number(parseFloat(props.cal?.con_1).toFixed(2) || 0).toLocaleString("en-US")} unit="kW" />
        </foreignObject>

        <foreignObject x="193" y="233" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
          <Solar src="/dat_icon/grid.png" width="30" height="30" color={props.cal?.grid_1 < 0 ? "red" : "black"} val={Number(parseFloat(Math.abs(props.cal?.grid_1) / 1000).toFixed(2) || 0).toLocaleString("en-US")} unit="kW" />
        </foreignObject>

        <foreignObject x="193" y="92" width="102.628" height="68.353" style={{ overflow: "hidden", padding: "2px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", border: "1px solid rgba(233, 233, 233, 0.8)", backgroundColor: "white", borderRadius: "3px" }}>
            DC/AC
          </div>
        </foreignObject>
      </svg>
    </>
  );
};

const GraphFull = (props) => {
  const [lineA_, setLinA] = useState("Default");
  const [lineB_, setLinB] = useState("Default");
  const [lineC_, setLinC] = useState("Default");
  const [lineD_, setLinD] = useState("Default");

  useEffect(() => {
    if (parseFloat(props.cal?.pro_1 / 1000).toFixed(2) > 0) {
      setLinA("moveLtoR");
    } else {
      setLinA("Default");
    }

    if (parseFloat(props.cal?.con_1).toFixed(2) > 0) {
      setLinB("moveRtoL");
    } else {
      setLinB("Default");
    }

    if (parseFloat(props.cal?.bat_1 / 1000).toFixed(2) > 0) {
      setLinC("moveRtoL");
    } else if (parseFloat(props.cal?.bat_1 / 1000).toFixed(2) < 0) {
      setLinC("moveLtoR");
    } else {
      setLinC("Default");
    }

    if (parseFloat(props.cal?.grid_1 / 1000).toFixed(2) > 0) {
      setLinD("moveLtoR");
    } else if (parseFloat(props.cal?.grid_1 / 1000).toFixed(2) < 0) {
      setLinD("moveRtoL");
    } else {
      setLinD("Default");
    }
  }, [props.cal.pro_1, props.cal.con_1, props.cal.grid_1, props.cal.bat_1]);

  const LineA = (props) => {
    return (
      <>
        <path
          className="path"
          d="M 230.857 133.65 L 231.165 38.854 C 231.618 33.403 228.857 31.82 223.463 32.163 L 82.444 32.537"
          style={{
            width: "100%",
            height: "100%",
            fill: "none",
            stroke: lineA_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(43, 195, 253)",
            strokeWidth: props.strokeWidth,
            strokeLinecap: "round",
            overflow: "hidden",
            strokeDasharray: lineA_ === "Default" ? "0" : "20",
            animation: `${lineA_} ${props.dur} linear infinite`,
          }}
        />
      </>
    );
  };

  const LineB = (props) => {
    return (
      <>
        <path
          d="M 258.136 132.82 L 258.703 39.488 C 258.59 34.811 259.013 31.481 266.609 31.554 L 413.676 31.085"
          style={{
            width: "100%",
            height: "100%",
            fill: "none",
            stroke: lineB_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(247, 148, 29)",
            strokeWidth: props.strokeWidth,
            strokeLinecap: "round",
            overflow: "hidden",
            strokeDasharray: lineB_ === "Default" ? "0" : "20",
            animation: `${lineB_}  ${props.dur} linear infinite`,

          }}
        />

      </>
    );
  };

  const LineC = (props) => {
    return (
      <>
        <path
          className="path"
          d="M 226.842 164.494 L 227.12 262.111 C 227.543 270.476 225.304 271.397 217.555 271.123 L 76.035 270.736"
          style={{
            width: "100%",
            height: "100%",
            fill: "none",
            stroke: lineC_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(77, 255, 0)",
            strokeWidth: props.strokeWidth,
            strokeLinecap: "round",
            overflow: "hidden",
            strokeDasharray: lineC_ === "Default" ? "0" : "20",
            animation: `${lineC_} ${props.dur} linear infinite`,

          }}
        />

      </>
    );
  };

  const LineD = (props) => {
    return (
      <>
        <path
          d="M 259.334 162.907 L 259.913 261.215 C 259.941 268.812 260.465 270.05 268.772 270.188 L 417.31 270.833"
          width="100%"
          height="100%"
          style={{
            fill: "none",
            stroke: lineD_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(0, 163, 0)",
            strokeWidth: props.strokeWidth,
            strokeLinecap: "round",
            overflow: "hidden",
            strokeDasharray: lineD_ === "Default" ? "0" : "20",
            animation: `${lineD_} ${props.dur} linear infinite`,
          }}
        />

      </>
    );
  };

  const Solar = (props) => {
    return (
      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px", width: "100%", height: "100%", border: "1px solid rgba(233, 233, 233, 0.8)", borderRadius: "3px", padding: "5px", boxSizing: "border-box", backgroundColor: "white", overflow: "hidden" }}>
        <img src={props.src} width={`${props.width}px`} height={`${props.height}px`} alt="" />
        <div>
          <div style={{ color: props.color }}>
            {props.val}
          </div>
          <span style={{ color: "gray", fontSize: "13px" }}>{props.unit}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <svg
        viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" width={"100%"} height={"100%"}
        style={{
          backgroundColor: "white"
        }}
      >
        <LineA dur="10s" strokeWidth="3" />
        <LineB dur="10s" strokeWidth="3" />
        <LineC dur="10s" strokeWidth="3" />
        <LineD dur="10s" strokeWidth="3" />

        <foreignObject x="5" y="5" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
          <Solar src="/dat_icon/production.png" width="30" height="30" color="black" val={Number(parseFloat(props.cal?.pro_1 / 1000).toFixed(2) || 0).toLocaleString("en-US")} unit="kW" />
        </foreignObject>

        <foreignObject x="395" y="5" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
          <Solar src="/dat_icon/consumption.png" width="30" height="30" color="black" val={Number(parseFloat(props.cal?.con_1).toFixed(2) || 0).toLocaleString("en-US")} unit="kW" />
        </foreignObject>

        <foreignObject x="5" y="235" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
          <Solar src="/dat_icon/bat.png" width="20" height="30" color={props.cal?.bat_1 < 0 ? "red" : "black"} val={Number(parseFloat(Math.abs(props.cal?.bat_1) / 1000).toFixed(2) || 0).toLocaleString("en-US")} unit="kW" />
        </foreignObject>

        <foreignObject x="395" y="235" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
          <Solar src="/dat_icon/grid.png" width="30" height="30" color={props.cal?.grid_1 < 0 ? "red" : "black"} val={Number(parseFloat(Math.abs(props.cal?.grid_1) / 1000).toFixed(2) || 0).toLocaleString("en-US")} unit="kW" />
        </foreignObject>

        <foreignObject x="193" y="112" width="102" height="68" style={{ overflow: "hidden", padding: "2px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", backgroundColor: "white", border: "1px solid rgba(233, 233, 233, 0.8)", borderRadius: "3px" }}>
            DC/AC
          </div>
        </foreignObject>
      </svg>
    </>
  );
};

const Production = (props) => {
  const dataLang = useIntl();
  const in_max = 100;
  const in_min = 0;
  const out_max = -10;
  const out_min = 140;
  const [per, setPer] = useState(0);

  const mapValue = (data, in_min, in_max, out_min, out_max) => {
    return (
      ((data - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  };

  useEffect(() => {
    let result = parseFloat(((props.cal?.pro_1 / 1000 || 0) / projectData.value.capacity) * 100);

    setPer(mapValue(result, in_min, in_max, out_min, out_max));
  }, [props.cal.pro_1]);

  const keyframes = `
    @keyframes plant {
      0% { background-position: -1200px ${parseFloat(
    per
  )}px, -800px ${per}px, -400px ${per}px}
      100% { background-position: 200px ${parseFloat(
    per
  )}px;, 100x ${per}px, 0px ${per}px}
    }`;

  const divStyle = {
    animationName: "plant",
    animationDuration: "30s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  };

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Production">
      <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart">
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart_Data"
            style={divStyle}
          >
            <style>{keyframes}</style>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart_Data_value">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart_Data_value_num">
                {Number(parseFloat(((props.cal?.pro_1 / 1000 || 0) / projectData.value.capacity) * 100).toFixed(2)).toLocaleString("en-US")}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart_Data_value_unit">
                %
              </div>
            </div>
          </div>

          <div className="DAT_Home_Overview-Main-Percent-Icon"
            style={{ cursor: "pointer" }}
          >
            <PopupState variant="popper" popupId="demo-popup-popper">
              {(popupState) => (
                <div style={{ cursor: "pointer" }}>
                  <HelpOutlineIcon
                    {...bindHover(popupState)}
                    color="action"
                    fontSize="9px"
                  />
                  <Popper {...bindPopper(popupState)} transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper
                          sx={{ width: "400px", marginLeft: "235px", p: 2 }}
                        >
                          <Typography
                            sx={{
                              fontSize: "12px",
                              textAlign: "justify",
                              marginBottom: 1.7,
                            }}
                          >
                            {dataLang.formatMessage({ id: "overview1" })}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              textAlign: "justify",
                              marginBottom: 1.7,
                            }}
                          >
                            {dataLang.formatMessage({ id: "overview2" })}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "12px", textAlign: "justify" }}
                          >
                            {dataLang.formatMessage({ id: "overview3" })}
                          </Typography>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </div>
              )}
            </PopupState>
          </div>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Detail">
          <div style={{ marginBottom: "8px", color: "grey" }}>
            {dataLang.formatMessage({ id: "production" })}
          </div>
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {Number(parseFloat(convertUnit((props.cal?.pro_1 || 0) / 1000)).toFixed(2)).toLocaleString("en-US")}
            </span>
            &nbsp;
            <span style={{ fontSize: "12px", color: "grey" }}>
              {showUnit((props.cal?.pro_1 || 0) / 1000)}W
            </span>
          </div>
          <div
            style={{
              borderBottom: "solid 1px rgb(199, 199, 199)",
              width: "50%",
              marginBottom: "8px",
            }}
          />
          <div style={{ marginBottom: "8px", color: "grey" }}>
            {dataLang.formatMessage({ id: "inCapacity" })}
          </div>
          <div>
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {Number(parseFloat(convertUnit(projectData.value.capacity)).toFixed(2)).toLocaleString("en-US")}
            </span>
            &nbsp;
            <span style={{ fontSize: "12px", color: "grey" }}>
              {showUnitk(projectData.value.capacity)}Wp
            </span>
          </div>
        </div>
      </div>

      <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Left">
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Left_Item"
            style={{ backgroundColor: "white" }}
          >
            <div>
              <img src="/dat_icon/day.png" alt="" style={{ width: "35px", height: "35px" }} />
            </div>
            <div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Left_Item_Tit">
                {dataLang.formatMessage({ id: "today" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Left_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.pro_2 || 0)).toFixed(2)).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.pro_2 || 0)}Wh
                </span>
              </div>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Left_Item"
            style={{ backgroundColor: "white" }}
          >
            <div>
              <img src="/dat_icon/year.png" alt="" style={{ width: "35px", height: "35px" }} />
            </div>
            <div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Left_Item_Tit">
                {dataLang.formatMessage({ id: "year" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Left_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.pro_year || 0))).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.pro_year || 0)}Wh
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Right">
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Right_Item"
            style={{ backgroundColor: "white" }}
          >
            <div>
              <img src="/dat_icon/month.png" alt="" style={{ width: "35px", height: "35px" }} />
            </div>
            <div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Right_Item_Tit">
                {dataLang.formatMessage({ id: "month" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Right_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.pro_month || 0))).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.pro_month || 0)}Wh
                </span>
              </div>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Right_Item"
            style={{ backgroundColor: "white" }}
          >
            <div>
              <img src="/dat_icon/total.png" alt="" style={{ width: "35px", height: "35px" }} />
            </div>
            <div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Right_Item_Tit">
                {dataLang.formatMessage({ id: "total" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Right_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.pro_3 || 0))).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.pro_3 || 0)}Wh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Consumption = (props) => {
  const dataLang = useIntl();

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption">
      <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Data">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Data_Img">
          <img src="/dat_icon/consumption.png" alt="" />
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Data_Data">
          <span>{dataLang.formatMessage({ id: "consumption" })}</span>
          &nbsp;
          <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
            {Number(parseFloat(convertUnit(props.cal?.con_1 || 0)).toFixed(2)).toLocaleString("en-US")}
          </span>
          &nbsp;
          <span style={{ fontSize: "12px", color: "grey" }}>
            {showUnitk(props.cal?.con_1 || 0)}W
          </span>
        </div>
      </div>

      <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left">
          <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item"
            style={{ backgroundColor: "white" }}
          >
            <div>
              <img src="/dat_icon/day.png" alt="" style={{ width: "35px", height: "35px" }} />
            </div>
            <div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Tit">
                {dataLang.formatMessage({ id: "today" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.con_2 || 0)).toFixed(2)).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.con_2 || 0)}Wh
                </span>
              </div>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item"
            style={{ backgroundColor: "white" }}
          >
            <div>
              <img src="/dat_icon/year.png" alt="" style={{ width: "35px", height: "35px" }} />
            </div>
            <div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Tit">
                {dataLang.formatMessage({ id: "year" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.con_year || 0)).toFixed(2)).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.con_year || 0)}Wh
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right">
          <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item"
            style={{ backgroundColor: "white" }}
          >
            <div>
              <img src="/dat_icon/month.png" alt="" style={{ width: "35px", height: "35px" }} />
            </div>
            <div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Tit">
                {dataLang.formatMessage({ id: "month" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.con_month || 0)).toFixed(2)).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.con_month || 0)}Wh
                </span>
              </div>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item"
            style={{ backgroundColor: "white" }}
          >
            <div>
              <img src="/dat_icon/total.png" alt="" style={{ width: "35px", height: "35px" }} />
            </div>
            <div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Tit">
                {dataLang.formatMessage({ id: "total" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.con_total || 0)).toFixed(2)).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.con_total || 0)}Wh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Grid = (props) => {
  const dataLang = useIntl();

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Grid">
      <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Data">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Data_Img">
          <img src="/dat_icon/grid.png" alt="" />
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Data_Data">
          <span>{dataLang.formatMessage({ id: "gridData_" })}</span>
          &nbsp;
          <span style={{ fontWeight: "650", fontFamily: "sans-serif", color: props.cal?.grid_1 < 0 ? "red" : "black" }}>
            {Number(parseFloat(convertUnit((Math.abs(props.cal?.grid_1 || 0)) / 1000)).toFixed(2)).toLocaleString("en-US")}
          </span>
          &nbsp;
          <span style={{ fontSize: "12px", color: "grey" }}>
            {showUnit(props.cal?.grid_1 || 0)}W
          </span>
        </div>
      </div>

      <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left"
          style={{ backgroundColor: "white" }}
        >
          {isMobile.value ? (
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Tit"
              style={{ borderBottom: "solid 1px rgba(198, 197, 197, 0.5)" }}
            >
              {dataLang.formatMessage({ id: "gridfeed" })}
            </div>
          ) : (
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Tit"
              style={{ borderRight: "solid 1px rgba(198, 197, 197, 0.5)" }}
            >
              {dataLang.formatMessage({ id: "gridfeed" })}
            </div>
          )}

          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "today" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.grid_in_1 || 0)).toFixed(2)).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.grid_in_1 || 0)}Wh
                </span>
              </div>
            </div>

            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "month" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.grid_in_month || 0)).toFixed(2)).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.grid_in_month || 0)}Wh
                </span>
              </div>
            </div>

            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "year" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.grid_in_year || 0)).toFixed(2)).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.grid_in_year || 0)}Wh
                </span>
              </div>
            </div>

            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "total" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.grid_in_2 || 0)).toFixed(2)).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.grid_in_2 || 0)}Wh
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left"
          style={{ backgroundColor: "white" }}
        >
          {isMobile.value ? (
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Tit"
              style={{ borderBottom: "solid 1px rgba(198, 197, 197, 0.5)" }}
            >
              {dataLang.formatMessage({ id: "purchaseE" })}
            </div>
          ) : (
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Tit"
              style={{ borderRight: "solid 1px rgba(198, 197, 197, 0.5)" }}
            >
              {dataLang.formatMessage({ id: "purchaseE" })}
            </div>
          )}

          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "today" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.grid_out_1 || 0)).toFixed(2)).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.grid_out_1 || 0)}Wh
                </span>
              </div>
            </div>

            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "month" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.grid_out_month || 0)).toFixed(2)).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.grid_out_month || 0)}Wh
                </span>
              </div>
            </div>

            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "year" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.grid_out_year || 0)).toFixed(2)).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.grid_out_year || 0)}Wh
                </span>
              </div>
            </div>

            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "total" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.grid_out_2 || 0)).toFixed(2)).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.grid_out_2 || 0)}Wh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Battery = (props) => {
  const dataLang = useIntl();
  const [state, setState] = useState(false);

  useEffect(() => {
    if (parseFloat(props.cal?.bat_1) > 0) {
      setState(true);
    } else {
      setState(false);
    }
  }, [props.cal.bat_1]);

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Battery">
      <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Data">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Data_Img">
          <img src="/dat_icon/bat.png" alt="" style={{ width: "25px", height: "35px" }} />
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Data_Status">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            <span>SoC:</span>
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {Number(parseFloat(props.cal?.bat_2 || 0).toFixed(2)).toLocaleString("en-US")}
            </span>
            <span style={{ fontSize: "12px", color: "grey" }}>%</span>
          </div>
          {state ? (
            <FaArrowLeftLong color="green" size={30} />
          ) : (
            <FaArrowRightLong color="red" size={25} />
          )}
          <span style={{ fontSize: "13px" }}>
            {state
              ? dataLang.formatMessage({ id: "charge" })
              : dataLang.formatMessage({ id: "discharge" })}
          </span>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Data_Data">
          <span>{dataLang.formatMessage({ id: "gridData_" })}</span>
          &nbsp;
          <span style={{ fontWeight: "650", fontFamily: "sans-serif", color: props.cal?.bat_1 < 0 ? "red" : "" }}>
            {Number(parseFloat(convertUnit((Math.abs(props.cal?.bat_1 || 0)) / 1000)).toFixed(2) || 0).toLocaleString("en-US")}
          </span>
          &nbsp;
          <span style={{ fontSize: "12px", color: "grey" }}>
            {showUnit(props.cal?.bat_1 || 0)}W
          </span>
        </div>
      </div>

      <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row">
        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left"
          style={{ backgroundColor: "white" }}
        >
          {isMobile.value ? (
            <div
              className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Tit"
              style={{ borderBottom: "solid 1px rgba(198, 197, 197, 0.5)" }}
            >
              {dataLang.formatMessage({ id: "charge" })}
            </div>
          ) : (
            <div
              className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Tit"
              style={{ borderRight: "solid 1px rgba(198, 197, 197, 0.5)" }}
            >
              {dataLang.formatMessage({ id: "charge" })}
            </div>
          )}

          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "today" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.bat_in_1 || 0))).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.bat_in_1 || 0)}Wh
                </span>
              </div>
            </div>

            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "month" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.bat_in_month || 0))).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.bat_in_month || 0)}Wh
                </span>
              </div>
            </div>

            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "year" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.bat_in_year || 0))).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.bat_in_year || 0)}Wh
                </span>
              </div>
            </div>

            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "total" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.bat_in_total || 0))).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.bat_in_total || 0)}Wh
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left"
          style={{ backgroundColor: "white" }}
        >
          {isMobile.value ? (
            <div
              className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Tit"
              style={{ borderBottom: "solid 1px rgb(231, 231, 231)" }}
            >
              {dataLang.formatMessage({ id: "discharge" })}
            </div>
          ) : (
            <div
              className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Tit"
              style={{ borderRight: "solid 1px rgb(231, 231, 231)" }}
            >
              {dataLang.formatMessage({ id: "discharge" })}
            </div>
          )}

          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "today" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.bat_out_1 || 0))).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.bat_out_1 || 0)}Wh
                </span>
              </div>
            </div>

            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "month" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.bat_out_month || 0))).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.bat_out_month || 0)}Wh
                </span>
              </div>
            </div>

            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "year" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.bat_out_year || 0))).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.bat_out_year || 0)}Wh
                </span>
              </div>
            </div>

            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Tit">
                {dataLang.formatMessage({ id: "total" })}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Item_Data">
                <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                  {Number(parseFloat(convertUnit(props.cal?.bat_out_total || 0))).toLocaleString("en-US")}
                </span>
                &nbsp;
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {showUnitk(props.cal?.bat_out_total || 0)}Wh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Thẻ Chart
const Day = (props) => {
  const dataLang = useIntl();

  useEffect(() => {
    console.log(props.dateType);
  }, []);

  return (
    <div className="DAT_ProjectData_Dashboard_History_Day">
      <div className="DAT_ProjectData_Dashboard_History_Year_Tit">
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Unit">
          kW
        </div>
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Label">
          {/* {props.v}: {cal.value.pro_1} kW */}
          {dataLang.formatMessage({ id: "production" })}:{" "}
          {parseFloat(cal.value.pro_1 / 1000).toFixed(2)} kW
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_History_Year_Chart">
        {(() => {
          switch (projectData.value.plantmode) {
            case "grid":
              return (
                <ResponsiveContainer
                  style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                >
                  <AreaChart width={100} height={500} data={props.data}>
                    <defs>
                      <linearGradient id="colorday" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="rgba(11,25,103)"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="90%"
                          stopColor="rgba(11,25,103)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      domain={[
                        props.data.reduce((min, item) => {
                          // console.log(item)
                          const values = Object.values({
                            x: item[props.v],
                          });
                          const currentMin = Math.min(...values.map(Number));
                          // console.log(currentMax)
                          return currentMin < min ? currentMin : min;
                        }, Infinity),
                        props.data.reduce((max, item) => {
                          // console.log(item)/
                          const values = Object.values({
                            x: item[props.v],
                          });
                          const currentMax = Math.max(...values.map(Number));
                          // console.log(currentMax)
                          return currentMax > max ? currentMax : max;
                        }, -Infinity),
                      ]}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].productionData ? (
                      <Area
                        type="monotone"
                        dataKey={props.v}
                        stroke="rgba(11,25,103,0.7)"
                        fillOpacity={1}
                        fill="rgba(11,25,103, 0.2)"
                      />
                    ) : (
                      <></>
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              );
            case "consumption":

              return (
                <ResponsiveContainer
                  style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                >
                  <AreaChart width={100} height={500} data={props.data}>
                    <defs>
                      {/* <linearGradient id="colorday" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="rgba(11,25,103)"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="90%"
                          stopColor="rgba(11,25,103)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorday2"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="rgba(247, 148, 29)" stopOpacity={0.1} />
                        <stop offset="90%" stopColor="rgba(247, 148, 29)" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient
                        id="colorday3"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="rgba(0, 163, 0)" stopOpacity={0.1} />
                        <stop offset="90%" stopColor="rgba(0, 163, 0)" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient
                        id="colorday4"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="purple"
                          stopOpacity={0.1}
                        />
                        <stop offset="90%" stopColor="purple" stopOpacity={0.1} />
                      </linearGradient> */}
                    </defs>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      domain={[
                        props.data.reduce((min, item) => {
                          // console.log(item)
                          const values = Object.values({
                            x: item[props.v],
                            y: item[props.v2],
                            z: item[props.v3],
                            t: item[props.v4],
                          });
                          const currentMin = Math.min(...values.map(Number));
                          // console.log(currentMax)
                          return currentMin < min ? currentMin : min;
                        }, Infinity),
                        props.data.reduce((max, item) => {
                          // console.log(item)/
                          const values = Object.values({
                            x: item[props.v],
                            y: item[props.v2],
                            z: item[props.v3],
                            t: item[props.v4],
                          });
                          const currentMax = Math.max(...values.map(Number));
                          // console.log(currentMax)
                          return currentMax > max ? currentMax : max;
                        }, -Infinity),
                      ]}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].productionData ? (
                      <Area
                        type="monotone"
                        dataKey={props.v}
                        stroke="rgba(11,25,103,0.7)"
                        fillOpacity={1}
                        fill="rgba(11,25,103, 0.2)"
                      />
                    ) : (
                      <></>
                    )}

                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].consumptionData ? (
                      <Area
                        type="monotone"
                        dataKey={props.v2}
                        stroke="rgba(247, 148, 29,0.7)"
                        fillOpacity={1}
                        fill="rgba(247, 148, 29, 0.2)"
                      />
                    ) : (
                      <></>
                    )}

                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].gridData ? (
                      <Area
                        type="monotone"
                        dataKey={props.v3}
                        stroke="rgba(0, 163, 0,0.7)"
                        fillOpacity={1}
                        fill="rgba(0, 163, 0, 0.2)"
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].batteryData ? (
                      <Area
                        type="monotone"
                        dataKey={props.v4}
                        stroke="rgba(120, 90, 0,0.7)"
                        fillOpacity={1}
                        fill="rgba(196, 147, 2, 0.1)"
                      />
                    ) : (
                      <></>
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              );
            case "hybrid":
              return (
                <ResponsiveContainer
                  style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                >
                  <AreaChart width={100} height={500} data={props.data}>
                    <defs>
                      {/* <linearGradient id="colorday" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="rgba(11,25,103)"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="90%"
                          stopColor="rgba(11,25,103)"
                          stopOpacity={0.1}
                        />
                      </linearGradient> */}
                    </defs>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      domain={[
                        props.data.reduce((min, item) => {
                          // console.log(item)
                          const values = Object.values({
                            x: item[props.v],
                            y: item[props.v2],
                            z: item[props.v3],
                            t: item[props.v4],
                          });
                          const currentMin = Math.min(...values.map(Number));
                          // console.log(currentMax)
                          return currentMin < min ? currentMin : min;
                        }, Infinity),
                        props.data.reduce((max, item) => {
                          // console.log(item)/
                          const values = Object.values({
                            x: item[props.v],
                            y: item[props.v2],
                            z: item[props.v3],
                            t: item[props.v4],
                          });
                          const currentMax = Math.max(...values.map(Number));
                          // console.log(currentMax)
                          return currentMax > max ? currentMax : max;
                        }, -Infinity),
                      ]}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].productionData ? (
                      <Area
                        type="monotone"
                        dataKey={props.v}
                        stroke="rgba(11,25,103,0.7)"
                        fillOpacity={1}
                        fill="rgba(11,25,103,0.2)"
                      />
                    ) : (
                      <></>
                    )}

                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].consumptionData ? (
                      <Area
                        type="monotone"
                        dataKey={props.v2}
                        stroke="rgba(247, 148, 29,0.7)"
                        fillOpacity={1}
                        fill="rgba(247, 148, 29,0.2)"
                      />
                    ) : (
                      <></>
                    )}

                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].gridData ? (
                      <Area
                        type="monotone"
                        dataKey={props.v3}
                        stroke="rgba(0, 163, 0,0.7)"
                        fillOpacity={1}
                        fill="rgba(0, 163, 0, 0.2)"
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].batteryData ? (
                      <Area
                        type="monotone"
                        dataKey={props.v4}
                        stroke="rgba(120, 90, 0,0.7)"
                        fillOpacity={1}
                        fill="rgba(196, 147, 2, 0.1)"
                      />
                    ) : (
                      <></>
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              );
            default:
              return <></>;
          }
        })()}
      </div>
    </div>
  );
};

const Month = (props) => {
  const dataLang = useIntl();

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={props.fill}
        rx="3"
        ry="3"
        opacity="1"
      />
    );
  };

  return (
    <div className="DAT_ProjectData_Dashboard_History_Year">
      <div className="DAT_ProjectData_Dashboard_History_Year_Tit">
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Unit">
          kWh
        </div>
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Label">
          {/* {props.v}: {cal.value.pro_month} kWh */}
          {dataLang.formatMessage({ id: "monthOutput" })}: {cal.value.pro_month}{" "}
          kWh
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_History_Year_Chart">
        {(() => {
          switch (projectData.value.plantmode) {
            case "grid":
              return (
                <ResponsiveContainer
                  style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                >
                  <BarChart width={150} height={200} data={props.data}>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      // domain={[0, Math.max(...props.data.map((item) => item[props.v]))]}
                      domain={[
                        0,
                        props.data.reduce((max, item) => {
                          // console.log(item)/
                          const values = Object.values({
                            x: item[props.v],
                            // y: item[props.v2],
                            // z: item[props.v3],
                            // t: item[props.v4],
                            // o: item[props.v5],
                            // p: item[props.v6],
                          });
                          const currentMax = Math.max(...values.map(Number));
                          // console.log(currentMax)
                          return currentMax > max ? currentMax : max;
                        }, -Infinity),
                      ]}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Legend />
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].productionData ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(11,25,103)" />}
                        dataKey={props.v}
                        fill="rgba(11,25,103)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(11,25,103)" }}
                      />
                    ) : (
                      <></>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              );
            case "consumption":
              return (
                <ResponsiveContainer
                  style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                >
                  <BarChart width={150} height={200} data={props.data}>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      // domain={[0, Math.max(...props.data.map((item) => item[props.v]))]}
                      domain={[
                        0,
                        props.data.reduce((max, item) => {
                          // console.log(item)/
                          const values = Object.values({
                            x: item[props.v],
                            // y: item[props.v2],
                            // z: item[props.v3],
                            // t: item[props.v4],
                            // o: item[props.v5],
                            // p: item[props.v6],
                          });
                          const currentMax = Math.max(...values.map(Number));
                          // console.log(currentMax)
                          return currentMax > max ? currentMax : max;
                        }, -Infinity),
                      ]}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Legend />
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].productionData ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(11,25,103)" />}
                        dataKey={props.v}
                        fill="rgba(11,25,103)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(11,25,103)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].consumptionData ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(97,88,194,0.8)" />}
                        dataKey={props.v2}
                        fill="rgba(97,88,194,0.8)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(97,88,194,0.8)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].dailygridin ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(247, 148, 29)" />}
                        dataKey={props.v3}
                        fill="rgba(247, 148, 29)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(247, 148, 29)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].dailygridout ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(0, 163, 0)" />}
                        dataKey={props.v4}
                        fill="rgba(0, 163, 0)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(0, 163, 0)" }}
                      />
                    ) : (
                      <></>
                    )}

                  </BarChart>
                </ResponsiveContainer>
              );
            case "hybrid":
              return (
                <ResponsiveContainer
                  style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                >
                  <BarChart width={150} height={200} data={props.data}>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      // domain={[0, Math.max(...props.data.map((item) => item[props.v]))]}
                      domain={[
                        0,
                        props.data.reduce((max, item) => {
                          // console.log(item)/
                          const values = Object.values({
                            x: item[props.v],
                            // y: item[props.v2],
                            // z: item[props.v3],
                            // t: item[props.v4],
                            // o: item[props.v5],
                            // p: item[props.v6],
                          });
                          const currentMax = Math.max(...values.map(Number));
                          // console.log(currentMax)
                          return currentMax > max ? currentMax : max;
                        }, -Infinity),
                      ]}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Legend />
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].productionData ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(11,25,103)" />}
                        dataKey={props.v}
                        fill="rgba(11,25,103)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(11,25,103)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].consumptionData ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(97,88,194,0.8)" />}
                        dataKey={props.v2}
                        fill="rgba(97,88,194,0.8)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(97,88,194,0.8)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].dailygridin ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(247, 148, 29)" />}
                        dataKey={props.v3}
                        fill="rgba(247, 148, 29)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(247, 148, 29)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].dailygridout ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(0, 163, 0)" />}
                        dataKey={props.v4}
                        fill="rgba(0, 163, 0)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(0, 163, 0)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].charge ? (
                      <Bar
                        shape={<TriangleBar fill="purple" />}
                        dataKey={props.v5}
                        fill="purple"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "purple" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].discharge ? (
                      <Bar
                        shape={<TriangleBar fill="grey" />}
                        dataKey={props.v6}
                        fill="grey"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "grey" }}
                      />
                    ) : (
                      <></>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              );
            default:
              return <></>;
          }
        })()}
      </div>
    </div>
  );
};

const Year = (props) => {
  const dataLang = useIntl();

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={props.fill}
        rx="3"
        ry="3"
        opacity="1"
      />
    );
  };

  return (
    <div className="DAT_ProjectData_Dashboard_History_Year">
      <div className="DAT_ProjectData_Dashboard_History_Year_Tit">
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Unit">
          kWh
        </div>
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Label">
          {/* {props.v}: {cal.value.pro_year} kWh */}
          {dataLang.formatMessage({ id: "yearOutput" })}: {cal.value.pro_year}{" "}
          kWh
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_History_Year_Chart">
        {(() => {
          switch (projectData.value.plantmode) {
            case "grid":
              return (
                <ResponsiveContainer
                  style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                >
                  <BarChart width={150} height={200} data={props.data}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      domain={[
                        0,
                        Math.max(...props.data.map((item) => item[props.v])),
                      ]}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Legend />
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].productionData ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(11,25,103)" />}
                        dataKey={props.v}
                        fill="rgba(11,25,103)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(11,25,103)" }}
                      />
                    ) : (
                      <></>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              );
            case "consumption":
              return (
                <ResponsiveContainer
                  style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                >
                  <BarChart width={150} height={200} data={props.data}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      domain={[
                        0,
                        Math.max(...props.data.map((item) => item[props.v])),
                      ]}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Legend />
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].productionData ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(11,25,103)" />}
                        dataKey={props.v}
                        fill="rgba(11,25,103)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(11,25,103)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].consumptionData ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(97,88,194,0.8)" />}
                        dataKey={props.v2}
                        fill="rgba(97,88,194,0.8)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(97,88,194,0.8)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].dailygridin ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(247, 148, 29)" />}
                        dataKey={props.v3}
                        fill="rgba(247, 148, 29)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(247, 148, 29)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].dailygridout ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(0, 163, 0)" />}
                        dataKey={props.v4}
                        fill="rgba(0, 163, 0)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(0, 163, 0)" }}
                      />
                    ) : (
                      <></>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              );
            case "hybrid":
              return (
                <ResponsiveContainer
                  style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                >
                  <BarChart width={150} height={200} data={props.data}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      domain={[
                        0,
                        Math.max(...props.data.map((item) => item[props.v])),
                      ]}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Legend />
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].productionData ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(11,25,103)" />}
                        dataKey={props.v}
                        fill="rgba(11,25,103)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(11,25,103)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].consumptionData ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(97,88,194,0.8)" />}
                        dataKey={props.v2}
                        fill="rgba(97,88,194,0.8)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(97,88,194,0.8)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].dailygridin ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(247, 148, 29)" />}
                        dataKey={props.v3}
                        fill="rgba(247, 148, 29)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(247, 148, 29)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].dailygridout ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(0, 163, 0)" />}
                        dataKey={props.v4}
                        fill="rgba(0, 163, 0)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(0, 163, 0)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].charge ? (
                      <Bar
                        shape={<TriangleBar fill="purple" />}
                        dataKey={props.v5}
                        fill="purple"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "purple" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].discharge ? (
                      <Bar
                        shape={<TriangleBar fill="grey" />}
                        dataKey={props.v6}
                        fill="grey"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "grey" }}
                      />
                    ) : (
                      <></>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              );
            default:
              return <></>;
          }
        })()}
      </div>
    </div>
  );
};

const Total = (props) => {
  const dataLang = useIntl();

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={props.fill}
        rx="3"
        ry="3"
        opacity="1"
      />
    );
  };

  return (
    <div className="DAT_ProjectData_Dashboard_History_Year">
      <div className="DAT_ProjectData_Dashboard_History_Year_Tit">
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Unit">
          MWh
        </div>
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Label">
          {/* {props.v}: {cal.value.pro_total} kWh */}
          {props.v}: {cal.value.pro_total} kWh
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_History_Year_Chart">
        {(() => {
          switch (projectData.value.plantmode) {
            case "grid":
              return (
                <ResponsiveContainer
                  style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                >
                  <BarChart width={150} height={200} data={props.data}>
                    <XAxis dataKey="year" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      domain={[
                        0,
                        Math.max(...props.data.map((item) => item[props.v])),
                      ]}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Legend />
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].productionData ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(11,25,103)" />}
                        dataKey={props.v}
                        fill="rgba(11,25,103)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(11,25,103)" }}
                      />
                    ) : (
                      <></>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              );
            case "consumption":
              return (
                <ResponsiveContainer
                  style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                >
                  <BarChart width={150} height={200} data={props.data}>
                    <XAxis dataKey="year" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      domain={[
                        0,
                        Math.max(...props.data.map((item) => item[props.v])),
                      ]}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Legend />
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].productionData ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(11,25,103)" />}
                        dataKey={props.v}
                        fill="rgba(11,25,103)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(11,25,103)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].consumptionData ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(97,88,194,0.8)" />}
                        dataKey={props.v2}
                        fill="rgba(97,88,194,0.8)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(97,88,194,0.8)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].dailygridin ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(247, 148, 29)" />}
                        dataKey={props.v3}
                        fill="rgba(247, 148, 29)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(247, 148, 29)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].dailygridout ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(0, 163, 0)" />}
                        dataKey={props.v4}
                        fill="rgba(0, 163, 0)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(0, 163, 0)" }}
                      />
                    ) : (
                      <></>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              );
            case "hybrid":
              return (
                <ResponsiveContainer
                  style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                >
                  <BarChart width={150} height={200} data={props.data}>
                    <XAxis dataKey="year" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      domain={[
                        0,
                        Math.max(...props.data.map((item) => item[props.v])),
                      ]}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Legend />
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].productionData ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(11,25,103)" />}
                        dataKey={props.v}
                        fill="rgba(11,25,103)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(11,25,103)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].consumptionData ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(97,88,194,0.8)" />}
                        dataKey={props.v2}
                        fill="rgba(97,88,194,0.8)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(97,88,194,0.8)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].dailygridin ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(247, 148, 29)" />}
                        dataKey={props.v3}
                        fill="rgba(247, 148, 29)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(247, 148, 29)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].dailygridout ? (
                      <Bar
                        shape={<TriangleBar fill="rgba(0, 163, 0)" />}
                        dataKey={props.v4}
                        fill="rgba(0, 163, 0)"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "rgba(0, 163, 0)" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].charge ? (
                      <Bar
                        shape={<TriangleBar fill="purple" />}
                        dataKey={props.v5}
                        fill="purple"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "purple" }}
                      />
                    ) : (
                      <></>
                    )}
                    {filterchart.value[projectData.value.plantmode][
                      props.dateType
                    ].discharge ? (
                      <Bar
                        shape={<TriangleBar fill="grey" />}
                        dataKey={props.v6}
                        fill="grey"
                        barSize={15}
                        legendType="circle"
                        style={{ fill: "grey" }}
                      />
                    ) : (
                      <></>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              );
            default:
              return <></>;
          }
        })()}
      </div>
    </div>
  );
};
