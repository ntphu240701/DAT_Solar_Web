import React, { useEffect, useRef, useState } from "react";
import "./Project.scss";

import { useIntl } from "react-intl";
import "./Project.scss";
import { signal } from "@preact/signals-react";
import { COLOR } from "../../App";

export const filterProject = signal([]);

export default function Filter(props) {
  const dataLang = useIntl();
  const [warnChecked, setWarnChecked] = useState(false);
  const [noticeChecked, setNoticeChecked] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const opentime = useRef();
  const closetime = useRef();
  const min = useRef(0);
  const max = useRef(0);
  const location = useRef("");
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const [deviceF, setDeviceF] = useState("all");

  const handleResetWarn = () => {
    setWarnChecked(false);
    setNoticeChecked(false);
    setStartDate("");
    setEndDate("");
  };

  const handleSelect = (e) => {
    if (document.getElementById("warn").checked) {
      props.warn.value = "warn";
      setWarnChecked(true);
      console.log(props.warn.value)
    } else {
      document.getElementById("warn").checked = false
      props.warn.value = {};
      setWarnChecked(false);
    }
    if (document.getElementById("notice").checked) {
      props.notice.value = "notice";
      console.log(props.notice.value)
      setNoticeChecked(true)
    } else {
      document.getElementById("notice").checked = false;
      props.notice.value = {};
      setNoticeChecked(false);
    }
  };

  // Thay đổi ngày tháng năm theo lựa chọn trong input placeholder
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const filterdevice = (e) => {
    console.log(e.target.id);
    setDeviceF(e.target.id);
  };

  useEffect(() => {
    console.log(props.data);
  }, [props.data])

  return (
    <>
      {(() => {
        switch (props.type) {
          case "project":
            return (
              <div className="DAT_Filter"
                style={{
                  height: props.display ? "567px" : "0px",
                  transition: "0.5s",
                }}
              >
                {props.display ? (
                  <div className="DAT_Filter_Dropdown"
                    style={{
                      height: props.display ? "200px" : "0px",
                      transition: "0.5s",
                    }}
                  >
                    <div className="DAT_Filter_Dropdown_Item">
                      <table className="DAT_Filter_Dropdown_Item_Table">
                        <tbody>
                          <tr className="DAT_Filter_Dropdown_Item_Table_Tr">
                            <th className="DAT_Filter_Dropdown_Item_Table_Tr_Th">
                              {dataLang.formatMessage({ id: "inCapacity" })}{" "}
                              (kWp):
                            </th>
                            <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                              <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                <input type="number" id="min" ref={min}
                                  defaultValue={props.data.min !== 0 ? props.data.min : ""}
                                />
                                ~
                                <input type="number" id="max" ref={max}
                                  defaultValue={props.data.max !== 10000 ? props.data.max : ""}
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr className="DAT_Filter_Dropdown_Item_Table_Tr">
                            <th className="DAT_Filter_Dropdown_Item_Table_Tr_Th">
                              {dataLang.formatMessage({ id: "location" })}:
                            </th>
                            <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                              <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                <input
                                  type="text"
                                  id="location"
                                  defaultValue={props.data.location !== "" ? props.data.location : ""}
                                  ref={location}
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="DAT_Filter_Dropdown_Bot">
                      <button
                        style={{ backgroundColor: "white", color: "black" }}
                        onClick={() => props.handleCancel()}
                      >
                        {dataLang.formatMessage({ id: "cancel" })}
                      </button>
                      <button
                        style={{ backgroundColor: "white", color: "black" }}
                        onClick={(e) => {
                          props.handleReset();
                        }}
                      >
                        {dataLang.formatMessage({ id: 'reset' })}
                      </button>
                      <button
                        style={{ backgroundColor: COLOR.value.PrimaryColor, color: "white" }}
                        onClick={() =>
                          props.handleClose(
                            min.current.value,
                            max.current.value,
                            location.current.value
                          )
                        }
                      >
                        {dataLang.formatMessage({ id: "confirm" })}
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          case "device":
            return (
              <div
                className="DAT_Filter"
                style={{
                  height: props.display ? "567px" : "0px",
                  transition: "0.5s",
                }}
              >
                {props.display ? (
                  <form
                    className="DAT_Filter_Dropdown"
                    // onSubmit={() =>

                    // }
                    style={{
                      height: props.display ? "140px" : "0px",
                      transition: "0.5s",
                    }}
                  >
                    <div className="DAT_Filter_Dropdown_Item">
                      <table className="DAT_Filter_Dropdown_Item_Table">
                        <tbody>
                          <tr className="DAT_Filter_Dropdown_Item_Table_Tr">
                            <th className="DAT_Filter_Dropdown_Item_Table_Tr_Th">
                              {dataLang.formatMessage({ id: "status" })}:
                            </th>
                            <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                              <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                <input
                                  id="online"
                                  type="radio"
                                  name="option"
                                  defaultChecked={
                                    deviceF === "online" ? true : false
                                  }
                                  onClick={(e) => filterdevice(e)}
                                />
                                <label
                                  htmlFor="online"
                                  style={{ cursor: "pointer" }}
                                >
                                  {dataLang.formatMessage({ id: "online" })}
                                </label>
                              </div>
                            </td>
                            <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                              <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                <input
                                  id="offline"
                                  type="radio"
                                  name="option"
                                  value={"offline"}
                                  defaultChecked={
                                    deviceF === "offline" ? true : false
                                  }
                                  onClick={(e) => filterdevice(e)}
                                />
                                <label
                                  htmlFor="offline"
                                  style={{ cursor: "pointer" }}
                                >
                                  {dataLang.formatMessage({ id: "offline" })}
                                </label>
                              </div>
                            </td>
                            <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                              <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                <input
                                  id="all"
                                  type="radio"
                                  name="option"
                                  value={"all"}
                                  defaultChecked={
                                    deviceF === "all" ? true : false
                                  }
                                  onClick={(e) => filterdevice(e)}
                                />
                                <label
                                  htmlFor="all"
                                  style={{ cursor: "pointer" }}
                                >
                                  {dataLang.formatMessage({ id: "all" })}
                                </label>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="DAT_Filter_Dropdown_Bot">
                      <button
                        style={{ backgroundColor: "white", color: "black" }}
                      >
                        {dataLang.formatMessage({ id: "cancel" })}
                      </button>
                      <button
                        style={{ backgroundColor: "white", color: "black" }}
                        onClick={(e) => {
                          // handleReset(e);
                          props.handleReset();
                        }}
                      >
                        {dataLang.formatMessage({ id: 'reset' })}
                      </button>
                      <button
                        style={{ backgroundColor: COLOR.value.PrimaryColor, color: "white" }}
                        onClick={(e) => props.handlefilterdevice(deviceF)}
                      >
                        {dataLang.formatMessage({ id: "confirm" })}
                      </button>
                    </div>
                  </form>
                ) : (
                  <></>
                )}
              </div>
            )
          case "warn":
            return (
              <div className="DAT_Filter"
                style={{
                  height: props.display ? "calc(100vh - 180px)" : "0px",
                  transition: "0.3s",
                }}
              >
                {props.display ? (
                  <form className="DAT_Filter_Dropdown"

                    style={{
                      height: props.display ? "180px" : "0px",
                      transition: "0.5s",
                    }}
                  >
                    <div className="DAT_Filter_Dropdown_Item">
                      <table className="DAT_Filter_Dropdown_Item_Table">
                        <tbody>
                          <tr className="DAT_Filter_Dropdown_Item_Table_Tr">
                            <th className="DAT_Filter_Dropdown_Item_Table_Tr_Th">
                              {dataLang.formatMessage({ id: "level" })}:
                            </th>
                            <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                              <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                <input id="warn" type="checkbox"
                                  checked={warnChecked}
                                  onChange={(e) => handleSelect(e)}
                                />
                                <label htmlFor="warn">
                                  <div className="DAT_TableWarning">
                                    {dataLang.formatMessage({ id: "warn" })}
                                  </div>
                                </label>
                              </div>
                            </td>
                            <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                              <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                <input id="notice" type="checkbox"
                                  checked={noticeChecked}
                                  onChange={(e) => handleSelect(e)}
                                />
                                <label htmlFor="notice">
                                  <div className="DAT_TableNotice">
                                    {dataLang.formatMessage({ id: "notice" })}
                                  </div>
                                </label>
                              </div>
                            </td>
                          </tr>
                        </tbody>

                        <tbody>
                          <tr className="DAT_Filter_Dropdown_Item_Table_Tr">
                            <th className="DAT_Filter_Dropdown_Item_Table_Tr_Th">
                              {dataLang.formatMessage({ id: "openWarnTime" })}:
                            </th>
                            <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                              <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                <input type="date"
                                  ref={opentime}
                                  value={startDate}
                                  onChange={handleStartDateChange}
                                  min={"2000-01-01"}
                                  max={endDate}
                                />
                                ~
                                <input type="date"
                                  ref={closetime}
                                  value={endDate}
                                  onChange={handleEndDateChange}
                                  min={startDate}
                                  max={todayString}
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="DAT_Filter_Dropdown_Bot">
                      <button
                        style={{ backgroundColor: "white", color: "black" }}
                        onClick={() => props.handleClose()}
                      >
                        {dataLang.formatMessage({ id: "cancel" })}
                      </button>
                      <button
                        style={{ backgroundColor: "white", color: "black" }}
                        onClick={(e) => {
                          handleResetWarn(e);
                          props.handleReset();
                        }}
                      >
                        {dataLang.formatMessage({ id: "reset" })}
                      </button>
                      <button
                        style={{ backgroundColor: COLOR.value.PrimaryColor, color: "white" }}
                        onClick={() => props.handleFilter(opentime.current.value, closetime.current.value)}
                      >
                        {dataLang.formatMessage({ id: 'confirm' })}
                      </button>
                    </div>
                  </form>
                ) : (
                  <></>
                )}
              </div>
            )
          default:
            return <></>
        }
      })()}
    </>
  );
}