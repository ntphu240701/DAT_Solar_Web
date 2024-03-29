import React, { useState } from "react";
import "./GroupRole.scss";

import { addState, groupID, groupUser } from "./GroupRole";
import { signal } from "@preact/signals-react";
import { useIntl } from "react-intl";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { alertDispatch } from "../Alert/Alert";

import { IoClose } from "react-icons/io5";

const infouser = signal([]);

export default function AddUsers() {
  const dataLang = useIntl();
  const [usr_, setusr_] = useState("");
  const [addUserState, setAddUserState] = useState("none");

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

  const handleAddUser = async () => {
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (validateEmail(usr_)) {
      let d = await callApi("post", host.DATA + "/addUsrPartner", {
        mail: usr_,
        partnerid: String(groupID.value),
      });
      if (d.status === true) {
        alertDispatch(dataLang.formatMessage({ id: "alert_6" }));
        groupUser.value = [...groupUser.value, d.data];
        addState.value = false;
      } else {
        if (d.number === 0) {
          alertDispatch(dataLang.formatMessage({ id: "alert_38" }));
        } else if (d.number === 1) {
          alertDispatch(dataLang.formatMessage({ id: "alert_39" }));
        } else {
          alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
        }
      }
    } else {
      alertDispatch(dataLang.formatMessage({ id: "alert_3" }));
    }
  };

  const AddButton = () => {
    return (
      <div className="DAT_AddUserPopup_Box_Foot">
        <button
          onClick={() => handleAddUser()}
        >
          {dataLang.formatMessage({ id: "confirm" })}
        </button>
      </div>
    );
  };

  return (
    <div className="DAT_AddUserPopup_Box">
      <div className="DAT_AddUserPopup_Box_Head">
        <div className="DAT_AddUserPopup_Box_Head_Left">
          <p>{dataLang.formatMessage({ id: "createUser" })}</p>
        </div>

        <div className="DAT_AddUserPopup_Box_Head_Right">
          <div
            className="DAT_AddUserPopup_Box_Head_Right_Icon"
            onClick={() => (addState.value = false)}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>

      <div className="DAT_AddUserPopup_Box_Body">
        <div className="DAT_AddUserPopup_Box_Body_Input">
          {(() => {
            switch (addUserState) {
              case "AddSuccess":
                return <p>{dataLang.formatMessage({ id: "alert_37" })} !</p>;
              case "UserNotFound":
                return <p>{dataLang.formatMessage({ id: "alert_38" })}</p>;
              case "UserAlreadyInGroup":
                return <p>{dataLang.formatMessage({ id: "alert_39" })}</p>;
              default:
                return (
                  <>
                    <span>{dataLang.formatMessage({ id: "email" })}:</span>
                    <input
                      type="email"
                      required
                      onChange={(e) => setusr_(e.target.value)}
                    />
                  </>
                );
            }
          })()}
        </div>
      </div>

      {(() => {
        switch (addUserState) {
          case "AddSuccess":
            return (
              <div className="DAT_AddUserPopup_Box_Foot">
                <button
                  onClick={() => (
                    (addState.value = false), setAddUserState("none")
                  )}
                  style={{
                    border: "1px solid #505050",
                    backgroundColor: "white",
                    color: "#505050",
                  }}
                >
                  Thoát
                </button>
              </div>
            );
          case "UserNotFound":
            return (
              <div className="DAT_AddUserPopup_Box_Foot">
                <button
                  onClick={() => (
                    (addState.value = false), setAddUserState("none")
                  )}
                  style={{
                    border: "1px solid #505050",
                    backgroundColor: "white",
                    color: "#505050",
                  }}
                >
                  Thoát
                </button>
              </div>
            );
          case "UserAlreadyInGroup":
            return (
              <div className="DAT_AddUserPopup_Box_Foot">
                <button
                  onClick={() => (
                    (addState.value = false), setAddUserState("none")
                  )}
                  style={{
                    border: "1px solid #505050",
                    backgroundColor: "white",
                    color: "#505050",
                  }}
                >
                  Thoát
                </button>
              </div>
            );
          default:
            return <AddButton />;
        }
      })()}
    </div>
  );
}
