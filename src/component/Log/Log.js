import React from 'react';
import './Log.scss';
import DataTable from "react-data-table-component";
import { CiSearch } from 'react-icons/ci';
import { TbSettingsCode } from 'react-icons/tb';
import { MdOutlineManageHistory } from "react-icons/md";
import { Empty } from '../Project/Project';
import { useIntl } from 'react-intl';

function Log(props) {
    const dataLang = useIntl()
    const paginationComponentOptions = {
        rowsPerPageText: dataLang.formatMessage({ id: 'row' }),
        rangeSeparatorText: dataLang.formatMessage({ id: 'to' }),
        selectAllRowsItem: true,
        selectAllRowsItemText: dataLang.formatMessage({ id: 'showAll' }),
    };

    const dataLog = [
        {
            id: 1,
            SN: "I0000145",
            type: "Inverter",
            config: 'Remote',
            state: true,
            operator: "Admin",
            runtime: "12/30/2023 12:07:12",
            response: "12/30/2023 12:07:50",
        },
        {
            id: 2,
            SN: "I0000012",
            type: "Inverter",
            config: 'Remote',
            state: true,
            operator: "Admin",
            runtime: "12/30/2023 13:00:12",
            response: "12/30/2023 13:01:50",
        },
        {
            id: 3,
            SN: "I0000001",
            type: "Inverter",
            config: 'Upgade',
            state: false,
            operator: "Admin",
            runtime: "12/30/2023 19:18:12",
            response: "12/30/2023 19:19:50",
        },
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


    const handleShowConfig = () => {

    }

    return (
        <>
            <div className="DAT_LogHeader">
                <div className="DAT_LogHeader_Title">
                    <MdOutlineManageHistory color="gray" size={25} /> <span>{dataLang.formatMessage({ id: 'log' })}</span>
                </div>
                <div className="DAT_LogHeader_Filter">
                    <input type="text" placeholder={dataLang.formatMessage({ id: 'enterDev' })} />
                    <CiSearch color="gray" size={20} />
                </div>
                {/* <button className="DAT_LogHeader_New" onClick={handleShowConfig}>
                    Cấu hình
                </button> */}
            </div>
            <div className='DAT_Log'>
                <div className='DAT_Log_Header' style={{ padding: "15px", backgroundColor: "rgba(233, 233, 233, 0.5)" }}>
                    {dataLang.formatMessage({ id: 'logList' })}
                </div>

                <div className="DAT_Log_Content">
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

export default Log;