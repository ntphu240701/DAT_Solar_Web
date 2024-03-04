import React, { useEffect, useRef, useState } from "react";
// import { popupState } from "./Device";
import { IoClose } from "react-icons/io5";
import { popupStateUser, editType } from "./User";
import "./User.scss";
import { LiaEyeSolid } from "react-icons/lia";
import { LiaEyeSlashSolid } from "react-icons/lia";
import { alertDispatch } from "../Alert/Alert";
import Resizer from "react-image-file-resizer";
import { userInfor } from "../../App";
import { callApi } from "../Api/Api";
import { useSelector } from "react-redux";
import { host } from "../Lang/Contant";
import { useIntl } from "react-intl";


export default function Popup() {
  const dataLang = useIntl();
  const user = useSelector((state) => state.admin.usr);
  const [oldpass, setOldpass] = useState(true);
  const [newpass, setNewpass] = useState(true);
  const [ava, setAva] = useState(userInfor.value.avatar ? userInfor.value.avatar : "/dat_icon/user_manager.png");
  const [confirmpass, setConfirmpass] = useState(true);
  const oldpassRef = useRef();
  const newpassRef = useRef();
  const confirmpassRef = useRef();
  const renameRef = useRef(userInfor.value.name);
  const phoneRef = useRef(userInfor.value.phone);
  const addrRef = useRef(userInfor.value.addr);

  const popup_state = {
    pre: { transform: "rotate(0deg)", transition: "0.5s", color: "black" },
    new: { transform: "rotate(90deg)", transition: "0.5s", color: "red" },
  };

  const resizeFilAvatar = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        180,
        180,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });


  const handlePopup = (state) => {
    const popup = document.getElementById("Popup");
    popup.style.transform = popup_state[state].transform;
    popup.style.transition = popup_state[state].transition;
    popup.style.color = popup_state[state].color;
  };


  const handleChooseAvatar = async (e) => {

    var reader = new FileReader();
    console.log("old size", e.target.files[0].size)
    if (e.target.files[0].size > 50000) {
      const image = await resizeFilAvatar(e.target.files[0]);
      reader.readAsDataURL(image);
      reader.onload = () => {
        setAva(reader.result);
      }
    } else {
      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files[0].size)
      reader.onload = () => {
        setAva(reader.result);
      };
    }

  };

  const handleSave = async () => {
    switch (editType.value) {
      case "avatar":
        let d = await callApi("post", host.DATA + "/updateUser", { usr: user, type: "avatar", data: ava });
        if (d.status) {
          alertDispatch(dataLang.formatMessage({ id: "alert_6" }));
          userInfor.value = {
            ...userInfor.value,
            avatar: ava
          }
        } else {
          alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
        }
        popupStateUser.value = false;
        break;
      case "password":
        if (oldpassRef.current.value !== "" && newpassRef.current.value !== "" && confirmpassRef.current.value !== "") {
          if (newpassRef.current.value === confirmpassRef.current.value) {
            let d = await callApi("post", host.AUTH + "/ChangePassword", { usr: user, type: "password", oldpass: oldpassRef.current.value, newpass: confirmpassRef.current.value });
            console.log(d)
            if (d.status) {
              alertDispatch(dataLang.formatMessage({ id: "alert_1" }));
              popupStateUser.value = false;
            } else {
              if (d.number) {
                alertDispatch(dataLang.formatMessage({ id: "alert_5" }));
              } else if (d.number == 0) {
                alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
              }
            }
          } else {
            alertDispatch(dataLang.formatMessage({ id: "alert_18" }));
          }
        } else {
          alertDispatch(dataLang.formatMessage({ id: "alert_17" }));
        }
        break;
      case "name":
        if (renameRef.current.value !== "") {

          let d = await callApi("post", host.DATA + "/updateUser", { usr: user, type: "name", data: renameRef.current.value });
          if (d.status) {
            alertDispatch(dataLang.formatMessage({ id: "alert_6" }));
            userInfor.value = {
              ...userInfor.value,
              name: renameRef.current.value
            }

          } else {
            alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
          }
          popupStateUser.value = false;
        } else {
          alertDispatch(dataLang.formatMessage({ id: "alert_17" }));
        }
        break;
      case "phone":
        if (phoneRef.current.value !== "") {
          let d = await callApi("post", host.DATA + "/updateUser", { usr: user, type: "phone", data: phoneRef.current.value });
          if (d.status) {
            alertDispatch(dataLang.formatMessage({ id: "alert_6" }));
            userInfor.value = {
              ...userInfor.value,
              phone: phoneRef.current.value
            }

          } else {
            alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
          }
          popupStateUser.value = false;
        } else {
          alertDispatch(dataLang.formatMessage({ id: "alert_17" }));
        }
        break;
      case "addr":
        if (addrRef.current.value !== "") {
          let d = await callApi("post", host.DATA + "/updateUser", { usr: user, type: "addr", data: addrRef.current.value });
          if (d.status) {
            alertDispatch(dataLang.formatMessage({ id: "alert_6" }));
            userInfor.value = {
              ...userInfor.value,
              addr: addrRef.current.value
            }

          } else {
            alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
          }
          popupStateUser.value = false;
        } else {
          alertDispatch(dataLang.formatMessage({ id: "alert_17" }));
        }
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
                  <label>Mật khẩu hiện tại: </label>
                  <div className="DAT_PopupUser_Box_Body_Info_Input">
                    <div className="DAT_PopupUser_Box_Body_Info_Input_Pack">
                      <input
                        type={oldpass === true ? "password" : "text"}
                        ref={oldpassRef}

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
                  <input type="text" placeholder="Tên" defaultValue={userInfor.value.name} ref={renameRef}></input>
                </div>
              );
            case "phone":
              return (
                <div className="DAT_PopupUser_Box_Body_Info">
                  <input type="number" placeholder="Điện thoại" defaultValue={userInfor.value.phone} ref={phoneRef}></input>
                </div>
              );
            case "addr":
              return (
                <div className="DAT_PopupUser_Box_Body_Info">
                  <input type="text" placeholder="Địa chỉ" defaultValue={userInfor.value.addr} ref={addrRef}></input>
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
