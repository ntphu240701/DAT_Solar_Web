import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { popupAddGateway } from "./ProjectData";
import { signal } from "@preact/signals-react";

const check = signal("newDevice");

export default function AddGateway(props) {
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
    oldDevice.current.checked = false;
    check.value = "newDevice";
  };

  const newDevice = useRef();
  const oldDevice = useRef();
  const handleCheck = (e) => {
    if (e.target.id === "newDevice") {
      oldDevice.current.checked = false;
      check.value = "newDevice";
    } else {
      newDevice.current.checked = false;
      check.value = "oldDevice";
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
        <div className="DAT_AddGateway_Body_Radio">
          <div className="DAT_AddGateway_Body_Radio_Item">
            <input
              id="newDevice"
              type="radio"
              defaultChecked={true}
              ref={newDevice}
              onChange={(e) => handleCheck(e)}
            />
            Thêm thiết bị mới
          </div>
          <div className="DAT_AddGateway_Body_Radio_Item">
            <input
              id="oldDevice"
              type="radio"
              ref={oldDevice}
              onChange={(e) => handleCheck(e)}
            />
            Thay thế gateway/logger cũ
          </div>
        </div>

        <div className="DAT_AddGateway_Body_Input">
          <span>SN:</span>
          <input type="text" placeholder="Nhập mã" />
        </div>

        {check.value === "oldDevice" ? (
          <div className="DAT_AddGateway_Body_Select">
            <span>Chọn thiết bị thay thế:</span>
            <select>
              {props.data.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.SN}
                  </option>
                );
              })}
            </select>
          </div>
        ) : (
          <></>
        )}
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
          //   onClick={(e) => handleDelete(e)}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}
