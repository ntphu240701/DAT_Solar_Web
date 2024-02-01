import React, { useEffect, useRef, useState } from "react";
import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { createState, ReportData, lastID } from "./Report";
import { signal } from "@preact/signals-react";
// import { CheckBox } from "../Device/Config";
import { isMobile } from "../Navigation/Navigation";
import { list } from "./Report";
import { Checkbox } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment-timezone";

const newdata = signal({
  id: 1,
  name: "",
  type: "",
  create: "",
  date: "",
  inf: {
    1: { lang: "report_1", status: false },
    2: { lang: "report_2", status: false },
    3: { lang: "report_3", status: false },
    4: { lang: "report_4", status: false },
    5: { lang: "report_5", status: false },
    6: { lang: "report_6", status: false },
    7: { lang: "report_7", status: false },
    8: { lang: "report_8", status: false },
    9: { lang: "report_9", status: false },
    10: { lang: "report_10", status: false },
    11: { lang: "report_11", status: false },
    12: { lang: "report_12", status: false },
  },
  subinf: {
    lang: "report_tit_1",
    status: false,
    option: {
      1: { lang: "report_13", status: false },
      2: { lang: "report_14", status: false },
    },
  },
  deviceinfo: {
    lang: "report_tit_2",
    status: false,
    option: {
      1: { lang: "report_15", status: false },
      2: { lang: "report_16", status: false },
      3: { lang: "report_17", status: false },
      4: { lang: "report_18", status: false },
      5: { lang: "report_19", status: false },
      6: { lang: "report_20", status: false },
      7: { lang: "report_21", status: false },
      8: { lang: "report_22", status: false },
      9: { lang: "report_23", status: false },
      10: { lang: "report_24", status: false },
      11: { lang: "report_25", status: false },
      12: { lang: "report_26", status: false },
    },
  },
  customdata: {
    1: { lang: "report_27", status: false },
    2: { lang: "report_28", status: false },
    3: { lang: "report_29", status: false },
    4: { lang: "report_30", status: false },
    5: { lang: "report_31", status: false },
    6: { lang: "report_32", status: false },
    7: { lang: "report_33", status: false },
    8: { lang: "report_34", status: false },
    9: { lang: "report_35", status: false },
    10: { lang: "report_36", status: false },
    11: { lang: "report_37", status: false },
    12: { lang: "report_38", status: false },
    13: { lang: "report_39", status: false },
    14: { lang: "report_40", status: false },
    15: { lang: "report_41", status: false },
    16: { lang: "report_42", status: false },
    17: { lang: "report_43", status: false },
    18: { lang: "report_44", status: false },
    19: { lang: "report_45", status: false },
    20: { lang: "report_46", status: false },
  },
});

const temp = signal(newdata.value);

const show = signal({ id: "none", status: false });

export const CheckBox = (props) => {
  const handleShow = (e) => {
    let arr = props.tab.split("_");
    switch (arr[1]) {
      case "content":
        newdata.value = {
          ...newdata.value,
          [arr[0]]: {
            ...newdata.value[arr[0]],
            [props.num]: {
              ...newdata.value[arr[0]][props.num],
              status: e.target.checked,
            },
          },
        };
        break;
      case "option":
        newdata.value = {
          ...newdata.value,
          [arr[0]]: {
            ...newdata.value[arr[0]],
            option: {
              ...newdata.value[arr[0]].option,
              [props.num]: {
                ...newdata.value[arr[0]].option[props.num],
                status: e.target.checked,
              },
            },
          },
        };
        break;
      case "tit":
        newdata.value = {
          ...newdata.value,
          [arr[0]]: {
            ...newdata.value[arr[0]],
            status: e.target.checked,
          },
        };
        break;
    }
    // console.log(newdata.value);
  };

  return (
    <div
      className="DAT_Create_Body_Item_Option_Check_SingleCheck"
      style={{ width: props.width }}
    >
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id={props.id}
          onChange={(e) => {
            handleShow(e);
          }}
        ></input>
        <label
          style={{ cursor: "pointer", fontSize: "15px", color: "grey" }}
          className="form-check-label"
          htmlFor={props.id}
        >
          {props.id}
        </label>
      </div>
    </div>
  );
};

