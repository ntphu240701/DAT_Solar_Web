import React from "react";
import "./Report.scss";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { signal } from "@preact/signals-react";
import Create from "./Create";
import ReportEdit from "./ReportEdit";
import Popup from "./Popup";
import { useSelector } from "react-redux";

export const createState = signal(false);
export const editState = signal(false);
export const popupStateReport = signal(false);
export const idReport = signal(0);
export const list = signal([
  {
    id: 1,
    name: "Mẫu số 1",
    type: "Daily Data Report",
    create: "Trí Trần",
    date: "12/12/2022",
  },
  {
    id: 2,
    name: "Test",
    type: "Monthly Data Report",
    create: "Trí Trần",
    date: "01/30/2023",
  },
  {
    id: 3,
    name: "Tòa nhà DAT",
    type: "Daily Data Report",
    create: "Tiến Đỗ",
    date: "12/30/2023",
  },
  {
    id: 4,
    name: "Tòa nhà DAT",
    type: "Monthly Data Report",
    create: "Tiến Đỗ",
    date: "12/30/2023",
  },
  {
    id: 5,
    name: "Tòa nhà DAT",
    type: "Yearly Data Report",
    create: "Tiến Đỗ",
    date: "12/30/2023",
  },
  {
    id: 6,
    name: "Mẫu Demo",
    type: "Monthly Data Report",
    create: "Hiệp Solar",
    date: "01/17/2024",
  },
]);

export const ReportData = signal([
  {
    id: 1,
    name: "Mẫu số 1",
    type: "Daily Data Report",
    create: "Trí Trần",
    date: "12/12/2022",
    inf: {
      1: { lang: "report_1", status: true },
      2: { lang: "report_2", status: false },
      3: { lang: "report_3", status: false },
      4: { lang: "report_4", status: true },
      5: { lang: "report_5", status: true },
      6: { lang: "report_6", status: false },
      7: { lang: "report_7", status: false },
      8: { lang: "report_8", status: false },
      9: { lang: "report_9", status: true },
      10: { lang: "report_10", status: false },
      11: { lang: "report_11", status: false },
      12: { lang: "report_12", status: false },
    },
    subinf: {
      status: false,
      option: {
        1: { lang: "report_13", status: false },
        2: { lang: "report_14", status: false },
      },
    },
    deviceinfo: {
      status: true,
      option: {
        1: { lang: "report_15", status: true },
        2: { lang: "report_16", status: true },
        3: { lang: "report_17", status: false },
        4: { lang: "report_18", status: false },
        5: { lang: "report_19", status: false },
        6: { lang: "report_20", status: false },
        7: { lang: "report_21", status: false },
        8: { lang: "report_22", status: false },
        9: { lang: "report_23", status: false },
        10: { lang: "report_24", status: true },
        11: { lang: "report_25", status: false },
        12: { lang: "report_26", status: true },
      }
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
  },
  {
    id: 2,
    name: "Mẫu số 2",
    type: "Monthly Data Report",
    create: "Tai Ngo",
    date: "11/11/2023",
    inf: {
      1: { lang: "report_1", status: true },
      2: { lang: "report_2", status: false },
      3: { lang: "report_3", status: false },
      4: { lang: "report_4", status: true },
      5: { lang: "report_5", status: true },
      6: { lang: "report_6", status: false },
      7: { lang: "report_7", status: false },
      8: { lang: "report_8", status: false },
      9: { lang: "report_9", status: true },
      10: { lang: "report_10", status: false },
      11: { lang: "report_11", status: false },
      12: { lang: "report_12", status: false },
    },
    subinf: {
      status: false,
      option: {
        1: { lang: "report_13", status: false },
        2: { lang: "report_14", status: false },
      },
    },
    deviceinfo: {
      status: true,
      option: {
        1: { lang: "report_15", status: true },
        2: { lang: "report_16", status: true },
        3: { lang: "report_17", status: false },
        4: { lang: "report_18", status: false },
        5: { lang: "report_19", status: false },
        6: { lang: "report_20", status: false },
        7: { lang: "report_21", status: false },
        8: { lang: "report_22", status: false },
        9: { lang: "report_23", status: false },
        10: { lang: "report_24", status: true },
        11: { lang: "report_25", status: false },
        12: { lang: "report_26", status: true },
      }
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
  },
]);

function Report(props) {
  //DAT_MASTER
  const usr = useSelector((state) => state.admin.usr);

  const handleDeleteReport = (e) => {
    console.log(e.currentTarget.id);
    popupStateReport.value = true;
    idReport.value = e.currentTarget.id;
  };

  const handleEditReport = (e) => {
    editState.value = true;
    idReport.value = e.currentTarget.id;
    console.log(idReport.value);
  }

  return (
    <>
      <div className="DAT_ReportHeader">
        <div className="DAT_ReportHeader_Title">
          <HiOutlineDocumentReport color="gray" size={25} />{" "}
          <span>Báo cáo</span>
        </div>
        <button
          className="DAT_ReportHeader_New"
          onClick={() => (createState.value = true)}
        >
          Tạo mẫu báo cáo
        </button>
      </div>
      <div className="DAT_Report">
        <div className="DAT_Report_List">
          {ReportData.value.map((item, i) => {
            return (
              <div className="DAT_Report_List_Form" key={i}>
                <div className="DAT_Report_List_Form_Title">{item.name}</div>
                <div className="DAT_Report_List_Form_Type">
                  Loại: {item.type}
                </div>
                <div className="DAT_Report_List_Form_Create">
                  Tạo bởi: {item.create}
                </div>
                <div className="DAT_Report_List_Form_Date">
                  Ngày tạo: {item.date}
                </div>
                <div className="DAT_Report_List_Form_Custom">
                  <div
                    className="DAT_Report_List_Form_Custom_Edit"
                    // onClick={() => (editState.value = true)}
                    id={item.id}
                    onClick={(e) => handleEditReport(e)}
                  >
                    <CiEdit
                      style={{ cursor: "pointer" }}
                      color="gray"
                      size={20}
                      id={item.id}
                    />
                  </div>
                  {/* <div className="DAT_Report_List_Form_Custom_Report">
                    <HiOutlineDocumentReport color="green" size={20} />
                  </div> */}
                  <div
                    className="DAT_Report_List_Form_Custom_Remove"
                    id={item.id}
                    onClick={(e) => handleDeleteReport(e)}
                  >
                    <RiDeleteBin6Line
                      style={{ cursor: "pointer" }}
                      color="red"
                      size={20}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="DAT_ReportCreate"
        style={{
          height: createState.value ? "100vh" : "0px",
          transition: "0.5s",
        }}
      >
        {createState.value ? <Create /> : <></>}
      </div>

      <div
        className="DAT_ReportEdit"
        style={{
          height: editState.value ? "100vh" : "0px",
          transition: "0.5s",
        }}
      >
        {editState.value ? <ReportEdit /> : <></>}
      </div>

      {popupStateReport.value ? (
        <div className="DAT_ReportPopup">
          <Popup></Popup>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Report;
