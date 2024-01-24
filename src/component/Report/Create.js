import React from 'react'
import { FaSave } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { createState } from './Report';


export default function Create() {
  const handleCloseCreate = () => {
    createState.value = false;
  }

  return (
    <div>
      <div className="DAT_Create">
        <div className="DAT_Create_Header">
          <div className="DAT_Create_Header_Left">
            <p style={{ fontSize: "20px" }}>Cấu hình</p>
          </div>
          <div className="DAT_Create_Header_Right">
            <div className="DAT_Create_Header_Right_Save">
              <FaSave size={20} color="white" />
              <span>Lưu</span>
            </div>
            <div className="DAT_Create_Header_Right_Close">
              <RxCross2
                size={20}
                color="white"
                onClick={handleCloseCreate}
              />
            </div>
          </div>
        </div>

        {/* <div className="DAT_Create_Body">
          <div className="DAT_Create_Body_Item">
            <h4>Vui lòng chọn loại thiết bị bạn cần hiển thị</h4>
            <div className="DAT_Create_Body_Item_CheckBox">
              <CheckBox info="Biến tần" />
              <CheckBox info="Đồng hồ đo" />
              <CheckBox info="Mô-đun" />
              <CheckBox info="Hộp kết hợp" />
              <CheckBox info="Trạm thời tiết" />
              <CheckBox info="Micro biến tần" />
              <CheckBox info="Pin, ắc quy" />
              <CheckBox info="Bộ khuếch đại tín hiệu" />
              <CheckBox info="Quạt" />
              <CheckBox info="Tủ Điện Hỗn Hợp " />
              <CheckBox info="Đồng Hồ Thông Minh" />
              <CheckBox info="Biến tần Hệ Thống Ngoại Lưới" />
              <CheckBox info="Máy Biến Áp Hộp" />
              <CheckBox info="Thiết bị Chuyển Mạch" />
              <CheckBox info="Bộ Tối Ưu Hóa Công Suất" />
              <CheckBox info="ABC" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
