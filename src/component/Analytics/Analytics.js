import React from "react";
import "./Analytics.scss";
import DataTable from "react-data-table-component";
import { IoMdAnalytics } from "react-icons/io";
import { Empty } from "../Project/Project";
import { signal } from "@preact/signals-react";
import AnaCreate from "./AnaCreate";

export const anaState = signal("default");

function Analytics(props) {
  const paginationComponentOptions = {
    rowsPerPageText: "Số hàng",
    rangeSeparatorText: "đến",
    selectAllRowsItem: true,
    selectAllRowsItemText: "tất cả",
  };

  const dataAna = [];

  const columnAna = [
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
      <div className="DAT_AnaHeader">
        <div className="DAT_AnaHeader_Title">
          <IoMdAnalytics color="gray" size={25} /> <span>Phân tích</span>
        </div>
        <button
          className="DAT_AnaHeader_New"
          onClick={() => (anaState.value = "create")}
        >
          Tạo mẫu phân tích
        </button>
      </div>

      <div className="DAT_Ana">
        <DataTable
          className="DAT_Table_Container"
          columns={columnAna}
          data={dataAna}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader={true}
          noDataComponent={<Empty />}
        />
      </div>

      <div
        className="DAT_AnaInfor"
        style={{
          height: anaState.value === "default" ? "0px" : "100vh",
          transition: "0.5s",
        }}
      >
        {(() => {
          switch (anaState.value) {
            case "create":
              return <AnaCreate />;
            default:
              return <></>;
          }
        })()}
      </div>
    </>
  );
}

export default Analytics;
