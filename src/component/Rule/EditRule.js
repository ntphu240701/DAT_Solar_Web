import React, { useEffect, useRef } from "react";
import "./Rule.scss";

import { signal } from "@preact/signals-react";
import { isMobile } from "../Navigation/Navigation";
import { datarule, editRuleState } from "./Rule";
import { ruletitle } from "./CreateRule";
import { alertDispatch } from "../Alert/Alert";
import { useIntl } from "react-intl";

import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoSaveOutline } from "react-icons/io5";

export const editruledata = signal();

export const CheckBox = (props) => {
  const handleShow = (e) => {
    let arr = props.html.split("_");
    console.log(arr[0]);
    switch (arr[0]) {
      case "alert":
        editruledata.value = {
          ...editruledata.value,
          setting: {
            ...editruledata.value.setting,
            alert: {
              ...editruledata.value.setting.alert,
              option: {
                ...editruledata.value.setting.alert.option,
                [props.num]: {
                  ...editruledata.value.setting.alert.option[props.num],
                  status: e.target.checked,
                },
              },
            },
          },
        };
        break;
      case "device":
        editruledata.value = {
          ...editruledata.value,
          setting: {
            ...editruledata.value.setting,
            device: {
              ...editruledata.value.setting.device,
              option: {
                ...editruledata.value.setting.device.option,
                [props.num]: {
                  ...editruledata.value.setting.device.option[props.num],
                  status: e.target.checked,
                },
              },
            },
          },
        };
        break;
      case "partner":
        editruledata.value = {
          ...editruledata.value,
          setting: {
            ...editruledata.value.setting,
            partner: {
              ...editruledata.value.setting.partner,
              option: {
                ...editruledata.value.setting.partner.option,
                [props.num]: {
                  ...editruledata.value.setting.partner.option[props.num],
                  status: e.target.checked,
                },
              },
            },
          },
        };
        break;
      case "plant":
        editruledata.value = {
          ...editruledata.value,
          setting: {
            ...editruledata.value.setting,
            plant: {
              ...editruledata.value.setting.plant,
              option: {
                ...editruledata.value.setting.plant.option,
                [props.num]: {
                  ...editruledata.value.setting.plant.option[props.num],
                  status: e.target.checked,
                },
              },
            },
          },
        };
        break;
      case "report":
        editruledata.value = {
          ...editruledata.value,
          setting: {
            ...editruledata.value.setting,
            report: {
              ...editruledata.value.setting.report,
              option: {
                ...editruledata.value.setting.report.option,
                [props.num]: {
                  ...editruledata.value.setting.report.option[props.num],
                  status: e.target.checked,
                },
              },
            },
          },
        };
        break;
      case "rule":
        editruledata.value = {
          ...editruledata.value,
          setting: {
            ...editruledata.value.setting,
            rule: {
              ...editruledata.value.setting.rule,
              option: {
                ...editruledata.value.setting.rule.option,
                [props.num]: {
                  ...editruledata.value.setting.rule.option[props.num],
                  status: e.target.checked,
                },
              },
            },
          },
        };
        break;
      default: break;
    }
    console.log(editruledata.value);
  };

  useEffect(() => {
    console.log(editruledata.value)// lay tu datarule amin
  }, [])

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
  const dataLang = useIntl()
  const [widthCheckBox, setWidwidthCheckBox] = React.useState("");
  const rulenameRef = useRef(editruledata.value.name);

  const TypeReport = (props) => {
    const handelChangeRuleName = (e) => {
      rulenameRef.current = e.target.value;
    };

    return (
      <div className="DAT_CreateRule_Body_Item">
        <div className="DAT_CreateRule_Body_Item_Data">
          <div className="DAT_CreateRule_Body_Item_Data_Name">
            <label>{dataLang.formatMessage({ id: 'ruleName' })}: </label>
            <input
              type="text"
              placeholder={dataLang.formatMessage({ id: 'required' })}
              required
              id="reportname"
              defaultValue={rulenameRef.current}
              onChange={(e) => handelChangeRuleName(e)}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleSave = () => {
    if (rulenameRef.current !== "") {
      editruledata.value = {
        ...editruledata.value,
        name: rulenameRef.current,
      };
      const i = datarule.value.findIndex(
        (item) => item.ruleid === editruledata.value.ruleid
      )
      datarule.value = [
        ...datarule.value.slice(0, i),
        editruledata.value,
        ...datarule.value.slice(i + 1),
      ]
      editRuleState.value = false;
      alertDispatch(dataLang.formatMessage({ id: 'alert_21' }))
    } else {
      alertDispatch(dataLang.formatMessage({ id: 'alert_22' }));
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
    <div className="DAT_CreateRule">
      <div className="DAT_CreateRule_Header">
        <div className="DAT_CreateRule_Header_Left">
          <p style={{ fontSize: "20px" }}>{dataLang.formatMessage({ id: 'edits' })}</p>
        </div>
        <div className="DAT_CreateRule_Header_Right">
          <div className="DAT_CreateRule_Header_Right_Save"
            onClick={() => handleSave()}
          >
            <IoSaveOutline size={20} color="white" />
            <span>{dataLang.formatMessage({ id: 'save' })}</span>
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
            <label style={{ margin: "0" }}>{dataLang.formatMessage({ id: 'ruleOptions' })}</label>
            {ruletitle.value.map((item, key) => (
              <div className="DAT_CreateRule_Body_Item_Option_Check"
                key={key}
              >
                <p style={{ color: "grey" }}>
                  {dataLang.formatMessage({ id: editruledata.value.setting[item].lang })}
                </p>
                {Object.entries(editruledata.value.setting[item].option).map(
                  ([key, value]) => (
                    <CheckBox
                      key={key}
                      num={String(key)}
                      tab={item + "_content"}
                      status={value.status}
                      id={dataLang.formatMessage({ id: value.lang })}
                      html={item + "_" + key}
                      width={widthCheckBox}
                    />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
