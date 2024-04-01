import React from 'react';
import './ErrorSetting.scss';

import { COLOR } from '../../App';
import { useIntl } from 'react-intl';

import { IoClose } from 'react-icons/io5';

export default function EditErr(props) {
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

    const handleSave = () => {
        props.handleClose();
    };

    return (
        <div className="DAT_EditErr">
            <div className="DAT_EditErr_Head">
                <div className="DAT_EditErr_Head_Left">
                    <p>{dataLang.formatMessage({ id: "edit" })}</p>
                </div>
                <div className="DAT_EditErr_Head_Right">
                    <div className="DAT_EditErr_Head_Right_Icon"
                        id="Popup"
                        onClick={() => (props.handleClose())}
                        onMouseEnter={(e) => handlePopup("new")}
                        onMouseLeave={(e) => handlePopup("pre")}
                    >
                        <IoClose size={25} />
                    </div>
                </div>
            </div>

            <div className="DAT_EditErr_Body">
                {props.type === "EDITCAUSE"
                    ? <div className="DAT_EditErr_Body_Head">
                        Cause
                    </div>
                    : <div className="DAT_EditErr_Body_Head">
                        Solution
                    </div>
                }
                <div className="DAT_EditErr_Body_Content">
                    <div className="DAT_EditErr_Body_Content_Item">
                        <span>Vi</span>
                        <textarea />
                    </div>

                    <div className="DAT_EditErr_Body_Content_Item">
                        <span>En</span>
                        <textarea />
                    </div>
                </div>
            </div>

            <div className="DAT_EditErr_Foot">
                <button
                    style={{ backgroundColor: COLOR.value.PrimaryColor, color: "white" }}
                    onClick={() => handleSave()}
                >
                    Xác nhận
                </button>
            </div>
        </div>
    );
}

