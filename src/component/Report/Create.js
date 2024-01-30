import React, { useEffect, useRef } from "react";
import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { createState, ReportData } from "./Report";
import { signal } from "@preact/signals-react";
// import { CheckBox } from "../Device/Config";
import { isMobile } from "../Navigation/Navigation";
import { list } from "./Report";
import { Checkbox } from "@mui/material";
import { useSelector } from "react-redux";

export const checkbox = signal({
  tthtc: { status: false },
  tttb: { status: false },
});
const show = signal({ id: "none", status: false });

export const CheckBox = (props) => {
  const handleShow = (e) => {
    const Check = { id: props.id, status: e.target.checked };
    show.value = Check;

    //checkbox.value[props.id].status = e.target.checked;
    //console.log(checkbox.value)
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
          {props.info}
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
              ref={reportnameRef}
              // onChange={(e) => {console.log(e.target.value)}}
            ></input>
          </div>
        </div>
      </div>
    );
  };

  // useEffect(() => {
  //   console.log(reportnameRef.current.value);
  // }, [reportnameRef]);

  const handleCreate = () => {
    const newDB = {
      id: ReportData.value[ReportData.value.length - 1].id + 1,
      name: reportnameRef.current.value,
      type: reportType,
      create: usr,
      date: "1/29/2024",
    };
    ReportData.value.push(newDB);
    console.log(ReportData.value);
    createState.value = false;
  };

  const handleDataType = (e) => {
    // // console.log(e.currentTarget.value)
    setReportType(e.currentTarget.value);
  };

  useEffect(() => {
    if (
      show.value.id !== "none" &&
      checkbox.value[show.value.id]?.status !== undefined
    ) {
      checkbox.value[show.value.id].status = show.value.status;
      show.value = { id: "none", status: false };
      console.log(checkbox.value);
    }
  }, [show.value]);

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
                {/* {ReportData.value.map((item, index) => (
                  // <Checkbox
                  //   info={ReportData.value[index].inf[index].lang}
                  //   id={ReportData.value[index].inf[index].lang}
                  // />
                ))} */}
                <CheckBox info="Tên dự án" id="tda" width={widthCheckBox} />
              </div>

              <div
                className="DAT_Create_Body_Item_Option_Check"
                style={{
                  border: checkbox.value.tthtc.status
                    ? "1px solid grey"
                    : "0px",
                  paddingBottom: checkbox.value["tthtc"].status ? "20px" : "0",
                  transition: "0.5s",
                }}
              >
                <div className="DAT_Create_Body_Item_Option_Check_Head">
                  <CheckBox
                    info="Thông tin hệ thống con"
                    id="tthtc"
                    width="fit-content"
                  />
                </div>
                {checkbox.value["tthtc"].status ? (
                  <>
                    <CheckBox info="Tên dự án" id="tda" width={widthCheckBox} />
                    <CheckBox
                      info="Khu vực hành chính"
                      id="kvhc"
                      width={widthCheckBox}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div
                className="DAT_Create_Body_Item_Option_Check"
                style={{
                  border: checkbox.value["tttb"].status
                    ? "1px solid grey"
                    : "0px",
                  paddingBottom: checkbox.value["tttb"].status ? "20px" : "0",
                  transition: "0.5s",
                }}
              >
                <div className="DAT_Create_Body_Item_Option_Check_Head">
                  <CheckBox
                    info="Thông tin thiết bị"
                    id="tttb"
                    width="fit-content"
                  />
                </div>
                {checkbox.value["tttb"].status ? (
                  <>
                    <CheckBox
                      info="Số sê-ri thiết bị"
                      id="ssrtb"
                      width={widthCheckBox}
                    />
                    <CheckBox
                      info="Tên thiết bị"
                      id="ttb"
                      width={widthCheckBox}
                    />
                    <CheckBox
                      info="Loại thiết bị"
                      id="ltb"
                      width={widthCheckBox}
                    />
                    <CheckBox
                      info="Công suất dây thực tế"
                      id="csdtt"
                      width={widthCheckBox}
                    />
                    <CheckBox
                      info="Số sê-ri logger"
                      id="ssrlg"
                      width={widthCheckBox}
                    />
                    <CheckBox
                      info="Vị trí đồng hồ"
                      id="vtdh"
                      width={widthCheckBox}
                    />
                    <CheckBox
                      info="Tỷ lệ dòng điện"
                      id="tldd"
                      width={widthCheckBox}
                    />
                    <CheckBox
                      info="Tỷ lệ điện áp"
                      id="tlda"
                      width={widthCheckBox}
                    />
                    <CheckBox
                      info="Phân loại dữ liệu đồng hồ"
                      id="pldldb"
                      width={widthCheckBox}
                    />
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
                <CheckBox info="Sản xuất" id="sx" width={widthCheckBox} />
                <CheckBox info="Tiêu thụ" id="tt" width={widthCheckBox} />
                <CheckBox info="Lưới đưa vào" id="ldv" width={widthCheckBox} />
                <CheckBox
                  info="Năng lượng mua vào"
                  id="nlmv"
                  width={widthCheckBox}
                />
                <CheckBox info="Phí" id="p" width={widthCheckBox} />
                <CheckBox info="Xả" id="x" width={widthCheckBox} />
                <CheckBox info="Bức xạ" id="bx" width={widthCheckBox} />
                <CheckBox info="kWh/kWp" id="kwhkwp" width={widthCheckBox} />
                <CheckBox
                  info="Sản xuất lý thuyết"
                  id="sylt"
                  width={widthCheckBox}
                />
                <CheckBox info="PR" id="pr" width={widthCheckBox} />
                <CheckBox
                  info="Sản xuất tự dùng"
                  id="sxtud"
                  width={widthCheckBox}
                />
                <CheckBox
                  info="Tỷ lệ tự dùng từ sản xuất"
                  id="tltdtsx"
                  width={widthCheckBox}
                />
                <CheckBox
                  info="Tỷ lệ từ sản xuất"
                  id="tltsx"
                  width={widthCheckBox}
                />
                <CheckBox
                  info="Sản xuất đưa vào lưới"
                  id="sxdvl"
                  width={widthCheckBox}
                />
                <CheckBox
                  info="Tỷ lệ cấp lưới từ năng lượng mua"
                  id="tldrvnlmv"
                  width={widthCheckBox}
                />
                <CheckBox
                  info="Tỷ lệ từ năng lượng mua vào"
                  id="tltlmv"
                  width={widthCheckBox}
                />
                <CheckBox info="Sản xuất phí" id="sxp" width={widthCheckBox} />
                <CheckBox
                  info="Sản xuất từ xả"
                  id="sxtx"
                  width={widthCheckBox}
                />
                <CheckBox info="Tỷ lệ từ xả" id="tltx" width={widthCheckBox} />
                <CheckBox
                  info="Thu nhập từ điện"
                  id="tntd"
                  width={widthCheckBox}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
