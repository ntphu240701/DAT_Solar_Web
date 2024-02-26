import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { alertDispatch } from '../Alert/Alert';
import { useDispatch } from 'react-redux';
import adminslice from "../Redux/adminslice";
import './Login.scss'
import { CiBarcode, CiMail, CiUser } from "react-icons/ci";
import { MdPassword } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { host } from '../Lang/Contant';
import axios from 'axios';
import { TbPasswordFingerprint } from "react-icons/tb";
import { LuUserCheck } from "react-icons/lu";
import { BsTelephoneInbound } from "react-icons/bs";
import { HiOutlineMapPin } from "react-icons/hi2";
import { signal } from '@preact/signals-react';
import { callApi } from '../Api/Api';

const tab = signal('login');

function Login(props) {

    const dataLang = useIntl();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [mail, setMail] = useState('');
    const [newpwd, setNewpwd] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [addr, setAddr] = useState('');
    const [savepwd, setSavepwd] = useState(false);
    const [join, setJoin] = useState(false);
    const [joinCode, setJoinCode] = useState('');
    const rootDispatch = useDispatch()
    const [showpass, setShowpass] = useState(false);
    const [showpass2, setShowpass2] = useState(false);
    //const status = useSelector((state) => state.admin.status)

    useEffect(function () {
        rootDispatch(adminslice.actions.setlang('vi'))
    }, []);

    const handleLogin = function (e) {
        e.preventDefault();

        let auth = async () => {
            let res = await callApi('post', host.AUTH + '/Login', { username: user, password: pass })
            if (res.status) {
                if (savepwd) {
                    localStorage.setItem('token', JSON.stringify(res.accessToken))
                } else {
                    sessionStorage.setItem('token', JSON.stringify(res.accessToken))
                }
                rootDispatch(adminslice.actions.setstatus(res.status))
                rootDispatch(adminslice.actions.setusr(res.user))
            } else {
                localStorage.clear();
                sessionStorage.clear();
                alertDispatch(dataLang.formatMessage({ id: "alert_0" }))

            }
        }

        auth();
    }

    const handlePwd = function (e) {
        e.preventDefault();
        let resetpwd = async () => {
            let res = await callApi('post', host.AUTH + '/ResetPassword', { mail: mail, password: newpwd, host: window.location.host })
            console.log(res)
            if (res.status) {
                tab.value = 'note';
            } else {
                if (res.number === 3) {
                    alertDispatch(dataLang.formatMessage({ id: "alert_7" }))
                } else {

                    alertDispatch(dataLang.formatMessage({ id: "alert_3" }))
                }
            }
        }

        if (newpwd !== pass) {
            alertDispatch(dataLang.formatMessage({ id: "alert_5" }))
        } else {
            resetpwd();
        }


    }

    const handleRegister = function (e) {
        e.preventDefault();
        let register = async () => {
            let res = await callApi('post', host.AUTH + '/Register', {usr:user, mail: mail, pwd: newpwd, name: name, phone: phone, addr: addr, code: join? joinCode : 'S001', host: window.location.host })
            console.log(res)
            if (res.status) {
                tab.value = 'note';
            } else {
                if (res.number === 2) {
                    alertDispatch(dataLang.formatMessage({ id: "alert_7" }))
                } else if(res.number === 1){

                    alertDispatch(dataLang.formatMessage({ id: "alert_11" }))
                }else{
                    alertDispatch(dataLang.formatMessage({ id: "alert_10" }))
                }
            }
        }

        if (newpwd !== pass) {
            alertDispatch(dataLang.formatMessage({ id: "alert_5" }))
        } else {
            register();
        }
    }


    return (
        <div className='DAT_Login' >
            {(() => {
                switch (tab.value) {
                    case "register":
                        return (
                            <form className="DAT_Login_Form" onSubmit={handleRegister}>
                                <p>DAT GROUP</p>
                                <div className="DAT_Login_Form-input">
                                    <CiUser color='gray' size={24} />
                                    <input type="text" placeholder={dataLang.formatMessage({ id: 'username' })} minLength={4} required value={user} onChange={(e) => { setUser(e.target.value.trim().toLocaleLowerCase()) }} autoComplete="on" />
                                </div>
                                <div className="DAT_Login_Form-input">
                                    <CiMail color='gray' size={24} />
                                    <input type="email" placeholder={dataLang.formatMessage({ id: 'email' })} required value={mail} onChange={(e) => { setMail(e.target.value) }} autoComplete="on" />
                                </div>
                                <div className="DAT_Login_Form-input">
                                    <MdPassword color='gray' size={24} />
                                    <input type={(showpass) ? "text" : "password"} placeholder={dataLang.formatMessage({ id: 'password' })} required minLength="6" value={pass} onChange={(e) => { setPass(e.target.value.trim()) }} autoComplete="on" />
                                    {(showpass) ? <FaRegEye color='gray' size={24} onClick={() => setShowpass(!showpass)} /> : <FaRegEyeSlash color='gray' size={24} onClick={() => setShowpass(!showpass)} />}
                                </div>
                                <div className="DAT_Login_Form-input">
                                    <TbPasswordFingerprint color='gray' size={24} />
                                    <input type={(showpass2) ? "text" : "password"} placeholder={dataLang.formatMessage({ id: 'auth_pwd' })} required minLength="6" value={newpwd} onChange={(e) => { setNewpwd(e.target.value.trim()) }} autoComplete="on" />
                                    {(showpass2) ? <FaRegEye color='gray' size={24} onClick={() => setShowpass2(!showpass2)} /> : <FaRegEyeSlash color='gray' size={24} onClick={() => setShowpass2(!showpass2)} />}
                                </div>

                                <div className="DAT_Login_Form-input">
                                    <LuUserCheck color='gray' size={24} />
                                    <input type="text" placeholder={dataLang.formatMessage({ id: 'name' })} minLength={6} required value={name} onChange={(e) => { setName(e.target.value) }} autoComplete="on" />
                                </div>

                                <div className="DAT_Login_Form-input">
                                    <BsTelephoneInbound color='gray' size={24} />
                                    <input type="number" placeholder={dataLang.formatMessage({ id: 'phone' })} required value={phone} minLength={10} onChange={(e) => { setPhone(e.target.value) }} autoComplete="on" />
                                </div>

                                <div className="DAT_Login_Form-input">
                                    <HiOutlineMapPin color='gray' size={24} />
                                    <input type="text" placeholder={dataLang.formatMessage({ id: 'addr' })} minLength={6} required value={addr} onChange={(e) => { setAddr(e.target.value) }} autoComplete="on" />
                                </div>


                                <div className="DAT_Login_Form-box" style={{ marginBottom: join ? '10px' : '20px' }}>
                                    <input
                                        id="savepwd"
                                        type="checkbox"
                                        checked={join}
                                        onChange={e => setJoin(e.target.checked)}
                                    />
                                    <label htmlFor="savepwd" />
                                    {dataLang.formatMessage({ id: 'join' })}
                                </div>

                                {join
                                    ? <div className="DAT_Login_Form-input">
                                        <CiBarcode color='gray' size={24} />
                                        <input type="text" placeholder={dataLang.formatMessage({ id: 'join' })} minLength={4} required={join} value={joinCode} onChange={(e) => { setJoinCode(e.target.value.trim()) }} autoComplete="on" />
                                    </div>
                                    : <></>
                                }

                                <button>{dataLang.formatMessage({ id: 'register' })}</button>

                                <div className="DAT_Login_Form-footer">
                                    <span></span>
                                    <span onClick={() => tab.value = 'login'}>{dataLang.formatMessage({ id: 'login' })}</span>
                                </div>
                            </form>
                        )
                    case "pwd":
                        return (
                            <form className="DAT_Login_Form" onSubmit={handlePwd}>
                                <p>DAT GROUP</p>
                                <div className="DAT_Login_Form-input">
                                    <CiMail color='gray' size={24} />
                                    <input type="email" placeholder={dataLang.formatMessage({ id: 'email' })} required value={mail} onChange={(e) => { setMail(e.target.value) }} autoComplete="on" />
                                </div>
                                <div className="DAT_Login_Form-input">
                                    <MdPassword color='gray' size={24} />
                                    <input type={(showpass) ? "text" : "password"} placeholder={dataLang.formatMessage({ id: 'new_pwd' })} required minLength="6" value={pass} onChange={(e) => { setPass(e.target.value.trim()) }} autoComplete="on" />
                                    {(showpass) ? <FaRegEye color='gray' size={24} onClick={() => setShowpass(!showpass)} /> : <FaRegEyeSlash color='gray' size={24} onClick={() => setShowpass(!showpass)} />}
                                </div>
                                <div className="DAT_Login_Form-input">
                                    <TbPasswordFingerprint color='gray' size={24} />
                                    <input type={(showpass2) ? "text" : "password"} placeholder={dataLang.formatMessage({ id: 'auth_pwd' })} required minLength="6" value={newpwd} onChange={(e) => { setNewpwd(e.target.value.trim()) }} autoComplete="on" />
                                    {(showpass2) ? <FaRegEye color='gray' size={24} onClick={() => setShowpass2(!showpass2)} /> : <FaRegEyeSlash color='gray' size={24} onClick={() => setShowpass2(!showpass2)} />}
                                </div>



                                <button>{dataLang.formatMessage({ id: 'pwd' })}</button>


                                <div className="DAT_Login_Form-footer">
                                    <span></span>
                                    <span onClick={() => tab.value = 'login'}>{dataLang.formatMessage({ id: 'login' })}</span>
                                </div>
                            </form>
                        )
                    case "login":
                        return (
                            <form className="DAT_Login_Form" onSubmit={handleLogin}>
                                <p>DAT GROUP</p>
                                <div className="DAT_Login_Form-input">
                                    <CiUser color='gray' size={24} />
                                    <input type="text" placeholder={dataLang.formatMessage({ id: 'username' })} required minLength="4" value={user} onChange={(e) => { setUser(e.target.value.trim().toLocaleLowerCase()) }} autoComplete="on" />
                                </div>
                                <div className="DAT_Login_Form-input">
                                    <MdPassword color='gray' size={24} />
                                    <input type={(showpass) ? "text" : "password"} placeholder={dataLang.formatMessage({ id: 'password' })} required minLength="4" value={pass} onChange={(e) => { setPass(e.target.value.trim()) }} autoComplete="on" />
                                    {(showpass) ? <FaRegEye color='gray' size={24} onClick={() => setShowpass(!showpass)} /> : <FaRegEyeSlash color='gray' size={24} onClick={() => setShowpass(!showpass)} />}
                                </div>

                                <div className="DAT_Login_Form-box">
                                    <input
                                        id="savepwd"
                                        type="checkbox"
                                        checked={savepwd}
                                        onChange={e => setSavepwd(e.target.checked)}
                                    />
                                    <label htmlFor="savepwd" />
                                    {dataLang.formatMessage({ id: 'save_login' })}
                                </div>

                                <button>{dataLang.formatMessage({ id: 'login' })}</button>

                                <div className="DAT_Login_Form-footer">
                                    <span onClick={() => tab.value = 'register'} >{dataLang.formatMessage({ id: 'register' })}</span>
                                    <span onClick={() => tab.value = 'pwd'} >{dataLang.formatMessage({ id: 'forgot_pwd' })}</span>
                                </div>

                            </form>
                        )
                    default:
                        return (
                            <form className="DAT_Login_Form" onSubmit={handleLogin}>
                            <p>DAT GROUP</p>
                            <div className="DAT_Login_Form-note" style={{textAlign:'justify'}} >{dataLang.formatMessage({ id: 'alert_8' })}</div>

                            <div className="DAT_Login_Form-footer">
                                <span ></span>
                                <span onClick={() => tab.value = 'login'} >{dataLang.formatMessage({ id: 'login' })}</span>
                            </div>

                        </form>              
                        )

                }
            })()}
        </div>
    );
}

export default Login;