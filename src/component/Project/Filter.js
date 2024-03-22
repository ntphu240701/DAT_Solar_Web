import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import "./Project.scss";

export default function Filter(props) {
  const dataLang = useIntl();
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

  const handleClose = (e) => {
    let min = document.getElementById("min");
    let max = document.getElementById("max");
    let location = document.getElementById("location");
    console.log(min.value, max.value, location.value);
  };

  const [deviceF, setDeviceF] = useState({
    online: true,
    offline: true,
  });

  useEffect(() => {
    console.log(deviceF);
  }, [deviceF]);

  const filterdevice = (e) => {
    const arr = e.currentTarget.id + "_" + e.currentTarget.checked;
    const t = arr.split("_");
    setDeviceF({
      ...deviceF,
      [t[0]]: t[1] === "true" ? true : false,
    });
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
                                  type="checkbox"
                                  defaultChecked={true}
                                  onChange={(e) => filterdevice(e)}
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
                                  type="checkbox"
                                  defaultChecked={true}
                                  onChange={(e) => filterdevice(e)}
                                />
                                <label
                                  htmlFor="offline"
                                  style={{ cursor: "pointer" }}
                                >
                                  {dataLang.formatMessage({ id: "offline" })}
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
                          handleReset(e);
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
