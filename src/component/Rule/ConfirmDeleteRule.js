import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { confirmDeleteState, datarule, ruleID } from "./Rule";

export default function ConfirmDeleteRule() {
  const [del, setDel] = useState(true);
  const handleDeleteReport = (e) => {
    console.log(ruleID.value);
    if (ruleID.value === 1) {
      setDel(false);
    } else {
      datarule.value = datarule.value.filter(
        (item) => item.ruleid !== ruleID.value
      );
      confirmDeleteState.value = false;
    }
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
          <p>Xóa thiết bị</p>
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
          <p>Bạn có chắc chắn muốn xóa phân quyền này không?</p>
        ) : (
          <p>Không thể xóa phân quyền này.</p>
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
              Hủy
            </button>
            <button
              style={{ backgroundColor: "#048FFF", color: "white" }}
              onClick={(e) => handleDeleteReport(e)}
            >
              Xác nhận
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
            Thoát
          </button>
        )}
      </div>
    </div>
  );
}
