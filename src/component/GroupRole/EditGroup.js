import React, { useEffect, useState } from "react";
import { editState, group, groupEdit, groupID, groupUser } from "./GroupRole";
import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "./GroupRole.scss";
import { signal } from "@preact/signals-react";
import { useIntl } from "react-intl";

const CheckBox = (props) => {
  const handleCheck = (e) => {
    groupEdit.value = {
      ...groupEdit.value,
      role: {
        ...groupEdit.value.role,
        [props.num]: {
          ...groupEdit.value.role[props.num],
          status: e.target.checked,
        },
      },
    };
  };

  return (
    <div className="DAT_CreateGroupRole_Body_Item_Checkbox_Option">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultChecked={props.status}
          id={props.info}
          onChange={(e) => handleCheck(e)}
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
  const dataLang = useIntl();
  const [name, setName] = useState(groupEdit.value.name);
  const [code, setCode] = useState(groupEdit.value.code);

  const handleSave = () => {
    const t = group.value.findIndex((item) => item.id == groupEdit.value.id);
    group.value[t] = {
      ...group.value[t],
      name: name,
      code: code,
      role: groupEdit.value.role,
    }
    editState.value = false;
    console.log(group.value);
  };


  const handleEditName = (e) => {
    setName(e.currentTarget.value);
  };

  const handleEditCode = (e) => {
    setCode(e.currentTarget.value);
  };

  return (
    <>
      <div className="DAT_CreateGroupRole">
        <div className="DAT_CreateGroupRole_Header">
          <div className="DAT_CreateGroupRole_Header_Left">
            <p style={{ fontSize: "20px" }}>{dataLang.formatMessage({ id: 'editGroup' })}</p>
          </div>
          <div className="DAT_CreateGroupRole_Header_Right">
            <div
              className="DAT_CreateGroupRole_Header_Right_Save"
              onClick={() => handleSave()}
            >
              <FaSave size={20} color="white" />
              <span>{dataLang.formatMessage({ id: 'save' })}</span>
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
            <h4>{dataLang.formatMessage({ id: 'grouproleInfo' })}</h4>
            <div className="DAT_CreateGroupRole_Body_Item_Input">
              <span>{dataLang.formatMessage({ id: 'groupName' })}:</span>
              <input
                type="text"
                value={name}
                onChange={(e) => handleEditName(e)}
              />
            </div>
            <div className="DAT_CreateGroupRole_Body_Item_Input">
              <span>{dataLang.formatMessage({ id: 'groupInfo' })}:</span>
              <input
                type="text"
                value={code}
                onChange={(e) => handleEditCode(e)}
              />
            </div>
            <div className="DAT_CreateGroupRole_Body_Item_Checkbox">
              {Object.entries(groupEdit.value.role).map(([key, value]) => (
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
