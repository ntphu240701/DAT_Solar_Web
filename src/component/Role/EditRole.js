import React, { useEffect, useRef } from "react";
import "./Role.scss";

import { Usr_, popupState, roleData } from "./Role";
import { useIntl } from "react-intl";

import { IoClose } from "react-icons/io5";
import { partnerInfor } from "../../App";
import { datarule } from "../Rule/Rule";
import { host } from "../Lang/Contant";
import { callApi } from "../Api/Api";

export default function EditRole() {
  const dataLang = useIntl();
  const roleRef = useRef(roleData.value.type_);
  const ruleidRef = useRef(0);

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

  const handleConfirm = async () => {

    console.log(roleRef.current); 
    const updateRoleUser = await callApi(
      "post",host.DATA+ "/updateRoleUser", {
        usr: roleData.value.usr_,
        role: roleRef.current.value,
        ruleid: parseInt(ruleidRef.current.value),
      }
    )


    // console.log(roleData.value.usr_,roleRef.current.value,roleData.value.ruleid_);
    console.log(updateRoleUser);
    if(updateRoleUser.status){
        let newData = Usr_.value
        let index = Usr_.value.findIndex((d) => d.usr_ == roleData.value.usr_);
     
        
        //console.log(ruleidRef.current.value);
        let rulename = datarule.value.find((d) => d.ruleid_ == parseInt(ruleidRef.current.value)).rulename_;
        console.log(parseInt(ruleidRef.current.value),rulename);
        newData[index].type_ = roleRef.current.value
        newData[index].ruleid_ = parseInt(ruleidRef.current.value)
        newData[index].rulename_ = rulename
        Usr_.value = [...newData]
      
    }
  };

  return (
    <div className="DAT_EditRole">
      <div className="DAT_EditRole_Head">
        <div className="DAT_EditRole_Head_Left">
          <p>{dataLang.formatMessage({ id: "edit" })}</p>
        </div>

        <div className="DAT_EditRole_Head_Right">
          <div
            className="DAT_EditRole_Head_Right_Icon"
            onClick={() => (popupState.value = "default")}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>

      <div className="DAT_EditRole_Body">
        <div className="DAT_EditRole_Body_Row">
          <div className="DAT_EditRole_Body_Row_Left">
            {dataLang.formatMessage({ id: "username" })}:
          </div>
          {roleData.value.name_}
        </div>

        <div className="DAT_EditRole_Body_Row">
          <div className="DAT_EditRole_Body_Row_Left">
            <span style={{ color: "red" }}>* </span>
            <span style={{ color: "grey" }}>
              {dataLang.formatMessage({ id: "account" })}: &nbsp;
            </span>
          </div>
          <select defaultValue={roleData.value.type_} ref={roleRef}>
            <option value="admin">
              {dataLang.formatMessage({ id: "admin" })}
            </option>
            <option value="user">
              {dataLang.formatMessage({ id: "user" })}
            </option>
          </select>
        </div>

        <div className="DAT_EditRole_Body_Row">
          <div className="DAT_EditRole_Body_Row_Left">
            <span style={{ color: "red" }}>* </span>
            <span style={{ color: "grey", marginRight: "18px" }}>
              {dataLang.formatMessage({ id: "rule" })}: &nbsp;
            </span>
          </div>
          <select defaultValue={roleData.value.ruleid_} ref={ruleidRef}>
            {datarule.value
              .filter((item, key) => item.ruleid_ !== 1)
              .map((item, key) => (
                <option key={key} value={item.ruleid_}>
                  {item.rulename_}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="DAT_EditRole_Foot">
        {/* <button
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => (popupState.value = "default")}
        >
          Hủy
        </button> */}
        <button
          style={{ backgroundColor: "#048FFF", color: "white" }}
          onClick={(e) => {
            handleConfirm(e);
          }}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}
