import React, { useEffect, useState } from "react";
import "./Rule.scss";

import { confirmDeleteState, datarule, ruleID } from "./Rule";
import { alertDispatch } from "../Alert/Alert";
import { useIntl } from "react-intl";

import { IoClose } from "react-icons/io5";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { userInfor } from "../../App";

export default function ConfirmDeleteRule(props) {
  const dataLang = useIntl();
  const [del, setDel] = useState(true);

  const handleDeleteReport = async (e) => {
    // console.log(props.id);
    const delRule = await callApi("post", host.DATA + "/removeRule", {
      partnerid: userInfor.value.partnerid,
      ruleid: props.id,
    });
    console.log(delRule);
    if (delRule.status) {
      console.log(delRule);
      datarule.value = datarule.value.filter(
        (item) => item.ruleid_ !== parseInt(props.id)
      );
      console.log(datarule.value);
      confirmDeleteState.value = false;
      alertDispatch(dataLang.formatMessage({ id: "alert_23" }));
    }

    // if (props.id === 1) {
    //   setDel(false);
    // } else {
    //
    // }
  };

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

  // useEffect(() => {
  //   console.log(idReport.value);
  // },[idReport.value]);

  return (
    <div className="DAT_ConfirmPopup_Box">
      <div className="DAT_ConfirmPopup_Box_Head">
        <div className="DAT_ConfirmPopup_Box_Head_Left">
          <p>{dataLang.formatMessage({ id: "delRule" })}</p>
        </div>
        <div className="DAT_ConfirmPopup_Box_Head_Right">
          <div
            className="DAT_ConfirmPopup_Box_Head_Right_Icon"
            onClick={() => (confirmDeleteState.value = false)}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>

      <div className="DAT_ConfirmPopup_Box_Body">
        {del ? (
          <p>{dataLang.formatMessage({ id: "delrulemess" })}</p>
        ) : (
          <p>{dataLang.formatMessage({ id: "deleteDenied" })}</p>
        )}
      </div>

      <div className="DAT_ConfirmPopup_Box_Foot">
        {del ? (
          <>
            <button
              style={{
                border: "1px solid #505050",
                backgroundColor: "white",
                color: "#505050",
              }}
              onClick={() => (confirmDeleteState.value = false)}
            >
              {dataLang.formatMessage({ id: "cancel" })}
            </button>
            <button
              style={{ backgroundColor: "#048FFF", color: "white" }}
              onClick={(e) => handleDeleteReport(e)}
            >
              {dataLang.formatMessage({ id: "confirm" })}
            </button>
          </>
        ) : (
          <button
            style={{
              border: "1px solid #505050",
              backgroundColor: "white",
              color: "#505050",
            }}
            onClick={() => (confirmDeleteState.value = false)}
          >
            {dataLang.formatMessage({ id: "quit" })}
          </button>
        )}
      </div>
    </div>
  );
}
