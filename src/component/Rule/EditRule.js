import React, { useEffect, useRef, useState } from "react";
import "./Rule.scss";

import { signal } from "@preact/signals-react";
import { isMobile } from "../Navigation/Navigation";
import { datarule, editRuleState } from "./Rule";
import { alertDispatch } from "../Alert/Alert";
import { useIntl } from "react-intl";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { COLOR } from "../../App";

import { RxCross2 } from "react-icons/rx";
import { IoSaveOutline } from "react-icons/io5";

const temp = signal();

export const editruledata = signal();

export const CheckBox = (props) => {
  const handleShow = (e) => {
    let arr = props.html.split("_");
    console.log(arr[0]);
    temp.value = {
      ...editruledata.value,
    };
    editruledata.value.setting[props.rights][props.custom] = e.target.checked;
  };

  return (
    <div className="DAT_CreateRule_Body_Item_Option_Check_SingleCheck"
      style={{ width: props.width }}
    >
      <div className="form-check">
        <input className="form-check-input"
          type="checkbox"
          value=""
          id={props.html}
          defaultChecked={props.status}
          onChange={(e) => {
            handleShow(e);
          }}
        />
        <label className="form-check-label"
          style={{ cursor: "pointer", fontSize: "15px", color: "grey" }}
          htmlFor={props.html}
        >
          {props.id}
        </label>
      </div>
    </div>
  );
};

export default function EditRule() {
  const dataLang = useIntl();
  const [widthCheckBox, setWidwidthCheckBox] = useState("");
  const rulenameRef = useRef();

  const TypeReport = (props) => {
    return (
      <div className="DAT_CreateRule_Body_Item"
        style={{ borderBottom: "dashed 1px rgba(198, 197, 197, 0.5)" }}
      >
        <div className="DAT_CreateRule_Body_Item_Data">
          <div className="DAT_CreateRule_Body_Item_Data_Name">
            <label>{dataLang.formatMessage({ id: "ruleName" })}: </label>
            <input
              type="text"
              placeholder={dataLang.formatMessage({ id: "required" })}
              required
              id="reportname"
              defaultValue={editruledata.value.rulename_}
              ref={rulenameRef}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleSave = async () => {
    if (rulenameRef.current.value !== "") {
      let d = await callApi("post", host.DATA + "/updateRule", {
        ruleid: editruledata.value.ruleid_,
        name: rulenameRef.current.value,
        setting: JSON.stringify(editruledata.value.setting),
      });
      if (d.status) {
        let newData = datarule.value;
        let index = newData.findIndex(
          (d) => d.ruleid_ == editruledata.value.ruleid_
        );
        newData[index].rulename_ = rulenameRef.current.value;
        datarule.value = [...newData];
        editRuleState.value = false;
        alertDispatch(dataLang.formatMessage({ id: "alert_6" }));
      } else {
        alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
      }
    }
  };

  useEffect(() => {
    if (isMobile.value) {
      setWidwidthCheckBox("50%");
    } else {
      setWidwidthCheckBox("25%");
    }
  }, [isMobile.value]);

  return (
    <div className="DAT_CreateRule">
      <div className="DAT_CreateRule_Header">
        <div className="DAT_CreateRule_Header_Left">
          <p>
            {dataLang.formatMessage({ id: "editRule" })}
          </p>
        </div>
        <div className="DAT_CreateRule_Header_Right">
          <div className="DAT_CreateRule_Header_Right_Save"
            onClick={() => handleSave()}
          >
            <IoSaveOutline size={20} color={COLOR.value.PrimaryColor} />
            <span>{dataLang.formatMessage({ id: "save" })}</span>
          </div>
          <div className="DAT_CreateRule_Header_Right_Close">
            <RxCross2
              size={20}
              color="white"
              onClick={() => (editRuleState.value = false)}
            />
          </div>
        </div>
      </div>

      <div className="DAT_CreateRule_Body">
        <TypeReport />
        <div className="DAT_CreateRule_Body_Item">
          <div className="DAT_CreateRule_Body_Item_Option">
            <label className="DAT_CreateRule_Body_Item_Option_Title"
              style={{ margin: "0" }}
            >
              {dataLang.formatMessage({ id: "ruleOptions" })}
            </label>

            {Object.entries(editruledata.value.setting).map(
              ([key, value], index) => (
                <div className="DAT_CreateRule_Body_Item_Option_Check"
                  key={key}
                >
                  <p style={{ color: "grey" }}>
                    {dataLang.formatMessage({ id: key })}
                  </p>
                  {Object.entries(value).map(([key_, value_], index_) => (
                    <CheckBox
                      key={index_}
                      rights={key}
                      custom={key_}
                      status={value_}
                      id={dataLang.formatMessage({ id: key_ })}
                      html={index + "_" + index_}
                      width={widthCheckBox}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
