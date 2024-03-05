import React, { useEffect, useRef, useState } from "react";
import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { signal } from "@preact/signals-react";
// import { CheckBox } from "../Device/Config";
import { isMobile } from "../Navigation/Navigation";
import { createruleState, datarule } from "./Rule";
import { useIntl } from "react-intl";

export const lastruleID = signal(3);
const key = {
  edit: 'edits',
  delete: 'delete',
  create: 'createNew',
  status: 'status'
}

const newruledata = signal({
  ruleid: 1,
  name: "",
  setting: {
    alert: {
      lang: "notification",
      option: {
        1: { lang: key.edit, status: true },
        2: { lang: key.delete, status: true },
      },
    },
    device: {
      lang: "device",
      option: {
        1: { lang: key.edit, status: true },
        2: { lang: key.delete, status: true },
        3: { lang: key.create, status: true },
      },
    },
    partner: {
      lang: "partner",
      option: {
        1: { lang: key.edit, status: true },
      },
    },
    plant: {
      lang: "project",
      option: {
        1: { lang: key.edit, status: true },
        2: { lang: key.delete, status: true },
        3: { lang: key.create, status: true },
      },
    },
    report: {
      lang: "report",
      option: {
        1: { lang: key.edit, status: true },
        2: { lang: key.delete, status: true },
        3: { lang: key.create, status: true },
      },
    },
    rule: {
      lang: "rule",
      option: {
        1: { lang: key.edit, status: true },
        2: { lang: key.delete, status: true },
        3: { lang: key.create, status: true },
        4: { lang: key.status, status: true },
      },
    },
  },
});
export const ruletitle = signal([
  "alert",
  "device",
  "partner",
  "plant",
  "report",
  "rule",
]);
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
    let arr = props.html.split("_");
    console.log(arr[0]);
    switch (arr[0]) {
      case "alert":
        newruledata.value = {
          ...newruledata.value,
          setting: {
            ...newruledata.value.setting,
            alert: {
              ...newruledata.value.setting.alert,
              option: {
                ...newruledata.value.setting.alert.option,
                [props.num]: {
                  ...newruledata.value.setting.alert.option[props.num],
                  status: e.target.checked,
                },
              },
            },
          },
        };
        break;
      case "device":
        newruledata.value = {
          ...newruledata.value,
          setting: {
            ...newruledata.value.setting,
            device: {
              ...newruledata.value.setting.device,
              option: {
                ...newruledata.value.setting.device.option,
                [props.num]: {
                  ...newruledata.value.setting.device.option[props.num],
                  status: e.target.checked,
                },
              },
            },
          },
        };
        break;
      case "partner":
        newruledata.value = {
          ...newruledata.value,
          setting: {
            ...newruledata.value.setting,
            partner: {
              ...newruledata.value.setting.partner,
              option: {
                ...newruledata.value.setting.partner.option,
                [props.num]: {
                  ...newruledata.value.setting.partner.option[props.num],
                  status: e.target.checked,
                },
              },
            },
          },
        };
        break;
      case "plant":
        newruledata.value = {
          ...newruledata.value,
          setting: {
            ...newruledata.value.setting,
            plant: {
              ...newruledata.value.setting.plant,
              option: {
                ...newruledata.value.setting.plant.option,
                [props.num]: {
                  ...newruledata.value.setting.plant.option[props.num],
                  status: e.target.checked,
                },
              },
            },
          },
        };
        break;
      case "report":
        newruledata.value = {
          ...newruledata.value,
          setting: {
            ...newruledata.value.setting,
            report: {
              ...newruledata.value.setting.report,
              option: {
                ...newruledata.value.setting.report.option,
                [props.num]: {
                  ...newruledata.value.setting.report.option[props.num],
                  status: e.target.checked,
                },
              },
            },
          },
        };
        break;
      case "rule":
        newruledata.value = {
          ...newruledata.value,
          setting: {
            ...newruledata.value.setting,
            rule: {
              ...newruledata.value.setting.rule,
              option: {
                ...newruledata.value.setting.rule.option,
                [props.num]: {
                  ...newruledata.value.setting.rule.option[props.num],
                  status: e.target.checked,
                },
              },
            },
          },
        };
        break;
      default:
        break;
    }
    console.log(newruledata.value);
  };

  return (
    <div
      className="DAT_CreateRule_Body_Item_Option_Check_SingleCheck"
      style={{ width: props.width }}
    >
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id={props.html}
          onChange={(e) => {
            handleShow(e);
          }}
        ></input>
        <label
          style={{ cursor: "pointer", fontSize: "15px", color: "grey" }}
          className="form-check-label"
          htmlFor={props.html}
        >
          {props.id}
        </label>
      </div>
    </div>
  );
};

