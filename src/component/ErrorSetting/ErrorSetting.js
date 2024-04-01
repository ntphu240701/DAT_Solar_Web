import React, { useEffect } from 'react';
import './ErrorSetting.scss';

import { Empty } from '../Project/Project';
import { useIntl } from 'react-intl';
import DataTable from "react-data-table-component";
import { IoMdMore } from "react-icons/io";
import { CiSearch } from 'react-icons/ci';
import { MdOutlineManageHistory } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function ErrorSetting(props) {
    const dataLang = useIntl()

    const paginationComponentOptions = {
        rowsPerPageText: dataLang.formatMessage({ id: 'row' }),
        rangeSeparatorText: dataLang.formatMessage({ id: 'to' }),
        selectAllRowsItem: true,
        selectAllRowsItemText: dataLang.formatMessage({ id: 'showAll' }),
    };

    const data = [
        {
            boxid: "A_1_3",
            viinfo: {
                cause: {
                    1: "Lỗi điều khiển",
                    2: "Lỗi chuột cắn",
                },
                solution: {
                    1: "Khôi phục cấu hình gốc",
                    2: "Mua Tom",
                },
            },
            enginfo: {
                cause: {
                    1: "Control Error",
                    2: "Jerry Error",
                },
                solution: {
                    1: "Return factory config",
                    2: "Buy Tom",
                },
            },
        },
    ];

    const handleModify = (e, type) => {
        const id = e.currentTarget.id;
        var arr = id.split("_");

        const mod = document.getElementById(arr[0] + "_Modify");
        mod.style.display = type;
    };

    const columnLog = [
        {
            name: "STT",
            selector: (row, index) => index + 1,
            sortable: true,
            width: "50px",
            style: {
                justifyContent: "left",
                height: "auto",
            }
        },
        {
            name: "Box ID",
            selector: (row) => row.boxid,
            sortable: true,
            width: "100px",
            style: {
                justifyContent: "left",
                height: "auto",
            }
        },
        //CAUSE VIETNAMESE
        {
            name: "Cause - Vietnamese",
            selector: (row) => {
                const temp = Object.entries(row.viinfo.cause).map((err, index) => err)
                console.log(temp.length);
                return (
                    <div style={{ height: "auto" }}>
                        {Object.entries(row.viinfo.cause).map((err, index) => {
                            return (
                                <div key={index}
                                    style={{
                                        display: "flex",
                                        padding: "8px 0",
                                        gap: "10px",
                                    }}>
                                    <div style={{ width: "150px" }}>
                                        {err[1]}
                                    </div>
                                    <FiEdit size={16} style={{ cursor: "pointer" }} />
                                    <IoTrashOutline size={16} style={{ cursor: "pointer" }} />
                                    {parseInt(err[0]) === temp.length ?
                                        <IoIosAddCircleOutline size={16} style={{ cursor: "pointer" }} /> : <></>}
                                </div>
                            );
                        })}
                    </div>
                )
            },
            style: {
                height: "auto",
            }
        },
        //CAUSE ENGLISH
        {
            name: "Cause - English",
            selector: (row) => {
                const temp = Object.entries(row.enginfo.cause).map((err, index) => err)
                console.log(temp.length);
                return (
                    <div style={{ height: "auto" }}>
                        {Object.entries(row.enginfo.cause).map((err, index) => {
                            return (
                                <div key={index}
                                    style={{
                                        display: "flex",
                                        padding: "8px 0",
                                        gap: "10px",
                                    }}>
                                    <div style={{ width: "150px" }}>
                                        {err[1]}
                                    </div>
                                    <FiEdit size={16} style={{ cursor: "pointer" }} />
                                    <IoTrashOutline size={16} style={{ cursor: "pointer" }} />
                                    {parseInt(err[0]) === temp.length ?
                                        <IoIosAddCircleOutline size={16} style={{ cursor: "pointer" }} /> : <></>}
                                </div>
                            );
                        })}
                    </div>
                )
            },
            style: {
                height: "auto",
            }
        },
        //SOLUTION VIETNAMESE
        {
            name: "Solution - Vietnamese",
            selector: (row) => {
                const temp = Object.entries(row.viinfo.solution).map((err, index) => err)
                console.log(temp.length);
                return (
                    <div style={{ height: "auto" }}>
                        {Object.entries(row.viinfo.solution).map((err, index) => {
                            return (
                                <div key={index}
                                    style={{
                                        display: "flex",
                                        padding: "8px 0",
                                        gap: "10px",
                                    }}>
                                    <div style={{ width: "150px" }}>
                                        {err[1]}
                                    </div>
                                    <FiEdit size={16} style={{ cursor: "pointer" }} />
                                    <IoTrashOutline size={16} style={{ cursor: "pointer" }} />
                                    {parseInt(err[0]) === temp.length ?
                                        <IoIosAddCircleOutline size={16} style={{ cursor: "pointer" }} /> : <></>}
                                </div>
                            );
                        })}
                    </div>
                )
            },
            style: {
                height: "auto",
            }
        },
        //SOLUTION ENGLISH
        {
            name: "Solution - English",
            selector: (row) => {
                const temp = Object.entries(row.enginfo.solution).map((err, index) => err)
                console.log(temp.length);
                return (
                    <div style={{ height: "auto" }}>
                        {Object.entries(row.enginfo.solution).map((err, index) => {
                            return (
                                <div key={index}
                                    style={{
                                        display: "flex",
                                        padding: "8px 0",
                                        gap: "10px",
                                    }}>
                                    <div style={{ width: "150px" }}>
                                        {err[1]}
                                    </div>
                                    <FiEdit size={16} style={{ cursor: "pointer" }} />
                                    <IoTrashOutline size={16} style={{ cursor: "pointer" }} />
                                    {parseInt(err[0]) === temp.length ?
                                        <IoIosAddCircleOutline size={16} style={{ cursor: "pointer" }} /> : <></>}
                                </div>
                            );
                        })}
                    </div>
                )
            },
            style: {
                height: "auto",
            }
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
                        <div
                            className="DAT_ModifyBox_Fix"
                            id={row.id_}
                        // onClick={(e) => handleEdit(e)}
                        >
                            <FiEdit size={14} />
                            &nbsp;
                            {dataLang.formatMessage({ id: "change" })}
                        </div>
                        <div
                            className="DAT_ModifyBox_Remove"
                            id={row.usr_}
                        // onClick={(e) => handleDelete_(e)}
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
                height: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }
        },
    ];

    useEffect(() => {

    }, [])

    const handleShowConfig = () => { }

    return (
        <>
            <div className="DAT_ErrSetting">
                <div className="DAT_ErrSetting_Title">
                    <MdOutlineManageHistory color="gray" size={25} /> <span>{dataLang.formatMessage({ id: 'errorsetting' })}</span>
                </div>
                <div className="DAT_ErrSetting_Filter">
                    <input type="text" placeholder={dataLang.formatMessage({ id: 'enterError' }) + "..."} />
                    <CiSearch color="gray" size={20} />
                </div>
                <div></div>
            </div>

            <div className='DAT_ErrSet'>
                <div className='DAT_ErrSet_Header' style={{ padding: "15px", backgroundColor: "rgba(233, 233, 233, 0.5)" }}>
                    {dataLang.formatMessage({ id: 'errlist' })}
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
        </>
    );
}
