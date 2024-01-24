import React from "react";
import "./Project.scss";
import { plantState, projectData } from "./Project";

import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function EditProject(props) {
  return (
    <div className="DAT_EditProject">
      <div className="DAT_EditProject_Header">
        <div className="DAT_EditProject_Header_Left">Chỉnh Sửa Dự Án</div>

        <div className="DAT_EditProject_Header_Right">
          <div className="DAT_EditProject_Header_Right_Save">
            <FaSave size={20} color="white" />
            <span>Lưu</span>
          </div>
          <div className="DAT_EditProject_Header_Right_Close">
            <RxCross2
              size={20}
              color="white"
              onClick={() => (plantState.value = "default")}
            />
          </div>
        </div>
      </div>

      <div className="DAT_EditProject_Content">
        <div className="DAT_EditProject_Content_Tit">Thông tin cơ bản</div>

        <div className="DAT_EditProject_Content_Body">
          <div className="DAT_EditProject_Content_Body_Item">
            <div className="DAT_EditProject_Content_Body_Item_Tit">
              <span style={{ color: "red" }}>*</span>{" "}
              <span style={{ color: "grey" }}>Tên dự án:</span>
            </div>
            <input defaultValue={projectData.value.name}></input>
          </div>

          <div className="DAT_EditProject_Content_Body_Item">
            <div className="DAT_EditProject_Content_Body_Item_Tit">
              <span style={{ color: "red" }}>*</span>{" "}
              <span style={{ color: "grey" }}>Vị trí:</span>
            </div>
            <div className="DAT_EditProject_Content_Body_Item_Content"></div>
          </div>

          <div className="DAT_EditProject_Content_Body_Item">
            <div className="DAT_EditProject_Content_Body_Item_Tit">
              <span style={{ color: "red" }}>*</span>{" "}
              <span style={{ color: "grey" }}>Địa chỉ:</span>
            </div>
            <input defaultValue={projectData.value.addr}></input>
          </div>

          <div className="DAT_EditProject_Content_Body_Item">
            <div className="DAT_EditProject_Content_Body_Item_Tit">
              <span style={{ color: "red" }}>*</span>{" "}
              <span style={{ color: "grey" }}>Tọa độ:</span>
            </div>
            <div className="DAT_EditProject_Content_Body_Item_Posi">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ width: "100px" }}>Kinh độ</span>
                <input></input>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ width: "100px" }}>Vĩ độ</span>
                <input></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProject;
