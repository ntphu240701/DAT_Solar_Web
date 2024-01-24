import React, { useEffect } from "react";
import "./Device.scss";
import DataTable from "react-data-table-component";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import { signal } from "@preact/signals-react";
import { CiSearch } from "react-icons/ci";
import { Empty } from "../Project/Project";
import { isMobile } from "../Navigation/Navigation";
import { TbSettingsCode } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Info from "./Info";
import Config from "./Config";
import Popup from "./Popup";

export const tab = signal("inverter");
const tabLable = signal("");
const tabMobile = signal(false);

export const infoState = signal(false);
export const info = signal({});
export const configState = signal(false);
export const popupState = signal(false);

export const displayState = signal("default");

function Device(props) {
  const listTab = [
    { id: "inverter", name: "Inverter" },
    { id: "meter", name: "Meter" },
    { id: "logger", name: "Logger" },
  ];
  const color = { cur: "#6495ed", pre: "gray" };

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
      status: true,
      production: "562",
      dailyproduction: "897.4",
      updated: "12/30/2023 12:07:12",
    },
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
      status: true,
      updated: "12/30/2023 12:07:12",
    },
  ];

  const columnDevice = [
    {
      name: "Tên",
      selector: (row) => (
        <div className="DAT_Table">
          <div
            className="DAT_Table_Infor"
            style={{ cursor: "pointer" }}
            id={row.id + "_" + tab.value}
            onClick={(e) => handleShowInfo(e)}
          >
            <div className="DAT_Table_Infor_Name">{row.name}</div>
            <div className="DAT_Table_Infor_Addr">{row.SN}</div>
          </div>
        </div>
      ),
      sortable: true,
      minWidth: "350px",
    },
    {
      name: "Trạng thái",
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
      name: "Dự án",
      selector: (row) => row.plant,
      sortable: true,
      minWidth: "350px",
    },

    {
      name: "Sản lượng(kW)",
      selector: (row) => row.production,
      sortable: true,
      width: "140px",
    },
    {
      name: "SL tức thời(kWh)",
      selector: (row) => row.dailyproduction,
      sortable: true,
      width: "150px",
    },
    {
      name: "Lần cập nhật cuối",
      selector: (row) => row.updated,
      sortable: true,
      width: "180px",
    },
    {
      name: "Tùy chỉnh",
      selector: (row) => (
        <>
          <div className="DAT_TableEdit">
            <span
              id={row.id + "_MORE"}
              onMouseEnter={(e) => handleModify(e, "block")}
            >
              ...
            </span>
          </div>

          <div
            className="DAT_ModifyBox"
            id={row.id + "_Modify"}
            style={{ display: "none" }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            <div className="DAT_ModifyBox_Fix">Chỉnh sửa</div>
            <div
              className="DAT_ModifyBox_Remove"
              id={row.id + "_" + tab.value}
              onClick={(e) => handleRemove(e)}
            >
              Gỡ
            </div>
          </div>
        </>
      ),
      width: "100px",
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
        info.value = dataLogger.find((item) => item.id == idArr[0]);
        break;
      case "meter":
        info.value = dataMeter.find((item) => item.id == idArr[0]);
        break;
    }
  };

  const handleRemove = (e) => {
    popupState.value = true;
    const id = e.currentTarget.id;
    const idArr = id.split("_");
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

  const columnRemote = [
    {
      name: "Tên",
      selector: (row) => (
        <div className="DAT_Table">
          <div
            className="DAT_Table_Infor"
            id={row.id + "_" + tab.value}
            onClick={(e) => handleShowInfo(e)}
          >
            <div className="DAT_Table_Infor_Name">{row.name}</div>
            <div className="DAT_Table_Infor_Addr">{row.SN}</div>
          </div>
        </div>
      ),
      sortable: true,
      minWidth: "350px",
    },
    {
      name: "Trạng thái",
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
      name: "Dự án",
      selector: (row) => row.plant,
      sortable: true,
      minWidth: "350px",
    },
    {
      name: "Lần cập nhật cuối",
      selector: (row) => row.updated,
      sortable: true,
      width: "180px",
    },
    {
      name: "Tùy chỉnh",
      selector: (row) => (
        <>
          <div className="DAT_TableEdit">
            <span
              id={row.id + "_MORE"}
              onMouseEnter={(e) => handleModify(e, "block")}
            >
              ...
            </span>
          </div>

          <div
            className="DAT_ModifyBox"
            id={row.id + "_Modify"}
            style={{ display: "none" }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            <div className="DAT_ModifyBox_Fix">Chỉnh sửa</div>
            <div
              className="DAT_ModifyBox_Remove"
              id={row.id + "_" + tab.value}
              onClick={(e) => handleRemove(e)}
            >
              Gỡ
            </div>
          </div>
        </>
      ),
      width: "100px",
    },
  ];

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

  useEffect(() => {
    tabLable.value = listTab[0].name;
  }, []);

  const handleShowConfig = () => {
    if (configState.value) {
      configState.value = false;
    } else {
      configState.value = true;
    }
  };

  return (
    <>
      <div className="DAT_DeviceHeader">
        <div className="DAT_DeviceHeader_Title">
          <TbSettingsCode color="gray" size={25} /> <span>Thiết bị</span>
        </div>
        <div className="DAT_DeviceHeader_Filter">
          <input type="text" placeholder="Nhập tên thiết bị" />
          <CiSearch color="gray" size={20} />
        </div>
        <button className="DAT_DeviceHeader_New" onClick={handleShowConfig}>
          Cấu hình
        </button>
      </div>

      <div className="DAT_Device">
        {/* <div className='DAT_Device_Nav'>
                    <span id='inverter' style={{ color: tab.value === "inverter" ? color.cur : color.pre }} onClick={() => { tab.value = "inverter" }} >Inverter</span>
                    <span id='meter' style={{ color: tab.value === "meter" ? color.cur : color.pre }} onClick={() => { tab.value = "meter" }} >Meter</span>
                    <span id='logger' style={{ color: tab.value === "logger" ? color.cur : color.pre }} onClick={() => { tab.value = "logger" }} >Logger</span>
                </div> */}
        {isMobile.value ? (
          <div className="DAT_Toollist_Tab_Mobile">
            <button
              className="DAT_Toollist_Tab_Mobile_content"
              onClick={() => (tabMobile.value = !tabMobile.value)}
            >
              {" "}
              <span> {tabLable.value}</span>{" "}
              {tabMobile.value ? <IoIosArrowDown /> : <IoIosArrowForward />}{" "}
            </button>
            <div className="DAT_Toollist_Tab_Mobile_list">
              {listTab.map((item, i) => {
                return (
                  <div
                    className="DAT_Toollist_Tab_Mobile_list_item"
                    style={{ display: tabMobile.value ? "block" : "none" }}
                    key={i}
                    id={item.id}
                    onClick={(e) => handleTabMobile(e)}
                  >
                    {i + 1}: {item.name}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="DAT_Toollist_Tab">
            {listTab.map((item, i) => {
              return tab.value === item.id ? (
                <div key={i} className="DAT_Toollist_Tab_main">
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
        )}
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
                    data={dataLogger}
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

      <div
        className="DAT_DeviceInfor"
        style={{ height: infoState.value ? "100%" : "0px", transition: "0.5s" }}
      >
        {infoState.value ? <Info /> : <></>}
      </div>

      <div
        className="DAT_DeviceConfig"
        style={{
          height: configState.value ? "100vh" : "0px",
          transition: "0.5s",
        }}
      >
        {configState.value ? <Config /> : <></>}
      </div>

      {popupState.value ? (
        <div className="DAT_DevicePopup">
          <Popup></Popup>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Device;
