import React from "react";
import "./Warn.scss";

import { dataWarn, infowarnState, warnState } from "./Warn";
import { useIntl } from "react-intl";
import { IoClose } from "react-icons/io5";

export default function Info(props) {
  const dataLang = useIntl();

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
      <div className="DAT_PopupReport_Box">
        <div className="DAT_PopupReport_Box_Head">
          <div className="DAT_PopupReport_Box_Head_Left">
            <p>{dataLang.formatMessage({ id: "errdetai" })}</p>
          </div>
          <div className="DAT_PopupReport_Box_Head_Right">
            <div
              className="DAT_PopupReport_Box_Head_Right_Icon"
              onClick={() => (infowarnState.value = false)}
              id="Popup"
              onMouseEnter={(e) => handlePopup("new")}
              onMouseLeave={(e) => handlePopup("pre")}
            >
              <IoClose size={20}></IoClose>
            </div>
          </div>
        </div>

        <div className="DAT_PopupReport_Box_Body" style={{ fontSize: '16px' }}>
          <p>
            {dataLang.formatMessage({ id: "errcode" })} : {dataLang.formatMessage({ id: props.boxid })}
          </p>

          <p>
            {dataLang.formatMessage({ id: "cause" })} :
          </p>

          <p>
            {dataLang.formatMessage({ id: "solution" })} :
          </p>
        </div>
      </div>
    </div>
  );
}
