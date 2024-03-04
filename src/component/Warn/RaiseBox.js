import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import "./Warn.scss";
import { deletewarnState, idDel, temp } from "./Warn";
import { message } from "../Navigation/Navigation";
import { alertDispatch } from "../Alert/Alert";
// import { raiseBoxState } from "./AddGateway";

export default function RaiseBox(props) {
  const handleDeleteReport = (e) => {
    deletewarnState.value = false;
    const messid = idDel.value.split("_")[0];
    const messindex = message.value.findIndex((item) => item.messid == messid);
    const warnid = idDel.value.split("_")[1];
    const warnindex = message.value[messindex].list.findIndex(
      (item) => item.warnid == warnid
    );
    message.value[messindex].list.splice(warnindex, 1);
    let x = temp.value.filter((item) => item.warnid != warnid || item.messid != messid)
    console.log(x);
    temp.value = [...x]
    console.log(message.value);
    alertDispatch("Xóa thành công cảnh báo");
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
    <div className="DAT_PopupReport_Box">
      <div className="DAT_PopupReport_Box_Head">
        <div className="DAT_PopupReport_Box_Head_Left">
          <p>Xóa cảnh báo</p>
        </div>
        <div className="DAT_PopupReport_Box_Head_Right">
          <div
            className="DAT_PopupReport_Box_Head_Right_Icon"
            onClick={() => (deletewarnState.value = false)}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>
      <div className="DAT_PopupReport_Box_Body">
        <p>Bạn có chắc chắn muốn xóa cảnh báo này?</p>
      </div>
      <div className="DAT_PopupReport_Box_Foot">
        <button
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => (deletewarnState.value = false)}
        >
          Hủy
        </button>
        <button
          style={{ backgroundColor: "#048FFF", color: "white" }}
          onClick={(e) => handleDeleteReport(e)}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}
