import React, { useEffect, useRef, useState } from "react";
import "./Project.scss";
import { dataproject, lastId, plantState, projectData } from "./Project";
import GoogleMap from "google-maps-react-markers";

import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { isMobile } from "../Navigation/Navigation";
import { signal } from "@preact/signals-react";
import moment from "moment-timezone";

export const plantData = signal({
  name: "",
  addr: "",
  long: "",
  lat: "",
  plantype: "residential",
  systemtype: "grid",
  capacity: "",
  griddate: "",
  angle: "",
  currency: "vnd",
  price: "",
  contact: "",
  phone: "",
  business: "",
  status: false,
  warn: false,
  production: "0",
  power: "0",
  lastupdate: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
  createdate: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
});

const BasicInfo = (props) => {
  const [state, setState] = useState(true);
  const defaultProps = {
    center: {
      lat: 16.054083398111068,
      lng: 108.20361013247235,
    },
    zoom: 7.0,
  };

  // const name = useRef();
  // const address = useRef();
  // const long = useRef();
  // const lat = useRef();
  const handleBasic = (e) => {
    plantData.value[e.currentTarget.id] = e.currentTarget.value;
  };

  return (
    <div className="DAT_AddProject_BasicInfo">
      <div className="DAT_AddProject_BasicInfo_Tit">
        <div className="DAT_AddProject_BasicInfo_Tit_Left">{props.tit}</div>

        <div
          className="DAT_AddProject_BasicInfo_Tit_Right"
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
          <div className="DAT_AddProject_BasicInfo_Body">
            <div className="DAT_AddProject_BasicInfo_Body_Left">
              <div className="DAT_AddProject_BasicInfo_Body_Left_Item">
                <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Tên dự án:</span>
                </div>
                <input
                  id="name"
                  type="text"
                  // ref={name}
                  onChange={(e) => handleBasic(e)}
                />
              </div>

              <div className="DAT_AddProject_BasicInfo_Body_Left_Item">
                <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Địa chỉ:</span>
                </div>
                <input
                  id="addr"
                  type="text"
                  // ref={address}
                  onChange={(e) => handleBasic(e)}
                />
              </div>

              <div className="DAT_AddProject_BasicInfo_Body_Left_Item">
                <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Tọa độ:</span>
                </div>
                <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Posi">
                  <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Posi_Content">
                    <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Posi_Content_Tit">
                      Kinh độ
                    </div>
                    <input
                      id="long"
                      type="text"
                      // ref={long}
                      onChange={(e) => handleBasic(e)}
                      required
                    />
                  </div>
                  <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Posi_Content">
                    <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Posi_Content_Tit">
                      Vĩ độ
                    </div>
                    <input
                      id="lat"
                      type="text"
                      // ref={lat}
                      onChange={(e) => handleBasic(e)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="DAT_AddProject_BasicInfo_Body_Right">
              <div className="DAT_AddProject_BasicInfo_Body_Right_Item">
                <div className="DAT_AddProject_BasicInfo_Body_Right_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Vị trí:</span>
                </div>
                <div className="DAT_AddProject_BasicInfo_Body_Right_Item_Content">
                  <GoogleMap
                    apiKey={process.env.REACT_APP_GGKEY}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    //onGoogleApiLoaded={onGoogleApiLoaded}
                  />
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

  const handleSystem = (e) => {
    plantData.value[e.currentTarget.id] = e.currentTarget.value;
  };

  const handleDate = (e) => {
    plantData.value[e.currentTarget.id] = moment(e.currentTarget.value).format(
      "MM/DD/YYYY"
    );
  };

  useEffect(() => {
    plantData.value["griddate"] = moment(new Date()).format("MM/DD/YYYY");
  }, []);

  return (
    <div className="DAT_AddProject_SystemInfo">
      <div className="DAT_AddProject_SystemInfo_Tit">
        <div className="DAT_AddProject_SystemInfo_Tit_Left">{props.tit}</div>

        <div
          className="DAT_AddProject_SystemInfo_Tit_Right"
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
          <form className="DAT_AddProject_SystemInfo_Body">
            <div className="DAT_AddProject_SystemInfo_Body_Left">
              <div className="DAT_AddProject_SystemInfo_Body_Left_Item">
                <div className="DAT_AddProject_SystemInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Loại dự án:</span>
                </div>
                <select
                  id="plantype"
                  defaultValue={plantData.value["plantype"]}
                  onChange={(e) => handleSystem(e)}
                >
                  <option value="residential">Hộ dân</option>
                  <option value="industrial">Nhà máy</option>
                </select>
              </div>

              <div className="DAT_AddProject_SystemInfo_Body_Left_Item">
                <div className="DAT_AddProject_SystemInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Loại hệ thống điện:</span>
                </div>
                <select
                  id="systemtype"
                  defaultValue={plantData.value["systemtype"]}
                  onChange={(e) => handleSystem(e)}
                >
                  <option value="grid">Hệ thống hòa lưới</option>
                  <option value="consumption">Hệ thống hòa lưới bám tải</option>
                  <option value="hybrid">Hệ thống lưu trữ hybrid</option>
                  <option value="ESS">Hệ thống lưu trữ năng lượng ESS</option>
                  <option value="pump">Hệ thống solar pump</option>
                </select>
              </div>
            </div>

            <div className="DAT_AddProject_SystemInfo_Body_Center">
              <div className="DAT_AddProject_SystemInfo_Body_Center_Item">
                <div className="DAT_AddProject_SystemInfo_Body_Center_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Dung lượng(kWp):</span>
                </div>
                <input
                  id="capacity"
                  type="text"
                  onChange={(e) => handleSystem(e)}
                  required
                />
              </div>

              <div className="DAT_AddProject_SystemInfo_Body_Center_Item">
                <div className="DAT_AddProject_SystemInfo_Body_Center_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Dữ liệu trên lưới:</span>
                </div>
                <input
                  id="griddate"
                  type="date"
                  defaultValue={moment(new Date()).format("YYYY-MM-DD")}
                  onChange={(e) => handleDate(e)}
                />
              </div>
            </div>

            <div className="DAT_AddProject_SystemInfo_Body_Right">
              <div className="DAT_AddProject_SystemInfo_Body_Right_Item">
                <div className="DAT_AddProject_SystemInfo_Body_Right_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Góc nghiêng:</span>
                </div>
                <input
                  id="angle"
                  type="text"
                  placeholder="0~90"
                  onChange={(e) => handleSystem(e)}
                />
              </div>
            </div>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const YieldInfo = (props) => {
  const [state, setState] = useState(true);

  const handleYield = (e) => {
    plantData.value[e.currentTarget.id] = e.currentTarget.value;
  };

  return (
    <div className="DAT_AddProject_YieldInfo">
      <div className="DAT_AddProject_YieldInfo_Tit">
        <div className="DAT_AddProject_YieldInfo_Tit_Left">{props.tit}</div>

        <div
          className="DAT_AddProject_YieldInfo_Tit_Right"
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
          <div className="DAT_AddProject_YieldInfo_Body">
            <div className="DAT_AddProject_YieldInfo_Body_Left">
              <div className="DAT_AddProject_YieldInfo_Body_Left_Item">
                <div className="DAT_AddProject_YieldInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Tiền tệ:</span>
                </div>
                <select
                  id="currency"
                  defaultValue={plantData.value["currency"]}
                  onChange={(e) => handleYield(e)}
                >
                  <option value="vnd">VND</option>
                  <option value="usd">USD</option>
                </select>
              </div>
            </div>

            <div className="DAT_AddProject_YieldInfo_Body_Center">
              <div className="DAT_AddProject_YieldInfo_Body_Center_Item">
                <div className="DAT_AddProject_YieldInfo_Body_Center_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Đơn giá(VND/kWh):</span>
                </div>
                <input
                  id="price"
                  type="text"
                  onChange={(e) => handleYield(e)}
                />
              </div>
            </div>

            <div className="DAT_AddProject_YieldInfo_Body_Right"></div>
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

  const handleOwner = (e) => {
    plantData.value[e.currentTarget.id] = e.currentTarget.value;
  };

  return (
    <div className="DAT_AddProject_OwnerInfo">
      <div className="DAT_AddProject_OwnerInfo_Tit">
        <div className="DAT_AddProject_OwnerInfo_Tit_Left">{props.tit}</div>

        <div
          className="DAT_AddProject_OwnerInfo_Tit_Right"
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
          <div className="DAT_AddProject_OwnerInfo_Body">
            <div className="DAT_AddProject_OwnerInfo_Body_Left">
              <div className="DAT_AddProject_OwnerInfo_Body_Left_Item">
                <div className="DAT_AddProject_OwnerInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Người liên hệ:</span>
                </div>
                <input
                  id="contact"
                  type="text"
                  onChange={(e) => handleOwner(e)}
                />
              </div>
            </div>

            <div className="DAT_AddProject_OwnerInfo_Body_Center">
              <div className="DAT_AddProject_OwnerInfo_Body_Center_Item">
                <div className="DAT_AddProject_OwnerInfo_Body_Center_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Số điện thoại:</span>
                </div>
                <input
                  id="phone"
                  type="text"
                  onChange={(e) => handleOwner(e)}
                />
              </div>
            </div>

            <div className="DAT_AddProject_OwnerInfo_Body_Right">
              <div className="DAT_AddProject_OwnerInfo_Body_Right_Item">
                <div className="DAT_AddProject_OwnerInfo_Body_Right_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Tên doanh nghiệp:</span>
                </div>
                <input
                  id="business"
                  type="text"
                  onChange={(e) => handleOwner(e)}
                />
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

function AddProject(props) {
  const handleSaveBasic = () => {
    var check = 0;
    Object.entries(plantData.value).map(([key, value]) => {
      if (plantData.value[key] === "") {
        check += 1;
      }
    });

    if (check !== 0) {
      console.log("vui long nhap day du thong tin");
    } else {
      console.log("tao du an thanh cong");
      lastId.value = lastId.value + 1;
      plantData.value["id"] = lastId.value;
      dataproject.value = [...dataproject.value, plantData.value];
      plantState.value = "default";
      plantData.value = {
        name: "",
        addr: "",
        long: "",
        lat: "",
        plantype: "residential",
        systemtype: "grid",
        capacity: "",
        griddate: "",
        angle: "",
        currency: "vnd",
        price: "",
        contact: "",
        phone: "",
        business: "",
        status: false,
        warn: false,
        production: "0",
        power: "0",
        lastupdate: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
        createdate: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
      };
      // console.log(dataproject.value);
      // console.log(lastId.value);
    }
  };

  return (
    <div className="DAT_AddProject">
      <div className="DAT_AddProject_Header">
        <div className="DAT_AddProject_Header_Left">Thêm dự án</div>

        <div className="DAT_AddProject_Header_Right">
          <div
            className="DAT_AddProject_Header_Right_Save"
            onClick={() => handleSaveBasic()}
          >
            <FaSave size={20} color="white" />
            <span>Lưu</span>
          </div>
          <div className="DAT_AddProject_Header_Right_Close">
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
        height={isMobile.value ? "700px" : "300px"}
      />

      <SystemInfo
        tit={"Thông tin hệ thống"}
        height={isMobile.value ? "530px" : "190px"}
      />

      <YieldInfo
        tit={"Thông tin sản lượng"}
        height={isMobile.value ? "220px" : "100px"}
      />

      <OwnerInfo
        tit={"Thông tin người sở hữu"}
        height={isMobile.value ? "320px" : "100px"}
      />
    </div>
  );
}

export default AddProject;
