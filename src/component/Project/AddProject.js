import React, { useEffect, useState } from "react";
import "./Project.scss";
import { dataproject, plantState } from "./Project";
import { isMobile } from "../Navigation/Navigation";

import { signal } from "@preact/signals-react";
import GoogleMap from "google-maps-react-markers";
import moment from "moment-timezone";

import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { alertDispatch } from "../Alert/Alert";
import { userInfor } from "../../App";

export const plantData = signal({
  addr: "",
  angle: "",
  business: "",
  capacity: "",
  company: "DAT Group",
  contact: "",
  createdate: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
  currency: "vnd",
  griddate: "",
  lastupdate: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
  lat: "",
  long: "",
  phone: "",
  plantmode: "grid",
  plantname: "",
  planttype: "residential",
  power: "0",
  price: "",
  production: "0",
  state: 0,
  warn: 0,
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
                  id="plantname"
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
                  id="planttype"
                  defaultValue={plantData.value["planttype"]}
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
                  id="plantmode"
                  defaultValue={plantData.value["plantmode"]}
                  onChange={(e) => handleSystem(e)}
                >
                  <option value="grid">Hệ thống hòa lưới</option>
                  <option value="consumption">Hệ thống hòa lưới bám tải</option>
                  <option value="hybrid">Hệ thống lưu trữ hybrid</option>
                  <option value="ESS">Hệ thống lưu trữ năng lượng ESS</option>
                  {/* <option value="pump">Hệ thống solar pump</option> */}
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

const ImgInfo = (props) => {
  const [state, setState] = useState(true);
  const [ava, setAva] = React.useState();
  const handleChooseAvatar = (e) => {
    setAva(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0].name);
  };

  return (
    <div className="DAT_AddProject_ImgInfo">
      <div className="DAT_AddProject_ImgInfo_Tit">
        <div className="DAT_AddProject_ImgInfo_Tit_Left">{props.tit}</div>

        <div className="DAT_AddProject_ImgInfo_Tit_Right"
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
          <div className="DAT_AddProject_ImgInfo_Body">
            <div className="DAT_AddProject_ImgInfo_Body_Ava">
              <div className="DAT_AddProject_ImgInfo_Body_Ava_Img">
                <img src={ava} alt="" />
              </div>
              <input
                type="file"
                id="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => handleChooseAvatar(e)}
              />
              <label htmlFor="file" style={{ cursor: "pointer" }}>
                Chọn ảnh
              </label>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function AddProject(props) {
  const handleSaveBasic = () => {
    var check = 0;
    Object.entries(plantData.value).map(([key, value]) => {
      if (plantData.value[key] === "") {
        check += 1;
      }
    });

    if (check !== 0) {
      alertDispatch("Vui lòng nhập đầy đủ thông tin");
    } else {
      // alertDispatch("Tạo dự án thành công");
      const addProject = async (
        usrname,
        plantname,
        company,
        addr,
        long,
        lat,
        contact,
        phone,
        business,
        plantytype,
        plantmode,
        griddate,
        capacity,
        angle,
        currency,
        price,
        production,
        power,
        partnerid
      ) => {
        let d = await callApi('post', host.DATA + '/addPlant', {
          usr: usrname,
          name: plantname,
          company: company,
          addr: addr,
          long: long,
          lat: lat,
          contact: contact,
          phone: phone,
          business: business,
          type: plantytype,
          mode: plantmode,
          griddate: griddate,
          capacity: capacity,
          angle: angle,
          currency: currency,
          price: price,
          production: production,
          power: power,
          partnerid: partnerid
        })
        //console.log(d);
        if (d.status === true) {
          alertDispatch("Dự án đã được thêm");
          dataproject.value = [...dataproject.value, d.data];
          //console.log(dataproject.value);
          plantState.value = "default";
          plantData.value = {
            addr: "",
            angle: "",
            business: "",
            capacity: "",
            company: "",
            contact: "",
            createdate: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
            currency: "vnd",
            griddate: "",
            lastupdate: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
            lat: "",
            long: "",
            phone: "",
            plantmode: "grid",
            plantname: "",
            planttype: "residential",
            power: "0",
            price: "",
            production: "0",
            state: 0,
            warn: 0,
          };
        }
      };

      addProject(
        props.usr,
        plantData.value.plantname,
        plantData.value.company,
        plantData.value.addr,
        plantData.value.long,
        plantData.value.lat,
        plantData.value.contact,
        plantData.value.phone,
        plantData.value.business,
        plantData.value.planttype,
        plantData.value.plantmode,
        plantData.value.griddate,
        plantData.value.capacity,
        plantData.value.angle,
        plantData.value.currency,
        plantData.value.price,
        plantData.value.production,
        plantData.value.power,
        userInfor.value.partnerid
      );
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

      <ImgInfo
        tit={"Ảnh đại diện"}
        height={isMobile.value ? "320px" : "260px"}
      />
    </div>
  );
}

export default AddProject;
