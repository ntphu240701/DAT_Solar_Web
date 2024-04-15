import React, { useEffect, useReducer, useState } from 'react';
import "./Device.scss";

import { useIntl } from 'react-intl';
import { info } from './Device';
import axios from 'axios';
import { host } from '../Lang/Contant';
import { signal } from '@preact/signals-react';
import { alertDispatch } from '../Alert/Alert';
import { Token } from '../../App';

import { IoIosArrowUp } from 'react-icons/io';

const remote = signal(255);

export default function BatteryFirst(props) {
    const dataLang = useIntl();
    const [display, setDisplay] = useState(true);
    const [step, setStep] = useState(0);
    const [invt, setInvt] = useState({});
    const intervalIDRef = useReducer(null);

    const config = [
        "bat_starttime_1",
        "bat_endtime_1",
        "bat_enable_1",
        "bat_starttime_2",
        "bat_endtime_2",
        "bat_enable_2",
        "bat_starttime_3",
        "bat_endtime_3",
        "bat_enable_3",
        "charge_powerperlimit_1",
        "stop_soc_whilecharge",
        "inverter_charge_enable",
    ]

    const invtCloud = async (data, token) => {
        var reqData = {
            data: data,
            token: token,
        };

        try {
            const response = await axios({
                url: host.CLOUD,
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: Object.keys(reqData)
                    .map(function (key) {
                        return (
                            encodeURIComponent(key) + "=" + encodeURIComponent(reqData[key])
                        );
                    })
                    .join("&"),
            });
            return response.data;
        } catch (e) {
            return { ret: 1, msg: "cloud err" };
        }
    };

    const remotecloud = async (data, token) => {
        var reqData = {
            "data": data,
            "token": token
        };

        try {
            const response = await axios({
                url: host.RMCLOUD,
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: Object.keys(reqData).map(function (key) { return encodeURIComponent(key) + '=' + encodeURIComponent(reqData[key]) }).join('&'),
            });
            return response.data
        } catch (e) {
            return ({ ret: 1, msg: "cloud err" })
        }
    };

    const stopTimer = () => {
        clearInterval(intervalIDRef.current);
        intervalIDRef.current = null;
    };

    const startTimer = () => {
        intervalIDRef.current = setInterval(async () => {
            if (remote.value !== 255) {
                if (remote.value < config.length) {
                    let key = config[remote.value]
                    console.log('{"deviceCode":"' + info.value.plogger + '","address":"' + info.value.psetting[key].register + '","value":"' + parseInt(document.getElementById(key).value / info.value.psetting[key].cal) + '"}')
                    let res = await remotecloud('{"deviceCode":"' + info.value.plogger + '","address":"' + info.value.psetting[key].register + '","value":"' + parseInt(document.getElementById(key).value / info.value.psetting[key].cal) + '"}', Token.value.token)
                    console.log(res)
                    if (res.ret === 0) {
                        alertDispatch(dataLang.formatMessage({ id: "alert_6" }))
                    } else {
                        alertDispatch(dataLang.formatMessage({ id: "alert_7" }))
                    }
                    remote.value = remote.value + 1
                } else {
                    remote.value = 255
                    stopTimer()
                }
            }
        }, 500);
    };

    const handleSetup = (e) => {
        e.preventDefault();
        remote.value = 0
        startTimer()
    }

    const handleRead = async (e) => {
        e.preventDefault();

        if (step === 0) {
            let res = await invtCloud('{"deviceCode": "' + info.value.plogger + '"}', Token.value.token)
            console.log(res)
            if (res.ret === 0) {
                setInvt(res.data)
                setStep(1)
            }
        }
    }

    useEffect(() => {
        if (step) {
            setStep(0)
            config.map((key) => {
                if (key == "charge_powerperlimit_1" || key == "stop_soc_whilecharge") {
                    document.getElementById(key).value = parseInt(invt[info.value.psetting[key].register] * info.value.psetting[key].cal)
                } else {
                    document.getElementById(key).innerHTML = parseInt(invt[info.value.psetting[key].register] * info.value.psetting[key].cal)
                }
            });
        }
    }, [step])

    return (
        <div className="DAT_Info_Databox" id="BatteryFirst">
            <div className="DAT_Info_Databox_Title">
                <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: "BatteryFirst" })}</div>
                <div className="DAT_Info_Databox_Title_Right"
                    onClick={() => setDisplay(!display)}
                >
                    <IoIosArrowUp
                        size={20}
                        style={{
                            transform: display ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "0.5s",
                        }}
                    />
                </div>
            </div>

            <div className="Animation"
                style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
            >
                {display ? (
                    <form className="DAT_Info_Databox_GridFirst" onSubmit={(e) => handleSetup(e)}>
                        <div className="DAT_Info_Databox_GridFirst_Content">
                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: "BatteryFirstStartTime" })}: <span id="bat_starttime_1"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <input
                                        type='time'
                                    />
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: "BatteryFirstEndTime" })}: <span id="bat_endtime_1"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <input
                                        type='time'
                                    />
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: "BatteryFirstEnable" })}: <span id="bat_enable_1"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <select>
                                        <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                                        <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: "BatteryFirstStartTime2" })}: <span id="bat_starttime_2"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <input
                                        type='time'
                                    />
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: "BatteryFirstEndTime2" })}: <span id="bat_endtime_2"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <input
                                        type='time'
                                    />
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: "BatteryFirstEnable2" })}: <span id="bat_enable_2"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <select>
                                        <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                                        <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: "BatteryFirstStartTime3" })}: <span id="bat_starttime_3"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <input
                                        type='time'
                                    />
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: "BatteryFirstEndTime3" })}: <span id="bat_endtime_3"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <input
                                        type='time'
                                    />
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: "BatteryFirstEnable3" })}: <span id="bat_enable_3"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <select>
                                        <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                                        <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: "ChargePowerLimit" })}:
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <input placeholder="0 ~ 100" type="number" min={0} max={100} step="any" id="charge_powerperlimit_1" />
                                    %
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: "ChargePowerLimit2" })}:
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <input placeholder="0 ~ 100" type="number" min={0} max={100} step="any" disabled />
                                    %
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: "ChargePowerLimit3" })}:
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <input placeholder="0 ~ 100" type="number" min={0} max={100} step="any" disabled />
                                    %
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: "StopSOCatCharge" })}:
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <input placeholder="0 ~ 100" type="number" min={0} max={100} step="any" id="stop_soc_whilecharge" />
                                    %
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: "InverterChargeEnable" })}: <span id="inverter_charge_enable"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <select>
                                        <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                                        <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="DAT_Info_Databox_GridFirst_Foot">
                            <button onClick={(e) => handleRead(e)}>
                                {dataLang.formatMessage({ id: 'read' })}
                            </button>
                            <button>
                                {dataLang.formatMessage({ id: 'setup' })}
                            </button>
                        </div>
                    </form>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
