import React, { useEffect, useState } from "react";
import "./Role.scss";

import DataTable from "react-data-table-component";
import { Empty } from "../Project/Project";
import { signal } from "@preact/signals-react";
import CreateRole from "./CreateRole";
import DeleteRole from "./DeleteRole";
import EditRole from "./EditRole";
import { host } from "../Lang/Contant";
import { callApi } from "../Api/Api";
import { partnerInfor } from "../../App";
import { useIntl } from "react-intl";
import { isMobile } from "../Navigation/Navigation";

import { AiOutlineUserAdd } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoAddOutline, IoTrashOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoMdMore } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { LuUserSquare } from "react-icons/lu";
import { datarule } from "../Rule/Rule";
import { FiEdit } from "react-icons/fi";
import { lowerCase } from "lodash";

export const roleData = signal({});
export const roleState = signal("default");
export const popupState = signal("default");
export const Usr_ = signal([]);

export default function Role(props) {
  const dataLang = useIntl();
  const [temp, setTemp] = useState();
  const [filter, setFilter] = useState(false);
  const [datafilter, setdatafilter] = useState([]);

  const paginationComponentOptions = {
    rowsPerPageText: dataLang.formatMessage({ id: "row" }),
    rangeSeparatorText: dataLang.formatMessage({ id: "to" }),
    selectAllRowsItem: true,
    selectAllRowsItemText: dataLang.formatMessage({ id: "showAll" }),
  };

  const columnrole = [
    {
      name: dataLang.formatMessage({ id: "ordinalNumber" }),
      selector: (row, i) => i + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: dataLang.formatMessage({ id: "name" }),
      selector: (row) => row.name_,
      sortable: true,
      minWidth: "200px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: "phone" }),
      selector: (row) => row.phone_,
      minWidth: "250px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "E-mail",
      selector: (row) => row.mail_,
      width: "250px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: "rule" }),
      selector: (row) => row.rulename_,
      sortable: true,
      width: "160px",
      style: {
        justifyContent: "left",
      },
    },

    {
      name: dataLang.formatMessage({ id: "account" }),
      selector: (row) => {
        switch (row.type_) {
          case "master":
            return dataLang.formatMessage({ id: "master" });
          case "admin":
            return dataLang.formatMessage({ id: "admin" });
          default:
            return dataLang.formatMessage({ id: "user" });
        }
      },
      sortable: true,
      width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: "setting" }),
      selector: (row) => (
        <>
          {row.type_ === "master" ? (
            <></>
          ) : (
            <div className="DAT_TableEdit">
              <span
                id={row.id_ + "_MORE"}
                // onMouseEnter={(e) => handleModify(e, "block")}
                onClick={(e) => handleModify(e, "block")}
              >
                <IoMdMore size={20} />
              </span>
            </div>
          )}
          <div
            className="DAT_ModifyBox"
            id={row.id_ + "_Modify"}
            style={{ display: "none", marginRight: "4px", marginTop: "2px" }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            <div
              className="DAT_ModifyBox_Fix"
              id={row.id_}
              onClick={(e) => handleEdit(e)}
            >
              <FiEdit size={14} />
              &nbsp;
              {dataLang.formatMessage({ id: "change" })}
            </div>
            <div
              className="DAT_ModifyBox_Remove"
              id={row.usr_}
              onClick={(e) => handleDelete_(e)}
            >
              <IoTrashOutline size={16} />
              &nbsp;
              {dataLang.formatMessage({ id: "remove" })}
            </div>
          </div>
        </>
      ),
      width: "110px",
    },
  ];

  const handleDelete_ = (e) => {
    popupState.value = "delete";
    setTemp(e.currentTarget.id);
    console.log(e.currentTarget.id);
  };

  const handleEdit = (e) => {
    popupState.value = "edit";
    const id = e.currentTarget.id;
    roleData.value = Usr_.value.find((item) => item.id_ == id);
    console.log(roleData.value);
  };

  const handleModify = (e, type) => {
    const id = e.currentTarget.id;
    var arr = id.split("_");

    const mod = document.getElementById(arr[0] + "_Modify");
    mod.style.display = type;
  };

  const handleFilter = (e) => {
    const searchterm = e.currentTarget.value.toLowerCase();
    console.log(e.currentTarget.value)
    if (searchterm == "") {
      setdatafilter(Usr_.value);
    } else {
      let df = Usr_.value.filter((item) => {
        const roleName = item.name_.toLowerCase();
        const rolePhone = item.phone_.toLowerCase();
        const roleMail = item.mail_.toLowerCase();
        return roleName.includes(searchterm) || rolePhone.includes(searchterm) || roleMail.includes(searchterm)
      });
      setdatafilter(df);
    }
  };

  useEffect(() => {
    const fetchUsr = async () => {
      const d = await callApi("post", host.DATA + "/getallUser", {
        partnerid: partnerInfor.value.partnerid,
      });
      // console.log(d);
      if (d.status === true) {
        Usr_.value = d.data;
        setdatafilter(d.data)
        console.log(Usr_.value)
        Usr_.value = Usr_.value.sort((a, b) => a.ruleid_ - b.ruleid_);
      }
    };
    fetchUsr();
  }, []);

  useEffect(() => {
    const getRule = async (partnerid) => {
      const rule = await callApi("post", host.DATA + "/getRule", {
        partnerid: partnerInfor.value.partnerid,
      });
      if (rule.status) {
        // console.log(rule.data);
        datarule.value = rule.data;
        datarule.value = datarule.value.sort((a, b) => a.ruleid_ - b.ruleid_);
      }
    };
    getRule();
  }, [partnerInfor.value.partnerid]);

  return (
    <>
      <div className="DAT_RoleHeader">
        <div className="DAT_RoleHeader_Title">
          <LuUserSquare color="gray" size={25} />{" "}
          <span>{dataLang.formatMessage({ id: "role" })}</span>
        </div>

        {isMobile.value ? (
          <>
            <div className="DAT_Modify">
              <div
                className="DAT_Modify_Item"
                onClick={() => setFilter(!filter)}
              >
                <CiSearch color="white" size={20} />
              </div>
              <div
                className="DAT_Modify_Add"
                onClick={() => (roleState.value = "create")}
              >
                <IoAddOutline color="white" size={20} />
              </div>
            </div>

            {filter ? (
              <div className="DAT_Modify_Filter">
                <input
                  type="text"
                  placeholder={dataLang.formatMessage({ id: "enterName" })}
                  onChange={(e) => handleFilter(e)}
                />
                <div
                  className="DAT_Modify_Filter_Close"
                  onClick={() => setFilter(!filter)}
                >
                  <RxCross2 size={20} color="white" />
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <div className="DAT_RoleHeader_Filter">
              <input
                type="text"
                autoComplete="off"
                placeholder={dataLang.formatMessage({ id: "enterName" })}
                onChange={(e) => handleFilter(e)}
              />
              <CiSearch color="gray" size={20} />
            </div>
            <button
              className="DAT_RoleHeader_New"
              onClick={() => (roleState.value = "create")}
            >
              <span>
                <AiOutlineUserAdd color="white" size={20} />
                &nbsp;
                {dataLang.formatMessage({ id: "createNew" })}
              </span>
            </button>
          </>
        )}
      </div>

      {isMobile.value ? (
        <>
          <div className="DAT_RoleMobile">
            <div className="DAT_RoleMobile_Header" style={{ padding: "15px" }}>
              {dataLang.formatMessage({ id: "roleList" })}
            </div>

            {Usr_.value.map((item, i) => {
              return (
                <div key={i} className="DAT_RoleMobile_Content">
                  <div className="DAT_RoleMobile_Content_Item">
                    <div className="DAT_RoleMobile_Content_Item_Row">
                      <div className="DAT_RoleMobile_Content_Item_Row_Name">
                        {dataLang.formatMessage({ id: "name" })}: {item.name_}
                      </div>

                      <div className="DAT_RoleMobile_Content_Item_Row_Right">
                        <div
                          className="DAT_RoleMobile_Content_Item_Row_Right_Item"
                          id={item.id_}
                          onClick={(e) => handleEdit(e)}
                        >
                          <MdEdit size={20} color="#216990" />
                        </div>
                        <div
                          className="DAT_RoleMobile_Content_Item_Row_Right_Item"
                          onClick={() => (popupState.value = "delete")}
                        >
                          <MdDelete size={20} color="red" />
                        </div>
                      </div>
                    </div>

                    <div className="DAT_RoleMobile_Content_Item_Row">
                      <div className="DAT_RoleMobile_Content_Item_Row_Rule">
                        {dataLang.formatMessage({ id: "rule" })}:{" "}
                        {item.rulename_}
                      </div>

                      <div className="DAT_RoleMobile_Content_Item_Row_Acc">
                        {dataLang.formatMessage({ id: "account" })}:{" "}
                        {item.type_}
                      </div>
                    </div>

                    <div className="DAT_RoleMobile_Content_Item_Row">
                      <div className="DAT_RoleMobile_Content_Item_Row_Phone">
                        {dataLang.formatMessage({ id: "phone" })}: {item.phone_}
                      </div>

                      <div className="DAT_RoleMobile_Content_Item_Row_Email">
                        Mail: {item.mail_}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="DAT_Role">
            <div
              className="DAT_Role_Header"
              style={{
                padding: "15px",
                backgroundColor: "rgba(233, 233, 233, 0.5)",
              }}
            >
              {dataLang.formatMessage({ id: "roleList" })}
            </div>

            <div className="DAT_Role_Content">
              <DataTable
                className="DAT_Table_Container"
                columns={columnrole}
                data={datafilter}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                fixedHeader={true}
                noDataComponent={<Empty />}
              />
            </div>
          </div>
        </>
      )}

      <div
        className="DAT_RoleInfor"
        style={{
          height: roleState.value === "default" ? "0px" : "100vh",
          transition: "0.5s",
        }}
      >
        {(() => {
          switch (roleState.value) {
            case "create":
              return <CreateRole />;
            default:
              return <></>;
          }
        })()}
      </div>

      <div
        className="DAT_RolePopup"
        style={{
          height: popupState.value === "default" ? "0px" : "100vh",
        }}
      >
        {(() => {
          switch (popupState.value) {
            case "delete":
              return <DeleteRole user={temp} />;
            case "edit":
              return <EditRole />;
            default:
              return <></>;
          }
        })()}
      </div>
    </>
  );
}
