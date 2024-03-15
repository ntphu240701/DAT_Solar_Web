import React, { useEffect, useState } from "react";
import "./Project.scss";

import DataTable from "react-data-table-component";
import { isMobile } from "../Navigation/Navigation";
import ProjectData from "./ProjectData";
import EditProject from "./EditProject";
import AddProject from "./AddProject";
import Popup from "./Popup";
// import { lowerCase } from "lodash";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { useSelector } from "react-redux";
import { signal } from "@preact/signals-react";
import { ruleInfor, Token, partnerInfor, userInfor } from "../../App";
import { useIntl } from "react-intl";

import { FaCheckCircle, FaRegFileAlt } from "react-icons/fa";
import { MdOutlineError, MdEdit, MdDelete, MdAddchart } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { GoPencil, GoProject } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowForward, IoMdMore } from "react-icons/io";
import { IoAddOutline, IoTrashOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const tab = signal("total");
const tabLable = signal("");
const tabMobile = signal(false);
const online = signal([]);
const offline = signal([]);
const warn = signal([]);
const demo = signal([]);
export const plantState = signal("default");
export const plantEdit = signal(false);
export const projectData = signal({});
export const popupState = signal(false);
export const deviceData = signal([]);
export const inverterData = signal([]);

export const dataproject = signal([]);
const logger = signal([]);

export const Empty = (props) => {
  const dataLang = useIntl();
  return (
    <div
      className="DAT_TableEmpty"
      style={{
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : "white",
        height: props.height ? props.height : "calc(100vh - 180px)",
        width: props.width ? props.width : "100%",
      }}
    >
      <div className="DAT_TableEmpty_Group">
        <div className="DAT_TableEmpty_Group_Icon">
          <FaRegFileAlt size={50} color="gray" />
        </div>
        <div className="DAT_TableEmpty_Group_Text">
          {dataLang.formatMessage({ id: "empty" })}
        </div>
      </div>
    </div>
  );
};

export const devicePlant = signal([
  {
    plantId: 41,
    // SN: "11111111",
    loggerSN: "T0623A000162",
    inverterSN: "I0000145",
  },
  {
    plantId: 15,
    // SN: "22222222",
    loggerSN: "T0623A000166",
    inverterSN: "I0000012",
  },
  {
    plantId: 22,
    // SN: "33333333",
    loggerSN: "T0623A000177",
    inverterSN: "I0000001",
  },
  // {
  //   plantId: 3,
  //   // SN: "33333333",
  //   loggerSN: "T0623A000188",
  //   inverterSN: "I0000333",
  // },
]);

export const Logger = signal([]);
export const InverterbyLogger = signal([]);
export const Inverter = signal([
  // {
  //   id: 1,
  //   SN: "I0000145",
  //   name: "Inverter 01",
  //   plant: "Năng lượng DAT 01",
  //   status: true,
  //   production: "16",
  //   dailyproduction: "123.4",
  //   updated: "12/30/2023 12:07:12",
  // },
  // {
  //   id: 2,
  //   SN: "I0000012",
  //   name: "Inverter 02",
  //   plant: "Năng lượng DAT 01",
  //   status: true,
  //   production: "18",
  //   dailyproduction: "238.4",
  //   updated: "12/30/2023 12:07:12",
  // },
  // {
  //   id: 3,
  //   SN: "I0000001",
  //   name: "Inverter 03",
  //   plant: "Năng lượng DAT 01",
  //   status: true,
  //   production: "562",
  //   dailyproduction: "897.4",
  //   updated: "12/30/2023 12:07:12",
  // },
]);

export default function Project(props) {
  const dataLang = useIntl();
  const user = useSelector((state) => state.admin.usr);
  const [datafilter, setDatafilter] = useState([]);
  const [type, setType] = useState("name");
  const [filter, setFilter] = useState(false);
  const [invt, setInvt] = useState(0)
  const [power, setPower] = useState([])
  const [dailyProduction, setDailyProduction] = useState([])
  const navigate = useNavigate();

  const listTab = [
    { id: "total", name: dataLang.formatMessage({ id: "total" }) },
    { id: "online", name: dataLang.formatMessage({ id: "online" }) },
    { id: "offline", name: dataLang.formatMessage({ id: "offline" }) },
    { id: "warn", name: dataLang.formatMessage({ id: "warn" }) },
    // { id: "demo", name: dataLang.formatMessage({ id: 'demo' }) },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: dataLang.formatMessage({ id: "row" }),
    rangeSeparatorText: dataLang.formatMessage({ id: "to" }),
    selectAllRowsItem: true,
    selectAllRowsItemText: dataLang.formatMessage({ id: "showAll" }),
  };

  const columnproject = [
    {
      name: dataLang.formatMessage({ id: "name" }),
      selector: (row) => (
        <div
          className="DAT_Table"
          id={row.plantid}
          onClick={(e) => handlePlant(e)}
        >
          <img
            src={row.img ? row.img : "/dat_picture/solar_panel.png"}
            alt=""
          />

          <div className="DAT_Table_Infor" style={{ cursor: "pointer" }}>
            <div className="DAT_Table_Infor_Name">{row.plantname}</div>
            <div className="DAT_Table_Infor_Addr">{row.addr}</div>
          </div>
        </div>
      ),
      sortable: true,
      minWidth: "350px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: "connect" }),
      selector: (row) => (
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/Device")}>
          {row.state === 1 ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </div>
      ),
      width: "100px",
    },
    {
      name: dataLang.formatMessage({ id: "warn" }),
      selector: (row) => (
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/Warn")}>
          {row.warn === 1 ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </div>
      ),
      width: "100px",
    },
    {
      name: dataLang.formatMessage({ id: "inCapacity" }),
      selector: (row) => row.capacity + " kWp",
      sortable: true,
      width: "180px",
    },
    {
      name: dataLang.formatMessage({ id: 'daily' }),
      selector: (row) => parseFloat(dailyProduction[row.plantid]).toFixed(2) === "NaN" ? 0 + " kWh" : Number(parseFloat(dailyProduction[row.plantid]).toFixed(2)).toLocaleString("en-US") + " kWh",
      sortable: true,
      width: "180px",
    },
    {
      name: dataLang.formatMessage({ id: 'power' }),
      selector: (row) => parseFloat(power[row.plantid]).toFixed(2) === "NaN" ? 0 + " %" : Number(parseFloat(((power[row.plantid] / 1000) / row.capacity) * 100).toFixed(2)).toLocaleString("en-US") + " %",
      sortable: true,
      width: "180px",
    },
    // {
    //   name: "Tag",
    //   selector: (row) => (
    //     <div className="DAT_TableEdit">
    //       <MdEditDocument color="gray" size={20} />
    //     </div>
    //   ),
    //   width: "100px",
    // },
    {
      name: dataLang.formatMessage({ id: "lastupdate" }),
      selector: (row) => row.lastupdate,
      sortable: true,
      width: "180px",
    },
    {
      name: dataLang.formatMessage({ id: "createdate" }),
      selector: (row) => row.createdate,
      sortable: true,
      width: "180px",
    },
    {
      name: dataLang.formatMessage({ id: "edit" }),
      selector: (row) => (
        <>
          {ruleInfor.value.setting.project.modify == true ||
            ruleInfor.value.setting.project.remove == true ? (
            <div className="DAT_TableEdit">
              <span
                id={row.plantid + "_MORE"}
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
            id={row.plantid + "_Modify"}
            style={{ display: "none", marginTop: "3px", marginRight: "3px" }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            {ruleInfor.value.setting.project.modify === true ? (
              <div
                className="DAT_ModifyBox_Fix"
                id={row.plantid}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                onClick={(e) => handleEdit(e)}
              >
                <FiEdit size={14} />
                &nbsp;
                {dataLang.formatMessage({ id: "edits" })}
              </div>
            ) : (
              <div></div>
            )}
            {ruleInfor.value.setting.project.remove === true ? (
              <div
                className="DAT_ModifyBox_Remove"
                id={row.plantid}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                onClick={(e) => handleDelete(e)}
              >
                <IoTrashOutline size={16} />
                &nbsp;
                {dataLang.formatMessage({ id: "delete" })}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </>
      ),
      width: "110px",
    },
  ];

  const handlePlant = (e) => {
    plantState.value = "info";
    const newPlant = dataproject.value.find(
      (item) => item.plantid == e.currentTarget.id
    );
    projectData.value = newPlant;

    // const newDevicePlant = devicePlant.value.filter(
    //   (item) => item.plantId == e.currentTarget.id
    // );
    // deviceData.value = newDevicePlant;
  };

  const handleEdit = (e) => {
    plantState.value = "edit";
    const newPlant = dataproject.value.find(
      (item) => item.plantid == e.currentTarget.id
    );
    projectData.value = newPlant;
  };

  const handleDelete = (e) => {
    popupState.value = true;
    const newPlant = dataproject.value.find(
      (item) => item.plantid == e.currentTarget.id
    );
    projectData.value = newPlant;
  };

  const handleModify = (e, type) => {
    const id = e.currentTarget.id;
    var arr = id.split("_");
    const mod = document.getElementById(arr[0] + "_Modify");
    mod.style.display = type;
  };

  const handleTabMobile = (e) => {
    const id = e.currentTarget.id;
    tab.value = id;
    const newLabel = listTab.find((item) => item.id == id);
    tabLable.value = newLabel.name;
  };

  const pickTypeFilter = (e) => {
    setType(e.target.value);
    let search = document.getElementById("search");
    search.placeholder =
      dataLang.formatMessage({ id: "enter" }) +
      dataLang.formatMessage({ id: e.target.value });
  };

  const handleSearch = (e) => {
    if (e.target.value == "") {
      setDatafilter(dataproject.value);
    } else {
      const t = e.target.value;
      // console.log(t);
      // console.log(type);
      const db = dataproject.value.filter((row) =>
      // item.name.includes(t)
      {
        switch (type) {
          // case "name":
          //   return row.plantname.includes(t) || row.plantname.toLowerCase().includes(t);
          // return (console.log(row.plantname.includes(t) || row.plantname.toLowerCase().includes(t)));
          case "inCapacity":
            return String(row.capacity) == t;
          case "production":
            return String(row.production) == t;
          case "power":
            return String(row.power) == t;
          // case "lastupdate":
          //   return String(row.lastupdate) == t;
          // case "createdate":
          //   return String(row.createdate) == t;
          default:
            return row.plantname.includes(t) || row.plantname.toLowerCase().includes(t);
          // return row.name.toLowerCase().includes(t);
        }
      }
      );
      console.log(db);
      setDatafilter(db);
    }
  };

  const invtCloud = async (data, token) => {
    var reqData = {
      "data": data,
      "token": token
    };

    try {
      const response = await axios({
        url: host.CLOUD,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: Object.keys(reqData).map(function (key) { return encodeURIComponent(key) + '=' + encodeURIComponent(reqData[key]) }).join('&'),
      });

      return response.data
    } catch (e) {
      return ({ ret: 1, msg: "cloud err" })
    }
  }

  useEffect(() => {
    online.value = dataproject.value.filter((item) => item.state == 1);
    offline.value = dataproject.value.filter((item) => item.state == 0);
    warn.value = dataproject.value.filter((item) => item.warn == 0);
    tabLable.value = listTab[0].name;
    setDatafilter(dataproject.value);
  }, [dataproject.value]);

  useEffect(() => {
    const getPlant = async () => {
      let d = await callApi("post", host.DATA + "/getPlant", {
        usr: user,
        partnerid: userInfor.value.partnerid,
        type: userInfor.value.type,
      });
      if (d.status === true) {
        // console.log(d.data)
        dataproject.value = d.data;
      }
    };
    getPlant();

    const getLogger = async () => {
      let d = await callApi('post', host.DATA + '/getallLogger', {
        usr: user,
        partnerid: partnerInfor.value.partnerid,
        type: userInfor.value.type,
      })
      if (d.status) {
        logger.value = d.data
        d.data.map(async (item) => {
          const res = await invtCloud('{"deviceCode":"' + item.psn + '"}', Token.value.token);
          // console.log(res)
          if (res.ret === 0) {
            //console.log(res.data)
            setInvt(pre => ({ ...pre, [item.psn]: res.data }))
          } else {
            setInvt(pre => ({ ...pre, [item.psn]: {} }))
          }
        })
      }
    }
    getLogger();


    return () => {
      plantState.value = "default";
    };
  }, []);

  // useEffect(() => {
  //   if (ruleInfor.value) {
  //     console.log(ruleInfor.value);
  //   }
  // }, [ruleInfor.value]);

  useEffect(() => {

    var cal = {}
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
      pro_3: []
    }
    let daily_ = {}
    let power_ = {}
    logger.value.map((item, i) => {
      // console.log(item)
      Object.entries(item.pdata).map(([key, value]) => {
        switch (value.type) {
          case "sum":
            let inum = [];
            let cal_ = JSON.parse(value.cal);

            Object.entries(value.register).map(([key, value]) => {
              let n = JSON.parse(value)
              inum[key] = parseFloat(invt[item.psn]?.[n[0]] || 0) * parseFloat(cal_[0]) * parseFloat(invt[item.psn]?.[n[1]] || 0) * parseFloat(cal_[1]);
            });

            num_[key][i] = inum.reduce((accumulator, currentValue) => {
              return Number(accumulator) + Number(currentValue)
            }, 0)
            if (key == "pro_1") {
              if (invt[item.psn]?.enabled == '1') {
                power_[item.pplantid] = inum.reduce((accumulator, currentValue) => {
                  return Number(accumulator) + Number(currentValue)
                }, 0)
              } else {
                power_[item.pplantid] = 0
              }
            }

            if (i == logger.value.length - 1) {
              // if (invt[item.psn]?.enabled == 1) {
              cal[key] = parseFloat(num_[key].reduce((accumulator, currentValue) => {
                return Number(accumulator) + Number(currentValue)
              }, 0) / 1000).toFixed(2);
              // } else {
              // cal[key] = 0
              // }
            }
            break;
          case "word":
            //console.log(key, value)
            let d = JSON.parse(value.register);
            let e = [invt[item.psn]?.[d[0]] || 0, invt[item.psn]?.[d[1]] || 0];

            const convertToDoublewordAndFloat = (word, type) => {
              var doubleword = ((word[1]) << 16) | (word[0]);
              var buffer = new ArrayBuffer(4);
              var intView = new Int32Array(buffer);
              var floatView = new Float32Array(buffer);
              intView[0] = doubleword;
              var float_value = floatView[0];

              return type === "int" ? parseFloat(doubleword).toFixed(2) : parseFloat(float_value).toFixed(2) || 0;
            }

            num_[key][i] = convertToDoublewordAndFloat(e, "int");

            if (i == logger.value.length - 1) {
              //console.log(num_)
              cal[key] = parseFloat(num_[key].reduce((accumulator, currentValue) => {
                return Number(accumulator) + Number(currentValue)
              }, 0) * parseFloat(value.cal)).toFixed(2);
            }
            break;
          default:
            num_[key][i] = parseFloat(invt[item.psn]?.[value.register] || 0) * parseFloat(value.cal);
            if (key == "pro_2") {
              daily_[item.pplantid] = parseFloat(invt[item.psn]?.[value.register]) * parseFloat(value.cal)
            }
            if (i == logger.value.length - 1) {

              cal[key] = parseFloat(num_[key].reduce((accumulator, currentValue) => {
                return accumulator + currentValue
              })).toFixed(2)
            }
            break;
        }
      })
    })
    // console.log(power_)
    setDailyProduction(daily_)
    setPower(power_)
    // // plant.value.map((item, i) => {
    // //   item.sun = sun_[i]?.value
    // // })
    // // console.log(sun_)
    // getPrice(plant.value, logger.value)
    // setProduction(cal?.pro_1 || 0)
    // setDailyProduction(cal?.pro_2 || 0)
    // setTotalProduction(cal?.pro_3 || 0)

    // coalsave.value = {
    //   ...coalsave.value,
    //   value: cal.pro_3
    // }

  }, [invt, user]);

  return (
    <>
      <div className="DAT_ProjectHeader">
        <div className="DAT_ProjectHeader_Title">
          <GoProject color="gray" size={25} />{" "}
          <span>{dataLang.formatMessage({ id: "project" })}</span>
        </div>

        {isMobile.value ? (
          <>
            <div className="DAT_Modify">
              <div
                className="DAT_Modify_Item"
                onClick={() => setFilter(!filter)}
              >
                <CiSearch color="white" size={20} />
              </div>
              {ruleInfor.value.setting.project.modify === true ? (
                <div
                  className="DAT_Modify_Add"
                  onClick={() => (plantState.value = "add")}
                >
                  <IoAddOutline color="white" size={20} />
                </div>
              ) : (
                <div></div>
              )}
            </div>

            {filter ? (
              <div className="DAT_Modify_Filter">
                <select onChange={(e) => pickTypeFilter(e)}>
                  <option value={"name"}>
                    {dataLang.formatMessage({ id: "name" })}
                  </option>
                  <option value={"connect"}>
                    {dataLang.formatMessage({ id: "connect" })}
                  </option>
                  <option value={"status"}>
                    {dataLang.formatMessage({ id: "status" })}
                  </option>
                  <option value={"capacity"}>
                    {dataLang.formatMessage({ id: "capacity" })}
                  </option>
                  <option value={"production"}>
                    {dataLang.formatMessage({ id: "production" })}
                  </option>
                  <option value={"power"}>
                    {dataLang.formatMessage({ id: "power" })}
                  </option>
                  <option value={"lastupdate"}>
                    {dataLang.formatMessage({ id: "lastupdate" })}
                  </option>
                  <option value={"createdate"}>
                    {dataLang.formatMessage({ id: "createdate" })}
                  </option>
                </select>
                <input
                  type="text"
                  placeholder={
                    dataLang.formatMessage({ id: "enter" }) +
                    dataLang.formatMessage({ id: "project" })
                  }
                  onChange={(e) => handleSearch(e)}
                />
                <div
                  className="DAT_Modify_Filter_Close"
                  onClick={() => setFilter(!filter)}
                >
                  <RxCross2 size={20} color="white" />
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <div className="DAT_ProjectHeader_Filter">
              <select onChange={(e) => pickTypeFilter(e)}>
                <option value={"name"}>
                  {dataLang.formatMessage({ id: "name" })}
                </option>
                {/* <option value={"connect"}>
                  {dataLang.formatMessage({ id: "connect" })}
                </option>
                <option value={"status"}>
                  {dataLang.formatMessage({ id: "status" })}
                </option> */}
                <option value={"inCapacity"}>
                  {dataLang.formatMessage({ id: "inCapacity" })}
                </option>
                <option value={"production"}>
                  {dataLang.formatMessage({ id: "daily" })}
                </option>
                <option value={"power"}>
                  {dataLang.formatMessage({ id: "power" })}
                </option>
                {/* <option value={"lastupdate"}>
                  {dataLang.formatMessage({ id: "lastupdate" })}
                </option>
                <option value={"createdate"}>
                  {dataLang.formatMessage({ id: "createdate" })}
                </option> */}
              </select>
              <input
                id="search"
                type="text"
                placeholder={
                  dataLang.formatMessage({ id: "enter" }) +
                  dataLang.formatMessage({ id: "project" })
                }
                onChange={(e) => handleSearch(e)}
              />
              <CiSearch color="gray" size={20} />
            </div>
            {ruleInfor.value.setting.project.add === true ? (
              <button
                className="DAT_ProjectHeader_New"
                onClick={() => (plantState.value = "add")}
              >
                <span value={"createdate"}>
                  <MdAddchart color="white" size={20} />
                  &nbsp;
                  {dataLang.formatMessage({ id: "createNew" })}
                </span>
              </button>
            ) : (
              <div></div>
            )}
          </>
        )}
      </div>

      {isMobile.value ? (
        <div className="DAT_ProjectMobile">
          <div className="DAT_Toollist_Tab_Mobile">
            <button
              className="DAT_Toollist_Tab_Mobile_content"
              onClick={() => (tabMobile.value = !tabMobile.value)}
            >
              <span>{tabLable.value}</span>
              {tabMobile.value ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </button>
            {tabMobile.value ? (
              <div
                className="DAT_Toollist_Tab_Mobile_list"
                onMouseLeave={() => (tabMobile.value = false)}
              >
                {listTab.map((item, i) => {
                  return (
                    <div
                      className="DAT_Toollist_Tab_Mobile_list_item"
                      key={"tabmobile_" + i}
                      id={item.id}
                      onClick={(e) => handleTabMobile(e)}
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
              case "total":
                return (
                  <>
                    {dataproject.value?.map((item, i) => {
                      return (
                        <div key={i} className="DAT_ProjectMobile_Content">
                          <div className="DAT_ProjectMobile_Content_Top">
                            <div className="DAT_ProjectMobile_Content_Top_Avatar">
                              <img
                                src={
                                  item.img
                                    ? item.img
                                    : "/dat_picture/solar_panel.png"
                                }
                                alt=""
                              />
                            </div>

                            <div className="DAT_ProjectMobile_Content_Top_Info">
                              <div className="DAT_ProjectMobile_Content_Top_Info_Name">
                                <div
                                  className="DAT_ProjectMobile_Content_Top_Info_Name_Left"
                                  id={item.plantid}
                                  onClick={(e) => handlePlant(e)}
                                >
                                  {item.plantname}
                                </div>

                                <div className="DAT_ProjectMobile_Content_Top_Info_Name_Right">
                                  {ruleInfor.value.setting.project.modify ===
                                    true ? (
                                    <div
                                      className="DAT_ProjectMobile_Content_Top_Info_Name_Right_Item"
                                      id={item.plantid}
                                      onClick={(e) => handleEdit(e)}
                                    >
                                      <MdEdit size={20} color="#216990" />
                                    </div>
                                  ) : (
                                    <div></div>
                                  )}
                                  {ruleInfor.value.setting.project.modify ===
                                    true ? (
                                    <div
                                      className="DAT_ProjectMobile_Content_Top_Info_Name_Right_Item"
                                      id={item.plantid}
                                      onClick={(e) => handleDelete(e)}
                                    >
                                      <MdDelete size={20} color="red" />
                                    </div>
                                  ) : (
                                    <div></div>
                                  )}
                                </div>
                              </div>

                              <div className="DAT_ProjectMobile_Content_Top_Info_State">
                                <div className="DAT_ProjectMobile_Content_Top_Info_State_Item">
                                  {item.state ? (
                                    <>
                                      <FaCheckCircle size={20} color="green" />
                                      <span>
                                        {dataLang.formatMessage({
                                          id: "online",
                                        })}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <MdOutlineError size={22} color="red" />
                                      <span>
                                        {dataLang.formatMessage({
                                          id: "offline",
                                        })}
                                      </span>
                                    </>
                                  )}
                                </div>
                                <div className="DAT_ProjectMobile_Content_Top_Info_State_Item">
                                  {item.warn ? (
                                    <>
                                      <FaCheckCircle size={20} color="green" />
                                      <span>
                                        {dataLang.formatMessage({
                                          id: "noAlert",
                                        })}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <MdOutlineError size={22} color="red" />
                                      <span>
                                        {dataLang.formatMessage({
                                          id: "alert",
                                        })}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>

                              <div className="DAT_ProjectMobile_Content_Top_Info_Data">
                                <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item">
                                  <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item_Name">
                                    {dataLang.formatMessage({ id: "power" })}
                                  </div>
                                  <div>
                                    {item.power}
                                    <span>%</span>
                                  </div>
                                </div>

                                <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item">
                                  <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item_Name">
                                    {dataLang.formatMessage({ id: "capacity" })}
                                  </div>
                                  <div>
                                    {item.capacity}
                                    <span>kWp</span>
                                  </div>
                                </div>

                                <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item">
                                  <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item_Name">
                                    {dataLang.formatMessage({
                                      id: "production",
                                    })}
                                  </div>
                                  <div>
                                    {item.production}
                                    <span>kWh</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="DAT_ProjectMobile_Content_Bottom">
                            <span>{dataLang.formatMessage({ id: 'lastupdate' })}</span> &nbsp; <span>{item.lastupdate}</span>
                          </div>
                        </div>)
                    })}
                  </>
                );
              case "online":
                return (
                  <>
                    {online.value?.map((item, i) => {
                      return (
                        <div key={i} className="DAT_ProjectMobile_Content">
                          <div
                            className="DAT_ProjectMobile_Content_Top"
                            id={item.plantid}
                            onClick={(e) => handlePlant(e)}
                          >
                            <div className="DAT_ProjectMobile_Content_Top_Avatar">
                              <img
                                src={
                                  item.img
                                    ? item.img
                                    : "/dat_picture/solar_panel.png"
                                }
                                alt=""
                              />
                            </div>

                            <div className="DAT_ProjectMobile_Content_Top_Info">
                              <div className="DAT_ProjectMobile_Content_Top_Info">
                                <div className="DAT_ProjectMobile_Content_Top_Info_Name">
                                  {item.plantname}
                                </div>
                                <div className="DAT_ProjectMobile_Content_Top_Info_State">
                                  <div>
                                    {" "}
                                    {item.state ? (
                                      <>
                                        <FaCheckCircle
                                          size={20}
                                          color="green"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "online",
                                          })}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <MdOutlineError
                                          size={22}
                                          color="red"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "offline",
                                          })}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                  <div>
                                    {" "}
                                    {item.warn ? (
                                      <>
                                        <FaCheckCircle
                                          size={20}
                                          color="green"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "noAlert",
                                          })}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <MdOutlineError
                                          size={22}
                                          color="red"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "alert",
                                          })}
                                        </span>
                                      </>
                                    )}{" "}
                                  </div>
                                </div>
                                <div className="DAT_ProjectMobile_Content_Top_Info_Data">
                                  <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item">
                                    {" "}
                                    <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item_Name">
                                      {dataLang.formatMessage({ id: "power" })}
                                    </div>{" "}
                                    <div>
                                      {item.power}
                                      <span>%</span>
                                    </div>{" "}
                                  </div>
                                  <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item">
                                    {" "}
                                    <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item_Name">
                                      {dataLang.formatMessage({
                                        id: "capacity",
                                      })}
                                    </div>{" "}
                                    <div>
                                      {item.capacity}
                                      <span>kWp</span>
                                    </div>{" "}
                                  </div>
                                  <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item">
                                    {" "}
                                    <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item_Name">
                                      {dataLang.formatMessage({
                                        id: "production",
                                      })}
                                    </div>{" "}
                                    <div>
                                      {item.production}
                                      <span>kWh</span>
                                    </div>{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="DAT_ProjectMobile_Content_Bottom">
                            <span>
                              {dataLang.formatMessage({ id: "lastupdate" })}
                            </span>
                            &nbsp; <span>{item.lastupdate}</span>
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              case "offline":
                return (
                  <>
                    {offline.value?.map((item, i) => {
                      return (
                        <div key={i} className="DAT_ProjectMobile_Content">
                          <div
                            className="DAT_ProjectMobile_Content_Top"
                            id={item.plantid}
                            onClick={(e) => handlePlant(e)}
                          >
                            <div className="DAT_ProjectMobile_Content_Top_Avatar">
                              <img
                                src={
                                  item.img
                                    ? item.img
                                    : "/dat_picture/solar_panel.png"
                                }
                                alt=""
                              />
                            </div>

                            <div className="DAT_ProjectMobile_Content_Top_Info">
                              <div className="DAT_ProjectMobile_Content_Top_Info">
                                <div className="DAT_ProjectMobile_Content_Top_Info_Name">
                                  {item.plantname}
                                </div>
                                <div className="DAT_ProjectMobile_Content_Top_Info_State">
                                  <div>
                                    {" "}
                                    {item.state ? (
                                      <>
                                        <FaCheckCircle
                                          size={20}
                                          color="green"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "online",
                                          })}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <MdOutlineError
                                          size={22}
                                          color="red"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "offline",
                                          })}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                  <div>
                                    {" "}
                                    {item.warn ? (
                                      <>
                                        <FaCheckCircle
                                          size={20}
                                          color="green"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "noAlert",
                                          })}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <MdOutlineError
                                          size={22}
                                          color="red"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "alert",
                                          })}
                                        </span>
                                      </>
                                    )}{" "}
                                  </div>
                                </div>
                                <div className="DAT_ProjectMobile_Content_Top_Info_Data">
                                  <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item">
                                    {" "}
                                    <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item_Name">
                                      {dataLang.formatMessage({ id: "power" })}
                                    </div>{" "}
                                    <div>
                                      {item.power}
                                      <span>%</span>
                                    </div>{" "}
                                  </div>
                                  <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item">
                                    {" "}
                                    <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item_Name">
                                      {dataLang.formatMessage({
                                        id: "capacity",
                                      })}
                                    </div>{" "}
                                    <div>
                                      {item.capacity}
                                      <span>kWp</span>
                                    </div>{" "}
                                  </div>
                                  <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item">
                                    {" "}
                                    <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item_Name">
                                      {dataLang.formatMessage({
                                        id: "production",
                                      })}
                                    </div>{" "}
                                    <div>
                                      {item.production}
                                      <span>kWh</span>
                                    </div>{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="DAT_ProjectMobile_Content_Bottom">
                            <span>
                              {dataLang.formatMessage({ id: "lastupdate" })}
                            </span>
                            &nbsp; <span>{item.lastupdate}</span>
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              case "demo":
                return (
                  <>
                    {demo.value?.map((item, i) => {
                      return (
                        <div key={i} className="DAT_ProjectMobile_Content">
                          <div
                            className="DAT_ProjectMobile_Content_Top"
                            id={item.plantid}
                            onClick={(e) => handlePlant(e)}
                          >
                            <div className="DAT_ProjectMobile_Content_Top_Avatar">
                              <img
                                src={
                                  item.img
                                    ? item.img
                                    : "/dat_picture/solar_panel.png"
                                }
                                alt=""
                              />
                            </div>

                            <div className="DAT_ProjectMobile_Content_Top_Info">
                              <div className="DAT_ProjectMobile_Content_Top_Info">
                                <div className="DAT_ProjectMobile_Content_Top_Info_Name">
                                  {item.plantname}
                                </div>
                                <div className="DAT_ProjectMobile_Content_Top_Info_State">
                                  <div>
                                    {" "}
                                    {item.state ? (
                                      <>
                                        <FaCheckCircle
                                          size={20}
                                          color="green"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "online",
                                          })}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <MdOutlineError
                                          size={22}
                                          color="red"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "offline",
                                          })}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                  <div>
                                    {" "}
                                    {item.warn ? (
                                      <>
                                        <FaCheckCircle
                                          size={20}
                                          color="green"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "noAlert",
                                          })}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <MdOutlineError
                                          size={22}
                                          color="red"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "alert",
                                          })}
                                        </span>
                                      </>
                                    )}{" "}
                                  </div>
                                </div>
                                <div className="DAT_ProjectMobile_Content_Top_Info_Data">
                                  <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item">
                                    {" "}
                                    <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item_Name">
                                      {dataLang.formatMessage({ id: "power" })}
                                    </div>{" "}
                                    <div>
                                      {item.power}
                                      <span>%</span>
                                    </div>{" "}
                                  </div>
                                  <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item">
                                    {" "}
                                    <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item_Name">
                                      {dataLang.formatMessage({
                                        id: "capacity",
                                      })}
                                    </div>{" "}
                                    <div>
                                      {item.capacity}
                                      <span>kWp</span>
                                    </div>{" "}
                                  </div>
                                  <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item">
                                    {" "}
                                    <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item_Name">
                                      {dataLang.formatMessage({
                                        id: "production",
                                      })}
                                    </div>{" "}
                                    <div>
                                      {item.production}
                                      <span>kWh</span>
                                    </div>{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="DAT_ProjectMobile_Content_Bottom">
                            <span>{dataLang.formatMessage({ id: 'lastupdate' })}</span>&nbsp; <span>{item.lastupdate}</span>
                          </div>

                        </div>)
                    })}
                  </>);
              case "warn":
                return (
                  <>
                    {warn.value?.map((item, i) => {
                      return (
                        <div key={i} className="DAT_ProjectMobile_Content">
                          <div
                            className="DAT_ProjectMobile_Content_Top"
                            id={item.plantid}
                            onClick={(e) => handlePlant(e)}
                          >
                            <div className="DAT_ProjectMobile_Content_Top_Avatar">
                              <img
                                src={
                                  item.img
                                    ? item.img
                                    : "/dat_picture/solar_panel.png"
                                }
                                alt=""
                              />
                            </div>

                            <div className="DAT_ProjectMobile_Content_Top_Info">
                              <div className="DAT_ProjectMobile_Content_Top_Info">
                                <div className="DAT_ProjectMobile_Content_Top_Info_Name">
                                  {item.plantname}
                                </div>
                                <div className="DAT_ProjectMobile_Content_Top_Info_State">
                                  <div>
                                    {" "}
                                    {item.state ? (
                                      <>
                                        <FaCheckCircle
                                          size={20}
                                          color="green"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "online",
                                          })}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <MdOutlineError
                                          size={22}
                                          color="red"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "offline",
                                          })}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                  <div>
                                    {" "}
                                    {item.warn ? (
                                      <>
                                        <FaCheckCircle
                                          size={20}
                                          color="green"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "noAlert",
                                          })}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <MdOutlineError
                                          size={22}
                                          color="red"
                                        />{" "}
                                        <span>
                                          {dataLang.formatMessage({
                                            id: "alert",
                                          })}
                                        </span>
                                      </>
                                    )}{" "}
                                  </div>
                                </div>
                                <div className="DAT_ProjectMobile_Content_Top_Info_Data">
                                  <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item">
                                    {" "}
                                    <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item_Name">
                                      {dataLang.formatMessage({ id: "power" })}
                                    </div>{" "}
                                    <div>
                                      {item.power}
                                      <span>%</span>
                                    </div>{" "}
                                  </div>
                                  <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item">
                                    {" "}
                                    <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item_Name">
                                      {dataLang.formatMessage({
                                        id: "capacity",
                                      })}
                                    </div>{" "}
                                    <div>
                                      {item.capacity}
                                      <span>kWp</span>
                                    </div>{" "}
                                  </div>
                                  <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item">
                                    {" "}
                                    <div className="DAT_ProjectMobile_Content_Top_Info_Data_Item_Name">
                                      {dataLang.formatMessage({
                                        id: "production",
                                      })}
                                    </div>{" "}
                                    <div>
                                      {item.production}
                                      <span>kWh</span>
                                    </div>{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="DAT_ProjectMobile_Content_Bottom">
                            <span>{dataLang.formatMessage({ id: 'lastupdate' })}</span>&nbsp; <span>{item.lastupdate}</span>
                          </div>

                        </div>)
                    })}
                  </>);
              default:
                return <></>;
            }
          })()}
        </div>
      ) : (
        <div className="DAT_Project">
          <div className="DAT_Toollist_Tab">
            {listTab.map((item, i) => {
              return tab.value === item.id ? (
                <div key={"tab_" + i} className="DAT_Toollist_Tab_main">
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

          <div className="DAT_Project_Content">
            {(() => {
              switch (tab.value) {
                case "total":
                  return (
                    <DataTable
                      className="DAT_Table_Container"
                      columns={columnproject}
                      data={datafilter}
                      pagination
                      paginationComponentOptions={paginationComponentOptions}
                      fixedHeader={true}
                      noDataComponent={<Empty />}
                    />
                  );
                case "online":
                  return (
                    <DataTable
                      className="DAT_Table_Container"
                      columns={columnproject}
                      data={online.value}
                      pagination
                      paginationComponentOptions={paginationComponentOptions}
                      fixedHeader={true}
                      noDataComponent={<Empty />}
                    />
                  );
                case "offline":
                  return (
                    <DataTable
                      className="DAT_Table_Container"
                      columns={columnproject}
                      data={offline.value}
                      pagination
                      paginationComponentOptions={paginationComponentOptions}
                      fixedHeader={true}
                      noDataComponent={<Empty />}
                    />
                  );
                case "demo":
                  return (
                    <DataTable
                      className="DAT_Table_Container"
                      columns={columnproject}
                      data={demo.value}
                      pagination
                      paginationComponentOptions={paginationComponentOptions}
                      fixedHeader={true}
                      noDataComponent={<Empty />}
                    />
                  );
                case "warn":
                  return (
                    <DataTable
                      className="DAT_Table_Container"
                      columns={columnproject}
                      data={warn.value}
                      pagination
                      paginationComponentOptions={paginationComponentOptions}
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

      <div
        className="DAT_ProjectInfor"
        style={{
          height: plantState.value === "default" ? "0px" : "100vh",
          transition: "0.5s",
        }}
      >
        {(() => {
          switch (plantState.value) {
            case "info":
              return <ProjectData />;
            case "edit":
              return <EditProject usr={user} />;
            case "add":
              return <AddProject usr={user} />;
            default:
              return <></>;
          }
        })()}
      </div>

      {popupState.value ? (
        <div className="DAT_DevicePopup">
          <Popup plantid={projectData.value.plantid} func="remove" type="plant" usr={user} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
