import React from 'react';
import './Home.scss'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaSolarPanel } from "react-icons/fa6";
import GoogleMap from "google-maps-react-markers";
import moment from "moment-timezone";
import { VscDashboard } from "react-icons/vsc";
import { IoIosArrowForward } from "react-icons/io";

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

    const defaultProps = {

        center: {
            lat: 16.054083398111068,
            lng: 108.20361013247235
        },
        zoom: 7.0
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
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey={v} fill="#6495ed" barSize={15} legendType='circle' style={{ fill: "#6495ed" }} />
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
            </div>
        </>

    );
}

export default Home;