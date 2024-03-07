import React, { useEffect, useState } from "react";
import "./GroupRole.scss";
// import DataTable from "react-data-table-component";
import { IoMdAnalytics } from "react-icons/io";
// import { Empty } from "../Project/Project";
import { CiSearch } from "react-icons/ci";
import { signal } from "@preact/signals-react";
import CreateGroupRole from "./CreateGroupRole";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Popup from "./Popup";
import AddUsers from "./AddUsers";
import ConfirmDeleteGroup from "./ConfirmDeleteGroup";
import EditGroup from "./EditGroup";
import DataTable from "react-data-table-component";
import { Empty } from "../Project/Project";
import { IoMdPersonAdd } from "react-icons/io";
import { data } from "jquery";
import { IoMdMore } from "react-icons/io";
import { useIntl } from "react-intl";
import { isMobile } from "../Navigation/Navigation";
import { IoAddOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaUsersGear } from "react-icons/fa6";
import { PiUsersFour } from "react-icons/pi";

//DATA TEMP
export const group = signal([
  {
    id: 1,
    name: "Phòng RnD",
    subinfo: "CTy DAT Group - Head: Ngài Tô",
    role: {
      1: { lang: "role1", status: true },
      2: { lang: "role2", status: true },
      3: { lang: "role3", status: false },
      4: { lang: "role4", status: false },
    },
  },
  {
    id: 2,
    name: "Nhóm 2",
    subinfo: "CTy DAT Group - Head: Phó Lũ",
    role: {
      1: { lang: "role1", status: false },
      2: { lang: "role2", status: true },
      3: { lang: "role3", status: true },
      4: { lang: "role4", status: false },
    },
  },
]);

export const groupUser = signal([
  {
    groupid: 1,
    users: [
      {
        username: "tantaingo",
        name: "Tài Giỏi",
        email: "tantai.ngo@datgroup.com.vn",
      },
      {
        username: "loctp",
        name: "Tony Trần",
        email: "locdat_012@datgroup.com.vn",
      },
      {
        username: "tiendv",
        name: "Tiến Bịp DAT",
        email: "tiendat_012@datgroup.com.vn",
      },
      {
        username: "hiepga",
        name: "Hiệp sĩ đường phố",
        email: "hiepdat_012@datgroup.com.vn",
      },
      {
        username: "tridat",
        name: "Johnny Trí Nguyễn",
        email: "tridat_012@datgroup.com.vn",
      },
      {
        username: "tonydat_012",
        name: "Tony Trần",
        email: "tonydat_012@datgroup.com.vn",
      },
      {
        username: "phudat_012",
        name: "Phú Hộ",
        email: "phudat_012@datgroup.com.vn",
      },
    ],
  },
  {
    groupid: 2,
    users: [
      {
        username: "anhadat_012",
        name: "Anh A",
        email: "anhadat_012@datgroup.com.vn",
      },
      {
        username: "anhbdat_012",
        name: "Anh B",
        email: "anhadat_012@datgroup.com.vn",
      },
      {
        name: "Anh C",
        username: "anhcdat_012",
        email: "anhcdat_012@datgroup.com.vn",
      },
    ],
  },
]);

//CONST SIGNALS
export const createState = signal(false);
export const addState = signal(false);
export const popupState = signal(false);
export const groupDelState = signal(false);
export const editState = signal(false);
export const groupID = signal(0);
export const groupDelID = signal();
export const userDel = signal();
export const groupEdit = signal();
export const dataUsers = signal([]);

const filter = signal("");
const dataGroup = signal([]);
const dataGroupUser = signal([]);

