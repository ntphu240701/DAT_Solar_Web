import React, { useRef } from "react";
import { popupAddSubsystem } from "./ProjectData";
import { IoClose } from "react-icons/io5";
import { signal } from "@preact/signals-react";

const check = signal("production");

function AddSubsystem(props) {
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

  const production = useRef();
  const consumption = useRef();
  const handleCheck = (e) => {
    if (e.target.id === "production") {
      consumption.current.checked = false;
      check.value = "production";
    } else {
      production.current.checked = false;
      check.value = "consumption";
    }
  };

  return (
    <div className="DAT_AddSubsystem">
      <div className="DAT_AddSubsystem_Head">
        <div className="DAT_AddSubsystem_Head_Left">
          <p>Thêm Subsystem</p>
        </div>
        <div className="DAT_AddSubsystem_Head_Right">
          <div
            className="DAT_AddSubsystem_Head_Right_Icon"
            onClick={() => (popupAddSubsystem.value = false)}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20} />
          </div>
        </div>
      </div>

      <div className="DAT_AddSubsystem_Body">
        <div className="DAT_AddSubsystem_Body_Input">
          <span>Tên hệ thống con:</span>
          <input type="text" placeholder="Nhập tên hệ thống con" />
        </div>

        <div className="DAT_AddSubsystem_Body_Radio">
          <span>Kiểu hệ thống con:</span>
          <div className="DAT_AddSubsystem_Body_Radio_Body">
            <div className="DAT_AddSubsystem_Body_Radio_Body_Item">
              <input
                id="production"
                type="radio"
                defaultChecked={true}
                ref={production}
                onChange={(e) => handleCheck(e)}
              />
              Sản xuất
            </div>
            <div className="DAT_AddSubsystem_Body_Radio_Body_Item">
              <input
                id="consumption"
                type="radio"
                ref={consumption}
                onChange={(e) => handleCheck(e)}
              />
              Tiêu thụ
            </div>
          </div>
        </div>

        {check.value === "production" ? (
          <div className="DAT_AddSubsystem_Body_Input">
            <span>Dung lượng (kWh):</span>
            <input type="text" />
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="DAT_AddSubsystem_Foot">
        <button
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => (popupAddSubsystem.value = false)}
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

export default AddSubsystem;
