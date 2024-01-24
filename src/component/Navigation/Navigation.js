import React, { useEffect, useRef } from 'react';
import "./Navigation.scss"
import { sidenar } from '../../component/Sidenar/Sidenar';
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineLanguage } from "react-icons/md";
import { signal } from '@preact/signals-react';
import { FaRegMessage } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";


export const isMobile = signal(false)
const userNav = signal(false)
export const notifNav = signal(false)
const langNav = signal(false)
const langStateNav = signal([false, false])
const messageNav = signal(false)
const message = signal([
    {
        messid: 1,
        name: 'Điện áp thấp mức 1',
        list: [
            {
                id: 1,
                device: 'I0000129',
                plant: 'Năng lượng DAT 01',
                level: 'warning',
                time: '12/15/2023 08:12:12'
            },
            {
                id: 2,
                device: 'I0000145',
                plant: 'Năng lượng DAT 02',
                level: 'warning',
                time: '12/30/2023 12:07:33'
            },
            {
                id: 3,
                device: 'I0000001',
                plant: 'Năng lượng DAT 03',
                level: 'warning',
                time: '01/17/2023 09:00:59'
            }
        ]
    },
    {
        messid: 2,
        name: 'Meter không kết nối',
        list: [
            {
                id: 1,
                device: 'M00000789',
                plant: 'Năng lượng DAT 03',
                level: 'warning',
                time: '01/15/2023 08:12:12'
            },
            {
                id: 2,
                device: 'I0000369',
                plant: 'Năng lượng DAT 03',
                level: 'warning',
                time: '01/17/2023 12:07:33'
            },
        ]
    }
])
const messageContent = signal([])
const messageOption = signal('default')

