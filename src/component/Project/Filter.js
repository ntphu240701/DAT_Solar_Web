import React, { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import "./Project.scss";

export default function Filter(props) {
    const dataLang = useIntl();
    const min = useRef(0);
    const max = useRef(100);
    const location = useRef("hello");

    const handleReset = (e) => {
        let min = document.getElementById("min");
        let max = document.getElementById("max");
        let location = document.getElementById("location");
        min.value = "";
        max.value = "";
        location.value = "";
    };

    const handleClose = (e) => {
        let min = document.getElementById("min");
        let max = document.getElementById("max");
        let location = document.getElementById("location");
        console.log(min.value, max.value, location.value);
    };

    return (
        <div className="DAT_Filter"
            style={{
                height: props.display ? "567px" : "0px",
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
                                            <input type="number" id="min" ref={min}  />
                                            ~
                                            <input type="number" id="max" ref={max}  />
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
                                            <input type="text" id="location" ref={location}  />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="DAT_Filter_Dropdown_Bot">
                        <button
                            style={{ backgroundColor: "white", color: "black" }}
                            onClick={(e) => {handleReset(e); props.handleReset();}}
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
    );
}

