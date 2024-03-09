import React, { useState } from "react";
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
import { IoAddOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoMdMore } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const key = {
  edit: 'edits',
  delete: 'delete',
  create: 'createNew',
  status: 'status'
}

export const ruleID = signal();
export const editRuleState = signal(false);
export const confirmDeleteState = signal(false);
export const createruleState = signal(false);
export const datarule = signal([
  {
    ruleid: 1,
    name: "Master",
    setting: {
      alert: {
        lang: 'notification',
        option: {
          1: { lang: "edit", status: true },
          2: { lang: "remove", status: true },
        },
      },
      device: {
        lang: "device",
        option: {
          1: { lang: "Chỉnh sửa", status: true },
          2: { lang: "Xóa", status: true },
          3: { lang: "Tạo mới", status: true },
        },
      },
      partner: {
        lang: "partner",
        option: {
          1: { lang: "Chỉnh sửa", status: true },
        },
      },
      plant: {
        lang: "plant",
        option: {
          1: { lang: "Chỉnh sửa", status: true },
          2: { lang: "Xóa", status: true },
          3: { lang: "Tạo mới", status: true },
        },
      },
      report: {
        lang: "report",
        option: {
          1: { lang: "Chỉnh sửa", status: true },
          2: { lang: "Xóa", status: true },
          3: { lang: "Tạo mới", status: true },
        },
      },
      rule: {
        lang: "rule",
        option: {
          1: { lang: "Chỉnh sửa", status: true },
          2: { lang: "Xóa", status: true },
          3: { lang: "Thêm", status: true },
          4: { lang: "Trạng thái", status: true },
        },
      },
    },
  },
  {
    ruleid: 2,
    name: "Admin",
    setting: {
      alert: {
        lang: "notification",
        option: {
          1: { lang: key.edit, status: true },
          2: { lang: key.delete, status: true },
        },
      },
      device: {
        lang: "device",
        option: {
          1: { lang: key.edit, status: true },
          2: { lang: key.delete, status: true },
          3: { lang: key.create, status: true },
        },
      },
      partner: {
        lang: "partner",
        option: {
          1: { lang: key.edit, status: true },
        },
      },
      plant: {
        lang: "project",
        option: {
          1: { lang: key.edit, status: true },
          2: { lang: key.delete, status: true },
          3: { lang: key.create, status: true },
        },
      },
      report: {
        lang: "report",
        option: {
          1: { lang: key.edit, status: true },
          2: { lang: key.delete, status: true },
          3: { lang: key.create, status: true },
        },
      },
      rule: {
        lang: "rule",
        option: {
          1: { lang: key.edit, status: true },
          2: { lang: key.delete, status: true },
          3: { lang: key.create, status: true },
          4: { lang: key.status, status: true },
        },
      },
    },
  },
  {
    ruleid: 3,
    name: "User",
    setting: {
      alert: {
        lang: "Thông báo",
        option: {
          1: { lang: "Chỉnh sửa", status: false },
          2: { lang: "Xóa", status: false },
        },
      },
      device: {
        lang: "Thiết bị",
        option: {
          1: { lang: "Chỉnh sửa", status: false },
          2: { lang: "Xóa", status: false },
          3: { lang: "Tạo mới", status: false },
        },
      },
      partner: {
        lang: "Đối tác",
        option: {
          1: { lang: "Chỉnh sửa", status: false },
        },
      },
      plant: {
        lang: "Dự án",
        option: {
          1: { lang: "Chỉnh sửa", status: false },
          2: { lang: "Xóa", status: false },
          3: { lang: "Tạo mới", status: false },
        },
      },
      report: {
        lang: "Báo cáo",
        option: {
          1: { lang: "Chỉnh sửa", status: false },
          2: { lang: "Xóa", status: false },
          3: { lang: "Tạo mới", status: false },
        },
      },
      rule: {
        lang: "Phân quyền",
        option: {
          1: { lang: "Chỉnh sửa", status: false },
          2: { lang: "Xóa", status: false },
          3: { lang: "Thêm", status: false },
          4: { lang: "Trạng thái", status: false },
        },
      },
    },
  },
]);

