import React, { useEffect, useState } from 'react';
import "./Device.scss";

import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import moment from 'moment-timezone';
import { callApi } from '../Api/Api';
import { host } from '../Lang/Contant';
import { info } from './Device';
import { isMobile } from '../Navigation/Navigation';
import DatePicker from "react-datepicker";
import { IoCalendarOutline } from 'react-icons/io5';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, } from "recharts";
import { COLOR } from '../../App';

import { IoIosArrowUp } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';

export default function HistoricalData(props) {
    const lang = useSelector((state) => state.admin.lang);
    const dataLang = useIntl();
    const [display, setDisplay] = useState(true);
    const [dropConfig, setDropConfig] = useState(false);
    const chooseParaId = dataLang.formatMessage({ id: "choosePara" });
    const minimizeId = dataLang.formatMessage({ id: "minimize" });
    const [configname, setConfigname] = useState(chooseParaId);
    const [chart, setChart] = useState([]);
    const [acfre, setACFre] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [acrcur, setACRcur] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [acscur, setACScur] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [actcur, setACTcur] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [acrvolt, setACRvolt] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [acsvolt, setACSvolt] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [actvolt, setACTvolt] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [pv1cur, setPV1cur] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [pv2cur, setPV2cur] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [pv3cur, setPV3cur] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [pv4cur, setPV4cur] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [pv1volt, setPV1volt] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [pv2volt, setPV2volt] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [pv3volt, setPV3volt] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [pv4volt, setPV4volt] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [pv1power, setPV1pow] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [pv2power, setPV2pow] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [pv3power, setPV3pow] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [pv4power, setPV4pow] = useState(dataLang.formatMessage({ id: "unknown" }));
    const [dateType, setDateType] = useState("date");
    const [mode, setMode] = useState('ACVOLT');
    const [d, setD] = useState({
        date: moment(new Date()).format("MM/DD/YYYY"),
    });

    useEffect(() => {
        const getChart = async () => {
            const req = await callApi("post", host.DATA + "/getInverterChart", {
                sn: info.value.psn,
                date: moment(new Date()).format("MM/DD/YYYY")
            });
            if (req.status) {
                let vACFre_ = dataLang.formatMessage({ id: "acfre" });
                let vACRcur_ = dataLang.formatMessage({ id: "acrcur" });
                let vACScur_ = dataLang.formatMessage({ id: "acscur" });
                let vACTcur_ = dataLang.formatMessage({ id: "actcur" });
                let vACRvolt_ = dataLang.formatMessage({ id: "acrvolt" });
                let vACSvolt_ = dataLang.formatMessage({ id: "acsvolt" });
                let vACTvol_ = dataLang.formatMessage({ id: "actvolt" });
                let vpv1cur_ = dataLang.formatMessage({ id: "pv1cur" });
                let vpv2cur_ = dataLang.formatMessage({ id: "pv2cur" });
                let vpv3cur_ = dataLang.formatMessage({ id: "pv3cur" });
                let vpv4cur_ = dataLang.formatMessage({ id: "pv4cur" });
                let vpv1volt_ = dataLang.formatMessage({ id: "pv1volt" });
                let vpv2volt_ = dataLang.formatMessage({ id: "pv2volt" });
                let vpv3volt_ = dataLang.formatMessage({ id: "pv3volt" });
                let vpv4volt_ = dataLang.formatMessage({ id: "pv4volt" });
                let vpv1pow_ = dataLang.formatMessage({ id: "pv1pow" });
                let vpv2pow_ = dataLang.formatMessage({ id: "pv2pow" });
                let vpv3pow_ = dataLang.formatMessage({ id: "pv3pow" });
                let vpv4pow_ = dataLang.formatMessage({ id: "pv4pow" });
                let x = []
                req.data.data.map((item) => {
                    let arr = item.time.split(":");
                    x = [
                        ...x,
                        {
                            time: `${arr[0]}:${arr[1]}`,
                            [vACFre_]: item.acfre,
                            [vACRcur_]: item.acrcur,
                            [vACScur_]: item.acscur,
                            [vACTcur_]: item.actcur,
                            [vACRvolt_]: item.acrvolt,
                            [vACSvolt_]: item.acsvolt,
                            [vACTvol_]: item.actvolt,
                            [vpv1cur_]: item.pv1cur,
                            [vpv2cur_]: item.pv2cur,
                            [vpv3cur_]: item.pv3cur,
                            [vpv4cur_]: item.pv4cur,
                            [vpv1volt_]: item.pv1volt,
                            [vpv2volt_]: item.pv2volt,
                            [vpv3volt_]: item.pv3volt,
                            [vpv4volt_]: item.pv4volt,
                            [vpv1pow_]: item.pv1pow,
                            [vpv2pow_]: item.pv2pow,
                            [vpv3pow_]: item.pv3pow,
                            [vpv4pow_]: item.pv4pow,
                        }

                    ]
                })

                for (let i = x.length; i < 500; i++) {
                    if (
                        moment(x[x.length - 1].time, "HH:mm") < moment("23:55", "HH:mm")
                    ) {
                        let nextTime = moment(x[x.length - 1].time, "HH:mm")
                            .add(5, "minutes")
                            .format("HH:mm");
                        x.push({
                            time: nextTime,
                            [vACFre_]: 0,
                            [vACRcur_]: 0,
                            [vACScur_]: 0,
                            [vACTcur_]: 0,
                            [vACRvolt_]: 0,
                            [vACSvolt_]: 0,
                            [vACTvol_]: 0,
                            [vpv1cur_]: 0,
                            [vpv2cur_]: 0,
                            [vpv3cur_]: 0,
                            [vpv4cur_]: 0,
                            [vpv1volt_]: 0,
                            [vpv2volt_]: 0,
                            [vpv3volt_]: 0,
                            [vpv4volt_]: 0,
                            [vpv1pow_]: 0,
                            [vpv2pow_]: 0,
                            [vpv3pow_]: 0,
                            [vpv4pow_]: 0

                        });
                    }
                }

                setACFre(dataLang.formatMessage({ id: "acfre" }));
                setACRcur(dataLang.formatMessage({ id: "acrcur" }));
                setACScur(dataLang.formatMessage({ id: "acscur" }));
                setACTcur(dataLang.formatMessage({ id: "actcur" }));
                setACRvolt(dataLang.formatMessage({ id: "acrvolt" }));
                setACSvolt(dataLang.formatMessage({ id: "acsvolt" }));
                setACTvolt(dataLang.formatMessage({ id: "actvolt" }));
                setPV1cur(dataLang.formatMessage({ id: "pv1cur" }));
                setPV2cur(dataLang.formatMessage({ id: "pv2cur" }));
                setPV3cur(dataLang.formatMessage({ id: "pv3cur" }));
                setPV4cur(dataLang.formatMessage({ id: "pv4cur" }));
                setPV1volt(dataLang.formatMessage({ id: "pv1volt" }));
                setPV2volt(dataLang.formatMessage({ id: "pv2volt" }));
                setPV3volt(dataLang.formatMessage({ id: "pv3volt" }));
                setPV4volt(dataLang.formatMessage({ id: "pv4volt" }));
                setPV1pow(dataLang.formatMessage({ id: "pv1pow" }));
                setPV2pow(dataLang.formatMessage({ id: "pv2pow" }));
                setPV3pow(dataLang.formatMessage({ id: "pv3pow" }));
                setPV4pow(dataLang.formatMessage({ id: "pv4pow" }));
                setChart([...x])
            } else {
                setChart([])
            }
        }

        getChart()
    }, [lang])

    const handleChart = (date) => {
        setD({ ...d, date: moment(date).format("MM/DD/YYYY") })
        const getChart = async () => {
            const req = await callApi("post", host.DATA + "/getInverterChart", {
                sn: info.value.psn,
                date: moment(date).format("MM/DD/YYYY")
            });
            if (req.status) {
                let vACFre_ = dataLang.formatMessage({ id: "acfre" });
                let vACRcur_ = dataLang.formatMessage({ id: "acrcur" });
                let vACScur_ = dataLang.formatMessage({ id: "acscur" });
                let vACTcur_ = dataLang.formatMessage({ id: "actcur" });
                let vACRvolt_ = dataLang.formatMessage({ id: "acrvolt" });
                let vACSvolt_ = dataLang.formatMessage({ id: "acsvolt" });
                let vACTvol_ = dataLang.formatMessage({ id: "actvolt" });
                let vpv1cur_ = dataLang.formatMessage({ id: "pv1cur" });
                let vpv2cur_ = dataLang.formatMessage({ id: "pv2cur" });
                let vpv3cur_ = dataLang.formatMessage({ id: "pv3cur" });
                let vpv4cur_ = dataLang.formatMessage({ id: "pv4cur" });
                let vpv1volt_ = dataLang.formatMessage({ id: "pv1volt" });
                let vpv2volt_ = dataLang.formatMessage({ id: "pv2volt" });
                let vpv3volt_ = dataLang.formatMessage({ id: "pv3volt" });
                let vpv4volt_ = dataLang.formatMessage({ id: "pv4volt" });
                let vpv1pow_ = dataLang.formatMessage({ id: "pv1pow" });
                let vpv2pow_ = dataLang.formatMessage({ id: "pv2pow" });
                let vpv3pow_ = dataLang.formatMessage({ id: "pv3pow" });
                let vpv4pow_ = dataLang.formatMessage({ id: "pv4pow" });
                let x = []
                req.data.data.map((item) => {
                    let arr = item.time.split(":");
                    x = [
                        ...x,
                        {
                            time: `${arr[0]}:${arr[1]}`,
                            [vACFre_]: item.acfre,
                            [vACRcur_]: item.acrcur,
                            [vACScur_]: item.acscur,
                            [vACTcur_]: item.actcur,
                            [vACRvolt_]: item.acrvolt,
                            [vACSvolt_]: item.acsvolt,
                            [vACTvol_]: item.actvolt,
                            [vpv1cur_]: item.pv1cur,
                            [vpv2cur_]: item.pv2cur,
                            [vpv3cur_]: item.pv3cur,
                            [vpv4cur_]: item.pv4cur,
                            [vpv1volt_]: item.pv1volt,
                            [vpv2volt_]: item.pv2volt,
                            [vpv3volt_]: item.pv3volt,
                            [vpv4volt_]: item.pv4volt,
                            [vpv1pow_]: item.pv1pow,
                            [vpv2pow_]: item.pv2pow,
                            [vpv3pow_]: item.pv3pow,
                            [vpv4pow_]: item.pv4pow,
                        }

                    ]
                })

                for (let i = x.length; i < 500; i++) {
                    if (
                        moment(x[x.length - 1].time, "HH:mm") < moment("23:55", "HH:mm")
                    ) {
                        let nextTime = moment(x[x.length - 1].time, "HH:mm")
                            .add(5, "minutes")
                            .format("HH:mm");
                        x.push({
                            time: nextTime,
                            [vACFre_]: 0,
                            [vACRcur_]: 0,
                            [vACScur_]: 0,
                            [vACTcur_]: 0,
                            [vACRvolt_]: 0,
                            [vACSvolt_]: 0,
                            [vACTvol_]: 0,
                            [vpv1cur_]: 0,
                            [vpv2cur_]: 0,
                            [vpv3cur_]: 0,
                            [vpv4cur_]: 0,
                            [vpv1volt_]: 0,
                            [vpv2volt_]: 0,
                            [vpv3volt_]: 0,
                            [vpv4volt_]: 0,
                            [vpv1pow_]: 0,
                            [vpv2pow_]: 0,
                            [vpv3pow_]: 0,
                            [vpv4pow_]: 0

                        });
                    }
                }

                setACFre(dataLang.formatMessage({ id: "acfre" }));
                setACRcur(dataLang.formatMessage({ id: "acrcur" }));
                setACScur(dataLang.formatMessage({ id: "acscur" }));
                setACTcur(dataLang.formatMessage({ id: "actcur" }));
                setACRvolt(dataLang.formatMessage({ id: "acrvolt" }));
                setACSvolt(dataLang.formatMessage({ id: "acsvolt" }));
                setACTvolt(dataLang.formatMessage({ id: "actvolt" }));
                setPV1cur(dataLang.formatMessage({ id: "pv1cur" }));
                setPV2cur(dataLang.formatMessage({ id: "pv2cur" }));
                setPV3cur(dataLang.formatMessage({ id: "pv3cur" }));
                setPV4cur(dataLang.formatMessage({ id: "pv4cur" }));
                setPV1volt(dataLang.formatMessage({ id: "pv1volt" }));
                setPV2volt(dataLang.formatMessage({ id: "pv2volt" }));
                setPV3volt(dataLang.formatMessage({ id: "pv3volt" }));
                setPV4volt(dataLang.formatMessage({ id: "pv4volt" }));
                setPV1pow(dataLang.formatMessage({ id: "pv1pow" }));
                setPV2pow(dataLang.formatMessage({ id: "pv2pow" }));
                setPV3pow(dataLang.formatMessage({ id: "pv3pow" }));
                setPV4pow(dataLang.formatMessage({ id: "pv4pow" }));
                setChart([...x])
            } else {
                setChart([])
            }
        }

        getChart()
    }

    // const handleMode = () => {
    //   if (mode === 'AC') {
    //     setMode('DC')
    //   } else {
    //     setMode('AC')
    //   }
    // }

    const handleChartMode = (e) => {
        setMode(e.target.value)
    }

    const handleShowConfig = (e) => {
        if (configname === chooseParaId) {
            setConfigname(minimizeId);
        } else if (configname === minimizeId) {
            setConfigname(chooseParaId);
        }
    };

    return (
        <div className="DAT_Info_Databox" id="HistoricalData">
            <div className="DAT_Info_Databox_Title">
                <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'historyInverter' })}</div>
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
                {display ?
                    <>
                        {isMobile.value ?
                            <div className="DAT_Info_Databox_HistoriccalData">
                                <div className="DAT_Info_Databox_HistoricalData_Picker">
                                    <select onChange={(e) => handleChartMode(e)}>
                                        <option value={"ACVOLT"}>{dataLang.formatMessage({ id: "ACVolt" })}(V)</option>
                                        <option value={"ACCUR"}>{dataLang.formatMessage({ id: "ACCurrent" })}(A)</option>
                                        <option value={"ACFRE"}>{dataLang.formatMessage({ id: "acfre" })}(Hz)</option>
                                        <option value={"DCVOLT"}>{dataLang.formatMessage({ id: "DCVolt" })}(V)</option>
                                        <option value={"DCCUR"}>{dataLang.formatMessage({ id: "DCCurrent" })}(A)</option>
                                        <option value={"DCPOWER"}>{dataLang.formatMessage({ id: "DCPower" })}(kW)</option>
                                    </select>
                                    {/* <div className="DAT_Info_Databox_HistoricalData_Picker_Type">
            <p>{dataLang.formatMessage({ id: "day" })}</p>
            <p>{dataLang.formatMessage({ id: "month" })}</p>
            <p>{dataLang.formatMessage({ id: "year" })}</p>
            <p>{dataLang.formatMessage({ id: "total" })}</p>
          </div>
          <div className="DAT_Info_Databox_HistoricalData_Picker_ParametersPicker">
            <div>{dataLang.formatMessage({ id: "choosePara" })}</div>
          </div>
          <div className="DAT_Info_Databox_HistoricalData_Picker_Export">
            <div>{dataLang.formatMessage({ id: "export" })}</div>
          </div> */}
                                    <div className="DAT_Info_Databox_HistoricalData_Picker_ParametersPicker">
                                        <button>{dataLang.formatMessage({ id: "choosePara" })}</button>
                                    </div>
                                    <DatePicker
                                        onChange={(date) => handleChart(date)}
                                        customInput={
                                            <button className="DAT_CustomPicker" >
                                                <span>{d[dateType]}</span>
                                                <IoCalendarOutline color="gray" />
                                            </button>
                                        }
                                    />
                                </div>
                                <div className="DAT_Info_Databox_HistoricalData_Chart">
                                    {(() => {
                                        switch (mode) {
                                            case "ACFRE":
                                                return (
                                                    <ResponsiveContainer
                                                        style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                                                    >
                                                        <LineChart width={100} height={500} data={chart}>
                                                            <XAxis dataKey="time" axisLine={false} tickLine={false} />
                                                            <YAxis
                                                                axisLine={false}
                                                                tickLine={false}
                                                                domain={[
                                                                    0,
                                                                    chart.reduce((max, item) => {
                                                                        // console.log(item)
                                                                        const values = Object.values({
                                                                            x: item[acfre],
                                                                        });
                                                                        const currentMax = Math.max(...values.map(Number));
                                                                        // console.log(currentMax)
                                                                        return currentMax > max ? currentMax : max;
                                                                    }, -Infinity),
                                                                ]}
                                                            />
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip />
                                                            <Legend />
                                                            <Line
                                                                type="monotone"
                                                                dataKey={acfre}
                                                                stroke="red"
                                                                dot={false}
                                                            />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                )
                                            case "ACVOLT":
                                                return (
                                                    <ResponsiveContainer
                                                        style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                                                    >


                                                        <LineChart width={100} height={500} data={chart}>
                                                            <XAxis dataKey="time" axisLine={false} tickLine={false} />
                                                            <YAxis
                                                                axisLine={false}
                                                                tickLine={false}
                                                                domain={[
                                                                    0,
                                                                    chart.reduce((max, item) => {
                                                                        // console.log(item)
                                                                        const values = Object.values({
                                                                            x: item[acrvolt],
                                                                            y: item[acsvolt],
                                                                            z: item[actvolt],
                                                                        });
                                                                        const currentMax = Math.max(...values.map(Number));
                                                                        // console.log(currentMax)
                                                                        return currentMax > max ? currentMax : max;
                                                                    }, -Infinity),
                                                                ]} />
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip />
                                                            <Legend />
                                                            <Line
                                                                type="monotone"
                                                                dataKey={acrvolt}
                                                                stroke="red"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={acsvolt}
                                                                stroke="green"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={actvolt}
                                                                stroke="purple"
                                                                dot={false}
                                                            />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                )
                                            case "ACCUR":
                                                return (
                                                    <ResponsiveContainer
                                                        style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                                                    >

                                                        <LineChart width={100} height={500} data={chart}>
                                                            <XAxis dataKey="time" axisLine={false} tickLine={false} />
                                                            <YAxis
                                                                axisLine={false}
                                                                tickLine={false}
                                                                domain={[
                                                                    0,
                                                                    chart.reduce((max, item) => {
                                                                        // console.log(item)
                                                                        const values = Object.values({
                                                                            x: item[acrcur],
                                                                            y: item[acscur],
                                                                            z: item[actcur],

                                                                        });
                                                                        const currentMax = Math.max(...values.map(Number));
                                                                        // console.log(currentMax)
                                                                        return currentMax > max ? currentMax : max;
                                                                    }, -Infinity),
                                                                ]}
                                                            />
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip />
                                                            <Legend />
                                                            <Line
                                                                type="monotone"
                                                                dataKey={acrcur}
                                                                stroke="orange"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={acscur}
                                                                stroke="gray"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={actcur}
                                                                stroke="pink"
                                                                dot={false}
                                                            />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                )
                                            case "DCCUR":
                                                return (
                                                    <ResponsiveContainer
                                                        style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                                                    >

                                                        <LineChart width={100} height={500} data={chart}>
                                                            <XAxis dataKey="time" axisLine={false} tickLine={false} />
                                                            <YAxis
                                                                axisLine={false}
                                                                tickLine={false}
                                                                domain={[
                                                                    0,
                                                                    chart.reduce((max, item) => {
                                                                        // console.log(item)/
                                                                        const values = Object.values({
                                                                            x: item[pv1cur],
                                                                            y: item[pv2cur],
                                                                            z: item[pv3cur],
                                                                            t: item[pv4cur],
                                                                        });
                                                                        const currentMax = Math.max(...values.map(Number));
                                                                        // console.log(currentMax)
                                                                        return currentMax > max ? currentMax : max;
                                                                    }, -Infinity),
                                                                ]}
                                                            />

                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip />
                                                            <Legend />
                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv1cur}
                                                                stroke="rgb(4,143,255)"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv2cur}
                                                                stroke="red"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv3cur}
                                                                stroke="green"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv4cur}
                                                                stroke="purple"
                                                                dot={false}
                                                            />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                )
                                            case 'DCVOLT':
                                                return (
                                                    <ResponsiveContainer
                                                        style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                                                    >

                                                        <LineChart width={100} height={500} data={chart}>
                                                            <XAxis dataKey="time" axisLine={false} tickLine={false} />
                                                            <YAxis
                                                                axisLine={false}
                                                                tickLine={false}
                                                                domain={[
                                                                    0,
                                                                    chart.reduce((max, item) => {
                                                                        // console.log(item)
                                                                        const values = Object.values({
                                                                            x: item[pv1volt],
                                                                            y: item[pv2volt],
                                                                            z: item[pv3volt],
                                                                            w: item[pv4volt],
                                                                        });
                                                                        const currentMax = Math.max(...values.map(Number));
                                                                        // console.log(currentMax)
                                                                        return currentMax > max ? currentMax : max;
                                                                    }, -Infinity),
                                                                ]}
                                                            />
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip />
                                                            <Legend />
                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv1volt}
                                                                stroke="rgb(4,143,255)"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv2volt}
                                                                stroke="red"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv3volt}
                                                                stroke="green"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv4volt}
                                                                stroke="purple"
                                                                dot={false}
                                                            />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                )
                                            case 'DCPOWER':
                                                return (
                                                    <ResponsiveContainer
                                                        style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                                                    >

                                                        <LineChart width={100} height={500} data={chart}>
                                                            <XAxis dataKey="time" axisLine={false} tickLine={false} />
                                                            <YAxis
                                                                axisLine={false}
                                                                tickLine={false}
                                                                domain={[
                                                                    0,
                                                                    chart.reduce((max, item) => {
                                                                        // console.log(item)
                                                                        const values = Object.values({
                                                                            x: item[pv1power],
                                                                            y: item[pv2power],
                                                                            z: item[pv3power],
                                                                            w: item[pv4power],
                                                                        });
                                                                        const currentMax = Math.max(...values.map(Number));
                                                                        // console.log(currentMax)
                                                                        return currentMax > max ? currentMax : max;
                                                                    }, -Infinity),
                                                                ]}
                                                            />
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip />
                                                            <Legend />
                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv1power}
                                                                stroke="rgb(4,143,255)"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv2power}
                                                                stroke="red"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv3power}
                                                                stroke="green"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv4power}
                                                                stroke="purple"
                                                                dot={false}
                                                            />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                )
                                            default:
                                                return <></>;
                                        }
                                    })()}
                                </div>
                            </div>
                            :
                            <div className="DAT_Info_Databox_HistoriccalData">
                                <div className="DAT_Info_Databox_HistoricalData_Picker">
                                    {/* <div className="DAT_Info_Databox_HistoricalData_Picker_Type">
                <p>{dataLang.formatMessage({ id: "day" })}</p>
                <p>{dataLang.formatMessage({ id: "month" })}</p>
                <p>{dataLang.formatMessage({ id: "year" })}</p>
                <p>{dataLang.formatMessage({ id: "total" })}</p>
              </div> */}
                                    {/* <div className="DAT_Info_Databox_HistoricalData_Picker_Export">
                <div>{dataLang.formatMessage({ id: "export" })}</div>
              </div> */}
                                    <div className="DAT_Info_Databox_HistoricalData_Picker_ParametersPicker">
                                        <button
                                            onClick={(e) => {
                                                handleShowConfig(e);
                                                setDropConfig(!dropConfig);
                                            }}
                                        >
                                            {configname}
                                        </button>
                                    </div>
                                    <DatePicker
                                        onChange={(date) => handleChart(date)}
                                        customInput={
                                            <button className="DAT_CustomPicker" >
                                                <span>{d[dateType]}</span>
                                                <IoCalendarOutline color="gray" />
                                            </button>
                                        }
                                    />
                                </div>

                                <div className="DAT_Info_Databox_HistoricalData_Chart">
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "40px", marginBottom: "16px" }}>
                                        <div style={{ cursor: "pointer", color: mode === "ACVOLT" ? "rgb(4,143,255)" : "black" }} onClick={() => setMode('ACVOLT')}>{dataLang.formatMessage({ id: "ACVolt" })}(V)</div>
                                        <div style={{ cursor: "pointer", color: mode === "ACCUR" ? "rgb(4,143,255)" : "black" }} onClick={() => setMode('ACCUR')}>{dataLang.formatMessage({ id: "ACCurrent" })}(A)</div>
                                        <div style={{ cursor: "pointer", color: mode === "ACFRE" ? "rgb(4,143,255)" : "black" }} onClick={() => setMode('ACFRE')}>{dataLang.formatMessage({ id: "acfre" })}(Hz)</div>
                                        <div style={{ cursor: "pointer", color: mode === "DCVOLT" ? "rgb(4,143,255)" : "black" }} onClick={() => setMode('DCVOLT')}>{dataLang.formatMessage({ id: "DCVolt" })}(V)</div>
                                        <div style={{ cursor: "pointer", color: mode === "DCCUR" ? "rgb(4,143,255)" : "black" }} onClick={() => setMode('DCCUR')}>{dataLang.formatMessage({ id: "DCCurrent" })}(A)</div>
                                        <div style={{ cursor: "pointer", color: mode === "DCPOWER" ? "rgb(4,143,255)" : "black" }} onClick={() => setMode('DCPOWER')}>{dataLang.formatMessage({ id: "DCPower" })}(kW)</div>
                                    </div>
                                    {(() => {
                                        switch (mode) {
                                            case "ACFRE":
                                                return (
                                                    <ResponsiveContainer
                                                        style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                                                    >


                                                        <LineChart width={100} height={500} data={chart}>
                                                            <XAxis dataKey="time" axisLine={false} tickLine={false} />
                                                            <YAxis
                                                                axisLine={false}
                                                                tickLine={false}
                                                                domain={[
                                                                    0,
                                                                    chart.reduce((max, item) => {
                                                                        // console.log(item)
                                                                        const values = Object.values({
                                                                            x: item[acfre],
                                                                        });
                                                                        const currentMax = Math.max(...values.map(Number));
                                                                        // console.log(currentMax)
                                                                        return currentMax > max ? currentMax : max;
                                                                    }, -Infinity),
                                                                ]}
                                                            />
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip />
                                                            {/* <Legend /> */}
                                                            <Line
                                                                type="monotone"
                                                                dataKey={acfre}
                                                                stroke="red"
                                                                dot={false}
                                                            />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                )
                                            case "ACVOLT":
                                                return (
                                                    <ResponsiveContainer
                                                        style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                                                    >


                                                        <LineChart width={100} height={500} data={chart}>
                                                            <XAxis dataKey="time" axisLine={false} tickLine={false} />
                                                            <YAxis
                                                                axisLine={false}
                                                                tickLine={false}
                                                                domain={[
                                                                    0,
                                                                    chart.reduce((max, item) => {
                                                                        // console.log(item)
                                                                        const values = Object.values({
                                                                            x: item[acrvolt],
                                                                            y: item[acsvolt],
                                                                            z: item[actvolt],
                                                                        });
                                                                        const currentMax = Math.max(...values.map(Number));
                                                                        // console.log(currentMax)
                                                                        return currentMax > max ? currentMax : max;
                                                                    }, -Infinity),
                                                                ]} />
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip />
                                                            {/* <Legend /> */}
                                                            <Line
                                                                type="monotone"
                                                                dataKey={acrvolt}
                                                                stroke="red"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={acsvolt}
                                                                stroke="green"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={actvolt}
                                                                stroke="purple"
                                                                dot={false}
                                                            />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                )
                                            case "ACCUR":
                                                return (
                                                    <ResponsiveContainer
                                                        style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                                                    >

                                                        <LineChart width={100} height={500} data={chart}>
                                                            <XAxis dataKey="time" axisLine={false} tickLine={false} />
                                                            <YAxis
                                                                axisLine={false}
                                                                tickLine={false}
                                                                domain={[
                                                                    0,
                                                                    chart.reduce((max, item) => {
                                                                        // console.log(item)
                                                                        const values = Object.values({
                                                                            x: item[acrcur],
                                                                            y: item[acscur],
                                                                            z: item[actcur],

                                                                        });
                                                                        const currentMax = Math.max(...values.map(Number));
                                                                        // console.log(currentMax)
                                                                        return currentMax > max ? currentMax : max;
                                                                    }, -Infinity),
                                                                ]}
                                                            />
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip />
                                                            {/* <Legend /> */}
                                                            <Line
                                                                type="monotone"
                                                                dataKey={acrcur}
                                                                stroke="orange"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={acscur}
                                                                stroke="gray"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={actcur}
                                                                stroke="pink"
                                                                dot={false}
                                                            />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                )
                                            case "DCCUR":
                                                return (
                                                    <ResponsiveContainer
                                                        style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                                                    >

                                                        <LineChart width={100} height={500} data={chart}>
                                                            <XAxis dataKey="time" axisLine={false} tickLine={false} />
                                                            <YAxis
                                                                axisLine={false}
                                                                tickLine={false}
                                                                domain={[
                                                                    0,
                                                                    chart.reduce((max, item) => {
                                                                        // console.log(item)/
                                                                        const values = Object.values({
                                                                            x: item[pv1cur],
                                                                            y: item[pv2cur],
                                                                            z: item[pv3cur],
                                                                            t: item[pv4cur],
                                                                        });
                                                                        const currentMax = Math.max(...values.map(Number));
                                                                        // console.log(currentMax)
                                                                        return currentMax > max ? currentMax : max;
                                                                    }, -Infinity),
                                                                ]}
                                                            />

                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip />
                                                            {/* <Legend /> */}
                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv1cur}
                                                                stroke="rgb(4,143,255)"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv2cur}
                                                                stroke="red"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv3cur}
                                                                stroke="green"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv4cur}
                                                                stroke="purple"
                                                                dot={false}
                                                            />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                )
                                            case 'DCVOLT':
                                                return (
                                                    <ResponsiveContainer
                                                        style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                                                    >

                                                        <LineChart width={100} height={500} data={chart}>
                                                            <XAxis dataKey="time" axisLine={false} tickLine={false} />
                                                            <YAxis
                                                                axisLine={false}
                                                                tickLine={false}
                                                                domain={[
                                                                    0,
                                                                    chart.reduce((max, item) => {
                                                                        // console.log(item)
                                                                        const values = Object.values({
                                                                            x: item[pv1volt],
                                                                            y: item[pv2volt],
                                                                            z: item[pv3volt],
                                                                            w: item[pv4volt],
                                                                        });
                                                                        const currentMax = Math.max(...values.map(Number));
                                                                        // console.log(currentMax)
                                                                        return currentMax > max ? currentMax : max;
                                                                    }, -Infinity),
                                                                ]}
                                                            />
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip />
                                                            {/* <Legend /> */}
                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv1volt}
                                                                stroke="rgb(4,143,255)"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv2volt}
                                                                stroke="red"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv3volt}
                                                                stroke="green"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv4volt}
                                                                stroke="purple"
                                                                dot={false}
                                                            />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                )
                                            case 'DCPOWER':
                                                return (
                                                    <ResponsiveContainer
                                                        style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                                                    >

                                                        <LineChart width={100} height={500} data={chart}>
                                                            <XAxis dataKey="time" axisLine={false} tickLine={false} />
                                                            <YAxis
                                                                axisLine={false}
                                                                tickLine={false}
                                                                domain={[
                                                                    0,
                                                                    chart.reduce((max, item) => {
                                                                        // console.log(item)
                                                                        const values = Object.values({
                                                                            x: item[pv1power],
                                                                            y: item[pv2power],
                                                                            z: item[pv3power],
                                                                            w: item[pv4power],
                                                                        });
                                                                        const currentMax = Math.max(...values.map(Number));
                                                                        // console.log(currentMax)
                                                                        return currentMax > max ? currentMax : max;
                                                                    }, -Infinity),
                                                                ]}
                                                            />
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <Tooltip />
                                                            {/* <Legend /> */}
                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv1power}
                                                                stroke="rgb(4,143,255)"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv2power}
                                                                stroke="red"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv3power}
                                                                stroke="green"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                type="monotone"
                                                                dataKey={pv4power}
                                                                stroke="purple"
                                                                dot={false}
                                                            />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                )
                                            default:
                                                return <></>;
                                        }
                                    })()}
                                </div>

                                <div className="DAT_Info_Databox_HistoricalData_SubConfig"
                                    style={{
                                        height: dropConfig ? "calc(100vh - 180px)" : "0px",
                                        transition: "0.5s",
                                    }}
                                >
                                    {dropConfig ?
                                        <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown"
                                            style={{
                                                height: dropConfig ? "auto" : "0px",
                                                transition: "0.5s",
                                            }}
                                        >
                                            <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Search">
                                                <input type="text" placeholder={dataLang.formatMessage({ id: "SearchbyPara" })} />
                                                <CiSearch color="gray" size={20} />
                                            </div>

                                            <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item">
                                                <table className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table">
                                                    <tbody>
                                                        <tr className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr">
                                                            <th className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                                {dataLang.formatMessage({ id: "basicInfo" })}:
                                                            </th>
                                                            <td className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td" >
                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"RatedPower"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"RatedPower"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "RatedPower" })}
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr">
                                                            <th className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                                {dataLang.formatMessage({ id: "ElectricityGeneration" })}:
                                                            </th>
                                                            <td className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td" >
                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"DC Voltage PV1"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"DC Voltage PV1"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "DCVolt" })} PV1
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"DC Voltage PV2"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"DC Voltage PV2"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "DCVolt" })} PV2
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"DC Current PV1"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"DC Current PV1"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "DCCurrent" })} PV1
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"DC Current PV2"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"DC Current PV2"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "DCCurrent" })} PV2
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"DC Power PV1"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"DC Power PV1"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "DCPower" })} PV1
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"DC Power PV2"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"DC Power PV2"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "DCPower" })} PV2
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"AC Voltage R/U/A"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"AC Voltage R/U/A"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "ACVolt" })} R/U/A
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"AC Current R/U/A"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"AC Current R/U/A"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "ACCurrent" })} R/U/A
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"AC Output Frequency R"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"AC Output Frequency R"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "ACOutputFreq" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Total AC Output Power"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Total AC Output Power"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "totalACOutput" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Reactive Power"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Reactive Power"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "reactivePower" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Daily Production (Active)"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Daily Production (Active)"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "dailyOutput" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Load Active Power"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Load Active Power"}
                                                                    >
                                                                        {/* Load Active Power */}
                                                                        {dataLang.formatMessage({ id: "LoadActivePower" })}
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr">
                                                            <th className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                                {/* Power Grid: */}
                                                                {dataLang.formatMessage({ id: "PowerGrid" })}:
                                                            </th>
                                                            <td className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td">
                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Leak Current"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Leak Current"}
                                                                    >
                                                                        {/* Leak Current */}
                                                                        {dataLang.formatMessage({ id: "LeakCurrent" })}:
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Total Grid Power"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Total Grid Power"}
                                                                    >
                                                                        {/* Total Grid Power */}
                                                                        {dataLang.formatMessage({ id: "TotalGridPower" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Cumulative Grid Feed-in"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Cumulative Grid Feed-in"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "CumulativeGridFeedin" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Cumulative Energy Purchased"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Cumulative Energy Purchased"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "CumulativeEnergyPurchased" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Daily Grid Feed-in"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Daily Grid Feed-in"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "DailyGridFeedin" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Daily Energy Purchased"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Daily Energy Purchased"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "DailyEnergyPurchased" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Meter Power"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Meter Power"}
                                                                    >
                                                                        {/* Meter Power */}
                                                                        {dataLang.formatMessage({ id: "MeterPower" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"CT Current"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"CT Current"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "CTcur" })}
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr">
                                                            <th className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                                {dataLang.formatMessage({ id: "electricConsumption" })}:
                                                            </th>
                                                            <td className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td">
                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Total Consumption Power"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Total Consumption Power"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "TotalConsumptionPower" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Cumulative Consumption"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Cumulative Consumption"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "CumulativeConsumption" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Daily Consumption"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Daily Consumption"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "DailyConsumptionPower" })}
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr">
                                                            <th className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                                {dataLang.formatMessage({ id: "batteryData" })}:
                                                            </th>
                                                            <td className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td">
                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Battery Voltage"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Battery Voltage"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "BatteryVolt" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Battery Current"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Battery Current"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "BatteryCurrent" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Max. Charging Current"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Max. Charging Current"}
                                                                    >
                                                                        {/* Max. Charging Current */}
                                                                        {dataLang.formatMessage({ id: "MaxChargingCur" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Max. Discharging Current"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Max. Discharging Current"}
                                                                    >
                                                                        {/* Max. Discharging Current */}
                                                                        {dataLang.formatMessage({ id: "MaxDischargingCur" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Battery Power"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Battery Power"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "BatteryPower" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"SoC"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"SoC"}
                                                                    >
                                                                        SoC
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"SoH"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"SoH"}
                                                                    >
                                                                        SoH
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Total Charging Energy"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Total Charging Energy"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "TotalchargingEnergy" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Total Discharging Energy"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Total Discharging Energy"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "TotaldischargingEnergy" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"Daily Charging Energy"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"Daily Charging Energy"}
                                                                    >
                                                                        {dataLang.formatMessage({ id: "DailychargingEnergy" })}
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr">
                                                            <th className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                                BMS:
                                                            </th>
                                                            <td className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td">
                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"BMS Max Charge Current"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"BMS Max Charge Current"}
                                                                    >
                                                                        {/* BMS Max Charge Current */}
                                                                        {dataLang.formatMessage({ id: "BMSMaxChargingCur" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"BMS Max Discharge Current"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"BMS Max Discharge Current"}
                                                                    >
                                                                        {/* BMS Max Discharge Current */}
                                                                        {dataLang.formatMessage({ id: "MaxDischargingCur" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"BMS Charge Voltage"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"BMS Charge Voltage"}
                                                                    >
                                                                        {/* BMS Charge Voltage */}
                                                                        {dataLang.formatMessage({ id: "BMSChargeVoltage" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"BMS Discharge Voltage"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"BMS Discharge Voltage"}
                                                                    >
                                                                        {/* BMS Discharge Voltage */}
                                                                        {dataLang.formatMessage({ id: "BMSDischargeVoltage" })}
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr">
                                                            <th className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                                {/* State: */}
                                                                {dataLang.formatMessage({ id: "State" })}:
                                                            </th>
                                                            <td className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td">
                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"DC Insulation Resistance"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"DC Insulation Resistance"}
                                                                    >
                                                                        {/* DC Insulation Resistance */}
                                                                        {dataLang.formatMessage({ id: "DCInsulationResistance" })}
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr">
                                                            <th className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Th">
                                                                EPS:
                                                            </th>
                                                            <td className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td">
                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"R phase EPS voltage"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"R phase EPS voltage"}
                                                                    >
                                                                        {/* R phase EPS voltage */}
                                                                        {dataLang.formatMessage({ id: "RphaseEPSvoltage" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"R phase EPS current"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"R phase EPS current"}
                                                                    >
                                                                        {/* R phase EPS current */}
                                                                        {dataLang.formatMessage({ id: "RphaseEPScurrent" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"EPSR phase active power"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"EPSR phase active power"}
                                                                    >
                                                                        {/* EPSR phase active power */}
                                                                        {dataLang.formatMessage({ id: "EPSRphaseActivePower" })}
                                                                    </label>
                                                                </div>

                                                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={"EPS Frequency"}
                                                                    />
                                                                    <label
                                                                        htmlFor={"EPS Frequency"}
                                                                    >
                                                                        {/* EPS Frequency */}
                                                                        {dataLang.formatMessage({ id: "EPSFrequency" })}
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Bottom">
                                                <button
                                                    style={{
                                                        backgroundColor: "white",
                                                        color: "black",
                                                    }}
                                                    onClick={(e) => {
                                                        handleShowConfig(e);
                                                        setDropConfig(!dropConfig);
                                                    }}
                                                >
                                                    {dataLang.formatMessage({ id: "cancel" })}
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        handleShowConfig(e);
                                                        setDropConfig(!dropConfig);
                                                    }}
                                                    style={{
                                                        backgroundColor: COLOR.value.PrimaryColor,
                                                        color: "white",
                                                    }}
                                                >
                                                    {dataLang.formatMessage({ id: "confirm" })}
                                                </button>
                                            </div>
                                        </div>
                                        : <></>
                                    }
                                </div>
                            </div>
                        }
                    </>
                    :
                    <></>
                }
            </div>
        </div >
    );
}
