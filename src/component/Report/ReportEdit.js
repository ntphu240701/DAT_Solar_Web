import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { editState, editData, ReportData } from "./Report";
import { signal } from "@preact/signals-react";
// import { CheckBox } from "../Device/Config";
import { isMobile } from "../Navigation/Navigation";

const reportname = signal();

export const CheckBox = (props) => {
  const handleShow = (e) => {
    let arr = props.tab.split("_");

    switch (arr[1]) {
      case "content":
        editData.value = {
          ...editData.value,
          [arr[0]]: {
            ...editData.value[arr[0]],
            [props.num]: {
              ...editData.value[arr[0]][props.num],
              status: e.target.checked,
            },
          },
        };
        break;
      case "option":
        editData.value = {
          ...editData.value,
          [arr[0]]: {
            ...editData.value[arr[0]],
            option: {
              ...editData.value[arr[0]].option,
              [props.num]: {
                ...editData.value[arr[0]].option[props.num],
                status: e.target.checked,
              },
            },
          },
        };
        break;
      default:
        editData.value = {
          ...editData.value,
          [arr[0]]: {
            ...editData.value[arr[0]],
            status: e.target.checked,
          },
        };
        break;
    }
    // console.log(editData.value);
  };

  useEffect(() => {
    document.getElementById(props.id).checked = props.status;
  }, []);

  return (
    <div
      className="DAT_EditReport_Body_Item_Option_Check_SingleCheck"
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

const DataReport = (props) => {
  const [nameReport, setNameReport] = useState(editData.value.name);
  useEffect(() => {
    reportname.value = editData.value.name;
  });

  // useEffect(() => {
  //   reportname.value = editData.value.name
  // },[editData.value.name]);

  const handlePushName = (e) => {
    setNameReport(e.currentTarget.value);
    reportname.value = e.currentTarget.value;
    // console.log(nameReport);
    console.log(e.currentTarget.value);
  };

  useEffect(() => {
    reportname.value = nameReport;
  });

  return (
    <div className="DAT_EditReport_Body_Item">
      <div className="DAT_EditReport_Body_Item_Data">
        <label style={{ fontWeight: "700", margin: "0" }}>
          Daily Data Report
        </label>
        <p style={{ color: "grey", margin: "0" }}>
          View the data of the selected plants in the selected daily range,
          including plant power generation, subsystem power generation, inverter
          power generation under plant, etc.
        </p>
        <div className="DAT_EditReport_Body_Item_Data_Name">
          <label>Tên báo cáo: </label>
          <input
            placeholder="Required Field"
            value={nameReport}
            required
            onChange={(e) => handlePushName(e)}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default function Create() {
  const [widthCheckBox, setWidwidthCheckBox] = React.useState("");

  const handleSaveData = () => {
    editState.value = false;
    const index = ReportData.value.findIndex((item) => {
      return item.id === editData.value.id;
    });
    ReportData.value[index] = editData.value;
    ReportData.value[index] = {
      ...ReportData.value[index],
      name: reportname.value,
    };
    // console.log(ReportData.value);
    console.log(reportname.value);
    // console.log(reportname.value);
  };

  const handleCloseCreate = () => {
    editState.value = false;
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
      <div className="DAT_Edit">
        <div className="DAT_EditReport_Header">
          <div className="DAT_EditReport_Header_Left">
            <p style={{ fontSize: "20px" }}>Chỉnh sửa</p>
          </div>
          <div className="DAT_EditReport_Header_Right">
            <div
              className="DAT_EditReport_Header_Right_Save"
              onClick={() => handleSaveData()}
            >
              <FaSave size={20} color="white" />
              <span>Lưu</span>
            </div>
            <div className="DAT_EditReport_Header_Right_Close">
              <RxCross2 size={20} color="white" onClick={handleCloseCreate} />
            </div>
          </div>
        </div>

        <div className="DAT_EditReport_Body">
          {/* <div className="DAT_EditReport_Body_Item">
            <div className="DAT_EditReport_Body_Item_Type">
              <h4>Loại báo cáo</h4>
              <select className="form-select form-select-sm mt-3">
                <option>Báo cáo dữ liệu hàng ngày</option>
                <option>Báo cáo dữ liệu hàng tháng</option>
                <option>Báo cáo dữ liệu hàng năm</option>
                <option>Báo cáo dữ liệu tổng</option>
              </select>
            </div>
          </div> */}

          <DataReport />

          <div className="DAT_EditReport_Body_Item">
            <div className="DAT_EditReport_Body_Item_Option">
              <label style={{ margin: "0" }}>Tùy chọn thông tin</label>
              <div className="DAT_EditReport_Body_Item_Option_Check">
                <p style={{ color: "grey" }}>Thông tin dự án</p>
                {Object.entries(editData.value.inf).map(([key, value]) => (
                  <CheckBox
                    key={key}
                    num={String(key)}
                    tab={"inf_content"}
                    status={editData.value.inf[key].status}
                    id={editData.value.inf[key].lang}
                    width={widthCheckBox}
                  />
                ))}
              </div>

              <div
                className="DAT_EditReport_Body_Item_Option_Check"
                style={{
                  border: editData.value.subinf.status
                    ? "1px solid grey"
                    : "0px",
                  paddingBottom: editData.value.subinf.status ? "20px" : "0",
                  transition: "0.5s",
                }}
              >
                <div className="DAT_EditReport_Body_Item_Option_Check_Head">
                  <CheckBox
                    tab={"subinf_tit"}
                    id={editData.value.subinf.lang}
                    status={editData.value.subinf.status}
                    width="fit-content"
                  />
                  {/* editData.value.subinf.option[key].lang */}
                </div>
                {editData.value.subinf.status ? (
                  <>
                    {Object.entries(editData.value.subinf.option).map(
                      ([key, value]) => (
                        <CheckBox
                          key={key}
                          num={String(key)}
                          tab={"subinf_option"}
                          status={editData.value.subinf.option[key].status}
                          id={editData.value.subinf.option[key].lang}
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
                className="DAT_EditReport_Body_Item_Option_Check"
                style={{
                  border: editData.value.deviceinfo.status
                    ? "1px solid grey"
                    : "0px",
                  paddingBottom: editData.value.deviceinfo.status
                    ? "20px"
                    : "0",
                  transition: "0.5s",
                }}
              >
                <div className="DAT_EditReport_Body_Item_Option_Check_Head">
                  <CheckBox
                    tab={"deviceinfo_tit"}
                    id={editData.value.deviceinfo.lang}
                    status={editData.value.deviceinfo.status}
                    width="fit-content"
                  />
                </div>
                {editData.value.deviceinfo.status ? (
                  <>
                    {Object.entries(editData.value.deviceinfo.option).map(
                      ([key, value]) => (
                        <CheckBox
                          key={key}
                          num={String(key)}
                          tab={"deviceinfo_option"}
                          status={editData.value.deviceinfo.option[key].status}
                          id={editData.value.deviceinfo.option[key].lang}
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
          <div className="DAT_EditReport_Body_Item">
            <div className="DAT_EditReport_Body_Item_Option">
              <label style={{ margin: "0" }}>Tùy chọn dữ liệu</label>
              <div className="DAT_EditReport_Body_Item_Option_Check">
                <p style={{ color: "grey" }}>Dữ liệu dự án</p>
                {Object.entries(editData.value.customdata).map(
                  ([key, value]) => (
                    <CheckBox
                      key={key}
                      num={String(key)}
                      tab={"customdata_content"}
                      status={editData.value.customdata[key].status}
                      id={editData.value.customdata[key].lang}
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
