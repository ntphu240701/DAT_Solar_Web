import React, { useEffect } from "react";
import "./Role.scss";

import { Usr_, popupState } from "./Role";
import { useIntl } from "react-intl";

import { IoClose } from "react-icons/io5";
import { alertDispatch } from "../Alert/Alert";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";

export default function DeleteRole(props) {
  const dataLang = useIntl();

  const popup_state = {
    pre: { transform: "rotate(0deg)", transition: "0.5s", color: "white" },
    new: { transform: "rotate(90deg)", transition: "0.5s", color: "white" },
  };

  const handleDelete = async () => {
    const d = await callApi("post", host.DATA + "/removeUser", {
      usr: props.user,
    });
    if (d.status === true) {
      Usr_.value = Usr_.value.filter((d) => d.usr_ !== props.user)
      console.log(Usr_.value)
      popupState.value = "default";
      alertDispatch(dataLang.formatMessage({ id: 'alert_45' }))
    }
    else {
      // popupState.value = "default";
      alertDispatch(dataLang.formatMessage({ id: 'alert_46' }))
    }
  };

  const handlePopup = (state) => {
    const popup = document.getElementById("Popup");
    popup.style.transform = popup_state[state].transform;
    popup.style.transition = popup_state[state].transition;
    popup.style.color = popup_state[state].color;
  };

  return (
    <div className="DAT_DeleteRole">
      <div className="DAT_DeleteRole_Head">
        <div className="DAT_DeleteRole_Head_Left">
          <p>{dataLang.formatMessage({ id: "delAccount" })}</p>
        </div>
        <div className="DAT_DeleteRole_Head_Right">
          <div
            className="DAT_DeleteRole_Head_Right_Icon"
            onClick={() => (popupState.value = "default")}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={25}></IoClose>
          </div>
        </div>
      </div>

      <div className="DAT_DeleteRole_Body">
        <p>{dataLang.formatMessage({ id: "delaccountmess" })}</p>
      </div>

      <div className="DAT_DeleteRole_Foot">
        <button
          style={{ backgroundColor: "rgba(11, 25, 103)", color: "white" }}
          onClick={(e) => handleDelete(e)}
        >
          {dataLang.formatMessage({ id: "confirm" })}
        </button>
      </div>
    </div>
  );
}
