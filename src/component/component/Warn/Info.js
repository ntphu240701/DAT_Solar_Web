import React from "react";
import "./Warn.scss";

import { dataWarn, infowarnState, warnState } from "./Warn";
import { useIntl } from "react-intl";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { sidebartab, sidebartabli } from "../Sidenar/Sidenar";
import { connectval, projtab } from "../Project/Project";

export default function Info(props) {
  const dataLang = useIntl();
  const navigate = useNavigate();

  const popup_state = {
    pre: { transform: "rotate(0deg)", transition: "0.5s", color: "black" },
    new: { transform: "rotate(90deg)", transition: "0.5s", color: "red" },
  };

  const handlePopup = (state) => {
    const popup = document.getElementById("Popup");
    popup.style.transform = popup_state[state].transform;
    popup.style.transition = popup_state[state].transition;
    popup.style.color = popup_state[state].color;
  };

  return (
    <div className="DAT_ReportPopup">
      <div className="DAT_PopupReportInfo_Box">
        <div className="DAT_PopupReportInfo_Box_Head">
          <div className="DAT_PopupReportInfo_Box_Head_Left">
            {props.level == 'warn' ? (
              <div className="DAT_PopupReportInfo_Box_Head_Left_TableWarning">
                <p>
                  {/* {dataLang.formatMessage({ id: "errdetai" })} */}
                  {dataLang.formatMessage({ id: props.boxid })}
                </p>
              </div>
            ) : (
              <div className="DAT_PopupReportInfo_Box_Head_Left_TableNotice">
                <p>
                  {/* {dataLang.formatMessage({ id: "errdetai" })} */}
                  {dataLang.formatMessage({ id: props.boxid })}
                </p>
              </div>
            )}
          </div>

          <div className="DAT_PopupReportInfo_Box_Head_Right">
            <div
              className="DAT_PopupReportInfo_Box_Head_Right_Icon"
              onClick={() => (infowarnState.value = false)}
              id="Popup"
              onMouseEnter={(e) => handlePopup("new")}
              onMouseLeave={(e) => handlePopup("pre")}
            >
              <IoClose size={20}></IoClose>
            </div>
          </div>
        </div>

        <div className="DAT_PopupReportInfo_Box_Body" style={{ fontSize: '16px' }}>
          <p>
            {dataLang.formatMessage({ id: "project" })} :
            &nbsp;
            <span
            // onClick={(e) => {
            // sidebartab.value = "Monitor";
            // sidebartabli.value = "/Project";
            // projtab.value = "online";
            // navigate("/Project");}}
            >
              {props.plant}
            </span>
          </p>


          <div className="DAT_PopupReportInfo_Box_Body_Item">
            <p>
              {dataLang.formatMessage({ id: "device" })} :
              &nbsp;
            </p>
            <span
            // onClick={(e) => {
            // connectval.value = e.currentTarget.id;
            // sidebartab.value = "Monitor";
            // sidebartabli.value = "/Device";
            // navigate("/Device");}}
            >
              {props.device}
            </span>
          </div>

          <p>
            {dataLang.formatMessage({ id: "cause" })} :
          </p>
          {props.level == 'warn' ? (
            <input placeholder="Quá nhiệt" disabled></input>) :
            (<input placeholder="Quá tải" disabled></input>)}

          <p>
            {dataLang.formatMessage({ id: "solution" })} :
          </p>
          <input placeholder="..." disabled></input>
        </div>
      </div>
    </div >
  );
}
