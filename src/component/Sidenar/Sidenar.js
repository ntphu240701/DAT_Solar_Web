import React, { useEffect, useState } from 'react';
import './Sidenar.scss';
import { signal } from '@preact/signals-react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { isMobile, notifNav } from '../Navigation/Navigation';
import { SiDatabricks } from "react-icons/si";
import { RiSettingsLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { VscDashboard } from "react-icons/vsc";
export const sidenar = signal(true)

const tab = signal('Dashboard')

function Sidenar(props) {


    useEffect(function () {
        isMobile.value ? sidenar.value = false : sidenar.value = true
    }, [])


    const dataColor = { cur: { color: '#0061f2' }, pre: { color: 'rgb(85, 85, 85)' } };
    const data = {
        Dashboard: { icon:<VscDashboard />, link: '/', li: [] },
        Notif: { icon: <IoIosNotificationsOutline />, link: 'none', li: [] },
        Monitor: { icon: <SiDatabricks />, link: 'none', li: [{ link: '/Project', name: 'Dự án' }, { link: '/Device', name: 'Thiết bị' }, { link: '/Warn', name: 'Cảnh báo' }] },
        Analytics: { icon: <TbReportAnalytics />, link: 'none', li: [{ link: '/Report', name: 'Báo cáo' }, { link: '/Analytics', name: 'Phân tích' }, , { link: '/Log', name: 'Nhật ký' }] },
        Setting: { icon: <RiSettingsLine />, link: 'none', li: [{ link: '/User', name: 'Tài khoản' }, { link: '/Role', name: 'Người dùng' }, { link: '/GroupRole', name: 'Nhóm người dùng' }, { link: '/Contact', name: 'Liên hệ' }] },
    }
    const handleMenu = (e) => {
        const ID = e.currentTarget.id;
        console.log(ID)
        tab.value = ID
        if(ID === 'Notif'){
            notifNav.value = !notifNav.value
        }

        if(ID === 'Dashboard'){
            notifNav.value = false
        }
    }




    const Menu = (id, label) => {
        return (
            <div className="DAT_Sidenar_Content" id={id} onClick={(event) => { handleMenu(event) }} >
                <div className="DAT_Sidenar_Content-icon" style={{ color: (tab.value === id) ? dataColor.cur.color : dataColor.pre.color }} >
                    {data[id].icon}
                </div>
                {data[id].link === 'none'
                    ? <label style={{ color: (tab.value === id) ? dataColor.cur.color : dataColor.pre.color }} >{label}</label>
                    : <Link to={data[id].link} style={{ textDecoration: 'none' }}>
                        <label style={{ color: (tab.value === id) ? dataColor.cur.color : dataColor.pre.color }} >{label}</label>
                    </Link>
                }
                <div className="DAT_Sidenar_Content-arrow" style={{ color: "rgb(141, 139, 139)" }}>
                    {data[id].li.length === 0
                        ? <></>
                        : tab.value === id
                            ? <IoIosArrowDown color='gray' />
                            : <IoIosArrowForward color='gray' />
                    }
                </div>
            </div>
        )
    }

    const MenuLi = (id) => {
        return (
            <div className="DAT_Sidenar_list">
                <div className="DAT_Sidenar_list-accordion">

                    {data[id].li.map((data, index) => {
                        return (
                            data.link === 'none'
                                ? <label key={id + "_" + index} >{data.name}</label>
                                : <Link
                                    key={id + "_" + index}
                                    to={data.link}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <label >{data.name}</label>
                                </Link>
                        )
                    })}
                </div>
            </div>
        )
    }

    const handleShadow = () => {
        sidenar.value = !sidenar.value
    }


    return (
        <>
            <div className='DAT_Sidenar' style={(sidenar.value) ? { width: "200px" } : { width: "0px" }}  >
                <div style={(sidenar.value) ? { display: "block" } : { display: "none" }}  >
                    {Menu('Dashboard', 'Bảng điểu khiển')}
                    {Menu('Notif', 'Thông báo')}
                    {Menu('Monitor', 'Giám sát')}
                    {(tab.value === 'Monitor')
                        ? <>{MenuLi('Monitor')}</>
                        : <></>
                    }
                    {Menu('Analytics', 'Vận hành')}
                    {(tab.value === 'Analytics')
                        ? <>{MenuLi('Analytics')}</>
                        : <></>
                    }
                    {Menu('Setting', 'Quản lý')}
                    {(tab.value === 'Setting')
                        ? <>{MenuLi('Setting')}</>
                        : <></>
                    }


                </div>

            </div>
            <div className="DAT_User" style={(sidenar.value) ? { width: "200px" } : { width: "0px" }} >
                <div className="DAT_User-group" style={(sidenar.value) ? { display: "block" } : { display: "none" }} >
                    <div className="DAT_User-group-Tit">Đăng nhập bởi:</div>
                    <div className="DAT_User-group-ID">RnD Center</div>
                </div>
            </div>
            <div className="DAT_Shadow" id="DAT_Shadow" style={(sidenar.value) ? { display: "block" } : { display: "none" }} onClick={(event) => { handleShadow(event) }}></div>
        </>

    );
}

export default Sidenar;