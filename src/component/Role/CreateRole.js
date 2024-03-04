import React, { useEffect, useRef } from "react";
import "./Role.scss";

import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { roleState } from "./Role";
import { useIntl } from "react-intl";
import { alertDispatch } from "../Alert/Alert";
import { partnerInfor } from "../../App";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";


function CreateRole(props) {
  const datalang = useIntl();
  const username = useRef();
  const mail = useRef();
  const pwd = useRef();
  const authpwd = useRef();
  const name = useRef();
  const phone = useRef();
  const role = useRef();

  // const validateEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // }
  // const checkLength = (inputString, minLength, maxLength) => {
  //   const length = inputString.length;
  //   return length >= minLength && length <= maxLength;
  // }


  const handleSave = async (e) => {
    e.preventDefault();

    if (pwd.current.value === authpwd.current.value) {

      let res = await callApi('post', host.AUTH + '/CheckUser', { usr: username.current.value, mail: mail.current.value, code: partnerInfor.value.code })
      console.log(res)
      if (res.status) {
        console.log(window.location.host)
        let register = await callApi('post', host.AUTH + '/Register', { usr: username.current.value, mail: mail.current.value, pwd: pwd.current.value, name: name.current.value, phone: phone.current.value, addr: '--', type: role.current.value, code: partnerInfor.value.code, host: window.location.host })
        if (register.status) {
          alertDispatch(datalang.formatMessage({ id: "alert_6" }))
        } else {
          alertDispatch(datalang.formatMessage({ id: "alert_7" }))
        }
      } else {
        if (res.number === 0) {
          alertDispatch(datalang.formatMessage({ id: "alert_10" }))
        } else {
          alertDispatch(datalang.formatMessage({ id: "alert_7" }))
        }
      }
    } else {
      alertDispatch(datalang.formatMessage({ id: "alert_18" }))
    }

  }


  return (
    <form className="DAT_CreateRole" onSubmit={handleSave}>
      <div className="DAT_CreateRole_Header" >
        <div className="DAT_CreateRole_Header_Left">Thêm người dùng</div>

        <div className="DAT_CreateRole_Header_Right">
          <button className="DAT_CreateRole_Header_Right_Save" >
            <FaSave size={20} color="white" />
            <span>Lưu</span>
          </button>
          <div className="DAT_CreateRole_Header_Right_Close">
            <RxCross2
              size={20}
              color="white"
              onClick={() => (roleState.value = "default")}
            />
          </div>
        </div>
      </div>

      <div className="DAT_CreateRole_Body">
        {/* <div className="DAT_CreateRole_Body_Row1">
          <div className="DAT_CreateRole_Body_Row1_Left">
            <div className="DAT_CreateRole_Body_Row1_Left_Content">
              <div>
                <input
                  id="email"
                  type="radio"
                  defaultChecked={true}
                  ref={email}
                  onChange={(e) => handleCheck(e)}
                />
                E-mail
              </div>

              <div>
                <input
                  id="phone"
                  type="radio"
                  ref={phone}
                  onChange={(e) => handleCheck(e)}
                />
                Số điện thoại
              </div>
            </div>
          </div>

          <div className="DAT_CreateRole_Body_Row1_Right">
            <div className="DAT_CreateRole_Body_Row1_Right_Content"></div>
          </div>
        </div> */}

        <div className="DAT_CreateRole_Body_Row2">
          <div className="DAT_CreateRole_Body_Row2_Left">
            <div className="DAT_CreateRole_Body_Row2_Left_Content">
              <div className="DAT_CreateRole_Body_Row2_Left_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Tài khoản:</span>
              </div>
              <input type="text" ref={username} minLength="6" onChange={(e) => username.current.value = e.target.value.trim().toLocaleLowerCase()} required />
            </div>
          </div>

          <div className="DAT_CreateRole_Body_Row2_Right">
            <div className="DAT_CreateRole_Body_Row2_Right_Content">
              <div className="DAT_CreateRole_Body_Row2_Right_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Email:</span>
              </div>
              <input type="email" ref={mail} required  ></input>
            </div>
          </div>
        </div>

        <div className="DAT_CreateRole_Body_Row2">
          <div className="DAT_CreateRole_Body_Row2_Left">
            <div className="DAT_CreateRole_Body_Row2_Left_Content">
              <div className="DAT_CreateRole_Body_Row2_Left_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Tên:</span>
              </div>
              <input type="text" ref={name} required minLength="6" />
            </div>
          </div>

          <div className="DAT_CreateRole_Body_Row2_Right">
            <div className="DAT_CreateRole_Body_Row2_Right_Content">
              <div className="DAT_CreateRole_Body_Row2_Right_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Số điện thoại:</span>
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
                <span style={{ color: "grey" }}>Mật khẩu:</span>
              </div>
              <input type="password" ref={pwd} required minLength="6" />
            </div>
          </div>

          <div className="DAT_CreateRole_Body_Row2_Right">
            <div className="DAT_CreateRole_Body_Row2_Right_Content">
              <div className="DAT_CreateRole_Body_Row2_Right_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Xác nhận mật khẩu:</span>
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
                <span style={{ color: "grey" }}>Phân quyền:</span>
              </div>
              <select ref={role}>
                <option value="user" >User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="DAT_CreateRole_Body_Row2_Right">
            {/* <div className="DAT_CreateRole_Body_Row2_Right_Content">
              <div className="DAT_CreateRole_Body_Row2_Right_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Tên dự án:</span>
              </div>
              <input></input>
            </div> */}
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateRole;
