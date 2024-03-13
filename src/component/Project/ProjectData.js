import React, { useEffect, useState, useRef } from "react";
import "./Project.scss";

import AddGateway from "./AddGateway";
import {
  Empty,
  plantState,
  projectData,
  deviceData,
  Inverter,
  popupState,
} from "./Project";
import { isMobile } from "../Navigation/Navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { signal } from "@preact/signals-react";
import DataTable from "react-data-table-component";
import moment from "moment-timezone";
import Weather from "./Weather";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { Token, ruleInfor } from "../../App";
import axios from "axios";
import Popup from "./Popup";
import { useIntl } from "react-intl";

import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosCloud,
  IoMdMore,
} from "react-icons/io";
import {
  IoAddOutline,
  IoArrowForward,
  IoCalendarOutline,
  IoTrashOutline,
} from "react-icons/io5";
import {
  MdDelete,
  MdEdit,
  MdOutlineError,
  MdPermDataSetting,
} from "react-icons/md";
import { FaCheckCircle, FaTree } from "react-icons/fa";
import { RiMoneyCnyCircleFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { plantData } from "./AddProject";
import { set } from "lodash";

export const dropState = signal(false);
export const popupAddGateway = signal(false);
export const popupAddSubsystem = signal(false);
export const temp = signal([]);
export const coalsave = signal({
  value: 1,
  ef: 0.7221,
  avr: 0.517,
  tree: 0.054,
});

const tabMobile = signal(false);
const tabLable = signal("");
const tab = signal("logger");
const tabMobileAlert = signal(false);
const tabLableAlert = signal("");
const tabAlert = signal("all");
const open = signal([]);
const close = signal([]);
const cal = signal({});

const dataMeter = [];

const dataAlert = [];

export default function ProjectData(props) {
  const dataLang = useIntl();
  const lang = useSelector((state) => state.admin.lang);
  const [nav, setNav] = useState(projectData.value.plantmode === "grid" ? "production" : "graph");
  const [dateType, setDateType] = useState("date");
  const [view, setView] = useState("dashboard");
  const [configname, setConfigname] = useState(
    dataLang.formatMessage({ id: "choosePara" })
  );
  const [dropConfig, setDropConfig] = useState(false);
  const [tempInverter, setTempInverter] = useState({});
  const [dataDay, setDataDay] = useState([]);
  const [vDay, setVDay] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [dataMonth, setDataMonth] = useState([]);
  const [vMonth, setVMonth] = useState(
    dataLang.formatMessage({ id: "unknown" })
  );
  const [dataYear, setDataYear] = useState([]);
  const [vYear, setVYear] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [dataTotal, setDataTotal] = useState([]);
  const [vTotal, setVTotal] = useState(dataLang.formatMessage({ id: 'unknown' }));
  const [snlogger, setSnlogger] = useState(dataLang.formatMessage({ id: 'unknown' }));
  const [type, setType] = useState("");
  const [invt, setInvt] = useState({})
  const box = useRef();

  const [d, setD] = useState({
    date: moment(new Date()).format("YYYY-MM-DD"),
    month: moment(new Date()).format("YYYY-MM"),
    year: moment(new Date()).format("YYYY"),
    total: "Tổng",
  });

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
      name: dataLang.formatMessage({ id: "status" }),
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
        <div>
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
      name: dataLang.formatMessage({ id: "setting" }),
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
            <></>
          )}
          <div
            className="DAT_ModifyBox"
            id={row.sn + "_Modify"}
            style={{ display: "none" }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            <div className="DAT_ModifyBox_Fix"
              id={row.sn + "_edit"}
              onClick={(e) => handleEdit(e)}
            >
              <FiEdit size={14} />
              &nbsp;
              {dataLang.formatMessage({ id: "edit" })}
            </div>
            <div className="DAT_ModifyBox_Remove"
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

  const handleNav = (e) => {
    var id = e.currentTarget.id;
    setNav(id);
  };

  const handleDate = (e) => {
    var id = e.currentTarget.id;
    setDateType(id);
  };

  const handleView = (e) => {
    var id = e.currentTarget.id;
    setView(id);
    if (id === "dashboard") {
      setNav("graph");
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
    tab.value = id;
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
      setD({ ...d, date: moment(date).format("DD/MM/YYYY") });
      const getDaily = async () => {
        const d = await callApi("post", host.DATA + "/getChart", {
          plantid: projectData.value.plantid,
          date: moment(date).format("MM/DD/YYYY"),
        });
        setDataDay([]);
        console.log(projectData.value.plantid)
        console.log(d)
        if (d.status) {
          console.log(d.data);
          let vDay = d.data.name;
          d.data.data.map((item) => {
            setDataDay((old) => [
              ...old,
              { time: item.time, [vDay]: item.value },
            ]);
          });
          setVDay(d.data.name);
        } else {
          setDataDay([]);
          setVDay(dataLang.formatMessage({ id: "unknown" }));
        }
      };

      getDaily();
    } else if (dateType === "month") {
      setD({ ...d, month: moment(date).format("MM/YYYY") });

      const getMonth = async () => {
        const d = await callApi("post", host.DATA + "/getMonthChart", {
          plantid: projectData.value.plantid,
          month: moment(date).format("MM/YYYY"),
        });
        if (d.status) {
          //console.log(d.data)
          let vMonth = dataLang.formatMessage({ id: d.data.name });
          const currentDate = new Date(date);
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
          d.data.data.map((item, i) => {
            let index = datamonth_.findIndex((d) => d.date == item.date);
            datamonth_[index][vMonth] = item.value;
            sum_month[i] = item.value;
            if (i == d.data.data.length - 1) {
              cal.value["pro_month"] = parseFloat(
                sum_month.reduce((a, b) => Number(a) + Number(b), 0)
              ).toFixed(2);
            }
          });
          setVMonth(vMonth);
          setDataMonth(datamonth_);
        } else {
          setDataMonth([]);
          setVMonth(dataLang.formatMessage({ id: "unknown" }));
        }
      };
      getMonth();
    } else if (dateType === "year") {
      setD({ ...d, year: moment(date).format("YYYY") });

      const getYear = async () => {
        const d = await callApi("post", host.DATA + "/getYearChart", {
          plantid: projectData.value.plantid,
          year: moment(date).format("YYYY"),
        });
        if (d.status) {
          //console.log(d.data)
          let vYear = dataLang.formatMessage({ id: d.data.name });
          let sum_year = [];
          let datayear_ = [];
          for (let i = 1; i <= 12; i++) {
            datayear_ = [
              ...datayear_,
              { month: i < 10 ? `0${i}` : `${i}`, [vYear]: 0 },
            ];
          }
          d.data.data.map((item, i) => {
            let index = datayear_.findIndex((d) => d.month == item.month);
            datayear_[index][vYear] = item.value;
            sum_year[i] = item.value;
            if (i == d.data.data.length - 1) {
              cal.value["pro_year"] = parseFloat(
                sum_year.reduce((a, b) => Number(a) + Number(b), 0)
              ).toFixed(2);
            }
          });
          setVYear(vYear);
          setDataYear(datayear_);
        } else {
          setDataYear([]);
          setVYear(dataLang.formatMessage({ id: "unknown" }));
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

  useEffect(() => {
    // filter data AlertTable
    open.value = dataAlert.filter((item) => item.status == true);
    close.value = dataAlert.filter((item) => item.status == false);
    tabLableAlert.value = listAlertTab[0].name;
    tabLable.value = listDeviceTab[0].name;

    // data InverterTable
    setTempInverter([]);
    deviceData.value.map((item) => {
      const db = Inverter.value.find((data) => data.SN == item.inverterSN);
      setTempInverter((old) => [...old, db]);
    });

    // data Day
    const getDaily = async () => {
      const d = await callApi("post", host.DATA + "/getChart", {
        plantid: projectData.value.plantid,
        date: moment(new Date()).format("MM/DD/YYYY"),
      });
      setDataDay([]);
      if (d.status) {
        //console.log(d.data)
        let vDay = dataLang.formatMessage({ id: d.data.name });
        d.data.data.map((item) => {
          setDataDay((old) => [
            ...old,
            { time: item.time, [vDay]: item.value },
          ]);
        });
        setVDay(dataLang.formatMessage({ id: d.data.name }));
      }
    };
    getDaily();

    //data Month
    const getMonth = async () => {
      const d = await callApi("post", host.DATA + "/getMonthChart", {
        plantid: projectData.value.plantid,
        month: moment(new Date()).format("MM/YYYY"),
      });
      if (d.status) {
        //console.log(d.data)
        let vMonth = dataLang.formatMessage({ id: d.data.name });
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
        d.data.data.map((item, i) => {
          let index = datamonth_.findIndex((d) => d.date == item.date);
          datamonth_[index][vMonth] = item.value;
          sum_month[i] = item.value;
          if (i == d.data.data.length - 1) {
            cal.value["pro_month"] = parseFloat(
              sum_month.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
          }
        });
        setVMonth(vMonth);
        setDataMonth(datamonth_);
      } else {
        setDataMonth([]);
        setVMonth(dataLang.formatMessage({ id: "unknown" }));
      }
    };
    getMonth();

    //data Year
    const getYear = async () => {
      const d = await callApi("post", host.DATA + "/getYearChart", {
        plantid: projectData.value.plantid,
        year: moment(new Date()).format("YYYY"),
      });
      //console.log(d)
      if (d.status) {
        //console.log(d.data)
        let vYear = dataLang.formatMessage({ id: d.data.name });
        let sum_year = [];
        let datayear_ = [];
        for (let i = 1; i <= 12; i++) {
          datayear_ = [
            ...datayear_,
            { month: i < 10 ? `0${i}` : `${i}`, [vYear]: 0 },
          ];
        }
        d.data.data.map((item, i) => {
          let index = datayear_.findIndex((d) => d.month == item.month);
          datayear_[index][vYear] = item.value;
          sum_year[i] = item.value;
          if (i == d.data.data.length - 1) {
            cal.value["pro_year"] = parseFloat(
              sum_year.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
          }
        });
        setVYear(vYear);
        setDataYear(datayear_);
      } else {
        setDataYear([]);
        setVYear(dataLang.formatMessage({ id: "unknown" }));
      }
    };
    getYear();

    //data Total
    const getTotal = async () => {
      const d = await callApi("post", host.DATA + "/getTotalChart", {
        plantid: projectData.value.plantid,
      });
      setDataTotal([]);
      if (d.status) {
        //console.log(d.data)
        // let vTotal = dataLang.formatMessage({ id: d.data.name });
        let sum_total = [];
        d.data.data.map((item, i) => {
          setDataTotal((old) => [
            ...old,
            {
              year: item.year,
              [dataLang.formatMessage({ id: "totalOutput" })]: item.value,
            },
          ]);
          sum_total[i] = item.value;
          if (i == d.data.data.length - 1) {
            cal.value["pro_total"] = parseFloat(
              sum_total.reduce((a, b) => Number(a) + Number(b), 0)
            ).toFixed(2);
          }
        });
        console.log(d.data.name);
        setVTotal(dataLang.formatMessage({ id: d.data.name }));
      }
    };
    getTotal();

    //data Logger
    const getLogger = async () => {
      let d = await callApi("post", host.DATA + "/getLogger", {
        plantid: projectData.value.plantid,
      });
      temp.value = d;
      d.map(async (item) => {
        const res = await invtCloud(
          '{"deviceCode":"' + item.sn + '"}',
          Token.value.token
        );
        // console.log(res)
        if (res.ret === 0) {
          //console.log(res.data)
          setInvt((pre) => ({ ...pre, [item.sn]: res.data }));
        } else {
          setInvt((pre) => ({ ...pre, [item.sn]: {} }));
        }
      });
    };
    getLogger();

    return () => {
      cal.value = {};
    };

    // eslint-disable-next-line
  }, [lang]);

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
    //console.log("data", temp.value)
    temp.value.map(async (item, i) => {
      Object.entries(item.data).map(([key, value]) => {
        switch (value.type) {
          case "sum":
            let inum = [];
            let cal_ = JSON.parse(value.cal);
            Object.entries(value.register).map(([key, value]) => {
              let n = JSON.parse(value);
              inum[key] =
                parseFloat(invt[item.sn]?.[n[0]] || 0) *
                parseFloat(cal_[0]) *
                parseFloat(invt[item.sn]?.[n[1]] || 0) *
                parseFloat(cal_[1]);
            });

            num_[key][i] = inum.reduce((accumulator, currentValue) => {
              return Number(accumulator) + Number(currentValue);
            }, 0);
            if (i == temp.value.length - 1) {
              //console.log("Total", total)
              if (invt[item.sn]?.enabled == 1) {
                cal.value[key] = parseFloat(
                  num_[key].reduce((accumulator, currentValue) => {
                    return Number(accumulator) + Number(currentValue);
                  }, 0) / 1000
                ).toFixed(2);
              } else {
                cal.value[key] = 0;
              }
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
              //console.log(num_)
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
              //console.log(num_)
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

    // console.log(cal.value)
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
                    <IoAddOutline size={20} color="white" />
                  </button>
                </div>
              ) : (
                <></>
              )}

              <div
                className="DAT_ProjectData_Header_Right_Close"
                onClick={() => (plantState.value = "default")}
              >
                <RxCross2 size={20} color="white" />
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
                      <div style={{ fontSize: 22, marginBottom: "8px" }}>
                        {tit[view]}
                      </div>

                      <div style={{ color: "grey", fontSize: 14 }}>
                        {dataLang.formatMessage({ id: "lastupdate" })}{" "}
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
                    onClick={() => (popupAddGateway.value = true)}
                  >
                    <IoAddOutline size={20} color="white" />
                  </button>
                </div>
              ) : (
                <></>
              )}
              <div
                className="DAT_ProjectData_Header_Right_Close"
                onClick={() => (plantState.value = "default")}
              >
                <RxCross2 size={20} color="white" />
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
                        <img
                          src={
                            projectData.value.img
                              ? projectData.value.img
                              : "/dat_picture/solar_panel.png"
                          }
                          alt=""
                        />
                      </div>

                      <div className="DAT_ProjectData_Dashboard_Data_Left_Info">
                        <div
                          className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr"
                          style={{ marginBottom: "16px" }}
                        >
                          <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Title">
                            {dataLang.formatMessage({ id: "address" })}
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
                            {dataLang.formatMessage({ id: "status" })}
                          </div>
                          <div
                            className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Content"
                            style={{ textAlign: "right" }}
                          >
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
                        </div>

                        <div
                          className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr"
                          style={{ marginBottom: "16px" }}
                        >
                          <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Title">
                            {dataLang.formatMessage({ id: "projType" })}
                          </div>
                          <div
                            className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Content"
                            style={{ textAlign: "right" }}
                          >
                            {projectData.value.planttype === "industry" ? (
                              <>{dataLang.formatMessage({ id: "factory" })}</>
                            ) : (
                              <>{dataLang.formatMessage({ id: "household" })}</>
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
                            {dataLang.formatMessage({ id: "phone" })}
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
                            display:
                              projectData.value.plantmode === "grid"
                                ? "none"
                                : "block",
                            // width: nav === "graph" ? "150px" : "60px",
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          {dataLang.formatMessage({ id: "graph" })}
                        </div>
                        <div
                          className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item"
                          id="production"
                          style={{
                            color: nav === "production" ? color.cur : color.pre,
                            // width: nav === "production" ? "300px" : "60px",
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          {dataLang.formatMessage({ id: "productionData" })}
                        </div>
                        <div
                          className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item"
                          id="consumption"
                          style={{
                            color:
                              nav === "consumption" ? color.cur : color.pre,
                            display:
                              projectData.value.plantmode === "grid"
                                ? "none"
                                : "block",
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          {dataLang.formatMessage({ id: "consumptionData" })}
                        </div>
                        <div
                          className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item"
                          id="grid"
                          style={{
                            color: nav === "grid" ? color.cur : color.pre,
                            display:
                              projectData.value.plantmode === "grid"
                                ? "none"
                                : "block",
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          {dataLang.formatMessage({ id: "grid" })}
                        </div>
                        <div
                          className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item"
                          id="battery"
                          style={{
                            color: nav === "battery" ? color.cur : color.pre,
                            display:
                              projectData.value.plantmode === "grid" ||
                              projectData.value.plantmode === "consumption"
                                ? "none"
                                : "block",
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          {dataLang.formatMessage({ id: "batteryData" })}
                        </div>
                      </div>

                      {(() => {
                        switch (nav) {
                          case "graph":
                            return <Graph type={projectData.value.plantmode} />;
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
                            {dataLang.formatMessage({ id: 'choosePara' })}
                          </button>
                        </div>

                        <div className="DAT_ProjectData_Dashboard_History_Tit_Right_Export">
                          <button>
                            {dataLang.formatMessage({ id: "export" })}
                          </button>
                        </div>

                        <DatePicker
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
                          return <Day data={dataDay} v={vDay} />;
                        case "month":
                          return <Month data={dataMonth} v={vMonth} />;
                        case "year":
                          return <Year data={dataYear} v={vYear} />;
                        case "total":
                          return <Total data={dataTotal} v={vTotal} />;
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
                              placeholder={dataLang.formatMessage({
                                id: "enterPara",
                              })}
                            />
                            <CiSearch size={20} />
                          </div>
                          <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item">
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
                                      <input id="Production" type="checkbox" />
                                      <label htmlFor="Production">
                                        {dataLang.formatMessage({ id: 'production' })}
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                {/* <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                  <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                    {dataLang.formatMessage({ id: "envi" })}
                                  </th>
                                  <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                    <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                      <input id="Weather" type="checkbox" />
                                      <label htmlFor="Weather">
                                        {dataLang.formatMessage({
                                          id: "weather",
                                        })}
                                      </label>
                                    </div>
                                    <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                      <input id="Temperature" type="checkbox" />
                                      <label htmlFor="Temperature">
                                        {dataLang.formatMessage({
                                          id: "temperature",
                                        })}
                                      </label>
                                    </div>
                                  </td>
                                </tr> */}
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
                        <span>{dataLang.formatMessage({ id: "taskSeq" })}</span>
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
                            {dataLang.formatMessage({ id: "inProgress" })}
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
                            {dataLang.formatMessage({ id: "complete" })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="DAT_ProjectData_Dashboard_More_Right">
                      <div className="DAT_ProjectData_Dashboard_More_Right_Tit">
                        {dataLang.formatMessage({ id: "environment" })}
                      </div>

                      <div className="DAT_ProjectData_Dashboard_More_Right_Content">
                        <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col">
                          <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item_Icon">
                              <MdPermDataSetting size={24} color="#6495ed" />
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
                              <RiMoneyCnyCircleFill size={24} color="#6495ed" />
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
                        switch (tab.value) {
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
                                            <></>
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
                                            <></>
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
                            return (
                              <>
                                {tempInverter.value?.map((item, i) => {
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
                                            <></>
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
                                            <></>
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
                          case "meter":
                            return (
                              <>
                                {tempInverter.value?.map((item, i) => {
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
                                            <></>
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
                                    <></>
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
                          default:
                            return <></>;
                        }
                      })()}
                    </div>
                  ) : (
                    <div className="DAT_ProjectData_Device_Table">
                      <div className="DAT_Toollist_Tab">
                        {listDeviceTab.map((item, i) => {
                          return tab.value === item.id ? (
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

                      <div className="DAT_ProjectData_Device_Table_Content">
                        {(() => {
                          switch (tab.value) {
                            case "inverter":
                              return (
                                <DataTable
                                  className="DAT_Table_Device"
                                  columns={columnInverter}
                                  data={tempInverter}
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

                  {/* </div> */}
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
          <AddGateway data={temp.value} />
        </div>
      ) : (
        <></>
      )}

      {popupState.value ? (
        <div className="DAT_DevicePopup">
          <Popup plantid={projectData.value.plantid} type="logger" sn={snlogger} data={temp.value} func={type} />
        </div>
      ) : (
        <> </>
      )}

      {isMobile.value ? (
        <>
          {dropState.value ? (
            <div className="DAT_ProjectDataDrop">
              <div
                className="DAT_ProjectDataDrop_Item"
                id="dashboard"
                style={{ borderBottom: "solid 1px rgb(199, 199, 199)" }}
                onClick={(e) => handleView(e)}
              >
                {dataLang.formatMessage({ id: "monitor" })}
              </div>
              <div
                className="DAT_ProjectDataDrop_Item"
                id="device"
                style={{ borderBottom: "solid 1px rgb(199, 199, 199)" }}
                onClick={(e) => handleView(e)}
              >
                {dataLang.formatMessage({ id: "device" })}
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
              <div
                className="DAT_ProjectDataDrop_Item"
                id="dashboard"
                style={{ borderBottom: "solid 1px rgb(199, 199, 199)" }}
                onClick={(e) => handleView(e)}
              >
                {dataLang.formatMessage({ id: "monitor" })}
              </div>
              <div
                className="DAT_ProjectDataDrop_Item"
                id="device"
                style={{ borderBottom: "solid 1px rgb(199, 199, 199)" }}
                onClick={(e) => handleView(e)}
              >
                {dataLang.formatMessage({ id: "device" })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
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
            return <GraphGrid />;
          case "consumption":
            return <></>;
          case "hybrid":
            return <GraphFull />;
          case "ESS":
            return <GraphFull />;
          default:
            <></>;
        }
      })()}
    </div>
  );
};

const GraphGrid = (props) => {
  const LineA = (props) => {
    return (
      <svg
        width={`${props.width}px`}
        height={`${props.height}px`}
        verssion="1.1"
      >
        <path
          className="path"
          d="M 6 6 L 210 6"
          style={{
            width: "100%",
            height: "100%",
            fill: "none",
            stroke: "rgb(107, 107, 107,0.4)",
            strokeWidth: "5",
            strokeLinecap: "round",
            overflow: "hidden",
          }}
        />
        {projectData.value.state ? (
          <path
            d="M 0 0 L 20 0"
            style={{
              position: "absolute",
              zIndex: "20",
              top: "0",
              left: "0",
              stroke: "rgb(103, 179, 255)",
              strokeWidth: "5",
              strokeLinecap: "round",
            }}
          >
            <animateMotion
              path="M 6 6 L 190 6"
              dur="2s"
              repeatCount="indefinite"
            ></animateMotion>
          </path>
        ) : (
          <></>
        )}
      </svg>
    );
  };

  const ImgGrid = (props) => {
    return (
      <img
        src="/dat_picture/grid.png"
        style={{ width: `${props.width}px`, height: `${props.height}px` }}
        alt=""
      />
    );
  };

  const ImgSolar = (props) => {
    return (
      <img
        src="/dat_picture/solar-panel.png"
        style={{ width: `${props.width}px`, height: `${props.height}px` }}
        alt=""
      />
    );
  };

  return (
    <div
      className="DAT_ProjectData_Dashboard_Data_Center_Graph_SingleLine"
      style={{ scale: isMobile.value ? "0.8" : "1" }}
    >
      <div>
        <ImgSolar width="100" height="100" />
      </div>
      <div>
        <LineA width="220" height="25" />
      </div>
      <div>
        <ImgGrid width="100" height="180" />
      </div>
    </div>
  );
};

const GraphFull = (props) => {
  const LineA = (props) => {
    return (
      <svg
        width={`${props.width}px`}
        height={`${props.height}px`}
        version="1.1"
      >
        <path
          className="path"
          d="M 105 7 L 25 7 C 14 7 7 14 7 25 L 7 155"
          style={{
            width: "100%",
            height: "100%",
            fill: "none",
            stroke: "rgb(107, 107, 107,0.4)",
            strokeWidth: "5",
            strokeLinecap: "round",
            overflow: "hidden",
          }}
        />
        <circle
          r={4}
          style={{
            fill: "none",
            stroke: "#3e80fb",
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
    );
  };

  const LineB = (props) => {
    return (
      <svg
        width={`${props.width}px`}
        height={`${props.height}px`}
        version="1.1"
      >
        <path
          d="M 35 7 L 35 35"
          style={{
            width: "100%",
            height: "100%",
            fill: "none",
            stroke: "rgb(107, 107, 107,0.4)",
            strokeWidth: "5",
            strokeLinecap: "round",
            overflow: "hidden",
          }}
        />
        <circle
          r={4}
          style={{
            fill: "none",
            stroke: "#3e80fb",
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
    );
  };

  const LineC = (props) => {
    return (
      <svg
        width={`${props.width}px`}
        height={`${props.height}px`}
        version="1.1"
      >
        <path
          d="M 10 7 L 90 7 C 101 7 109 14 109 25 L 109 155"
          style={{
            width: "100%",
            height: "100%",
            fill: "none",
            stroke: "rgb(107, 107, 107,0.4)",
            strokeWidth: "5",
            strokeLinecap: "round",
            overflow: "hidden",
          }}
        />
        <circle
          r={4}
          style={{
            fill: "none",
            stroke: "#3e80fb",
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
    );
  };

  const LineD = (props) => {
    return (
      <svg
        width={`${props.width}px`}
        height={`${props.height}px`}
        version="1.1"
      >
        <path
          className="path"
          d="M 15 36 L 90 36 C 101 36 109 29 109 22 L 109 7"
          style={{
            width: "100%",
            height: "100%",
            fill: "none",
            stroke: "rgb(107, 107, 107,0.4)",
            strokeWidth: "5",
            strokeLinecap: "round",
            overflow: "hidden",
          }}
        />
        <circle
          r={4}
          style={{
            fill: "none",
            stroke: "#3e80fb",
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
    );
  };

  const LineE = (props) => {
    return (
      <svg
        width={`${props.width}px`}
        height={`${props.height}px`}
        version="1.1"
      >
        <path
          d="M 100 36 L 25 36 C 14 36 7 28 7 23 L 7 7"
          style={{
            width: "100%",
            height: "100%",
            fill: "none",
            stroke: "rgb(107, 107, 107,0.4)",
            strokeWidth: "5",
            strokeLinecap: "round",
            overflow: "hidden",
          }}
        />
        <circle
          r={4}
          style={{
            fill: "none",
            stroke: "#3e80fb",
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
    );
  };

  const LineF = (props) => {
    return (
      <svg
        width={`${props.width}px`}
        height={`${props.height}px`}
        verssion="1.1"
      >
        <path
          className="path"
          d="M 220 7 L 14 7"
          style={{
            width: "100%",
            height: "100%",
            fill: "none",
            stroke: "rgb(107, 107, 107,0.4)",
            strokeWidth: "5",
            strokeLinecap: "round",
            overflow: "hidden",
          }}
        />
        <circle
          r={4}
          style={{
            fill: "none",
            stroke: "#3e80fb",
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
    );
  };

  const ImgSolar = (props) => {
    return (
      <img
        src="/dat_picture/solar-panel.png"
        style={{ width: `${props.width}px`, height: `${props.height}px` }}
        alt=""
      />
    );
  };

  const ImgGrid = (props) => {
    return (
      <img
        src="/dat_picture/grid.png"
        style={{ width: `${props.width}px`, height: `${props.height}px` }}
        alt=""
      />
    );
  };

  const ImgLoad = (props) => {
    return (
      <img
        src="/dat_picture/load.png"
        style={{ width: `${props.width}px`, height: `${props.height}px` }}
        alt=""
      />
    );
  };

  const ImgBat = (props) => {
    return (
      <img
        src="/dat_picture/battery.png"
        style={{ width: `${props.width}px`, height: `${props.height}px` }}
        alt=""
      />
    );
  };

  return (
    <>
      <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop_P1">
          <LineA width="120" height="160" />
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop_P2">
          <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop_P2_Solar">
            <ImgSolar width="70" height="70" />
          </div>
          <LineB width="70" height="40" />
          <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop_P2_Load">
            <ImgLoad width="70" height="70" />
          </div>
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop_P3">
          <LineC width="120" height="160" />
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_Pin">
          <ImgBat width="70" height="70" />
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_G">
          <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_G_T">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_G_P1">
              <LineD width="120" height="45" />
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_G_P2">
              <LineE width="110" height="45" />
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineBottom_G_B">
            <LineF width="230" height="25" />
          </div>
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_Grid">
          <ImgGrid width="70" height="70" />
        </div>
      </div>
    </>
  );
};

const Production = (props) => {
  const dataLang = useIntl();

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Production">
      <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart">
          <div
            className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart_Data"
            style={{ fontSize: "28px" }}
          >
            <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart_Data_value">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart_Data_value_num">
                {Number(
                  parseFloat(
                    ((props.cal?.pro_1 || 0) / projectData.value.capacity) * 100
                  ).toFixed(2)
                ).toLocaleString("en-US")}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart_Data_value_unit">
                %
              </div>
            </div>
          </div>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Detail">
          <div style={{ marginBottom: "8px", color: "grey" }}>
            {dataLang.formatMessage({ id: "production" })}
          </div>
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {Number(props.cal?.pro_1 || 0).toLocaleString("en-US")}
            </span>
            &nbsp;
            <span style={{ fontSize: "12px", color: "grey" }}>kW</span>
          </div>
          <div
            style={{
              borderBottom: "solid 1px rgb(199, 199, 199)",
              width: "50%",
              marginBottom: "8px",
            }}
          />
          <div style={{ marginBottom: "8px", color: "grey" }}>
            {dataLang.formatMessage({ id: "capacity" })}
          </div>
          <div>
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {Number(projectData.value.capacity).toLocaleString("en-US")}
            </span>
            &nbsp;
            <span style={{ fontSize: "12px", color: "grey" }}>kWp</span>
          </div>
        </div>
      </div>

      <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total">
        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgba(68, 186, 255, 0.2)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Tit">
            {dataLang.formatMessage({ id: "dailyOutput" })}
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Data">
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {Number(props.cal?.pro_2 || 0).toLocaleString("en-US")}
            </span>
            &nbsp;
            <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
          </div>
        </div>

        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgb(255, 68, 68,0.2)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Tit">
            {dataLang.formatMessage({ id: "monthOutput" })}
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Data">
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {Number(props.cal?.pro_month || 0).toLocaleString("en-US")}
            </span>
            &nbsp;
            <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
          </div>
        </div>

        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgba(87, 250, 46, 0.2)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Tit">
            {dataLang.formatMessage({ id: "yearOutput" })}
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Data">
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {Number(props.cal?.pro_year || 0).toLocaleString("en-US")}
            </span>
            &nbsp;
            <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
          </div>
        </div>

        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgba(255, 248, 51, 0.2)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Tit">
            {dataLang.formatMessage({ id: "totalOutput" })}
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Data">
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {Number(props.cal?.pro_3 || 0).toLocaleString("en-US")}
            </span>
            &nbsp;
            <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
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
          <img src="/dat_picture/load.png" alt="" />
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Data_Data">
          <span>{dataLang.formatMessage({ id: "consumption" })}</span>
          &nbsp;
          <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
            {Number(props.cal?.con_1 || 0).toLocaleString("en-US")}
          </span>
          &nbsp;
          <span style={{ fontSize: "12px", color: "grey" }}>kW</span>
        </div>
      </div>

      <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left">
          <div
            className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item"
            style={{ backgroundColor: "rgb(245, 251, 255)" }}
          >
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Tit">
              {dataLang.formatMessage({ id: "dailyConsumption" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {Number(props.cal?.con_2 || 0).toLocaleString("en-US")}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>

          <div
            className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item"
            style={{ backgroundColor: "rgb(246, 245, 255)" }}
          >
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Tit">
              {dataLang.formatMessage({ id: "yearlyConsumption" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>{Number(props.cal?.con_year || 0).toLocaleString('en-US')}</span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right">
          <div
            className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item"
            style={{ backgroundColor: "rgb(255, 248, 247)" }}
          >
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Tit">
              {dataLang.formatMessage({ id: "monthlyConsumption" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>{Number(props.cal?.con_month || 0).toLocaleString('en-US')}</span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>

          <div
            className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item"
            style={{ backgroundColor: "rgb(245, 250, 246)" }}
          >
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Tit">
              {dataLang.formatMessage({ id: "totalConsumption" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                0
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
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
          <img src="/dat_picture/grid.png" alt="" />
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Data_Data">
          <span>{dataLang.formatMessage({ id: "grid" })}</span>
          &nbsp;
          <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
            {Number(props.cal?.grid_1 || 0).toLocaleString("en-US")}
          </span>
          &nbsp;
          <span style={{ fontSize: "12px", color: "grey" }}>W</span>
        </div>
      </div>

      <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row">
        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left"
          style={{ backgroundColor: "rgb(245, 251, 255)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Tit">
            {dataLang.formatMessage({ id: "gridfeed" })}
          </div>
          {isMobile.value ? (
            <div style={{ borderBottom: "solid 1px rgb(231, 231, 231)" }} />
          ) : (
            <div style={{ borderLeft: "solid 1px rgb(231, 231, 231)" }} />
          )}

          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              {dataLang.formatMessage({ id: "today" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {Number(props.cal?.grid_in_1 || 0).toLocaleString("en-US")}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              {dataLang.formatMessage({ id: "month" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>{Number(props.cal?.grid_in_month || 0).toLocaleString('en-US')}</span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              {dataLang.formatMessage({ id: "year" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>{Number(props.cal?.grid_in_year || 0).toLocaleString('en-US')}</span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              {dataLang.formatMessage({ id: "total" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {Number(props.cal?.grid_in_2 || 0).toLocaleString("en-US")}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>
        </div>

        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left"
          style={{ backgroundColor: "rgb(245, 251, 255)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Tit">
            {dataLang.formatMessage({ id: "purchaseE" })}
          </div>
          {isMobile.value ? (
            <div style={{ borderBottom: "solid 1px rgb(231, 231, 231)" }} />
          ) : (
            <div style={{ borderLeft: "solid 1px rgb(231, 231, 231)" }} />
          )}

          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              {dataLang.formatMessage({ id: "today" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {Number(props.cal?.grid_out_1 || 0).toLocaleString("en-US")}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              {dataLang.formatMessage({ id: "month" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>{Number(props.cal?.grid_out_month || 0).toLocaleString('en-US')}</span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              {dataLang.formatMessage({ id: "year" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>{Number(props.cal?.grid_out_year || 0).toLocaleString('en-US')}</span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              {dataLang.formatMessage({ id: "total" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {Number(props.cal?.grid_out_2 || 0).toLocaleString("en-US")}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Battery = (props) => {
  const dataLang = useIntl();

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Battery">
      <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Data">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Data_Img">
          <img src="/dat_picture/battery.png" alt="" />
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
            <span>{dataLang.formatMessage({ id: "charge" })}</span>
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {Number(props.cal?.bat_2 || 0).toLocaleString("en-US")}
            </span>
            <span style={{ fontSize: "12px", color: "grey" }}>%</span>
          </div>
          <LiaLongArrowAltLeftSolid size={30} />
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Data_Data">
          <span>{dataLang.formatMessage({ id: "batteryData" })}</span>
          &nbsp;
          <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
            {Number(props.cal?.bat_1 || 0).toLocaleString("en-US")}
          </span>
          &nbsp;
          <span style={{ fontSize: "12px", color: "grey" }}>W</span>
        </div>
      </div>

      <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row">
        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left"
          style={{ backgroundColor: "rgb(245, 251, 255)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Tit">
            {dataLang.formatMessage({ id: "charge" })}
          </div>
          {isMobile.value ? (
            <div style={{ borderBottom: "solid 1px rgb(231, 231, 231)" }} />
          ) : (
            <div style={{ borderLeft: "solid 1px rgb(231, 231, 231)" }} />
          )}

          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              {dataLang.formatMessage({ id: "today" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {Number(props.cal?.bat_in_1 || 0).toLocaleString("en-US")}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">{dataLang.formatMessage({ id: 'month' })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>{Number(props.cal?.bat_in_month || 0).toLocaleString('en-US')}</span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              {dataLang.formatMessage({ id: "year" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>{Number(props.cal?.bat_in_year || 0).toLocaleString('en-US')}</span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              {dataLang.formatMessage({ id: "total" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>{Number(props.cal?.bat_in_total || 0).toLocaleString('en-US')}</span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>
        </div>

        <div
          className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left"
          style={{ backgroundColor: "rgb(245, 251, 255)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Tit">
            {dataLang.formatMessage({ id: "discharge" })}
          </div>
          {isMobile.value ? (
            <div style={{ borderBottom: "solid 1px rgb(231, 231, 231)" }} />
          ) : (
            <div style={{ borderLeft: "solid 1px rgb(231, 231, 231)" }} />
          )}

          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              {dataLang.formatMessage({ id: "today" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {Number(props.cal?.bat_out_1 || 0).toLocaleString("en-US")}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              {dataLang.formatMessage({ id: "month" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>{Number(props.cal?.bat_out_month || 0).toLocaleString('en-US')}</span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              {dataLang.formatMessage({ id: "year" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>{Number(props.cal?.bat_out_year || 0).toLocaleString('en-US')}</span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              {dataLang.formatMessage({ id: "total" })}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>{Number(props.cal?.bat_out_total || 0).toLocaleString('en-US')}</span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>kWh</span>
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

  return (
    <div className="DAT_ProjectData_Dashboard_History_Day">
      <div className="DAT_ProjectData_Dashboard_History_Year_Tit">
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Unit">
          kW
        </div>
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Label">
          {/* {props.v}: {cal.value.pro_1} kW */}
          {dataLang.formatMessage({ id: "production" })}: {cal.value.pro_1} kW
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_History_Year_Chart">
        <ResponsiveContainer
          style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
        >
          <AreaChart width={100} height={300} data={props.data}>
            <defs>
              <linearGradient id="colorday" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, Math.max(...props.data.map((item) => item[props.v]))]}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={props.v}
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorday)"
            />
          </AreaChart>
        </ResponsiveContainer>
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
        fill={"rgb(4,143,255)"}
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
        <ResponsiveContainer
          style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
        >
          <BarChart width={150} height={200} data={props.data}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, Math.max(...props.data.map((item) => item[props.v]))]}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip />
            <Legend />
            <Bar
              shape={<TriangleBar />}
              dataKey={props.v}
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
        fill={"rgb(4,143,255)"}
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
        <ResponsiveContainer
          style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
        >
          <BarChart width={150} height={200} data={props.data}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, Math.max(...props.data.map((item) => item[props.v]))]}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip />
            <Legend />
            <Bar
              shape={<TriangleBar />}
              dataKey={props.v}
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
        fill={"rgb(4,143,255)"}
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
          {dataLang.formatMessage({ id: "totalOutput" })}: {cal.value.pro_total}{" "}
          kWh
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_History_Year_Chart">
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
                Math.max(
                  ...props.data.map(
                    (item) =>
                      item[dataLang.formatMessage({ id: "totalOutput" })]
                  )
                ),
              ]}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip />
            <Legend />
            <Bar
              shape={<TriangleBar />}
              dataKey={dataLang.formatMessage({ id: "totalOutput" })}
              fill="#6495ed"
              barSize={15}
              legendType="circle"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
