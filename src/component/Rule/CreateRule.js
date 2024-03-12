import React, { useEffect, useRef, useState } from "react";
import "./Rule.scss";

import { signal } from "@preact/signals-react";
import { isMobile } from "../Navigation/Navigation";
import { createruleState, datarule } from "./Rule";
import { useIntl } from "react-intl";

import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoSaveOutline } from "react-icons/io5";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { userInfor } from "../../App";
import { json } from "react-router-dom";
import { alertDispatch } from "../Alert/Alert";

const temp = signal({
  ruleid_: 0,
  rulename_: "",
  setting: {
    contact: { edit: false },
    device: { add: false, modify: false, remove: false },
    project: {
      add: false,
      modify: false,
      remove: false,
    },
    report: {
      add: false,
      modify: false,
      remove: false,
    },
    rule: {
      active: false,
      add: false,
      modify: false,
      remove: false,
    },
    user: { add: false, modify: false, remove: false },
    warn: { remove: false },
    partner: {
      modify: false,
    },
  },
});

const newruledata = signal(temp.value);

export const ruletitle = signal([
  "alert",
  "device",
  "partner",
  "plant",
  "report",
  "rule",
]);

export const CheckBox = (props) => {
  const handleShow = (e) => {
    let arr = props.html.split("_");
    console.log(arr[0]);
    newruledata.value.setting[props.rights][props.custom] = e.target.checked;
    console.log(newruledata.value);
  };

  return (
    <div
      className="DAT_CreateRule_Body_Item_Option_Check_SingleCheck"
      style={{ width: props.width }}
    >
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id={props.html}
          onChange={(e) => {
            handleShow(e);
          }}
        ></input>
        <label
          style={{ cursor: "pointer", fontSize: "15px", color: "grey" }}
          className="form-check-label"
          htmlFor={props.html}
        >
          {props.id}
        </label>
      </div>
    </div>
  );
};

export default function CreateRule() {
  const dataLang = useIntl();
  const [widthCheckBox, setWidwidthCheckBox] = useState("");
  const rulenameRef = useRef("");

  const TypeReport = (props) => {
    const handerChangeReportName = (e) => {
      rulenameRef.current = e.target.value;
      //   console.log(rulenameRef.current);
    };

    return (
      <div className="DAT_CreateRule_Body_Item">
        <div className="DAT_CreateRule_Body_Item_Data">
          <div className="DAT_CreateRule_Body_Item_Data_Name">
            <label>{dataLang.formatMessage({ id: "ruleName" })}: </label>
            <input
              type="text"
              placeholder={dataLang.formatMessage({ id: "required" })}
              required
              id="reportname"
              defaultValue={rulenameRef.current}
              onChange={(e) => handerChangeReportName(e)}
            ></input>
          </div>
        </div>
      </div>
    );
  };

  const handleCreate = async () => {
    // console.log(rulenameRef.current,  userInfor.value.partnerid, JSON.stringify(newruledata.value.setting));
    if (rulenameRef.current !== "") {
      const createRule = await callApi("post", host.DATA + "/addRule", {
        name: rulenameRef.current,
        partnerid: userInfor.value.partnerid,
        setting:  JSON.stringify(newruledata.value.setting),
      });
      if (createRule.status) {
        datarule.value = [...datarule.value, createRule.data];
        createruleState.value = false;
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
    // console.log(isMobile.value);
  }, [isMobile.value]);

  return (
    <div>
      <div className="DAT_CreateRule">
        <div className="DAT_CreateRule_Header">
          <div className="DAT_CreateRule_Header_Left">
            <p style={{ fontSize: "20px" }}>
              {dataLang.formatMessage({ id: "newRule" })}
            </p>
          </div>
          <div className="DAT_CreateRule_Header_Right">
            <div
              className="DAT_CreateRule_Header_Right_Save"
              onClick={() => handleCreate()}
            >
              <IoSaveOutline size={20} color="white" />
              <span>{dataLang.formatMessage({ id: 'save' })}</span>
            </div>
            <div
              className="DAT_CreateRule_Header_Right_Close"
              onClick={() => (createruleState.value = false)}
            >
              <RxCross2 size={20} color="white" />
            </div>
          </div>
        </div>

        <div className="DAT_CreateRule_Body">
          <TypeReport />
          <div className="DAT_CreateRule_Body_Item">
            <div className="DAT_CreateRule_Body_Item_Option">
              <label style={{ margin: "0" }}>
                {dataLang.formatMessage({ id: "ruleOptions" })}
              </label>

              {Object.entries(newruledata.value.setting).map(
                ([key, value], index) => (
                  <div
                    className="DAT_CreateRule_Body_Item_Option_Check"
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
    </div>
  );
}
