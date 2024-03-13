import React, { useEffect, useState } from "react";
import "./Device.scss";

import Info from "./Info";
import Config from "./Config";
import Popup from "./Popup";
import DataTable from "react-data-table-component";
import { signal } from "@preact/signals-react";
import { Empty } from "../Project/Project";
import { isMobile } from "../Navigation/Navigation";
import { useSelector } from "react-redux";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { userInfor } from "../../App";
import { useIntl } from "react-intl";

import { MdDelete, MdEdit, MdDevices, MdOutlineError } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowForward, IoMdMore } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { TbSettingsCode } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";

export const tab = signal("logger");
export const infoState = signal(false);
export const info = signal({});
export const configState = signal(false);
export const popupState = signal(false);
export const displayState = signal("default");
export const projectList = signal([]);
export const loggerList = signal([]);

const tabMobile = signal(false);
const tabLable = signal("");

export default function Device(props) {
  const dataLang = useIntl();
  const user = useSelector(state => state.admin.usr);
  const [filter, setFilter] = useState(false);
  const [plantid, setPlantid] = useState("");
  const [snlogger, setSnlogger] = useState("");

  const listTab = [
    { id: "logger", name: "Logger" },
    { id: "inverter", name: "Inverter" },
    // { id: "meter", name: "Meter" },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: dataLang.formatMessage({ id: 'row' }),
    rangeSeparatorText: dataLang.formatMessage({ id: 'to' }),
    selectAllRowsItem: true,
    selectAllRowsItemText: dataLang.formatMessage({ id: 'showAll' }),
  };

  const dataInverter = [
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
    //   status: false,
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
  ];

  const dataMeter = [
    {
      id: 1,
      SN: "M0000223",
      name: "Meter 01",
      plant: "Năng lượng DAT 02",
      status: true,
      production: "66",
      dailyproduction: "895.4",
      updated: "12/30/2023 12:07:12",
    },
    {
      id: 2,
      SN: "M0000009",
      name: "Meter 02",
      plant: "Năng lượng DAT 02",
      status: true,
      production: "18",
      dailyproduction: "1238.4",
      updated: "12/30/2023 12:07:12",
    },
    {
      id: 3,
      SN: "M0000327",
      name: "Meter 03",
      plant: "Năng lượng DAT 02",
      status: true,
      production: "45",
      dailyproduction: "1024.4",
      updated: "12/30/2023 12:07:12",
    },
  ];

  const columnDevice = [
    {
      name: dataLang.formatMessage({ id: 'ordinalNumber' }),
      selector: (row, i) => i + 1,
      sortable: true,
      width: "80px",
      style: {
        justifyContent: "center",
      },
    },
    {
      name: 'Mã thiết bị',
      selector: (row) => (
        <div className="DAT_Table">
          <div
            className="DAT_Table_Infor"
            style={{ cursor: "pointer" }}
            id={row.id + "_" + tab.value}
            onClick={(e) => handleShowInfo(e)}
          >
            {/* <div className="DAT_Table_Infor_Name">{row.SN}</div> */}
            <div className="DAT_Table_Infor_Name">{row.name}</div>
            <div className="DAT_Table_Infor_Addr">{row.SN}</div>
          </div>
        </div>
      ),
      sortable: true,
      // minWidth: "350px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'project' }),
      selector: (row) => row.plant,
      sortable: true,
      minWidth: "350px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'status' }),
      selector: (row) => (
        <>
          {row.status ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </>
      ),
      width: "110px",
    },
    {
      name: dataLang.formatMessage({ id: 'electricGen' }),
      selector: (row) => row.production + " kW",
      sortable: true,
      width: "170px",
    },
    {
      name: dataLang.formatMessage({ id: 'dailyOutput' }),
      selector: (row) => row.dailyproduction + " kWh",
      sortable: true,
      width: "210px",
    },
    // {
    //   name: dataLang.formatMessage({ id: 'update' }),
    //   selector: (row) => row.updated,
    //   sortable: true,
    //   width: "180px",
    // },
    {
      name: dataLang.formatMessage({ id: 'setting' }),
      selector: (row) => (
        <>
          <div className="DAT_TableEdit">
            <span
              id={row.id + "_MORE"}
              onClick={(e) => handleModify(e, "block")}
            >
              <IoMdMore size={20} />
            </span>
          </div>

          <div
            className="DAT_ModifyBox"
            id={row.id + "_Modify"}
            style={{ display: "none" }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            {/* <div className="DAT_ModifyBox_Fix">Chỉnh sửa</div> */}
            <div
              className="DAT_ModifyBox_Remove"
              id={row.id + "_" + tab.value}
              onClick={(e) => handleRemove(e)}
            >
              <IoTrashOutline size={16} />
              &nbsp;
              {dataLang.formatMessage({ id: 'remove' })}
            </div>
          </div>
        </>
      ),
      width: "110px",
    },
  ];

  const columnRemote = [
    {
      name: dataLang.formatMessage({ id: 'ordinalNumber' }),
      selector: (row, i) => i + 1,
      sortable: true,
      width: "80px",
      style: {
        justifyContent: "center",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'name' }),
      selector: (row) => (
        <div className="DAT_Table">
          <div
            className="DAT_Table_Infor"
            id={row.pid + "_" + tab.value}
            style={{ cursor: "pointer" }}
            onClick={(e) => handleShowInfo(e)}
          >
            <div className="DAT_Table_Infor_Name">{row.pname}</div>
            <div className="DAT_Table_Infor_Addr">{row.psn}</div>
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
      name: dataLang.formatMessage({ id: 'project' }),
      selector: (row) => row.pplantname,
      sortable: true,
      minWidth: "350px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'status' }),
      selector: (row) => (
        <>
          {row.pstate === 1 ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </>
      ),
      width: "110px",
    },
    // {
    //   name: "Cập nhật",
    //   selector: (row) => row.updated,
    //   sortable: true,
    //   width: "180px",
    // },
    {
      name: dataLang.formatMessage({ id: 'setting' }),
      selector: (row) => (
        <>
          <div className="DAT_TableEdit">
            <span
              id={row.psn + "_MORE"}
              // onMouseEnter={(e) => handleModify(e, "block")}
              onClick={(e) => handleModify(e, "block")}
            >
              <IoMdMore size={20} />
            </span>
          </div>

          <div className="DAT_ModifyBox"
            id={row.psn + "_Modify"}
            style={{ display: "none", marginTop: '2px' }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            <div className="DAT_ModifyBox_Fix"
              onClick={(e) => handleEdit(e)}
            >
              <FiEdit size={14} />
              &nbsp;
              {dataLang.formatMessage({ id: 'edits' })}
            </div>
            <div className="DAT_ModifyBox_Remove"
              id={row.psn + "_" + row.pplantid}
              onClick={(e) => handleRemove(e)}
            >
              <IoTrashOutline size={16} />
              &nbsp;
              {dataLang.formatMessage({ id: 'delete' })}
            </div>
          </div>
        </>
      ),
      width: "103px",
    },
  ];

  const handleShowInfo = (e) => {
    infoState.value = true;
    const id = e.currentTarget.id;
    const idArr = id.split("_");
    switch (idArr[1]) {
      case "inverter":
        info.value = dataInverter.find((item) => item.id == idArr[0]);
        break;
      case "logger":
        info.value = loggerList.value.find((item) => item.pid == idArr[0]);
        console.log(info.value);
        break;
      case "meter":
        info.value = dataMeter.find((item) => item.id == idArr[0]);
        break;
      default:
        break;
    }
  };

  const handleEdit = (e) => { };

  const handleRemove = (e) => {
    popupState.value = true;
    const id = e.currentTarget.id;
    const idArr = id.split("_");
    setPlantid(idArr[1]);
    setSnlogger(idArr[0]);

    // switch (idArr[1]) {
    //   case "inverter":
    //     info.value = dataInverter.find((item) => item.id == idArr[0]);
    //     break;
    //   case "logger":
    //     info.value = dataLogger.find((item) => item.id == idArr[0]);
    //     break;
    //   case "meter":
    //     info.value = dataMeter.find((item) => item.id == idArr[0]);
    //     break;
    // }
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

  const handleShowConfig = () => {
    if (configState.value) {
      configState.value = false;
    } else {
      configState.value = true;
    }
  };

  useEffect(() => {
    tabLable.value = listTab[0].name;

    // get logger
    const getAllLogger = async () => {
      let d = await callApi('post', host.DATA + '/getallLogger', { usr: user, partnerid: userInfor.value.partnerid, type: userInfor.value.type });
      // console.log(d);
      if (d.status === true) {
        loggerList.value = d.data;
      }
    };
    getAllLogger();

  }, []);

  return (
    <>
      <div className="DAT_DeviceHeader">
        <div className="DAT_DeviceHeader_Title">
          <MdDevices color="gray" size={25} /> <span>{dataLang.formatMessage({ id: 'device' })}</span>
        </div>

        {isMobile.value ? (
          <>
            <div className="DAT_Modify">
              <div className="DAT_Modify_Item" onClick={() => setFilter(!filter)}><CiSearch color="white" size={20} /></div>
              {/* <div className="DAT_Modify_Add" onClick={handleShowConfig}><TbSettingsCode color="white" size={20} /></div> */}
            </div>

            {filter ? (
              <div className="DAT_Modify_Filter">
                <input type="text" placeholder={dataLang.formatMessage({ id: 'enterDev' })} />
                <div className="DAT_Modify_Filter_Close" onClick={() => setFilter(!filter)}>
                  <RxCross2 size={20} color="white" />
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <div className="DAT_DeviceHeader_Filter">
              <input type="text" placeholder={dataLang.formatMessage({ id: 'enterDev' })} />
              <CiSearch color="gray" size={20} />
            </div>
            <div></div>
            {/* <button className="DAT_DeviceHeader_New" onClick={handleShowConfig}>
              <span>
                <TbSettingsCode color="white" size={20} />
                &nbsp;
                {dataLang.formatMessage({ id: 'config' })}
              </span>
            </button> */}
          </>
        )}
      </div>

      {isMobile.value ? (
        <div className="DAT_DeviceMobile">
          <div className="DAT_Toollist_Tab_Mobile" >
            <button className="DAT_Toollist_Tab_Mobile_content"
              onClick={() => (tabMobile.value = !tabMobile.value)}
            >
              <span> {tabLable.value}</span>
              {tabMobile.value ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </button>

            {tabMobile.value ? (
              <div className="DAT_Toollist_Tab_Mobile_list">
                {listTab.map((item, i) => {
                  return (
                    <div className="DAT_Toollist_Tab_Mobile_list_item"
                      key={i}
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
              case "inverter":
                return (
                  <>
                    {dataInverter?.map((item, i) => {
                      return (
                        <div key={i} className="DAT_DeviceMobile_Content">
                          <div className="DAT_DeviceMobile_Content_Top">
                            <div className="DAT_DeviceMobile_Content_Top_Left"
                              id={item.pid + "_" + tab.value}
                              onClick={(e) => handleShowInfo(e)}
                            >
                              <div className="DAT_DeviceMobile_Content_Top_Left_Name">{dataLang.formatMessage({ id: 'name' })}: {item.pname}</div>
                              <div className="DAT_DeviceMobile_Content_Top_Left_Sn">SN: {item.psn}</div>
                            </div>

                            <div className="DAT_DeviceMobile_Content_Top_Right">
                              <div className="DAT_DeviceMobile_Content_Top_Right_Item">
                                <MdEdit size={20} color="#216990" />
                              </div>
                              <div className="DAT_DeviceMobile_Content_Top_Right_Item"
                                id={item.psn + "_" + item.pplantid}
                                onClick={(e) => handleRemove(e)}
                              >
                                <MdDelete size={20} color="red" />
                              </div>
                            </div>
                          </div>

                          <div className="DAT_DeviceMobile_Content_Bottom">
                            <div className="DAT_DeviceMobile_Content_Bottom_State">
                              {item.pstate ?
                                <>
                                  <FaCheckCircle size={20} color="green" />
                                  <span>{dataLang.formatMessage({ id: 'online' })}</span>
                                </>
                                :
                                <>
                                  <MdOutlineError size={22} color="red" />
                                  <span>{dataLang.formatMessage({ id: 'offline' })}</span>
                                </>
                              }
                            </div>

                            <div className="DAT_DeviceMobile_Content_Bottom_Type">
                              {dataLang.formatMessage({ id: 'project' })}: {item.pplantname}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              case "meter":
                return (
                  <DataTable
                    className="DAT_Table_Container"
                    columns={columnDevice}
                    data={dataMeter}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    fixedHeader={true}
                    noDataComponent={<Empty />}
                  />
                );
              case "logger":
                return (
                  <>
                    {loggerList.value?.map((item, i) => {
                      return (
                        <div key={i} className="DAT_DeviceMobile_Content">
                          <div className="DAT_DeviceMobile_Content_Top">
                            <div className="DAT_DeviceMobile_Content_Top_Left"
                              id={item.pid + "_" + tab.value}
                              onClick={(e) => handleShowInfo(e)}
                            >
                              <div className="DAT_DeviceMobile_Content_Top_Left_Name">{dataLang.formatMessage({ id: 'name' })}: {item.pname}</div>
                              <div className="DAT_DeviceMobile_Content_Top_Left_Sn">SN: {item.psn}</div>
                            </div>

                            <div className="DAT_DeviceMobile_Content_Top_Right">
                              <div className="DAT_DeviceMobile_Content_Top_Right_Item">
                                <MdEdit size={20} color="#216990" />
                              </div>
                              <div className="DAT_DeviceMobile_Content_Top_Right_Item"
                                id={item.psn + "_" + item.pplantid}
                                onClick={(e) => handleRemove(e)}
                              >
                                <MdDelete size={20} color="red" />
                              </div>
                            </div>
                          </div>

                          <div className="DAT_DeviceMobile_Content_Bottom">
                            <div className="DAT_DeviceMobile_Content_Bottom_State">
                              {item.pstate ?
                                <>
                                  <FaCheckCircle size={20} color="green" />
                                  <span>{dataLang.formatMessage({ id: 'online' })}</span>
                                </>
                                :
                                <>
                                  <MdOutlineError size={22} color="red" />
                                  <span>{dataLang.formatMessage({ id: 'offline' })}</span>
                                </>
                              }
                            </div>

                            <div className="DAT_DeviceMobile_Content_Bottom_Type">
                              {dataLang.formatMessage({ id: 'project' })}: {item.pplantname}
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
        <div className="DAT_Device">
          <div className="DAT_Toollist_Tab">
            {listTab.map((item, i) => {
              return tab.value === item.id ? (
                <div key={i} className="DAT_Toollist_Tab_main">
                  <p className="DAT_Toollist_Tab_main_left"></p>
                  <span className="DAT_Toollist_Tab_main_content1"
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
                <span className="DAT_Toollist_Tab_main_content2"
                  key={i}
                  id={item.id}
                  style={{ backgroundColor: "#dadada" }}
                  onClick={(e) => (tab.value = item.id)}
                >
                  {item.name}
                </span>
              );
            })}
          </div>

          <div className="DAT_Device_Content">
            {(() => {
              switch (tab.value) {
                case "inverter":
                  return (
                    <DataTable
                      className="DAT_Table_Container"
                      columns={columnDevice}
                      data={dataInverter}
                      pagination
                      paginationComponentOptions={paginationComponentOptions}
                      fixedHeader={true}
                      noDataComponent={<Empty />}
                    />
                  );
                case "meter":
                  return (
                    <DataTable
                      className="DAT_Table_Container"
                      columns={columnDevice}
                      data={dataMeter}
                      pagination
                      paginationComponentOptions={paginationComponentOptions}
                      fixedHeader={true}
                      noDataComponent={<Empty />}
                    />
                  );
                case "logger":
                  return (
                    <DataTable
                      className="DAT_Table_Container"
                      columns={columnRemote}
                      data={loggerList.value}
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

      <div className="DAT_DeviceInfor"
        style={{ height: infoState.value ? "100%" : "0px", transition: "0.5s" }}
      >
        {infoState.value ? <Info /> : <></>}
      </div>

      <div className="DAT_DeviceConfig"
        style={{
          height: configState.value ? "100vh" : "0px",
          transition: "0.5s",
        }}
      >
        {configState.value ? <Config /> : <></>}
      </div>

      {popupState.value ? (
        <div className="DAT_DevicePopup">
          <Popup plantid={plantid} sn={snlogger} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
