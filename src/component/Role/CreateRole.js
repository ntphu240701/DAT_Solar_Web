import React, { useRef } from "react";
import "./Role.scss";

import { roleState } from "./Role";
import { useIntl } from "react-intl";
import { alertDispatch } from "../Alert/Alert";
import { partnerInfor } from "../../App";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";

import { RxCross2 } from "react-icons/rx";
import { IoSaveOutline } from "react-icons/io5";

export default function CreateRole(props) {
  const datalang = useIntl();
  const username = useRef();
  const mail = useRef();
  const pwd = useRef();
  const authpwd = useRef();
  const name = useRef();
  const phone = useRef();
  const role = useRef();
  const dataLang = useIntl();

  const handleSave = async (e) => {
    e.preventDefault();

    if (pwd.current.value === authpwd.current.value) {
      let res = await callApi("post", host.AUTH + "/CheckUser", {
        usr: username.current.value,
        mail: mail.current.value,
        code: partnerInfor.value.code,
      });
      console.log(res);
      if (res.status) {
        console.log(window.location.host);
        let register = await callApi("post", host.AUTH + "/Register", {
          usr: username.current.value,
          mail: mail.current.value,
          pwd: pwd.current.value,
          name: name.current.value,
          phone: phone.current.value,
          addr: "--",
          type: role.current.value,
          code: partnerInfor.value.code,
          host: window.location.host,
        });
        console.log(register);
        if (register.status) {
          roleState.value = "default";
          alertDispatch(datalang.formatMessage({ id: "alert_6" }));
        } else {
          alertDispatch(datalang.formatMessage({ id: "alert_7" }));
        }
      } else {
        if (res.number === 0) {
          alertDispatch(datalang.formatMessage({ id: "alert_10" }));
        } else {
          alertDispatch(datalang.formatMessage({ id: "alert_7" }));
        }
      }
    } else {
      alertDispatch(datalang.formatMessage({ id: "alert_18" }));
    }
  };

  return (
    <form className="DAT_CreateRole" onSubmit={handleSave}>
      <div className="DAT_CreateRole_Header">
        <div className="DAT_CreateRole_Header_Left">
          {dataLang.formatMessage({ id: "createAccount" })}
        </div>

        <div className="DAT_CreateRole_Header_Right">
          <button className="DAT_CreateRole_Header_Right_Save">
            <IoSaveOutline size={20} color="rgba(11, 25, 103)" />
            <span>{dataLang.formatMessage({ id: "save" })}</span>
          </button>
          <div
            className="DAT_CreateRole_Header_Right_Close"
            onClick={() => (roleState.value = "default")}
          >
            <RxCross2 size={20} color="white" />
          </div>
        </div>
      </div>

      <div className="DAT_CreateRole_Body">
        <div className="DAT_CreateRole_Body_Row2">
          <div className="DAT_CreateRole_Body_Row2_Left">
            <div className="DAT_CreateRole_Body_Row2_Left_Content">
              <div className="DAT_CreateRole_Body_Row2_Left_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>
                  {dataLang.formatMessage({ id: "account" })}:
                </span>
              </div>
              <input
                type="text"
                ref={username}
                minLength="6"
                onChange={(e) =>
                (username.current.value = e.target.value
                  .trim()
                  .toLocaleLowerCase())
                }
                required
              />
            </div>
          </div>

          <div className="DAT_CreateRole_Body_Row2_Right">
            <div className="DAT_CreateRole_Body_Row2_Right_Content">
              <div className="DAT_CreateRole_Body_Row2_Right_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Email:</span>
              </div>
              <input type="email" ref={mail} required></input>
            </div>
          </div>
        </div>

        <div className="DAT_CreateRole_Body_Row2">
          <div className="DAT_CreateRole_Body_Row2_Left">
            <div className="DAT_CreateRole_Body_Row2_Left_Content">
              <div className="DAT_CreateRole_Body_Row2_Left_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>
                  {dataLang.formatMessage({ id: "name" })}:
                </span>
              </div>
              <input type="text" ref={name} required minLength="6" />
            </div>
          </div>

          <div className="DAT_CreateRole_Body_Row2_Right">
            <div className="DAT_CreateRole_Body_Row2_Right_Content">
              <div className="DAT_CreateRole_Body_Row2_Right_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>
                  {dataLang.formatMessage({ id: "phone" })}:
                </span>
              </div>
              <input type="number" ref={phone} required minLength="10" />
            </div>
          </div>
        </div>

        <div className="DAT_CreateRole_Body_Row2">
          <div className="DAT_CreateRole_Body_Row2_Left">
            <div className="DAT_CreateRole_Body_Row2_Left_Content">
              <div className="DAT_CreateRole_Body_Row2_Left_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>
                  {dataLang.formatMessage({ id: "password" })}:
                </span>
              </div>
              <input type="password" ref={pwd} required minLength="6" />
            </div>
          </div>

          <div className="DAT_CreateRole_Body_Row2_Right">
            <div className="DAT_CreateRole_Body_Row2_Right_Content">
              <div className="DAT_CreateRole_Body_Row2_Right_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>
                  {dataLang.formatMessage({ id: "auth_pwd" })}:
                </span>
              </div>
              <input type="password" ref={authpwd} required minLength="6" />
            </div>
          </div>
        </div>

        <div className="DAT_CreateRole_Body_Row2">
          <div className="DAT_CreateRole_Body_Row2_Left">
            <div className="DAT_CreateRole_Body_Row2_Left_Content">
              <div className="DAT_CreateRole_Body_Row2_Left_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>
                  {dataLang.formatMessage({ id: "account" })}:
                </span>
              </div>
              <select ref={role}>
                <option value="admin">
                  {dataLang.formatMessage({ id: "admin" })}
                </option>
                <option value="user">
                  {dataLang.formatMessage({ id: "user" })}
                </option>
                {/* {datarule.value
                  .filter((item, key) => item.ruleid_ !== 1)
                  .map((item, key) => (
                    <option key={key} value={item.ruleid_}>
                      {item.rulename_}
                    </option>
                  ))} */}
              </select>
            </div>
          </div>

          <div className="DAT_CreateRole_Body_Row2_Right"></div>
        </div>
      </div>
    </form>
  );
}
