import React, { useEffect, useState } from "react";
import "./Warn.scss";

import DataTable from "react-data-table-component";
import { signal } from "@preact/signals-react";
import { Empty } from "../Project/Project";
import { isMobile, warnfilter } from "../Navigation/Navigation";
import SettingWarn from "./SettingWarn";
import RaiseBox from "./RaiseBox";
import { useIntl } from "react-intl";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { LuMailWarning } from "react-icons/lu";
import { IoIosArrowDown, IoIosArrowForward, IoMdMore } from "react-icons/io";
import { TbSettingsCode } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { RiMailSettingsLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { callApi } from "../Api/Api";
import { partnerInfor, phuhosting, ruleInfor, userInfor } from "../../App";
import { IoTrashOutline } from "react-icons/io5";

const tab = signal("all");
const tabMobile = signal(false);
export const tabLable = signal("");
export const open = signal([]);
export const closed = signal([]);
export const warnState = signal("default");
export const temp = signal([]);
export const deletewarnState = signal(false);
export const idDel = signal();

export const dataWarn = signal([]);
// const datafilter = signal([]);
export default function Warn(props) {
  const dataLang = useIntl();
  const [filter, setFilter] = useState(false);
  const [type, setType] = useState('project');
  const [datafilter, setDatafilter] = useState([]);

  const listTab = [
    { id: "all", name: dataLang.formatMessage({ id: "total" }) },
    { id: "open", name: dataLang.formatMessage({ id: "warn" }) },
    { id: "closed", name: dataLang.formatMessage({ id: "resolve" }) },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: dataLang.formatMessage({ id: "row" }),
    rangeSeparatorText: dataLang.formatMessage({ id: "to" }),
    selectAllRowsItem: true,
    selectAllRowsItemText: dataLang.formatMessage({ id: "showAll" }),
  };

  const columnWarn = [
    {
      name: dataLang.formatMessage({ id: "ordinalNumber" }),
      selector: (row, index) => index + 1,
      width: "80px",
    },
    {
      name: dataLang.formatMessage({ id: "project" }),
      selector: (row) => row.plant,
      sortable: true,
      minWidth: "250px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: "errcode" }),
      selector: (row) => dataLang.formatMessage({ id: row.boxid }),
      sortable: true,
      minWidth: "200px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: "device" }),
      selector: (row) => row.device,
      sortable: true,
      minWidth: "200px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "ID",
      selector: (row) => row.warnid,
      sortable: true,
    },
    {
      name: dataLang.formatMessage({ id: "level" }),
      selector: (row) => (
        <>
          {row.level === "warn" ? (
            <div className="DAT_TableWarning">
              {dataLang.formatMessage({ id: "warn" })}
            </div>
          ) : (
            <div className="DAT_TableNotice">
              {dataLang.formatMessage({ id: "notice" })}
            </div>
          )}
        </>
      ),
      sortable: true,
      minWidth: "120px",
    },
    {
      name: dataLang.formatMessage({ id: "openWarnTime" }),
      selector: (row) => row.opentime,
      sortable: true,
      width: "200px",
    },
    {
      name: dataLang.formatMessage({ id: "closeWarnTime" }),
      selector: (row) => row.closedtime,
      sortable: true,
      width: "200px",
    },
    {
      name: dataLang.formatMessage({ id: "setting" }),
      selector: (row) => (
        <>
          {ruleInfor.value.setting.warn.modify === true ||
            ruleInfor.value.setting.warn.remove === true ? (
            <div className="DAT_TableEdit">
              <span
                id={row.boxid + "" + row.warnid + "_MORE"}
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
            id={row.boxid + "" + row.warnid + "_Modify"}
            style={{
              display: "none",
              marginTop: "12px",
              width: "90px",
              marginRight: "4px",
            }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            {/* <div className="DAT_ModifyBox_Fix">Chỉnh sửa</div> */}
            {ruleInfor.value.setting.warn.remove === true ? (
              <div
                className="DAT_ModifyBox_Remove"
                id={row.boxid + "_" + row.device}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                onClick={(e) => handleDeleteWarn(e)}
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
      width: "100px",
    },
  ];

  const handleDeleteWarn = (e) => {
    deletewarnState.value = true;
    idDel.value = e.currentTarget.id;
    // console.log(idDel.value);
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

  const changeData = (e) => {
    if (e.target.value == ' ') {
      setDatafilter(dataWarn.value);
    } else {
      const t = e.target.value
      const df = dataWarn.value.filter((item) => {
        switch (type) {
          case 'code':
            return item.boxid.includes(t) || item.boxid.toLowerCase().includes(t);
          case 'device':
            return item.device.includes(t) || item.device.toLowerCase().includes(t);
          default:
            return item.plant.includes(t) || item.plant.toLowerCase().includes(t);
        }
      })
      setDatafilter(df)
    }
  };

  // by Mr Loc
  const handleSearch = (e) => {
    const searchTerm = e.currentTarget.value.toLowerCase();

    if (searchTerm === "") {
      setDatafilter([...dataWarn.value])
      warnfilter.value = {};
    } else {
      let temp = dataWarn.value.filter((item) => {
        const plantName = item.plant.toLowerCase();
        return plantName.includes(searchTerm);
      });
      console.log(temp);
      setDatafilter([...temp]);
      warnfilter.value = {};
    }
  };

  // by Mr Loc
  useEffect(() => {
    if (warnfilter.value.device) {
      console.log(warnfilter.value);
      let d = document.getElementById("warnsearch");
      d.value = warnfilter.value.device;
      let temp_ = dataWarn.value.filter(
        (item) => item.warnid == warnfilter.value.warnid
      );
      setDatafilter([...temp_]);
    }
  }, [dataWarn.value, warnfilter.value]);

  // by Mr Loc
  useEffect(() => {
    tabLable.value = listTab[0].name;
    if (warnfilter.value.device === undefined) {
      setDatafilter([...dataWarn.value]);
    }

  }, [dataWarn.value]);

  //by Mr  Tai

  // useEffect(() => {
  //   tabLable.value = listTab[0].name;
  //   setDatafilter([...dataWarn.value]);
  // }, [dataWarn.value]);

  // const handleSearch = (e) => {
  //   console.log(e.target.value);
  //   // console.log(warnfilter.value.warnid);
  //   // warnfilter.value.warnid = e.target.value;
  //   if(warnfilter.value.warnid){
  //     let temp = dataWarn.value.filter((item) => item.warnid == warnfilter.value.warnid);
  //     setDatafilter(temp);
  //     console.log(temp);
  //   }
  // };


  return (
    <>
      <div className="DAT_WarnHeader">
        <div className="DAT_WarnHeader_Title">
          <LuMailWarning color="gray" size={25} />
          <span>{dataLang.formatMessage({ id: "warn" })}</span>
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
              {ruleInfor.value.setting.warn.remove ? (
                <div
                  className="DAT_Modify_Add"
                  onClick={(e) => handleSetting(e)}
                >
                  <TbSettingsCode color="white" size={20} />
                </div>
              ) : (
                <div></div>
              )}
            </div>

            {filter ? (
              <div className="DAT_Modify_Filter">
                <input
                  type="text"
                  placeholder={dataLang.formatMessage({ id: "enterWarn" })}
                // onChange={(e) => handlefilterwarn(e)}
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
            <div className="DAT_WarnHeader_Filter">
              {/* <select onChange={((e) => changeFilter(e))} style={{ border: 'none', outline: 'none' }}>
                <option value={'project'}>{dataLang.formatMessage({ id: "project" })}</option>
                <option value={'code'}>{dataLang.formatMessage({ id: "errcode" })}</option>
                <option value={'device'}>{dataLang.formatMessage({ id: "device" })}</option>
              </select> */}
              <input
                type="text"
                placeholder={dataLang.formatMessage({ id: "enterWarn" })}
                id="warnsearch"
                // id={warnfilter.value.warnid}
                // value={warnfilter.value.warnid}
                onChange={(e) => handleSearch(e)}
              />
              <CiSearch color="gray" size={20} />
            </div>
            <div></div>
            {/* <button
              className="DAT_WarnHeader_New"
              onClick={(e) => handleSetting(e)}
            >
              <span>
                <RiMailSettingsLine color="white" size={20} />
                &nbsp;
                {dataLang.formatMessage({ id: "setting" })}
              </span>
            </button> */}
          </>
        )}
      </div>

      {isMobile.value ? (
        <div className="DAT_WarnMobile">
          <div className="DAT_Toollist_Tab_Mobile">
            <button
              className="DAT_Toollist_Tab_Mobile_content"
              onClick={() => (tabMobile.value = !tabMobile.value)}
            >
              <span> {tabLable.value}</span>
              {tabMobile.value ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </button>
            {tabMobile.value ? (
              <div className="DAT_Toollist_Tab_Mobile_list">
                {listTab.map((item, i) => {
                  return (
                    <div
                      className="DAT_Toollist_Tab_Mobile_list_item"
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
              case "all":
                return (
                  <>
                    {dataWarn.value?.map((item, i) => {
                      return (
                        <div key={i} className="DAT_WarnMobile_Content">
                          <div className="DAT_WarnMobile_Content_Top">
                            <div className="DAT_WarnMobile_Content_Top_Left">
                              <div className="DAT_WarnMobile_Content_Top_Left_Name">
                                {dataLang.formatMessage({ id: "errcode" })}:{" "}
                                {item.boxid}
                              </div>
                              <div className="DAT_WarnMobile_Content_Top_Left_Device">
                                {dataLang.formatMessage({ id: "device" })}:{" "}
                                {item.device}
                              </div>
                              <div className="DAT_WarnMobile_Content_Top_Left_Project">
                                {dataLang.formatMessage({ id: "project" })}:{" "}
                                {item.plant}
                              </div>
                              <div className="DAT_WarnMobile_Content_Top_Left_Level">
                                {item.level === "warn" ? (
                                  <div className="DAT_TableWarning">
                                    {dataLang.formatMessage({ id: "warn" })}
                                  </div>
                                ) : (
                                  <div className="DAT_TableNotice">
                                    {dataLang.formatMessage({ id: "notice" })}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="DAT_WarnMobile_Content_Top_Right">
                              <div
                                className="DAT_DeviceMobile_Content_Top_Right_Item"
                                id={item.boxid + "_" + item.device}
                                onClick={(e) => handleDeleteWarn(e)}
                              >
                                <MdDelete size={20} color="red" />
                              </div>
                            </div>
                          </div>

                          <div className="DAT_WarnMobile_Content_Bottom">
                            <div className="DAT_WarnMobile_Content_Bottom_Open">
                              {dataLang.formatMessage({ id: "openWarnTime" })}:{" "}
                              {item.opentime}
                            </div>
                            <div className="DAT_WarnMobile_Content_Bottom_Close">
                              {dataLang.formatMessage({ id: "closeWarnTime" })}:{" "}
                              {item.closedtime}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              case "open":
                return (
                  <>
                    {open.value?.map((item, i) => {
                      return (
                        <div key={i} className="DAT_WarnMobile_Content">
                          <div className="DAT_WarnMobile_Content_Top">
                            <div className="DAT_WarnMobile_Content_Top_Left">
                              <div className="DAT_WarnMobile_Content_Top_Left_Name">
                                {dataLang.formatMessage({ id: "errcode" })}:{" "}
                                {item.boxid}
                              </div>
                              <div className="DAT_WarnMobile_Content_Top_Left_Device">
                                {dataLang.formatMessage({ id: "device" })}:{" "}
                                {item.device}
                              </div>
                              <div className="DAT_WarnMobile_Content_Top_Left_Project">
                                {dataLang.formatMessage({ id: "project" })}:{" "}
                                {item.plant}
                              </div>
                              <div className="DAT_WarnMobile_Content_Top_Left_Level">
                                {item.level === "warn" ? (
                                  <div className="DAT_TableWarning">
                                    {dataLang.formatMessage({ id: "warn" })}
                                  </div>
                                ) : (
                                  <div className="DAT_TableNotice">
                                    {dataLang.formatMessage({ id: "notice" })}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="DAT_WarnMobile_Content_Top_Right">
                              <div
                                className="DAT_DeviceMobile_Content_Top_Right_Item"
                                id={item.boxid + "_" + item.device}
                                onClick={(e) => handleDeleteWarn(e)}
                              >
                                <MdDelete size={20} color="red" />
                              </div>
                            </div>
                          </div>

                          <div className="DAT_WarnMobile_Content_Bottom">
                            <div className="DAT_WarnMobile_Content_Bottom_Open">
                              {dataLang.formatMessage({ id: "openWarnTime" })}:{" "}
                              {item.opentime}
                            </div>
                            <div className="DAT_WarnMobile_Content_Bottom_Close">
                              {dataLang.formatMessage({ id: "closeWarnTime" })}:{" "}
                              {item.closedtime}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              case "closed":
                return (
                  <>
                    {closed.value?.map((item, i) => {
                      return (
                        <div key={i} className="DAT_WarnMobile_Content">
                          <div className="DAT_WarnMobile_Content_Top">
                            <div className="DAT_WarnMobile_Content_Top_Left">
                              <div className="DAT_WarnMobile_Content_Top_Left_Name">
                                {dataLang.formatMessage({ id: "errcode" })}:{" "}
                                {item.boxid}
                              </div>
                              <div className="DAT_WarnMobile_Content_Top_Left_Device">
                                {dataLang.formatMessage({ id: "device" })}:{" "}
                                {item.device}
                              </div>
                              <div className="DAT_WarnMobile_Content_Top_Left_Project">
                                {dataLang.formatMessage({ id: "project" })}:{" "}
                                {item.plant}
                              </div>
                              <div className="DAT_WarnMobile_Content_Top_Left_Level">
                                {item.level === "warn" ? (
                                  <div className="DAT_TableWarning">
                                    {dataLang.formatMessage({ id: "warn" })}
                                  </div>
                                ) : (
                                  <div className="DAT_TableNotice">
                                    {dataLang.formatMessage({ id: "notice" })}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="DAT_WarnMobile_Content_Top_Right">
                              <div
                                className="DAT_DeviceMobile_Content_Top_Right_Item"
                                id={item.boxid + "_" + item.device}
                                onClick={(e) => handleDeleteWarn(e)}
                              >
                                <MdDelete size={20} color="red" />
                              </div>
                            </div>
                          </div>

                          <div className="DAT_WarnMobile_Content_Bottom">
                            <div className="DAT_WarnMobile_Content_Bottom_Open">
                              {dataLang.formatMessage({ id: "openWarnTime" })}:{" "}
                              {item.opentime}
                            </div>
                            <div className="DAT_WarnMobile_Content_Bottom_Close">
                              {dataLang.formatMessage({ id: "closeWarnTime" })}:{" "}
                              {item.closedtime}
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
        <div className="DAT_Warn">
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

          <div className="DAT_Warn_Content">
            {(() => {
              switch (tab.value) {
                case "all":
                  return (
                    <DataTable
                      className="DAT_Table_Container"
                      columns={columnWarn}
                      data={datafilter}
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
      )}

      <div
        className="DAT_WarnInfor"
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
