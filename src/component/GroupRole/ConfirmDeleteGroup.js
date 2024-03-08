import React from "react";
import "./GroupRole.scss";

import { dataUsers, group, groupID, groupUser } from "./GroupRole";
import { groupDelState } from "./GroupRole";
import { useIntl } from "react-intl";

import { IoClose } from "react-icons/io5";

export default function ConfirmDeleteGroup() {
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

  const handleDelete = (e) => {
    groupDelState.value = false;
    console.log(groupID.value);
    group.value = group.value.filter(
      (item) => item.id_ != groupID.value
    );
    groupUser.value = groupUser.value.filter(
      (item) => item.groupid_ != groupID.value
    );
    dataUsers.value = [];
    groupID.value = 0;
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
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => (groupDelState.value = false)}
        >
          {dataLang.formatMessage({ id: 'cancel' })}
        </button>
        <button
          style={{ backgroundColor: "#048FFF", color: "white" }}
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
