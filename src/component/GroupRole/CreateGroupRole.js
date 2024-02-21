import React, { useState } from "react";
import { IoMdExit } from "react-icons/io";
import { createState } from "./GroupRole";
import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "./GroupRole.scss";
import { signal } from "@preact/signals-react";

const CheckBox = (props) => {
  return (
    <div className="DAT_CreateGroupRole_Body_Item_Checkbox_Option">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id={props.info}
        ></input>
        <label
          style={{ cursor: "pointer", fontSize: "15px", color: "grey" }}
          className="form-check-label"
          htmlFor={props.info}
        >
          {props.info}
        </label>
      </div>
    </div>
  );
};

export const rule = signal([
  {
    groupid: 1,
    role: {
      1: { lang: "role1", status: true },
      2: { lang: "role2", status: true },
      3: { lang: "role3", status: false },
      4: { lang: "role4", status: false },
    },
  },
  {
    groupid: 2,
    role: {
      1: { lang: "role1", status: false },
      2: { lang: "role2", status: true },
      3: { lang: "role3", status: true },
      4: { lang: "role4", status: false },
    },
  },
]);
const idplus = 2;
export const newdb = signal({
  groupid: 0,
  role: {
    1: { lang: "role1", status: false },
    2: { lang: "role2", status: false },
    3: { lang: "role3", status: false },
    4: { lang: "role4", status: false },
  },
});

export default function CreateGroupRole() {
  React.useEffect(() => {
    console.log(createState.value);
  });

  const [name, setName] = useState("");
  const [subinfo, setSubinfo] = useState("");
  const handleCreate = () => {
    
  }
  return (
    <>
      <div className="DAT_CreateGroupRole">
        <div className="DAT_CreateGroupRole_Header">
          <div className="DAT_CreateGroupRole_Header_Left">
            <p style={{ fontSize: "20px" }}>Tạo nhóm mới</p>
          </div>
          <div className="DAT_CreateGroupRole_Header_Right">
            <div className="DAT_CreateGroupRole_Header_Right_Save"
            onClick={()=>handleCreate()}
            >
              <FaSave size={20} color="white" />
              <span>Lưu</span>
            </div>
            <div className="DAT_CreateGroupRole_Header_Right_Close">
              <RxCross2
                size={20}
                color="white"
                onClick={() => (createState.value = false)}
              />
            </div>
          </div>
        </div>

        <div className="DAT_CreateGroupRole_Body">
          <div className="DAT_CreateGroupRole_Body_Item">
            <h4>Vui lòng chọn loại thiết bị bạn cần hiển thị</h4>
            <div className="DAT_CreateGroupRole_Body_Item_Input">
              <span>Tên nhóm:</span>
              <input type="text" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="DAT_CreateGroupRole_Body_Item_Input">
              <span>Thông tin nhóm:</span>
              <input type="text" onChange={(e) => setSubinfo(e.target.value)}/>
            </div>
            <div className="DAT_CreateGroupRole_Body_Item_Checkbox">
              {Object.entries(newdb.value.role).map(([key, value]) => (
                <CheckBox info={value.lang} key={key} status={value.status}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
