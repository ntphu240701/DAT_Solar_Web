import React, { useEffect } from 'react';
import './ErrorSetting.scss';

import { Empty } from '../Project/Project';
import { useIntl } from 'react-intl';
import DataTable from "react-data-table-component";

import { IoMdMore, IoIosAddCircleOutline } from "react-icons/io";
import { CiSearch } from 'react-icons/ci';
import { MdOutlineManageHistory } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";

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

            cause: [
                { id: 1, vi: "...", en: "..." },
                { id: 2, vi: "xin chao", en: "hello" },
            ],
            solution: [
                { id: 1, vi: "...", en: "..." },
                { id: 2, vi: "Khôi phục cấu hình gốc", en: "Return factory config" },
            ]


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
        //CAUSE
        {
            name: "Cause (Vi-En)",
            selector: (row) => {
                let cause = row.cause.sort((a, b) => a.id - b.id);

                return (
                    <div style={{ height: "auto" }}>
                        {cause.map((err, index) => {
                            return (
                                <div key={err.id}
                                    style={{
                                        display: "flex",
                                        padding: "8px 0",
                                        gap: "10px",
                                    }}>
                                    <div style={{ width: "150px" }}>
                                        {err.vi}
                                    </div>
                                    <div style={{ width: "150px" }}>
                                        {err.en}
                                    </div>
                                    <FiEdit size={16} style={{ cursor: "pointer" }} id={`${err.boxid}_${err.id}_EDIT`} />
                                    <IoTrashOutline size={16} style={{ cursor: "pointer" }} id={`${err.boxid}_${err.id}_REMOVE`} />
                                    {parseInt(index) === cause.length - 1 ?
                                        <IoIosAddCircleOutline size={16} style={{ cursor: "pointer" }} id={`${err.id}_ADD`} /> : <></>}
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
        //SOLUTION
        {
            name: "Solution (Vi-En)",
            selector: (row) => {
                let solution = row.solution.sort((a, b) => a.id - b.id);

                return (
                    <div style={{ height: "auto" }}>
                        {solution.map((err, index) => {
                            return (
                                <div key={err.id}
                                    style={{
                                        display: "flex",
                                        padding: "8px 0",
                                        gap: "10px",
                                    }}>
                                    <div style={{ width: "150px" }}>
                                        {err.vi}
                                    </div>
                                    <div style={{ width: "150px" }}>
                                        {err.en}
                                    </div>
                                    <FiEdit size={16} style={{ cursor: "pointer" }} id={`${err.boxid}_${err.id}_EDIT`} />
                                    <IoTrashOutline size={16} style={{ cursor: "pointer" }} id={`${err.boxid}_${err.id}_REMOVE`} />
                                    {parseInt(index) === solution.length - 1 ?
                                        <IoIosAddCircleOutline size={16} style={{ cursor: "pointer" }} id={`${err.boxid}_${err.id}_ADD`} /> : <></>}
                                </div>
                            );
                        })}
                    </div>
                )
            },
            style: {
                height: "auto",
                justifyContent: "left",
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
