import React, { useEffect } from "react";
import "./Contact.scss";

import { contactState } from "./Contact";
import { partnerInfor } from "../../App";
import { signal } from "@preact/signals-react";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { useIntl } from "react-intl";
import { alertDispatch } from "../Alert/Alert";

import { RxCross2 } from "react-icons/rx";

const Type = signal({
  OnM: { name: "onm", checked: false },
  Investor: { name: "investor", checked: false },
  Distributor: { name: "distributor", checked: false },
  Manufacturer: { name: "manufacturer", checked: false },
})

export default function EditContactInfo(props) {
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
        <div className="DAT_EditContactInfo_Header_Left">{dataLang.formatMessage({ id: 'edits' })}</div>

        <div className="DAT_EditContactInfo_Header_Right">
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
                  {dataLang.formatMessage({ id: 'businessModel' })}
                </div>

                <div className="DAT_EditContactInfo_Body_Row2_Item_Content">
                  <input type="text" id="businessmodel_input" defaultValue={partnerInfor.value.businessmodel} />
                  <span style={{ cursor: "pointer", color: "rgba(11, 25, 103)" }} id='businessmodel' onClick={(e) => handeUpdate(e)} >
                    {dataLang.formatMessage({ id: 'save' })}
                  </span>
                </div>
              </div>

              <div className="DAT_EditContactInfo_Body_Row2_Item">
                <div className="DAT_EditContactInfo_Body_Row2_Item_Tit">
                  {dataLang.formatMessage({ id: 'businessname' })}
                </div>

                <div className="DAT_EditContactInfo_Body_Row2_Item_Content">
                  <input type="text" id="businessname_input" defaultValue={partnerInfor.value.businessname} />
                  <span style={{ cursor: "pointer", color: "rgba(11, 25, 103)" }} id="businessname" onClick={(e) => handeUpdate(e)}>
                    {dataLang.formatMessage({ id: 'save' })}</span>
                </div>
              </div>

              <div className="DAT_EditContactInfo_Body_Row2_Item">
                <div className="DAT_EditContactInfo_Body_Row2_Item_Tit">
                  {dataLang.formatMessage({ id: 'area' })}
                </div>

                <div className="DAT_EditContactInfo_Body_Row2_Item_Content">
                  <input type="text" id="area_input" defaultValue={partnerInfor.value.area} />
                  <span style={{ cursor: "pointer", color: "rgba(11, 25, 103)" }} id="area" onClick={(e) => handeUpdate(e)}>
                    {dataLang.formatMessage({ id: 'save' })}
                  </span>
                </div>
              </div>
            </div>

            <div className="DAT_EditContactInfo_Body_Row1">
              <div className="DAT_EditContactInfo_Body_Row1_Tit">{dataLang.formatMessage({ id: 'businesstype' })}</div>
              <div className="DAT_EditContactInfo_Body_Row1_Content">
                {Object.keys(Type.value).map((key) => {
                  return (
                    <div className="DAT_EditContactInfo_Body_Row1_Content_Item" key={key}>
                      <input type="radio" id={key} checked={Type.value[key].checked} onChange={(e) => handeTypeChange(e)} />
                      <span>{dataLang.formatMessage({ id: Type.value[key].name })}</span>
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
                  {dataLang.formatMessage({ id: 'name' })}
                </div>
                <div className="DAT_EditContactInfo_Body_Row2_Item_Content">
                  <input type="text" id="name_input" defaultValue={partnerInfor.value.name} />
                  <span style={{ cursor: "pointer", color: "rgba(11, 25, 103)" }} id='name' onClick={(e) => handeUpdate(e)} >{dataLang.formatMessage({ id: 'save' })}</span>
                </div>
              </div>

              <div className="DAT_EditContactInfo_Body_Row2_Item">
                <div className="DAT_EditContactInfo_Body_Row2_Item_Tit">
                  {dataLang.formatMessage({ id: 'phone' })}
                </div>

                <div className="DAT_EditContactInfo_Body_Row2_Item_Content">
                  <input type="number" id="phone_input" defaultValue={partnerInfor.value.phone} />
                  <span style={{ cursor: "pointer", color: "rgba(11, 25, 103)" }} id="phone" onClick={(e) => handeUpdate(e)}>{dataLang.formatMessage({ id: 'save' })}</span>
                </div>
              </div>

              <div className="DAT_EditContactInfo_Body_Row2_Item">
                <div className="DAT_EditContactInfo_Body_Row2_Item_Tit">
                  {dataLang.formatMessage({ id: 'area' })}
                </div>

                <div className="DAT_EditContactInfo_Body_Row2_Item_Content">
                  <input type="mail" id="mail_input" defaultValue={partnerInfor.value.mail} />
                  <span style={{ cursor: "pointer", color: "rgba(11, 25, 103)" }} id="mail" onClick={(e) => handeUpdate(e)}>{dataLang.formatMessage({ id: 'save' })}</span>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
}
