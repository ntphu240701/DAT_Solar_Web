import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import './Project.scss';
import { raiseBoxState } from "./AddGateway";
import { useIntl } from "react-intl";

export default function RaiseBox(props) {
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

  // useEffect(() => {
  //   console.log(idReport.value);
  // },[idReport.value]);

  return (
    <div className="DAT_RaiseBox_Box">
      <div className="DAT_RaiseBox_Box_Head">
        <div className="DAT_RaiseBox_Box_Head_Left">
          <p>
            {dataLang.formatMessage({ id: 'notification' })}
          </p>
        </div>
        <div className="DAT_RaiseBox_Box_Head_Right">
          <div
            className="DAT_RaiseBox_Box_Head_Right_Icon"
            onClick={() => (raiseBoxState.value = false)}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>
      <div className="DAT_RaiseBox_Box_Body">
        <p>
          {props.state}
        </p>
      </div>
      <div className="DAT_RaiseBox_Box_Foot">
        <button
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => (raiseBoxState.value = false)}
        >
          {dataLang.formatMessage({ id: 'cancel' })}
        </button>
      </div>
    </div>
  );
}
