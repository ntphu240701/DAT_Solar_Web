import React from "react";
import "./Rule.scss";
import { FaUsers } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Empty } from "../Project/Project";
import { signal } from "@preact/signals-react";
import DataTable from "react-data-table-component";

export default function Rule() {
  const paginationComponentOptions = {
    rowsPerPageText: "Số hàng",
    rangeSeparatorText: "đến",
    selectAllRowsItem: true,
    selectAllRowsItemText: "tất cả",
  };

  const datarole = [
    {
      id: 1,
      name: "Trí Trần",
      email: "tritran@datgroup.com.vn",
      phone: "--",
      role: "View only",
      createdate: "05/01/2022 14:03:36",
    },
    {
      id: 2,
      name: "Tiến Đỗ",
      email: "tiendo@datgroup.com.vn",
      phone: "--",
      role: "Edit",
      createdate: "12/25/2023 14:08:36",
    },
    {
      id: 3,
      name: "Hiệp Solar",
      email: "hiepsolar@datgroup.com.vn",
      phone: "--",
      role: "Full",
      createdate: "01/17/2024 14:08:36",
    },
  ];

  const columnrole = [
    {
      name: "Tên",
      selector: (row) => row.name,
      sortable: true,
      minWidth: "350px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "phone",
      selector: (row) => row.phone,
      width: "100px",
    },
    {
      name: "E-mail",
      selector: (row) => row.email,
      width: "210px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Phân quyền",
      selector: (row) => row.role,
      sortable: true,
      width: "160px",
    },

    {
      name: "Ngày tạo",
      selector: (row) => row.createdate,
      sortable: true,
      width: "180px",
    },
    {
      name: "Tùy chỉnh",
      selector: (row) => (
        <>
          <div className="DAT_TableEdit">
            <span
              id={row.id + "_MORE"}
              onMouseEnter={(e) => handleModify(e, "block")}
            >
              ...
            </span>
          </div>

          <div
            className="DAT_ModifyBox"
            id={row.id + "_Modify"}
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
              onClick={() => (popupState.value = "delete")}
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
    popupState.value = "edit";
    const id = e.currentTarget.id;
    const newRole = datarole.find((item) => item.id == id);
    roleData.value = newRole;
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
          <FaUsers color="gray" size={25} /> <span>Phân quyền người dùng</span>
        </div>
        <div className="DAT_RuleHeader_Filter">
          <input type="text" placeholder="Nhập tên tài khoản" />
          <CiSearch color="gray" size={20} />
        </div>
        <button
          className="DAT_RuleHeader_New"
          onClick={() => (roleState.value = "create")}
        >
          Tạo tài khoản mới
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
          Danh sách người dùng
        </div>
        <div className="DAT_Rule_Content">
          <DataTable
            className="DAT_Table_Container"
            columns={columnrole}
            data={datarole}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            fixedHeader={true}
            noDataComponent={<Empty />}
          />
        </div>
      </div>

      {/* <div
        className="DAT_RuleInfor"
        // style={{
        //   height: roleState.value === "default" ? "0px" : "100vh",
        //   transition: "0.5s",
        // }}
      >
     {(() => {
          switch (roleState.value) {
            case "create":
              return <CreateRole />;
            default:
              return <></>;
          }
        })()} 
      </div> */}

      {/* <div
        className="DAT_RulePopup"
        // style={{
        //   height: popupState.value === "default" ? "0px" : "100vh",
        // }}
      >
        {(() => {
          switch (popupState.value) {
            case "delete":
              return <DeleteRole />;
            case "edit":
              return <EditRole />;
            default:
              return <></>;
          }
        })()} 
      </div> */}
    </>
  );
}