function Navigation(props) {


    const user_icon = useRef()
    const user_box = useRef()
    const notif_icon = useRef()
    const notif_box = useRef()



    const handleWindowResize = () => {
        if (window.innerWidth >= 900) {
            isMobile.value = false
            messageOption.value = 'default'
        } else {
            isMobile.value = true
            messageOption.value = 'mess'
        }

    }
    const handleOutsideLang = () => {
        setTimeout(() => {
            //console.log(langState.value[0],langState.value[1])
            if (langStateNav.value[1] == false) {
                langNav.value = false
                langStateNav.value = [false, false]
            }

            clearTimeout()
        }, 250)

    }

    let handleOutsideUser = (e) => {
        if (!user_icon.current.contains(e.target)) {
            if (!user_box.current.contains(e.target)) {
                userNav.value = false
            }
        }

    }

    let handleOutsideNotif = (e) => {
        if (!notif_icon.current.contains(e.target)) {
            if (!notif_box.current.contains(e.target)) {
                notifNav.value = false
            }
        }

    }

    const handleMenu = (event) => {
        sidenar.value = !sidenar.value
    }


    const handleMessage = (e) => {

        messageContent.value = message.value.filter((item) => item.messid == e.currentTarget.id)
        //console.log(messageContent.value)
        messageNav.value = true
        if (isMobile.value) {
            messageOption.value = 'content'
        }
    }

    useEffect(function () {
        if (window.innerWidth >= 900) {
            isMobile.value = false
            messageOption.value = 'default'
        } else {
            isMobile.value = true
            messageOption.value = 'mess'
        }

        document.addEventListener('mousedown', handleOutsideUser)
        document.addEventListener('mousedown', handleOutsideNotif)
        window.addEventListener('resize', handleWindowResize);
        return () => {
            document.removeEventListener('mousedown', handleOutsideUser)
            document.removeEventListener('mousedown', handleOutsideNotif)
            window.removeEventListener('resize', handleWindowResize);
        }
    }, []);

    return (
        <>
            <div className='DAT_Navigation' >
                <div className="DAT_Navigation-menu" >
                    <button id="DAT_menuaction" onClick={(event) => { handleMenu(event) }}>
                        <BsFillMenuButtonWideFill color='white' size={22} />
                    </button>
                </div>
                <div className='DAT_Navigation_left'>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <div className="DAT_Navigation_left-logo" >
                            <img src={"/dat_icon/logo_DAT.png"} alt="" style={{ height: "30px" }} />
                        </div>
                    </Link>
                </div>
                <div className='DAT_Navigation_center'></div>
                <div className='DAT_Navigation_right'>

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
                        style={{ display: isMobile.value ? "none" : "block" }}
                        onClick={() => notifNav.value = !notifNav.value}
                        ref={notif_icon}
                    >
                        <IoIosNotificationsOutline color='white' size={22} />
                        <span>5</span>
                    </button >




                    <button
                        className="DAT_Navigation_right-language"
                        id="lang"
                        onMouseEnter={() => { langNav.value = true; langStateNav.value = [true, false]; }}
                        onMouseLeave={() => handleOutsideLang()}
                    >
                        <MdOutlineLanguage color='white' size={22} />
                        <span>Vi</span>
                    </button >


                    <button
                        className="DAT_Navigation_right-item"
                        id="user"
                        style={{ backgroundColor: "rgba(159, 155, 155, 0.4)", overflow: "hidden" }}
                        onClick={() => userNav.value = !userNav.value}
                        ref={user_icon}
                    >
                        <img src={"/dat_icon/user_manager.png"} alt="" />
                    </button>
                </div>
            </div>

            <div className='DAT_NavUser' style={{ display: userNav.value ? "block" : "none" }} ref={user_box} >
                <div className='DAT_NavUser-inf'>
                    <div className='DAT_NavUser-inf-img'>
                        <img src={"/dat_icon/user_manager.png"} alt="" />
                    </div>
                    <div className='DAT_NavUser-inf-content'>
                        <div className='DAT_NavUser-inf-content-name'>RnD Center</div>
                        <div className='DAT_NavUser-inf-content-email'>Admin@datgroup.com.vn</div>
                    </div>
                </div>
                <div className='DAT_NavUser-item' style={{ cursor: "pointer", borderBottom: "1px solid gray" }} >
                    <span >Tài khoản</span>
                </div>
                <div className="DAT_NavUser-item">
                    <span>Đăng xuất</span>
                </div>

            </div>

            <div className='DAT_NavNotif' style={{ display: notifNav.value ? "block" : "none" }} ref={notif_box}>


                <div className='DAT_NavNotif-title'>
                    <span>Thông báo</span>

                    {isMobile.value && messageOption.value === 'content'
                    ?<div className='DAT_NavNotif-title-close' onClick={() => messageOption.value = 'mess'} >
                        <IoMdClose size={15} color='white'/>
                    </div>
                    :<></>
                    }
                </div>

                <div className='DAT_NavNotif-content'>
                    {(() => {
                        switch (messageOption.value) {
                            case "mess":
                                return (
                                    <div className='DAT_NavNotif-content-message'>
                                        {message.value.map((item, index) => (
                                            <div className='DAT_NavNotif-content-message-group' id={item.messid} key={item.messid} onClick={(e) => handleMessage(e)} >
                                                <div className='DAT_NavNotif-content-message-group-tit'>
                                                    <span>{item.name}</span>
                                                    <span>{item.list.length}</span>
                                                </div>
                                                <div className='DAT_NavNotif-content-message-group-inf'>Có một {item.name} tại {item.list[item.list.length - 1].plant}</div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            case "content":
                                return (
                                    <div className='DAT_NavNotif-content-main'>
                                        {messageNav.value
                                            ? <>
                                                {messageContent.value[0].list.map((item, index) => (
                                                    <div className='DAT_NavNotif-content-main-group' key={item.id}>
                                                        <div className='DAT_NavNotif-content-main-group-datetime'>{item.time}</div>
                                                        <div className='DAT_NavNotif-content-main-group-content'>
                                                            <div className='DAT_NavNotif-content-main-group-content-tit'>Có một {messageContent.value[0].name} tại {item.plant}</div>
                                                            <div className='DAT_NavNotif-content-main-group-content-device'>Thiết bị: <span style={{ color: 'black' }} >{item.device}</span></div>
                                                            <div className='DAT_NavNotif-content-main-group-content-level'>Mức độ: <span style={{ color: 'black' }}>{item.level}</span></div>
                                                            <div className='DAT_NavNotif-content-main-group-content-status'>Vui lòng kiểm tra!</div>
                                                        </div>
                                                    </div>
                                                ))}

                                            </>
                                            : <div className='DAT_NavNotif-content-main-empty'>
                                                <FaRegMessage size={60} color='gray' />
                                            </div>
                                        }
                                    </div>
                                )
                            default:
                                return (
                                    <>
                                        <div className='DAT_NavNotif-content-message'>
                                            {message.value.map((item, index) => (
                                                <div className='DAT_NavNotif-content-message-group' id={item.messid} key={item.messid} onClick={(e) => handleMessage(e)} >
                                                    <div className='DAT_NavNotif-content-message-group-tit'>
                                                        <span>{item.name}</span>
                                                        <span>{item.list.length}</span>
                                                    </div>
                                                    <div className='DAT_NavNotif-content-message-group-inf'>Có một {item.name} tại {item.list[item.list.length - 1].plant}</div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='DAT_NavNotif-content-main'>
                                            {messageNav.value
                                                ? <>
                                                    {messageContent.value[0].list.map((item, index) => (
                                                        <div className='DAT_NavNotif-content-main-group' key={item.id}>
                                                            <div className='DAT_NavNotif-content-main-group-datetime'>{item.time}</div>
                                                            <div className='DAT_NavNotif-content-main-group-content'>
                                                                <div className='DAT_NavNotif-content-main-group-content-tit'>Có một {messageContent.value[0].name} tại {item.plant}</div>
                                                                <div className='DAT_NavNotif-content-main-group-content-device'>Thiết bị: <span style={{ color: 'black' }} >{item.device}</span></div>
                                                                <div className='DAT_NavNotif-content-main-group-content-level'>Mức độ: <span style={{ color: 'black' }}>{item.level}</span></div>
                                                                <div className='DAT_NavNotif-content-main-group-content-status'>Vui lòng kiểm tra!</div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                </>
                                                : <div className='DAT_NavNotif-content-main-empty'>
                                                    <FaRegMessage size={60} color='gray' />
                                                </div>
                                            }
                                        </div>
                                    </>
                                )
                        }
                    })()}

                </div>

                {/* <div className='DAT_NavNotif-footer'>
                            Chỉ hiển thị thông báo trong 6 tháng
                    </div> */}
            </div>

            <div className='DAT_NavLang' style={{ display: langNav.value ? "block" : "none" }} onMouseEnter={() => { langStateNav.value = [true, true]; }} onMouseLeave={() => { langNav.value = false; langStateNav.value = [false, false] }} >
                <div className='DAT_NavLang-item' style={{ backgroundColor: "rgba(41, 95, 255)", color: "white" }} >
                    <span >Tiếng Việt</span>
                </div>
                <div className="DAT_NavLang-item">
                    <span>English</span>
                </div>
            </div>


        </>
    );
}

export default Navigation;