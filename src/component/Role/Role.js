import React, { useEffect, useState } from "react";
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
import { useIntl } from "react-intl";
import { isMobile } from "../Navigation/Navigation";
import { IoAddOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

export const roleData = signal({});
export const roleState = signal("default");
export const popupState = signal("default");

const Usr_ = signal([]);

function Role(props) {
  const dataLang = useIntl();
  const [filter, setFilter] = useState(false);

  const paginationComponentOptions = {
    rowsPerPageText: dataLang.formatMessage({ id: 'row' }),
    rangeSeparatorText: dataLang.formatMessage({ id: 'to' }),
    selectAllRowsItem: true,
    selectAllRowsItemText: dataLang.formatMessage({ id: 'showAll' }),
  };

  const columnrole = [
    {
      name: dataLang.formatMessage({ id: 'ordinalNumber' }),
      selector: (row) => row.id,
      sortable: true,
      minWidth: "80px",
    },
    {
      name: dataLang.formatMessage({ id: 'name' }),
      selector: (row) => row.name_,
      sortable: true,
      minWidth: "200px",
      style: {
        justifyContent: "left",
      }
    },
    {
      name: dataLang.formatMessage({ id: 'phone' }),
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
      name: dataLang.formatMessage({ id: 'rule' }),
      selector: (row) => row.rulename_,
      sortable: true,
      width: "160px",
      style: {
        justifyContent: "left",
      }
    },

    {
      name: dataLang.formatMessage({ id: 'account' }),
      selector: (row) => row.type_,
      sortable: true,
      width: "180px",
      style: {
        justifyContent: "left",
      }
    },
    {
      name: dataLang.formatMessage({ id: 'setting' }),
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
              {dataLang.formatMessage({ id: 'edit' })}
            </div>
            <div
              className="DAT_ModifyBox_Remove"
              onClick={() => (popupState.value = "delete")}
            >
              {dataLang.formatMessage({ id: 'remove' })}
            </div>
          </div>
        </>
      ),
      width: "103px",
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
          <FaUsers color="gray" size={25} /> <span>
            {dataLang.formatMessage({ id: 'role' })}
          </span>
        </div>

        {isMobile.value ? (
          <>
            <div className="DAT_Modify">
              <div className="DAT_Modify_Item" onClick={() => setFilter(!filter)}><CiSearch color="white" size={20} /></div>
              <div className="DAT_Modify_Item" onClick={() => (roleState.value = "create")}><IoAddOutline color="white" size={20} /></div>
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
            <div className="DAT_RoleHeader_Filter">
              <input type="text" placeholder={dataLang.formatMessage({ id: 'enterName' })} />
              <CiSearch color="gray" size={20} />
            </div>
            <button
              className="DAT_RoleHeader_New"
              onClick={() => (roleState.value = "create")}
            >
              {dataLang.formatMessage({ id: 'createAccount' })}
            </button>
          </>
        )}
      </div>

      <div className="DAT_Role">
        <div className='DAT_Role_Header' style={{ padding: "15px", backgroundColor: "rgba(233, 233, 233, 0.5)" }}>
          {dataLang.formatMessage({ id: 'roleList' })}
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
