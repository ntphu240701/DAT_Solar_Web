import React, { useEffect, useState } from "react";
import "./GroupRole.scss";
import { IoClose } from "react-icons/io5";
import { addState, groupID, groupUser } from "./GroupRole";
import DataTable from "react-data-table-component";
import { signal } from "@preact/signals-react";

const infouser = signal([
  {
    name: "Tiến Bịp DAT",
    username: "tiendat_012",
    subinfo: "RnD Center",
  },
  {
    name: "Hiệp sĩ đường phố",
    username: "hiepdat_012",
    subinfo: "RnD Center",
  },
  {
    name: "Johnny Trí Nguyễn",
    username: "tridat_012",
    subinfo: "RnD Center",
  },
  {
    name: "Tony Trần",
    username: "tonydat_012",
    subinfo: "RnD Center",
  },
  {
    name: "Phó Lũ",
    username: "phudat_012",
    subinfo: "RnD Center",
  },
  {
    name: "Anh A",
    username: "anhadat_012",
    subinfo: "RnD Center",
  },
  {
    name: "Anh B",
    username: "anhbdat_012",
    subinfo: "RnD Center",
  },
  {
    name: "Anh C",
    username: "anhcdat_012",
    subinfo: "RnD Center",
  },
  {
    name: "Anh D",
    username: "anhddat_012",
    subinfo: "RnD Center",
  },
  {
    name: "Anh E",
    username: "anhedat_012",
    subinfo: "RnD Center",
  },
]);

export default function AddUsers() {
  const [username, setUsername] = useState("");
  const popup_state = {
    pre: { transform: "rotate(0deg)", transition: "0.5s", color: "black" },
    new: { transform: "rotate(90deg)", transition: "0.5s", color: "red" },
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Số hàng",
    rangeSeparatorText: "đến",
    selectAllRowsItem: true,
    selectAllRowsItemText: "tất cả",
  };

  const handlePopup = (state) => {
    const popup = document.getElementById("Popup");
    popup.style.transform = popup_state[state].transform;
    popup.style.transition = popup_state[state].transition;
    popup.style.color = popup_state[state].color;
  };

  const handleAddUser = () => {
    addState.value = false;
    const i = groupUser.value.findIndex(
      (item) => item.groupid === groupID.value
    );
    // console.log(i);
    const check = groupUser.value[i].users.findIndex(
      (item) => item.username === username
    );
    if (check === -1) {
      const t = infouser.value.find((item) => item.username === username);
      if(t !== undefined){
        // groupUser.value[i].users.push(t);
        groupUser.value[i] = {
          ...groupUser.value[i],
          users:[
            ...groupUser.value[i].users,
            t
          ]
        }
        console.log(groupUser.value);
      } else {
        alert("Không tim thay người dùng, vui lòng kiểm tra tên tài khoản.");
      }
    } else {
      alert("Người dùng đã ở trong nhóm.");
    }
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
          <span>Tên tài khoản:</span>
          <input
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
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
