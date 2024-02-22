import React, { useEffect, useState } from "react";
import { editState, group, groupID, groupUser } from "./GroupRole";
import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "./GroupRole.scss";
import { signal } from "@preact/signals-react";

// const idplus = signal(2);
// const newdb = signal({
//   id: 0,
//   name: "",
//   subinfo: "",
//   role: {
//     1: { lang: "role1", status: true },
//     2: { lang: "role2", status: true },
//     3: { lang: "role3", status: false },
//     4: { lang: "role4", status: false },
//   },
// });

// const temp = signal(newdb.value);

const CheckBox = (props) => {
  //   const handleCheck = (e) => {
  //     // props.status = e.target.checked;
  //     newdb.value = {
  //       ...newdb.value,
  //       role: {
  //         ...newdb.value.role,
  //         [props.num]: {
  //           ...newdb.value.role[props.num],
  //           status: e.target.checked,
  //         },
  //       },
  //     };
  //     console.log(newdb.value);
  //   };

  return (
    <div className="DAT_CreateGroupRole_Body_Item_Checkbox_Option">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          // defaultChecked={props.status}
          id={props.info}
          //   onChange={(e) => handleCheck(e)}
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

export default function CreateGroupRole() {
  // React.useEffect(() => {
  //   console.log(createState.value);
  // });

  useEffect(() => {
      console.log(groupID.value);
      const t = group.value.find((item) => item.id === groupID.value);
      console.log(t.role);
      Object.entries(t.role).map(([key, value]) => {
          console.log("key",key);
          console.log(value);
      })

  })

  const [name, setName] = useState("");
  const [subinfo, setSubinfo] = useState("");
  //   const handleCreate = () => {
  //     if (name !== "" || subinfo !== "") {
  //       idplus.value += 1;
  //       newdb.value = {
  //         ...newdb.value,
  //         id: idplus.value,
  //         name: name,
  //         subinfo: subinfo,
  //       };
  //       const arr = {
  //         groupid: idplus.value,
  //         users: [],
  //       }
  //       groupUser.value.push(arr);
  //       group.value.push(newdb.value);
  //       newdb.value = temp.value;
  //       console.log(group.value, groupUser.value);
  //       createState.value = false;
  //     }
  //   };
  return (
    <>
      <div className="DAT_CreateGroupRole">
        <div className="DAT_CreateGroupRole_Header">
          <div className="DAT_CreateGroupRole_Header_Left">
            <p style={{ fontSize: "20px" }}>Tạo nhóm mới</p>
          </div>
          <div className="DAT_CreateGroupRole_Header_Right">
            <div
              className="DAT_CreateGroupRole_Header_Right_Save"
              //   onClick={() => handleCreate()}
            >
              <FaSave size={20} color="white" />
              <span>Lưu</span>
            </div>
            <div className="DAT_CreateGroupRole_Header_Right_Close">
              <RxCross2
                size={20}
                color="white"
                onClick={() => (editState.value = false)}
              />
            </div>
          </div>
        </div>

        <div className="DAT_CreateGroupRole_Body">
          <div className="DAT_CreateGroupRole_Body_Item">
            <h4>Nhập thông tin nhóm mới và các chức năng trong nhóm</h4>
            <div className="DAT_CreateGroupRole_Body_Item_Input">
              <span>Tên nhóm:</span>
              <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="DAT_CreateGroupRole_Body_Item_Input">
              <span>Thông tin nhóm:</span>
              <input type="text" onChange={(e) => setSubinfo(e.target.value)} />
            </div>
            <div className="DAT_CreateGroupRole_Body_Item_Checkbox">
                {Object.entries(group.value.find((item) => item.id === groupID.value).role).map(([key, value]) => (
                    <CheckBox 
                        info={value.lang}
                        key={key}
                        status={value.status}
                        num={String(key)}
                    />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}