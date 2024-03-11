import React, { useState } from "react";
import "./GroupRole.scss";

import { createState, group, groupUser } from "./GroupRole";
import { alertDispatch } from "../Alert/Alert";
import { signal } from "@preact/signals-react";
import { useIntl } from "react-intl";

import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";

const idplus = signal(2);
const newdb = signal({
  id_: 0,
  name_: "",
  code_: "",
  // role: {
  //   1: { lang: "role1", status: false },
  //   2: { lang: "role2", status: false },
  //   3: { lang: "role3", status: false },
  //   4: { lang: "role4", status: false },
  // },
});
const temp = signal(newdb.value);

const CheckBox = (props) => {
  const handleCheck = (e) => {
    newdb.value = {
      ...newdb.value,
      role: {
        ...newdb.value.role,
        [props.num]: {
          ...newdb.value.role[props.num],
          status: e.target.checked,
        },
      },
    };
    console.log(newdb.value);
  };

  return (
    <div className="DAT_CreateGroupRole_Body_Item_Checkbox_Option">
      <div className="form-check">
        <input className="form-check-input"
          type="checkbox"
          id={props.info}
          onChange={(e) => handleCheck(e)}
        />
        <label className="form-check-label"
          style={{ cursor: "pointer", fontSize: "15px", color: "grey" }}
          htmlFor={props.info}
        >
          {props.info}
        </label>
      </div>
    </div>
  );
};

export default function CreateGroupRole() {
  const dataLang = useIntl();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const handleCreate = async () => {
    if (name !== "" && code !== "") {
      //idplus.value += 1;

      let res = await callApi("post", host.DATA + "/addPartner", {
        name: name,
        code: code
      });
      console.log(res);
      if (res.status) {

        group.value = [
          ...group.value,
          res.data
        ]

        // newdb.value = {
        //   ...newdb.value,
        //   id_: idplus.value,
        //   name_: name,
        //   code_: code,
        // };
        // const arr = {
        //   groupid: idplus.value,
        //   users: [],
        // }
        // groupUser.value.push(arr);
        // group.value.push(newdb.value);
        // newdb.value = temp.value;
        // console.log(group.value);
        createState.value = false;
        alertDispatch(dataLang.formatMessage({ id: "alert_31" }))
      }else{
        alertDispatch(dataLang.formatMessage({ id: "alert_7" }))
      }

    } else {
      alertDispatch(dataLang.formatMessage({ id: "alert_22" }))
    }
  };

  return (
    <>
      <div className="DAT_CreateGroupRole">
        <div className="DAT_CreateGroupRole_Header">
          <div className="DAT_CreateGroupRole_Header_Left">
            <p style={{ fontSize: "20px" }}>{dataLang.formatMessage({ id: 'createNewGroup' })}</p>
          </div>

          <div className="DAT_CreateGroupRole_Header_Right">
            <div className="DAT_CreateGroupRole_Header_Right_Save"
              onClick={() => handleCreate()}
            >
              <FaSave size={20} color="white" />
              <span>{dataLang.formatMessage({ id: 'save' })}</span>
            </div>
            <div className="DAT_CreateGroupRole_Header_Right_Close" onClick={() => (createState.value = false)}>
              <RxCross2
                size={20}
                color="white"
              />
            </div>
          </div>
        </div>

        <div className="DAT_CreateGroupRole_Body">
          <div className="DAT_CreateGroupRole_Body_Item">
            <h4>{dataLang.formatMessage({ id: 'grouproleInfo' })}</h4>
            <div className="DAT_CreateGroupRole_Body_Item_Input" style={{ marginBottom: "0px" }}>
              <span>{dataLang.formatMessage({ id: 'groupName' })}:</span>
              <input type="text" onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="DAT_CreateGroupRole_Body_Item_Input" >
              <span>{dataLang.formatMessage({ id: 'join' })}:</span>
              <input type="text" onChange={(e) => setCode(e.target.value)} required />
            </div>

            {/* <div className="DAT_CreateGroupRole_Body_Item_Checkbox">
              {Object.entries(newdb.value.role).map(([key, value]) => (
                <CheckBox
                  info={value.lang}
                  key={key}
                  status={value.status}
                  num={String(key)}
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
