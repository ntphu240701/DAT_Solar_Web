import React, { useEffect, useState } from "react";
import "./GroupRole.scss";
import { IoClose } from "react-icons/io5";
import { addState, groupID, groupUser } from "./GroupRole";
import DataTable from "react-data-table-component";
import { signal } from "@preact/signals-react";

const infouser = signal([
  {
    username: "tantaingo",
    name: "Tài Giỏi",
    email: "tantai.ngo@datgroup.com.vn",
  },
  {
    username: "loctp",
    name: "Tony Trần",
    email: "locdat_012@datgroup.com.vn",
  },
  {
    username: "tiendv",
    name: "Tiến Bịp DAT",
    email: "tiendat_012@datgroup.com.vn",
  },
  {
    username: "hiepga",
    name: "Hiệp sĩ đường phố",
    email: "hiepdat_012@datgroup.com.vn",
  },
  {
    username: "tridat",
    name: "Johnny Trí Nguyễn",
    email: "tridat_012@datgroup.com.vn",
  },
  {
    username: "tonydat_012",
    name: "Tony Trần",
    email: "tonydat_012@datgroup.com.vn",
  },
  {
    username: "phudat_012",
    name: "Phú Hộ",
    email: "phudat_012@datgroup.com.vn",
  },
  {
    username: "anhadat_012",
    name: "Anh A",
    email: "anhadat_012@datgroup.com.vn",
  },
  {
    username: "anhbdat_012",
    name: "Anh B",
    email: "anhadat_012@datgroup.com.vn",
  },
  {
    name: "Anh C",
    username: "anhcdat_012",
    email: "anhcdat_012@datgroup.com.vn",
  },
  {
    name: "Anh D",
    username: "anhddat_012",
    email: "anhddat_012@datgroup.com.vn",
  },
  {
    name: "Anh E",
    username: "anhedat_012",
    email: "anhddat_012@datgroup.com.vn",
  },
]);

export default function AddUsers() {
  const [username, setUsername] = useState("");
  const [addUserState, setAddUserState] = useState("none");

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
    // addState.value = false;
    const i = groupUser.value.findIndex(
      (item) => item.groupid === groupID.value
    );
    const check = groupUser.value[i].users.findIndex(
      (item) => item.username === username
    );
    if (check === -1) {
      const t = infouser.value.find((item) => item.username === username);
      if (t !== undefined) {
        groupUser.value[i] = {
          ...groupUser.value[i],
          users: [...groupUser.value[i].users, t],
        };
        setAddUserState("AddSuccess");
      } else {
        setAddUserState("UserNotFound");
      }
    } else {
      setAddUserState("UserAlreadyInGroup");
    }
  };
  const AddButton = () => {
    return (
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
    );
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
          {(() => {
            switch (addUserState) {
              case "AddSuccess":
                return <p>Người dùng được thêm thành công !</p>;
              case "UserNotFound":
                return <p>Không tìm thấy người dùng, vui lòng kiểm tra lại.</p>;
              case "UserAlreadyInGroup":
                return <p>Người dùng này đã tồn tại trong nhóm.</p>;
              default:
                return (
                  <>
                    <span>Tên tài khoản:</span>
                    <input
                      type="text"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </>
                );
            }
          })()}
        </div>
      </div>
      {(() => {
        switch (addUserState) {
          case "AddSuccess":
            return (
              <div className="DAT_AddUserPopup_Box_Foot">
                <button
                  onClick={() => (
                    (addState.value = false), setAddUserState("none")
                  )}
                  style={{
                    border: "1px solid #505050",
                    backgroundColor: "white",
                    color: "#505050",
                  }}
                >
                  Thoát
                </button>
              </div>
            );
          case "UserNotFound":
            return (
              <div className="DAT_AddUserPopup_Box_Foot">
                <button
                  onClick={() => (
                    (addState.value = false), setAddUserState("none")
                  )}
                  style={{
                    border: "1px solid #505050",
                    backgroundColor: "white",
                    color: "#505050",
                  }}
                >
                  Thoát
                </button>
              </div>
            );
          case "UserAlreadyInGroup":
            return (
              <div className="DAT_AddUserPopup_Box_Foot">
                <button
                  onClick={() => (
                    (addState.value = false), setAddUserState("none")
                  )}
                  style={{
                    border: "1px solid #505050",
                    backgroundColor: "white",
                    color: "#505050",
                  }}
                >
                  Thoát
                </button>
              </div>
            );
          default:
            return <AddButton />;
        }
      })()}
    </div>
  );
}
