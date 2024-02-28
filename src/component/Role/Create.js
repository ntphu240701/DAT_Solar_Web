import React, { useEffect, useRef } from "react";
import "./Role.scss";

import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { roleState } from "./Role";
import { signal } from "@preact/signals-react";

const check = signal("email");

function Create(props) {
  const email = useRef();
  const phone = useRef();

  //   useEffect(() => {
  //     console.log("roleState.value", email.current);
  //   }, []);

  const handleCheck = (e) => {
    if (e.target.id === "email") {
      //   email.current.checked = true;
      phone.current.checked = false;
      check.value = "email";
    } else {
      email.current.checked = false;
      check.value = "phone";
      //   phone.current.checked = true;
    }
  };

  return (
    <div className="DAT_Create">
      <div className="DAT_Create_Header">
        <div className="DAT_Create_Header_Left">Thêm người dùng</div>

        <div className="DAT_Create_Header_Right">
          <div className="DAT_Create_Header_Right_Save">
            <FaSave size={20} color="white" />
            <span>Lưu</span>
          </div>
          <div className="DAT_Create_Header_Right_Close">
            <RxCross2
              size={20}
              color="white"
              onClick={() => (roleState.value = "default")}
            />
          </div>
        </div>
      </div>

      <div className="DAT_Create_Body">
        <div className="DAT_Create_Body_Row1">
          <div className="DAT_Create_Body_Row1_Left">
            <div className="DAT_Create_Body_Row1_Left_Content">
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

          <div className="DAT_Create_Body_Row1_Right">
            <div className="DAT_Create_Body_Row1_Right_Content"></div>
          </div>
        </div>

        <div className="DAT_Create_Body_Row2">
          <div className="DAT_Create_Body_Row2_Left">
            <div className="DAT_Create_Body_Row2_Left_Content">
              <div className="DAT_Create_Body_Row2_Left_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Tên:</span>
              </div>
              <input></input>
            </div>
          </div>

          <div className="DAT_Create_Body_Row2_Right">
            <div className="DAT_Create_Body_Row2_Right_Content">
              {check.value === "email" ? (
                <>
                  <div className="DAT_Create_Body_Row2_Right_Content_Tit">
                    <span style={{ color: "red" }}>* </span>
                    <span style={{ color: "grey" }}>Email:</span>
                  </div>
                  <input></input>
                </>
              ) : (
                <>
                  <div className="DAT_Create_Body_Row2_Right_Content_Tit">
                    <span style={{ color: "red" }}>* </span>
                    <span style={{ color: "grey" }}>Số điện thoại:</span>
                  </div>
                  <input></input>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="DAT_Create_Body_Row2">
          <div className="DAT_Create_Body_Row2_Left">
            <div className="DAT_Create_Body_Row2_Left_Content">
              <div className="DAT_Create_Body_Row2_Left_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Username:</span>
              </div>
              <input></input>
            </div>
          </div>

          <div className="DAT_Create_Body_Row2_Right">
            <div className="DAT_Create_Body_Row2_Right_Content">
              <div className="DAT_Create_Body_Row2_Right_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Mật khẩu:</span>
              </div>
              <input></input>
            </div>
          </div>
        </div>

        <div className="DAT_Create_Body_Row2">
          <div className="DAT_Create_Body_Row2_Left">
            <div className="DAT_Create_Body_Row2_Left_Content">
              <div className="DAT_Create_Body_Row2_Left_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Quyền:</span>
              </div>
              <select>
                <option>Chỉ xem dự án</option>
                <option>Chỉ xem dự án</option>
                <option>Chỉ xem dự án</option>
                <option>Chỉ xem dự án</option>
              </select>
            </div>
          </div>

          <div className="DAT_Create_Body_Row2_Right">
            {/* <div className="DAT_Create_Body_Row2_Right_Content">
              <div className="DAT_Create_Body_Row2_Right_Content_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Tên dự án:</span>
              </div>
              <input></input>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
