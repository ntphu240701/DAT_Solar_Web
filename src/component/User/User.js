import React from "react";
import "./User.scss";
import { FaRegUser } from "react-icons/fa";
import Popup from "./Popup";
import { signal } from "@preact/signals-react";
import { partnerInfor, userInfor } from "../../App";
import { useSelector } from "react-redux";

export const popupStateUser = signal(false);
export const editType = signal();

function User(props) {
  const mail = useSelector((state) => state.admin.mail);

  React.useEffect(() => {
    console.log(popupStateUser.value);
  }, [popupStateUser.value]);

  return (
    <>
      <div className="DAT_UsrHeader">
        <div className="DAT_UsrHeader_Title">
          <FaRegUser color="gray" size={25} /> <span>Tài khoản</span>
        </div>
      </div>
      <div className="DAT_Usr">
        <div className="DAT_Usr_Item">
          <div className="DAT_Usr_Item_Content">
            <div className="DAT_Usr_Item_Content_Title">Ảnh đại diện</div>
            <img src={"/dat_icon/user_manager.png"} alt="" />
          </div>
          <span
            id="avatar"
            onClick={() => (
              (popupStateUser.value = true), (editType.value = "avatar")
            )}
          >
            Chỉnh sửa
          </span>
        </div>

        <div className="DAT_Usr_Item">
          <div className="DAT_Usr_Item_Content">
            <div className="DAT_Usr_Item_Content_Title">Tên</div>
            <div className="DAT_Usr_Item_Content_Label">{userInfor.value.name}</div>
          </div>
          <span onClick={() => (popupStateUser.value = true, editType.value = "name")}>Chỉnh sửa</span>
        </div>

        <div className="DAT_Usr_Item">
          <div className="DAT_Usr_Item_Content">
            <div className="DAT_Usr_Item_Content_Title">E-mail</div>
            <div className="DAT_Usr_Item_Content_Label">
              {mail}
            </div>
          </div>
          <span onClick={() => (popupStateUser.value = true, editType.value = "email")}>Chỉnh sửa</span>
        </div>

        <div className="DAT_Usr_Item">
          <div className="DAT_Usr_Item_Content">
            <div className="DAT_Usr_Item_Content_Title">Mật khẩu</div>
            <div className="DAT_Usr_Item_Content_Label">********</div>
          </div>
          <span onClick={() => (popupStateUser.value = true, editType.value = "password")}>Chỉnh sửa</span>
        </div>
      </div>
      {popupStateUser.value ? (
        <div className="DAT_EditPopup">
          <Popup></Popup>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default User;
