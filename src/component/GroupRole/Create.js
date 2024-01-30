import React from "react";
import { IoMdExit } from "react-icons/io";
import { createState } from "./GroupRole";
import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import './GroupRole.scss';


export default function Create() {
  React.useEffect(() => {
    console.log(createState.value);
  });

  return (
    <>
      <div className="DAT_Create">
        <div className="DAT_Create_Header">
          <div className="DAT_Create_Header_Left">
            <p style={{ fontSize: "20px" }}>Cấu hình</p>
          </div>
          <div className="DAT_Create_Header_Right">
            <div className="DAT_Create_Header_Right_Save">
              <FaSave size={20} color="white" />
              <span>Lưu</span>
            </div>
            <div className="DAT_Create_Header_Right_Close">
              <RxCross2
                size={20}
                color="white"
                onClick={()=>createState.value = false}
              />
            </div>
          </div>
        </div>

        <div className="DAT_Create_Body">
          <div className="DAT_Create_Body_Item">
            <h4>Vui lòng chọn loại thiết bị bạn cần hiển thị</h4>
            
          </div>
        </div>
      </div>
    </>
  );
}
