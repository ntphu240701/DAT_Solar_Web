import React, { useEffect, useState } from "react";
import "./Home.scss";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaSolarPanel, FaTree } from "react-icons/fa6";
import GoogleMap from "google-maps-react-markers";
import moment from "moment-timezone";
import { VscDashboard } from "react-icons/vsc";
import { IoIosArrowForward, IoIosCloud } from "react-icons/io";
import { Empty } from "../Project/Project";
import DataTable from "react-data-table-component";
import { MdPermDataSetting } from "react-icons/md";
import { RiMoneyCnyCircleFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Token, partnerInfor, userInfor } from "../../App";
import { host } from "../Lang/Contant";
import { callApi } from "../Api/Api";
import { signal } from "@preact/signals-react";
import { get } from "lodash";
import axios from "axios";
import { useIntl } from "react-intl";

const plant = signal([])
const logger = signal([])

const AnyReactComponent = ({ text }) => {
  return (
    <div className="DAT_marker" >
      <div className="DAT_marker-bg" ></div>
      <div className="DAT_marker-lb" >{text}</div>

    </div>
  )
}


function Home(props) {
  const usr = useSelector((state) => state.admin.usr)
  const [total, setTotal] = useState(0)
  const [online, setOnline] = useState(0)
  const [offline, setOffline] = useState(0)
  const [trial, setTrial] = useState(0)
  const [warn, setWarn] = useState(0)
  const [invt, setInvt] = useState(0)
  const dataLang = useIntl()

  const v = dataLang.formatMessage({ id: 'monthOutput' });

  const data = [
    {
      name: "1",
      [v]: 1.69,
    },
    {
      name: "2",
      [v]: 0,
    },
    {
      name: "3",
      [v]: 0,
    },
    {
      name: "4",
      [v]: 0,
    },
    {
      name: "5",
      [v]: 0,
    },
    {
      name: "6",
      [v]: 0,
    },
    {
      name: "7",
      [v]: 0,
    },
    {
      name: "8",
      [v]: 0,
    },
    {
      name: "9",
      [v]: 0,
    },
    {
      name: "10",
      [v]: 0,
    },
    {
      name: "11",
      [v]: 0,
    },
    {
      name: "12",
      [v]: 0,
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: dataLang.formatMessage({ id: 'row' }),
    rangeSeparatorText: dataLang.formatMessage({ id: 'to' }),
    selectAllRowsItem: true,
    selectAllRowsItemText: dataLang.formatMessage({ id: 'showAll' }),
  };

  const columnHome = [
    {
      name: dataLang.formatMessage({ id: 'name' }),
      selector: (row) => row.plantname,
      sortable: true,
      minWidth: "150px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'address' }),
      selector: (row) => row.addr,
      width: "250px",
      style: {
        justifyContent: "left",
      },
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
      lat: 10.8356853,
      lng: 106.6271617,
    },
    zoom: 7.0,
  };

  const invtCloud = async (data, token) => {
    var reqData = {
      "data": data,
      "token": token
    };

    try {
      const response = await axios({
        url: host.CLOUD,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: Object.keys(reqData).map(function (key) { return encodeURIComponent(key) + '=' + encodeURIComponent(reqData[key]) }).join('&'),
      });

      return response.data
    } catch (e) {
      return ({ ret: 1, msg: "cloud err" })
    }
  }

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

  useEffect(() => {

    const getPlant = async () => {
      let d = await callApi('post', host.DATA + '/getPlant', {
        usr: usr,
        partnerid: partnerInfor.value.partnerid,
        type: userInfor.value.type,
      })
      //console.log(d)
      if (d.status === true) {
        plant.value = d.data
        setTotal(d.data.length)
        setOnline(d.data.filter(data => data.state == 1).length)
        setOffline(d.data.filter(data => data.state == 0).length)
        setWarn(d.data.filter(data => data.warn == 0).length)
      }
    }

    const getLogger = async () => {
      let d = await callApi('post', host.DATA + '/getallLogger', {
        usr: usr,
        partnerid: partnerInfor.value.partnerid,
        type: userInfor.value.type,
      })
      console.log(d)
      if (d.status) {
        d.data.map(async (item) => {

          const res = await invtCloud('{"deviceCode":"' + item.psn + '"}', Token.value.token);
          console.log(res)
          if (res.ret === 0) {
            //console.log(res.data)
            setInvt(pre => ({ ...pre, [item.sn]: res.data }))

          } else {
            setInvt(pre => ({ ...pre, [item.sn]: {} }))
          }

        })
      }
    }

    getPlant();
    getLogger();

  }, [])

  return (
    <>
      <div className="DAT_HomeHeader">
        <div className="DAT_HomeHeader_Title">
          <VscDashboard color="gray" size={25} /> <span>{dataLang.formatMessage({ id: 'dashboard' })}</span>
        </div>
      </div>

      <div className="DAT_Home">
        <div className="DAT_Home_Overview">
          <div className="DAT_Home_Overview-Head">
            <div className="DAT_Home_Overview-Head-Title">
              {dataLang.formatMessage({ id: 'overview' })}
            </div>
            {/* <div className="DAT_Home_Overview-Head-Date">
              Đã cập nhật: {moment().format("DD/MM/YYYY HH:mm:ss")}
            </div> */}
          </div>

          <div className="DAT_Home_Overview-Main">
            <div className="DAT_Home_Overview-Main-Percent">
              <div className="DAT_Home_Overview-Main-Percent-Item">
                <span style={{ height: "40px", display: "flex", alignItems: "flex-end" }}>
                  0
                </span>
                &nbsp;
                <span style={{ fontSize: "18px", color: "grey", height: "40px", display: "flex", alignItems: "flex-end", paddingBottom: "3px" }}>
                  %
                </span>
              </div>
            </div>
            <div className="DAT_Home_Overview-Main-Value">
              <div className="DAT_Home_Overview-Main-Value-Item">
                <div className="DAT_Home_Overview-Main-Value-Item-Title">
                  {dataLang.formatMessage({ id: 'totalPower' })}
                </div>
                <div>
                  <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>0</span>
                  &nbsp;
                  <span style={{ color: "gray", fontSize: "13px" }}>kW</span>
                </div>
              </div>
              <div className="DAT_Home_Overview-Main-Value-Item">
                <div className="DAT_Home_Overview-Main-Value-Item-Title">
                  {dataLang.formatMessage({ id: 'inCapacity' })}
                </div>
                <div>
                  <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>0</span>
                  &nbsp;
                  <span style={{ color: "gray", fontSize: "13px" }}>kWp</span>
                </div>
              </div>
            </div>
          </div>

          <div className="DAT_Home_Overview-Sub">
            <div
              className="DAT_Home_Overview-Sub-Item"
              style={{ backgroundColor: "rgba(68, 186, 255, 0.2)" }}
            >
              <div className="DAT_Home_Overview-Sub-Item-Title">
                {/* {dataLang.formatMessage({ id: 'electricOutputDay' })} */}
              </div>
              <div>
                <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>0</span>
                &nbsp;
                <span style={{ color: "gray", fontSize: "13px" }}>kwh</span>
              </div>
            </div>
            <div
              className="DAT_Home_Overview-Sub-Item"
              style={{ backgroundColor: "rgb(255, 68, 68,0.2)" }}
            >
              <div className="DAT_Home_Overview-Sub-Item-Title">
                {dataLang.formatMessage({ id: 'electricOutputMonth' })}
              </div>
              <div>
                <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>0</span>
                &nbsp;
                <span style={{ color: "gray", fontSize: "13px" }}>kwh</span>
              </div>
            </div>
            <div
              className="DAT_Home_Overview-Sub-Item"
              style={{ backgroundColor: "rgba(87, 250, 46, 0.2)" }}
            >
              <div className="DAT_Home_Overview-Sub-Item-Title">
                {dataLang.formatMessage({ id: 'electricOutputYear' })}
              </div>
              <div>
                <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>0</span>
                &nbsp;
                <span style={{ color: "gray", fontSize: "13px" }}>kwh</span>
              </div>
            </div>
            <div
              className="DAT_Home_Overview-Sub-Item"
              style={{ backgroundColor: "rgba(255, 248, 51, 0.2)" }}
            >
              <div className="DAT_Home_Overview-Sub-Item-Title">
                {dataLang.formatMessage({ id: 'totalElectricOutput' })}
              </div>
              <div>
                <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>0</span>
                &nbsp;
                <span style={{ color: "gray", fontSize: "13px" }}>kwh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="DAT_Home_History">
          <div className="DAT_Home_History-Head">
            <div className="DAT_Home_History-Head-Title">{dataLang.formatMessage({ id: 'history' })}</div>
            <div className="DAT_Home_History-Head-Option">
              <span
                style={{
                  backgroundColor: "white",
                  border: "solid 1.5px gray",
                  color: "gray",
                }}
              >
                {dataLang.formatMessage({ id: 'year' })}
              </span>
              <span
                style={{
                  backgroundColor: "#8adeff",
                  border: "solid 1.5px rgb(6, 126, 255)",
                  color: "rgb(6, 126, 255)",
                }}
              >
                {dataLang.formatMessage({ id: 'month' })}
              </span>
            </div>
            <div className="DAT_Home_History-Head-Datetime">
              <input
                type="month"
                defaultValue={moment(new Date()).format("YYYY-MM")}
              ></input>
            </div>
          </div>

          <div className="DAT_Home_History-Chart">
            <div className="DAT_Home_History-Chart-label">
              <div className="DAT_Home_History-Chart-label-Unit">MWh</div>
              <div className="DAT_Home_History-Chart-label-Label">
                {dataLang.formatMessage({ id: 'yearOutput' })}: 1.69 MWh
              </div>
            </div>
            <div className="DAT_Home_History-Chart-Content">
              <ResponsiveContainer
                style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
              >
                <BarChart width={150} height={200} data={data}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    shape={<TriangleBar />}
                    dataKey={v}
                    fill="#6495ed"
                    barSize={15}
                    legendType="circle"
                    style={{ fill: "#6495ed" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="DAT_Home_State">
          <div className="DAT_Home_State-Title">{dataLang.formatMessage({ id: 'projectStatus' })}</div>
          <div className="DAT_Home_State-Total">
            <div className="DAT_Home_State-Total-Icon">
              <FaSolarPanel color="#6495ed" />
            </div>
            <span style={{ color: "gray", fontSize: "13px" }}>
              {dataLang.formatMessage({ id: 'projectTotal' })}
            </span>
            <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>{total}</span>
          </div>
          <div className="DAT_Home_State-Content">
            <div className="DAT_Home_State-Content-Item">
              <div className="DAT_Home_State-Content-Item-Title">
                {dataLang.formatMessage({ id: 'online' })}
              </div>
              <div>
                <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>{online}</span>
              </div>
            </div>
            <div className="DAT_Home_State-Content-Item">
              <div className="DAT_Home_State-Content-Item-Title">
                {dataLang.formatMessage({ id: 'offline' })}
              </div>
              <div>
                <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>{offline}</span>
              </div>
            </div>
          </div>
          <div className="DAT_Home_State-Content">
            <div className="DAT_Home_State-Content-Item">
              <div className="DAT_Home_State-Content-Item-Title">
                {dataLang.formatMessage({ id: 'demo' })}
              </div>
              <div>
                <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>{trial}</span>
              </div>
            </div>
            <div className="DAT_Home_State-Content-Item">
              <div className="DAT_Home_State-Content-Item-Title">
                {dataLang.formatMessage({ id: 'projectWarn' })}
              </div>
              <div>
                <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>{warn}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="DAT_Home_Distribution">
          {/* <div className='DAT_Home_Distribution-Title'>Vị trí</div> */}
          <div className="DAT_Home_Distribution-Map">
            <GoogleMap
              apiKey={process.env.REACT_APP_GGKEY}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            //onGoogleApiLoaded={onGoogleApiLoaded}

            >
              {plant.value.map((item, index) => {
                return (
                  <AnyReactComponent
                    key={item.plantid}
                    lat={parseFloat(item.lat)}
                    lng={parseFloat(item.long)}
                    text={item.plantname}
                    markerId={item.plantid}
                  />
                )
              })}
            </GoogleMap>
          </div>
        </div>

        <div className="DAT_Home_Rank">
          <div className="DAT_Home_Rank-Head">
            <div className="DAT_Home_Rank-Head-Title">
              {dataLang.formatMessage({ id: 'rushhour' })}
            </div>
            <div className="DAT_Home_Rank-Head-Datetime">
              <input
                type="month"
                defaultValue={moment(new Date()).format("YYYY-MM")}
              ></input>
            </div>
          </div>
          <div className="DAT_Home_Rank-Content">
            <DataTable
              className="DAT_Table_Home"
              columns={columnHome}
              data={plant.value}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              fixedHeader={true}
              noDataComponent={<Empty />}
            />
          </div>
        </div>

        <div className="DAT_Home_Benefit">
          <div className="DAT_Home_Benefit-Head">
            <div className="DAT_Home_Benefit-Head-Title">
              {dataLang.formatMessage({ id: 'environment' })}
            </div>
          </div>

          <div className="DAT_Home_Benefit_Content">
            <div className="DAT_Home_Benefit_Content_Item">
              <div className="DAT_Home_Benefit_Content_Item_Icon">
                <MdPermDataSetting size={24} color="#6495ed" />
              </div>
              <div className="DAT_Home_Benefit_Content_Item_Detail">
                <div style={{ fontSize: "14px", color: "grey" }}>
                  {dataLang.formatMessage({ id: 'coalSave' })}
                </div>
                <div>--</div>
              </div>
            </div>
            <div className="DAT_Home_Benefit_Content_Item">
              <div className="DAT_Home_Benefit_Content_Item_Icon">
                <FaTree size={24} color="#6495ed" />
              </div>
              <div className="DAT_Home_Benefit_Content_Item_Detail">
                <div style={{ fontSize: "14px", color: "grey" }}>
                  {dataLang.formatMessage({ id: 'cropYield' })}
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
              <div className="DAT_Home_Benefit_Content_Item_Detail">
                <div style={{ fontSize: "14px", color: "grey" }}>
                  {dataLang.formatMessage({ id: 'C02' })}
                </div>
                <div>--</div>
              </div>
            </div>
            <div className="DAT_Home_Benefit_Content_Item">
              <div className="DAT_Home_Benefit_Content_Item_Icon">
                <RiMoneyCnyCircleFill size={24} color="#6495ed" />
              </div>
              <div className="DAT_Home_Benefit_Content_Item_Detail">
                <div style={{ fontSize: "14px", color: "grey" }}>
                  {dataLang.formatMessage({ id: 'totalRevenue' })}
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
