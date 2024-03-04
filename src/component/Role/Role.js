import React, { useEffect } from "react";
import "./Role.scss";
import DataTable from "react-data-table-component";
import { FaUsers } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Empty } from "../Project/Project";
import { signal } from "@preact/signals-react";
import CreateRole from "./CreateRole";
import DeleteRole from "./DeleteRole";
import EditRole from "./EditRole";
import { host } from "../Lang/Contant";
import { callApi } from "../Api/Api";
import { partnerInfor, userInfor } from "../../App";


export const roleData = signal({});
export const roleState = signal("default");
export const popupState = signal("default");

const Usr_ = signal([]);


function Role(props) {
  const paginationComponentOptions = {
    rowsPerPageText: "Số hàng",
    rangeSeparatorText: "đến",
    selectAllRowsItem: true,
    selectAllRowsItemText: "tất cả",
  };



  const columnrole = [
    {
      name: "STT",
      selector: (row) => row.id,
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "Tên",
      selector: (row) => row.name_,
      sortable: true,
      minWidth: "200px",
      style: {
        justifyContent: "left",
      }
    },
    {
      name: "phone",
      selector: (row) => row.phone_,
      minWidth: "250px",
      style: {
        justifyContent: "left",
      }
    },
    {
      name: "E-mail",
      selector: (row) => row.mail_,
      width: "250px",
      style: {
        justifyContent: "left",
      }
    },
    {
      name: "Phân quyền",
      selector: (row) => row.rulename_,
      sortable: true,
      width: "160px",
    },

    {
      name: "Tài khoản",
      selector: (row) => row.type_,
      sortable: true,
      width: "180px",
    },
    {
      name: "Tùy chỉnh",
      selector: (row) => (
        <>

          {row.type_ === "user"
            ? <div className="DAT_TableEdit">
              <span
                id={row.id_ + "_MORE"}
                onMouseEnter={(e) => handleModify(e, "block")}
              >
                ...
              </span>
            </div>
            : <></>
          }


          <div
            className="DAT_ModifyBox"
            id={row.id_ + "_Modify"}
            style={{ display: "none" }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            <div
              className="DAT_ModifyBox_Fix"
              id={row.id_}
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
    roleData.value = Usr_.value.find((item) => item.id_ == id);
  };

  const handleModify = (e, type) => {
    const id = e.currentTarget.id;
    var arr = id.split("_");

    const mod = document.getElementById(arr[0] + "_Modify");
    mod.style.display = type;
  };

  useEffect(() => {
    const fetchUsr = async () => {
      const d = await callApi('post', host.DATA + '/getallUser', { partnerid: partnerInfor.value.partnerid });
      console.log(d)
      if (d.status === true) {
        Usr_.value = d.data
        Usr_.value.map((item, i) => item.id = i + 1);
      }

    }
    fetchUsr()
  }, [])


  return (
    <>
      <div className="DAT_RoleHeader">
        <div className="DAT_RoleHeader_Title">
          <FaUsers color="gray" size={25} /> <span>Người dùng</span>
        </div>
        <div className="DAT_RoleHeader_Filter">
          <input type="text" placeholder="Nhập tên tài khoản" />
          <CiSearch color="gray" size={20} />
        </div>
        <button
          className="DAT_RoleHeader_New"
          onClick={() => (roleState.value = "create")}
        >
          Tạo tài khoản
        </button>
      </div>

      <div className="DAT_Role">
        <div className='DAT_Role_Header' style={{ padding: "15px", backgroundColor: "rgba(233, 233, 233, 0.5)" }}>
          Danh sách người dùng
        </div>
        <div className="DAT_Role_Content">

          <DataTable
            className="DAT_Table_Container"
            columns={columnrole}
            data={Usr_.value}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            fixedHeader={true}
            noDataComponent={<Empty />}
          />
        </div>
      </div>

      <div className="DAT_RoleInfor"
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

      <div className="DAT_RolePopup"
        style={{
          height: popupState.value === "default" ? "0px" : "100vh",
        }}
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
      </div>
    </>
  );
}

export default Role;
