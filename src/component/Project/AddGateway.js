import React, { useRef } from "react";
import "./Project.scss";

import { projectData, } from "./Project";
import { useIntl } from "react-intl";
import { popupAddGateway, temp } from "./ProjectData";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { alertDispatch } from "../Alert/Alert";

import { IoClose } from "react-icons/io5";

export default function AddGateway(props) {
  const dataLang = useIntl();
  const sn = useRef();
  const name = useRef();
  const type = useRef();

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

  const handleClose = () => {
    popupAddGateway.value = false;
  };

  const handleSave = async (e) => {
    if (sn.current.value === "" || name.current.value === "" || type.current.value === "") {
      alertDispatch(dataLang.formatMessage({ id: "alert_22" }))
    } else {
      const d = await callApi("post", host.DATA + "/addLogger", {
        plantid: projectData.value.plantid,
        sn: sn.current.value,
        name: name.current.value,
        type: type.current.value,
      });
      if (d.status) {
        temp.value = [...temp.value, d.data];
        popupAddGateway.value = false;
      }
      if (d.status === true) {
        alertDispatch(dataLang.formatMessage({ id: "alert_32" }))
      } else if (d.number === 0) {
        alertDispatch(dataLang.formatMessage({ id: "alert_33" }))
      } else if (d.number === 1) {
        alertDispatch(dataLang.formatMessage({ id: "alert_34" }))
      } else if (d.number === 2) {
        alertDispatch(dataLang.formatMessage({ id: "alert_35" }))
      } else if (d.number === 3) {
        alertDispatch(dataLang.formatMessage({ id: "alert_34" }))
      } else if (d.number === 4) {
        alertDispatch(dataLang.formatMessage({ id: "alert_36" }))
      }
    }
  };

  return (
    <div className="DAT_AddGateway">
      <div className="DAT_AddGateway_Head">
        <div className="DAT_AddGateway_Head_Left">
          <p>{dataLang.formatMessage({ id: 'ADD' })} Gateway/Logger</p>
        </div>

        <div className="DAT_AddGateway_Head_Right">
          <div
            className="DAT_AddGateway_Head_Right_Icon"
            onClick={() => handleClose()}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20} />
          </div>
        </div>
      </div>

      <div className="DAT_AddGateway_Body">
        <div className="DAT_AddGateway_Body_Input">
          <span>SN:</span>
          <input id="sn" type="text" placeholder={dataLang.formatMessage({ id: 'enterCode' })} ref={sn} />
        </div>

        <div className="DAT_AddGateway_Body_Input">
          <span>{dataLang.formatMessage({ id: 'name' })}:</span>
          <input id="name" type="text" placeholder={dataLang.formatMessage({ id: 'enterDev' })} ref={name} />
        </div>

        <div className="DAT_AddGateway_Body_Input">
          <span>{dataLang.formatMessage({ id: 'type' })}:</span>
          <input id="type" type="text" placeholder={dataLang.formatMessage({ id: 'enterType' })} ref={type} />
        </div>
      </div>

      <div className="DAT_AddGateway_Foot">
        {/* <button
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => handleClose()}
        >
          {dataLang.formatMessage({ id: 'cancel' })}
        </button> */}
        <button
          style={{ backgroundColor: "#048FFF", color: "white" }}
          onClick={(e) => handleSave(e)}
        >
          {dataLang.formatMessage({ id: 'confirm' })}
        </button>
      </div>

      {/* {raiseBoxState.value.status ? (
        <div className="DAT_RaiseBoxPopup">
          <RaiseBox state={raiseBoxState.value.text} />
        </div>
      ) : (
        <></>
      )} */}
    </div>
  );
}
