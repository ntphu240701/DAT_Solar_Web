import React from 'react';
import './ErrorSetting.scss';

import { COLOR } from '../../App';
import { useIntl } from 'react-intl';

import { IoClose } from 'react-icons/io5';

export default function CreateErrSetting(props) {
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
        <div className="DAT_CreateErrSetting">
            <div className="DAT_CreateErrSetting_Head">
                <div className="DAT_CreateErrSetting_Head_Left">
                    <p>{dataLang.formatMessage({ id: "createNew" })}</p>
                </div>
                <div className="DAT_CreateErrSetting_Head_Right">
                    <div className="DAT_CreateErrSetting_Head_Right_Icon"
                        id="Popup"
                        onClick={() => (props.handleClose())}
                        onMouseEnter={(e) => handlePopup("new")}
                        onMouseLeave={(e) => handlePopup("pre")}
                    >
                        <IoClose size={25} />
                    </div>
                </div>
            </div>

            <div className="DAT_CreateErrSetting_Body">
                <span>Mã lỗi:</span>
                <select>
                    <option value="A">A</option>
                    <option value="E">E</option>
                </select>
                <input
                    type='text'
                />
                <input
                    type='text'
                />
            </div>

            <div className="DAT_CreateErrSetting_Foot">
                <div className="DAT_CreateErrSetting_Foot_Left">
                    <span style={{ color: "red" }}>*</span>
                    <div className="DAT_CreateErrSetting_Foot_Left_Item">
                        <span>A: Chú ý</span>
                        <span>E: Cảnh báo</span>
                    </div>
                </div>

                <div className="DAT_CreateErrSetting_Foot_Right">
                    <button
                        style={{ backgroundColor: COLOR.value.PrimaryColor, color: "white" }}
                        onClick={() => handleSave()}
                    >
                        {dataLang.formatMessage({ id: "confirm" })}
                    </button>
                </div>
            </div>
        </div>
    );
}

