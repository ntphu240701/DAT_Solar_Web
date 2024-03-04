import React from "react";
import "./User.scss";
import { FaRegUser } from "react-icons/fa";
import Popup from "./Popup";
import { signal } from "@preact/signals-react";
import { partnerInfor, userInfor } from "../../App";
import { useIntl } from "react-intl";


export const popupStateUser = signal(false);
export const editType = signal();

function User(props) {
  const dataLang = useIntl();
  return (
    <>
      <div className="DAT_UsrHeader">
        <div className="DAT_UsrHeader_Title">
          <FaRegUser color="gray" size={25} /> <span>{dataLang.formatMessage({ id: 'account' })}</span>
        </div>
      </div>
      <div className="DAT_Usr">
        <div className="DAT_Usr_Item">
          <div className="DAT_Usr_Item_Content">
            <div className="DAT_Usr_Item_Content_Title">{dataLang.formatMessage({ id: 'imgInfo' })}</div>
            <img src={userInfor.value.avatar ? userInfor.value.avatar : "/dat_icon/user_manager.png"} alt="" />
          </div>
          <span
            id="avatar"
            onClick={() => (
              (popupStateUser.value = true), (editType.value = "avatar")
            )}
          >
            {dataLang.formatMessage({ id: 'edit' })}
          </span>
        </div>

        <div className="DAT_Usr_Item">
          <div className="DAT_Usr_Item_Content">
            <div className="DAT_Usr_Item_Content_Title">{dataLang.formatMessage({ id: 'name' })}</div>
            <div className="DAT_Usr_Item_Content_Label">{userInfor.value.name}</div>
          </div>
          <span onClick={() => (popupStateUser.value = true, editType.value = "name")}>
            {dataLang.formatMessage({ id: 'edit' })}
          </span>
        </div>

        <div className="DAT_Usr_Item">
          <div className="DAT_Usr_Item_Content">
            <div className="DAT_Usr_Item_Content_Title">{dataLang.formatMessage({ id: 'phone' })}</div>
            <div className="DAT_Usr_Item_Content_Label">
              {userInfor.value.phone}
            </div>
          </div>
          <span onClick={() => (popupStateUser.value = true, editType.value = "phone")}>
            {dataLang.formatMessage({ id: 'edit' })}
          </span>
        </div>
        <div className="DAT_Usr_Item">
          <div className="DAT_Usr_Item_Content">
            <div className="DAT_Usr_Item_Content_Title">{dataLang.formatMessage({ id: 'address' })}</div>
            <div className="DAT_Usr_Item_Content_Label">
              {userInfor.value.addr}
            </div>
          </div>
          <span onClick={() => (popupStateUser.value = true, editType.value = "addr")}>
            {dataLang.formatMessage({ id: 'edit' })}
          </span>
        </div>

        <div className="DAT_Usr_Item">
          <div className="DAT_Usr_Item_Content">
            <div className="DAT_Usr_Item_Content_Title">{dataLang.formatMessage({ id: 'password' })}</div>
            <div className="DAT_Usr_Item_Content_Label">********</div>
          </div>
          <span onClick={() => (popupStateUser.value = true, editType.value = "password")}>
            {dataLang.formatMessage({ id: 'edit' })}
          </span>
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
