import React from "react";
import "./Contact.scss";

import PopupAvatar from "./PopupAva";
import EditContactInfo from "./EditContactInfo";
import { partnerInfor, ruleInfor, userInfor } from "../../App";
import { signal } from "@preact/signals-react";
import { useIntl } from "react-intl";

import { MdOutlineContactPhone } from "react-icons/md";

export const popupStateContact = signal(false);
export const contactState = signal("default");

export default function Contact(props) {
  const dataLang = useIntl();

  const Type = {
    OnM: "onm",
    Investor: "investor",
    Distributor: "distributor",
    Manufacturer: "manufacturer",
  }

  return (
    <>
      <div className="DAT_ContactHeader">
        <div className="DAT_ContactHeader_Title">
          <MdOutlineContactPhone color="gray" size={25} /> <span>{dataLang.formatMessage({ id: 'contact' })}</span>
        </div>
      </div>

      <div className="DAT_Contact">
        <div className="DAT_Contact_Item">
          <div className="DAT_Contact_Item_Registation">
            <div className="DAT_Contact_Item_Registation_Tit">
              <div>{dataLang.formatMessage({ id: 'registerInfo' })}</div>
              {ruleInfor.value.setting.contact.edit === false
                ? <div></div>
                : <div onClick={() => (contactState.value = "editRegisterInf")}>
                  {dataLang.formatMessage({ id: 'edits' })}
                </div>
              }
            </div>

            <div className="DAT_Contact_Item_Registation_Content">
              <div>{dataLang.formatMessage({ id: 'businessModel' })}</div>
              <div>{partnerInfor.value.businessmodel}</div>
            </div>

            <div className="DAT_Contact_Item_Registation_Content">
              <div>{dataLang.formatMessage({ id: 'businessname' })}</div>
              <div>{partnerInfor.value.businessname}</div>
            </div>

            <div className="DAT_Contact_Item_Registation_Content">
              <div>{dataLang.formatMessage({ id: 'area' })}</div>
              <div>{partnerInfor.value.area}</div>
            </div>

            <div className="DAT_Contact_Item_Registation_Content">
              <div>{dataLang.formatMessage({ id: 'businesstype' })}</div>
              <div>{dataLang.formatMessage({ id: Type[partnerInfor.value.businesstype] })}</div>
            </div>
          </div>
        </div>

        <div className="DAT_Contact_Item">
          <div className="DAT_Contact_Item_Contact">
            <div className="DAT_Contact_Item_Contact_Tit">
              <div>{dataLang.formatMessage({ id: 'contact' })}</div>
              {ruleInfor.value.setting.contact.edit === false
                ? <div></div>
                : <div onClick={() => (contactState.value = "editContactInf")}>
                  {dataLang.formatMessage({ id: 'edits' })}
                </div>
              }
            </div>

            <div className="DAT_Contact_Item_Contact_Content">
              <div>{dataLang.formatMessage({ id: 'name' })}</div>
              <div>{partnerInfor.value.name}</div>
            </div>

            <div className="DAT_Contact_Item_Contact_Content">
              <div>{dataLang.formatMessage({ id: 'phone' })}</div>
              <div>{partnerInfor.value.phone}</div>
            </div>

            <div className="DAT_Contact_Item_Contact_Content">
              <div>E-mail</div>
              <div>{partnerInfor.value.mail}</div>
            </div>
          </div>

          <div className="DAT_Contact_Item_Logo">
            <div className="DAT_Contact_Item_Logo_Tit">
              <div>Logo</div>
              {ruleInfor.value.setting.contact.edit === false
                ? <div></div>
                : <div onClick={() => (popupStateContact.value = true)}>
                  {dataLang.formatMessage({ id: 'edits' })}
                </div>
              }
            </div>

            <div className="DAT_Contact_Item_Logo_Content">
              <img src={partnerInfor.value.logo ? partnerInfor.value.logo : "/dat_icon/logo_DAT.png"} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="DAT_ContactInfo"
        style={{
          height: contactState.value === "default" ? "0px" : "100vh",
          transition: "0.5s",
        }}
      >
        {(() => {
          switch (contactState.value) {
            case "editRegisterInf":
              return <EditContactInfo mode="RegisterInf" />;
            case "editContactInf":
              return <EditContactInfo mode="ContactInf" />;
            default:
              return <></>;
          }
        })()}
      </div>

      {popupStateContact.value ? (
        <div className="DAT_PopupAvatar">
          <PopupAvatar />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
