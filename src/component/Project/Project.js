import React, { useEffect, useState } from "react";
import "./Project.scss";

import DataTable from "react-data-table-component";
import { isMobile } from "../Navigation/Navigation";
import ProjectData from "./ProjectData";
import EditProject from "./EditProject";
import AddProject from "./AddProject";
import Popup from "./Popup";
import { lowerCase } from "lodash";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { useSelector } from "react-redux";
import { signal } from "@preact/signals-react";
import { ruleInfor, userInfor } from "../../App";
import { useIntl } from "react-intl";

import { FaCheckCircle, FaRegFileAlt } from "react-icons/fa";
import { MdOutlineError, MdEdit, MdDelete, MdAddchart } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { GoPencil, GoProject } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowForward, IoMdMore } from "react-icons/io";
import { IoAddOutline, IoTrashOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";

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
    plantId: 1,
    // SN: "11111111",
    loggerSN: "T0623A000162",
    inverterSN: "I0000145",
  },
  {
    plantId: 1,
    // SN: "22222222",
    loggerSN: "T0623A000166",
    inverterSN: "I0000012",
  },
  {
    plantId: 2,
    // SN: "33333333",
    loggerSN: "T0623A000177",
    inverterSN: "I0000333",
  },
  {
    plantId: 3,
    // SN: "33333333",
    loggerSN: "T0623A000188",
    inverterSN: "I0000333",
  },
]);

export const Logger = signal([]);
export const InverterbyLogger = signal([]);
export const Inverter = signal([]);

export default function Project(props) {
  const dataLang = useIntl();
  const user = useSelector((state) => state.admin.usr);
  const [datafilter, setDatafilter] = useState([]);
  const [type, setType] = useState("name");
  const [filter, setFilter] = useState(false);

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
        <>
          {row.state === 1 ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </>
      ),
      width: "110px",
    },
    {
      name: dataLang.formatMessage({ id: "warn" }),
      selector: (row) => (
        <div>
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
      width: "160px",
    },
    {
      name: dataLang.formatMessage({ id: "electricGen" }),
      selector: (row) => row.production + " kWh",
      sortable: true,
      width: "180px",
    },
    {
      name: dataLang.formatMessage({ id: "power" }),
      selector: (row) => row.power + " %",
      sortable: true,
      // width: "140px",
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
            <></>
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
              <></>
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
              <></>
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
    if (e.target.value === "") {
      setDatafilter(dataproject.value);
    } else {
      const t = e.target.value;
      const db = dataproject.value.filter((row) =>
        // item.name.includes(t)
        {
          console.log(row.power);
          switch (type) {
            case "name":
              return row.name.toLowerCase().includes(lowerCase(t));
            case "capacity":
              return String(row.capacity) === t;
            case "production":
              return String(row.production) === t;
            case "power":
              return row.power === t;
            case "lastupdate":
              return row.lastupdate === t;
            case "createdate":
              return row.createdate === t;
            default:
              return row.name.toLowerCase().includes(lowerCase(t));
          }
        }
      );
      setDatafilter(db);
    }
  };

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

    return () => {
      plantState.value = "default";
    };
  }, []);

  // useEffect(() => {
  //   if (ruleInfor.value) {
  //     console.log(ruleInfor.value);
  //   }
  // }, [ruleInfor.value]);

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
                <></>
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
              <></>
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
                                    <></>
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
                                    <></>
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
                            <span>
                              {dataLang.formatMessage({ id: "lastupdate" })}
                            </span>{" "}
                            &nbsp; <span>{item.lastupdate}</span>
                          </div>
                        </div>
                      );
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
          <Popup plantid={projectData.value.plantid} type="plant" usr={user} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
