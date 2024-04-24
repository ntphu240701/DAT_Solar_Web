import React, { useEffect, useReducer, useState } from 'react';
import "./Device.scss";

import { useIntl } from 'react-intl';

import { FaCheckCircle } from 'react-icons/fa';
import { signal } from '@preact/signals-react';
import axios from 'axios';
import { host } from '../Lang/Contant';
import { info } from './Device';
import { Token } from '../../App';

const remote = signal(255);

export default function SingleCommand(props) {
    const dataLang = useIntl();
    const [step, setStep] = useState(0);
    const [invt, setInvt] = useState({});
    const intervalIDRef = useReducer(null);
    const [commandtype, setCommandType] = useState("");
    const [commandName, setCommandName] = useState("");
    const [key, setKey] = useState("");
    const [datatype, setDatatype] = useState("");
    const [result, setResult] = useState("");

    const commandData = [
        // AC Start Voltage
        {
            name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACStartHighVoltage' }),
            type: "read",
            key: 'ac_high_voltage',
            datatype: 'number'
        },
        {
            name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACStartHighVoltage' }),
            type: "Set",
            key: 'ac_high_voltage',
            datatype: 'number'
        },
        {
            name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACStartLowVoltage' }),
            type: "read",
            key: 'ac_low_voltage',
            datatype: 'number'
        },
        {
            name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACStartLowVoltage' }),
            type: "Set",
            key: 'ac_low_voltage',
            datatype: 'number'
        },
        //AC Start Frequency 
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACStartHighFrequency' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACStartHighFrequency' }),
        //     type: "Set",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACStartLowFrequency' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACStartLowFrequency' }),
        //     type: "Set",
        // },
        // //AC Start Volt level 1 
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt1' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt1' }),
        //     type: "Set",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt1' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt1' }),
        //     type: "Set",
        // },
        // //AC Start Volt 1 Time
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt1Time' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt1Time' }),
        //     type: "Set",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt1Time' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt1Time' }),
        //     type: "Set",
        // },
        // //AC Start Volt 2
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt2' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt2' }),
        //     type: "Set",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt2' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt2' }),
        //     type: "Set",
        // },
        // //AC Start Volt 2 Time
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt2Time' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt2Time' }),
        //     type: "Set",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt2Time' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt2Time' }),
        //     type: "Set",
        // },
        // //AC Frequency level 1
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq1' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq1' }),
        //     type: "Set",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq1' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq1' }),
        //     type: "Set",
        // },
        // //AC Frequency 1 Time
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq1Time' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq1Time' }),
        //     type: "Set",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq1Time' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq1Time' }),
        //     type: "Set",
        // },
        // //AC Frequency level 2
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq2' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq2' }),
        //     type: "Set",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq2' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq2' }),
        //     type: "Set",
        // },
        // //AC Frequency 2 Time
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq2Time' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq2Time' }),
        //     type: "Set",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq2Time' }),
        //     type: "read",
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq2Time' }),
        //     type: "Set",
        // },
        //Other Options
        // {
        //     name: dataLang.formatMessage({ id: 'ReadInverters' })
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'SetInverters' })
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'ReadCTRatio' })
        // },
        // {
        //     name: dataLang.formatMessage({ id: 'SetCTRatio' })
        // },
    ];

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
    }

    const stopTimer = () => {
        clearInterval(intervalIDRef.current);
        intervalIDRef.current = null;
    };

    const handleChange = (e) => {
        const type = e.target.value.split("-")[0];
        const key = e.target.value.split("-")[1];
        const datatype = e.target.value.split("-")[2];
        setCommandType(type);
        setKey(key);
        setDatatype(datatype);
    };

    const handleSend = async (e) => {
        if (commandtype === "read") {
            if (step === 0) {
                let res = await invtCloud('{"deviceCode": "' + info.value.plogger + '"}', Token.value.token)
                console.log(res)
                if (res.ret === 0) {
                    setInvt(res.data)
                    setStep(1)
                }
            }
        }

        if (commandtype === "Set") {
        }
    };

    useEffect(() => {
        if (step) {
            setStep(0)
            let number = datatype === 'number' ? parseFloat(invt[info.value.psetting[key].register] * info.value.psetting[key].cal).toFixed(2) : parseInt(invt[info.value.psetting[key].register] * info.value.psetting[key].cal)
            setResult(number);
            let name = commandData.filter(item => item.key === key)[0].name;
            setCommandName(name);
        }
    }, [step])

    return (
        <>
            <div className="DAT_Info_Databox" id="LastCommandRecord">
                <div className="DAT_Info_Databox_Title">
                    <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'LastCommandRecord' })}</div>
                </div>

                <div className="DAT_Info_Databox_SingleCommand">
                    <div className="DAT_Info_Databox_SingleCommand_Content">
                        <div className="DAT_Info_Databox_SingleCommand_Content_Item">
                            <div className="DAT_Info_Databox_SingleCommand_Content_Item_Tit">
                                {dataLang.formatMessage({ id: 'CommandName' })}:
                            </div>
                            <div className="DAT_Info_Databox_SingleCommand_Content_Item_Content">
                                {commandName}
                            </div>
                        </div>

                        <div className="DAT_Info_Databox_SingleCommand_Content_Item">
                            <div className="DAT_Info_Databox_SingleCommand_Content_Item_Tit">
                                {dataLang.formatMessage({ id: 'ReadResult' })}:
                            </div>
                            <div className="DAT_Info_Databox_SingleCommand_Content_Item_Content">
                                {result}
                            </div>
                        </div>

                        <div className="DAT_Info_Databox_SingleCommand_Content_Item">
                            <div className="DAT_Info_Databox_SingleCommand_Content_Item_Tit">
                                {dataLang.formatMessage({ id: 'CommandState' })}:
                            </div>
                            <div className="DAT_Info_Databox_SingleCommand_Content_Item_Content">
                                {result === ""
                                    ? <></>
                                    : <>
                                        <FaCheckCircle size={16} color="green" />
                                        <span style={{ color: "green" }}>
                                            {dataLang.formatMessage({ id: 'success' })}
                                        </span>
                                    </>
                                }
                            </div>
                        </div>

                        {/* <div className="DAT_Info_Databox_SingleCommand_Content_Item">
                            <div className="DAT_Info_Databox_SingleCommand_Content_Item_Tit">
                                {dataLang.formatMessage({ id: 'SendTime' })}:
                            </div>
                            <div className="DAT_Info_Databox_SingleCommand_Content_Item_Content">
                                2024/03/25 10:30:49 UTC+07:00
                            </div>
                        </div> */}

                        {/* <div className="DAT_Info_Databox_SingleCommand_Content_Item">
                            <div className="DAT_Info_Databox_SingleCommand_Content_Item_Tit">
                                {dataLang.formatMessage({ id: 'FeedbackTime' })}:
                            </div>
                            <div className="DAT_Info_Databox_SingleCommand_Content_Item_Content">
                                2024/03/25 10:30:50 UTC+07:00
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="DAT_Info_Databox" id="SelectCommand">
                <div className="DAT_Info_Databox_Title">
                    <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'SelCommand' })}</div>
                </div>

                <div className="DAT_Info_Databox_SingleCommand">
                    <div className="DAT_Info_Databox_SingleCommand_Content">
                        <div className="DAT_Info_Databox_SingleCommand_Content_Item">
                            <div className="DAT_Info_Databox_SingleCommand_Content_Item_Tit">
                                {dataLang.formatMessage({ id: 'CommandName' })}:
                            </div>
                            <div className="DAT_Info_Databox_SingleCommand_Content_Item_Content">
                                <select onChange={(e) => handleChange(e)}>
                                    <option style={{ display: "none" }}>{dataLang.formatMessage({ id: 'PleaseSel' })}</option>
                                    {commandData.map((item, i) => {
                                        return <option key={i} value={`${item.type}-${item.key}-${item.datatype}`}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>

                        {commandtype === ""
                            ? <></>
                            : <div className="DAT_Info_Databox_SingleCommand_Content_Item">
                                <div className="DAT_Info_Databox_SingleCommand_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: 'CommandType' })}:
                                </div>
                                <div className="DAT_Info_Databox_SingleCommand_Content_Item_Content">
                                    {dataLang.formatMessage({ id: commandtype })}
                                </div>
                            </div>
                        }

                        {commandtype === "" || commandtype === "read"
                            ? <></>
                            : <div className="DAT_Info_Databox_SingleCommand_Content_Item">
                                <div className="DAT_Info_Databox_SingleCommand_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: 'Inputs' })}:
                                </div>
                                <div className="DAT_Info_Databox_SingleCommand_Content_Item_Content">
                                    <input />
                                </div>
                            </div>
                        }
                    </div>

                    <div className="DAT_Info_Databox_SingleCommand_Foot">
                        {/* <div className="DAT_Info_Databox_SingleCommand_Foot_Item">
                            <span>
                                {dataLang.formatMessage({ id: 'Timeout' })}:
                            </span>
                            <input />
                            <span>{dataLang.formatMessage({ id: 'Timeout' })}</span>

                            <div className="DAT_Home_Overview-Main-Percent-Icon" style={{ cursor: 'pointer' }}>
                                <PopupState variant="popper" popupId="demo-popup-popper">
                                    {(popupState) => (
                                        <div style={{ cursor: 'pointer' }}>
                                            <HelpOutlineIcon
                                                {...bindHover(popupState)}
                                                color="action"
                                                fontSize="9px" />
                                            <Popper {...bindPopper(popupState)} transition >
                                                {({ TransitionProps }) => (
                                                    <Fade {...TransitionProps} timeout={350}>
                                                        <Paper sx={{ width: '400px', marginLeft: '200px', p: 2 }}>
                                                            <Typography sx={{ fontSize: '12px', textAlign: 'justify', marginBottom: 1.7 }}>
                                                                {dataLang.formatMessage({ id: 'timeoutInfo' })}
                                                            </Typography>
                                                        </Paper>
                                                    </Fade>
                                                )}
                                            </Popper>
                                        </div>
                                    )}
                                </PopupState>
                            </div>
                        </div> */}

                        <button onClick={(e) => handleSend(e)}>{dataLang.formatMessage({ id: 'SendCommand' })}</button>
                    </div>
                </div >
            </div >
        </>
    );
}
