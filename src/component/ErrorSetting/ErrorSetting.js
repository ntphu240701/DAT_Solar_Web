import React from 'react';
import './ErrorSetting.scss';

import { Empty } from '../Project/Project';
import { useIntl } from 'react-intl';
import DataTable from "react-data-table-component";

import { CiSearch } from 'react-icons/ci';
import { MdOutlineManageHistory } from "react-icons/md";

export default function ErrorSetting(props) {
    const dataLang = useIntl()

    const paginationComponentOptions = {
        rowsPerPageText: dataLang.formatMessage({ id: 'row' }),
        rangeSeparatorText: dataLang.formatMessage({ id: 'to' }),
        selectAllRowsItem: true,
        selectAllRowsItemText: dataLang.formatMessage({ id: 'showAll' }),
    };

    const dataLog = [

    ];

    const columnLog = [
        {
            name: dataLang.formatMessage({ id: 'device' }),
            selector: (row) => row.SN,
            sortable: true,
            minWidth: "150px",
            style: {
                justifyContent: "left",
            }
        },
        {
            name: dataLang.formatMessage({ id: 'type' }),
            selector: (row) => row.type,
            width: "110px",
        },
        {
            name: dataLang.formatMessage({ id: 'config' }),
            selector: (row) => row.config,
            sortable: true,
            minWidth: "110px",
        },

        {
            name: dataLang.formatMessage({ id: 'status' }),
            selector: (row) => {
                if (row.state) {
                    return dataLang.formatMessage({ id: 'success' })
                } else {
                    return dataLang.formatMessage({ id: 'fail' })
                }
            },
            sortable: true,
            width: "140px",
        },
        {
            name: dataLang.formatMessage({ id: 'operator' }),
            selector: (row) => row.operator,
            sortable: true,
            width: "150px",
        },
        {
            name: dataLang.formatMessage({ id: 'runtime' }),
            selector: (row) => row.runtime,
            sortable: true,
            width: "180px",
        },
        {
            name: dataLang.formatMessage({ id: 'responseTime' }),
            selector: (row) => row.response,
            width: "180px",
        },
    ];

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
                        data={dataLog}
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
