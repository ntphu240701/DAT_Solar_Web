import React, { useEffect, useRef } from "react";
import "./Navigation.scss";
import { sidenar } from "../../component/Sidenar/Sidenar";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineLanguage } from "react-icons/md";
import { signal } from "@preact/signals-react";
import { FaRegMessage } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { partnerInfor, userInfor } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { alertDispatch } from "../Alert/Alert";
import { useIntl } from "react-intl";
import adminslice from "../Redux/adminslice";
import { dataWarn } from "../Warn/Warn";

export const isMobile = signal(false);
const userNav = signal(false);
export const notifNav = signal(false);
const langNav = signal(false);
const langStateNav = signal([false, false]);
const messageNav = signal(false);

export const message = signal([
  {
    boxid: "E01",
    total: 0,
  },
  {
    boxid: "E02",
    total: 0,
  },
  {
    boxid: "E03",
    total: 0,
  },
]);
const messageContent = signal([]);
const messageOption = signal("default");

function Navigation(props) {
  const dataLang = useIntl();
  const navigate = useNavigate();
  const user_icon = useRef();
  const user_box = useRef();
  const notif_icon = useRef();
  const notif_box = useRef();
  const mail = useSelector((state) => state.admin.mail);
  const lang = useSelector((state) => state.admin.lang);
  const usr = useSelector((state) => state.admin.usr);
  const rootDispatch = useDispatch();

  const handleWindowResize = () => {
    if (window.innerWidth >= 900) {
      isMobile.value = false;
      messageOption.value = "default";
    } else {
      isMobile.value = true;
      messageOption.value = "mess";
    }
  };
  const handleOutsideLang = () => {
    setTimeout(() => {
      //console.log(langState.value[0],langState.value[1])
      if (langStateNav.value[1] == false) {
        langNav.value = false;
        langStateNav.value = [false, false];
      }

      clearTimeout();
    }, 250);
  };

  let handleOutsideUser = (e) => {
    if (!user_icon.current.contains(e.target)) {
      if (!user_box.current.contains(e.target)) {
        userNav.value = false;
      }
    }
  };

  let handleOutsideNotif = (e) => {
    if (!notif_icon.current.contains(e.target)) {
      if (!notif_box.current.contains(e.target)) {
        notifNav.value = false;
      }
    }
  };

  const handleMenu = (event) => {
    sidenar.value = !sidenar.value;
  };

  const handleMessage = (e) => {
    let warnid = [];
    messageContent.value = dataWarn.value.filter((item, i) => {
      if (item.boxid == e.currentTarget.id) {
        warnid.push(item.warnid);
        return item;
      }
    });
    warnid.map((item_) => {
      let index = dataWarn.value.findIndex((item, i) => item.warnid == item_);
      dataWarn.value[index] = {
        ...dataWarn.value[index],
        state: true,
      };
    });

    message.value.map((item) => {
      let data = dataWarn.value.filter((item_) => item_.boxid == item.boxid);
      item.total = data.filter((item) => item.state == false).length;
    });

    warnid = [];
    // dataWarn.value.map((item)=>{

    //   if(item.boxid == e.currentTarget.id){

    //   }

    // })
    console.log(dataWarn.value);

    console.log(messageContent.value);
    messageNav.value = true;
    if (isMobile.value) {
      messageOption.value = "content";
    }
  };

  // useEffect(() => {
  //   tabLable.value = listTab[0].name;

  //   // get logger
  //   const getAllLogger = async (usrname, partnerid, type) => {
  //     let d = await callApi('post', host.DATA + '/getallLogger', { usr: usrname, partnerid: partnerid, type: type });
  //     if (d.status === true) {
  //       loggerList.value = d.data;
  //     }
  //   };
  //   getAllLogger(user, userInfor.value.partnerid, userInfor.value.type);

  // }, []);

  useEffect(function () {
    if (window.innerWidth >= 900) {
      isMobile.value = false;
      messageOption.value = "default";
    } else {
      isMobile.value = true;
      messageOption.value = "mess";
    }

    document.addEventListener("mousedown", handleOutsideUser);
    document.addEventListener("mousedown", handleOutsideNotif);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      document.removeEventListener("mousedown", handleOutsideUser);
      document.removeEventListener("mousedown", handleOutsideNotif);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  let logout = function () {
    //navigate('/Login');
    const setDefault = async () => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/Logout");
      window.location.reload();
    };
    setDefault();
  };

  const handleLang = async (lang_) => {
    let d = await callApi("post", host.DATA + "/updateUser", {
      usr: usr,
      type: "lang",
      data: lang_,
    });
    if (d.status) {
      alertDispatch(dataLang.formatMessage({ id: "alert_6" }));
      rootDispatch(adminslice.actions.setlang(lang_));
    } else {
      alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
    }
  };

  useEffect(() => {
    message.value.map((item) => {
      let data = dataWarn.value.filter((item_) => item_.boxid == item.boxid);
      item.total = data.filter((item) => item.state == false).length;
    });
  }, [dataWarn.value]);

  return (
    <>
      <div className="DAT_Navigation">
        <div className="DAT_Navigation-menu">
          <button
            id="DAT_menuaction"
            onClick={(event) => {
              handleMenu(event);
            }}
          >
            <BsFillMenuButtonWideFill color="white" size={22} />
          </button>
        </div>
        <div className="DAT_Navigation_left">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="DAT_Navigation_left-logo">
              <img
                src={
                  partnerInfor.value.logo
                    ? partnerInfor.value.logo
                    : "/dat_icon/logo_DAT.png"
                }
                alt=""
                style={{ height: "30px" }}
              />
            </div>
          </Link>
        </div>
        <div className="DAT_Navigation_center"></div>
        <div className="DAT_Navigation_right">
          {/* <button
                        className="DAT_Navigation_right-item"
                        id="notif"
                        style={{ display: isMobile.value ? "none" : "block" }}
                    >
                        <IoAddCircleOutline color='white' size={24} />
                    </button > */}

          <button
            className="DAT_Navigation_right-item"
            id="notif"
            // style={{ display: isMobile.value ? "none" : "block" }}
            onClick={() => (notifNav.value = !notifNav.value)}
            ref={notif_icon}
          >
            <IoIosNotificationsOutline color="white" size={22} />

            {dataWarn.value.filter((item) => item.state == false).length ===
              0 ? (
              <></>
            ) : (
              <span>
                {dataWarn.value.filter((item) => item.state == false).length}
              </span>
            )}
          </button>

          <button
            className="DAT_Navigation_right-language"
            id="lang"
            onMouseEnter={() => {
              langNav.value = true;
              langStateNav.value = [true, false];
            }}
            onMouseLeave={() => handleOutsideLang()}
          >
            <MdOutlineLanguage color="white" size={22} />
            <span>{lang === "vi" ? "Vi" : "En"}</span>
          </button>

          <button
            className="DAT_Navigation_right-item"
            id="user"
            style={{
              backgroundColor: "rgba(159, 155, 155, 0.4)",
              overflow: "hidden",
            }}
            onClick={() => (userNav.value = !userNav.value)}
            ref={user_icon}
          >
            <img
              src={
                userInfor.value.avatar
                  ? userInfor.value.avatar
                  : "/dat_icon/user_manager.png"
              }
              alt=""
            />
          </button>
        </div>
      </div>

      <div
        className="DAT_NavUser"
        style={{ display: userNav.value ? "block" : "none" }}
        ref={user_box}
      >
        <div className="DAT_NavUser-inf">
          <div className="DAT_NavUser-inf-img">
            <img
              src={
                userInfor.value.avatar
                  ? userInfor.value.avatar
                  : "/dat_icon/user_manager.png"
              }
              alt=""
            />
          </div>
          <div className="DAT_NavUser-inf-content">
            <div className="DAT_NavUser-inf-content-name">
              {userInfor.value.name}
            </div>
            <div className="DAT_NavUser-inf-content-email">{mail}</div>
          </div>
        </div>
        <div
          className="DAT_NavUser-item"
          style={{ cursor: "pointer", borderBottom: "1px solid gray" }}
          onClick={() => navigate("/User")}
        >
          <span>{dataLang.formatMessage({ id: "account" })}</span>
        </div>
        <div className="DAT_NavUser-item" onClick={() => logout()}>
          <span>{dataLang.formatMessage({ id: "logout" })}</span>
        </div>
      </div>

      <div
        className="DAT_NavNotif"
        style={{ display: notifNav.value ? "block" : "none" }}
        ref={notif_box}
      >
        <div className="DAT_NavNotif-title">
          <span>{dataLang.formatMessage({ id: "notification" })}</span>

          {isMobile.value && messageOption.value === "content" ? (
            <div
              className="DAT_NavNotif-title-close"
              onClick={() => (messageOption.value = "mess")}
            >
              <IoMdClose size={15} color="white" />
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="DAT_NavNotif-content">
          {(() => {
            switch (messageOption.value) {
              case "mess":
                return (
                  <div className="DAT_NavNotif-content-message">
                    {message.value.map((item, index) => (
                      <div
                        className="DAT_NavNotif-content-message-group"
                        id={item.boxid}
                        key={item.boxid}
                        onClick={(e) => handleMessage(e)}
                      >
                        <div className="DAT_NavNotif-content-message-group-tit">
                          <span>{item.boxid}</span>
                          {item.total === 0 ? <></> : <span>{item.total}</span>}
                        </div>
                        {/* <div className="DAT_NavNotif-content-message-group-inf">
                            Có một {item.boxid} tại {""} {item.detail}
                          </div> */}
                      </div>
                    ))}
                  </div>
                );
              case "content":
                return (
                  <div className="DAT_NavNotif-content-main">
                    {messageNav.value ? (
                      <>
                        {messageContent.value.map((item, index) => (
                          <div
                            className="DAT_NavNotif-content-main-group"
                            key={index}
                          >
                            <div className="DAT_NavNotif-content-main-group-datetime">
                              {item.opentime}
                            </div>
                            <div className="DAT_NavNotif-content-main-group-content">
                              <div className="DAT_NavNotif-content-main-group-content-tit">
                                Có một {item.boxid} tại {item.plant}
                              </div>
                              <div className="DAT_NavNotif-content-main-group-content-device">
                                Thiết bị:{" "}
                                <span style={{ color: "black" }}>
                                  {item.device}
                                </span>
                              </div>
                              <div className="DAT_NavNotif-content-main-group-content-level">
                                Mức độ:{" "}
                                <span style={{ color: "black" }}>
                                  {item.level}
                                </span>
                              </div>
                              <div className="DAT_NavNotif-content-main-group-content-status">
                                Vui lòng kiểm tra!
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="DAT_NavNotif-content-main-empty">
                        <FaRegMessage size={60} color="gray" />
                      </div>
                    )}
                  </div>
                );
              default:
                return (
                  <>
                    <div className="DAT_NavNotif-content-message">
                      {message.value.map((item, index) => (
                        <div
                          className="DAT_NavNotif-content-message-group"
                          id={item.boxid}
                          key={item.boxid}
                          onClick={(e) => handleMessage(e)}
                        >
                          <div className="DAT_NavNotif-content-message-group-tit">
                            <span>{dataLang.formatMessage({ id: item.boxid })}</span>
                            {item.total === 0 ? (
                              <></>
                            ) : (
                              <span>{item.total}</span>
                            )}
                          </div>
                          {/* <div className="DAT_NavNotif-content-message-group-inf">
                            Có một {item.boxid} tại {""} {item.detail}
                          </div> */}
                        </div>
                      ))}
                    </div>
                    <div className="DAT_NavNotif-content-main">
                      {messageNav.value ? (
                        <>
                          {messageContent.value.map((item, index) => (
                            <div
                              className="DAT_NavNotif-content-main-group"
                              key={index}
                            >
                              <div className="DAT_NavNotif-content-main-group-datetime">
                                {item.opentime}
                              </div>
                              <div className="DAT_NavNotif-content-main-group-content">
                                <div className="DAT_NavNotif-content-main-group-content-tit">
                                  {dataLang.formatMessage({ id: item.boxid })} {dataLang.formatMessage({ id: 'at' })}{" "}
                                  {item.plant}
                                </div>
                                <div className="DAT_NavNotif-content-main-group-content-device">
                                  {dataLang.formatMessage({ id: 'device' })}:{" "}
                                  <span style={{ color: "black" }}>
                                    {item.device}
                                  </span>
                                </div>
                                <div className="DAT_NavNotif-content-main-group-content-level">
                                  {dataLang.formatMessage({ id: 'level' })}:{" "}
                                  <span style={{ color: "black" }}>
                                    {item.level}
                                  </span>
                                </div>
                                <div className="DAT_NavNotif-content-main-group-content-status">
                                  {dataLang.formatMessage({ id: 'remindAlert' })}
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="DAT_NavNotif-content-main-empty">
                          <FaRegMessage size={60} color="gray" />
                        </div>
                      )}
                    </div>
                  </>
                );
            }
          })()}
        </div>

        {/* <div className='DAT_NavNotif-footer'>
          Chỉ hiển thị thông báo trong 6 tháng
         </div> */}
      </div>

      <div
        className="DAT_NavLang"
        style={{ display: langNav.value ? "block" : "none" }}
        onMouseEnter={() => {
          langStateNav.value = [true, true];
        }}
        onMouseLeave={() => {
          langNav.value = false;
          langStateNav.value = [false, false];
        }}
      >
        <div
          className="DAT_NavLang-item"
          style={{
            backgroundColor: lang === "vi" ? "rgba(41, 95, 255)" : "white",
            color: lang === "vi" ? "white" : "black",
          }}
          onClick={() => {
            handleLang("vi");
          }}
        >
          <span>Tiếng Việt</span>
        </div>
        <div
          className="DAT_NavLang-item"
          style={{
            backgroundColor: lang === "en" ? "rgba(41, 95, 255)" : "white",
            color: lang === "en" ? "white" : "black",
          }}
          onClick={() => {
            handleLang("en");
          }}
        >
          <span>English</span>
        </div>
      </div>
    </>
  );
}

export default Navigation;
