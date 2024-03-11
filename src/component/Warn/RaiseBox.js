import React from "react";
import "./Warn.scss";

import { dataWarn, deletewarnState, idDel } from "./Warn";
import { alertDispatch } from "../Alert/Alert";
import { useIntl } from "react-intl";

import { IoClose } from "react-icons/io5";
import { callApi } from "../Api/Api";
import { phuhosting } from "../../App";
import { host } from "../Lang/Contant";

export default function RaiseBox(props) {
  const dataLang = useIntl();

  const popup_state = {
    pre: { transform: "rotate(0deg)", transition: "0.5s", color: "black" },
    new: { transform: "rotate(90deg)", transition: "0.5s", color: "red" },
  };

  const handleDeleteReport = (e) => {
    deletewarnState.value = false;
    const arr = idDel.value.split("_"); //['E02', 'T0623A000162']
    console.log(arr);
    dataWarn.value = dataWarn.value.filter((item) => item.device != arr[1] || item.boxid != arr[0]);
    alertDispatch(dataLang.formatMessage({ id: "alert_28" }));
    console.log(dataWarn.value);
    const checkApi = async () => {
      const warn = await callApi("post", host.DATA + "/removeWarn", {
        sn: arr[1],
        boxid: arr[0],
      });
      console.log(warn);
    };
    checkApi();
  };

  const handlePopup = (state) => {
    const popup = document.getElementById("Popup");
    popup.style.transform = popup_state[state].transform;
    popup.style.transition = popup_state[state].transition;
    popup.style.color = popup_state[state].color;
  };

  // useEffect(() => {
  //   console.log(idReport.value);
  // },[idReport.value]);

  return (
    <div className="DAT_PopupReport_Box">
      <div className="DAT_PopupReport_Box_Head">
        <div className="DAT_PopupReport_Box_Head_Left">
          <p>{dataLang.formatMessage({ id: "delWarn" })}</p>
        </div>
        <div className="DAT_PopupReport_Box_Head_Right">
          <div
            className="DAT_PopupReport_Box_Head_Right_Icon"
            onClick={() => (deletewarnState.value = false)}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>

      <div className="DAT_PopupReport_Box_Body">
        <p>{dataLang.formatMessage({ id: "delreportmess" })}</p>
      </div>

      <div className="DAT_PopupReport_Box_Foot">
        <button
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => (deletewarnState.value = false)}
        >
          {dataLang.formatMessage({ id: "cancel" })}
        </button>
        <button
          style={{ backgroundColor: "#048FFF", color: "white" }}
          onClick={(e) => handleDeleteReport(e)}
        >
          {dataLang.formatMessage({ id: "confirm" })}
        </button>
      </div>
    </div>
  );
}
