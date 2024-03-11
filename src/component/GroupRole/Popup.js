import React from "react";
import "./GroupRole.scss";

import { groupID, groupUser, popupState, userDel } from "./GroupRole";
import { useIntl } from "react-intl";
import { alertDispatch } from "../Alert/Alert";

import { IoClose } from "react-icons/io5";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";

export default function Popup() {
  const dataLang = useIntl();

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

  const handleDelete = async(e) => {


    let d = await callApi('post', host.DATA + '/removeUsrPartner', {
            mail: groupUser.value[0].mail_,
            partnerid: String(groupID.value)
    })
    console.log(d);
    if(d.status){
      groupUser.value = groupUser.value.filter(
        (item) => item.id_ != groupID.value
      );
      groupID.value = 0;
      popupState.value = false;
      alertDispatch(dataLang.formatMessage({ id: "alert_6" }));
    }else{
      alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
    }
    // groupUser.value.forEach((item) => {
    //   if (item.id_ == groupID.value) {
    //     item.users = item.users.filter(
    //       (user) => user.username != userDel.value
    //     );
    //   }
    // });
    // console.log(userDel.value);



    // console.log(userDel.value);
    // if (parseInt(userDel.value) === 1) {
    //   alertDispatch("Cant delete user");
    // } else {

      // let res = await callApi("post", host.DATA + "/removePartner", {
      //   code: code
      // });
      // console.log(res);

      // const i = groupUser.value.findIndex(
      //   (item) => item.id_ == parseInt(userDel.value)
      // );
      // console.log(userDel.value, i);
      // groupUser.value = groupUser.value.filter(
      //   (item) => item.id_ != parseInt(userDel.value)
      // );
      // console.log(groupUser.value);
      // popupState.value = false;
      // alertDispatch("Delete user success");
      // console.log(userDel.value, i);
    //}
    //console.log(groupUser.value);
  };

  return (
    <div className="DAT_Popup_Box">
      <div className="DAT_Popup_Box_Head">
        <div className="DAT_Popup_Box_Head_Left">
          <p>{dataLang.formatMessage({ id: "delAccount" })}</p>
        </div>

        <div className="DAT_Popup_Box_Head_Right">
          <div
            className="DAT_Popup_Box_Head_Right_Icon"
            onClick={() => (popupState.value = false)}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>

      <div className="DAT_Popup_Box_Body">
        <p>{dataLang.formatMessage({ id: "delaccountmess" })}</p>
      </div>

      <div className="DAT_Popup_Box_Foot">
        <button
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => (popupState.value = false)}
        >
          {dataLang.formatMessage({ id: "cancel" })}
        </button>
        <button
          style={{ backgroundColor: "#048FFF", color: "white" }}
          onClick={() => {
            handleDelete();
          }}
        >
          {dataLang.formatMessage({ id: "confirm" })}
        </button>
      </div>
    </div>
  );
}
