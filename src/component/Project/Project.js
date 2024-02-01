import React, { useEffect } from "react";
import "./Project.scss";
import DataTable from "react-data-table-component";
import { isMobile } from "../Navigation/Navigation";

import { FaCheckCircle, FaRegFileAlt } from "react-icons/fa";
import { MdOutlineError, MdEditDocument } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { GoProject } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import ProjectData from "./ProjectData";
import EditProject from "./EditProject";
import AddProject from "./AddProject";
import Popup from "./Popup";

import { signal } from "@preact/signals-react";
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

export const Empty = () => {
  return (
    <div className="DAT_TableEmpty">
      <div className="DAT_TableEmpty_Group">
        <div className="DAT_TableEmpty_Group_Icon">
          <FaRegFileAlt size={50} color="gray" />
        </div>
        <div className="DAT_TableEmpty_Group_Text">Danh sách trống</div>
      </div>
    </div>
  );
};

export const lastId = signal(2);

export const dataproject = signal([
  {
    id: 1,
    name: "Năng lượng DAT 01",
    addr: " 716/6 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, Tp.HCM",
    long: "--",
    lat: "--",
    plantype: "residential",
    systemtype: "grid",
    capacity: "110",
    griddate: "",
    angle: "--",
    currency: "vnd",
    price: "--",
    contact: "--",
    phone: "0123456789",
    business: "--",
    status: true,
    warn: true,
    production: "16",
    power: "14.54",
    lastupdate: "12/30/2023 12:07:12",
    createdate: "05/01/2022 14:03:36",
  },
  {
    id: 2,
    name: "Năng lượng DAT 02",
    addr: " 716/6 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, Tp.HCM",
    long: "--",
    lat: "--",
    plantype: "industrial",
    systemtype: "consumption",
    capacity: "222",
    griddate: "",
    angle: "--",
    currency: "vnd",
    price: "--",
    contact: "--",
    phone: "07123872311",
    business: "--",
    status: false,
    warn: false,
    production: "230",
    power: "0",
    lastupdate: "10/30/2023 08:01:22",
    createdate: "05/01/2022 14:08:36",
  },
]);

