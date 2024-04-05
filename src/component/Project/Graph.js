import React, { useEffect, useState } from 'react';
import "./Project.scss";

export default function Graph(props) {

    return (
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph">
            {(() => {
                switch (props.type) {
                    case "grid":
                        return <GraphGrid cal={props.cal} />;
                    case "consumption":
                        return <GraphConsumption cal={props.cal} />;
                    case "hybrid":
                        return <GraphFull cal={props.cal} />;
                    case "ESS":
                        return <GraphFull cal={props.cal} />;
                    default:
                        <></>;
                }
            })()}
        </div>
    );
}

const GraphGrid = (props) => {
    const [lineA_, setLinA] = useState("Default");

    useEffect(() => {
        if (parseFloat(props.cal?.pro_1 / 1000).toFixed(2) > 0) {
            setLinA("moveLtoR");
        } else {
            setLinA("Default");
        }
    }, [props.cal.pro_1]);

    const LineA = (props) => {
        return (
            <>
                <path
                    className="path"
                    d="M 230.857 133.65 L 231.165 38.854 C 231.618 33.403 228.857 31.82 223.463 32.163 L 82.444 32.537"
                    style={{
                        width: "100%",
                        height: "100%",
                        fill: "none",
                        stroke: lineA_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(43, 195, 253)",
                        strokeWidth: props.strokeWidth,
                        strokeLinecap: "round",
                        overflow: "hidden",
                        strokeDasharray: lineA_ === "Default" ? "0" : "20",
                        animation: `${lineA_} ${props.dur} linear infinite`,
                    }}
                />
            </>
        );
    };

    const LineB = (props) => {
        return (
            <>
                <path
                    d="M 258.136 132.82 L 258.703 39.488 C 258.59 34.811 259.013 31.481 266.609 31.554 L 413.676 31.085"
                    style={{
                        width: "100%",
                        height: "100%",
                        fill: "none",
                        stroke: "rgba(43, 195, 253)",
                        strokeWidth: props.strokeWidth,
                        strokeLinecap: "round",
                        overflow: "hidden",
                    }}
                />

            </>
        );
    };

    const LineD = (props) => {
        return (
            <>
                <path
                    d="M 241.751 145.923 L 242.029 243.54"
                    width="100%"
                    height="100%"
                    style={{
                        fill: "none",
                        stroke: "rgba(43, 195, 253)",
                        strokeWidth: props.strokeWidth,
                        strokeLinecap: "round",
                        overflow: "hidden",
                    }}
                />

            </>
        );
    };

    const Solar = (props) => {
        return (
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px", width: "100%", height: "100%", border: "1px solid rgba(233, 233, 233, 0.8)", borderRadius: "3px", padding: "5px", boxSizing: "border-box", backgroundColor: "white", overflow: "hidden" }}>
                <img src={props.src} width={`${props.width}px`} height={`${props.height}px`} alt="" />
                <div>
                    <div style={{ color: props.color }}>
                        {props.val}
                    </div>
                    <span style={{ color: "gray", fontSize: "13px" }}>{props.unit}</span>
                </div>
            </div>
        );
    };

    const SolarImg = (props) => {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", width: "100%", height: "100%", border: "1px solid rgba(233, 233, 233, 0.8)", borderRadius: "3px", padding: "5px", boxSizing: "border-box", backgroundColor: "white", overflow: "hidden" }}>
                <img src={props.src} width={`${props.width}px`} height={`${props.height}px`} alt="" />
            </div>
        );
    };

    return (
        <>
            <svg
                viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" width={"100%"} height={"100%"}
                style={{
                    backgroundColor: "white"
                }}
            >
                <LineA dur="10s" strokeWidth="3" />
                <LineB dur="10s" strokeWidth="3" />
                <LineD dur="10s" strokeWidth="3" />

                <foreignObject x="5" y="5" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
                    <Solar src="/dat_icon/production.png" width="30" color="black" height="30" val={Number(parseFloat(props.cal?.pro_1 / 1000).toFixed(3) || 0).toLocaleString("en-US")} unit="kW" />
                </foreignObject>

                <foreignObject x="395" y="5" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
                    <SolarImg src="/dat_icon/consumption.png" width="30" height="30" />
                </foreignObject>


                <foreignObject x="193" y="233" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
                    <SolarImg src="/dat_icon/grid.png" width="30" height="30" />
                </foreignObject>

                <foreignObject x="193" y="92" width="102.628" height="68.353" style={{ overflow: "hidden", padding: "2px" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", border: "1px solid rgba(233, 233, 233, 0.8)", backgroundColor: "white", borderRadius: "3px" }}>
                        DC/AC
                    </div>
                </foreignObject>
            </svg>
        </>
    );
};

const GraphConsumption = (props) => {
    const [lineA_, setLinA] = useState("Default");
    const [lineB_, setLinB] = useState("Default");
    const [lineD_, setLinD] = useState("Default");

    useEffect(() => {
        if (parseFloat(props.cal?.pro_1 / 1000).toFixed(2) > 0) {
            setLinA("moveLtoR");
        } else {
            setLinA("Default");
        }

        if (parseFloat(props.cal?.con_1).toFixed(2) > 0) {
            setLinB("moveRtoL");
        } else {
            setLinB("Default");
        }

        if (parseFloat(props.cal?.grid_1 / 1000).toFixed(2) > 0) {
            setLinD("moveRtoL");
        } else if (parseFloat(props.cal?.grid_1 / 1000).toFixed(2) < 0) {
            setLinD("moveLtoR");
        } else {
            setLinD("Default");
        }
    }, [props.cal.pro_1, props.cal.con_1, props.cal.grid_1]);

    const LineA = (props) => {
        return (
            <>
                <path
                    className="path"
                    d="M 230.857 133.65 L 231.165 38.854 C 231.618 33.403 228.857 31.82 223.463 32.163 L 82.444 32.537"
                    style={{
                        width: "100%",
                        height: "100%",
                        fill: "none",
                        stroke: lineA_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(43, 195, 253)",
                        strokeWidth: props.strokeWidth,
                        strokeLinecap: "round",
                        overflow: "hidden",
                        strokeDasharray: lineA_ === "Default" ? "0" : "20",
                        animation: `${lineA_} ${props.dur} linear infinite`,
                    }}
                />
            </>
        );
    };

    const LineB = (props) => {
        return (
            <>
                <path
                    d="M 258.136 132.82 L 258.703 39.488 C 258.59 34.811 259.013 31.481 266.609 31.554 L 413.676 31.085"
                    style={{
                        width: "100%",
                        height: "100%",
                        fill: "none",
                        stroke: lineB_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(247, 148, 29)",
                        strokeWidth: props.strokeWidth,
                        strokeLinecap: "round",
                        overflow: "hidden",
                        strokeDasharray: lineB_ === "Default" ? "0" : "20",
                        animation: `${lineB_}  ${props.dur} linear infinite`,

                    }}
                />

            </>
        );
    };

    const LineD = (props) => {
        return (
            <>
                <path
                    d="M 241.751 145.923 L 242.029 243.54"
                    width="100%"
                    height="100%"
                    style={{
                        fill: "none",
                        stroke: lineD_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(0, 163, 0)",
                        strokeWidth: props.strokeWidth,
                        strokeLinecap: "round",
                        overflow: "hidden",
                        strokeDasharray: lineD_ === "Default" ? "0" : "20",
                        animation: `${lineD_} ${props.dur} linear infinite`,
                    }}
                />

            </>
        );
    };

    const Solar = (props) => {
        return (
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px", width: "100%", height: "100%", border: "1px solid rgba(233, 233, 233, 0.8)", borderRadius: "3px", padding: "5px", boxSizing: "border-box", backgroundColor: "white", overflow: "hidden" }}>
                <img src={props.src} width={`${props.width}px`} height={`${props.height}px`} alt="" />
                <div>
                    <div style={{ color: props.color }}>
                        {props.val}
                    </div>
                    <span style={{ color: "gray", fontSize: "13px" }}>{props.unit}</span>
                </div>
            </div>
        );
    };

    return (
        <>
            <svg
                viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" width={"100%"} height={"100%"}
                style={{
                    backgroundColor: "white"
                }}
            >
                <LineA dur="10s" />
                <LineB dur="10s" />
                <LineD dur="10s" />

                <foreignObject x="5" y="5" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
                    <Solar src="/dat_icon/production.png" width="30" height="30" color="black" val={Number(parseFloat(props.cal?.pro_1 / 1000).toFixed(2) || 0).toLocaleString("en-US")} unit="kW" />
                </foreignObject>

                <foreignObject x="395" y="5" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
                    <Solar src="/dat_icon/consumption.png" width="30" height="30" color="black" val={Number(parseFloat(props.cal?.con_1).toFixed(2) || 0).toLocaleString("en-US")} unit="kW" />
                </foreignObject>

                <foreignObject x="193" y="233" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
                    <Solar src="/dat_icon/grid.png" width="30" height="30" color={props.cal?.grid_1 < 0 ? "red" : "black"} val={Number(parseFloat(Math.abs(props.cal?.grid_1) / 1000).toFixed(2) || 0).toLocaleString("en-US")} unit="kW" />
                </foreignObject>

                <foreignObject x="193" y="92" width="102.628" height="68.353" style={{ overflow: "hidden", padding: "2px" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", border: "1px solid rgba(233, 233, 233, 0.8)", backgroundColor: "white", borderRadius: "3px" }}>
                        DC/AC
                    </div>
                </foreignObject>
            </svg>
        </>
    );
};

const GraphFull = (props) => {
    const [lineA_, setLinA] = useState("Default");
    const [lineB_, setLinB] = useState("Default");
    const [lineC_, setLinC] = useState("Default");
    const [lineD_, setLinD] = useState("Default");

    useEffect(() => {
        if (parseFloat(props.cal?.pro_1 / 1000).toFixed(2) > 0) {
            setLinA("moveLtoR");
        } else {
            setLinA("Default");
        }

        if (parseFloat(props.cal?.con_1).toFixed(2) > 0) {
            setLinB("moveRtoL");
        } else {
            setLinB("Default");
        }

        if (parseFloat(props.cal?.bat_1 / 1000).toFixed(2) > 0) {
            setLinC("moveRtoL");
        } else if (parseFloat(props.cal?.bat_1 / 1000).toFixed(2) < 0) {
            setLinC("moveLtoR");
        } else {
            setLinC("Default");
        }

        if (parseFloat(props.cal?.grid_1 / 1000).toFixed(2) > 0) {
            setLinD("moveLtoR");
        } else if (parseFloat(props.cal?.grid_1 / 1000).toFixed(2) < 0) {
            setLinD("moveRtoL");
        } else {
            setLinD("Default");
        }
    }, [props.cal.pro_1, props.cal.con_1, props.cal.grid_1, props.cal.bat_1]);

    const LineA = (props) => {
        return (
            <>
                <path
                    className="path"
                    d="M 230.857 133.65 L 231.165 38.854 C 231.618 33.403 228.857 31.82 223.463 32.163 L 82.444 32.537"
                    style={{
                        width: "100%",
                        height: "100%",
                        fill: "none",
                        stroke: lineA_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(43, 195, 253)",
                        strokeWidth: props.strokeWidth,
                        strokeLinecap: "round",
                        overflow: "hidden",
                        strokeDasharray: lineA_ === "Default" ? "0" : "20",
                        animation: `${lineA_} ${props.dur} linear infinite`,
                    }}
                />
            </>
        );
    };

    const LineB = (props) => {
        return (
            <>
                <path
                    d="M 258.136 132.82 L 258.703 39.488 C 258.59 34.811 259.013 31.481 266.609 31.554 L 413.676 31.085"
                    style={{
                        width: "100%",
                        height: "100%",
                        fill: "none",
                        stroke: lineB_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(247, 148, 29)",
                        strokeWidth: props.strokeWidth,
                        strokeLinecap: "round",
                        overflow: "hidden",
                        strokeDasharray: lineB_ === "Default" ? "0" : "20",
                        animation: `${lineB_}  ${props.dur} linear infinite`,

                    }}
                />

            </>
        );
    };

    const LineC = (props) => {
        return (
            <>
                <path
                    className="path"
                    d="M 226.842 164.494 L 227.12 262.111 C 227.543 270.476 225.304 271.397 217.555 271.123 L 76.035 270.736"
                    style={{
                        width: "100%",
                        height: "100%",
                        fill: "none",
                        stroke: lineC_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(77, 255, 0)",
                        strokeWidth: props.strokeWidth,
                        strokeLinecap: "round",
                        overflow: "hidden",
                        strokeDasharray: lineC_ === "Default" ? "0" : "20",
                        animation: `${lineC_} ${props.dur} linear infinite`,

                    }}
                />

            </>
        );
    };

    const LineD = (props) => {
        return (
            <>
                <path
                    d="M 259.334 162.907 L 259.913 261.215 C 259.941 268.812 260.465 270.05 268.772 270.188 L 417.31 270.833"
                    width="100%"
                    height="100%"
                    style={{
                        fill: "none",
                        stroke: lineD_ === "Default" ? "rgb(182, 182, 182,0.3)" : "rgba(0, 163, 0)",
                        strokeWidth: props.strokeWidth,
                        strokeLinecap: "round",
                        overflow: "hidden",
                        strokeDasharray: lineD_ === "Default" ? "0" : "20",
                        animation: `${lineD_} ${props.dur} linear infinite`,
                    }}
                />

            </>
        );
    };

    const Solar = (props) => {
        return (
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px", width: "100%", height: "100%", border: "1px solid rgba(233, 233, 233, 0.8)", borderRadius: "3px", padding: "5px", boxSizing: "border-box", backgroundColor: "white", overflow: "hidden" }}>
                <img src={props.src} width={`${props.width}px`} height={`${props.height}px`} alt="" />
                <div>
                    <div style={{ color: props.color }}>
                        {props.val}
                    </div>
                    <span style={{ color: "gray", fontSize: "13px" }}>{props.unit}</span>
                </div>
            </div>
        );
    };

    return (
        <>
            <svg
                viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" width={"100%"} height={"100%"}
                style={{
                    backgroundColor: "white"
                }}
            >
                <LineA dur="10s" strokeWidth="3" />
                <LineB dur="10s" strokeWidth="3" />
                <LineC dur="10s" strokeWidth="3" />
                <LineD dur="10s" strokeWidth="3" />

                <foreignObject x="5" y="5" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
                    <Solar src="/dat_icon/production.png" width="30" height="30" color="black" val={Number(parseFloat(props.cal?.pro_1 / 1000).toFixed(2) || 0).toLocaleString("en-US")} unit="kW" />
                </foreignObject>

                <foreignObject x="395" y="5" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
                    <Solar src="/dat_icon/consumption.png" width="30" height="30" color="black" val={Number(parseFloat(props.cal?.con_1).toFixed(2) || 0).toLocaleString("en-US")} unit="kW" />
                </foreignObject>

                <foreignObject x="5" y="235" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
                    <Solar src="/dat_icon/bat.png" width="20" height="30" color={props.cal?.bat_1 < 0 ? "red" : "black"} val={Number(parseFloat(Math.abs(props.cal?.bat_1) / 1000).toFixed(2) || 0).toLocaleString("en-US")} unit="kW" />
                </foreignObject>

                <foreignObject x="395" y="235" width="100" height="60" style={{ overflow: "hidden", padding: "2px" }}>
                    <Solar src="/dat_icon/grid.png" width="30" height="30" color={props.cal?.grid_1 < 0 ? "red" : "black"} val={Number(parseFloat(Math.abs(props.cal?.grid_1) / 1000).toFixed(2) || 0).toLocaleString("en-US")} unit="kW" />
                </foreignObject>

                <foreignObject x="193" y="112" width="102" height="68" style={{ overflow: "hidden", padding: "2px" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", backgroundColor: "white", border: "1px solid rgba(233, 233, 233, 0.8)", borderRadius: "3px" }}>
                        DC/AC
                    </div>
                </foreignObject>
            </svg>
        </>
    );
};