import React, { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import "./Project.scss";

export default function Filter(props) {
    const dataLang = useIntl();
    const min = useRef(0);
    const max = useRef(100);
    const location = useRef("hello");

    const warn = useRef();
    const notice = useRef();

    const handleReset = (e) => {
        let min = document.getElementById("min");
        let max = document.getElementById("max");
        let location = document.getElementById("location");
        min.value = "";
        max.value = "";
        location.value = "";
    };

    const handleResetWarn = (e) => {
        e.preventDefault();
        if (document.getElementById("warn").checked) {
            document.getElementById("warn").checked = false;
        }
        if (document.getElementById("notice").checked) {
            document.getElementById("notice").checked = false;
        }
    };

    const handleSelect = (e) => {
        if (document.getElementById("warn").checked) {
            warn.value = "warn";
        } else {
            warn.value = "";
        }
        if (document.getElementById("notice").checked) {
            notice.value = "notice";
        } else {
            notice.value = "";
        }
    };

    const handleClose = (e) => {
        let min = document.getElementById("min");
        let max = document.getElementById("max");
        let location = document.getElementById("location");
        console.log(min.value, max.value, location.value);
    };

    return (
        <>
            {(() => {
                switch (props.type) {
                    case "project":
                        return (
                            <div className="DAT_Filter"
                                style={{
                                    height: props.display ? "calc(100vh - 180px)" : "0px",
                                    transition: "0.5s",
                                }}
                            >
                                {props.display ? (
                                    <form className="DAT_Filter_Dropdown"
                                        onSubmit={() => props.handleClose(min.current.value, max.current.value, location.current.value)}
                                        style={{
                                            height: props.display ? "180px" : "0px",
                                            transition: "0.5s",
                                        }}
                                    >
                                        <div className="DAT_Filter_Dropdown_Item">
                                            <table className="DAT_Filter_Dropdown_Item_Table">
                                                <tbody>
                                                    <tr className="DAT_Filter_Dropdown_Item_Table_Tr">
                                                        <th className="DAT_Filter_Dropdown_Item_Table_Tr_Th">
                                                            {dataLang.formatMessage({ id: "inCapacity" })} (kWp):
                                                        </th>
                                                        <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                                                            <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                <input type="number" id="min" ref={min} required />
                                                                ~
                                                                <input type="number" id="max" ref={max} required />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tbody>
                                                    <tr className="DAT_Filter_Dropdown_Item_Table_Tr">
                                                        <th className="DAT_Filter_Dropdown_Item_Table_Tr_Th">
                                                            {dataLang.formatMessage({ id: "location" })}:
                                                        </th>
                                                        <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                                                            <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                <input type="text" id="location" ref={location} required />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="DAT_Filter_Dropdown_Bot">
                                            <button
                                                style={{ backgroundColor: "white", color: "black" }}
                                                onClick={(e) => { handleReset(e); props.handleReset(); }}
                                            >
                                                Reset
                                            </button>
                                            <button
                                                style={{ backgroundColor: "#048FFF", color: "white" }}
                                            >
                                                {dataLang.formatMessage({ id: 'confirm' })}
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <></>
                                )}
                            </div>
                        )
                    case "device":
                        return (
                            <div className="DAT_Filter"
                                style={{
                                    height: props.display ? "calc(100vh - 180px)" : "0px",
                                    transition: "0.5s",
                                }}
                            >
                                {props.display ? (
                                    <form className="DAT_Filter_Dropdown"
                                        onSubmit={() => props.handleClose(min.current.value, max.current.value, location.current.value)}
                                        style={{
                                            height: props.display ? "140px" : "0px",
                                            transition: "0.5s",
                                        }}
                                    >

                                        <div className="DAT_Filter_Dropdown_Item">
                                            <table className="DAT_Filter_Dropdown_Item_Table">
                                                <tbody>
                                                    <tr className="DAT_Filter_Dropdown_Item_Table_Tr">
                                                        <th className="DAT_Filter_Dropdown_Item_Table_Tr_Th">
                                                            {dataLang.formatMessage({ id: "status" })}:
                                                        </th>
                                                        <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                                                            <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                <input id="online" type="checkbox" />
                                                                <label htmlFor="online">
                                                                    {dataLang.formatMessage({ id: 'online' })}
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                                                            <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                <input id="offline" type="checkbox" />
                                                                <label htmlFor="offline">
                                                                    {dataLang.formatMessage({ id: 'offline' })}
                                                                </label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="DAT_Filter_Dropdown_Bot">
                                            <button
                                                style={{ backgroundColor: "white", color: "black" }}
                                                onClick={(e) => { handleReset(e); props.handleReset(); }}
                                            >
                                                Reset
                                            </button>
                                            <button
                                                style={{ backgroundColor: "#048FFF", color: "white" }}
                                            >
                                                {dataLang.formatMessage({ id: 'confirm' })}
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <></>
                                )}
                            </div>
                        )
                    case "warn":
                        return (
                            <div className="DAT_Filter"
                                style={{
                                    height: props.display ? "calc(100vh - 180px)" : "0px",
                                    transition: "0.5s",
                                }}
                            >
                                {props.display ? (
                                    <form className="DAT_Filter_Dropdown"

                                        style={{
                                            height: props.display ? "180px" : "0px",
                                            transition: "0.5s",
                                        }}
                                    >
                                        <div className="DAT_Filter_Dropdown_Item">
                                            <table className="DAT_Filter_Dropdown_Item_Table">
                                                <tbody>
                                                    <tr className="DAT_Filter_Dropdown_Item_Table_Tr">
                                                        <th className="DAT_Filter_Dropdown_Item_Table_Tr_Th">
                                                            {dataLang.formatMessage({ id: "level" })}:
                                                        </th>
                                                        <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                                                            <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                <input id="warn" type="checkbox"
                                                                    onChange={(e) => handleSelect(e)}
                                                                />
                                                                <label htmlFor="warn">
                                                                    <div className="DAT_TableWarning">
                                                                        {dataLang.formatMessage({ id: "warn" })}
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                                                            <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                <input id="notice" type="checkbox"
                                                                    onChange={(e) => handleSelect(e)}
                                                                />
                                                                <label htmlFor="notice">
                                                                    <div className="DAT_TableNotice">
                                                                        {dataLang.formatMessage({ id: "notice" })}
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>

                                                <tbody>
                                                    <tr className="DAT_Filter_Dropdown_Item_Table_Tr">
                                                        <th className="DAT_Filter_Dropdown_Item_Table_Tr_Th">
                                                            {dataLang.formatMessage({ id: "openWarnTime" })}:
                                                        </th>
                                                        <td className="DAT_Filter_Dropdown_Item_Table_Tr_Td">
                                                            <div className="DAT_Filter_Dropdown_Item_Table_Tr_Td_Checkbox">
                                                                <input type="date" />
                                                                ~
                                                                <input type="date" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="DAT_Filter_Dropdown_Bot">
                                            <button
                                                style={{ backgroundColor: "white", color: "black" }}
                                                onClick={(e) => {
                                                    handleResetWarn(e);
                                                    props.handleReset();
                                                }}
                                            >
                                                Reset
                                            </button>
                                            <button
                                                style={{ backgroundColor: "#048FFF", color: "white" }}
                                                onClick={() => props.handleClose(warn.value, notice.value)}
                                            >
                                                {dataLang.formatMessage({ id: 'confirm' })}
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <></>
                                )}
                            </div>
                        )
                    default:
                        return <></>
                }
            })()}
        </>
    );
}
