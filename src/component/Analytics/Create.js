import React from "react";
import "./Analytics.scss";

import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { anaState } from "./Analytics";

function Create(props) {
  return (
    <div className="DAT_Create">
      <div className="DAT_Create_Header">
        <div className="DAT_Create_Header_Left">Tạo mẫu phân tích</div>

        <div className="DAT_Create_Header_Right">
          <div className="DAT_Create_Header_Right_Save">
            <FaSave size={20} color="white" />
            <span>Lưu</span>
          </div>
          <div className="DAT_Create_Header_Right_Close">
            <RxCross2
              size={20}
              color="white"
              onClick={() => (anaState.value = "default")}
            />
          </div>
        </div>
      </div>

      {/* <div className="DAT_Create_Body"></div> */}
    </div>
  );
}

export default Create;
