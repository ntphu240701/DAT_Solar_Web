import React, { useEffect } from "react";
import "./GroupRole.scss";
// import DataTable from "react-data-table-component";
import { IoMdAnalytics } from "react-icons/io";
// import { Empty } from "../Project/Project";
import { CiSearch } from "react-icons/ci";
import { signal } from "@preact/signals-react";
import CreateGroupRole from "./CreateGroupRole";
import { FaUserPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Popup from "./Popup";
import AddUsers from "./AddUsers";
import ConfirmDeleteGroup from "./ConfirmDeleteGroup";
import EditGroup from "./EditGroup";
import DataTable from "react-data-table-component";
import { Empty } from "../Project/Project";
import { IoMdPersonAdd } from "react-icons/io";

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
        name: "Tiến Bịp DAT",
        username: "tiendat_012",
        subinfo: "RnD Center",
      },
      {
        name: "Hiệp sĩ đường phố",
        username: "hiepdat_012",
        subinfo: "RnD Center",
      },
      {
        name: "Johnny Trí Nguyễn",
        username: "tridat_012",
        subinfo: "RnD Center",
      },
      {
        name: "Tony Trần",
        username: "tonydat_012",
        subinfo: "RnD Center",
      },
      {
        name: "Phó Lũ",
        username: "phudat_012",
        subinfo: "RnD Center",
      },
    ],
  },
  {
    groupid: 2,
    users: [
      {
        name: "Anh A",
        username: "anhadat_012",
        subinfo: "RnD Center",
      },
      {
        name: "Anh B",
        username: "anhbdat_012",
        subinfo: "RnD Center",
      },
      {
        name: "Anh C",
        username: "anhcdat_012",
        subinfo: "RnD Center",
      },
    ],
  },
]);

const GroupUsers = () => {
  const paginationComponentOptions = {
    rowsPerPageText: "Số hàng",
    rangeSeparatorText: "đến",
    selectAllRowsItem: true,
    selectAllRowsItemText: "tất cả",
  };

  const columnGroupRole = [
    {
      name: "Tên",
      selector: (user) => user.name,
      sortable: true,
      // width: "150px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Tên người dùng",
      selector: (user) => user.username,
      sortable: true,
      // width: "150px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Thông tin",
      selector: (user) => user.subinfo,
      sortable: true,
      // width: "150px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Chỉnh sửa",
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
    console.log(groupID.value);
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

  return (
    <div className="DAT_GR_Content_DevideTable">
      <div className="DAT_GR_Content_DevideTable_Left">
        <div className="DAT_GR_Content_DevideTable_Left_Head">
          Nhóm người dùng
        </div>
        <div className="DAT_GR_Content_DevideTable_Left_ItemList">
          {group.value.map((item) => (
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
                className="DAT_GR_Content_DevideTable_Left_ItemList_Item_Delete"
                id={item.id}
                onClick={(e) => handleDeleteGroup(e)}
              >
                <MdDelete size={20} />
              </div>
              <div
                className="DAT_GR_Content_DevideTable_Left_ItemList_Item_Edit"
                style={{ right: "40px" }}
                id={item.id}
                onClick={(e) => handleEditGroup(e)}
              >
                <MdEdit size={20} color="#216990" />
              </div>
              <div
                className="DAT_GR_Content_DevideTable_Left_ItemList_Item_Add"
                onClick={() => (
                  (addState.value = true)
                )}
              >
                <IoMdPersonAdd size={20}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="DAT_GR_Content_DevideTable_Right">
        <div className="DAT_GR_Content_DevideTable_Right_Head">
          Danh sách người dùng
        </div>
        <div className="DAT_GR_Content_DevideTable_Right_ItemList">
          {/* {groupUser.value
            .filter((item) => item.groupid == groupID.value)
            .map((group) =>
              group.users.map((user, key) => (
                <div
                  key={key}
                  className="DAT_GR_Content_DevideTable_Right_ItemList_Item"
                >
                  <div
                    className="DAT_GR_Content_DevideTable_Right_ItemList_Item_Name"
                    style={{ fontSize: "15px" }}
                  >
                    {user.name}
                  </div>
                  <div
                    className="DAT_GR_Content_DevideTable_Right_ItemList_Item_Info"
                    style={{ fontSize: "13px", color: "grey" }}
                  >
                    {user.username}
                  </div>
                  <div
                    className="DAT_GR_Content_DevideTable_Right_ItemList_Item_Info"
                    style={{ fontSize: "13px", color: "grey" }}
                  >
                    {user.subinfo}
                  </div>
                  <div
                    className="DAT_GR_Content_DevideTable_Right_ItemList_Item_Delete"
                    onClick={(e) => handleDeleteUser(e)}
                    id={user.username}
                  >
                    <MdDelete size={20} />
                  </div>
                </div>
              ))
            )} */}

          {/* {groupID.value === 0 ? (
            <></>
          ) : (
            <div
              className="DAT_GR_Content_DevideTable_Right_ItemList_Item"
              onClick={() => (
                (addState.value = true), console.log(groupID.value)
              )}
            >
              <div className="DAT_GR_Content_DevideTable_Right_ItemList_Item_Plus">
                <FaUserPlus size={20} color="#216990" />
              </div>
            </div>
          )} */}
          {groupID.value === 0 ? (
            <Empty />
          ) : (
            <DataTable
              className="DAT_Table_GroupRole"
              columns={columnGroupRole}
              data={
                groupUser.value.filter(
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
        <div
          className="DAT_GR_Header"
          style={{
            padding: "15px",
            backgroundColor: "rgba(233, 233, 233, 0.5)",
            borderBottom: "1px solid rgb(233, 233, 233, 0.4)",
            boxShadow:
              "0 2px 2px 0 rgba(198, 197, 197, 0.3), 0 6px 20px 0 rgba(198, 197, 197, 0.3)",
          }}
        >
          Danh sách nhóm người dùng
        </div>
        <div className="DAT_GR_Content">
          <GroupUsers />
        </div>
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
