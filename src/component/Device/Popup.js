import React from "react";
import "./Device.scss"
import { loggerList, popupState } from "./Device";
import { IoClose } from "react-icons/io5";
import { hasIn } from "lodash";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { alertDispatch } from "../Alert/Alert";
import { useIntl } from "react-intl";

export default function Popup(props) {
  const dataLang = useIntl();

  const popup_state = {
    pre: { transform: "rotate(0deg)", transition: "0.5s", color: "black" },
    new: { transform: "rotate(90deg)", transition: "0.5s", color: "red" }
  }

  const handlePopup = (state) => {
    const popup = document.getElementById("Popup")
    popup.style.transform = popup_state[state].transform;
    popup.style.transition = popup_state[state].transition;
    popup.style.color = popup_state[state].color;
  }

  const handleDelete = (e) => {
    const dropLogger = async (plantid, sn) => {
      let d = await callApi('post', host.DATA + '/dropLogger', { plantid: plantid, sn: sn });
      if (d.status === true) {
        loggerList.value = loggerList.value.filter((item) => item.psn != props.sn);
        alertDispatch(dataLang.formatMessage({ id: "alert_25" }))
        popupState.value = false;
      } else if (d.number == 0) {
        alertDispatch(dataLang.formatMessage({ id: "alert_26" }))
      } else if (d.number == 1) {
        alertDispatch(dataLang.formatMessage({ id: "alert_27" }))
      }
    }
    dropLogger(props.plantid, props.sn);
  }

  return (
    <div className="DAT_Popup_Box">
      <div className="DAT_Popup_Box_Head">
        <div className="DAT_Popup_Box_Head_Left">
          <p>{dataLang.formatMessage({ id: 'delDevice' })}</p>
        </div>
        <div className="DAT_Popup_Box_Head_Right">
          <div
            className="DAT_Popup_Box_Head_Right_Icon"
            onClick={() => (popupState.value = false)}
            id="Popup"
            onMouseEnter={e => (handlePopup("new"))}
            onMouseLeave={e => (handlePopup("pre"))}
          >
            <IoClose size={20}  ></IoClose>
          </div>
        </div>
      </div>
      <div className="DAT_Popup_Box_Body">
        <p>
          <p>
            {dataLang.formatMessage({ id: 'delDevicemess' })}
          </p>
        </p>
      </div>
      <div className="DAT_Popup_Box_Foot">
        <button
          style={{
            border: "1px solid #505050", backgroundColor: "white",
            color: "#505050"
          }}
          onClick={() => (popupState.value = false)}
        >
          {dataLang.formatMessage({ id: 'cancel' })}
        </button>
        <button style={{ backgroundColor: "#048FFF", color: "white" }}
          onClick={(e) => handleDelete(e)}
        >
          {dataLang.formatMessage({ id: 'confirm' })}
        </button>
      </div>
    </div>
  );
}
