import React from "react";
import "./Project.scss";
import { dataproject, popupState, projectData } from "./Project";
import { IoClose } from "react-icons/io5";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";

export default function Popup(props) {
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
    const dropProject = async (
      plantid, usr
    ) => {
      let d = await callApi('post', host.DATA + '/dropPlant', {
        plantid: plantid,
        usr: usr,
      })
      console.log(d)
    };
    dropProject(e.currentTarget.id, props.usr)

    popupState.value = false;
    dataproject.value = dataproject.value.filter(
      (item) => item.plantid !== parseInt(e.currentTarget.id)
    );
  };

  return (
    <div className="DAT_Popup_Box">
      <div className="DAT_Popup_Box_Head">
        <div className="DAT_Popup_Box_Head_Left">
          <p>Xóa dự án</p>
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
          Bạn có chắc chắn muốn xóa vĩnh viễn dự án này không? Tất cả dữ liệu
          lịch sử của
          &nbsp;
          <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
            {projectData.value.plantname}
          </span>
          &nbsp;
          sẽ bị xóa.
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
          Hủy
        </button>
        <button
          id={projectData.value.plantid}
          style={{ backgroundColor: "#048FFF", color: "white" }}
          onClick={(e) => handleDelete(e)}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}
