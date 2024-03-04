import React from "react";
import "./Analytics.scss";

import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { anaState } from "./Analytics";
import { useIntl } from "react-intl";

function AnaCreate(props) {
  const dataLang = useIntl();
  return (
    <div className="DAT_AnaCreate">
      <div className="DAT_AnaCreate_Header">
        <div className="DAT_AnaCreate_Header_Left">{dataLang.formatMessage({ id: 'createAnal' })}</div>

        <div className="DAT_AnaCreate_Header_Right">
          <div className="DAT_AnaCreate_Header_Right_Save">
            <FaSave size={20} color="white" />
            <span>{dataLang.formatMessage({ id: 'save' })}</span>
          </div>
          <div className="DAT_AnaCreate_Header_Right_Close">
            <RxCross2
              size={20}
              color="white"
              onClick={() => (anaState.value = "default")}
            />
          </div>
        </div>
      </div>

      {/* <div className="DAT_AnaCreate_Body"></div> */}
    </div>
  );
}

export default AnaCreate;
