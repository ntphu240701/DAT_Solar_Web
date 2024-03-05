import React, { useEffect, useState } from "react";
import "./Project.scss";
import { plantState, projectData } from "./Project";
import GoogleMap from "google-maps-react-markers";

import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { isMobile } from "../Navigation/Navigation";
import moment from "moment-timezone";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { alertDispatch } from "../Alert/Alert";
import { userInfor } from "../../App";
import { setKey, geocode, RequestType } from "react-geocode";
import { useIntl } from "react-intl";
import Resizer from "react-image-file-resizer";

const BasicInfo = (props) => {
  const dataLang = useIntl();
  const [state, setState] = useState(true);
  const defaultProps = {
    center: {
      lat: 10.8356853,
      lng: 106.6271617,
    },
    zoom: 7.0,
  };

  const handleBasic = (e) => {
    projectData.value[e.currentTarget.id] = e.currentTarget.value;

  };

  const handleMap = (e) => {
    const addr = document.getElementById("addr")
    console.log(addr.value)
    setKey(process.env.REACT_APP_GGKEY);
    geocode(RequestType.ADDRESS, addr.value)
      .then((response) => {
        console.log(response.results[0].geometry.location);

        var long_ = document.getElementById("long")
        var lat_ = document.getElementById("lat")
        lat_.value = response.results[0].geometry.location.lat
        long_.value = response.results[0].geometry.location.lng
        projectData.value = {
          ...projectData.value,
          lat: response.results[0].geometry.location.lat,
          long: response.results[0].geometry.location.lng,
        }


      })
      .catch((error) => {
        alertDispatch(dataLang.formatMessage({ id: "alert_19" }))

      });
  }


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
            <div className="DAT_EditProject_BasicInfo_Body_Left">
              <div className="DAT_EditProject_BasicInfo_Body_Left_Item">
                <div className="DAT_EditProject_BasicInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Tên dự án:</span>
                </div>
                <input
                  id="plantname"
                  type="text"
                  defaultValue={projectData.value.plantname}
                  onChange={(e) => handleBasic(e)}
                />
              </div>

              <div className="DAT_EditProject_BasicInfo_Body_Left_Item">
                <div className="DAT_EditProject_BasicInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Địa chỉ:</span>
                </div>
                <input
                  id="addr"
                  type="text"
                  defaultValue={projectData.value.addr}
                  onChange={(e) => handleBasic(e)}
                />
              </div>

              <div className="DAT_EditProject_BasicInfo_Body_Left_Item">
                <div className="DAT_EditProject_BasicInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Tọa độ:</span>
                </div>
                <div className="DAT_EditProject_BasicInfo_Body_Left_Item_Posi">
                  <div className="DAT_EditProject_BasicInfo_Body_Left_Item_Posi_Content">
                    <div className="DAT_EditProject_BasicInfo_Body_Left_Item_Posi_Content_Tit">
                      Kinh độ
                    </div>
                    <input
                      id="long"
                      type="text"
                      defaultValue={projectData.value.long}
                      onChange={(e) => handleBasic(e)}
                      onClick={(e) => handleMap(e)}
                    />
                  </div>
                  <div className="DAT_EditProject_BasicInfo_Body_Left_Item_Posi_Content">
                    <div className="DAT_EditProject_BasicInfo_Body_Left_Item_Posi_Content_Tit">
                      Vĩ độ
                    </div>
                    <input
                      id="lat"
                      type="text"
                      defaultValue={projectData.value.lat}
                      onChange={(e) => handleBasic(e)}
                      onClick={(e) => handleMap(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="DAT_EditProject_BasicInfo_Body_Right">
              <div className="DAT_EditProject_BasicInfo_Body_Right_Item">
                <div className="DAT_EditProject_BasicInfo_Body_Right_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Vị trí:</span>
                </div>
                <div className="DAT_EditProject_BasicInfo_Body_Right_Item_Content">
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
    projectData.value[e.currentTarget.id] = e.currentTarget.value;
  };

  const handleDate = (e) => {
    projectData.value[e.currentTarget.id] = moment(
      e.currentTarget.value
    ).format("MM/DD/YYYY");
  };

  useEffect(() => {
    projectData.value["griddate"] = moment(new Date()).format("MM/DD/YYYY");
  }, []);

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
            <div className="DAT_EditProject_SystemInfo_Body_Left">
              <div className="DAT_EditProject_SystemInfo_Body_Left_Item">
                <div className="DAT_EditProject_SystemInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Loại dự án:</span>
                </div>
                <select
                  id="planttype"
                  defaultValue={projectData.value.planttype}
                  onChange={(e) => handleSystem(e)}
                >
                  <option value="residential">Hộ dân</option>
                  <option value="industry">Nhà máy</option>
                </select>
              </div>

              <div className="DAT_EditProject_SystemInfo_Body_Left_Item">
                <div className="DAT_EditProject_SystemInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Loại hệ thống điện:</span>
                </div>
                <select
                  id="plantmode"
                  defaultValue={projectData.value.plantmode}
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

            <div className="DAT_EditProject_SystemInfo_Body_Center">
              <div className="DAT_EditProject_SystemInfo_Body_Center_Item">
                <div className="DAT_EditProject_SystemInfo_Body_Center_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Dung lượng(kWp):</span>
                </div>
                <input
                  id="capacity"
                  type="text"
                  defaultValue={projectData.value.capacity}
                  onChange={(e) => handleSystem(e)}
                />
              </div>

              <div className="DAT_EditProject_SystemInfo_Body_Center_Item">
                <div className="DAT_EditProject_SystemInfo_Body_Center_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Dữ liệu trên lưới:</span>
                </div>
                <input
                  id="griddate"
                  type="date"
                  defaultValue={moment(projectData.value.griddate).format(
                    "YYYY-MM-DD"
                  )}
                  onChange={(e) => handleDate(e)}
                />
              </div>
            </div>

            <div className="DAT_EditProject_SystemInfo_Body_Right">
              <div className="DAT_EditProject_SystemInfo_Body_Right_Item">
                <div className="DAT_EditProject_SystemInfo_Body_Right_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Góc nghiêng:</span>
                </div>
                <input
                  id="angle"
                  type="text"
                  defaultValue={projectData.value.angle}
                  onChange={(e) => handleSystem(e)}
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

const YieldInfo = (props) => {
  const [state, setState] = useState(true);

  const handleYield = (e) => {
    projectData.value[e.currentTarget.id] = e.currentTarget.value;
  };

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
            <div className="DAT_EditProject_YieldInfo_Body_Left">
              <div className="DAT_EditProject_YieldInfo_Body_Left_Item">
                <div className="DAT_EditProject_YieldInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Tiền tệ:</span>
                </div>
                <select
                  id="currency"
                  defaultValue={projectData.value.currency}
                  onChange={(e) => handleYield(e)}
                >
                  <option value="vnd">VND</option>
                  <option value="usd">USD</option>
                </select>
              </div>
            </div>

            <div className="DAT_EditProject_YieldInfo_Body_Center">
              <div className="DAT_EditProject_YieldInfo_Body_Center_Item">
                <div className="DAT_EditProject_YieldInfo_Body_Center_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Đơn giá(VND/kWh):</span>
                </div>
                <input
                  id="price"
                  type="text"
                  defaultValue={projectData.value.price}
                  onChange={(e) => handleYield(e)}
                />
              </div>
            </div>

            <div className="DAT_EditProject_YieldInfo_Body_Right"></div>
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
    projectData.value[e.currentTarget.id] = e.currentTarget.value;
  };

  return (
    <div className="DAT_EditProject_OwnerInfo">
      <div className="DAT_EditProject_OwnerInfo_Tit">
        <div className="DAT_EditProject_OwnerInfo_Tit_Left">{props.tit}</div>

        <div className="DAT_EditProject_OwnerInfo_Tit_Right"
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
            <div className="DAT_EditProject_OwnerInfo_Body_Left">
              <div className="DAT_EditProject_OwnerInfo_Body_Left_Item">
                <div className="DAT_EditProject_OwnerInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Người liên hệ:</span>
                </div>
                <input
                  id="contact"
                  type="text"
                  defaultValue={projectData.value.contact}
                  onChange={(e) => handleOwner(e)}
                />
              </div>
            </div>

            <div className="DAT_EditProject_OwnerInfo_Body_Center">
              <div className="DAT_EditProject_OwnerInfo_Body_Center_Item">
                <div className="DAT_EditProject_OwnerInfo_Body_Center_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Số điện thoại:</span>
                </div>
                <input
                  id="phone"
                  type="text"
                  defaultValue={projectData.value.phone}
                  onChange={(e) => handleOwner(e)}
                />
              </div>
            </div>

            <div className="DAT_EditProject_OwnerInfo_Body_Right">
              <div className="DAT_EditProject_OwnerInfo_Body_Right_Item">
                <div className="DAT_EditProject_OwnerInfo_Body_Right_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Tên doanh nghiệp:</span>
                </div>
                <input
                  id="business"
                  type="text"
                  defaultValue={projectData.value.business}
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
  const [ava, setAva] = useState(projectData.value.img ? projectData.value.img : "/dat_picture/solar_panel.png");
  const resizeFilAvatar = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        180,
        180,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });


  const handleChooseAvatar = async (e) => {
    // setAva(URL.createObjectURL(e.target.files[0]));
    // console.log(e.target.files[0].name);
    // projectData.value[e.currentTarget.id] = e.current
    var reader = new FileReader();
    console.log("old size", e.target.files[0].size)
    if (e.target.files[0].size > 50000) {
      const image = await resizeFilAvatar(e.target.files[0]);
      reader.readAsDataURL(image);
      reader.onload = () => {
        setAva(reader.result);
        projectData.value.img = reader.result;
      }
    } else {
      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files[0].size)
      reader.onload = () => {
        setAva(reader.result);
        projectData.value.img = reader.result;
      };
    }
  };

  return (
    <div className="DAT_EditProject_ImgInfo">
      <div className="DAT_EditProject_ImgInfo_Tit">
        <div className="DAT_EditProject_ImgInfo_Tit_Left">{props.tit}</div>

        <div className="DAT_EditProject_ImgInfo_Tit_Right"
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
          <div className="DAT_EditProject_ImgInfo_Body">
            <div className="DAT_EditProject_ImgInfo_Body_Ava">
              <div className="DAT_EditProject_ImgInfo_Body_Ava_Img">
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

function EditProject(props) {
  const handleSave = () => {
    var check = 0;
    Object.entries(projectData.value).map(([key, value]) => {
      if (projectData.value[key] === "") {
        check += 1;
      }
    });

    if (check !== 0) {
      alertDispatch("vui long nhap day du thong tin");
    } else {
      const editProject = async (
        plantid,
        usrname,
        plantname,
        company,
        addr,
        long,
        lat,
        contact,
        phone,
        business,
        planttype,
        plantmode,
        griddate,
        capacity,
        angle,
        currency,
        price,
        production,
        power,
        partnerid,
        usrtype,
        img
      ) => {
        let d = await callApi('post', host.DATA + '/editPlant', {
          plantid: plantid,
          usr: usrname,
          name: plantname,
          company: company,
          addr: addr,
          long: long,
          lat: lat,
          contact: contact,
          phone: phone,
          business: business,
          type: planttype,
          mode: plantmode,
          griddate: griddate,
          capacity: capacity,
          angle: angle,
          currency: currency,
          price: price,
          production: production,
          power: power,
          partnerid: partnerid,
          usrtype: usrtype,
          img: img
        })
        if (d.status === true) {
          alertDispatch("Dự án đã được cập nhật");
          plantState.value = "default";
        }
      };
      editProject(
        projectData.value.plantid,
        props.usr,
        projectData.value.plantname,
        projectData.value.company,
        projectData.value.addr,
        projectData.value.long,
        projectData.value.lat,
        projectData.value.contact,
        projectData.value.phone,
        projectData.value.business,
        projectData.value.planttype,
        projectData.value.plantmode,
        projectData.value.griddate,
        projectData.value.capacity,
        projectData.value.angle,
        projectData.value.currency,
        projectData.value.price,
        projectData.value.production,
        projectData.value.power,
        userInfor.value.partnerid,
        userInfor.value.type,
        projectData.value.img ? projectData.value.img : "/dat_picture/solar_panel.png"
      );
    }
  };

  return (
    <div className="DAT_EditProject">
      <div className="DAT_EditProject_Header">
        <div className="DAT_EditProject_Header_Left">Chỉnh sửa dự án</div>

        <div className="DAT_EditProject_Header_Right">
          <div
            className="DAT_EditProject_Header_Right_Save"
            onClick={() => handleSave()}
          >
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

export default EditProject;
