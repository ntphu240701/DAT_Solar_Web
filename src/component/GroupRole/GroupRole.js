import React, { useEffect, useState } from "react";
import "./GroupRole.scss";
// import DataTable from "react-data-table-component";
import { IoMdAnalytics } from "react-icons/io";
// import { Empty } from "../Project/Project";
import { CiSearch } from "react-icons/ci";
import { signal } from "@preact/signals-react";
import CreateGroupRole from "./CreateGroupRole";
import { FaUserPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Popup from "./Popup";
import AddUsers from "./AddUsers";

export const addState = signal(false);
export const popupState = signal(false);
export const userDel = signal();
export const groupID = signal(1);

export const group = signal([
  {
    id: 1,
    name: "Phòng RnD",
    subinfo: "CTy DAT Group - Head: Ngài Tô",
  },
  {
    id: 2,
    name: "Nhóm 2",
    subinfo: "CTy DAT Group - Head: Phó Lũ",
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

  const handleChangeGroup = (e) => {
    groupID.value = Number(e.currentTarget.id);
  };

  const handleDeleteUser = (e) => {
    popupState.value = true;
    userDel.value = e.currentTarget.id;
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
                  groupID.value == item.id ? "rgb(207, 207, 207, 0.4)" : "",
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
                style={{ fontSize: "13px", color: "grey" }}
              >
                {item.subinfo}
              </div>
            </div>
          ))}
          {/* <div className="DAT_GR_Content_DevideTable_Left_ItemList_Item">
            <div
              className="DAT_GR_Content_DevideTable_Left_ItemList_Item_Name"
              style={{ fontSize: "15px" }}
            >
              
            </div>
            <div
              className="DAT_GR_Content_DevideTable_Left_ItemList_Item_Info"
              style={{ fontSize: "13px", color: "grey" }}
            >
              CTy DAT Group
            </div>
          </div> */}
        </div>
      </div>
      <div className="DAT_GR_Content_DevideTable_Right">
        <div className="DAT_GR_Content_DevideTable_Right_Head">
          Danh sách người dùng
        </div>
        <div className="DAT_GR_Content_DevideTable_Right_ItemList">
          {groupUser.value
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
                    <MdDelete color="red" />
                  </div>
                </div>
              ))
            )}

          <div
            className="DAT_GR_Content_DevideTable_Right_ItemList_Item"
            onClick={() => (addState.value = true)}
          >
            <div className="DAT_GR_Content_DevideTable_Right_ItemList_Item_Plus">
              <FaUserPlus size={20} color="#216990" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const createState = signal(false);

function GroupRole(props) {
  // const paginationComponentOptions = {
  //   rowsPerPageText: "Số hàng",
  //   rangeSeparatorText: "đến",
  //   selectAllRowsItem: true,
  //   selectAllRowsItemText: "tất cả",
  // };

  // const dataGroupRole = [];

  // const columnGroupRole = [
  //   {
  //     name: "Tên",
  //     selector: (row) => row.name,
  //     sortable: true,
  //     minWidth: "350px",
  //   },
  //   {
  //     name: "Tùy chỉnh",
  //     selector: (row) => (
  //       <>
  //         <div className="DAT_TableEdit">
  //           <span
  //             id={row.id + "_MORE"}
  //             onMouseEnter={(e) => handleModify(e, "block")}
  //           >
  //             ...
  //           </span>
  //         </div>

  //         <div
  //           className="DAT_ModifyBox"
  //           id={row.id + "_Modify"}
  //           style={{ display: "none" }}
  //           onMouseLeave={(e) => handleModify(e, "none")}
  //         >
  //           <div className="DAT_ModifyBox_Fix">Chỉnh sửa</div>
  //           <div className="DAT_ModifyBox_Remove">Gỡ</div>
  //         </div>
  //       </>
  //     ),
  //     width: "100px",
  //   },
  // ];
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

          {/* <DataTable
            className="DAT_Table_Container"
            columns={columnGroupRole}
            data={dataGroupRole}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            fixedHeader={true}
            noDataComponent={<Empty />}
          /> */}
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
    </>
  );
}

export default GroupRole;
