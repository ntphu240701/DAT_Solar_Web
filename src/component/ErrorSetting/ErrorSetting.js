import React, { useEffect, useRef, useState } from "react";
import "./ErrorSetting.scss";

import { Empty } from "../Project/Project";
import { useIntl } from "react-intl";
import DataTable from "react-data-table-component";
import CreateErrSetting from "./CreateErrSetting";
import EditErr from "./EditErr";

import { IoMdMore, IoIosAddCircleOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { MdOutlineManageHistory } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import RemoveErr from "./RemoveErr";
import { alertDispatch } from "../Alert/Alert";

export default function ErrorSetting(props) {
  const dataLang = useIntl();
  const [createState, setCreateState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [editType, setEditType] = useState("");
  const [removeState, setRemoveState] = useState(false);
  const [removeType, setRemoveType] = useState("");
  const [arrayData, setArrayData] = useState();
  const [data, setData] = useState([
    {
      boxid: "A_1_3",
      cause: [{ id: 1, vi: "Lỗi điều khiển", en: "Control system error" }],
      solution: [
        { id: 1, vi: "Khôi phục cấu hình gốc", en: "Return factory config" },
      ],
    },
  ]);
  const [editVi, setEditVi] = useState("");
  const [editEn, setEditEn] = useState("");
  const [editarray, setEditarray] = useState();

  const paginationComponentOptions = {
    rowsPerPageText: dataLang.formatMessage({ id: "row" }),
    rangeSeparatorText: dataLang.formatMessage({ id: "to" }),
    selectAllRowsItem: true,
    selectAllRowsItemText: dataLang.formatMessage({ id: "showAll" }),
  };

  const columnLog = [
    {
      name: dataLang.formatMessage({ id: "ordinalNumber" }),
      selector: (row, index) => index + 1,
      sortable: true,
      width: "50px",
      style: {
        justifyContent: "left",
        height: "auto !important",
      },
    },
    {
      name: dataLang.formatMessage({ id: "errcode" }),
      selector: (row) => row.boxid,
      sortable: true,
      width: "100px",
      style: {
        height: "auto !important",
        justifyContent: "left !important",
      },
    },
    //CAUSE
    {
      name: dataLang.formatMessage({ id: "causeViEn" }),
      selector: (row) => {
        let cause = row.cause.sort((a, b) => a.id - b.id);
        return (
          <div style={{ height: "auto" }}>
            {cause.map((err, index) => {
              return (
                <div
                  key={err.id}
                  style={{
                    display: "flex",
                    padding: "8px 0",
                    gap: "10px",
                  }}
                >
                  <div style={{ width: "150px" }}>{err.vi}</div>
                  <div style={{ width: "150px" }}>{err.en}</div>
                  <FiEdit
                    size={16}
                    style={{ cursor: "pointer" }}
                    id={`${row.boxid}-${err.id}-EDITCAUSE`}
                    onClick={(e) => handleEdit(e)}
                  />
                  <IoTrashOutline
                    size={16}
                    style={{ cursor: "pointer" }}
                    id={`${row.boxid}_${err.id}_REMOVECAUSE`}
                    onClick={(e) => handleDelete(e)}
                  />
                  {parseInt(index) === cause.length - 1 ? (
                    <IoIosAddCircleOutline
                      size={16}
                      style={{ cursor: "pointer" }}
                      id={`${row.boxid}-ADDCAUSE`}
                      onClick={(e) => handleAdd(e)}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        );
      },
      style: {
        height: "auto !important",
      },
    },
    //SOLUTION
    {
      name: dataLang.formatMessage({ id: "solutionViEn" }),
      selector: (row) => {
        let solution = row.solution.sort((a, b) => a.id - b.id);
        return (
          <div style={{ height: "auto" }}>
            {solution.map((err, index) => {
              return (
                <div
                  key={err.id}
                  style={{
                    display: "flex",
                    padding: "8px 0",
                    gap: "10px",
                  }}
                >
                  <div style={{ width: "150px" }}>{err.vi}</div>
                  <div style={{ width: "150px" }}>{err.en}</div>
                  <FiEdit
                    size={16}
                    style={{ cursor: "pointer" }}
                    id={`${row.boxid}-${err.id}-EDITSOLUTION`}
                    onClick={(e) => handleEdit(e)}
                  />
                  <IoTrashOutline
                    size={16}
                    style={{ cursor: "pointer" }}
                    id={`${row.boxid}_${err.id}_REMOVESOLUTION`}
                    onClick={(e) => handleDelete(e)}
                  />
                  {parseInt(index) === solution.length - 1 ? (
                    <IoIosAddCircleOutline
                      size={16}
                      style={{ cursor: "pointer" }}
                      id={`${row.boxid}-ADDSOLUTION`}
                      onClick={(e) => handleAdd(e)}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        );
      },
      style: {
        height: "auto !important",
        justifyContent: "left !important",
      },
    },
    //SETTING
    {
      name: dataLang.formatMessage({ id: "setting" }),
      selector: (row) => (
        <>
          {row.type_ === "master" ? (
            <></>
          ) : (
            <div className="DAT_TableEdit">
              <span
                id={row.id_ + "_MORE"}
                // onMouseEnter={(e) => handleModify(e, "block")}
                onClick={(e) => handleModify(e, "block")}
              >
                <IoMdMore size={20} />
              </span>
            </div>
          )}
          <div
            className="DAT_ModifyBox"
            id={row.id_ + "_Modify"}
            style={{ display: "none", marginRight: "4px", marginTop: "2px" }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            {/* <div
                            className="DAT_ModifyBox_Fix"
                            id={row.id_}
                        // onClick={(e) => handleEdit(e)}
                        >
                            <FiEdit size={14} />
                            &nbsp;
                            {dataLang.formatMessage({ id: "change" })}
                        </div> */}
            <div
              className="DAT_ModifyBox_Remove"
              id={row.boxid}
              onClick={(e) => handleDelete(e)}
            >
              <IoTrashOutline size={16} />
              &nbsp;
              {dataLang.formatMessage({ id: "remove" })}
            </div>
          </div>
        </>
      ),
      width: "100px",
      style: {
        height: "auto !important",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  ];

  const handleModify = (e, type) => {
    const id = e.currentTarget.id;
    var arr = id.split("_");

    const mod = document.getElementById(arr[0] + "_Modify");
    mod.style.display = type;
  };

  const handleCloseCreate = () => {
    setCreateState(false);
  };

  const handleConfirmCreate = (e, code, num1, num2) => {
    if (num1 === "" || num2 === "") {
      alertDispatch(dataLang.formatMessage({ id: "alert_17" }));
      e.preventDefault();
    } else {
      const t = data.find((item) => item.boxid === `${code}_${num1}_${num2}`); //{...}
      console.log(t);
      if (t !== undefined) {
        alertDispatch(dataLang.formatMessage({ id: "alert_49" }));
        e.preventDefault();
      } else {
        const newdata = {
          boxid: `${code}_${num1}_${num2}`,
          cause: [{ id: 1, vi: "Nguyên nhân 1", en: "Cause 1" }],
          solution: [{ id: 1, vi: "Giải pháp 1", en: "Solution 1" }],
        };
        setData([...data, newdata]);
        // console.log(data);
        setCreateState(false);
      }
    }
  };

  const handleEdit = (e) => {
    const arr = e.currentTarget.id.split("-");
    setEditarray(arr);
    // console.log(arr);
    switch (arr[2]) {
      case "EDITCAUSE":
        const index = data
          .find((item) => item.boxid === arr[0])
          .cause.findIndex((item) => item.id === parseInt(arr[1]));
        setEditVi(data.find((item) => item.boxid === arr[0]).cause[index].vi);
        setEditEn(data.find((item) => item.boxid === arr[0]).cause[index].en);
        break;
      case "EDITSOLUTION":
        const i = data
          .find((item) => item.boxid === arr[0])
          .solution.findIndex((item) => item.id === parseInt(arr[1]));
        setEditVi(data.find((item) => item.boxid === arr[0]).solution[i].vi);
        setEditEn(data.find((item) => item.boxid === arr[0]).solution[i].en);
    }

    setEditType(arr[2]);
    setEditState(true);
  };

  const confirmEdit = (editvi, editen) => {
    setEditState(false);
    console.log(editvi, editen);
    console.log(editarray);

    switch (editarray[2]) {
      case "EDITCAUSE":
        const index = data
          .find((item) => item.boxid === editarray[0])
          .cause.findIndex((item) => item.id === parseInt(editarray[1]));
        data.find((item) => item.boxid === editarray[0]).cause[index].vi =
          editvi;
        data.find((item) => item.boxid === editarray[0]).cause[index].en =
          editen;
        break;
      case "EDITSOLUTION":
        const i = data
          .find((item) => item.boxid === editarray[0])
          .solution.findIndex((item) => item.id === parseInt(editarray[1]));
        data.find((item) => item.boxid === editarray[0]).solution[i].vi =
          editvi;
        data.find((item) => item.boxid === editarray[0]).solution[i].en =
          editen;
    }
  };

  const handleCloseEdit = () => {
    setEditState(false);
  };

  const handleDelete = (e) => {
    let arr = e.currentTarget.id.split("_");
    console.log(arr);
    setArrayData(arr);
    setRemoveType(arr[4]);
    setRemoveState(true);
  };

  const confirmDelete = (e) => {
    const boxid = `${arrayData[0]}_${arrayData[1]}_${arrayData[2]}`;
    switch (arrayData[4]) {
      case "REMOVECAUSE":
        let tremovecause = data.find((item) => item.boxid === boxid);
        let indexcause = data.findIndex((item) => item.boxid === boxid);
        if (tremovecause.cause.length === 1) {
          alertDispatch(dataLang.formatMessage({ id: "alert_50" }));
          e.preventDefault();
        } else {
          const temp = tremovecause.cause.filter(
            (item) => item.id !== parseInt(arrayData[3])
          );
          tremovecause.cause = temp;
          data[indexcause] = tremovecause;
          console.log(data);
          setRemoveState(false);
        }
        break;
      case "REMOVESOLUTION":
        let tremovesolution = data.find((item) => item.boxid === boxid);
        let indexsolution = data.findIndex((item) => item.boxid === boxid);
        if (tremovesolution.solution.length === 1) {
          alertDispatch(dataLang.formatMessage({ id: "alert_51" }));
          e.preventDefault();
        } else {
          const temp = tremovesolution.solution.filter(
            (item) => item.id !== parseInt(arrayData[3])
          );
          tremovesolution.solution = temp;
          data[indexsolution] = tremovesolution;
          console.log(data);
          setRemoveState(false);
        }
        break;
      default:
        setData(data.filter((item) => item.boxid !== boxid));
        setRemoveState(false);
        break;
    }
  };

  const handleCloseRemove = () => {
    setRemoveState(false);
  };

  const handleAdd = (e) => {
    const arr = e.currentTarget.id.split("-");
    const bigdata = data;
    const index = bigdata.findIndex((item) => item.boxid === arr[0]);
    // console.log(arr);
    switch (arr[1]) {
      case "ADDCAUSE":
        const causelength = bigdata[index].cause.length;
        bigdata[index].cause = [
          ...bigdata[index].cause,
          {
            id: bigdata[index].cause[causelength - 1].id + 1,
            vi: `Nguyên nhân ${bigdata[index].cause[causelength - 1].id + 1}`,
            en: `Cause ${bigdata[index].cause[causelength - 1].id + 1}`,
          },
        ];
        setData([...bigdata]);

        break;
      case "ADDSOLUTION":
        const solutionlength = bigdata[index].solution.length;
        bigdata[index].solution = [
          ...bigdata[index].solution,
          {
            id: bigdata[index].solution[solutionlength - 1].id + 1,
            vi: `Giải pháp ${
              bigdata[index].solution[solutionlength - 1].id + 1
            }`,
            en: `Solution ${
              bigdata[index].solution[solutionlength - 1].id + 1
            }`,
          },
        ];
        setData([...bigdata]);
        console.log(bigdata);
        break;
      default:
        break;
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="DAT_ErrSetting">
        <div className="DAT_ErrSetting_Title">
          <MdOutlineManageHistory color="gray" size={25} />
          <span>{dataLang.formatMessage({ id: "errorsetting" })}</span>
        </div>

        <div className="DAT_ErrSetting_Filter">
          <input
            type="text"
            placeholder={dataLang.formatMessage({ id: "enterError" }) + "..."}
          />
          <CiSearch color="gray" size={20} />
        </div>

        <button
          className="DAT_ErrSetting_New"
          onClick={() => setCreateState(true)}
        >
          <span>
            <MdOutlineManageHistory color="white" size={20} />
            &nbsp;
            {dataLang.formatMessage({ id: "createNew" })}
          </span>
        </button>
      </div>

      <div className="DAT_ErrSet">
        <div className="DAT_ErrSet_Header">
          {dataLang.formatMessage({ id: "errlist" })}
        </div>

        <div className="DAT_ErrSet_Content">
          <DataTable
            className="DAT_Table_Container"
            columns={columnLog}
            data={data}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            fixedHeader={true}
            noDataComponent={<Empty />}
          />
        </div>
      </div>

      <div
        className="DAT_ErrSettingBG"
        style={{
          height: createState ? "100vh" : "0",
          transition: "0.5s",
        }}
      >
        {createState ? (
          <CreateErrSetting
            handleClose={handleCloseCreate}
            handleConfirm={handleConfirmCreate}
          />
        ) : (
          <></>
        )}
      </div>

      <div
        className="DAT_ErrSettingBG"
        style={{
          height: editState ? "100vh" : "0",
          transition: "0.5s",
        }}
      >
        {editState ? (
          <EditErr
            type={editType}
            handleClose={handleCloseEdit}
            editVi={editVi}
            editEn={editEn}
            confirmEdit={confirmEdit}
          />
        ) : (
          <></>
        )}
      </div>

      <div
        className="DAT_ErrSettingBG"
        style={{
          height: removeState ? "100vh" : "0",
          transition: "0.5s",
        }}
      >
        {removeState ? (
          <RemoveErr
            type={removeType}
            handleClose={handleCloseRemove}
            handleDel={handleDelete}
            confirmDel={confirmDelete}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
