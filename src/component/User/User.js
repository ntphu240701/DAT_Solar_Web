import React from "react";
import "./User.scss";
import { FaRegUser } from "react-icons/fa";
import Popup from "./Popup";
import { signal } from "@preact/signals-react";
import { partnerInfor, userInfor } from "../../App";


export const popupStateUser = signal(false);
export const editType = signal();

function User(props) {


     

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
            <img src={userInfor.value.avatar ?  userInfor.value.avatar : "/dat_icon/user_manager.png"} alt="" />
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
            <div className="DAT_Usr_Item_Content_Title">Số điện thoại</div>
            <div className="DAT_Usr_Item_Content_Label">
              {userInfor.value.phone}
            </div>
          </div>
          <span onClick={() => (popupStateUser.value = true, editType.value = "phone")}>Chỉnh sửa</span>
        </div>
        <div className="DAT_Usr_Item">
          <div className="DAT_Usr_Item_Content">
            <div className="DAT_Usr_Item_Content_Title">Địa chỉ</div>
            <div className="DAT_Usr_Item_Content_Label">
              {userInfor.value.addr}
            </div>
          </div>
          <span onClick={() => (popupStateUser.value = true, editType.value = "addr")}>Chỉnh sửa</span>
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
