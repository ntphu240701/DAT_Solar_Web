import React from "react";
import "./Contact.scss";
import PopupAvatar from "./PopupAva";

import { MdOutlineContactPhone } from "react-icons/md";
import { signal } from "@preact/signals-react";
import EditContactInfo from "./EditContactInfo";

export const popupStateContact = signal(false);
export const contactState = signal("default");

function Contact(props) {
  return (
    <>
      <div className="DAT_ContactHeader">
        <div className="DAT_ContactHeader_Title">
          <MdOutlineContactPhone color="gray" size={25} /> <span>Liên hệ</span>
        </div>
      </div>

      <div className="DAT_Contact">
        <div className="DAT_Contact_Item">
          <div className="DAT_Contact_Item_Registation">
            <div className="DAT_Contact_Item_Registation_Tit">
              <div>Thông tin đăng ký</div>
              <div onClick={() => (contactState.value = "editInfo")}>
                Chỉnh sửa
              </div>
            </div>
            <div className="DAT_Contact_Item_Registation_Content">
              <div>Mô hình kinh doanh</div>
              <div>Doanh nghiệp</div>
            </div>
            <div className="DAT_Contact_Item_Registation_Content">
              <div>Tên kinh doanh</div>
              <div>DATTECHNOLOGYCO.,LTD_7082</div>
            </div>
            <div className="DAT_Contact_Item_Registation_Content">
              <div>Khu vực</div>
              <div>Hồ Chí Minh</div>
            </div>
            <div className="DAT_Contact_Item_Registation_Content">
              <div>Loại</div>
              <div>Nhà phân phối</div>
            </div>
          </div>

          {/* <div className='DAT_Contact_Item_More'>
                        <div className='DAT_Contact_Item_More_Tit'></div>
                    </div> */}
        </div>

        <div className="DAT_Contact_Item">
          <div className="DAT_Contact_Item_Contact">
            <div className="DAT_Contact_Item_Contact_Tit">
              <div>Thông tin liên hệ</div>
              {/* <div>Chỉnh sửa</div> */}
            </div>
            <div className="DAT_Contact_Item_Contact_Content">
              <div>Tên</div>
              <div>DATSOLAR</div>
            </div>
            <div className="DAT_Contact_Item_Contact_Content">
              <div>Điện thoại</div>
              <div>--</div>
            </div>

            <div className="DAT_Contact_Item_Contact_Content">
              <div>E-mail</div>
              <div>Support.datsolar@dattech.com.vn</div>
            </div>
          </div>

          <div className="DAT_Contact_Item_Logo">
            <div className="DAT_Contact_Item_Logo_Tit">
              <div>Logo</div>
              <div onClick={() => (popupStateContact.value = true)}>
                Chỉnh sửa
              </div>
            </div>
            <div className="DAT_Contact_Item_Logo_Content">
              <img src="/dat_icon/logo_DAT.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="DAT_ContactInfo"
        style={{
          height: contactState.value === "default" ? "0px" : "100vh",
          transition: "0.5s",
        }}
      >
        {(() => {
          switch (contactState.value) {
            case "editInfo":
              return <EditContactInfo />;
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

export default Contact;
