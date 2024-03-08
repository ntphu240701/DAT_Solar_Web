import React from "react";
import "./Role.scss";

import { popupState, roleData } from "./Role";
import { useIntl } from "react-intl";

import { IoClose } from "react-icons/io5";

export default function EditRole() {
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
    <div className="DAT_EditRole">
      <div className="DAT_EditRole_Head">
        <div className="DAT_EditRole_Head_Left">
          <p>{dataLang.formatMessage({ id: 'edit' })}</p>
        </div>

        <div className="DAT_EditRole_Head_Right">
          <div className="DAT_EditRole_Head_Right_Icon"
            onClick={() => (popupState.value = "default")}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>

      <div className="DAT_EditRole_Body">
        <div className="DAT_EditRole_Body_Row">
          {dataLang.formatMessage({ id: 'username' })}: &nbsp;
          {roleData.value.name_}
        </div>

        <div className="DAT_EditRole_Body_Row">
          <span style={{ color: "red" }}>* </span>
          <span style={{ color: "grey" }}>{dataLang.formatMessage({ id: 'rule' })}: &nbsp;</span>
          <select>
            <option>User</option>
            <option>Admin</option>
          </select>
        </div>
      </div>

      <div className="DAT_EditRole_Foot">
        <button
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => (popupState.value = "default")}
        >
          Hủy
        </button>
        <button style={{ backgroundColor: "#048FFF", color: "white" }}>
          Xác nhận
        </button>
      </div>
    </div>
  );
}