export default function CreateRule() {
  const dataLang = useIntl();
  const [widthCheckBox, setWidwidthCheckBox] = React.useState("");
  const rulenameRef = useRef("");

  const TypeReport = (props) => {
    const handerChangeReportName = (e) => {
      rulenameRef.current = e.target.value;
      //   console.log(rulenameRef.current);
    };

    return (
      <div className="DAT_CreateRule_Body_Item">
        <div className="DAT_CreateRule_Body_Item_Data">
          <div className="DAT_CreateRule_Body_Item_Data_Name">
            <label>{dataLang.formatMessage({ id: 'ruleName' })}: </label>
            <input
              type="text"
              placeholder="Required Field"
              required
              id="reportname"
              defaultValue={rulenameRef.current}
              onChange={(e) => handerChangeReportName(e)}
            ></input>
          </div>
        </div>
      </div>
    );
  };

  const handleCreate = () => {
    if (rulenameRef.current !== "") {
      lastruleID.value = lastruleID.value + 1;
      newruledata.value = {
        ...newruledata.value,
        name: rulenameRef.current,
        ruleid: lastruleID.value,
      };
      datarule.value = [...datarule.value, newruledata.value];
      console.log(datarule.value);
      createruleState.value = false;
    } else {
      alert("Please enter report name");
    }
    console.log()
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
      <div className="DAT_CreateRule">
        <div className="DAT_CreateRule_Header">
          <div className="DAT_CreateRule_Header_Left">
            <p style={{ fontSize: "20px" }}>{dataLang.formatMessage({ id: 'newRule' })}</p>
          </div>
          <div className="DAT_CreateRule_Header_Right">
            <div
              className="DAT_CreateRule_Header_Right_Save"
              onClick={() => handleCreate()}
            >
              <FaSave size={20} color="white" />
              <span>{dataLang.formatMessage({ id: 'save' })}</span>
            </div>
            <div className="DAT_CreateRule_Header_Right_Close">
              <RxCross2
                size={20}
                color="white"
                onClick={() => (createruleState.value = false)}
              />
            </div>
          </div>
        </div>

        <div className="DAT_CreateRule_Body">
          {/* <div className="DAT_CreateRule_Body_Item">
            <div className="DAT_CreateRule_Body_Item_Type">
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
          </div> */}

          <TypeReport />

          <div className="DAT_CreateRule_Body_Item">
            <div className="DAT_CreateRule_Body_Item_Option">
              <label style={{ margin: "0" }}>{dataLang.formatMessage({ id: 'ruleOptions' })}</label>

              {ruletitle.value.map((item, key) => (
                <div
                  key={key}
                  className="DAT_CreateRule_Body_Item_Option_Check"
                >
                  <p style={{ color: "grey" }}>
                    {dataLang.formatMessage({ id: newruledata.value.setting[item].lang })}
                  </p>
                  {Object.entries(newruledata.value.setting[item].option).map(
                    ([key, value]) => (
                      <CheckBox
                        key={key}
                        num={String(key)}
                        tab={item + "_content"}
                        status={value.status}
                        id={dataLang.formatMessage({ id: value.lang })}
                        html={item + "_" + key}
                        width={widthCheckBox}
                      />
                    )
                  )}
                </div>
              ))}
              {/* {Object.entries(newdata.value.customdata).map(
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
                )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
