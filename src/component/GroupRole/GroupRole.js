import React from "react";
import "./GroupRole.scss";
import DataTable from "react-data-table-component";
import { IoMdAnalytics } from "react-icons/io";
import { Empty } from "../Project/Project";
import { CiSearch } from "react-icons/ci";
import { signal } from "@preact/signals-react";
import CreateGroupRole from "./CreateGroupRole";



export const createState = signal(false);

function GroupRole(props) {
  const paginationComponentOptions = {
    rowsPerPageText: "Số hàng",
    rangeSeparatorText: "đến",
    selectAllRowsItem: true,
    selectAllRowsItemText: "tất cả",
  };

  const dataGroupRole = [];

  const columnGroupRole = [
    {
      name: "Tên",
      selector: (row) => row.name,
      sortable: true,
      minWidth: "350px",
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
            <div className="DAT_ModifyBox_Fix">Chỉnh sửa</div>
            <div className="DAT_ModifyBox_Remove">Gỡ</div>
          </div>
        </>
      ),
      width: "100px",
    },
  ];
  const handleModify = (e, type) => {
    const id = e.currentTarget.id;
    var arr = id.split("_");
    const mod = document.getElementById(arr[0] + "_Modify");
    mod.style.display = type;
  };

  return (
    <>
      <div className="DAT_GRHeader">
        <div className="DAT_GRHeader_Title">
          <IoMdAnalytics color="gray" size={25} /> <span>Nhóm người dùng</span>
        </div>
        <div className="DAT_GRHeader_Filter">
          <input type="text" placeholder="Nhập tên thiết bị" />
          <CiSearch color="gray" size={20} />
        </div>
        <button
          className="DAT_GRHeader_New"
          onClick={() => (createState.value = true)}
        >
          Tạo nhóm mới
        </button>
      </div>
      <div className="DAT_GR">
        <DataTable
          className="DAT_Table_Container"
          columns={columnGroupRole}
          data={dataGroupRole}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader={true}
          noDataComponent={<Empty />}
        />
      </div>
      <div
        className="DAT_GroupCreate"
        style={{
          height: createState.value ? "100vh" : "0px",
          transition: "0.5s",
        }}
      >
        {createState.value ? <CreateGroupRole /> : <></>}
      </div>

    </>
  );
}

export default GroupRole;
