import React, { useEffect } from "react";
import "./Project.scss";
import { dataproject, popupState, projectData } from "./Project";
import { IoClose } from "react-icons/io5";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { alertDispatch } from "../Alert/Alert";
import { temp } from "./ProjectData";
import { userInfor } from "../../App";
import { useIntl } from "react-intl";
import { data } from "jquery";

export default function Popup(props) {
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

  const handleDelete = (e) => {
    switch (props.type) {
      case "plant":
        const dropProject = async (plantid, usr, partnerid, type) => {
          let d = await callApi('post', host.DATA + '/dropPlant', { plantid: plantid, usr: usr, partnerid: partnerid, type: type })
          if (d.status === true) {
            alertDispatch(dataLang.formatMessage({ id: 'alert_24' }));

            dataproject.value = dataproject.value.filter(
              (item) => item.plantid != props.plantid
            );
            popupState.value = false;
          }
        };
        dropProject(props.plantid, props.usr, userInfor.value.partnerid, userInfor.value.type)
        break;
      case "logger":
        const dropLogger = async (plantid, sn) => {
          let d = await callApi('post', host.DATA + '/dropLogger', { plantid: plantid, sn: sn });
          if (d.status === true) {
            temp.value = temp.value.filter((item) => item.sn != props.sn);
            alertDispatch(dataLang.formatMessage({ id: 'alert_25' }))
            popupState.value = false;
          } else if (d.number == 0) {
            alertDispatch(dataLang.formatMessage({ id: 'alert_26' }))
          } else if (d.number == 1) {
            alertDispatch(dataLang.formatMessage({ id: 'alert_27' }))
          }
        }
        dropLogger(props.plantid, props.sn);
        break;
      default:
        break;
    }
  };

  return (
    <div className="DAT_Popup_Box">
      <div className="DAT_Popup_Box_Head">
        <div className="DAT_Popup_Box_Head_Left">
          <p>{dataLang.formatMessage({ id: 'delete' })} </p>
        </div>
        <div className="DAT_Popup_Box_Head_Right">
          <div
            className="DAT_Popup_Box_Head_Right_Icon"
            onClick={() => (popupState.value = false)}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20} />
          </div>
        </div>
      </div>
      <div className="DAT_Popup_Box_Body">
        <span>
          {dataLang.formatMessage({ id: 'delPlant' })}
          &nbsp;
          <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
            {props.type === "plant" ? projectData.value.plantname : props.sn}
          </span>
          &nbsp;
        </span>
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
          {dataLang.formatMessage({ id: 'cancel' })}
        </button>
        <button
          // id={projectData.value.plantid}
          style={{ backgroundColor: "#048FFF", color: "white" }}
          onClick={(e) => handleDelete(e)}
        >
          {dataLang.formatMessage({ id: 'confirm' })}
        </button>
      </div>
    </div>
  );
}
