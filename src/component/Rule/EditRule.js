import React, { useEffect, useRef, useState } from "react";
import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { signal } from "@preact/signals-react";
import { isMobile } from "../Navigation/Navigation";
import { createruleState, datarule } from "./Rule";

export const lastruleID = signal(3);

const newruledata = signal({
  ruleid: 1,
  name: "",
  setting: {
    alert: {
      lang: "Thông báo",
      option: {
        1: { lang: "Chỉnh sửa", status: false },
        2: { lang: "Xóa", status: false },
      },
    },
    device: {
      lang: "Thiết bị",
      option: {
        1: { lang: "Chỉnh sửa", status: false },
        2: { lang: "Xóa", status: false },
        3: { lang: "Tạo mới", status: false },
      },
    },
    partner: {
      lang: "Đối tác",
      option: {
        1: { lang: "Chỉnh sửa", status: false },
      },
    },
    plant: {
      lang: "Dự án",
      option: {
        1: { lang: "Chỉnh sửa", status: false },
        2: { lang: "Xóa", status: false },
        3: { lang: "Tạo mới", status: false },
      },
    },
    report: {
      lang: "Báo cáo",
      option: {
        1: { lang: "Chỉnh sửa", status: false },
        2: { lang: "Xóa", status: false },
        3: { lang: "Tạo mới", status: false },
      },
    },
    rule: {
      lang: "Phân quyền",
      option: {
        1: { lang: "Chỉnh sửa", status: false },
        2: { lang: "Xóa", status: false },
        3: { lang: "Thêm", status: false },
        4: { lang: "Trạng thái", status: false },
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

export default function Create() {
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
            <label>Tên phân quyền: </label>
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
            <p style={{ fontSize: "20px" }}>Tạo phân quyền mới</p>
          </div>
          <div className="DAT_CreateRule_Header_Right">
            <div
              className="DAT_CreateRule_Header_Right_Save"
              onClick={() => handleCreate()}
            >
              <FaSave size={20} color="white" />
              <span>Lưu</span>
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
              <label style={{ margin: "0" }}>Tùy chọn các quyền</label>
              {ruletitle.value.map((item, key) => (
                <div
                  key={key}
                  className="DAT_CreateRule_Body_Item_Option_Check"
                >
                  <p style={{ color: "grey" }}>
                    {newruledata.value.setting[item].lang}
                  </p>
                  {Object.entries(newruledata.value.setting[item].option).map(
                    ([key, value]) => (
                      <CheckBox
                        key={key}
                        num={String(key)}
                        tab={item + "_content"}
                        status={value.status}
                        id={value.lang}
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
