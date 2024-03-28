import React, { useEffect, useState } from "react";
import "./Rule.scss";

import { Empty } from "../Project/Project";
import { signal } from "@preact/signals-react";
import DataTable from "react-data-table-component";
import CreateRule from "./CreateRule";
import ConfirmDeleteRule from "./ConfirmDeleteRule";
import EditRule, { editruledata } from "./EditRule";
import { alertDispatch } from "../Alert/Alert";
import { useIntl } from "react-intl";
import { isMobile } from "../Navigation/Navigation";

import { CiSearch } from "react-icons/ci";
import { IoAddOutline, IoTrashOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoMdMore } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { partnerInfor } from "../../App";

export const ruleID = signal();
export const editRuleState = signal(false);
export const confirmDeleteState = signal(false);
export const createruleState = signal(false);
export const datarule = signal([]);

export default function Rule() {
  const dataLang = useIntl();
  const [filter, setFilter] = useState(false);
  const [idDel, setIdDel] = useState();
  const [datafilter, setdatafilter] = useState([]);

  const paginationComponentOptions = {
    rowsPerPageText: dataLang.formatMessage({ id: "row" }),
    rangeSeparatorText: dataLang.formatMessage({ id: "to" }),
    selectAllRowsItem: true,
    selectAllRowsItemText: dataLang.formatMessage({ id: "showAll" }),
  };

  useEffect(() => {
    const getRule = async (partnerid) => {
      const rule = await callApi("post", host.DATA + "/getRule", {
        partnerid: partnerInfor.value.partnerid,
      });
      if (rule.status) {
        datarule.value = rule.data;
        datarule.value = datarule.value.sort((a, b) => a.ruleid_ - b.ruleid_);
        setdatafilter(rule.data);
      }
    };
    getRule();
  }, [partnerInfor.value.partnerid]);

  useEffect(() => {
    setdatafilter(datarule.value)
  }, [datarule.value])

  const columnrule = [
    {
      name: dataLang.formatMessage({ id: "ordinalNumber" }),
      selector: (row, index) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: dataLang.formatMessage({ id: "name" }),
      selector: (row) => row.rulename_,
      sortable: true,
      minWidth: "200px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: "setting" }),
      selector: (row) => (
        <>
          {row.ruleid_ == 1 ? (
            <></>
          ) : (
            <div className="DAT_TableEdit">
              <span
                id={row.ruleid_ + "_MORE"}
                onClick={(e) => handleModify(e, "block")}
              >
                <IoMdMore size={20} />
              </span>
            </div>
          )}

          <div
            className="DAT_ModifyBox"
            id={row.ruleid_ + "_Modify"}
            style={{ display: "none", marginTop: "2px" }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            <div
              className="DAT_ModifyBox_Fix"
              id={row.ruleid_}
              onClick={(e) => handleEdit(e)}
            >
              <FiEdit size={14} />
              &nbsp;
              {dataLang.formatMessage({ id: "edits" })}
            </div>
            <div
              className="DAT_ModifyBox_Remove"
              id={row.ruleid_}
              onClick={(e) => handleDel(e)}
            >
              <IoTrashOutline size={16} />
              &nbsp;
              {dataLang.formatMessage({ id: "remove" })}
            </div>
          </div>
        </>
      ),
      width: "103px",
    },
  ];

  const handleEdit = (e) => {
    const id = parseInt(e.currentTarget.id);
    if (id == 1) {
      alertDispatch(dataLang.formatMessage({ id: "alert_20" }));
    } else {
      editRuleState.value = true;
      editruledata.value = datarule.value.find((data) => data.ruleid_ == id);
    }
  };

  const handleDel = (e) => {
    const id = e.currentTarget.id;
    setIdDel(id);
    confirmDeleteState.value = "delete";
  };

  const handleModify = (e, type) => {
    const id = e.currentTarget.id;
    var arr = id.split("_");
    const mod = document.getElementById(arr[0] + "_Modify");
    mod.style.display = type;
  };

  const handleFilter = (e) => {
    const searchterm = e.currentTarget.value.toLowerCase();
    if (searchterm == "") {
      setdatafilter(datarule.value);
    } else {
      let df = datarule.value.filter((item) => {
        return item.rulename_.toLowerCase().includes(searchterm);
      });
      setdatafilter(df)
    }
  };

  return (
    <>
      <div className="DAT_RuleHeader">
        <div className="DAT_RuleHeader_Title">
          <MdOutlineAdminPanelSettings color="gray" size={25} />
          <span>{dataLang.formatMessage({ id: "rule" })}</span>
        </div>

        {isMobile.value ? (
          <>
            <div className="DAT_Modify">
              <div className="DAT_Modify_Item"
                onClick={() => setFilter(!filter)}
              >
                <CiSearch color="white" size={20} />
              </div>
              <div className="DAT_Modify_Add"
                onClick={() => (createruleState.value = true)}
              >
                <IoAddOutline color="white" size={20} />
              </div>
            </div>

            {filter ? (
              <div className="DAT_Modify_Filter">
                <input
                  type="text"
                  placeholder={dataLang.formatMessage({ id: "enterName" })}
                />
                <div className="DAT_Modify_Filter_Close"
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
            <div className="DAT_RuleHeader_Filter">
              <input
                type="text"
                placeholder={dataLang.formatMessage({ id: "enterName" })}
                onChange={(e) => handleFilter(e)}
              />
              <CiSearch color="gray" size={20} />
            </div>
            <button className="DAT_RuleHeader_New"
              onClick={() => (createruleState.value = true)}
            >
              <span>
                <GrUserAdmin color="white" size={20} />
                &nbsp;
                {dataLang.formatMessage({ id: "newRule" })}
              </span>
            </button>
          </>
        )}
      </div>

      {isMobile.value ? (
        <div className="DAT_RuleMobile">
          <div className="DAT_RuleMobile_Header" style={{ padding: "15px" }}>
            {dataLang.formatMessage({ id: "ruleList" })}
          </div>

          {datarule.value.map((item, i) => {
            return (
              <div key={i} className="DAT_RuleMobile_Content">
                <div className="DAT_RuleMobile_Content_Item">
                  <div className="DAT_RuleMobile_Content_Item_Row">
                    <div className="DAT_RuleMobile_Content_Item_Row_Left">
                      <div className="DAT_RuleMobile_Content_Item_Row_Left_Item">
                        {dataLang.formatMessage({ id: "name" })}: {item.name}
                      </div>
                      <div className="DAT_RuleMobile_Content_Item_Row_Left_Item">
                        ID: {item.ruleid_}
                      </div>
                    </div>

                    <div className="DAT_RuleMobile_Content_Item_Row_Right">
                      <div
                        className="DAT_RuleMobile_Content_Item_Row_Right_Item"
                        id={item.ruleid_}
                        onClick={(e) => handleEdit(e)}
                      >
                        <MdEdit size={20} color="#216990" />
                      </div>
                      <div
                        className="DAT_RuleMobile_Content_Item_Row_Right_Item"
                        onClick={(e) => handleDel(e)}
                      >
                        <MdDelete size={20} color="red" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="DAT_Rule">
          <div className="DAT_Rule_Header">
            {dataLang.formatMessage({ id: "ruleList" })}
          </div>

          <div className="DAT_Rule_Content">
            <DataTable
              className="DAT_Table_Container"
              columns={columnrule}
              data={datafilter}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              fixedHeader={true}
              noDataComponent={<Empty />}
            />
          </div>
        </div>
      )}

      <div className="DAT_RuleCreate"
        style={{
          height: editRuleState.value ? "100vh" : "0px",
          transition: "0.5s",
        }}
      >
        {editRuleState.value ? <EditRule /> : <></>}
      </div>

      <div className="DAT_RuleCreate"
        style={{
          height: createruleState.value ? "100vh" : "0px",
          transition: "0.5s",
        }}
      >
        {createruleState.value ? <CreateRule /> : <></>}
      </div>

      {confirmDeleteState.value ? (
        <div className="DAT_ComfirmDeletePopup">
          <ConfirmDeleteRule id={idDel} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
