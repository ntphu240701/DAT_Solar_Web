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
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { partnerInfor } from "../../App";

import { CiSearch } from "react-icons/ci";
import { IoAddOutline, IoTrashOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoMdMore } from "react-icons/io";
import { MdDelete, MdEdit, MdOutlineAdminPanelSettings } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { lowercasedata } from "../ErrorSetting/ErrorSetting";
import PopupState, { bindMenu, bindToggle } from "material-ui-popup-state";
import { Menu, MenuItem } from "@mui/material";

export const datarule = signal([]);

export default function Rule() {
  const dataLang = useIntl();
  const [filter, setFilter] = useState(false);
  const [idDel, setIdDel] = useState();
  const [datafilter, setdatafilter] = useState([]);
  const [createruleState, setCreateruleState] = useState(false);
  const [editRuleState, setEditRuleState] = useState(false);
  const [confirmDeleteState, setConfirmDeleteState] = useState(false);

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
    setdatafilter(datarule.value);
    console.log(datarule.value);
  }, [datarule.value]);

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
        justifyContent: "left !important",
      },
    },
    {
      name: dataLang.formatMessage({ id: "setting" }),
      selector: (row) => (
        <>
          {row.ruleid_ == 1 ? (
            <></>
          ) : (
            // <div className="DAT_TableEdit">
            //   <span
            //     id={row.ruleid_ + "_MORE"}
            //     onClick={(e) => handleModify(e, "block")}
            //   >
            //     <IoMdMore size={20} />
            //   </span>
            // </div>
            <PopupState variant="popper" popupId="demo-popup-popper">
              {(popupState) => (<div className="DAT_TableEdit">
                <IoMdMore size={20}   {...bindToggle(popupState)} />
                <Menu {...bindMenu(popupState)}>
                
                    <MenuItem   id={row.ruleid_} onClick={(e) => { handleEdit(e); popupState.close() }}>
                      <FiEdit size={14} />&nbsp;
                      {dataLang.formatMessage({ id: "change" })}
                    </MenuItem>
                  
                
                    <MenuItem   id={row.ruleid_} onClick={(e) => { handleDel(e); popupState.close() }}>
                      <IoTrashOutline size={16} />
                      &nbsp;
                      {dataLang.formatMessage({ id: "delete" })}
                    </MenuItem>
                  

                
                </Menu>
              </div>)}
            </PopupState>
          )}

          {/* <div
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
          </div> */}
        </>
      ),
      width: "103px",
    },
  ];

  const handleCloseCreate = () => {
    setCreateruleState(false);
  };

  const handleEdit = (e) => {
    const id = parseInt(e.currentTarget.id);
    if (id == 1) {
      alertDispatch(dataLang.formatMessage({ id: "alert_20" }));
    } else {
      setEditRuleState(true);
      editruledata.value = datarule.value.find((data) => data.ruleid_ == id);
    }
  };

  const handleCloseEdit = (state) => {
    setEditRuleState(false);
  };

  const handleDel = (e) => {
    const id = e.currentTarget.id;
    setIdDel(id);
    setConfirmDeleteState(true);
  };

  const handleCloseDelete = () => {
    setConfirmDeleteState(false);
  };

  const handleModify = (e, type) => {
    const id = e.currentTarget.id;
    var arr = id.split("_");
    const mod = document.getElementById(arr[0] + "_Modify");
    mod.style.display = type;
  };

  const handleFilter = (e) => {
    const searchterm = lowercasedata(e.currentTarget.value);
    if (searchterm == "") {
      setdatafilter(datarule.value);
    } else {
      let df = datarule.value.filter((item) => {
        return lowercasedata(item.rulename_).includes(searchterm);
      });
      setdatafilter(df);
    }
  };

  return (
    <>
      {isMobile.value ? (
        <div className="DAT_RuleHeaderMobile">
          <div className="DAT_RuleHeaderMobile_Top">
            <div className="DAT_RuleHeaderMobile_Top_Filter">
              <input
                type="text"
                placeholder={dataLang.formatMessage({ id: "enterName" })}
                onChange={(e) => handleFilter(e)}
              />
              <CiSearch color="gray" size={20} />
            </div>
            <button
              className="DAT_RuleHeaderMobile_Top_New"
              onClick={() => setCreateruleState(true)}
            >
              <IoAddOutline color="white" size={20} />
            </button>
          </div>

          <div className="DAT_RuleHeaderMobile_Title">
            <MdOutlineAdminPanelSettings color="gray" size={25} />
            <span>{dataLang.formatMessage({ id: "rule" })}</span>
          </div>
        </div>
      ) : (
        <div className="DAT_RuleHeader">
          <div className="DAT_RuleHeader_Title">
            <MdOutlineAdminPanelSettings color="gray" size={25} />
            <span>{dataLang.formatMessage({ id: "rule" })}</span>
          </div>
          <div className="DAT_RuleHeader_Filter">
            <input
              type="text"
              placeholder={dataLang.formatMessage({ id: "enterName" })}
              onChange={(e) => handleFilter(e)}
            />
            <CiSearch color="gray" size={20} />
          </div>
          <button
            className="DAT_RuleHeader_New"
            onClick={() => setCreateruleState(true)}
          >
            <span>
              <GrUserAdmin color="white" size={20} />
              &nbsp;
              {dataLang.formatMessage({ id: "newRule" })}
            </span>
          </button>
        </div>
      )}

      {isMobile.value ? (
        <div className="DAT_RuleMobile">
          {datafilter.map((item, i) => {
            return (
              <div key={i} className="DAT_RuleMobile_Content">
                <div className="DAT_RuleMobile_Content_Top">
                  <div className="DAT_RuleMobile_Content_Top_Ava">
                    {i + 1}
                  </div>
                  <div className="DAT_RuleMobile_Content_Top_Info">
                    <div className="DAT_RuleMobile_Content_Top_Info_Name">
                      {item.rulename_}
                    </div>
                  </div>
                </div>

                <div className="DAT_RuleMobile_Content_Bottom">
                  <div className="DAT_RuleMobile_Content_Bottom_State">
                    {dataLang.formatMessage({ id: "createdate" })}: ...
                  </div>
                  <div className="DAT_RuleMobile_Content_Bottom_Right">
                    <div className="DAT_RuleMobile_Content_Bottom_Right_Item"
                      id={item.ruleid_}
                      onClick={(e) => handleEdit(e)}
                    >
                      <FiEdit size={14} />
                    </div>
                    <div className="DAT_RuleMobile_Content_Bottom_Right_Item"
                      onClick={(e) => handleDel(e)}
                    >
                      <IoTrashOutline size={16} />
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
              // fixedHeader={true}
              noDataComponent={<Empty />}
            />
          </div>
        </div>
      )}

      <div
        className="DAT_RuleBG"
        style={{
          height: createruleState ? "100vh" : "0px",
          transition: "0.5s",
        }}
      >
        {createruleState ? (
          <CreateRule handleClose={handleCloseCreate} />
        ) : (
          <></>
        )}
      </div>

      <div
        className="DAT_RuleBG"
        style={{
          height: editRuleState ? "100vh" : "0px",
          transition: "0.5s",
        }}
      >
        {editRuleState ? <EditRule handleClose={handleCloseEdit} /> : <></>}
      </div>

      {confirmDeleteState ? (
        <div className="DAT_PopupBG">
          <ConfirmDeleteRule id={idDel} handleClose={handleCloseDelete} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