function Project(props) {
  const listTab = [
    { id: "total", name: "Tổng" },
    { id: "online", name: "Online" },
    { id: "offline", name: "Offline" },
    { id: "warn", name: "Cảnh báo" },
    { id: "demo", name: "Chạy thử" },
  ];

  // const color = { cur: "#6495ed", pre: "gray" };

  const paginationComponentOptions = {
    rowsPerPageText: "Số hàng",
    rangeSeparatorText: "đến",
    selectAllRowsItem: true,
    selectAllRowsItemText: "tất cả",
  };

  // const dataproject = [
  //   {
  //     id: 1,
  //     name: "Năng lượng DAT 01",
  //     addr: " 716/6 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, Tp.HCM",
  //     status: true,
  //     warn: true,
  //     capacity: "110",
  //     production: "16",
  //     power: "14.54",
  //     lastupdate: "12/30/2023 12:07:12",
  //     createdate: "05/01/2022 14:03:36",
  //   },
  //   {
  //     id: 2,
  //     name: "Năng lượng DAT 02",
  //     addr: " 716/6 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, Tp.HCM",
  //     status: false,
  //     warn: false,
  //     capacity: "222",
  //     production: "230",
  //     power: "0",
  //     lastupdate: "10/30/2023 08:01:22",
  //     createdate: "05/01/2022 14:08:36",
  //   },
  //   {
  //     id: 3,
  //     name: "Năng lượng DAT 03",
  //     addr: " 716/6 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, Tp.HCM",
  //     status: false,
  //     warn: false,
  //     capacity: "333",
  //     production: "116",
  //     power: "0",
  //     lastupdate: "10/30/2023 08:01:22",
  //     createdate: "05/01/2022 14:08:36",
  //   },
  //   {
  //     id: 4,
  //     name: "Năng lượng DAT 04",
  //     addr: " 716/6 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, Tp.HCM",
  //     status: false,
  //     warn: false,
  //     capacity: "120",
  //     production: "16",
  //     power: "0",
  //     lastupdate: "10/30/2023 08:01:22",
  //     createdate: "05/01/2022 14:08:36",
  //   },
  //   {
  //     id: 5,
  //     name: "Năng lượng DAT 05",
  //     addr: " 716/6 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, Tp.HCM",
  //     status: false,
  //     warn: false,
  //     capacity: "120",
  //     production: "123",
  //     power: "0",
  //     lastupdate: "10/30/2023 08:01:22",
  //     createdate: "05/01/2022 14:08:36",
  //   },
  //   {
  //     id: 6,
  //     name: "Năng lượng DAT 06",
  //     addr: " 716/6 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, Tp.HCM",
  //     status: false,
  //     warn: false,
  //     capacity: "90",
  //     production: "168",
  //     power: "0",
  //     lastupdate: "10/30/2023 08:01:22",
  //     createdate: "05/01/2022 14:08:36",
  //   },
  //   {
  //     id: 7,
  //     name: "Năng lượng DAT 07",
  //     addr: " 716/6 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, Tp.HCM",
  //     status: false,
  //     warn: false,
  //     capacity: "150",
  //     production: "160",
  //     power: "0",
  //     lastupdate: "10/30/2023 08:01:22",
  //     createdate: "05/01/2022 14:08:36",
  //   },

  //   {
  //     id: 8,
  //     name: "Năng lượng DAT 08",
  //     addr: " 716/6 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, Tp.HCM",
  //     status: false,
  //     warn: false,
  //     capacity: "100",
  //     production: "18",
  //     power: "0",
  //     lastupdate: "10/30/2023 08:01:22",
  //     createdate: "05/01/2022 14:08:36",
  //   },
  //   {
  //     id: 9,
  //     name: "Năng lượng DAT 09",
  //     addr: " 716/6 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, Tp.HCM",
  //     status: false,
  //     warn: false,
  //     capacity: "110",
  //     production: "6",
  //     power: "0",
  //     lastupdate: "10/30/2023 08:01:22",
  //     createdate: "05/01/2022 14:08:36",
  //   },
  // ];

  const columnproject = [
    {
      name: "Tên",
      selector: (row) => (
        <div className="DAT_Table" id={row.id} onClick={(e) => handlePlant(e)}>
          <img src="/dat_picture/solar_panel.png" alt="" />

          <div className="DAT_Table_Infor">
            <div className="DAT_Table_Infor_Name">{row.name}</div>
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
      name: "Kết nối",
      selector: (row) => (
        <div>
          {row.warn ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </div>
      ),
      width: "100px",
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
      name: "Dung lượng(kWp)",
      selector: (row) => row.capacity,
      sortable: true,
      width: "160px",
    },
    {
      name: "Sản xuất(kW)",
      selector: (row) => row.production,
      sortable: true,
      width: "140px",
    },
    {
      name: "Nguồn cấp(%)",
      selector: (row) => row.power,
      sortable: true,
      width: "140px",
    },
    {
      name: "Tag",
      selector: (row) => (
        <div className="DAT_TableEdit">
          <MdEditDocument color="gray" size={20} />
        </div>
      ),
      width: "100px",
    },
    {
      name: "Lần cập nhật cuối",
      selector: (row) => row.lastupdate,
      sortable: true,
      width: "180px",
    },
    {
      name: "Ngày tạo",
      selector: (row) => row.createdate,
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
            <div
              className="DAT_ModifyBox_Fix"
              id={row.id}
              onClick={(e) => handleEdit(e)}
            >
              Chỉnh sửa
            </div>
            <div
              className="DAT_ModifyBox_Remove"
              id={row.id}
              onClick={(e) => handleDelete(e)}
            >
              Gỡ
            </div>
          </div>
        </>
      ),
      width: "100px",
    },
  ];

  const handlePlant = (e) => {
    plantState.value = "info";
    const newPlant = dataproject.value.find(
      (item) => item.id == e.currentTarget.id
    );
    projectData.value = newPlant;
  };

  const handleEdit = (e) => {
    plantState.value = "edit";
    const newPlant = dataproject.value.find(
      (item) => item.id == e.currentTarget.id
    );
    projectData.value = newPlant;
  };

  const handleDelete = (e) => {
    popupState.value = true;
    const newPlant = dataproject.value.find(
      (item) => item.id == e.currentTarget.id
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

  useEffect(() => {
    online.value = dataproject.value.filter((item) => item.status == true);
    offline.value = dataproject.value.filter((item) => item.status == false);
    tabLable.value = listTab[0].name;
  }, [dataproject.value]);

  return (
    <>
      <div className="DAT_ProjectHeader">
        <div className="DAT_ProjectHeader_Title">
          <GoProject color="gray" size={25} /> <span>Dự án</span>
        </div>

        <div className="DAT_ProjectHeader_Filter">
          <input type="text" placeholder="Nhập tên dự án" />
          <CiSearch color="gray" size={20} />
        </div>

        <button
          className="DAT_ProjectHeader_New"
          onClick={() => (plantState.value = "add")}
        >
          Tạo mới
        </button>
      </div>

      <div className="DAT_Project">
        {/* <div className='DAT_Project_Nav'>
                    <span id='total' style={{ color: tab.value === "total" ? color.cur : color.pre }} onClick={() => { tab.value = "total" }} >Tổng({dataproject.length})</span>
                    <span id='online' style={{ color: tab.value === "online" ? color.cur : color.pre }} onClick={() => { tab.value = "online" }} >Online({online.value.length})</span>
                    <span id='offline' style={{ color: tab.value === "offline" ? color.cur : color.pre }} onClick={() => { tab.value = "offline" }} >Offline({offline.value.length})</span>
                    <span id='demo' style={{ color: tab.value === "demo" ? color.cur : color.pre }} onClick={(e) => { tab.value = "demo" }} >Chạy thử({demo.value.length})</span>
                    <span id='warn' style={{ color: tab.value === "warn" ? color.cur : color.pre }} onClick={() => { tab.value = "warn" }} >Cảnh báo({warn.value.length})</span>
                </div> */}

        {isMobile.value ? (
          <div className="DAT_Toollist_Tab_Mobile">
            <button
              className="DAT_Toollist_Tab_Mobile_content"
              onClick={() => (tabMobile.value = !tabMobile.value)}
            >
              <span> {tabLable.value}</span>
              {tabMobile.value ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </button>
            <div className="DAT_Toollist_Tab_Mobile_list">
              {listTab.map((item, i) => {
                return (
                  <div
                    className="DAT_Toollist_Tab_Mobile_list_item"
                    style={{ display: tabMobile.value ? "block" : "none" }}
                    key={"tabmobile_" + i}
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
        )}

        <div className="DAT_Project_Content">
          {(() => {
            switch (tab.value) {
              case "total":
                return (
                  <DataTable
                    className="DAT_Table_Container"
                    columns={columnproject}
                    data={dataproject.value}
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
              return <EditProject />;
            case "add":
              return <AddProject />;
            default:
              return <></>;
          }
        })()}
      </div>

      {popupState.value ? (
        <div className="DAT_DevicePopup">
          <Popup />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Project;
