import React from "react";
import "./Warn.scss";

import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { warnState } from "./Warn";

function SettingWarn(props) {
  return (
    <div className="DAT_SettingWarn">
      <div className="DAT_SettingWarn_Header">
        <div className="DAT_SettingWarn_Header_Left">Cài đặt cảnh báo</div>

        <div className="DAT_SettingWarn_Header_Right">
          <div className="DAT_SettingWarn_Header_Right_Save">
            <FaSave size={20} color="white" />
            <span>Lưu</span>
          </div>
          <div className="DAT_SettingWarn_Header_Right_Close">
            <RxCross2
              size={20}
              color="white"
              onClick={() => (warnState.value = "default")}
            />
          </div>
        </div>
      </div>

      <div className="DAT_SettingWarn_Body">
        <div className="DAT_SettingWarn_Body_Row1">
          <div className="DAT_SettingWarn_Body_Row1_Item">
            <input type="radio" />
            Cho phép thông báo
          </div>
          <div className="DAT_SettingWarn_Body_Row1_Item">
            <input type="radio" />
            Tắt thông báo
          </div>
        </div>

        <div className="DAT_SettingWarn_Body_Line" />

        <div className="DAT_SettingWarn_Body_Row2">
          <div className="DAT_SettingWarn_Body_Row2_Left">
            <div className="DAT_SettingWarn_Body_Row2_Left_Tit">
              Mức cảnh báo:
            </div>

            <div className="DAT_SettingWarn_Body_Row2_Left_Content">
              <div>
                <input type="checkbox" />
                Thông báo
              </div>
              <div>
                <input type="checkbox" />
                Cảnh báo
              </div>
              <div>
                <input type="checkbox" />
                Thất bại
              </div>
            </div>
          </div>

          <div className="DAT_SettingWarn_Body_Row2_Right">
            <div className="DAT_SettingWarn_Body_Row2_Right_Tit">Tần suất:</div>
            <div className="DAT_SettingWarn_Body_Row2_Right_Content">
              <button className="DAT_SettingWarn_Body_Row2_Right_Content_Item">
                <div className="DAT_SettingWarn_Body_Row2_Right_Content_Item_Tit">
                  Thấp
                </div>
                <div className="DAT_SettingWarn_Body_Row2_Right_Content_Item_Content">
                  Thông báo 60 phút sau khi xảy ra lỗi
                </div>
              </button>
              <button className="DAT_SettingWarn_Body_Row2_Right_Content_Item">
                <div>
                  <div className="DAT_SettingWarn_Body_Row2_Right_Content_Item_Tit">
                    Vừa
                  </div>
                  <div className="DAT_SettingWarn_Body_Row2_Right_Content_Item_Content">
                    Thông báo 15 phút sau khi xảy ra lỗi
                  </div>
                </div>
              </button>
              <button className="DAT_SettingWarn_Body_Row2_Right_Content_Item">
                <div>
                  <div className="DAT_SettingWarn_Body_Row2_Right_Content_Item_Tit">
                    Cao
                  </div>
                  <div className="DAT_SettingWarn_Body_Row2_Right_Content_Item_Content">
                    Thông báo ngay lập tức khi xảy ra lỗi
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="DAT_SettingWarn_Body_Line" />

        <div className="DAT_SettingWarn_Body_Row4">
          <div className="DAT_SettingWarn_Body_Row4_Left">
            <div className="DAT_SettingWarn_Body_Row4_Left_Tit">
              Phương thức:
            </div>
            <div className="DAT_SettingWarn_Body_Row4_Left_Content">
              <div>
                <input type="checkbox" />
                Tại trang
              </div>
              <div>
                <input type="checkbox" />
                Email
              </div>
              <div>
                <input type="checkbox" />
                Qua App
              </div>
            </div>
          </div>

          <div className="DAT_SettingWarn_Body_Row4_Right">
            <div className="DAT_SettingWarn_Body_Row4_Right_Tit">
              Giới hạn ngày:
            </div>
            <div className="DAT_SettingWarn_Body_Row4_Right_Content">
              <button className="DAT_SettingWarn_Body_Row4_Right_Content_Item">
                2
              </button>
              <button className="DAT_SettingWarn_Body_Row4_Right_Content_Item">
                10
              </button>
              <button className="DAT_SettingWarn_Body_Row4_Right_Content_Item">
                20
              </button>
              <button className="DAT_SettingWarn_Body_Row4_Right_Content_Item">
                50
              </button>
            </div>
          </div>
        </div>

        <div className="DAT_SettingWarn_Body_Line" />

        <div className="DAT_SettingWarn_Body_Row6">
          <div className="DAT_SettingWarn_Body_Row6_Tit">Người nhận:</div>
          <div className="DAT_SettingWarn_Body_Row6_Content">
            <div className="DAT_SettingWarn_Body_Row6_Content_Tag">
              <div className="DAT_SettingWarn_Body_Row6_Content_Tag_Left">
                ntphu
              </div>
              <div className="DAT_SettingWarn_Body_Row6_Content_Tag_Right">
                <RxCross2 />
              </div>
            </div>

            <div className="DAT_SettingWarn_Body_Row6_Content_Tag">
              <div className="DAT_SettingWarn_Body_Row6_Content_Tag_Left">
                ntphu
              </div>
              <div className="DAT_SettingWarn_Body_Row6_Content_Tag_Right">
                <RxCross2 />
              </div>
            </div>

            <div className="DAT_SettingWarn_Body_Row6_Content_Add">+Thêm</div>

            <div className="DAT_SettingWarn_Body_Row6_Content_Delete">
              <div className="DAT_SettingWarn_Body_Row6_Content_Delete_Close">
                <RxCross2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingWarn;
