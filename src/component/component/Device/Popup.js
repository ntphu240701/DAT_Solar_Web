import React, { useRef } from "react";
import "./Device.scss"

import { inverterList, loggerList, popupState } from "./Device";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { alertDispatch } from "../Alert/Alert";
import { useIntl } from "react-intl";

import { IoClose } from "react-icons/io5";

export default function Popup(props) {
  const dataLang = useIntl();
  const name = useRef();

  const popup_state = {
    pre: { transform: "rotate(0deg)", transition: "0.5s", color: "black" },
    new: { transform: "rotate(90deg)", transition: "0.5s", color: "red" }
  }

  const handlePopup = (state) => {
    const popup = document.getElementById("Popup")
    popup.style.transform = popup_state[state].transform;
    popup.style.transition = popup_state[state].transition;
    popup.style.color = popup_state[state].color;
  }

  const handleDelete = (e) => {
    const dropLogger = async () => {
      let d = await callApi('post', host.DATA + '/dropLogger', { plantid: props.plantid, sn: props.sn });
      if (d.status === true) {
        loggerList.value = loggerList.value.filter((item) => item.psn != props.sn);
        inverterList.value = inverterList.value.filter((item) => item.plogger != props.sn);
        alertDispatch(dataLang.formatMessage({ id: "alert_25" }))
        popupState.value = false;
      } else if (d.number == 0) {
        alertDispatch(dataLang.formatMessage({ id: "alert_26" }))
      } else if (d.number == 1) {
        alertDispatch(dataLang.formatMessage({ id: "alert_27" }))
      }
    }
    dropLogger();
  }

  const handleUpdate = (e) => {
    const updateLogger = async () => {
      let d = await callApi('post', host.DATA + '/updateLogger', { sn: props.sn, type: "name", data: name.current.value });
      if (name.current.value === "") {
        alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
      } else if (d.status === true) {
        alertDispatch(dataLang.formatMessage({ id: "alert_6" }));
        let newData = loggerList.value
        let index = newData.findIndex((item) => item.psn == props.sn);
        newData[index].pname = name.current.value;
        loggerList.value = [...newData];
        popupState.value = false;
      }
    }
    updateLogger();
  }

  return (
    props.type === "remove" ?
      <div className="DAT_Popup_Box">
        <div className="DAT_Popup_Box_Head">
          <div className="DAT_Popup_Box_Head_Left">
            <p>{dataLang.formatMessage({ id: 'delDevice' })}</p>
          </div>
          <div className="DAT_Popup_Box_Head_Right">
            <div
              className="DAT_Popup_Box_Head_Right_Icon"
              onClick={() => (popupState.value = false)}
              id="Popup"
              onMouseEnter={e => (handlePopup("new"))}
              onMouseLeave={e => (handlePopup("pre"))}
            >
              <IoClose size={20}  ></IoClose>
            </div>
          </div>
        </div>
        <div className="DAT_Popup_Box_Body">
          {/* <p> */}
          <p>
            {dataLang.formatMessage({ id: 'delDevicemess' })}
            &nbsp;
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {props.sn}
            </span>
          </p>
          {/* </p> */}
        </div>
        <div className="DAT_Popup_Box_Foot">
          {/* <button
          style={{
            border: "1px solid #505050", backgroundColor: "white",
            color: "#505050"
          }}
          onClick={() => (popupState.value = false)}
        >
          {dataLang.formatMessage({ id: 'cancel' })}
        </button> */}
          <button style={{ backgroundColor: "#048FFF", color: "white" }}
            onClick={(e) => handleDelete(e)}
          >
            {dataLang.formatMessage({ id: 'confirm' })}
          </button>
        </div>
      </div>
      :
      <div className="DAT_Popup_Box">
        <div className="DAT_Popup_Box_Head">
          <div className="DAT_Popup_Box_Head_Left">
            <p>{dataLang.formatMessage({ id: 'edit' })}</p>
          </div>
          <div className="DAT_Popup_Box_Head_Right">
            <div
              className="DAT_Popup_Box_Head_Right_Icon"
              onClick={() => (popupState.value = false)}
              id="Popup"
              onMouseEnter={e => (handlePopup("new"))}
              onMouseLeave={e => (handlePopup("pre"))}
            >
              <IoClose size={20}  ></IoClose>
            </div>
          </div>
        </div>
        <div className="DAT_Popup_Box_Body">
          {/* <p>
            {dataLang.formatMessage({ id: 'delDevicemess' })}
            &nbsp;
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {props.sn}
            </span>
          </p> */}
          <input type="text" placeholder={dataLang.formatMessage({ id: 'name' })} ref={name} />
        </div>
        <div className="DAT_Popup_Box_Foot">
          {/* <button
          style={{
            border: "1px solid #505050", backgroundColor: "white",
            color: "#505050"
          }}
          onClick={() => (popupState.value = false)}
        >
          {dataLang.formatMessage({ id: 'cancel' })}
        </button> */}
          <button style={{ backgroundColor: "#048FFF", color: "white" }}
            onClick={(e) => handleUpdate(e)}
          >
            {dataLang.formatMessage({ id: 'confirm' })}
          </button>
        </div>
      </div>
  );
}