export default function Create() {
  const [widthCheckBox, setWidwidthCheckBox] = React.useState("");
  const [reportType, setReportType] = React.useState("Daily Report");
  const reportnameRef = useRef("");
  //DAT_MASTER
  const usr = useSelector((state) => state.admin.usr);

  const TypeReport = (props) => {
    const handerChangeReportName = (e) => {
      reportnameRef.current = e.target.value;
      //document.getElementById("reportname").value = e.target.value
    };

    return (
      <div className="DAT_Create_Body_Item">
        <div className="DAT_Create_Body_Item_Data">
          {(() => {
            switch (reportType) {
              case "Daily Data Report":
                return (
                  <>
                    <label style={{ fontWeight: "700", margin: "0" }}>
                      Daily Data Report
                    </label>
                    <p style={{ color: "grey", margin: "0" }}>
                      View the data of the selected plants in the selected daily
                      range, including plant power generation, subsystem power
                      generation, inverter power generation under plant, etc.
                    </p>
                  </>
                );
              case "Monthly Data Report":
                return (
                  <>
                    <label style={{ fontWeight: "700", margin: "0" }}>
                      Monthly Data Report
                    </label>
                    <p style={{ color: "grey", margin: "0" }}>
                      View the data of the selected plants in the selected
                      monthly range, including plant power generation, subsystem
                      power generation, inverter power generation under plant,
                      etc.
                    </p>
                  </>
                );
              case "Yearly Data Report":
                return (
                  <>
                    <label style={{ fontWeight: "700", margin: "0" }}>
                      Yearly Data Report
                    </label>
                    <p style={{ color: "grey", margin: "0" }}>
                      View the data of the selected plants in the selected
                      Yearly range, including plant power generation, subsystem
                      power generation, inverter power generation under plant,
                      etc.
                    </p>
                  </>
                );
              case "Total Data Report":
                return (
                  <>
                    <label style={{ fontWeight: "700", margin: "0" }}>
                      Yearly Data Report
                    </label>
                    <p style={{ color: "grey", margin: "0" }}>
                      View the data of the selected plants in the selected
                      Yearly range, including plant power generation, subsystem
                      power generation, inverter power generation under plant,
                      etc.
                    </p>
                  </>
                );
              default:
                return (
                  <>
                    <label style={{ fontWeight: "700", margin: "0" }}>
                      Daily Data Report
                    </label>
                    <p style={{ color: "grey", margin: "0" }}>
                      View the data of the selected plants in the selected daily
                      range, including plant power generation, subsystem power
                      generation, inverter power generation under plant, etc.
                    </p>
                  </>
                );
            }
          })()}

          <div className="DAT_Create_Body_Item_Data_Name">
            <label>Tên báo cáo: </label>
            <input
              type="text"
              placeholder="Required Field"
              required
              //ref={reportnameRef}
              id="reportname"
              defaultValue={reportnameRef.current}
              // value={newdata.value.name}
              onChange={(e) => handerChangeReportName(e)}
            ></input>
          </div>
        </div>
      </div>
    );
  };

  const handleCreate = () => {
    const today = new Date();
    // const day = today.getDate();
    // const month = today.getMonth() + 1;
    // const year = today.getFullYear();
    // const date = month + "/" + day + "/" + year;

    // console.log(moment(today).format("MM/DD/YYYY HH:mm:ss"));

    if (reportnameRef.current === "") {
      alert("Please enter report name");
    } else {
      lastID.value = lastID.value + 1;
      newdata.value = {
        ...newdata.value,
        name: reportnameRef.current,
        type: reportType,
        id: lastID.value,
        date: moment(today).format("MM/DD/YYYY HH:mm:ss"),
      };
      ReportData.value.push(newdata.value);

      //BAT TAT TRANG
      createState.value = false;

      console.log(newdata.value);
      newdata.value = temp.value;
    }
  };

  const handleDataType = (e) => {
    // // console.log(e.currentTarget.value)
    setReportType(e.currentTarget.value);
  };

  useEffect(() => {
    if (isMobile.value) {
      setWidwidthCheckBox("50%");
    } else {
      setWidwidthCheckBox("25%");
    }
    // console.log(isMobile.value);
  }, [isMobile.value]);

  return (
    <div>
      <div className="DAT_Create">
        <div className="DAT_Create_Header">
          <div className="DAT_Create_Header_Left">
            <p style={{ fontSize: "20px" }}>Tạo mẫu báo cáo</p>
          </div>
          <div className="DAT_Create_Header_Right">
            <div
              className="DAT_Create_Header_Right_Save"
              onClick={() => handleCreate()}
            >
              <FaSave size={20} color="white" />
              <span>Lưu</span>
            </div>
            <div className="DAT_Create_Header_Right_Close">
              <RxCross2
                size={20}
                color="white"
                onClick={() => (createState.value = false)}
              />
            </div>
          </div>
        </div>

        <div className="DAT_Create_Body">
          <div className="DAT_Create_Body_Item">
            <div className="DAT_Create_Body_Item_Type">
              <h4>Loại báo cáo</h4>
              <select
                className="form-select form-select-sm mt-3"
                defaultValue={"Daily Data Report"}
                onChange={(e) => {
                  handleDataType(e);
                }}
              >
                <option value={"Daily Data Report"}>
                  Báo cáo dữ liệu hàng ngày
                </option>
                <option value={"Monthly Data Report"}>
                  Báo cáo dữ liệu hàng tháng
                </option>
                <option value={"Yearly Data Report"}>
                  Báo cáo dữ liệu hàng năm
                </option>
                <option value={"Total Data Report"}>
                  Báo cáo dữ liệu tổng
                </option>
              </select>
            </div>
          </div>

          <TypeReport />

          <div className="DAT_Create_Body_Item">
            <div className="DAT_Create_Body_Item_Option">
              <label style={{ margin: "0" }}>Tùy chọn thông tin</label>
              <div className="DAT_Create_Body_Item_Option_Check">
                <p style={{ color: "grey" }}>Thông tin dự án</p>
                {Object.entries(newdata.value.inf).map(([key, value]) => (
                  <CheckBox
                    key={key}
                    num={String(key)}
                    tab="inf_content"
                    status={newdata.value.inf[key].status}
                    id={newdata.value.inf[key].lang}
                    width={widthCheckBox}
                  />
                ))}
              </div>

              <div
                className="DAT_Create_Body_Item_Option_Check"
                style={{
                  border: newdata.value.subinf.status
                    ? "1px solid grey"
                    : "0px",
                  paddingBottom: newdata.value.subinf.status ? "20px" : "0",
                  transition: "0.5s",
                }}
              >
                <div className="DAT_Create_Body_Item_Option_Check_Head">
                  <CheckBox
                    tab="subinf_tit"
                    id={newdata.value.subinf.lang}
                    status={newdata.value.subinf.status}
                    width="fit-content"
                  />
                </div>
                {newdata.value.subinf.status ? (
                  <>
                    {Object.entries(newdata.value.subinf.option).map(
                      ([key, value]) => (
                        <CheckBox
                          key={key}
                          num={String(key)}
                          tab="subinf_option"
                          status={newdata.value.subinf.option[key].status}
                          id={newdata.value.subinf.option[key].lang}
                          width={widthCheckBox}
                        />
                      )
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div
                className="DAT_Create_Body_Item_Option_Check"
                style={{
                  border: newdata.value.deviceinfo.status
                    ? "1px solid grey"
                    : "0px",
                  paddingBottom: newdata.value.deviceinfo.status ? "20px" : "0",
                  transition: "0.5s",
                }}
              >
                <div className="DAT_Create_Body_Item_Option_Check_Head">
                  <CheckBox
                    tab="deviceinfo_tit"
                    id={newdata.value.deviceinfo.lang}
                    status={newdata.value.deviceinfo.status}
                    width="fit-content"
                  />
                </div>
                {newdata.value.deviceinfo.status ? (
                  <>
                    {Object.entries(newdata.value.deviceinfo.option).map(
                      ([key, value]) => (
                        <CheckBox
                          key={key}
                          num={String(key)}
                          tab="deviceinfo_option"
                          status={newdata.value.deviceinfo.option[key].status}
                          id={newdata.value.deviceinfo.option[key].lang}
                          width={widthCheckBox}
                        />
                      )
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="DAT_Create_Body_Item">
            <div className="DAT_Create_Body_Item_Option">
              <label style={{ margin: "0" }}>Tùy chọn dữ liệu</label>
              <div className="DAT_Create_Body_Item_Option_Check">
                <p style={{ color: "grey" }}>Dữ liệu dự án</p>
                {Object.entries(newdata.value.customdata).map(
                  ([key, value]) => (
                    <CheckBox
                      key={key}
                      num={String(key)}
                      tab="customdata_content"
                      status={newdata.value.customdata[key].status}
                      id={newdata.value.customdata[key].lang}
                      width={widthCheckBox}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
