import React from "react";
import "./Project.scss";

import { alertDispatch } from "../Alert/Alert";
import { useIntl } from "react-intl";
import { callApi } from "../Api/Api";

import { IoClose } from "react-icons/io5";
import { shareState } from "./Project";
import { COLOR } from "../../App";

export default function ShareBox(props) {
    const dataLang = useIntl();

    const popup_state = {
        pre: { transform: "rotate(0deg)", transition: "0.5s", color: "white" },
        new: { transform: "rotate(90deg)", transition: "0.5s", color: "white" },
    };

    const handlePopup = (state) => {
        const popup = document.getElementById("Popup");
        popup.style.transform = popup_state[state].transform;
        popup.style.transition = popup_state[state].transition;
        popup.style.color = popup_state[state].color;
    };

    return (
        <div className="DAT_SharePopup_Box">
            <div className="DAT_SharePopup_Box_Head">
                <div className="DAT_SharePopup_Box_Head_Left">
                    <p>{dataLang.formatMessage({ id: "share" })}</p>
                </div>

                <div className="DAT_SharePopup_Box_Head_Right">
                    <div
                        className="DAT_SharePopup_Box_Head_Right_Icon"
                        onClick={() => (shareState.value = false)}
                        id="Popup"
                        onMouseEnter={(e) => handlePopup("new")}
                        onMouseLeave={(e) => handlePopup("pre")}
                    >
                        <IoClose size={25}></IoClose>
                    </div>
                </div>
            </div>

            <div className="DAT_SharePopup_Box_Body">
                <p>{dataLang.formatMessage({ id: "email" })}:</p>
                <input type="email"
                    placeholder={dataLang.formatMessage({ id: "enterEmail" })}>
                </input>
            </div>
            <div className="DAT_SharePopup_Box_Foot">
                <button
                    style={{ backgroundColor: COLOR.value.PrimaryColor, color: "white" }}
                >
                    {dataLang.formatMessage({ id: "confirm" })}
                </button>
            </div>
        </div>
    );
}
