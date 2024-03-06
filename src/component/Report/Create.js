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
import { useIntl } from "react-intl";

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
      default:
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
    const dataLang = useIntl()
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
                      {dataLang.formatMessage({ id: 'dailyReport' })}
                    </label>
                    <p style={{ color: "grey", margin: "0" }}>
                      {dataLang.formatMessage({ id: 'dailyReportDesc' })}
                    </p>
                  </>
                );
              case "Monthly Data Report":
                return (
                  <>
                    <label style={{ fontWeight: "700", margin: "0" }}>
                      {dataLang.formatMessage({ id: 'monthlyReport' })}
                    </label>
                    <p style={{ color: "grey", margin: "0" }}>
                      {dataLang.formatMessage({ id: 'monthlyReportDesc' })}
                    </p>
                  </>
                );
              case "Yearly Data Report":
                return (
                  <>
                    <label style={{ fontWeight: "700", margin: "0" }}>
                      {dataLang.formatMessage({ id: 'yearlyReport' })}
                    </label>
                    <p style={{ color: "grey", margin: "0" }}>
                      {dataLang.formatMessage({ id: 'yearlyReportDesc' })}
                    </p>
                  </>
                );
              case "Total Data Report":
                return (
                  <>
                    <label style={{ fontWeight: "700", margin: "0" }}>
                      {dataLang.formatMessage({ id: 'totalReport' })}
                    </label>
                    <p style={{ color: "grey", margin: "0" }}>
                      {dataLang.formatMessage({ id: 'yearlyReportDesc' })}
                    </p>
                  </>
                );
              default:
                return (
                  <>
                    <label style={{ fontWeight: "700", margin: "0" }}>
                      {dataLang.formatMessage({ id: 'dailyReport' })}
                    </label>
                    <p style={{ color: "grey", margin: "0" }}>
                      {dataLang.formatMessage({ id: 'dailyReportDesc' })}
                    </p>
                  </>
                );
            }
          })()}

          <div className="DAT_Create_Body_Item_Data_Name">
            <label>{dataLang.formatMessage({ id: 'reportName' })}: </label>
            <input
              type="text"
              placeholder={dataLang.formatMessage({ id: 'required' })}
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

  const dataLang = useIntl()
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
            <p style={{ fontSize: "20px" }}>{dataLang.formatMessage({ id: 'createReport' })}</p>
          </div>
          <div className="DAT_Create_Header_Right">
            <div
              className="DAT_Create_Header_Right_Save"
              onClick={() => handleCreate()}
            >
              <FaSave size={20} color="white" />
              <span>{dataLang.formatMessage({ id: 'save' })}</span>
            </div>
            <div className="DAT_Create_Header_Right_Close" onClick={() => (createState.value = false)}>
              <RxCross2
                size={20}
                color="white"
              />
            </div>
          </div>
        </div>

        <div className="DAT_Create_Body">
          <div className="DAT_Create_Body_Item">
            <div className="DAT_Create_Body_Item_Type">
              <h4>{dataLang.formatMessage({ id: 'reportType' })}</h4>
              <select
                className="form-select form-select-sm mt-3"
                defaultValue={"Daily Data Report"}
                onChange={(e) => {
                  handleDataType(e);
                }}
              >
                <option value={"Daily Data Report"}>
                  {dataLang.formatMessage({ id: 'dailyReport' })}
                </option>
                <option value={"Monthly Data Report"}>
                  {dataLang.formatMessage({ id: 'monthlyReport' })}
                </option>
                <option value={"Yearly Data Report"}>
                  {dataLang.formatMessage({ id: 'yearlyReport' })}
                </option>
                <option value={"Total Data Report"}>
                  {dataLang.formatMessage({ id: 'totalReport' })}
                </option>
              </select>
            </div>
          </div>

          <TypeReport />

          <div className="DAT_Create_Body_Item">
            <div className="DAT_Create_Body_Item_Option">
              <label style={{ margin: "0" }}>{dataLang.formatMessage({ id: 'customOpt' })}</label>
              <div className="DAT_Create_Body_Item_Option_Check">
                <p style={{ color: "grey" }}>{dataLang.formatMessage({ id: 'projectInfo' })}</p>
                {Object.entries(newdata.value.inf).map(([key, value]) => (
                  <CheckBox
                    key={key}
                    num={String(key)}
                    tab="inf_content"
                    status={newdata.value.inf[key].status}
                    id={newdata.value.inf[key].id}
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
                    id={newdata.value.subinf.id}
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
                          id={newdata.value.subinf.option[key].id}
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
                    id={newdata.value.deviceinfo.id}
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
                          id={newdata.value.deviceinfo.option[key].id}
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
              <label style={{ margin: "0" }}>{dataLang.formatMessage({ id: 'dataPref' })}</label>
              <div className="DAT_Create_Body_Item_Option_Check">
                <p style={{ color: "grey" }}>{dataLang.formatMessage({ id: 'projData' })}</p>
                {Object.entries(newdata.value.customdata).map(
                  ([key, value]) => (
                    <CheckBox
                      key={key}
                      num={String(key)}
                      tab="customdata_content"
                      status={newdata.value.customdata[key].status}
                      id={newdata.value.customdata[key].id}
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
