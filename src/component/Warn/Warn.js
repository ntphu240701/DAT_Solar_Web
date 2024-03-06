import React, { useEffect, useState } from "react";
import "./Warn.scss";
import DataTable from "react-data-table-component";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { signal } from "@preact/signals-react";
import { CiSearch } from "react-icons/ci";
import { Empty } from "../Project/Project";
import { LuMailWarning } from "react-icons/lu";
import { isMobile, message } from "../Navigation/Navigation";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowRoundForward } from "react-icons/io";
import SettingWarn from "./SettingWarn";
import RaiseBox from "./RaiseBox";
import { useIntl } from "react-intl";
import { TbSettingsCode } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
const tab = signal("all");
const tabLable = signal("");
const tabMobile = signal(false);
const open = signal([]);
const closed = signal([]);
export const warnState = signal("default");
export const temp = signal([]);
export const deletewarnState = signal(false);
export const idDel = signal();

export const dataWarn = signal([
  {
    boxid: "E01",
    warnid: 1,
    plant: "Năng lượng DAT 01",
    device: "T0623A000169",
    status: "closed",
    opentime: "12/30/2023 12:07:12",
    closedtime: "12/30/2023 15:00:58",
    level: "notice",
    state: false,
  },
  {
    boxid: "E01",
    warnid: 2,
    plant: "Năng lượng DAT 01",
    device: "T0623A000162",
    status: "open",
    opentime: "01/16/2023 19:30:12",
    closedtime: "--",
    level: "warning",
    state: false,
  },
  {
    boxid: "E02",
    warnid: 3,
    plant: "Năng lượng DAT 01",
    device: "T0623A000179",
    status: "open",
    opentime: "01/16/2023 21:07:12",
    closedtime: "--",
    level: "warning",
    state: false,
  },
  {
    boxid: "E03",
    warnid: 4,
    plant: "Năng lượng DAT 01",
    device: "T0623A000179",
    status: "open",
    opentime: "02/16/2023 13:18:21",
    closedtime: "--",
    level: "notice",
    state: false,
  },
]);


