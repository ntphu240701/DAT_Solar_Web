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
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";

export default function ErrorSetting(props) {
  const dataLang = useIntl();
  const [createState, setCreateState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [editType, setEditType] = useState("");
  const [removeState, setRemoveState] = useState(false);
  const [removeType, setRemoveType] = useState("");
  const [arrayData, setArrayData] = useState();
  const [data, setData] = useState([]);
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
      selector: (row) => row.boxid_,
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
        let cause = row.cause_.sort((a, b) => a.id - b.id);
        return (
          <div style={{ height: "auto" }}>
            {cause.map((err, index) => {
              return (
                <div
                  key={err.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 0",
                    gap: "20px",
                  }}
                >
                  <div className="DAT_TableText">{err.vi}</div>
                  <div className="DAT_TableText">{err.en}</div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "10px",
                    }}
                  >
                    <FiEdit
                      size={16}
                      style={{ cursor: "pointer" }}
                      id={`${row.boxid_}-${err.id}-EDITCAUSE`}
                      onClick={(e) => handleEdit(e)}
                    />
                    <IoTrashOutline
                      size={16}
                      style={{ cursor: "pointer" }}
                      id={`${row.boxid_}_${err.id}_REMOVECAUSE`}
                      onClick={(e) => handleDelete(e)}
                    />
                    {parseInt(index) === cause.length - 1 ? (
                      <IoIosAddCircleOutline
                        size={16}
                        style={{ cursor: "pointer" }}
                        id={`${row.boxid_}-ADDCAUSE`}
                        onClick={(e) => handleAdd(e)}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      },
      style: {
        minWidth: "200px",
        height: "auto !important",
        justifyContent: "center !important",
      },
    },
    //SOLUTION
    {
      name: dataLang.formatMessage({ id: "solutionViEn" }),
      selector: (row) => {
        let solution = row.solution_.sort((a, b) => a.id - b.id);
        return (
          <div style={{ height: "auto" }}>
            {solution.map((err, index) => {
              return (
                <div
                  key={err.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 0",
                    gap: "20px",
                  }}
                >
                  <div className="DAT_TableText">{err.vi}</div>
                  <div className="DAT_TableText">{err.en}</div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "10px",
                    }}
                  >
                    <FiEdit
                      size={16}
                      style={{ cursor: "pointer" }}
                      id={`${row.boxid_}-${err.id}-EDITSOLUTION`}
                      onClick={(e) => handleEdit(e)}
                    />
                    <IoTrashOutline
                      size={16}
                      style={{ cursor: "pointer" }}
                      id={`${row.boxid_}_${err.id}_REMOVESOLUTION`}
                      onClick={(e) => handleDelete(e)}
                    />
                    {parseInt(index) === solution.length - 1 ? (
                      <IoIosAddCircleOutline
                        size={16}
                        style={{ cursor: "pointer" }}
                        id={`${row.boxid_}-ADDSOLUTION`}
                        onClick={(e) => handleAdd(e)}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      },
      style: {
        minWidth: "200px",
        height: "auto !important",
        justifyContent: "center !important",
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
                id={row.warnid_ + "_MORE"}
                onClick={(e) => handleModify(e, "block")}
              >
                <IoMdMore size={20} />
              </span>
            </div>
          )}
          <div className="DAT_ModifyBox"
            id={row.warnid_ + "_Modify"}
            style={{ display: "none" }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            <div className="DAT_ModifyBox_Remove"
              id={row.boxid_}
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

  const handleConfirmCreate = async (e, code, num1, num2) => {
    e.preventDefault();
    if (num1 === "" || num2 === "") {
      alertDispatch(dataLang.formatMessage({ id: "alert_17" }));
    } else {
      const t = data.find((item) => item.boxid_ === `${code}_${num1}_${num2}`);
      if (t !== undefined) {
        alertDispatch(dataLang.formatMessage({ id: "alert_49" }));
      } else {
        let req = await callApi("post", `${host.DATA}/addWarnBox`, {
          boxid: `${code}_${num1}_${num2}`,
          cause: [{ id: 1, vi: "Nguyên nhân 1", en: "Cause 1" }],
          solution: [{ id: 1, vi: "Giải pháp 1", en: "Solution 1" }]
        })
        if (req.status) {
          const newdata = req.data;
          setData([...data, newdata]);
          setCreateState(false);
        }
      }
    }
  };

  const handleEdit = (e) => {
    const arr = e.currentTarget.id.split("-");
    setEditarray(arr);
    console.log(arr);
    switch (arr[2]) {
      case "EDITCAUSE":
        const index = data
          .find((item) => item.boxid_ === arr[0])
          .cause_.findIndex((item) => item.id === parseInt(arr[1]));
        setEditVi(data.find((item) => item.boxid_ === arr[0]).cause_[index].vi);
        setEditEn(data.find((item) => item.boxid_ === arr[0]).cause_[index].en);
        break;
      case "EDITSOLUTION":
        const i = data
          .find((item) => item.boxid_ === arr[0])
          .solution_.findIndex((item) => item.id === parseInt(arr[1]));
        setEditVi(data.find((item) => item.boxid_ === arr[0]).solution_[i].vi);
        setEditEn(data.find((item) => item.boxid_ === arr[0]).solution_[i].en);
        break;
      default:
        break;
    }

    setEditType(arr[2]);
    setEditState(true);
  };

  const confirmEdit = async (e, editvi, editen) => {
    e.preventDefault();
    switch (editarray[2]) {
      case "EDITCAUSE":
        const index = data
          .find((item) => item.boxid_ === editarray[0])
          .cause_.findIndex((item) => item.id === parseInt(editarray[1]));
        data.find((item) => item.boxid_ === editarray[0]).cause_[index].vi = editvi;
        data.find((item) => item.boxid_ === editarray[0]).cause_[index].en = editen;
        break;
      case "EDITSOLUTION":
        const i = data
          .find((item) => item.boxid_ === editarray[0])
          .solution_.findIndex((item) => item.id === parseInt(editarray[1]));
        data.find((item) => item.boxid_ === editarray[0]).solution_[i].vi = editvi;
        data.find((item) => item.boxid_ === editarray[0]).solution_[i].en = editen;
        break;
      default:
        break;
    }
    let req = await callApi("post", `${host.DATA}/updateWarnBox`, {
      boxid: editarray[0],
      cause: data.find((item) => item.boxid_ === editarray[0]).cause_,
      solution: data.find((item) => item.boxid_ === editarray[0]).solution_
    })
    console.log(req);
    if (req.status) {
      alertDispatch(dataLang.formatMessage({ id: "alert_6" }));
      setEditState(false);
    } else {
      alertDispatch(dataLang.formatMessage({ id: "alert_7" }));
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

  const confirmDelete = async (e) => {
    e.preventDefault();

    const boxid = `${arrayData[0]}_${arrayData[1]}_${arrayData[2]}`;
    switch (arrayData[4]) {
      case "REMOVECAUSE":
        let tremovecause = data.find((item) => item.boxid_ === boxid);
        let indexcause = data.findIndex((item) => item.boxid_ === boxid);
        if (tremovecause.cause_.length === 1) {
          alertDispatch(dataLang.formatMessage({ id: "alert_50" }));
        } else {
          const temp = tremovecause.cause_.filter(
            (item) => item.id !== parseInt(arrayData[3])
          );
          tremovecause.cause_ = temp;
          data[indexcause] = tremovecause;
        }
        let req1 = await callApi("post", `${host.DATA}/updateWarnBox`, {
          boxid: boxid,
          cause: data.find((item) => item.boxid_ === boxid).cause_,
          solution: data.find((item) => item.boxid_ === boxid).solution_
        })
        console.log(req1);
        if (req1.status) {
          setRemoveState(false);
        }
        break;
      case "REMOVESOLUTION":
        let tremovesolution = data.find((item) => item.boxid_ === boxid);
        let indexsolution = data.findIndex((item) => item.boxid_ === boxid);
        if (tremovesolution.solution_.length === 1) {
          alertDispatch(dataLang.formatMessage({ id: "alert_51" }));
        } else {
          const temp = tremovesolution.solution_.filter(
            (item) => item.id !== parseInt(arrayData[3])
          );
          tremovesolution.solution_ = temp;
          data[indexsolution] = tremovesolution;
          console.log(data);
        }
        let req2 = await callApi("post", `${host.DATA}/updateWarnBox`, {
          boxid: boxid,
          cause: data.find((item) => item.boxid_ === boxid).cause_,
          solution: data.find((item) => item.boxid_ === boxid).solution_
        })
        console.log(req2);
        if (req2.status) {
          setRemoveState(false);
        }
        break;
      default:
        let req = await callApi("post", `${host.DATA}/removeWarnBox`, {
          boxid: boxid,
        })
        if (req.status) {
          setData(data.filter((item) => item.boxid_ !== boxid));
          setRemoveState(false);
        }
        break;
    }
  };

  const handleCloseRemove = () => {
    setRemoveState(false);
  };

  const handleAdd = async (e) => {
    const arr = e.currentTarget.id.split("-");
    const bigdata = data;
    const index = bigdata.findIndex((item) => item.boxid_ === arr[0]);
    // console.log(arr);
    switch (arr[1]) {
      case "ADDCAUSE":
        const causelength = bigdata[index].cause_.length;
        bigdata[index].cause_ = [
          ...bigdata[index].cause_,
          {
            id: bigdata[index].cause_[causelength - 1].id + 1,
            vi: `Nguyên nhân ${bigdata[index].cause_[causelength - 1].id + 1}`,
            en: `Cause ${bigdata[index].cause_[causelength - 1].id + 1}`,
          },
        ];
        setData([...bigdata]);

        break;
      case "ADDSOLUTION":
        const solutionlength = bigdata[index].solution_.length;
        bigdata[index].solution_ = [
          ...bigdata[index].solution_,
          {
            id: bigdata[index].solution_[solutionlength - 1].id + 1,
            vi: `Giải pháp ${bigdata[index].solution_[solutionlength - 1].id + 1
              }`,
            en: `Solution ${bigdata[index].solution_[solutionlength - 1].id + 1
              }`,
          },
        ];
        setData([...bigdata]);
        console.log(bigdata);
        break;
      default:
        break;
    }
    await callApi("post", `${host.DATA}/updateWarnBox`, {
      boxid: arr[0],
      cause: data.find((item) => item.boxid_ === arr[0]).cause_,
      solution: data.find((item) => item.boxid_ === arr[0]).solution_
    })
  };

  useEffect(() => {
    const getWarnBox = async () => {
      let req = await callApi("get", `${host.DATA}/getWarnBox`, '')
      if (req.status) {
        let newData = req.data.sort((a, b) => a.warnid_ - b.warnid_);
        setData(newData);
      }
    };
    getWarnBox();
  }, []);

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

      {createState ? (
        <div className="DAT_ErrSettingBG">
          <CreateErrSetting
            handleClose={handleCloseCreate}
            handleConfirm={handleConfirmCreate}
          />
        </div>
      ) : (
        <></>
      )}

      {editState ? (
        <div className="DAT_ErrSettingBG">
          <EditErr
            type={editType}
            handleClose={handleCloseEdit}
            editVi={editVi}
            editEn={editEn}
            confirmEdit={confirmEdit}
          />
        </div>
      ) : (
        <></>
      )}

      {removeState ? (
        <div className="DAT_ErrSettingBG">
          <RemoveErr
            type={removeType}
            handleClose={handleCloseRemove}
            handleDel={handleDelete}
            confirmDel={confirmDelete}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
