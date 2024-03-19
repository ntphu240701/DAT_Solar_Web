import React, { useEffect, useRef, useState } from "react";
import "./Navigation.scss";

import { sidenar } from "../../component/Sidenar/Sidenar";
import { Link, useNavigate } from "react-router-dom";
import { signal } from "@preact/signals-react";
import { partnerInfor, phuhosting, userInfor } from "../../App";
import { sidebartab, sidebartabli } from "../../component/Sidenar/Sidenar";
import { useDispatch, useSelector } from "react-redux";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { alertDispatch } from "../Alert/Alert";
import { useIntl } from "react-intl";
import adminslice from "../Redux/adminslice";
import { dataWarn } from "../Warn/Warn";

import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoIosNotificationsOutline, IoMdClose } from "react-icons/io";
import { MdOutlineLanguage } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { plantState, projectwarnfilter } from "../Project/Project";
import { IoLogInOutline } from "react-icons/io5";
import { PiUserCircle } from "react-icons/pi";

const userNav = signal(false);
const langNav = signal(false);
const langStateNav = signal([false, false]);
const messageNav = signal(false);
const messageContent = signal([]);
const messageOption = signal("default");

export const warnfilter = signal({ warnid: "" });
export const isMobile = signal(false);
export const notifNav = signal(false);
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

export default function Navigation(props) {
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
  const [code, setCode] = useState("default");

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
    setCode(e.currentTarget.id);
    const checkApi = async () => {
      const warn = await callApi("post", host.DATA + "/updateWarn", {
        partnerid: partnerInfor.value.partnerid,
        boxid: e.currentTarget.id,
        type: userInfor.value.type,
      });

      console.log(warn);
    };
    checkApi();

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
        state: 0,
      };
    });

    message.value.map((item) => {
      let data = dataWarn.value.filter((item_) => item_.boxid == item.boxid);
      item.total = data.filter((item) => item.state == 1).length;
    });

    warnid = [];
    console.log(dataWarn.value);
    console.log(messageContent.value);
    messageNav.value = true;
    if (isMobile.value) {
      messageOption.value = "content";
    }
  };

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

  useEffect(() => {
    // console.log(partnerInfor.value.partnerid, dataWarn.value.boxid, userInfor.value.type);
  });

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
      item.total = data.filter((item) => item.state == 1).length;
    });
  }, [dataWarn.value]);

  const handleFilterWarn = (e) => {
    projectwarnfilter.value = 0;
    warnfilter.value = dataWarn.value.find(
      (item) => item.warnid == e.currentTarget.id
    );
    notifNav.value = false;
    console.log(warnfilter.value);
  };
  return (
    <>
      <div
        className="DAT_Navigation"
        onClick={() => (plantState.value = "default")}
      >
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
          <div className="DAT_Navigation_left-logo">
            <img
              onClick={() => navigate("/")}
              src={
                partnerInfor.value.logo
                  ? partnerInfor.value.logo
                  : "/dat_icon/logo_DAT.png"
              }
              alt=""
              style={{ height: "40px", cursor: "pointer" }}
            />
          </div>
        </div>

        <div className="DAT_Navigation_right">
          <button
            className="DAT_Navigation_right-item"
            id="notif"
            onClick={() =>
              (notifNav.value = !notifNav.value)}
            ref={notif_icon}
          >
            <IoIosNotificationsOutline color="white" size={22} />

            {dataWarn.value.filter((item) => item.state == 1).length === 0 ? (
              <></>
            ) : (
              <span>
                {dataWarn.value.filter((item) => item.state == 1).length}
              </span>
            )}
          </button>

          <button
            className="DAT_Navigation_right-language"
            id="lang"
            onClick={() => {
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
          <PiUserCircle size={18} />
          &nbsp;
          <span>{dataLang.formatMessage({ id: "account" })}</span>
        </div>

        <div className="DAT_NavUser-item" onClick={() => logout()}>
          <IoLogInOutline size={18} />
          &nbsp;
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
                                {dataLang.formatMessage({ id: item.boxid })}
                                &nbsp;
                                {dataLang.formatMessage({ id: "at" })}
                                &nbsp;
                                {item.plant}
                              </div>
                              <div className="DAT_NavNotif-content-main-group-content-device">
                                {dataLang.formatMessage({ id: "device" })}:
                                &nbsp;
                                <span style={{ color: "black" }}>
                                  {item.device}
                                </span>
                              </div>
                              <div className="DAT_NavNotif-content-main-group-content-level">
                                {dataLang.formatMessage({ id: "level" })}:
                                &nbsp;
                                <span
                                  style={{
                                    color: "black",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {item.level}
                                </span>
                              </div>
                              <div className="DAT_NavNotif-content-main-group-content-status">
                                {dataLang.formatMessage({ id: "remindAlert" })}
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
                          style={{
                            backgroundColor:
                              code === item.boxid
                                ? "rgba(159, 155, 155, 0.2)"
                                : "white",
                          }}
                        >
                          <div className="DAT_NavNotif-content-message-group-tit">
                            <span>
                              {dataLang.formatMessage({ id: item.boxid })}
                            </span>
                            {item.total === 0 ? (
                              <></>
                            ) : (
                              <span>{item.total}</span>
                            )}
                          </div>
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
                              <Link
                                to="/Warn"
                                style={{ textDecoration: "none" }}
                              >
                                <div
                                  className="DAT_NavNotif-content-main-group-content"
                                  id={item.warnid}
                                  onClick={(e) => {
                                    handleFilterWarn(e);
                                    sidebartab.value = "Monitor";
                                    sidebartabli.value = "/Warn"
                                  }}
                                >
                                  <div className="DAT_NavNotif-content-main-group-content-tit">
                                    {dataLang.formatMessage({ id: item.boxid })}
                                    &nbsp;
                                    {dataLang.formatMessage({ id: "at" })}
                                    &nbsp;
                                    {item.plant}
                                  </div>
                                  <div className="DAT_NavNotif-content-main-group-content-device">
                                    {dataLang.formatMessage({ id: "device" })}:
                                    &nbsp;
                                    <span style={{ color: "black" }}>
                                      {item.device}
                                    </span>
                                  </div>
                                  <div className="DAT_NavNotif-content-main-group-content-level">
                                    {dataLang.formatMessage({ id: "level" })}:
                                    &nbsp;
                                    <span
                                      style={{
                                        color: "black",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {item.level}
                                    </span>
                                  </div>
                                  <div className="DAT_NavNotif-content-main-group-content-status">
                                    {dataLang.formatMessage({
                                      id: "remindAlert",
                                    })}
                                  </div>
                                </div>
                              </Link>
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
