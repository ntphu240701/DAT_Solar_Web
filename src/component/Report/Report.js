import React, { useEffect } from "react";
import "./Report.scss";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { signal } from "@preact/signals-react";
import Create from "./Create";
import ReportEdit from "./ReportEdit";
import Popup from "./Popup";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { MdOutlinePostAdd } from "react-icons/md";

export const createState = signal(false);
export const editState = signal(false);
export const popupStateReport = signal(false);
export const editData = signal({});
export const idReport = signal(0);
export const lastID = signal(2);


export const ReportData = signal([
  {
    id: 1,
    name: "Mẫu số 1",
    type: "Daily Data Report",
    create: "Trí Trần",
    date: "12/12/2022",
    inf: {
      1: { id: "report_1", status: true },
      2: { id: "report_2", status: false },
      3: { id: "report_3", status: false },
      4: { id: "report_4", status: true },
    },
    subinf: {
      id: "report_tit_1",
      status: false,
      option: {
        1: { id: "report_13", status: true },
        2: { id: "report_14", status: false },
      },
    },
    deviceinfo: {
      id: "report_tit_2",
      status: false,
      option: {
        1: { id: "report_15", status: true },
        2: { id: "report_16", status: true },
        3: { id: "report_17", status: false },
        4: { id: "report_18", status: false },
      },
    },
    customdata: {
      1: { id: "report_27", status: false },
      2: { id: "report_28", status: false },
      3: { id: "report_29", status: false },
      4: { id: "report_30", status: false },
      5: { id: "report_31", status: false },
      6: { id: "report_32", status: false },
      7: { id: "report_33", status: false },
      8: { id: "report_34", status: false },
    },
  },
  {
    id: 2,
    name: "Mẫu số 2",
    type: "Monthly Data Report",
    create: "Tai Ngo",
    date: "11/11/2023",
    inf: {
      1: { id: "report_1", status: true },
      2: { id: "report_2", status: false },
      3: { id: "report_3", status: false },
      4: { id: "report_4", status: true },
    },
    subinf: {
      id: "report_tit_1",
      status: false,
      option: {
        1: { id: "report_13", status: false },
        2: { id: "report_14", status: false },
      },
    },
    deviceinfo: {
      id: "report_tit_2",
      status: true,
      option: {
        1: { id: "report_15", status: true },
        2: { id: "report_16", status: true },
        3: { id: "report_17", status: false },
        4: { id: "report_18", status: false },

      },
    },
    customdata: {
      1: { id: "report_27", status: false },
      2: { id: "report_28", status: false },
      3: { id: "report_29", status: false },
      4: { id: "report_30", status: false },
      5: { id: "report_31", status: false },
      6: { id: "report_32", status: false },
      7: { id: "report_33", status: false },
      8: { id: "report_34", status: false },
    },
  },
]);

function Report(props) {
  //DataLang
  const dataLang = useIntl();

  //DAT_MASTER
  const usr = useSelector((state) => state.admin.usr);

  const handleDeleteReport = (e) => {
    console.log(e.currentTarget.id);
    popupStateReport.value = true;
    idReport.value = e.currentTarget.id;
  };

  const handleEditReport = (e) => {
    editState.value = true;
    editData.value = ReportData.value.find(
      (item) => item.id == e.currentTarget.id
    ); //[{},{},{},{}] filrter [{}], find =>{}
  };

  return (
    <>
      <div className="DAT_ReportHeader">
        <div className="DAT_ReportHeader_Title">
          <HiOutlineDocumentReport color="gray" size={25} />{" "}
          <span>{dataLang.formatMessage({ id: 'report' })}</span>
        </div>
        <button
          className="DAT_ReportHeader_New"
          onClick={() => (createState.value = true)}
        >
          <span>
            <MdOutlinePostAdd color='white' size={20} />
            &nbsp;
            {dataLang.formatMessage({ id: 'createReport' })}
          </span>
        </button>
      </div>
      <div className="DAT_Report">
        <div className="DAT_Report_List">
          {ReportData.value.map((item, i) => {
            return (
              <div className="DAT_Report_List_Form" key={i}>
                <div className="DAT_Report_List_Form_Title">{item.name}</div>
                <div className="DAT_Report_List_Form_Type">
                  {dataLang.formatMessage({ id: 'type' })}: {item.type}
                </div>
                <div className="DAT_Report_List_Form_Create">
                  {dataLang.formatMessage({ id: 'createBy' })}: {item.create}
                </div>
                <div className="DAT_Report_List_Form_Date">
                  {dataLang.formatMessage({ id: 'createDate' })}: {item.date}
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
