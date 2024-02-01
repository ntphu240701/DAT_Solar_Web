import React from "react";
import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { contactState } from "./Contact";
import { IoAddCircleOutline } from "react-icons/io5";

function EditContactInfo(props) {
  return (
    <div className="DAT_EditContactInfo">
      <div className="DAT_EditContactInfo_Header">
        <div className="DAT_EditContactInfo_Header_Left">Chỉnh sửa</div>
        <div className="DAT_EditContactInfo_Header_Right">
          <div className="DAT_EditContactInfo_Header_Right_Save">
            <FaSave size={20} color="white" />
            <span>Lưu</span>
          </div>
          <div className="DAT_EditContactInfo_Header_Right_Close">
            <RxCross2
              size={20}
              color="white"
              onClick={() => (contactState.value = "default")}
            />
          </div>
        </div>
      </div>

      <div className="DAT_EditContactInfo_Body">
        <div className="DAT_EditContactInfo_Body_Row1">
          <div className="DAT_EditContactInfo_Body_Row1_Tit">
            Mô hình kinh doanh
          </div>
          <div className="DAT_EditContactInfo_Body_Row1_Content">
            <div>
              <input type="radio" defaultChecked={true} />
              Doanh nghiệp
            </div>

            <div>
              <input type="radio" />
              Cá nhân
            </div>
          </div>
        </div>

        <div className="DAT_EditContactInfo_Body_Row2">
          <div className="DAT_EditContactInfo_Body_Row2_Left">
            <div className="DAT_EditContactInfo_Body_Row2_Left_Tit">
              Tên kinh doanh
            </div>
            <div className="DAT_EditContactInfo_Body_Row2_Left_Content">
              <div style={{ flex: "2" }}>
                <select>
                  <option>English</option>
                  <option>Tiếng Việt</option>
                </select>
              </div>
              <div style={{ flex: "8", display: "flex", gap: "10px" }}>
                <input />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <IoAddCircleOutline size={20} />
                </div>
              </div>
            </div>
          </div>

          <div className="DAT_EditContactInfo_Body_Row2_Right">
            <div className="DAT_EditContactInfo_Body_Row2_Right_Tit">
              Khu vực
            </div>
            <div className="DAT_EditContactInfo_Body_Row2_Right_Content">
              <div>
                <select>
                  <option>English</option>
                  <option>Tiếng Việt</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="DAT_EditContactInfo_Body_Row1">
          <div className="DAT_EditContactInfo_Body_Row1_Tit">Loại</div>
          <div className="DAT_EditContactInfo_Body_Row1_Content">
            <div>
              <input type="radio" defaultChecked={true} />
              Nhà cung cấp O&M
            </div>

            <div>
              <input type="radio" />
              Nhà đầu tư
            </div>
            <div>
              <input type="radio" />
              Nhà phân phối
            </div>
            <div>
              <input type="radio" />
              Nhà sản xuất
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditContactInfo;
