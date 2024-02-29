import React, { useEffect, useRef } from "react";
import { Empty, plantState, projectData, deviceData, Logger, Inverter } from "./Project";
import { IoClose } from "react-icons/io5";
import { popupAddGateway, temp } from "./ProjectData";
import { signal } from "@preact/signals-react";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { alertDispatch } from "../Alert/Alert";

export default function AddGateway(props) {
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
      alertDispatch("Không được để trống thông tin")
      // console.log("Không được để trống thông tin");
    } else {
      const d = await callApi('post', host.DATA + '/addLogger', { plantid: projectData.value.plantid, sn: sn.current.value, name: name.current.value, type: type.current.value });
      console.log(d);
      if (d.status) {
        temp.value = [...temp.value, d.data];
      }
      popupAddGateway.value = false;
    }
  };

  return (
    <div className="DAT_AddGateway">
      <div className="DAT_AddGateway_Head">
        <div className="DAT_AddGateway_Head_Left">
          <p>Thêm Gateway/Logger</p>
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
          <input id="sn" type="text" placeholder="Nhập mã" ref={sn} />
        </div>
        <div className="DAT_AddGateway_Body_Input">
          <span>Tên:</span>
          <input id="name" type="text" placeholder="Nhập tên" ref={name} />
        </div>
        <div className="DAT_AddGateway_Body_Input">
          <span>Kiểu:</span>
          <input id="type" type="text" placeholder="Nhập kiểu" ref={type} />
        </div>
      </div>

      <div className="DAT_AddGateway_Foot">
        <button
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => handleClose()}
        >
          Hủy
        </button>
        <button
          //   id={projectData.value.id}
          style={{ backgroundColor: "#048FFF", color: "white" }}
          onClick={(e) => handleSave(e)}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}
