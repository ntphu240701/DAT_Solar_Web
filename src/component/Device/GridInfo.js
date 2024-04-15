import React, { useState } from 'react';
import "./Device.scss";

import { useIntl } from 'react-intl';

import { IoIosArrowUp } from 'react-icons/io';

export default function GridInfo(props) {
    const dataLang = useIntl();
    const [display, setDisplay] = useState(true);

    const config = []

    const handleRead = (e) => {
        e.preventDefault();
        console.log("Read");
    };

    return (
        <div className="DAT_Info_Databox" id="GridInfo">
            <div className="DAT_Info_Databox_Title">
                <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'GridInfor' })}</div>
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
                    <form className="DAT_Info_Databox_GridInfo" onSubmit={(e) => handleRead(e)}>
                        <div className="DAT_Info_Databox_GridInfo_Content">
                            <div className="DAT_Info_Databox_GridInfo_Content_Item">
                                <div className="DAT_Info_Databox_GridInfo_Content_Item_Tit">
                                    {dataLang.formatMessage({ id: 'InverterStatus' })}:
                                </div>
                                <div className="DAT_Info_Databox_GridInfo_Content_Item_Content">
                                    <select>
                                        <option defaultValue={1} style={{ display: "none" }}>{dataLang.formatMessage({ id: 'PleaseSel' })}</option>
                                        <option>{dataLang.formatMessage({ id: 'StatusInit' })}</option>
                                        <option>{dataLang.formatMessage({ id: 'StatusWait' })}</option>
                                        <option>{dataLang.formatMessage({ id: 'StatusOnGrid' })}</option>
                                        <option>{dataLang.formatMessage({ id: 'failure' })}</option>
                                        <option>{dataLang.formatMessage({ id: 'burn' })}</option>
                                        <option>{dataLang.formatMessage({ id: 'StatusOffGrid' })}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="DAT_Info_Databox_GridInfo_Foot">
                            <button>
                                {dataLang.formatMessage({ id: 'read' })}
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
