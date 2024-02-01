import React from "react";
import "./Contact.scss";
import { IoClose } from "react-icons/io5";
import { popupStateContact } from "./Contact";

function PopupAva(props) {
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

  const [ava, setAva] = React.useState();
  const handleChooseAvatar = (e) => {
    setAva(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0].name);
  };

  return (
    <div className="DAT_PopupAva">
      <div className="DAT_PopupAva_Head">
        <div className="DAT_PopupAva_Head_Left">
          <p>Chỉnh sửa</p>
        </div>
        <div className="DAT_PopupAva_Head_Right">
          <div
            className="DAT_PopupAva_Head_Right_Icon"
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
            onClick={() => {
              popupStateContact.value = false;
            }}
          >
            <IoClose size={20} />
          </div>
        </div>
      </div>

      <div className="DAT_PopupAva_Body">
        <div className="DAT_PopupAva_Body_Ava">
          <div className="DAT_PopupAva_Body_Ava_Img">
            <img src={ava} alt="" />
          </div>
          <input
            type="file"
            id="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => handleChooseAvatar(e)}
          />
          <label htmlFor="file" style={{ cursor: "pointer" }}>
            Chọn ảnh
          </label>
        </div>
      </div>

      <div className="DAT_PopupAva_Foot">
        <button
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => {
            popupStateContact.value = false;
          }}
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

export default PopupAva;
