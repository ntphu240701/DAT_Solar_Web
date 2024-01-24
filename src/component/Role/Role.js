import React from 'react';
import './Role.scss';
import DataTable from 'react-data-table-component';
import { FaUsers } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { Empty } from '../Project/Project';

function Role(props) {
    const paginationComponentOptions = {
        rowsPerPageText: 'Số hàng',
        rangeSeparatorText: 'đến',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'tất cả',
    };

    const datarole = [
        {
            id: 1,
            name: 'Trí Trần',
            email: 'tritran@datgroup.com.vn',
            phone: '--',
            role: 'View only',
            createdate: '05/01/2022 14:03:36',

        },
        {
            id: 2,
            name: 'Tiến Đỗ',
            email: 'tiendo@datgroup.com.vn',
            phone: '--',
            role: 'Edit',
            createdate: '12/25/2023 14:08:36',

        },
        {
            id: 3,
            name: 'Hiệp Solar',
            email: 'hiepsolar@datgroup.com.vn',
            phone: '--',
            role: 'Full',
            createdate: '01/17/2024 14:08:36',

        },

    ]

    const columnrole = [

        {
            name: 'Tên',
            selector: row => row.name,
            sortable: true,
            minWidth: "350px"
        },
        {
            name: 'phone',
            selector: row => row.phone,
            width: "100px"
        },
        {
            name: 'E-mail',
            selector: row => row.email,
            width: "210px",

        },
        {
            name: 'Phân quyền',
            selector: row => row.role,
            sortable: true,
            width: "160px"

        },

        {
            name: 'Ngày tạo',
            selector: row => row.createdate,
            sortable: true,
            width: "180px"
        },
        {
            name: 'Tùy chỉnh',
            selector: (row) => (<>
                <div className="DAT_TableEdit">
                    <span id={row.id + "_MORE"} onMouseEnter={e => handleModify(e, 'block')} >...</span>
                </div>


                <div className="DAT_ModifyBox" id={row.id + "_Modify"} style={{ display: "none" }} onMouseLeave={e => handleModify(e, 'none')}>
                    <div className="DAT_ModifyBox_Fix" >Chỉnh sửa</div>
                    <div className="DAT_ModifyBox_Remove" >Gỡ</div>
                </div>


            </>
            ),
            width: "100px"
        },

    ];
    const handleModify = (e, type) => {
        const id = e.currentTarget.id
        var arr = id.split("_")
        const mod = document.getElementById(arr[0] + "_Modify")
        mod.style.display = type
    }
    return (
        <>
            <div className='DAT_RoleHeader'>
                <div className='DAT_RoleHeader_Title'>
                    <FaUsers color='gray' size={25} /> <span>Phân quyền</span>
                </div>
                <div className='DAT_RoleHeader_Filter' >
                    <input type='text' placeholder='Nhập tên tài khoản' />
                    <CiSearch color='gray' size={20} />
                </div>
                <button className='DAT_RoleHeader_New'>
                    Tạo tài khoản mới
                </button>
            </div>
            <div className='DAT_Role'>
                <DataTable
                    className='DAT_Table_Container'
                    columns={columnrole}
                    data={datarole}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    fixedHeader={true}

                    noDataComponent={<Empty />}

                />
            </div>
        </>
    );
}

export default Role;