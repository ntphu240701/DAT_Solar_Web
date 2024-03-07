import React, { useEffect, useState } from "react";
import "./Sidenar.scss";
import { signal } from "@preact/signals-react";
import { Link } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { isMobile, notifNav } from "../Navigation/Navigation";
import { SiDatabricks } from "react-icons/si";
import { RiSettingsLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { VscDashboard } from "react-icons/vsc";
import { userInfor } from "../../App";
import { useIntl } from "react-intl";
export const sidenar = signal(true);

const tab = signal("Dashboard");
const tabli = signal("none");

function Sidenar(props) {
  //Datalang
  const dataLang = useIntl();
  const data = {
    Dashboard: { icon: <VscDashboard />, link: "/", li: [] },
    Notif: { icon: <IoIosNotificationsOutline />, link: "/Notif", li: [] },
    Monitor: {
      icon: <SiDatabricks />,
      link: "none",
      li: [
        { link: "/Project", name: dataLang.formatMessage({ id: 'project' }) },
        { link: "/Device", name: dataLang.formatMessage({ id: 'device' }) },
        { link: "/Warn", name: dataLang.formatMessage({ id: 'warn' }) },
      ],
    },
    Analytics: {
      icon: <TbReportAnalytics />,
      link: "none",
      li: [
        { link: "/Report", name: dataLang.formatMessage({ id: 'report' }) },
        { link: "/Analytics", name: dataLang.formatMessage({ id: 'analytic' }) },
        { link: "/Log", name: dataLang.formatMessage({ id: 'log' }) },
      ],
    },
    Setting: {
      icon: <RiSettingsLine />,
      link: "none",
      li: userInfor.value.type === "master" ? [
        { link: "/Role", name: dataLang.formatMessage({ id: 'role' }) },
        { link: "/GroupRole", name: dataLang.formatMessage({ id: 'grouprole' }) },
        { link: "/User", name: dataLang.formatMessage({ id: 'account' }) },
        { link: "/Contact", name: dataLang.formatMessage({ id: 'contact' }) },
        { link: "/Rule", name: dataLang.formatMessage({ id: 'rule' }) },
      ] : userInfor.value.type === "admin" ? [
          { link: "/Role", name: dataLang.formatMessage({ id: 'role' }) },
          // { link: "/GroupRole", name: dataLang.formatMessage({ id: 'grouprole' }) },
          { link: "/User", name: dataLang.formatMessage({ id: 'account' }) },
          { link: "/Contact", name: dataLang.formatMessage({ id: 'contact' }) },
          { link: "/Rule", name: dataLang.formatMessage({ id: 'rule' }) },
      ] : [
          // { link: "/GroupRole", name: dataLang.formatMessage({ id: 'grouprole' }) },
          { link: "/User", name: dataLang.formatMessage({ id: 'account' }) },
          { link: "/Contact", name: dataLang.formatMessage({ id: 'contact' }) },
      ],
    },
  }
  const dataColor = {
    cur: { color: "#0061f2" },
    pre: { color: "rgb(85, 85, 85)" },
  };

  useEffect(function () {
    isMobile.value ? (sidenar.value = false) : (sidenar.value = true);
    // let data_ = []
    // switch (userInfor.value.type) {
    //   case "master":
    //     data_ =[
    //       { link: "/Role", name: dataLang.formatMessage({ id: 'role' }) },
    //       { link: "/GroupRole", name: dataLang.formatMessage({ id: 'grouprole' }) },
    //       { link: "/User", name: dataLang.formatMessage({ id: 'account' }) },
    //       { link: "/Contact", name: dataLang.formatMessage({ id: 'contact' }) },
    //       { link: "/Rule", name: dataLang.formatMessage({ id: 'rule' }) },
    //     ]
    //    break;
    //   case "admin":
    //     data_ = [
    //       { link: "/Role", name: dataLang.formatMessage({ id: 'role' }) },
    //       // { link: "/GroupRole", name: dataLang.formatMessage({ id: 'grouprole' }) },
    //       { link: "/User", name: dataLang.formatMessage({ id: 'account' }) },
    //       { link: "/Contact", name: dataLang.formatMessage({ id: 'contact' }) },
    //       { link: "/Rule", name: dataLang.formatMessage({ id: 'rule' }) },
    //     ]
    //     break;
    //   default:
    //     data_ = [
    //       // { link: "/GroupRole", name: dataLang.formatMessage({ id: 'grouprole' }) },
    //       { link: "/User", name: dataLang.formatMessage({ id: 'account' }) },
    //       { link: "/Contact", name: dataLang.formatMessage({ id: 'contact' }) },
    //     ]
    //     break;
    // }

    // data = {
    //   ...data,
    //   Setting: {
    //     ...data.Setting,
    //     li:data_
    //   }
    // }




  }, []);




  // userInfor.value.type === "user" ? [
  //   { link: "/Role", name: dataLang.formatMessage({ id: 'role' }) },
  //   { link: "/GroupRole", name: dataLang.formatMessage({ id: 'grouprole' }) },
  //   { link: "/User", name: dataLang.formatMessage({ id: 'account' }) },
  //   { link: "/Contact", name: dataLang.formatMessage({ id: 'contact' }) },
  //   { link: "/Rule", name: dataLang.formatMessage({ id: 'rule' }) },
  // ] : [

  //   { link: "/GroupRole", name: dataLang.formatMessage({ id: 'grouprole' }) },
  //   { link: "/User", name: dataLang.formatMessage({ id: 'account' }) },
  //   { link: "/Contact", name: dataLang.formatMessage({ id: 'contact' }) },

  // ],

  const handleMenu = (e) => {
    const ID = e.currentTarget.id;
    console.log(ID);
    tab.value = ID;
    if (data[ID].li.length === 0) {
      tabli.value = "none";
    }

    // if (ID === "Notif") {
    //   notifNav.value = !notifNav.value;
    // }
  };

  const handleMenuLi = (e) => {
    const ID = e.currentTarget.id;
    console.log(ID);
    tabli.value = ID;
  };

  const Menu = (id, label) => {
    return (
      <div
        className="DAT_Sidenar_Content"
        id={id}
        onClick={(event) => {
          handleMenu(event);
        }}
      >
        <div
          className="DAT_Sidenar_Content-icon"
          style={{
            color: tab.value === id ? dataColor.cur.color : dataColor.pre.color,
          }}
        >
          {data[id].icon}
        </div>
        {data[id].link === "none" ? (
          <label
            style={{
              color:
                tab.value === id ? dataColor.cur.color : dataColor.pre.color,
            }}
          >
            {label}
          </label>
        ) : (
          <Link to={data[id].link} style={{ textDecoration: "none" }}>
            <label
              style={{
                color:
                  tab.value === id ? dataColor.cur.color : dataColor.pre.color,
              }}
            >
              {label}
            </label>
          </Link>
        )}
        <div
          className="DAT_Sidenar_Content-arrow"
          style={{ color: "rgb(141, 139, 139)" }}
        >
          {data[id].li.length === 0 ? (
            <></>
          ) : tab.value === id ? (
            <IoIosArrowDown color="gray" />
          ) : (
            <IoIosArrowForward color="gray" />
          )}
        </div>
      </div>
    );
  };

  const MenuLi = (id) => {
    return (
      <div className="DAT_Sidenar_list">
        <div className="DAT_Sidenar_list-accordion">
          {data[id].li.map((data, index) => {
            return data.link === "none" ? (
              <label key={id + "_" + index}>{data.name}</label>
            ) : (
              <Link
                key={id + "_" + index}
                to={data.link}
                style={{ textDecoration: "none" }}
              >
                <label
                  id={data.link}
                  onClick={(e) => {
                    handleMenuLi(e);
                  }}
                  style={{
                    color:
                      tabli.value === data.link
                        ? dataColor.cur.color
                        : dataColor.pre.color,
                  }}
                >
                  {data.name}
                </label>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  const handleShadow = () => {
    sidenar.value = !sidenar.value;
  };

  return (
    <>
      <div
        className="DAT_Sidenar"
        style={sidenar.value ? { width: "200px" } : { width: "0px" }}
      >
        <div style={sidenar.value ? { display: "block" } : { display: "none" }}>
          {Menu("Dashboard", dataLang.formatMessage({ id: 'dashboard' }))}

          {Menu("Monitor", dataLang.formatMessage({ id: 'monitor' }))}
          {tab.value === "Monitor" ? <>{MenuLi("Monitor")}</> : <></>}
          {Menu("Analytics", dataLang.formatMessage({ id: 'analytics' }))}
          {tab.value === "Analytics" ? <>{MenuLi("Analytics")}</> : <></>}
          {/* {Menu("Notif", "Thông báo")} */}
          {Menu("Setting", dataLang.formatMessage({ id: 'setting' }))}
          {tab.value === "Setting" ? <>{MenuLi("Setting")}</> : <></>}
        </div>
      </div>
      <div
        className="DAT_User"
        style={sidenar.value ? { width: "200px" } : { width: "0px" }}
      >
        <div
          className="DAT_User-group"
          style={sidenar.value ? { display: "block" } : { display: "none" }}
        >
          <div className="DAT_User-group-Tit">{dataLang.formatMessage({ id: 'loginWith' })}</div>
          <div className="DAT_User-group-ID">{userInfor.value.name}</div>
        </div>
      </div>
      <div
        className="DAT_Shadow"
        id="DAT_Shadow"
        style={sidenar.value ? { display: "block" } : { display: "none" }}
        onClick={(event) => {
          handleShadow(event);
        }}
      ></div>
    </>
  );
}

export default Sidenar;
