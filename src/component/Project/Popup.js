import React, { useRef } from "react";
import "./Project.scss";

import { dataproject, popupState, projectData } from "./Project";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { alertDispatch } from "../Alert/Alert";
import { temp } from "./ProjectData";
import { userInfor } from "../../App";
import { useIntl } from "react-intl";

import { IoClose } from "react-icons/io5";

export default function Popup(props) {
  const dataLang = useIntl();
  const name = useRef();

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
        const dropProject = async () => {
          let d = await callApi('post', host.DATA + '/dropPlant', {
            plantid: props.plantid,
            usr: props.usr,
            partnerid: userInfor.value.partnerid,
            type: userInfor.value.type
          })
          if (d.status === true) {
            alertDispatch(dataLang.formatMessage({ id: 'alert_24' }));

            dataproject.value = dataproject.value.filter(
              (item) => item.plantid != props.plantid
            );
            popupState.value = false;
          }
        };
        dropProject()
        break;
      case "logger":
        const dropLogger = async () => {
          let d = await callApi('post', host.DATA + '/dropLogger', {
            plantid: props.plantid, sn: props.sn
          });
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
        dropLogger();
        break;
      default:
        break;
    }
  };

  const handleUpdate = (e) => {
    const updateLogger = async () => {
      let d = await callApi('post', host.DATA + '/updateLogger', { sn: props.sn, type: "name", data: name.current.value });
      if (name.current.value === "") {
        alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
      } else if (d.status === true) {
        alertDispatch(dataLang.formatMessage({ id: "alert_6" }));
        let newData = temp.value
        let index = newData.findIndex((item) => item.sn == props.sn);
        newData[index].name = name.current.value;
        temp.value = [...newData];
        popupState.value = false;
      }
    }
    updateLogger();
  }

  return (
    props.func === "remove" ?
      <div className="DAT_Popup_Box">
        <div className="DAT_Popup_Box_Head">
          <div className="DAT_Popup_Box_Head_Left">
            <p>{dataLang.formatMessage({ id: 'delete' })} {props.type === "plant" ? 'dự án' : 'thiết bị'}</p>
          </div>
          <div className="DAT_Popup_Box_Head_Right">
            <div className="DAT_Popup_Box_Head_Right_Icon"
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
            {props.type === "plant" ?
              dataLang.formatMessage({ id: 'delPlant' })
              : dataLang.formatMessage({ id: 'delDevicemess' })}
            &nbsp;
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {props.type === "plant" ? projectData.value.plantname : props.sn}
            </span>
          </span>
        </div>

        <div className="DAT_Popup_Box_Foot">
          {/* <button
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => (popupState.value = false)}
        >
          {dataLang.formatMessage({ id: 'cancel' })}
        </button> */}
          <button
            // id={projectData.value.plantid}
            style={{ backgroundColor: "#048FFF", color: "white" }}
            onClick={(e) => handleDelete(e)}
          >
            {dataLang.formatMessage({ id: 'confirm' })}
          </button>
        </div>
      </div>
      : <div className="DAT_Popup_Box">
        <div className="DAT_Popup_Box_Head">
          <div className="DAT_Popup_Box_Head_Left">
            <p>{dataLang.formatMessage({ id: 'edit' })}</p>
          </div>
          <div className="DAT_Popup_Box_Head_Right">
            <div className="DAT_Popup_Box_Head_Right_Icon"
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
          {/* <span>
            {props.type === "plant" ?
              dataLang.formatMessage({ id: 'delPlant' })
              : dataLang.formatMessage({ id: 'delDevicemess' })}
            &nbsp;
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {props.type === "plant" ? projectData.value.plantname : props.sn}
            </span>
          </span> */}
          <input type="text" placeholder={dataLang.formatMessage({ id: 'name' })} ref={name} />

        </div>

        <div className="DAT_Popup_Box_Foot">
          {/* <button
        style={{
          border: "1px solid #505050",
          backgroundColor: "white",
          color: "#505050",
        }}
        onClick={() => (popupState.value = false)}
      >
        {dataLang.formatMessage({ id: 'cancel' })}
      </button> */}
          <button
            // id={projectData.value.plantid}
            style={{ backgroundColor: "#048FFF", color: "white" }}
            onClick={(e) => handleUpdate(e)}
          >
            {dataLang.formatMessage({ id: 'confirm' })}
          </button>
        </div>
      </div>
  );
}
