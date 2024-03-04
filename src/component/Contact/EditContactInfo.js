import React, { useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { contactState } from "./Contact";
import { IoAddCircleOutline } from "react-icons/io5";
import { partnerInfor } from "../../App";

import { signal } from "@preact/signals-react";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { useIntl } from "react-intl";
import { alertDispatch } from "../Alert/Alert";

const Type = signal({

  OnM: { name: "Nhà cung cấp O&M", checked: false },
  Investor: { name: "Đầu tư", checked: false },
  Distributor: { name: "Nhà phân phối", checked: false },
  Manufacturer: { name: "Nhà sản xuất", checked: false },

})

function EditContactInfo(props) {

  const dataLang = useIntl();

  const handeTypeChange = (e) => {

    Object.entries(Type.value).forEach(async ([key, value]) => {
      if (key === e.target.id) {
        Type.value = { ...Type.value, [key]: { ...Type.value[key], checked: !Type.value[key].checked } }
        const d = await callApi('post', host.DATA + '/updatePartner', { code: partnerInfor.value.code, type: 'businesstype', data: key })
        console.log(d)
        if (d.status) {
          alertDispatch(dataLang.formatMessage({ id: "alert_6" }));
          partnerInfor.value = {
            ...partnerInfor.value,
            businesstype: key
          }
        } else {
          alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
        }
      } else {
        Type.value = { ...Type.value, [key]: { ...Type.value[key], checked: false } }
      }
    })
  }
  const handeUpdate = async (e) => {
    const id = e.currentTarget.id
    let data = document.getElementById(`${id}_input`).value
    if (data !== "") {
      console.log(id, data)
      const d = await callApi('post', host.DATA + '/updatePartner', { code: partnerInfor.value.code, type: id, data: data })
      console.log(d)
      if (d.status) {
        alertDispatch(dataLang.formatMessage({ id: "alert_6" }));
        partnerInfor.value = {
          ...partnerInfor.value,
          [id]: data
        }
      } else {
        alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
      }
    } else {
      alertDispatch(dataLang.formatMessage({ id: "alert_17" }));
    }
  }

  useEffect(() => {
    Type.value[partnerInfor.value.businesstype] = { ...Type.value[partnerInfor.value.businesstype], checked: true }
  }, [])

  return (
    <div className="DAT_EditContactInfo">
      <div className="DAT_EditContactInfo_Header">
        <div className="DAT_EditContactInfo_Header_Left">Chỉnh sửa</div>
        <div className="DAT_EditContactInfo_Header_Right">
          {/* <div className="DAT_EditContactInfo_Header_Right_Save">
            <FaSave size={20} color="white" />
            <span>Lưu</span>
          </div> */}
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
        {props.mode === 'RegisterInf'
          ? <>
            <div className="DAT_EditContactInfo_Body_Row2">

              <div className="DAT_EditContactInfo_Body_Row2_Item">
                <div className="DAT_EditContactInfo_Body_Row2_Item_Tit">
                  Mô hình kinh doanh
                </div>
                <div className="DAT_EditContactInfo_Body_Row2_Item_Content">
                  <input type="text" id="businessmodel_input" defaultValue={partnerInfor.value.businessmodel} />
                  <span style={{ cursor: "pointer", color: "#00B0FF" }} id='businessmodel' onClick={(e) => handeUpdate(e)} >Lưu</span>
                </div>
              </div>

              <div className="DAT_EditContactInfo_Body_Row2_Item">
                <div className="DAT_EditContactInfo_Body_Row2_Item_Tit">
                  Tên kinh doanh
                </div>
                <div className="DAT_EditContactInfo_Body_Row2_Item_Content">
                  <input type="text" id="businessname_input" defaultValue={partnerInfor.value.businessname} />
                  <span style={{ cursor: "pointer", color: "#00B0FF" }} id="businessname" onClick={(e) => handeUpdate(e)}>Lưu</span>
                </div>
              </div>

              <div className="DAT_EditContactInfo_Body_Row2_Item">
                <div className="DAT_EditContactInfo_Body_Row2_Item_Tit">
                  Khu vực
                </div>
                <div className="DAT_EditContactInfo_Body_Row2_Item_Content">
                  <input type="text" id="area_input" defaultValue={partnerInfor.value.area} />
                  <span style={{ cursor: "pointer", color: "#00B0FF" }} id="area" onClick={(e) => handeUpdate(e)}>Lưu</span>
                </div>
              </div>
            </div>

            <div className="DAT_EditContactInfo_Body_Row1">
              <div className="DAT_EditContactInfo_Body_Row1_Tit">Loại</div>
              <div className="DAT_EditContactInfo_Body_Row1_Content">
                {Object.keys(Type.value).map((key) => {
                  return (
                    <div className="DAT_EditContactInfo_Body_Row1_Content_Item" key={key}>
                      <input type="radio" id={key} checked={Type.value[key].checked} onChange={(e) => handeTypeChange(e)} />
                      <span>{Type.value[key].name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
          : <>
            <div className="DAT_EditContactInfo_Body_Row2">

              <div className="DAT_EditContactInfo_Body_Row2_Item">
                <div className="DAT_EditContactInfo_Body_Row2_Item_Tit">
                  Tên
                </div>
                <div className="DAT_EditContactInfo_Body_Row2_Item_Content">
                  <input type="text" id="name_input" defaultValue={partnerInfor.value.name} />
                  <span style={{ cursor: "pointer", color: "#00B0FF" }} id='name' onClick={(e) => handeUpdate(e)} >Lưu</span>
                </div>
              </div>

              <div className="DAT_EditContactInfo_Body_Row2_Item">
                <div className="DAT_EditContactInfo_Body_Row2_Item_Tit">
                  Số điện thoại
                </div>
                <div className="DAT_EditContactInfo_Body_Row2_Item_Content">
                  <input type="number" id="phone_input" defaultValue={partnerInfor.value.phone} />
                  <span style={{ cursor: "pointer", color: "#00B0FF" }} id="phone" onClick={(e) => handeUpdate(e)}>Lưu</span>
                </div>
              </div>

              <div className="DAT_EditContactInfo_Body_Row2_Item">
                <div className="DAT_EditContactInfo_Body_Row2_Item_Tit">
                  Khu vực
                </div>
                <div className="DAT_EditContactInfo_Body_Row2_Item_Content">
                  <input type="mail" id="mail_input" defaultValue={partnerInfor.value.mail} />
                  <span style={{ cursor: "pointer", color: "#00B0FF" }} id="mail" onClick={(e) => handeUpdate(e)}>Lưu</span>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default EditContactInfo;
