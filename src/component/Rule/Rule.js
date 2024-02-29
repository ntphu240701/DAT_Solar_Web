import React from "react";
import "./Rule.scss";
import { FaUsers } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Empty } from "../Project/Project";
import { signal } from "@preact/signals-react";
import DataTable from "react-data-table-component";
import CreateRule from "./CreateRule";
import ConfirmDeleteRule from "./ConfirmDeleteRule";
import EditRule, { editruledata } from "./EditRule";
import { alertDispatch } from "../Alert/Alert";

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
        lang: "Thông báo",
        option: {
          1: { lang: "Chỉnh sửa", status: true },
          2: { lang: "Xóa", status: true },
        },
      },
      device: {
        lang: "Thiết bị",
        option: {
          1: { lang: "Chỉnh sửa", status: true },
          2: { lang: "Xóa", status: true },
          3: { lang: "Tạo mới", status: true },
        },
      },
      partner: {
        lang: "Đối tác",
        option: {
          1: { lang: "Chỉnh sửa", status: true },
        },
      },
      plant: {
        lang: "Dự án",
        option: {
          1: { lang: "Chỉnh sửa", status: true },
          2: { lang: "Xóa", status: true },
          3: { lang: "Tạo mới", status: true },
        },
      },
      report: {
        lang: "Báo cáo",
        option: {
          1: { lang: "Chỉnh sửa", status: true },
          2: { lang: "Xóa", status: true },
          3: { lang: "Tạo mới", status: true },
        },
      },
      rule: {
        lang: "Phân quyền",
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
        lang: "Thông báo",
        option: {
          1: { lang: "Chỉnh sửa", status: true },
          2: { lang: "Xóa", status: true },
        },
      },
      device: {
        lang: "Thiết bị",
        option: {
          1: { lang: "Chỉnh sửa", status: true },
          2: { lang: "Xóa", status: true },
          3: { lang: "Tạo mới", status: true },
        },
      },
      partner: {
        lang: "Đối tác",
        option: {
          1: { lang: "Chỉnh sửa", status: true },
        },
      },
      plant: {
        lang: "Dự án",
        option: {
          1: { lang: "Chỉnh sửa", status: true },
          2: { lang: "Xóa", status: true },
          3: { lang: "Tạo mới", status: true },
        },
      },
      report: {
        lang: "Báo cáo",
        option: {
          1: { lang: "Chỉnh sửa", status: true },
          2: { lang: "Xóa", status: true },
          3: { lang: "Tạo mới", status: true },
        },
      },
      rule: {
        lang: "Phân quyền",
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
  const paginationComponentOptions = {
    rowsPerPageText: "Số hàng",
    rangeSeparatorText: "đến",
    selectAllRowsItem: true,
    selectAllRowsItemText: "tất cả",
  };

  const columnrule = [
    {
      name: "STT",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Tên quyền",
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
      name: "Tùy chỉnh",
      selector: (row) => (
        <>
          <div className="DAT_TableEdit">
            <span
              id={row.ruleid + "_MORE"}
              onMouseEnter={(e) => handleModify(e, "block")}
            >
              ...
            </span>
          </div>

          <div
            className="DAT_ModifyBox"
            id={row.ruleid + "_Modify"}
            style={{ display: "none" }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            <div
              className="DAT_ModifyBox_Fix"
              id={row.id}
              onClick={(e) => handleEdit(e)}
            >
              Chỉnh sửa
            </div>
            <div
              className="DAT_ModifyBox_Remove"
              onClick={() => (confirmDeleteState.value = "delete")}
            >
              Gỡ
            </div>
          </div>
        </>
      ),
      width: "100px",
    },
  ];

  const handleEdit = (e) => {
    if (ruleID.value === 1) {
      alertDispatch("Không thể thay đổi phân quyền này !");
    } else {
      editRuleState.value = true;
      editruledata.value = datarule.value.find(
        (data) => data.ruleid === ruleID.value
      );
    }
  };

  const handleModify = (e, type) => {
    const id = e.currentTarget.id;
    var arr = id.split("_");
    ruleID.value = parseInt(arr[0]);
    const mod = document.getElementById(arr[0] + "_Modify");
    mod.style.display = type;
  };

  return (
    <>
      <div className="DAT_RuleHeader">
        <div className="DAT_RuleHeader_Title">
          <FaUsers color="gray" size={25} /> <span>Phân quyền người dùng</span>
        </div>
        <div className="DAT_RuleHeader_Filter">
          <input type="text" placeholder="Nhập tên tài khoản" />
          <CiSearch color="gray" size={20} />
        </div>
        <button
          className="DAT_RuleHeader_New"
          onClick={() => (createruleState.value = true)}
        >
          Tạo quyền mới
        </button>
      </div>

      <div className="DAT_Rule">
        <div
          className="DAT_Rule_Header"
          style={{
            padding: "15px",
            backgroundColor: "rgba(233, 233, 233, 0.5)",
          }}
        >
          Danh sách phân quyền
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

      <div
        className="DAT_RuleCreate"
        style={{
          height: editRuleState.value ? "100vh" : "0px",
          transition: "0.5s",
        }}
      >
        {editRuleState.value ? <EditRule /> : <></>}
      </div>

      <div
        className="DAT_RuleCreate"
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
