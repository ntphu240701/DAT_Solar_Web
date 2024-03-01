import React from "react";
import "./Device.scss"
import { loggerList, popupState } from "./Device";
import { IoClose } from "react-icons/io5";
import { hasIn } from "lodash";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { alertDispatch } from "../Alert/Alert";

export default function Popup(props) {

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
    const dropLogger = async (plantid, sn) => {
      let d = await callApi('post', host.DATA + '/dropLogger', { plantid: plantid, sn: sn });
      if (d.status === true) {
        loggerList.value = loggerList.value.filter((item) => item.psn != props.sn);
        alertDispatch("Đã xóa thành công thiết bị")
        popupState.value = false;
      } else if (d.number == 0) {
        alertDispatch("Không thể xóa thiết bị, lỗi định dạng")
      } else if (d.number == 1) {
        alertDispatch("Không thể xóa thiết bị, lỗi hệ thống")
      }
    }
    dropLogger(props.plantid, props.sn);
  }

  return (
    <div className="DAT_Popup_Box">
      <div className="DAT_Popup_Box_Head">
        <div className="DAT_Popup_Box_Head_Left">
          <p>Xóa thiết bị</p>
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
        <p>
          Bạn có chắc chắn muốn xóa vĩnh viễn thiết bị này không? Tất cả dữ liệu
          lịch sử của XXX sẽ bị mất.
        </p>
      </div>
      <div className="DAT_Popup_Box_Foot">
        <button
          style={{
            border: "1px solid #505050", backgroundColor: "white",
            color: "#505050"
          }}
          onClick={() => (popupState.value = false)}
        >
          Hủy
        </button>
        <button style={{ backgroundColor: "#048FFF", color: "white" }}
          onClick={(e) => handleDelete(e)}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}
