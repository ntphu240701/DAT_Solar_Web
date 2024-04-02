import React, { useEffect, useState } from "react";
import "./Report.scss";

import { signal } from "@preact/signals-react";
import Create from "./Create";
import ReportEdit from "./ReportEdit";
import Popup from "./Popup";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { ruleInfor, userInfor } from "../../App";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";

import { HiOutlineDocumentReport } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlinePostAdd } from "react-icons/md";

export const editData = signal({});
export const idReport = signal(0);
export const lastID = signal(2);
export const ReportData = signal([]);

export default function Report(props) {
  const dataLang = useIntl();
  const usr = useSelector((state) => state.admin.usr);
  const [createState, setCreateState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [popupState, setPopupState] = useState(false);

  const handleCloseCreate = () => {
    setCreateState(false);
  };

  const handleCloseEdit = () => {
    setEditState(false);
  };

  const handleCloseDel = () => {
    setPopupState(false);
  };

  const handleDeleteReport = (e) => {
    setPopupState(true);
    idReport.value = e.currentTarget.id;
  };

  const handleEditReport = (e) => {
    setEditState(true);
    editData.value = ReportData.value.find(
      (item) => item.id == e.currentTarget.id
    ); //[{},{},{},{}] filrter [{}], find =>{}
  };

  useEffect(() => {
    const getReport = async () => {
      const d = await callApi("post", host.DATA + "/getReport", {
        usr: usr,
        partnerid: userInfor.value.partnerid,
        type: userInfor.value.type,
      })
      if (d.status) {
        ReportData.value = d.data;
      }
    }
    getReport()
  }, [])

  return (
    <>
      <div className="DAT_ReportHeader">
        <div className="DAT_ReportHeader_Title">
          <HiOutlineDocumentReport color="gray" size={25} />
          <span>{dataLang.formatMessage({ id: "report" })}</span>
        </div>
        {ruleInfor.value.setting.report.add ? (
          <button
            className="DAT_ReportHeader_New"
            onClick={() => setCreateState(true)}
          >
            <span>
              <MdOutlinePostAdd color="white" size={20} />
              &nbsp;
              {dataLang.formatMessage({ id: "createReport" })}
            </span>
          </button>
        ) : (
          <div></div>
        )}
      </div>

      <div className="DAT_Report">
        <div className="DAT_Report_List">
          {ReportData.value.map((item, i) => {
            return (
              <div className="DAT_Report_List_Form" key={i}>
                <div className="DAT_Report_List_Form_Title">{item.name}</div>
                <div className="DAT_Report_List_Form_Type">
                  {dataLang.formatMessage({ id: "type" })}: {dataLang.formatMessage({ id: item.type })}
                </div>
                <div className="DAT_Report_List_Form_Create">
                  {dataLang.formatMessage({ id: "createBy" })}: {item.createby}
                </div>
                <div className="DAT_Report_List_Form_Date">
                  {dataLang.formatMessage({ id: 'createdate' })}: {item.date}
                </div>
                <div className="DAT_Report_List_Form_Custom">
                  {ruleInfor.value.setting.report.modify ? (
                    <div
                      className="DAT_Report_List_Form_Custom_Edit"
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
                  ) : (
                    <div></div>
                  )}
                  {ruleInfor.value.setting.report.modify ? (
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
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="DAT_ReportCreate"
        style={{
          height: createState ? "100vh" : "0px",
          transition: "0.5s",
        }}
      >
        {createState ? <Create handleClose={handleCloseCreate} /> : <></>}
      </div>

      <div className="DAT_ReportEdit"
        style={{
          height: editState ? "100vh" : "0px",
          transition: "0.5s",
        }}
      >
        {editState ? <ReportEdit handleClose={handleCloseEdit} /> : <></>}
      </div>

      {popupState ? (
        <div className="DAT_ReportPopup">
          <Popup handleClose={handleCloseDel} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
