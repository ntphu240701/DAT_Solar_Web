import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import "./Project.scss";

export default function Filter(props) {
    const dataLang = useIntl();
    const [warnChecked, setWarnChecked] = useState(false);
    const [noticeChecked, setNoticeChecked] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const opentime = useRef();
    const closetime = useRef();
    const min = useRef(0);
    const max = useRef(100);
    const location = useRef("hello");

  const handleReset = (e) => {
    let min = document.getElementById("min");
    let max = document.getElementById("max");
    let location = document.getElementById("location");
    min.value = "";
    max.value = "";
    location.value = "";
  };

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
        }
    };

    const handleDate = (e) => {
        const abc = e.currenttarget.value;
        setStartDate(abc);
        console.log(abc)
    };

  const handleClose = (e) => {
    let min = document.getElementById("min");
    let max = document.getElementById("max");
    let location = document.getElementById("location");
    console.log(min.value, max.value, location.value);
  };

  const [deviceF, setDeviceF] = useState("all");

  useEffect(() => {
    console.log(deviceF);
  }, [deviceF]);

  const filterdevice = (e) => {
    console.log(e.target.id);
    setDeviceF(e.target.id);
  };

  return (
    <>
      {(() => {
        switch (props.type) {
          case "project":
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
                    onSubmit={() =>
                      props.handleClose(
                        min.current.value,
                        max.current.value,
                        location.current.value
                      )
                    }
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
                              {dataLang.formatMessage({ id: "inCapacity" })}{" "}
                              (kWp):
                            </th>
                            <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                              <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                <input type="number" id="min" ref={min} />
                                ~
                                <input type="number" id="max" ref={max} />
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
                        onClick={(e) => {
                          handleReset(e);
                          props.handleReset();
                        }}
                      >
                        Reset
                      </button>
                      <button
                        style={{ backgroundColor: "#048FFF", color: "white" }}
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
                  </form>
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
                        onClick={(e) => {
                          // handleReset(e);
                          props.handleReset();
                        }}
                      >
                        Reset
                      </button>
                      <button
                        style={{ backgroundColor: "#048FFF", color: "white" }}
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
            );
          default:
            return <></>;
        }
      })()}
    </>
  );
}
