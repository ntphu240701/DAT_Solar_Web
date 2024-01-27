import React, { useEffect } from "react";
import { popupStateReport } from "./Report";
import { IoClose } from "react-icons/io5";

export default function Popup() {
  useEffect(() => {
    console.log(popupStateReport.value);
  });

  return (
    <div className="DAT_Popup_Box">
      <div className="DAT_Popup_Box_Head">
        <div className="DAT_Popup_Box_Head_Left">
          <p>Xóa thiết bị</p>
        </div>
        <div className="DAT_Popup_Box_Head_Right">
          <div
            className="DAT_Popup_Box_Head_Right_Icon"
            onClick={() => (popupStateReport.value = false)}
          >
            <IoClose size={20}></IoClose>
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
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => (popupStateReport.value = false)}
        >
          Hủy
        </button>
        <button style={{ backgroundColor: "#048FFF", color: "white" }}>
          Xác nhận
        </button>
      </div>
    </div>
  );
}
