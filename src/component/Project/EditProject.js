import React, { useState } from "react";
import "./Project.scss";
import { plantState, projectData } from "./Project";
import GoogleMap from "google-maps-react-markers";

import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { isMobile } from "../Navigation/Navigation";

const BasicInfo = (props) => {
  const [state, setState] = useState(true);
  const defaultProps = {
    center: {
      lat: 16.054083398111068,
      lng: 108.20361013247235,
    },
    zoom: 7.0,
  };
  return (
    <div className="DAT_EditProject_BasicInfo">
      <div className="DAT_EditProject_BasicInfo_Tit">
        <div className="DAT_EditProject_BasicInfo_Tit_Left">{props.tit}</div>

        <div
          className="DAT_EditProject_BasicInfo_Tit_Right"
          onClick={() => setState(!state)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: state ? "rotate(0deg)" : "rotate(180deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div
        style={{
          height: state ? props.height : "0px",
          transition: "0.5s",
          overflow: "hidden",
        }}
      >
        {state ? (
          <div className="DAT_EditProject_BasicInfo_Body">
            <div className="DAT_EditProject_BasicInfo_Body_Item">
              <div className="DAT_EditProject_BasicInfo_Body_Item_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Tên dự án:</span>
              </div>
              <input defaultValue={projectData.value.name}></input>
            </div>

            <div className="DAT_EditProject_BasicInfo_Body_Item">
              <div className="DAT_EditProject_BasicInfo_Body_Item_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Vị trí:</span>
              </div>
              <div className="DAT_EditProject_BasicInfo_Body_Item_Content">
                <GoogleMap
                  apiKey={process.env.REACT_APP_GGKEY}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                  //onGoogleApiLoaded={onGoogleApiLoaded}
                ></GoogleMap>
              </div>
            </div>

            <div className="DAT_EditProject_BasicInfo_Body_Item">
              <div className="DAT_EditProject_BasicInfo_Body_Item_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Địa chỉ:</span>
              </div>
              <input defaultValue={projectData.value.addr}></input>
            </div>

            <div className="DAT_EditProject_BasicInfo_Body_Item">
              <div className="DAT_EditProject_BasicInfo_Body_Item_Tit">
                <span style={{ color: "red" }}>* </span>
                <span style={{ color: "grey" }}>Tọa độ:</span>
              </div>
              <div className="DAT_EditProject_BasicInfo_Body_Item_Posi">
                <div className="DAT_EditProject_BasicInfo_Body_Item_Posi_Content">
                  <div className="DAT_EditProject_BasicInfo_Body_Item_Posi_Content_Tit">
                    Kinh độ
                  </div>
                  <input></input>
                </div>
                <div className="DAT_EditProject_BasicInfo_Body_Item_Posi_Content">
                  <div className="DAT_EditProject_BasicInfo_Body_Item_Posi_Content_Tit">
                    Vĩ độ
                  </div>
                  <input></input>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const SystemInfo = (props) => {
  const [state, setState] = useState(true);
  return (
    <div className="DAT_EditProject_SystemInfo">
      <div className="DAT_EditProject_SystemInfo_Tit">
        <div className="DAT_EditProject_SystemInfo_Tit_Left">{props.tit}</div>

        <div
          className="DAT_EditProject_SystemInfo_Tit_Right"
          onClick={() => setState(!state)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: state ? "rotate(0deg)" : "rotate(180deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div
        style={{
          height: state ? props.height : "0px",
          transition: "0.5s",
          overflow: "hidden",
        }}
      >
        {state ? (
          <div className="DAT_EditProject_SystemInfo_Body">
            <div className="DAT_EditProject_SystemInfo_Body_Item">
              <div className="DAT_EditProject_SystemInfo_Body_Item_Left">
                <div className="DAT_EditProject_SystemInfo_Body_Item_Left_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Loại dự án:</span>
                </div>
                <select>
                  <option>Hộ dân</option>
                  <option>Nhà máy</option>
                </select>
              </div>

              <div className="DAT_EditProject_SystemInfo_Body_Item_Right">
                <div className="DAT_EditProject_SystemInfo_Body_Item_Right_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Loại hệ thống điện:</span>
                </div>
                <select>
                  <option>Hệ thống hòa lưới</option>
                  <option>Hệ thống hòa lưới bám tải</option>
                  <option>Hệ thống lưu trữ hybrid</option>
                  <option>Hệ thống lưu trữ năng lượng ESS</option>
                  <option>Hệ thống solar pump</option>
                </select>
              </div>
            </div>

            <div className="DAT_EditProject_SystemInfo_Body_Item">
              <div className="DAT_EditProject_SystemInfo_Body_Item_Left">
                <div className="DAT_EditProject_SystemInfo_Body_Item_Left_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Dung lượng(kWp):</span>
                </div>
                <input></input>
              </div>

              <div className="DAT_EditProject_SystemInfo_Body_Item_Right">
                {/* <div className="DAT_EditProject_SystemInfo_Body_Item_Right_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Phương vị:</span>
                </div>
                <input></input> */}
              </div>
            </div>

            <div className="DAT_EditProject_SystemInfo_Body_Item">
              <div className="DAT_EditProject_SystemInfo_Body_Item_Left">
                <div className="DAT_EditProject_SystemInfo_Body_Item_Left_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Góc nghiêng:</span>
                </div>
                <input></input>
              </div>

              <div className="DAT_EditProject_SystemInfo_Body_Item_Right">
                <div className="DAT_EditProject_SystemInfo_Body_Item_Right_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Dữ liệu trên lưới :</span>
                </div>
                <input type="date"></input>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const YieldInfo = (props) => {
  const [state, setState] = useState(true);
  return (
    <div className="DAT_EditProject_YieldInfo">
      <div className="DAT_EditProject_YieldInfo_Tit">
        <div className="DAT_EditProject_YieldInfo_Tit_Left">{props.tit}</div>

        <div
          className="DAT_EditProject_YieldInfo_Tit_Right"
          onClick={() => setState(!state)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: state ? "rotate(0deg)" : "rotate(180deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div
        style={{
          height: state ? props.height : "0px",
          transition: "0.5s",
          overflow: "hidden",
        }}
      >
        {state ? (
          <div className="DAT_EditProject_YieldInfo_Body">
            <div className="DAT_EditProject_YieldInfo_Body_Item">
              <div className="DAT_EditProject_YieldInfo_Body_Item_Left">
                <div className="DAT_EditProject_YieldInfo_Body_Item_Left_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Tiền tệ:</span>
                </div>
                <select>
                  <option>VND</option>
                  <option>USD</option>
                </select>
              </div>

              <div className="DAT_EditProject_YieldInfo_Body_Item_Right">
                <div className="DAT_EditProject_YieldInfo_Body_Item_Right_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Đơn giá(VND/kWh):</span>
                </div>
                <input></input>
              </div>
            </div>

            {/* <div className="DAT_EditProject_YieldInfo_Body_Item">
              <div className="DAT_EditProject_YieldInfo_Body_Item_Left">
                <div className="DAT_EditProject_YieldInfo_Body_Item_Left_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>
                    Thu nhập trợ cấp(VND/kWh):
                  </span>
                </div>
                <input></input>
              </div>

              <div className="DAT_EditProject_YieldInfo_Body_Item_Right">
                <div className="DAT_EditProject_YieldInfo_Body_Item_Right_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Tổng chi phí(VND):</span>
                </div>
                <input></input>
              </div>
            </div>

            <div className="DAT_EditProject_YieldInfo_Body_Item">
              <div className="DAT_EditProject_YieldInfo_Body_Item_Left">
                <div className="DAT_EditProject_YieldInfo_Body_Item_Left_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Trả nợ hàng ngày(VND):</span>
                </div>
                <input></input>
              </div>

              <div className="DAT_EditProject_YieldInfo_Body_Item_Right"></div>
            </div> */}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const OwnerInfo = (props) => {
  const [state, setState] = useState(true);
  return (
    <div className="DAT_EditProject_OwnerInfo">
      <div className="DAT_EditProject_OwnerInfo_Tit">
        <div className="DAT_EditProject_OwnerInfo_Tit_Left">{props.tit}</div>

        <div
          className="DAT_EditProject_OwnerInfo_Tit_Right"
          onClick={() => setState(!state)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: state ? "rotate(0deg)" : "rotate(180deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div
        style={{
          height: state ? props.height : "0px",
          transition: "0.5s",
          overflow: "hidden",
        }}
      >
        {state ? (
          <div className="DAT_EditProject_OwnerInfo_Body">
            <div className="DAT_EditProject_OwnerInfo_Body_Item">
              <div className="DAT_EditProject_OwnerInfo_Body_Item_Left">
                <div className="DAT_EditProject_OwnerInfo_Body_Item_Left_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Người liên hệ:</span>
                </div>
                <input></input>
              </div>

              <div className="DAT_EditProject_OwnerInfo_Body_Item_Right">
                <div className="DAT_EditProject_OwnerInfo_Body_Item_Right_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Số điện thoại:</span>
                </div>
                <input></input>
              </div>
            </div>

            <div className="DAT_EditProject_OwnerInfo_Body_Item">
              <div className="DAT_EditProject_OwnerInfo_Body_Item_Left">
                <div className="DAT_EditProject_OwnerInfo_Body_Item_Left_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Tên doanh nghiệp:</span>
                </div>
                <input></input>
              </div>

              <div className="DAT_EditProject_OwnerInfo_Body_Item_Right"></div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

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

      <BasicInfo
        tit={"Thông tin cơ bản"}
        height={isMobile.value ? "600px" : "700px"}
      />

      <SystemInfo
        tit={"Thông tin hệ thống"}
        height={isMobile.value ? "380px" : "300px"}
      />

      <YieldInfo
        tit={"Thông tin sản lượng"}
        height={isMobile.value ? "170px" : "300px"}
      />

      <OwnerInfo
        tit={"Thông tin người sở hữu"}
        height={isMobile.value ? "240px" : "200px"}
      />
    </div>
  );
}

export default EditProject;
