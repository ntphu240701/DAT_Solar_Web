import React, { useState } from 'react';
import "./Project.scss";

import { useIntl } from 'react-intl';
import { COLOR } from '../../App';
import { projectData } from './Project';
import Production from './Production';
import Consumption from './Consumption';
import Grid from './Grid';
import Battery from './Battery';
import { cal } from './ProjectData';

export default function Data(props) {
    const dataLang = useIntl();
    const [nav, setNav] = useState("production");

    const color = {
        cur: COLOR.value.PrimaryColor,
        pre: COLOR.value.grayText,
    };

    const handleNav = (e) => {
        var id = e.currentTarget.id;
        setNav(id);
    };

    return (
        <div className="DAT_ProjectData_Dashboard_Data_Left">
            <div className="DAT_ProjectData_Dashboard_Data_Left_Tit">
                <div
                    className="DAT_ProjectData_Dashboard_Data_Left_Tit_Item"
                    id="production"
                    style={{
                        color: nav === "production" ? color.cur : color.pre,
                    }}
                    onClick={(e) => handleNav(e)}
                >
                    {dataLang.formatMessage({ id: "productionData" })}
                </div>
                <div
                    className="DAT_ProjectData_Dashboard_Data_Left_Tit_Item"
                    id="consumption"
                    style={{
                        color:
                            nav === "consumption" ? color.cur : color.pre,
                        display:
                            projectData.value.plantmode === "grid"
                                ? "none"
                                : "block",
                    }}
                    onClick={(e) => handleNav(e)}
                >
                    {dataLang.formatMessage({ id: "consumptionData" })}
                </div>
                <div
                    className="DAT_ProjectData_Dashboard_Data_Left_Tit_Item"
                    id="grid"
                    style={{
                        color: nav === "grid" ? color.cur : color.pre,
                        display:
                            projectData.value.plantmode === "grid"
                                ? "none"
                                : "block",
                    }}
                    onClick={(e) => handleNav(e)}
                >
                    {dataLang.formatMessage({ id: "grid" })}
                </div>
                <div
                    className="DAT_ProjectData_Dashboard_Data_Left_Tit_Item"
                    id="battery"
                    style={{
                        color: nav === "battery" ? color.cur : color.pre,
                        display:
                            projectData.value.plantmode === "grid" ||
                                projectData.value.plantmode === "consumption"
                                ? "none"
                                : "block",
                    }}
                    onClick={(e) => handleNav(e)}
                >
                    {dataLang.formatMessage({ id: "batteryData" })}
                </div>
            </div>

            {(() => {
                switch (nav) {
                    case "production":
                        return <Production cal={cal.value} />;
                    case "consumption":
                        return <Consumption cal={cal.value} />;
                    case "grid":
                        return <Grid cal={cal.value} />;
                    case "battery":
                        return <Battery cal={cal.value} />;
                    default:
                        <></>;
                }
            })()}
        </div>
    );
}