const GroupUsers = () => {
  const dataLang = useIntl();

  const paginationComponentOptions = {
    rowsPerPageText: dataLang.formatMessage({ id: 'row' }),
    rangeSeparatorText: dataLang.formatMessage({ id: 'to' }),
    selectAllRowsItem: true,
    selectAllRowsItemText: dataLang.formatMessage({ id: 'showAll' }),
  };

  const columnGroupRole = [
    {
      name: dataLang.formatMessage({ id: 'ordinalNumber' }),
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: dataLang.formatMessage({ id: 'account' }),
      selector: (user) => user.username,
      sortable: true,
      width: "200px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'name' }),
      selector: (user) => user.name,
      sortable: true,
      width: "200px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Email",
      selector: (user) => user.email,
      sortable: true,
      // width: "150px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'setting' }),
      selector: (user) => (
        <div
          className="DAT_GR_Content_DevideTable_Right_ItemList_Item_Delete"
          id={user.username}
          onClick={(e) => handleDeleteUser(e)}
        >
          <MdDelete size={20} />
        </div>
      ),
      width: "100px",
    },
  ];

  const handleChangeGroup = (e) => {
    groupID.value = Number(e.currentTarget.id);
  };

  const handleDeleteUser = (e) => {
    popupState.value = true;
    userDel.value = e.currentTarget.id;
    console.log(groupUser.value);
  };

  const handleDeleteGroup = (e) => {
    groupDelState.value = true;
  };

  const handleEditGroup = (e) => {
    editState.value = true;
    groupEdit.value = group.value.find(
      (item) => item.id == Number(e.currentTarget.id)
    );
  };

  const handleShowFunction = (e) => {
    const id = e.currentTarget.id;
    const idArr = id.split("_");

    const mod = document.getElementById(idArr[0] + "_function");
    const t = document.getElementById(idArr[0] + "_dot");
    if (t.style.display === "none") {
      t.style.display = "flex";
      mod.style.display = "none";
    } else {
      t.style.display = "none";
      mod.style.display = "flex";
    }
  };

  return (
    <div className="DAT_GR_Content_DevideTable">
      <div className="DAT_GR_Content_DevideTable_Left">
        <div className="DAT_GR_Content_DevideTable_Left_Head">
          {dataLang.formatMessage({ id: 'grouprole' })}
        </div>
        <div className="DAT_GR_Content_DevideTable_Left_ItemList">
          {dataGroup.value.map((item) => (
            <div
              className="DAT_GR_Content_DevideTable_Left_ItemList_Item"
              key={item.id}
              id={item.id}
              style={{
                backgroundColor:
                  groupID.value === item.id ? "rgb(207, 207, 207, 0.4)" : "",
              }}
              onClick={(e) => handleChangeGroup(e)}
            >
              <div
                className="DAT_GR_Content_DevideTable_Left_ItemList_Item_Name"
                style={{ fontSize: "15px" }}
              >
                {item.name}
              </div>
              <div
                className="DAT_GR_Content_DevideTable_Left_ItemList_Item_Info"
                style={{ fontSize: "13px", color: "grey", maxWidth: "100px" }}
              >
                {item.subinfo}
              </div>

              <div
                className="DAT_GR_Content_DevideTable_Left_ItemList_Item_Shortcut"
                id={item.id + "_dot"}
                onMouseEnter={(e) => handleShowFunction(e)}
              >
                <IoMdMore size={20} />
              </div>

              <div
                className="DAT_GR_Content_DevideTable_Left_ItemList_Item_More"
                id={item.id + "_function"}
                style={{ display: "none" }}
                onMouseLeave={(e) => handleShowFunction(e)}
              >
                <div
                  className="DAT_GR_Content_DevideTable_Left_ItemList_Item_More_Delete"
                  id={item.id}
                  onClick={(e) => handleDeleteGroup(e)}
                >
                  <MdDelete size={20} />
                </div>
                <div
                  className="DAT_GR_Content_DevideTable_Left_ItemList_Item_More_Edit"
                  style={{ right: "40px" }}
                  id={item.id}
                  onClick={(e) => handleEditGroup(e)}
                >
                  <MdEdit size={20} color="#216990" />
                </div>
                <div
                  className="DAT_GR_Content_DevideTable_Left_ItemList_Item_More_Add"
                  onClick={() => (addState.value = true)}
                >
                  <IoMdPersonAdd size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="DAT_GR_Content_DevideTable_Right">
        <div className="DAT_GR_Content_DevideTable_Right_Head">
          {dataLang.formatMessage({ id: 'roleList' })}
        </div>
        <div className="DAT_GR_Content_DevideTable_Right_ItemList">
          {groupID.value === 0 ? (
            <Empty />
          ) : (
            <DataTable
              className="DAT_Table_GroupRole"
              columns={columnGroupRole}
              data={
                dataGroupUser.value.filter(
                  (item) => item.groupid == groupID.value
                )[0].users
              }
              pagination
              paginationComponentOptions={paginationComponentOptions}
              fixedHeader={true}
              noDataComponent={<Empty />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

function GroupRole(props) {
  const dataLang = useIntl()
  const [filter, setFilter] = useState(false);

  const handleFilter = (e) => {
    filter.value = e.target.value;
    if (filter.value !== "") {
      for (const group of dataGroupUser.value) {
        for (const user of group.users) {
          if (user.username.includes(filter.value)) {
            const t = dataGroupUser.value.find(
              (item) => item.groupid == group.groupid
            );
            console.log(t);
          } else {
            // console.log("khong tim thay");
          }
        }
        // console.log(group);
      }
    } else {
      dataGroupUser.value = groupUser.value;
    }
  };

  useEffect(() => {
    dataGroup.value = group.value;
    dataGroupUser.value = groupUser.value;
    // for(const group of dataGroupUser.value){ console.log(group)}
    // // console.log(dataGroupUser.value);
  }, []);

  return (
    <>
      <div className="DAT_GRHeader">
        <div className="DAT_GRHeader_Title">
          <PiUsersFour color="gray" size={25} /> <span>{dataLang.formatMessage({ id: 'roleList' })}</span>
        </div>

        {isMobile.value ? (
          <>
            <div className="DAT_Modify">
              <div className="DAT_Modify_Item" onClick={() => setFilter(!filter)}><CiSearch color="white" size={20} /></div>
              <div className="DAT_Modify_Item" onClick={() => (createState.value = true)}><IoAddOutline color="white" size={20} /></div>
            </div>

            {filter ? (
              <div className="DAT_Modify_Filter">
                <input
                  type="text"
                  placeholder={dataLang.formatMessage({ id: 'enterInfo' })}
                  value={filter.value}
                  onChange={(e) => handleFilter(e)}
                />
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
            <div className="DAT_GRHeader_Filter">
              <input
                type="text"
                placeholder={dataLang.formatMessage({ id: 'enterInfo' })}
                value={filter.value}
                onChange={(e) => handleFilter(e)}
              />
              <CiSearch color="gray" size={20} />
            </div>
            <button
              className="DAT_GRHeader_New"
              onClick={() => (createState.value = true)}
            >
              <span>
                <FaUsersGear color="white" size={20} />
                &nbsp;
                {dataLang.formatMessage({ id: 'createNewGroup' })}
              </span>
            </button>
          </>
        )}
      </div>

      <div className="DAT_GR">
        <div className="DAT_GR_Header"
          style={{
            padding: "15px",
            backgroundColor: "rgba(233, 233, 233, 0.5)",
            borderBottom: "1px solid rgb(233, 233, 233, 0.4)",
            boxShadow:
              "0 2px 2px 0 rgba(198, 197, 197, 0.3), 0 6px 20px 0 rgba(198, 197, 197, 0.3)",
          }}
        >
          {dataLang.formatMessage({ id: 'grouproleList' })}
        </div>
        <div className="DAT_GR_Content">
          <GroupUsers />
        </div>
      </div>

      <div className="DAT_GroupCreate"
        style={{
          height: createState.value ? "100vh" : "0px",
          transition: "0.5s",
        }}
      >
        {createState.value ? <CreateGroupRole /> : <></>}
      </div>

      {popupState.value ? (
        <div className="DAT_EraseUserPopup">
          <Popup />
        </div>
      ) : (
        <></>
      )}

      {addState.value ? (
        <div className="DAT_AddUserPopup">
          <AddUsers />
        </div>
      ) : (
        <></>
      )}

      {groupDelState.value ? (
        <div className="DAT_DeleteGroupPopup">
          <ConfirmDeleteGroup />
        </div>
      ) : (
        <></>
      )}

      {editState.value ? (
        <div className="DAT_EditGroup">
          <EditGroup />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default GroupRole;