function Warn(props) {
  const dataLang = useIntl();
  const [filter, setFilter] = useState(false);

  const listTab = [
    { id: "all", name: dataLang.formatMessage({ id: 'total' }) },
    { id: "open", name: dataLang.formatMessage({ id: 'warn' }) },
    { id: "closed", name: dataLang.formatMessage({ id: 'resolve' }) },
  ];

  const color = { cur: "#6495ed", pre: "gray" };

  const paginationComponentOptions = {
    rowsPerPageText: dataLang.formatMessage({ id: 'row' }),
    rangeSeparatorText: dataLang.formatMessage({ id: 'to' }),
    selectAllRowsItem: true,
    selectAllRowsItemText: dataLang.formatMessage({ id: 'showAll' }),
  };


  const columnWarn = [
    {
      name: dataLang.formatMessage({ id: 'ordinalNumber' }),
      selector: (row, index) => index + 1,
      width: "80px",
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
      name: dataLang.formatMessage({ id: 'name' }),
      selector: (row) => row.boxid,
      sortable: true,
      minWidth: "200px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'device' }),
      selector: (row) => row.device,
      sortable: true,
      minWidth: "200px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'level' }),
      selector: (row) => (
        <>
          {row.level === "warning" ? (
            <div className="DAT_TableWarning">{dataLang.formatMessage({ id: 'warn' })}</div>
          ) : (
            <div className="DAT_TableNotice">{dataLang.formatMessage({ id: 'notice' })}</div>
          )}
        </>
      ),
      sortable: true,
      minWidth: "120px",
    },
    {
      name: "Thời gian hiện cảnh báo",
      selector: (row) => row.opentime,
      sortable: true,
      width: "200px",
    },
    {
      name: "Thời gian đóng cảnh báo",
      selector: (row) => row.closedtime,
      sortable: true,
      width: "200px",
    },
    {
      name: dataLang.formatMessage({ id: 'setting' }),
      selector: (row) => (
        <>
          <div className="DAT_TableEdit">
            <span
              id={row.boxid + "" + row.warnid + "_MORE"}
              onMouseEnter={(e) => handleModify(e, "block")}
            >
              ...
            </span>
          </div>

          <div
            className="DAT_ModifyBox"
            id={row.boxid + "" + row.warnid + "_Modify"}
            style={{ display: "none" }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            {/* <div className="DAT_ModifyBox_Fix">Chỉnh sửa</div> */}
            <div
              className="DAT_ModifyBox_Remove"
              id={row.boxid + "_" + row.warnid}
              onClick={(e) => handleDeleteWarn(e)}
            >
              {dataLang.formatMessage({ id: 'delete' })}
            </div>
          </div>
        </>
      ),
      width: "100px",
    },
  ];

  const handleDeleteWarn = (e) => {
    deletewarnState.value = true;
    idDel.value = e.currentTarget.id;
    console.log(idDel.value);
  };

  const handleSetting = (e) => {
    warnState.value = "setting";
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
    open.value = dataWarn.value.filter((item) => item.status == "open");
    closed.value = dataWarn.value.filter((item) => item.status == "closed");
    tabLable.value = listTab[0].name;
  }, []);

  return (
    <>
      <div className="DAT_WarnHeader">
        <div className="DAT_WarnHeader_Title">
          <LuMailWarning color="gray" size={25} />
          <span>{dataLang.formatMessage({ id: 'warn' })}</span>
        </div>

        {isMobile.value ? (
          <>
            <div className="DAT_Modify">
              <div className="DAT_Modify_Item" onClick={() => setFilter(!filter)}><CiSearch color="white" size={20} /></div>
              <div className="DAT_Modify_Item" onClick={(e) => handleSetting(e)}><TbSettingsCode color="white" size={20} /></div>
            </div>

            {filter ? (
              <div className="DAT_Modify_Filter">
                <input type="text" placeholder={dataLang.formatMessage({ id: 'enterWarn' })} />
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
            <div className="DAT_WarnHeader_Filter">
              <input type="text" placeholder={dataLang.formatMessage({ id: 'enterWarn' })} />
              <CiSearch color="gray" size={20} />
            </div>
            <button className="DAT_WarnHeader_New"
              onClick={(e) => handleSetting(e)}
            >
              {dataLang.formatMessage({ id: 'setting' })}
            </button>
          </>
        )}
      </div>

      <div className="DAT_Warn">
        {/* <div className='DAT_Warn_Nav'>
                    <span id='all' style={{ color: tab.value === "all" ? color.cur : color.pre }} onClick={() => { tab.value = "all" }} >Tất cả</span>
                    <span id='open' style={{ color: tab.value === "open" ? color.cur : color.pre }} onClick={() => { tab.value = "open" }} >Đang lỗi</span>
                    <span id='closed' style={{ color: tab.value === "closed" ? color.cur : color.pre }} onClick={() => { tab.value = "closed" }} >Đã khắc phục</span>
                </div> */}
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
            {tabMobile.value ? (
              <div className="DAT_Toollist_Tab_Mobile_list">
                {listTab.map((item, i) => {
                  return (
                    <div
                      className="DAT_Toollist_Tab_Mobile_list_item"
                      // style={{ display: tabMobile.value ? "block" : "none" }}
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
        <div className="DAT_Warn_Content">
          {(() => {
            switch (tab.value) {
              case "all":
                return (
                  <DataTable
                    className="DAT_Table_Container"
                    columns={columnWarn}
                    data={dataWarn.value}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    fixedHeader={true}
                    noDataComponent={<Empty />}
                  />
                );
              case "open":
                return (
                  <DataTable
                    className="DAT_Table_Container"
                    columns={columnWarn}
                    data={open.value}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    fixedHeader={true}
                    noDataComponent={<Empty />}
                  />
                );
              case "closed":
                return (
                  <DataTable
                    className="DAT_Table_Container"
                    columns={columnWarn}
                    data={closed.value}
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

      <div className="DAT_WarnInfor"
        style={{
          height: warnState.value === "default" ? "0px" : "100vh",
          transition: "0.5s",
        }}
      >
        {(() => {
          switch (warnState.value) {
            case "setting":
              return <SettingWarn />;
            default:
              return <></>;
          }
        })()}
      </div>

      {deletewarnState.value ? (
        <div className="DAT_ReportPopup">
          <RaiseBox></RaiseBox>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Warn;
