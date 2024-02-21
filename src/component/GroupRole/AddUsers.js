import React, { useEffect, useState } from "react";
import "./GroupRole.scss";
import { IoClose } from "react-icons/io5";
import { addState, groupID, groupUser } from "./GroupRole";

export default function AddUsers() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [subinfo, setSubinfo] = useState("");

  //   useEffect(() => {
  //       console.log(name, username, subinfo);
  //   })

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

  const handleAddUser = () => {
    addState.value = false;
    console.log(groupID.value);
    groupUser.value.forEach((item) => {
      if (item.groupid === groupID.value) {
        item.users.push({ name: name, username: username, subinfo: subinfo });
      }
    });
    // console.log(groupUser.value);
  };

  return (
    <div className="DAT_AddUserPopup_Box">
      <div className="DAT_AddUserPopup_Box_Head">
        <div className="DAT_AddUserPopup_Box_Head_Left">
          <p>Thêm nhân viên</p>
        </div>
        <div className="DAT_AddUserPopup_Box_Head_Right">
          <div
            className="DAT_AddUserPopup_Box_Head_Right_Icon"
            onClick={() => (addState.value = false)}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>
      <div className="DAT_AddUserPopup_Box_Body">
        <div className="DAT_AddUserPopup_Box_Body_Input">
          <span>Tên người dùng:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="DAT_AddUserPopup_Box_Body_Input">
          <span>Tên tài khoản:</span>
          <input
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="DAT_AddUserPopup_Box_Body_Input">
          <span>Thông tin:</span>
          <input
            type="text"
            required
            onChange={(e) => setSubinfo(e.target.value)}
          />
        </div>
      </div>
      <div className="DAT_AddUserPopup_Box_Foot">
        <button
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
        >
          Hủy
        </button>
        <button
          style={{ backgroundColor: "#048FFF", color: "white" }}
          onClick={() => handleAddUser()}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}
