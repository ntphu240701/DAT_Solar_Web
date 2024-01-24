import React from 'react';
import './Report.scss'
import { HiOutlineDocumentReport } from "react-icons/hi";
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from "react-icons/ri";
function Report(props) {

    const list = [
        {
            id: 1,
            name: 'Mẫu số 1',
            type: 'Daily Data Report',
            create: 'Trí Trần',
            date: '12/12/2022',
        },
        {
            id: 2,
            name: 'Test',
            type: 'Monthly Data Report',
            create: 'Trí Trần',
            date: '01/30/2023',
        },
        {
            id: 3,
            name: 'Tòa nhà DAT',
            type: 'Daily Data Report',
            create: 'Tiến Đỗ',
            date: '12/30/2023',
        },
        {
            id: 4,
            name: 'Tòa nhà DAT',
            type: 'Monthly Data Report',
            create: 'Tiến Đỗ',
            date: '12/30/2023',
        },
        {
            id: 5,
            name: 'Tòa nhà DAT',
            type: 'Yearly Data Report',
            create: 'Tiến Đỗ',
            date: '12/30/2023',
        },
        {
            id: 6,
            name: 'Mẫu Demo',
            type: 'Monthly Data Report',
            create: 'Hiệp Solar',
            date: '01/17/2024',
        }
    ]
    return (
        <>
            <div className='DAT_ReportHeader'>
                <div className='DAT_ReportHeader_Title'>
                    <HiOutlineDocumentReport color='gray' size={25} /> <span>Báo cáo</span>
                </div>
                <button className='DAT_ReportHeader_New'>
                    Tạo mẫu báo cáo
                </button>
            </div>
            <div className='DAT_Report'>
                <div className='DAT_Report_List'>

                    {list.map((item, i) => {
                        return (<div className='DAT_Report_List_Form' key={i}>
                            <div className='DAT_Report_List_Form_Title'>{item.name}</div>
                            <div className='DAT_Report_List_Form_Type'>Loại: {item.type}</div>
                            <div className='DAT_Report_List_Form_Create'>Tạo bởi: {item.create}</div>
                            <div className='DAT_Report_List_Form_Date'>Ngày tạo: {item.date}</div>
                            <div className='DAT_Report_List_Form_Custom'>
                                <div className='DAT_Report_List_Form_Custom_Edit'><CiEdit color='gray' size={20} /></div>
                                <div className='DAT_Report_List_Form_Custom_Report'><HiOutlineDocumentReport color='green' size={20} /></div>
                                <div className='DAT_Report_List_Form_Custom_Remove'><RiDeleteBin6Line color='red' size={20} /></div>
                            </div>
                        </div>
                        )
                    })
                    
                }
                </div>

            </div>
        </>
    );
}


export default Report;