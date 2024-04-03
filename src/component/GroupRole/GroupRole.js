import React, { useEffect, useState } from "react";
import "./GroupRole.scss";

import { signal } from "@preact/signals-react";
import CreateGroupRole from "./CreateGroupRole";
import Popup from "./Popup";
import AddUsers from "./AddUsers";
import ConfirmDeleteGroup from "./ConfirmDeleteGroup";
import EditGroup from "./EditGroup";
import DataTable from "react-data-table-component";
import { Empty } from "../Project/Project";
import { useIntl } from "react-intl";
import { isMobile } from "../Navigation/Navigation";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";

import { MdDelete } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { IoAddOutline, IoTrashOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { PiUsersFour } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

//DATA TEMP
export const group = signal([]);
export const groupUser = signal([]);

//CONST SIGNALS
export const groupID = signal(0);
export const groupDelID = signal();
export const userDel = signal();
export const groupEdit = signal();

const datafilter = signal();

const GroupUsers = (props) => {
  const dataLang = useIntl();

  const paginationComponentOptions = {
    rowsPerPageText: dataLang.formatMessage({ id: "row" }),
    rangeSeparatorText: dataLang.formatMessage({ id: "to" }),
    selectAllRowsItem: true,
    selectAllRowsItemText: dataLang.formatMessage({ id: "showAll" }),
  };

  const columnGroupRole = [
    {
      name: dataLang.formatMessage({ id: "ordinalNumber" }),
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: dataLang.formatMessage({ id: "account" }),
      selector: (user) => user.usr_,
      sortable: true,
      minWidth: "200px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: "name" }),
      selector: (user) => user.name_,
      sortable: true,
      maxWidth: "200px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Email",
      selector: (user) => user.mail_,
      sortable: true,
      width: "250px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: "phone" }),
      selector: (user) => user.phone_,
      sortable: true,
      minwidth: "200px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: "rule" }),
      selector: (user) => dataLang.formatMessage({ id: user.type_ }),
      sortable: true,
      // width: "150px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: "setting" }),
      selector: (user) => (
        <>
          {user.type_ === "master" ? (
            <></>
          ) : (
            <div
              className="DAT_GR_Content_DevideTable_Right_ItemList_Item_Delete"
              id={user.id_}
              onClick={(e) => handleDeleteUser(e)}
              style={{ cursor: "pointer" }}
            >
              <IoTrashOutline size={18} />
            </div>
          )}
        </>
      ),
      width: "100px",
    },
  ];

  const handleChangeGroup = (e) => {
    groupID.value = Number(e.currentTarget.id);
    const checkApi = async () => {
      const getUser = await callApi("post", host.DATA + "/getallUser", {
        partnerid: groupID.value,
      });
      if (getUser.status) {
        groupUser.value = getUser.data.sort((a, b) => a.id_ - b.id_);
        datafilter.value = groupUser.value;
      }
    };
    checkApi();
  };

  const handleDeleteUser = (e) => {
    props.delState();
    userDel.value = e.currentTarget.id;
  };

  const handleEditGroup = (e) => {
    props.editState();
    groupEdit.value = group.value.find(
      (item) => item.id_ === Number(e.currentTarget.id)
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
          {dataLang.formatMessage({ id: "grouprole" })}
        </div>

        <div className="DAT_GR_Content_DevideTable_Left_ItemList">
          {group.value.map((item, index) => (
            <div
              className="DAT_GR_Content_DevideTable_Left_ItemList_Item"
              key={index}
              id={item.id_}
              style={{
                backgroundColor:
                  groupID.value === item.id_ ? "rgb(207, 207, 207, 0.4)" : "",
              }}
              onClick={(e) => handleChangeGroup(e)}
            >
              <div>
                <div
                  className="DAT_GR_Content_DevideTable_Left_ItemList_Item_Name"
                  style={{ fontSize: "15px" }}
                >
                  {item.name_}
                </div>

                <div
                  className="DAT_GR_Content_DevideTable_Left_ItemList_Item_Info"
                  style={{ fontSize: "13px", color: "grey", maxWidth: "100px" }}
                >
                  {item.code_}
                </div>
              </div>
              <div
                className="DAT_GR_Content_DevideTable_Left_ItemList_Item_Shortcut"
                id={item.id_ + "_dot"}
                onClick={(e) => handleShowFunction(e)}
              >
                <IoMdMore size={20} color="grey" />
              </div>

              <div
                className="DAT_GR_Content_DevideTable_Left_ItemList_Item_More"
                id={item.id_ + "_function"}
                style={{ display: "none" }}
                onMouseLeave={(e) => handleShowFunction(e)}
              >
                {item.id_ === 1 ? (
                  <></>
                ) : (
                  <div
                    className="DAT_GR_Content_DevideTable_Left_ItemList_Item_More_Delete"
                    id={item.id_}
                    onClick={() => props.groupDelState()}
                  >
                    <IoTrashOutline size={18} />
                  </div>
                )}
                <div
                  className="DAT_GR_Content_DevideTable_Left_ItemList_Item_More_Edit"
                  style={{ right: "40px" }}
                  id={item.id_}
                  onClick={(e) => handleEditGroup(e)}
                >
                  <FiEdit size={18} />
                </div>

                <div
                  className="DAT_GR_Content_DevideTable_Left_ItemList_Item_More_Add"
                  onClick={() => props.addState()}
                >
                  <AiOutlineUserAdd size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="DAT_GR_Content_DevideTable_Right">
        <div className="DAT_GR_Content_DevideTable_Right_ItemList">
          {groupID.value === 0 ? (
            <Empty />
          ) : (
            <DataTable
              className="DAT_Table_GroupRole"
              columns={columnGroupRole}
              data={groupUser.value}
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

export default function GroupRole(props) {
  const dataLang = useIntl();
  const [filter, setFilter] = useState(false);
  const [createState, setCreateState] = useState(false);
  const [addState, setAddState] = useState(false);
  const [popupState, setPopupState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [groupDelState, setGroupDelState] = useState(false);

  const handleFilter = (e) => {
    const t = e.currentTarget.value.toLowerCase();
    if (groupID.value !== 0) {
      datafilter.value = groupUser.value.filter((item) => {
        return (
          item.mail_.toLowerCase().includes(t) ||
          item.name_.toLowerCase().includes(t) ||
          item.phone_.toLowerCase().includes(t) ||
          item.usr_.toLowerCase().includes(t)
        );
      });
    }
  };

  const handleCloseCreate = () => {
    setCreateState(false);
  };

  const handleAddState = () => {
    setAddState(true);
  };

  const handleCloseAdd = () => {
    setAddState(false);
  };

  const handleDelState = () => {
    setPopupState(true);
  };

  const handleCloseDel = () => {
    setPopupState(false);
  };

  const handleEditState = () => {
    setEditState(true);
  };

  const handleCloseEdit = () => {
    setEditState(false);
  };

  const handleGroupDelState = () => {
    setGroupDelState(true);
  };

  const handleCloseGroupDel = () => {
    setGroupDelState(false);
  };

  useEffect(() => {
    const checkApi = async () => {
      const allPartner = await callApi("get", host.DATA + "/getallPartner", "");
      if (allPartner.status) {
        group.value = allPartner.data.sort((a, b) => a.id_ - b.id_);
      }
    };
    checkApi();
  }, []);

  return (
    <>
      <div className="DAT_GRHeader">
        <div className="DAT_GRHeader_Title">
          <PiUsersFour color="gray" size={25} />
          <span>{dataLang.formatMessage({ id: "roleList" })}</span>
        </div>

        {isMobile.value ? (
          <>
            <div className="DAT_Modify">
              <div
                className="DAT_Modify_Item"
                onClick={() => setFilter(!filter)}
              >
                <CiSearch color="white" size={20} />
              </div>
              <div
                className="DAT_Modify_Add"
                onClick={() => setCreateState(true)}
              >
                <IoAddOutline color="white" size={20} />
              </div>
            </div>

            {filter ? (
              <div
                className="DAT_Modify_Filter"
                style={{
                  backgroundColor:
                    groupID.value === 0 ? "rgba(233, 233, 233, 0.5)" : "white",
                }}
              >
                <input
                  disabled={groupID.value === 0 ? true : false}
                  type="text"
                  placeholder={dataLang.formatMessage({ id: "enterInfo" })}
                  value={filter}
                  onChange={(e) => handleFilter(e)}
                />
                <div
                  className="DAT_Modify_Filter_Close"
                  onClick={() => setFilter(!filter)}
                >
                  <RxCross2 size={20} color="white" />
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <div
              className="DAT_GRHeader_Filter"
              style={{
                backgroundColor:
                  groupID.value === 0 ? "rgba(233, 233, 233, 0.5)" : "white",
              }}
            >
              <input
                disabled={groupID.value === 0 ? true : false}
                type="text"
                autoComplete="off"
                placeholder={dataLang.formatMessage({ id: "enterInfo" })}
                onChange={(e) => handleFilter(e)}
              />
              <CiSearch color="gray" size={20} />
            </div>
            <button
              className="DAT_GRHeader_New"
              onClick={() => setCreateState(true)}
            >
              <span>
                <AiOutlineUsergroupAdd color="white" size={20} />
                &nbsp;
                {dataLang.formatMessage({ id: "createNewGroup" })}
              </span>
            </button>
          </>
        )}
      </div>

      <div className="DAT_GR">
        <div className="DAT_GR_Header">
          {dataLang.formatMessage({ id: "grouproleList" })}
        </div>
        <div className="DAT_GR_Content">
          <GroupUsers
            addState={handleAddState}
            delState={handleDelState}
            editState={handleEditState}
            groupDelState={handleGroupDelState}
          />
        </div>
      </div>

      <div
        className="DAT_GroupCreate"
        style={{
          height: createState ? "100vh" : "0px",
          transition: "0.5s",
        }}
      >
        {createState ? (
          <CreateGroupRole handleClose={handleCloseCreate} />
        ) : (
          <></>
        )}
      </div>

      {popupState ? (
        <div className="DAT_EraseUserPopup">
          <Popup handleClose={handleCloseDel} />
        </div>
      ) : (
        <></>
      )}

      {addState ? (
        <div className="DAT_AddUserPopup">
          <AddUsers handleClose={handleCloseAdd} />
        </div>
      ) : (
        <></>
      )}

      {groupDelState ? (
        <div className="DAT_DeleteGroupPopup">
          <ConfirmDeleteGroup handleClose={handleCloseGroupDel} />
        </div>
      ) : (
        <></>
      )}

      {editState ? (
        <div className="DAT_EditGroup">
          <EditGroup handleClose={handleCloseEdit} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
