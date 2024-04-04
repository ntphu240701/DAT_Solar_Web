import React, { useEffect, useRef, useState } from "react";
import "./Warn.scss";

import DataTable from "react-data-table-component";
import { signal } from "@preact/signals-react";
import { Empty, projectwarnfilter } from "../Project/Project";
import { isMobile, warnfilter } from "../Navigation/Navigation";
import RaiseBox from "./RaiseBox";
import { useIntl } from "react-intl";
import { ruleInfor } from "../../App";
import Info from "./Info";
import Filter from "../Project/Filter";
import moment from "moment-timezone";

import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { LuMailWarning } from "react-icons/lu";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp, IoMdMore } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { IoTrashOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";

export const tabLable = signal("");
export const open = signal([]);
export const closed = signal([]);
export const temp = signal([]);
export const idDel = signal();
export const idInfo = signal();
export const dataWarn = signal([]);

const warntab = signal("all");
const tabMobile = signal(false);

export default function Warn(props) {
  const dataLang = useIntl();
  const [filter, setFilter] = useState(false);
  const [datafilter, setDatafilter] = useState([]);
  const [boxid, setBoxid] = useState("");
  const [level, setLevel] = useState("");
  const [plant, setPlant] = useState("");
  const [device, setDevice] = useState("");
  const [display, setDisplay] = useState(false);
  const warn = useRef();
  const notice = useRef();
  const [infowarnState, setInfowarnState] = useState(false);
  const [delWarnState, setDelWarnState] = useState(false);
  const [cause, setCause] = useState([]);
  const [solution, setSolution] = useState([]);

  const listTab = [
    { id: "all", name: dataLang.formatMessage({ id: "total" }) },
    { id: "open", name: dataLang.formatMessage({ id: "unresolvewarn" }) },
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
      name: dataLang.formatMessage({ id: "errname" }),
      selector: (row) =>
        <div style={{ cursor: "pointer" }}
          onClick={(e) => handleInfo(e)}
          id={row.boxid + "_" + row.level + "_" + row.plant + "_" + row.device} // E_1_3_warn....
        >
          {dataLang.formatMessage({ id: row.boxid, defaultMessage: row.boxid })}
        </div>,
      sortable: true,
      width: "180px",
      style: {
        justifyContent: "left !important",
      },
    },
    {
      name: dataLang.formatMessage({ id: "project" }),
      selector: (row) => row.plant,
      sortable: true,
      minWidth: "250px",
      style: {
        justifyContent: "left !important",
      },
    },
    {
      name: dataLang.formatMessage({ id: "device" }),
      selector: (row) => row.device,
      sortable: true,
      width: "140px",
      style: {
        justifyContent: "left",
      },
    },
    // {
    //   name: "ID",
    //   selector: (row) => row.warnid,
    //   sortable: true,
    // },
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
      width: "120px",
    },
    {
      name: dataLang.formatMessage({ id: "openWarnTime" }),
      selector: (row) => row.opentime,
      sortable: true,
      width: "180px",
    },
    {
      name: dataLang.formatMessage({ id: "closeWarnTime" }),
      selector: (row) => row.closedtime,
      sortable: true,
      width: "180px",
    },
    {
      name: dataLang.formatMessage({ id: "edits" }),
      selector: (row) => (
        <>
          {ruleInfor.value.setting.warn.modify === true ||
            ruleInfor.value.setting.warn.remove === true ? (
            <div className="DAT_TableEdit">
              <span
                id={row.boxid + "_" + row.warnid + "_MORE"}
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
            id={row.boxid + "_" + row.warnid + "_Modify"}
            style={{ display: "none", marginTop: "3px", marginRight: "3px" }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
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

  const handleInfo = async (e) => {
    const temp = e.currentTarget.id.split("_");

    const id = `${temp[0]}_${temp[1]}_${temp[2]}`;

    let req = await callApi("post", `${host.DATA}/getWarninf`, {
      boxid: id,
    })
    console.log(req);
    if (req.status) {
      setInfowarnState(true);
      setBoxid(id)
      setLevel(temp[3])
      setPlant(temp[4])
      setDevice(temp[5])
      setCause(req.data.cause_)
      setSolution(req.data.solution_)
    } else {
      setInfowarnState(true);
      setBoxid(id)
      setLevel(temp[3])
      setPlant(temp[4])
      setDevice(temp[5])
      setCause([])
      setSolution([])
    }

  };

  const handleCloseInfo = () => {
    setInfowarnState(false);
  };

  const handleDeleteWarn = (e) => {
    setDelWarnState(true);
    idDel.value = e.currentTarget.id;
  };

  const handleCloseDel = () => {
    setDelWarnState(false);
  };

  const handleModify = (e, type) => {
    const id = e.currentTarget.id;
    var arr = id.split("_");
    const mod = document.getElementById(`${arr[0]}_${arr[1]}_${arr[2]}_${arr[3]}_Modify`);
    mod.style.display = type;
  };

  const handleTabMobile = (e) => {
    const id = e.currentTarget.id;
    warntab.value = id;
    const newLabel = listTab.find((item) => item.id == id);
    tabLable.value = newLabel.name;
  };

  // by Mr Loc
  const handleSearch = (e) => {
    const searchTerm = e.currentTarget.value.toLowerCase();

    if (searchTerm === "") {
      setDatafilter([...dataWarn.value]);
      warnfilter.value = {};
      projectwarnfilter.value = 0;
    } else {
      let temp = dataWarn.value.filter(
        (item) => item.plant.toLowerCase().includes(searchTerm) ||
          item.device.toLowerCase().includes(searchTerm) ||
          item.boxid.toLowerCase().includes(searchTerm) ||
          dataLang.formatMessage({ id: item.boxid, defaultMessage: item.boxid }).toLowerCase().includes(searchTerm)
      );
      setDatafilter([...temp]);
      console.log(temp);
      warnfilter.value = {};
    }
  };

  const handleResetFilter = () => {
    setDisplay(false);
    setDatafilter(dataWarn.value);
  };

  const handleCloseFilter = () => {
    setDisplay(false);
  }

  const handleWarnFilter = (opentime, closetime) => {
    //Bật tắt filter layout
    setDisplay(false)

    //Gọi biến thời gian nhập vào
    const openInput = moment(opentime).format("MM/DD/YYYY");
    const closeInput = moment(closetime).format("MM/DD/YYYY");

    console.log('openINPUT', openInput, closeInput);

    const newdb = dataWarn.value.filter((item) => {
      // Gọi biến thời gian trong dataWarn
      const openData = moment(item.opentime).format("MM/DD/YYYY");
      const closeData = moment(item.closetime).format("MM/DD/YYYY");

      // Nếu người dùng không chỉnh ngày thì vẫn chạy điều kiện checkbox
      if (openInput == "Invalid date" && closeInput == "Invalid date") {
        const levelChange = item.level == warn.value || item.level == notice.value
        return levelChange;
      }

      // Trường hợp 1 : Nhập ngày vào open time thì những ngày sau open time xuất hiện
      else if (closeInput === "Invalid date") {
        const timeChange = moment(openData).isSameOrAfter(openInput);
        return timeChange;
      }

      // Trường hợp 2 : Nhập ngày vào close time thì những trước sau close time xuất hiện
      else if (openInput === "Invalid date") {
        const timeChange = moment(openData).isSameOrBefore(closeInput);
        return timeChange;
      }

      // Nếu người dùng không check type warning thì vẫn chạy điều kiện thời gian
      else if (warn.value == null && notice.value == null) {
        const timeChange = (openData >= openInput && openData <= closeInput) || (closeData >= openInput && closeData < closeInput);
        return timeChange;
      }
      else {
        const levelChange = item.level == warn.value || item.level == notice.value
        const timeChange = (openData >= openInput && openData <= closeInput) || (closeData >= openInput && closeData < closeInput);
        return levelChange && timeChange;
      }
    });
    setDatafilter(newdb);
  };

  // by Mr Loc
  useEffect(() => {
    if (warnfilter.value.device) {
      let d = document.getElementById("warnsearch");
      d.value = warnfilter.value.device;
      let temp_ = dataWarn.value.filter(
        (item) => item.warnid == warnfilter.value.warnid
      );
      setDatafilter([...temp_]);
    } else if (projectwarnfilter.value !== 0) {
      let t = dataWarn.value.filter(
        (item) => item.plantid == projectwarnfilter.value
      );
      if (t[0]?.plant) {
        let d = document.getElementById("warnsearch");
        d.value = t[0].plant;
      }
      setDatafilter([...t]);
    } else {
    }
  }, [dataWarn.value, warnfilter.value, projectwarnfilter.value]);

  // by Mr Loc
  useEffect(() => {
    tabLable.value = listTab[0].name;
    if (
      warnfilter.value.device === undefined &&
      Number(projectwarnfilter.value) === 0
    ) {
      setDatafilter([...dataWarn.value]);
    }
    return () => {
      warntab.value = "all";
    }
  }, [dataWarn.value]);

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
              <div className="DAT_Modify_Item"
                onClick={() => setFilter(!filter)}
              >
                <CiSearch color="white" size={20} />
              </div>
            </div>

            {filter ? (
              <div className="DAT_Modify_Filter">
                <input
                  type="text"
                  placeholder={dataLang.formatMessage({ id: "enterWarn" })}
                />
                <div className="DAT_Modify_Filter_Close"
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
              <input
                type="text"
                placeholder={dataLang.formatMessage({ id: "enterWarn" })}
                id="warnsearch"
                autoComplete="off"
                onChange={(e) => handleSearch(e)}
              />
              <CiSearch color="gray" size={20} />
            </div>
            <div></div>
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
            switch (warntab.value) {
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
              return warntab.value === item.id ? (
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
                    onClick={(e) => (warntab.value = item.id)}
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
                  onClick={(e) => (warntab.value = item.id)}
                >
                  {item.name}
                </span>
              );
            })}

            <div className="DAT_Warn_Filter"
              onClick={(e) => setDisplay(!display)}
            >
              <FiFilter />
              <IoIosArrowUp
                style={{
                  transform: display ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "0.5s",
                }}
              />
            </div>
          </div>

          <div className="DAT_Warn_Content">
            {(() => {
              switch (warntab.value) {
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

            <Filter
              type="warn"
              display={display}
              warn={warn}
              notice={notice}
              handleFilter={handleWarnFilter}
              handleClose={handleCloseFilter}
              handleReset={handleResetFilter}
            />
          </div>
        </div>
      )}

      {delWarnState ? (
        <div className="DAT_ReportPopup">
          <RaiseBox handleClose={handleCloseDel} />
        </div>
      ) : (
        <></>
      )}

      {infowarnState ? (
        <Info
          boxid={boxid}
          level={level}
          plant={plant}
          device={device}
          cause={cause}
          solution={solution}
          handleClose={handleCloseInfo}
        />
      ) : (
        <></>
      )}
    </>
  );
}
