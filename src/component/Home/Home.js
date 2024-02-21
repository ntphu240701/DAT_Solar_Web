import React from 'react';
import './Home.scss'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaSolarPanel, FaTree } from "react-icons/fa6";
import GoogleMap from "google-maps-react-markers";
import moment from "moment-timezone";
import { VscDashboard } from "react-icons/vsc";
import { IoIosArrowForward, IoIosCloud } from "react-icons/io";
import { Empty } from '../Project/Project';
import DataTable from 'react-data-table-component';
import { MdPermDataSetting } from 'react-icons/md';
import { RiMoneyCnyCircleFill } from 'react-icons/ri';

function Home(props) {

    const v = 'Sản lượng tháng'

    const data = [
        {
            name: '1',
            [v]: 1.69,

        },
        {
            name: '2',
            [v]: 0,

        },
        {
            name: '3',
            [v]: 0,

        },
        {
            name: '4',
            [v]: 0,

        },
        {
            name: '5',
            [v]: 0,

        },
        {
            name: '6',
            [v]: 0,

        },
        {
            name: '7',
            [v]: 0,

        },
        {
            name: '8',
            [v]: 0,

        },
        {
            name: '9',
            [v]: 0,

        },
        {
            name: '10',
            [v]: 0,

        },
        {
            name: '11',
            [v]: 0,

        },
        {
            name: '12',
            [v]: 0,

        },
    ];


    const paginationComponentOptions = {
        rowsPerPageText: "Số hàng",
        rangeSeparatorText: "đến",
        selectAllRowsItem: true,
        selectAllRowsItemText: "tất cả",
    };

    const dataHome = [
        {
            id: 1,
            name: "Năng lượng DAT 01",
            addr: " 716/6 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, Tp.HCM",
            status: true,
            warn: true,
            capacity: "110",
            production: "16",
            power: "14.54",
            lastupdate: "12/30/2023 12:07:12",
            createdate: "05/01/2022 14:03:36",
        },
        {
            id: 2,
            name: "Năng lượng DAT 02",
            addr: " 716/6 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, Tp.HCM",
            status: false,
            warn: false,
            capacity: "222",
            production: "230",
            power: "0",
            lastupdate: "10/30/2023 08:01:22",
            createdate: "05/01/2022 14:08:36",
        },
        {
            id: 3,
            name: "Năng lượng DAT 03",
            addr: " 716/6 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, Tp.HCM",
            status: false,
            warn: false,
            capacity: "333",
            production: "116",
            power: "0",
            lastupdate: "10/30/2023 08:01:22",
            createdate: "05/01/2022 14:08:36",
        },
    ];

    const columnHome = [
        {
            name: "Tên",
            selector: (row) => row.name,
            sortable: true,
            minWidth: "150px",
            style: {
                justifyContent: "left",
            }
        },
        {
            name: "Địa chỉ",
            selector: (row) => row.addr,
            width: "250px",
            style: {
                justifyContent: "left",
            }
        },

        {
            name: "kWh/kWp(h)",
            selector: (row) => row.production,
            sortable: true,
            width: "120px",
        },
    ];

    const defaultProps = {

        center: {
            lat: 16.054083398111068,
            lng: 108.20361013247235
        },
        zoom: 7.0
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
    
        return (
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={"rgb(4,143,255)"}
            rx="3"
            ry="3"
            opacity="1"
          ></rect>
        );
      };


    return (
        <>
            <div className='DAT_HomeHeader'>
                <div className='DAT_HomeHeader_Title'>
                    <VscDashboard color='gray' size={25} /> <span>Bảng điều khiển</span>
                </div>
            </div>

            <div className='DAT_Home'>
                <div className='DAT_Home_Overview' >
                    <div className='DAT_Home_Overview-Head'>
                        <div className='DAT_Home_Overview-Head-Title' >Tổng quan sản xuất</div>
                        <div className='DAT_Home_Overview-Head-Date' >{moment().format('DD/MM/YYYY')}</div>
                    </div>
                    <div className='DAT_Home_Overview-Main' >
                        <div className='DAT_Home_Overview-Main-Percent' >
                            <div className='DAT_Home_Overview-Main-Percent-Item'>0%</div>
                        </div>
                        <div className='DAT_Home_Overview-Main-Value'>
                            <div className='DAT_Home_Overview-Main-Value-Item' >
                                <div className='DAT_Home_Overview-Main-Value-Item-Title' >Công suất tức thời</div>
                                <div><span style={{ color: 'black', fontSize: '20px' }} >0</span> <span style={{ color: 'gray', fontSize: '13px' }}>w</span></div>
                            </div>
                            <div className='DAT_Home_Overview-Main-Value-Item'>
                                <div className='DAT_Home_Overview-Main-Value-Item-Title' >Công suất lắp đặt</div>
                                <div><span style={{ color: 'black', fontSize: '20px' }}>0</span> <span style={{ color: 'gray', fontSize: '13px' }}>kwp</span></div>
                            </div>
                        </div>
                    </div>
                    <div className='DAT_Home_Overview-Sub' >
                        <div className='DAT_Home_Overview-Sub-Item' style={{ backgroundColor: 'rgba(68, 186, 255, 0.2)' }} >
                            <div className='DAT_Home_Overview-Sub-Item-Title' >Sản lượng ngày</div>
                            <div><span style={{ color: 'black', fontSize: '20px' }}>0</span> <span style={{ color: 'gray', fontSize: '13px' }}>kwp</span></div>
                        </div>
                        <div className='DAT_Home_Overview-Sub-Item' style={{ backgroundColor: 'rgb(255, 68, 68,0.2)' }}>
                            <div className='DAT_Home_Overview-Sub-Item-Title' >Sản lượng tháng</div>
                            <div><span style={{ color: 'black', fontSize: '20px' }}>0</span> <span style={{ color: 'gray', fontSize: '13px' }}>kwp</span></div>
                        </div>
                        <div className='DAT_Home_Overview-Sub-Item' style={{ backgroundColor: 'rgba(87, 250, 46, 0.2)' }}>
                            <div className='DAT_Home_Overview-Sub-Item-Title' >Sản lượng năm</div>
                            <div><span style={{ color: 'black', fontSize: '20px' }}>0</span> <span style={{ color: 'gray', fontSize: '13px' }}>kwp</span></div>
                        </div>
                        <div className='DAT_Home_Overview-Sub-Item' style={{ backgroundColor: 'rgba(255, 248, 51, 0.2)' }}>
                            <div className='DAT_Home_Overview-Sub-Item-Title' >Tổng sản lượng</div>
                            <div><span style={{ color: 'black', fontSize: '20px' }}>0</span> <span style={{ color: 'gray', fontSize: '13px' }}>kwp</span></div>
                        </div>

                    </div>
                </div>
                <div className='DAT_Home_History' >
                    <div className='DAT_Home_History-Head'>
                        <div className='DAT_Home_History-Head-Title'>Lịch sử phát điện</div>
                        <div className='DAT_Home_History-Head-Option'>
                            <span style={{ backgroundColor: 'white', border: 'solid 1.5px gray', color: 'gray' }}>Tháng</span>
                            <span style={{ backgroundColor: '#8adeff', border: 'solid 1.5px rgb(6, 126, 255)', color: 'rgb(6, 126, 255)' }} >Năm</span>
                        </div>
                        <div className='DAT_Home_History-Head-Datetime'>
                            <input type='month' defaultValue={moment(new Date()).format("YYYY-MM")} ></input>
                        </div>
                    </div>



                    <div className='DAT_Home_History-Chart' >
                        <div className='DAT_Home_History-Chart-label'>
                            <div className='DAT_Home_History-Chart-label-Unit'>MWh</div>
                            <div className='DAT_Home_History-Chart-label-Label'>Sản lượng năm: 1.69 MWh</div>
                        </div>
                        <div className='DAT_Home_History-Chart-Content'>

                            <ResponsiveContainer style={{ width: "100%", height: "100%", marginLeft: "-20px" }}>
                                <BarChart width={150} height={200} data={data}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false}/>
                                    <YAxis axisLine={false} tickLine={false}/>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar shape={<TriangleBar />} dataKey={v} fill="#6495ed" barSize={15} legendType='circle' style={{ fill: "#6495ed" }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>


                    </div>


                </div>
                <div className='DAT_Home_State' >
                    <div className='DAT_Home_State-Title'>Trạng thái</div>
                    <div className='DAT_Home_State-Total'>
                        <div className='DAT_Home_State-Total-Icon'>
                            <FaSolarPanel color='#6495ed' />
                        </div>
                        <span style={{ color: 'gray', fontSize: '13px' }} >Tổng dự án:</span>
                        <span style={{ color: 'black', fontSize: '20px' }} >2</span>

                    </div>
                    <div className='DAT_Home_State-Content'>
                        <div className='DAT_Home_State-Content-Item'>
                            <div className='DAT_Home_State-Content-Item-Title' >Đang hoạt động</div>
                            <div><span style={{ color: 'black', fontSize: '20px' }}>1</span></div>
                        </div>
                        <div className='DAT_Home_State-Content-Item'>
                            <div className='DAT_Home_State-Content-Item-Title' >Đang ngoại tuyến</div>
                            <div><span style={{ color: 'black', fontSize: '20px' }}>1</span></div>
                        </div>

                    </div>
                    <div className='DAT_Home_State-Content'>

                        <div className='DAT_Home_State-Content-Item'>
                            <div className='DAT_Home_State-Content-Item-Title' >Chạy thử</div>
                            <div><span style={{ color: 'black', fontSize: '20px' }}>0</span></div>
                        </div>
                        <div className='DAT_Home_State-Content-Item'>
                            <div className='DAT_Home_State-Content-Item-Title' >Cảnh báo</div>
                            <div><span style={{ color: 'black', fontSize: '20px' }}>0</span></div>
                        </div>
                    </div>
                </div>
                <div className='DAT_Home_Distribution' >
                    {/* <div className='DAT_Home_Distribution-Title'>Vị trí</div> */}
                    <div className="DAT_Home_Distribution-Map">

                        <GoogleMap

                            apiKey={process.env.REACT_APP_GGKEY}

                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                        //onGoogleApiLoaded={onGoogleApiLoaded}
                        >
                        </GoogleMap>
                    </div>
                </div>
                <div className='DAT_Home_Rank' >
                    <div className='DAT_Home_Rank-Head'>
                        <div className='DAT_Home_Rank-Head-Title'>Giờ cao điểm</div>
                        <div className='DAT_Home_Rank-Head-Datetime'>
                            <input type='month' defaultValue={moment(new Date()).format("YYYY-MM")} ></input>
                        </div>

                    </div>
                    <div className='DAT_Home_Rank-Content'>
                        <DataTable
                            className="DAT_Table_Home"
                            columns={columnHome}
                            data={dataHome}
                            pagination
                            paginationComponentOptions={paginationComponentOptions}
                            fixedHeader={true}
                            noDataComponent={<Empty />}
                        />

                    </div>

                </div>

                <div className='DAT_Home_Benefit' >
                    <div className='DAT_Home_Benefit-Head'>
                        <div className='DAT_Home_Benefit-Head-Title'>Lợi ích kinh tế & môi trường</div>
                    </div>



                    <div className="DAT_Home_Benefit_Content">
                        <div className="DAT_Home_Benefit_Content_Item">
                            <div className="DAT_Home_Benefit_Content_Item_Icon">
                                <MdPermDataSetting size={24} color="#6495ed" />
                            </div>
                            <div className='DAT_Home_Benefit_Content_Item_Detail'>
                                <div style={{ fontSize: "14px", color: "grey" }}>
                                    Thang đo tiêu chuẩn
                                </div>
                                <div>--</div>
                            </div>
                        </div>
                        <div className="DAT_Home_Benefit_Content_Item">
                            <div className="DAT_Home_Benefit_Content_Item_Icon">
                                <FaTree size={24} color="#6495ed" />
                            </div>
                            <div className='DAT_Home_Benefit_Content_Item_Detail'>
                                <div style={{ fontSize: "14px", color: "grey" }}>
                                    Sản lượng cây trồng
                                </div>
                                <div>--</div>
                            </div>
                        </div>
                    </div>

                    <div className="DAT_Home_Benefit_Content">
                        <div className="DAT_Home_Benefit_Content_Item">
                            <div className="DAT_Home_Benefit_Content_Item_Icon">
                                <IoIosCloud size={24} color="#6495ed" />
                            </div>
                            <div className='DAT_Home_Benefit_Content_Item_Detail'>
                                <div style={{ fontSize: "14px", color: "grey" }}>
                                    Giảm khí thải CO₂
                                </div>
                                <div>--</div>
                            </div>
                        </div>
                        <div className="DAT_Home_Benefit_Content_Item">
                            <div className="DAT_Home_Benefit_Content_Item_Icon">
                                <RiMoneyCnyCircleFill size={24} color="#6495ed" />
                            </div>
                            <div className='DAT_Home_Benefit_Content_Item_Detail'>
                                <div style={{ fontSize: "14px", color: "grey" }}>
                                    Tổng sản lượng
                                </div>
                                <div>--</div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </>

    );
}

export default Home;