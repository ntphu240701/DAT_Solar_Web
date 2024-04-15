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

export default function GridFirst(props) {
    const dataLang = useIntl();
    const [display, setDisplay] = useState(true);
    const [step, setStep] = useState(0);
    const [invt, setInvt] = useState({});
    const intervalIDRef = useReducer(null);

    const hour = [
        {
            value: "00",
        },
        {
            value: "01",
        },
        {
            value: "02",
        },
        {
            value: "03",
        },
        {
            value: "04",
        },
        {
            value: "05",
        },
        {
            value: "06",
        },
        {
            value: "07",
        },
        {
            value: "08",
        },
        {
            value: "09",
        },
        {
            value: "10",
        },
        {
            value: "11",
        },
        {
            value: "12",
        },
        {
            value: "13",
        },
        {
            value: "14",
        },
        {
            value: "15",
        },
        {
            value: "16",
        },
        {
            value: "17",
        },
        {
            value: "18",
        },
        {
            value: "19",
        },
        {
            value: "20",
        },
        {
            value: "21",
        },
        {
            value: "22",
        },
        {
            value: "23",
        },
    ]

    const minute = [
        {
            value: "00",
        },
        {
            value: "01",
        },
        {
            value: "02",
        },
        {
            value: "03",
        },
        {
            value: "04",
        },
        {
            value: "05",
        },
        {
            value: "06",
        },
        {
            value: "07",
        },
        {
            value: "08",
        },
        {
            value: "09",
        },
        {
            value: "10",
        },
        {
            value: "11",
        },
        {
            value: "12",
        },
        {
            value: "13",
        },
        {
            value: "14",
        },
        {
            value: "15",
        },
        {
            value: "16",
        },
        {
            value: "17",
        },
        {
            value: "18",
        },
        {
            value: "19",
        },
        {
            value: "20",
        },
        {
            value: "21",
        },
        {
            value: "22",
        },
        {
            value: "23",
        },
        {
            value: "24",
        },
        {
            value: "25",
        },
        {
            value: "26",
        },
        {
            value: "27",
        },
        {
            value: "28",
        },
        {
            value: "29",
        },
        {
            value: "30",
        },
        {
            value: "31",
        },
        {
            value: "32",
        },
        {
            value: "33",
        },
        {
            value: "34",
        },
        {
            value: "35",
        },
        {
            value: "36",
        },
        {
            value: "37",
        },
        {
            value: "38",
        },
        {
            value: "39",
        },
        {
            value: "40",
        },
        {
            value: "41",
        },
        {
            value: "42",
        },
        {
            value: "43",
        },
        {
            value: "44",
        },
        {
            value: "45",
        },
        {
            value: "46",
        },
        {
            value: "47",
        },
        {
            value: "48",
        },
        {
            value: "49",
        },
        {
            value: "50",
        },
        {
            value: "51",
        },
        {
            value: "52",
        },
        {
            value: "53",
        },
        {
            value: "54",
        },
        {
            value: "55",
        },
        {
            value: "56",
        },
        {
            value: "57",
        },
        {
            value: "58",
        },
        {
            value: "59",
        },
    ]

    const config = [
        "grid_starttime_1",
        "grid_endtime_1",
        "grid_enable_1",
        "grid_starttime_2",
        "grid_endtime_2",
        "grid_enable_2",
        "grid_starttime_3",
        "grid_endtime_3",
        "grid_enable_3",
        "discharge_powerperlimit_1",
        "stop_soc_atdischarge",
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
                if (key == "discharge_powerperlimit_1" || key == "stop_soc_atdischarge") {
                    document.getElementById(key).value = parseFloat(invt[info.value.psetting[key].register] * info.value.psetting[key].cal).toFixed(2)
                } else {
                    document.getElementById(key).innerHTML = parseFloat(invt[info.value.psetting[key].register] * info.value.psetting[key].cal).toFixed(2)
                }
            });
        }
    }, [step])

    return (
        <div className="DAT_Info_Databox" id="SystemTime">
            <div className="DAT_Info_Databox_Title">
                <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: "GridFirst" })}</div>
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
                                    {dataLang.formatMessage({ id: "GridFirstStartTime" })}: <span id="grid_starttime_1"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <select>
                                        {hour.map((item, i) => {
                                            return <option key={i}>{item.value}</option>
                                        }
                                        )}
                                    </select>
                                    :
                                    <select>
                                        {minute.map((item, i) => {
                                            return <option key={i}>{item.value}</option>
                                        }
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: 'GridFirstEndTime' })}: <span id="grid_endtime_1"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <select>
                                        {hour.map((item, i) => {
                                            return <option key={i}>{item.value}</option>
                                        }
                                        )}
                                    </select>
                                    :
                                    <select>
                                        {minute.map((item, i) => {
                                            return <option key={i}>{item.value}</option>
                                        }
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: 'GridFirstEnable' })}: <span id="grid_enable_1"></span>
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
                                    {dataLang.formatMessage({ id: "GridFirstStartTime2" })}: <span id="grid_starttime_2"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <select>
                                        {hour.map((item, i) => {
                                            return <option key={i}>{item.value}</option>
                                        }
                                        )}
                                    </select>
                                    :
                                    <select>
                                        {minute.map((item, i) => {
                                            return <option key={i}>{item.value}</option>
                                        }
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: 'GridFirstEndTime2' })}: <span id="grid_endtime_2"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <select>
                                        {hour.map((item, i) => {
                                            return <option key={i}>{item.value}</option>
                                        }
                                        )}
                                    </select>
                                    :
                                    <select>
                                        {minute.map((item, i) => {
                                            return <option key={i}>{item.value}</option>
                                        }
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: 'GridFirstEnable2' })}: <span id="grid_enable_2"></span>
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
                                    {dataLang.formatMessage({ id: "GridFirstStartTime3" })}: <span id="grid_starttime_3"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <select>
                                        {hour.map((item, i) => {
                                            return <option key={i}>{item.value}</option>
                                        }
                                        )}
                                    </select>
                                    :
                                    <select>
                                        {minute.map((item, i) => {
                                            return <option key={i}>{item.value}</option>
                                        }
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: 'GridFirstEndTime3' })}: <span id="grid_endtime_3"></span>
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <select>
                                        {hour.map((item, i) => {
                                            return <option key={i}>{item.value}</option>
                                        }
                                        )}
                                    </select>
                                    :
                                    <select>
                                        {minute.map((item, i) => {
                                            return <option key={i}>{item.value}</option>
                                        }
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: 'GridFirstEnable3' })}: <span id="grid_enable_3"></span>
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
                                    {dataLang.formatMessage({ id: 'DischargePowerLimit' })}:
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <input placeholder="0 ~ 100" type="number" min={0} max={100} step="any" id="discharge_powerperlimit_1" />
                                    %
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: 'DischargePowerLimit2' })}:
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <input placeholder="0 ~ 100" type="number" min={0} max={100} step="any" />
                                    %
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: 'DischargePowerLimit3' })}:
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <input placeholder="0 ~ 100" type="number" min={0} max={100} step="any" />
                                    %
                                </div>
                            </div>

                            <div className="DAT_Info_Databox_GridFirst_Content_Item">
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: 'StopSOCatDischarge' })}:
                                </div>
                                <div className="DAT_Info_Databox_GridFirst_Content_Item_Content">
                                    <input placeholder="0 ~ 100" type="number" min={0} max={100} step="any" id="stop_soc_atdischarge" />
                                    %
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
