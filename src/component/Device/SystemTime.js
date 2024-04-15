import React, { useState } from 'react';
import "./Device.scss";

import { useIntl } from 'react-intl';
import DatePicker from "react-datepicker";
import moment from 'moment-timezone';

import { IoIosArrowUp } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';

export default function SystemTime(props) {
    const dataLang = useIntl();
    const [display, setDisplay] = useState(true);

    return (
        <div className="DAT_Info_Databox" id="SystemTime">
            <div className="DAT_Info_Databox_Title">
                <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: "SystemTime" })}</div>
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
                    <div className="DAT_Info_Databox_ExportPowerSettings">
                        <div className="DAT_Info_Databox_ExportPowerSettings_Content">
                            <div className="DAT_Info_Databox_ExportPowerSettings_Content_Item">
                                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: "SystemTime" })}:
                                </div>
                                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Item_Content">
                                    <DatePicker
                                        customInput={
                                            <button className="DAT_CustomPicker" >
                                                <span>{moment(new Date()).format("MM/DD/YYYY hh:mm:ss")}</span>
                                                &nbsp;
                                                <IoCalendarOutline color="gray" />
                                            </button>
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="DAT_Info_Databox_ExportPowerSettings_Foot">
                            <button>
                                {dataLang.formatMessage({ id: 'read' })}
                            </button>
                            <button>
                                {dataLang.formatMessage({ id: 'setup' })}
                            </button>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

