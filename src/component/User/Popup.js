import React, { useEffect, useRef, useState } from "react";
// import { popupState } from "./Device";
import { IoClose } from "react-icons/io5";
import { popupStateUser, editType } from "./User";
import "./User.scss";
import { LiaEyeSolid } from "react-icons/lia";
import { LiaEyeSlashSolid } from "react-icons/lia";
import { alertDispatch } from "../Alert/Alert";

export default function Popup() {
  const [oldpass, setOldpass] = useState(true);
  const [newpass, setNewpass] = useState(true);
  const [ava, setAva] = useState("/dat_icon/user_manager.png");
  const [confirmpass, setConfirmpass] = useState(true);
  const oldpassRef = useRef();
  const newpassRef = useRef();
  const confirmpassRef = useRef();
  const renameRef = useRef();
  const newemailRef = useRef();

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

  useEffect(() => {
    console.log(editType.value);
  });

  const handleChooseAvatar = (e) => {
    setAva(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
    const data = new FileReader();
    data.addEventListener("load", () => {
      setAva(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };

  const handleSave = () => {
    switch (editType.value) {
      case "avatar":
        console.log(ava);
        popupStateUser.value = false;
        break;
      case "password":
        if (oldpassRef.current.value === "abc123") {
          if (newpassRef.current.value === confirmpassRef.current.value) {
            console.log(newpassRef.current.value, oldpassRef.current.value);
            popupStateUser.value = false;
            alertDispatch("Đổi mật khẩu thành công");
          } else {
            alertDispatch(
              "Mật khẩu mới không trùng nhau, vui lòng kiểm tra lại"
            );
          }
        } else {
          alertDispatch("Mật khẩu cũ không đúng!");
        }
        break;
      case "name":
        if (renameRef.current.value !== "") {
          console.log(renameRef.current.value);
          popupStateUser.value = false;
          alertDispatch("Đổi tên người dùng thành công");
        } else {
          alertDispatch("Vui lòng điền đầy đủ tên người dùng");
        }
        break;
      case "email":
        if (newemailRef.current.value !== "") {
          console.log(newemailRef.current.value);
          popupStateUser.value = false;
          alertDispatch("Đổi email thành công");
        } else {
          alertDispatch("Vui lòng điền đầy đủ email");
        } break;
    }
  };

  return (
    <div className="DAT_PopupUser_Box">
      <div className="DAT_PopupUser_Box_Head">
        <div className="DAT_PopupUser_Box_Head_Left">
          <p>Chỉnh sửa</p>
        </div>
        <div className="DAT_PopupUser_Box_Head_Right">
          <div
            className="DAT_PopupUser_Box_Head_Right_Icon"
            onClick={() => (popupStateUser.value = false)}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>
      <div className="DAT_PopupUser_Box_Body">
        {(() => {
          switch (editType.value) {
            case "avatar":
              return (
                <div className="DAT_PopupUser_Box_Body_Avatar">
                  <div className="DAT_PopupUser_Box_Body_Avatar_Cover">
                    <img src={ava}></img>
                  </div>
                  <input
                    type="file"
                    id="file"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => handleChooseAvatar(e)}
                  ></input>
                  <label htmlFor="file" style={{ cursor: "pointer" }}>
                    Chọn ảnh đại diện
                  </label>
                </div>
              );
            case "password":
              return (
                <div className="DAT_PopupUser_Box_Body_Info">
                  <label>Nhập mật khẩu: </label>
                  <div className="DAT_PopupUser_Box_Body_Info_Input">
                    <div className="DAT_PopupUser_Box_Body_Info_Input_Pack">
                      <input
                        type={oldpass === true ? "password" : "text"}
                        ref={oldpassRef}
                        placeholder="Password"
                      ></input>
                      <label onClick={() => setOldpass(!oldpass)}>
                        {oldpass === false ? (
                          <LiaEyeSolid size={20} />
                        ) : (
                          <LiaEyeSlashSolid size={20} />
                        )}
                      </label>
                    </div>
                  </div>
                  <label>Mật khẩu mới: </label>
                  <div className="DAT_PopupUser_Box_Body_Info_Input">
                    <div className="DAT_PopupUser_Box_Body_Info_Input_Pack">
                      <input
                        type={newpass === true ? "password" : "text"}
                        ref={newpassRef}
                        placeholder="New password"
                      ></input>
                      <label>
                        {newpass === false ? (
                          <LiaEyeSolid
                            size={20}
                            onClick={() => setNewpass(!newpass)}
                          />
                        ) : (
                          <LiaEyeSlashSolid
                            size={20}
                            onClick={() => setNewpass(!newpass)}
                          />
                        )}
                      </label>
                    </div>
                  </div>
                  <label>Xác nhận mật khẩu mới: </label>
                  <div className="DAT_PopupUser_Box_Body_Info_Input">
                    <div className="DAT_PopupUser_Box_Body_Info_Input_Pack">
                      <input
                        type={confirmpass === true ? "password" : "text"}
                        ref={confirmpassRef}
                        placeholder="Confirm password"
                      ></input>
                      <label onClick={() => setConfirmpass(!confirmpass)}>
                        {confirmpass === false ? (
                          <LiaEyeSolid size={20} />
                        ) : (
                          <LiaEyeSlashSolid size={20} />
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              );
            case "name":
              return (
                <div className="DAT_PopupUser_Box_Body_Info">
                  <input placeholder="Name" ref={renameRef}></input>
                </div>
              );
            case "email":
              return (
                <div className="DAT_PopupUser_Box_Body_Info">
                  <input placeholder="Email" ref={newemailRef}></input>
                </div>
              );
          }
        })()}
      </div>
      <div className="DAT_PopupUser_Box_Foot">
        <button
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => {
            popupStateUser.value = false;
          }}
        >
          Hủy
        </button>
        <button
          style={{ backgroundColor: "#048FFF", color: "white" }}
          onClick={() => handleSave()}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}
