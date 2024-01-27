import React, { useEffect, useState } from "react";
// import { popupState } from "./Device";
import { IoClose } from "react-icons/io5";
import { popupStateUser, editType } from "./User";
import "./User.scss";
import { LiaEyeSolid } from "react-icons/lia";
import { LiaEyeSlashSolid } from "react-icons/lia";

export default function Popup() {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("eyeOff");

  const [oldpass, setOldpass] = useState(false);
  const [newpass, setNewpass] = useState(false);
  const [confirmpass, setConfirmpass] = useState(false);

  const handleToggle = () => {
    if (type === "password") {
      setIcon("eye");
      setType("text");
    } else {
      setIcon("eyeOff");
      setType("password");
    }
  };

  useEffect(() => {
    // console.log(ava);
    console.log(editType.value);
  });
  const [ava, setAva] = React.useState();
  const handleChooseAvatar = (e) => {
    setAva(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0].name);
  };

  return (
    <div className="DAT_Popup_Box">
      <div className="DAT_Popup_Box_Head">
        <div className="DAT_Popup_Box_Head_Left">
          <p>Chỉnh sửa</p>
        </div>
        <div className="DAT_Popup_Box_Head_Right">
          <div
            className="DAT_Popup_Box_Head_Right_Icon"
            onClick={() => (popupStateUser.value = false)}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>
      <div className="DAT_Popup_Box_Body">
        {(() => {
          switch (editType.value) {
            case "avatar":
              return (
                <div className="DAT_Popup_Box_Body_Avatar">
                  <div className="DAT_Popup_Box_Body_Avatar_Cover">
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
                <div className="DAT_Popup_Box_Body_Info">
                  <label>Nhập mật khẩu: </label>
                  <div className="DAT_Popup_Box_Body_Info_Input">
                    <input
                      type={oldpass === true ? "password" : "text"}
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
                  <label>Mật khẩu mới: </label>
                  <div className="DAT_Popup_Box_Body_Info_Input">
                    <input
                      type={newpass === true ? "password" : "text"}
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
                  {/* <div className="DAT_Popup_Box_Body_Info_Input">
                    <input
                      placeholder="New password"
                      type="password"
                      required
                    ></input>
                    <label>
                      <LiaEyeSolid size={20} />
                    </label>
                  </div> */}
                  <label>Xác nhận mật khẩu mới: </label>
                  <div className="DAT_Popup_Box_Body_Info_Input">
                    <input
                      type={confirmpass === true ? "password" : "text"}
                      name="confirmpassword"
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
                  {/* <div className="DAT_Popup_Box_Body_Info_Input">
                    <input
                      placeholder="Confirm new password"
                      type="password"
                      required
                    ></input>
                    <label>
                      <LiaEyeSolid size={20} />
                    </label>
                  </div> */}
                </div>
              );
            case "name":
              return (
                <div className="DAT_Popup_Box_Body_Info">
                  <input placeholder="Name"></input>
                </div>
              );
            case "email":
              return (
                <div className="DAT_Popup_Box_Body_Info">
                  <input placeholder="Email"></input>
                </div>
              );
          }
        })()}

        {/* {editType.value === "avatar" ? (
          <div className="DAT_Popup_Box_Body_Avatar">
            <div className="DAT_Popup_Box_Body_Avatar_Cover">
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
        ) : (
          <div className="DAT_Popup_Box_Body_Info">
            <input placeholder="Edit"></input>
          </div>
        )} */}

        {/* <div className="DAT_Popup_Box_Body_Info">
          <label>Nhập mật khẩu: </label>
          <div className="DAT_Popup_Box_Body_Info_Input">
            <input placeholder="Password" type="password" required></input>
            <label>
              <LiaEyeSolid size={20} />
            </label>
          </div>
          <label>Mật khẩu mới: </label>
          <div className="DAT_Popup_Box_Body_Info_Input">
            <input placeholder="New password" type="password" required></input>
            <label>
              <LiaEyeSolid size={20} />
            </label>
          </div>
          <label>Xác nhận mật khẩu mới: </label>
          <div className="DAT_Popup_Box_Body_Info_Input">
            <input
              placeholder="Confirm new password"
              type="password"
              required
            ></input>
            <label>
              <LiaEyeSolid size={20} />
            </label>
          </div>
        </div> */}
      </div>
      <div className="DAT_Popup_Box_Foot">
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
        <button style={{ backgroundColor: "#048FFF", color: "white" }}>
          Xác nhận
        </button>
      </div>
    </div>
  );
}
