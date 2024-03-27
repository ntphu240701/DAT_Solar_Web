import React from "react";
import "./GroupRole.scss";

import { groupID, groupUser, popupState, userDel } from "./GroupRole";
import { useIntl } from "react-intl";
import { alertDispatch } from "../Alert/Alert";

import { IoClose } from "react-icons/io5";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";

export default function Popup() {
  const dataLang = useIntl();

  const popup_state = {
    pre: { transform: "rotate(0deg)", transition: "0.5s", color: "white" },
    new: { transform: "rotate(90deg)", transition: "0.5s", color: "white" },
  };

  const handlePopup = (state) => {
    const popup = document.getElementById("Popup");
    popup.style.transform = popup_state[state].transform;
    popup.style.transition = popup_state[state].transition;
    popup.style.color = popup_state[state].color;
  };

  const handleDelete = async (e) => {
    const i = groupUser.value.findIndex(
      (item) => item.id_ == parseInt(userDel.value)
    );

    let d = await callApi("post", host.DATA + "/removeUsrPartner", {
      mail: groupUser.value[i].mail_,
      partnerid: String(groupID.value),
    });
    console.log(d);
    if (d.status) {
      groupUser.value = groupUser.value.filter(
        (item) => item.id_ != parseInt(userDel.value)
      );
      // groupID.value = 0;
      popupState.value = false;
      alertDispatch(dataLang.formatMessage({ id: "alert_6" }));
    } else {
      alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
    }
  };

  return (
    <div className="DAT_Popup_Box">
      <div className="DAT_Popup_Box_Head">
        <div className="DAT_Popup_Box_Head_Left">
          <p>{dataLang.formatMessage({ id: "delAccount" })}</p>
        </div>

        <div className="DAT_Popup_Box_Head_Right">
          <div
            className="DAT_Popup_Box_Head_Right_Icon"
            onClick={() => (popupState.value = false)}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>

      <div className="DAT_Popup_Box_Body">
        <p>{dataLang.formatMessage({ id: "delaccountmess" })}</p>
      </div>

      <div className="DAT_Popup_Box_Foot">
        <button
          style={{ backgroundColor: "rgba(11, 25, 103)", color: "white" }}
          onClick={() => {
            handleDelete();
          }}
        >
          {dataLang.formatMessage({ id: "confirm" })}
        </button>
      </div>
    </div>
  );
}
