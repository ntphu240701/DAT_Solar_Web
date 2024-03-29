import React from "react";
import "./GroupRole.scss";

import { group, groupID, groupUser } from "./GroupRole";
import { groupDelState } from "./GroupRole";
import { useIntl } from "react-intl";

import { IoClose } from "react-icons/io5";
import { alertDispatch } from "../Alert/Alert";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";

export default function ConfirmDeleteGroup() {
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
    groupDelState.value = false;
    // console.log(groupID.value);

    let d_ = group.value.find(
      (item) => item.id_ == groupID.value
    );
    // console.log(d_);

    let res = await callApi("post", host.DATA + "/removePartner", {
      code: d_.code_
    });

    console.log(res);
    if (res.status) {
      group.value = group.value.filter(
        (item) => item.id_ != groupID.value
      );
      groupUser.value = groupUser.value.filter(
        (item) => item.groupid_ != groupID.value
      );
      groupID.value = 0;
      alertDispatch(dataLang.formatMessage({ id: "alert_6" }));
    } else {
      alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
    }
  };

  return (
    <div className="DAT_DeleteGroupPopup_Box">
      <div className="DAT_DeleteGroupPopup_Box_Head">
        <div className="DAT_DeleteGroupPopup_Box_Head_Left">
          <p>{dataLang.formatMessage({ id: 'delGroupRole' })}</p>
        </div>

        <div className="DAT_DeleteGroupPopup_Box_Head_Right">
          <div className="DAT_DeleteGroupPopup_Box_Head_Right_Icon"
            onClick={() => (groupDelState.value = false)}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>

      <div className="DAT_DeleteGroupPopup_Box_Body">
        <p>
          {dataLang.formatMessage({ id: 'delgroupmess' })}
        </p>
      </div>

      <div className="DAT_DeleteGroupPopup_Box_Foot">
        <button
          style={{ backgroundColor: "rgba(11, 25, 103)", color: "white" }}
          onClick={() => {
            handleDelete();
          }}
        >
          {dataLang.formatMessage({ id: 'confirm' })}
        </button>
      </div>
    </div>
  );
}
