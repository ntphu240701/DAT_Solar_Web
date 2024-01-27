import React from 'react';
import './Log.scss';
import DataTable from "react-data-table-component";
import { CiSearch } from 'react-icons/ci';
import { TbSettingsCode } from 'react-icons/tb';
import { MdOutlineManageHistory } from "react-icons/md";
import { Empty } from '../Project/Project';

function Log(props) {

    const paginationComponentOptions = {
        rowsPerPageText: "Số hàng",
        rangeSeparatorText: "đến",
        selectAllRowsItem: true,
        selectAllRowsItemText: "tất cả",
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
            name: "Thiết bị",
            selector: (row) => row.SN,
            sortable: true,
            minWidth: "150px",
        },
        {
            name: "Loại",
            selector: (row) => row.type,
            width: "110px",
        },
        {
            name: "Cấu hình",
            selector: (row) => row.config,
            sortable: true,
            minWidth: "110px",
        },

        {
            name: "Tình trạng",
            selector: (row) => {
                if (row.state) {
                    return "Thành công"
                } else {
                    return "Thất bại"
                }
            },
            sortable: true,
            width: "140px",
        },
        {
            name: "Người vận hành",
            selector: (row) => row.operator,
            sortable: true,
            width: "150px",
        },
        {
            name: "Thời gian hoạt động",
            selector: (row) => row.runtime,
            sortable: true,
            width: "180px",
        },
        {
            name: "Thời gian phản hồi",
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
                    <MdOutlineManageHistory color="gray" size={25} /> <span>Nhật ký</span>
                </div>
                <div className="DAT_LogHeader_Filter">
                    <input type="text" placeholder="Nhập tên thiết bị" />
                    <CiSearch color="gray" size={20} />
                </div>
                <button className="DAT_LogHeader_New" onClick={handleShowConfig}>
                    Cấu hình
                </button>
            </div>
            <div className='DAT_Log'>
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