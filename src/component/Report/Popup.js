import React from "react";
import "./Report.scss";

import { popupStateReport } from "./Report";
import { idReport, ReportData } from "./Report";
import { useIntl } from "react-intl";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { userInfor } from "../../App";
import { alertDispatch } from "../Alert/Alert";

import { IoClose } from "react-icons/io5";

export default function Popup() {
  const dataLang = useIntl();

  const popup_state = {
    pre: { transform: "rotate(0deg)", transition: "0.5s", color: "white" },
    new: { transform: "rotate(90deg)", transition: "0.5s", color: "white" },
  };

  const handleDeleteReport = async (e) => {
    const removeReport = await callApi("post", host.DATA + "/removeReport", {
      partnerid: userInfor.value.partnerid,
      reportid: idReport.value,
    });
    if (removeReport.status) {
      popupStateReport.value = false;
      const newDB = ReportData.value.filter(
        (item) => item.id !== parseInt(idReport.value)
      );
      alertDispatch(dataLang.formatMessage({ id: "alert_42" }));
      console.log(newDB);
      ReportData.value = newDB;
    }
  };

  const handlePopup = (state) => {
    const popup = document.getElementById("Popup");
    popup.style.transform = popup_state[state].transform;
    popup.style.transition = popup_state[state].transition;
    popup.style.color = popup_state[state].color;
  };

  return (
    <div className="DAT_PopupReport_Box">
      <div className="DAT_PopupReport_Box_Head">
        <div className="DAT_PopupReport_Box_Head_Left">
          <p>{dataLang.formatMessage({ id: "delDevice" })}</p>
        </div>
        <div className="DAT_PopupReport_Box_Head_Right">
          <div
            className="DAT_PopupReport_Box_Head_Right_Icon"
            onClick={() => (popupStateReport.value = false)}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={25}></IoClose>
          </div>
        </div>
      </div>

      <div className="DAT_PopupReport_Box_Body">
        <p>{dataLang.formatMessage({ id: "delreportmess" })}</p>
      </div>

      <div className="DAT_PopupReport_Box_Foot">
        <button
          style={{ backgroundColor: "rgba(11, 25, 103)", color: "white" }}
          onClick={(e) => handleDeleteReport(e)}
        >
          {dataLang.formatMessage({ id: "confirm" })}
        </button>
      </div>
    </div>
  );
}