export default function Rule() {
  const dataLang = useIntl();
  const [filter, setFilter] = useState(false);

  const paginationComponentOptions = {
    rowsPerPageText: dataLang.formatMessage({ id: 'row' }),
    rangeSeparatorText: dataLang.formatMessage({ id: 'to' }),
    selectAllRowsItem: true,
    selectAllRowsItemText: dataLang.formatMessage({ id: 'showAll' }),
  };

  const columnrule = [
    {
      name: dataLang.formatMessage({ id: 'ordinalNumber' }),
      selector: (row, index) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: dataLang.formatMessage({ id: 'name' }),
      selector: (row) => row.name,
      sortable: true,
      minWidth: "200px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "ID",
      selector: (row) => row.ruleid,
      sortable: true,
      width: "100px",
    },
    {
      name: dataLang.formatMessage({ id: 'edit' }),
      selector: (row) => (
        <>
          <div className="DAT_TableEdit">
            <span
              id={row.ruleid + "_MORE"}
              onMouseEnter={(e) => handleModify(e, "block")}
            >
              <IoMdMore size={20} />
            </span>
          </div>

          <div
            className="DAT_ModifyBox"
            id={row.ruleid + "_Modify"}
            style={{ display: "none", marginTop: '2px' }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            <div
              className="DAT_ModifyBox_Fix"
              id={row.ruleid}
              onClick={(e) => handleEdit(e)}
            >
              <MdEdit size={20} color="#216990" />
              &nbsp;
              {dataLang.formatMessage({ id: 'edit' })}
            </div>
            <div
              className="DAT_ModifyBox_Remove"
              onClick={() => (confirmDeleteState.value = "delete")}
            >
              <MdDelete size={20} />
              &nbsp;
              {dataLang.formatMessage({ id: 'remove' })}
            </div>
          </div>
        </>
      ),
      width: "103px",
    },
  ];

  const handleEdit = (e) => {
    const id = e.currentTarget.id;
    if (id == 1) {
      alertDispatch(dataLang.formatMessage({ id: 'alert_20' }));
    } else {
      editRuleState.value = true;
      editruledata.value = datarule.value.find(
        (data) => data.ruleid == id
      );
    }
  };

  const handleModify = (e, type) => {
    const id = e.currentTarget.id;
    var arr = id.split("_");

    const mod = document.getElementById(arr[0] + "_Modify");
    mod.style.display = type;
  };

  return (
    <>
      <div className="DAT_RuleHeader">
        <div className="DAT_RuleHeader_Title">
          <MdOutlineAdminPanelSettings
            color="gray" size={25} /> <span>{dataLang.formatMessage({ id: 'rule' })}</span>
        </div>

        {isMobile.value ? (
          <>
            <div className="DAT_Modify">
              <div className="DAT_Modify_Item" onClick={() => setFilter(!filter)}><CiSearch color="white" size={20} /></div>
              <div className="DAT_Modify_Add" onClick={() => (createruleState.value = true)}><IoAddOutline color="white" size={20} /></div>
            </div>

            {filter ? (
              <div className="DAT_Modify_Filter">
                <input type="text" placeholder={dataLang.formatMessage({ id: 'enterName' })} />
                <div className="DAT_Modify_Filter_Close" onClick={() => setFilter(!filter)}>
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
              <input type="text" placeholder={dataLang.formatMessage({ id: 'enterName' })} />
              <CiSearch color="gray" size={20} />
            </div>
            <button
              className="DAT_RuleHeader_New"
              onClick={() => (createruleState.value = true)}
            >
              <span>
                <GrUserAdmin color="white" size={20} />
                &nbsp;
                {dataLang.formatMessage({ id: 'newRule' })}
              </span>
            </button>
          </>
        )}

      </div>

      {isMobile.value ? (
        <div className="DAT_RuleMobile">
          <div className="DAT_RuleMobile_Header" style={{ padding: "15px" }}>
            {dataLang.formatMessage({ id: 'ruleList' })}
          </div>

          {datarule.value.map((item, i) => {
            return (
              <div key={i} className="DAT_RuleMobile_Content">
                <div className="DAT_RuleMobile_Content_Item">
                  <div className="DAT_RuleMobile_Content_Item_Row">
                    <div className="DAT_RuleMobile_Content_Item_Row_Left">
                      <div className="DAT_RuleMobile_Content_Item_Row_Left_Item">
                        {dataLang.formatMessage({ id: 'name' })}: {item.name}
                      </div>
                      <div className="DAT_RuleMobile_Content_Item_Row_Left_Item">
                        ID: {item.ruleid}
                      </div>
                    </div>

                    <div className="DAT_RuleMobile_Content_Item_Row_Right">
                      <div className="DAT_RuleMobile_Content_Item_Row_Right_Item" id={item.ruleid} onClick={(e) => handleEdit(e)}>
                        <MdEdit size={20} color="#216990" />
                      </div>
                      <div className="DAT_RuleMobile_Content_Item_Row_Right_Item" onClick={() => (confirmDeleteState.value = "delete")}>
                        <MdDelete size={20} color="red" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="DAT_Rule">
          <div className="DAT_Rule_Header"
            style={{
              padding: "15px",
              backgroundColor: "rgba(233, 233, 233, 0.5)",
            }}
          >
            {dataLang.formatMessage({ id: 'ruleList' })}
          </div>

          <div className="DAT_Rule_Content">
            <DataTable
              className="DAT_Table_Container"
              columns={columnrule}
              data={datarule.value}
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
          <ConfirmDeleteRule />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
