import React from "react";
import "./Role.scss";
import { popupState, roleState } from "./Role";
import { IoClose } from "react-icons/io5";

export default function Delete() {
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
    <div className="DAT_Delete">
      <div className="DAT_Delete_Head">
        <div className="DAT_Delete_Head_Left">
          <p>Xóa người dùng</p>
        </div>
        <div className="DAT_Delete_Head_Right">
          <div
            className="DAT_Delete_Head_Right_Icon"
            onClick={() => (popupState.value = "default")}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>
      <div className="DAT_Delete_Body">
        <p>
          Bạn có chắc chắn muốn xóa vĩnh viễn người dùng này không? Tất cả dữ
          liệu lịch sử của XXX sẽ bị mất.
        </p>
      </div>
      <div className="DAT_Delete_Foot">
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
