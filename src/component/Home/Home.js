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
import { useSelector } from "react-redux";
import { Token, partnerInfor, userInfor } from "../../App";
import { host } from "../Lang/Contant";
import { callApi } from "../Api/Api";
import { signal } from "@preact/signals-react";
import { get } from "lodash";
import axios from "axios";
import { useIntl } from "react-intl";
import { coalsave } from "../Project/ProjectData";
import { FaMoneyBill } from "react-icons/fa";

const plant = signal([])
const logger = signal([])
const usd = signal(24700);

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
  const [capacity, setCapacity] = useState(0)
  const [price, setPrice] = useState(0)
  const [production, setProduction] = useState(0)
  const [dailyproduction, setDailyProduction] = useState(0)
  const [monthlyproduction, setMonthlyProduction] = useState(0)
  const [yearlyproduction, setYearlyProduction] = useState(0)
  const [totalproduction, setTotalProduction] = useState(0)
  const dataLang = useIntl()
  const [chart, setChart] = useState('year')
  const [vmonth, setVmonth] = useState(dataLang.formatMessage({ id: 'monthOutputSmall' }));
  const [datamonth, setDatamonth] = useState([])
  const [vyear, setVyear] = useState(dataLang.formatMessage({ id: 'yearOutputSmall' }));
  const [datayear, setDatayear] = useState([])


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
      // console.log(d)
      if (d.status) {
        logger.value = d.data
        d.data.map(async (item) => {

          const res = await invtCloud('{"deviceCode":"' + item.psn + '"}', Token.value.token);
          // console.log(res)
          if (res.ret === 0) {
            //console.log(res.data)
            setInvt(pre => ({ ...pre, [item.psn]: res.data }))

          } else {
            setInvt(pre => ({ ...pre, [item.psn]: {} }))
          }

        })
      }
    }

    getPlant();
    getLogger();

  }, [])

  const handleChart = (e) => {
    console.log(e.target.id)
  }

  useEffect(() => {


    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;  // Tháng trong JavaScript bắt đầu từ 0 nên cần cộng thêm 1
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    //console.log(daysInMonth);
    let datamonth_ = []
    for (let i = 1; i <= daysInMonth; i++) {
      datamonth_ = [
        ...datamonth_,
        { date: i < 10 ? `0${i}` : `${i}`, [vmonth]: 0 }]
    }

    let datayear_ = []
    for (let i = 1; i <= 12; i++) {
      datayear_ = [
        ...datayear_,
        { month: i < 10 ? `0${i}` : `${i}`, [vyear]: 0 }]
    }




    let cap = []
    let sum_month = []
    let sum_year = []
    plant.value.map(async (item, i) => {

      let chart = await callApi('post', host.DATA + '/getMonthChart', {
        plantid: item.plantid,
        month: moment(new Date()).format("MM/YYYY"),
      })
      if (chart.status) {
        sum_month[i] = chart.data.data.map(item => item.value).reduce((a, b) => Number(a) + Number(b), 0)
        chart.data.data.map((item, j) => {
          let index = datamonth_.findIndex((d) => d.date == item.date)
          datamonth_[index][vmonth] = parseFloat(Number(datamonth_[index][vmonth]) + Number(item.value)).toFixed(2)
        })

      } else {
        sum_month[i] = 0
      }

      let chartY = await callApi('post', host.DATA + '/getYearChart', {
        plantid: item.plantid,
        year: moment(new Date()).format("YYYY"),
      })
      if (chartY.status) {
        sum_year[i] = chartY.data.data.map(item => item.value).reduce((a, b) => Number(a) + Number(b), 0)
        chartY.data.data.map((item, j) => {
          let index = datayear_.findIndex((d) => d.month == item.month)
          datayear_[index][vyear] = parseFloat(Number(datayear_[index][vyear]) + Number(item.value)).toFixed(2)
        })

      } else {
        sum_year[i] = 0
      }


      cap[i] = item.capacity
      if (i == plant.value.length - 1) {
        console.log(datamonth_, datayear_)
        setDatamonth(datamonth_)
        setDatayear(datayear_)



        let total_month = parseFloat(sum_month.reduce((a, b) => Number(a) + Number(b), 0)).toFixed(2);
        setMonthlyProduction(total_month)

        let total_year = parseFloat(sum_year.reduce((a, b) => Number(a) + Number(b), 0)).toFixed(2);
        setYearlyProduction(total_year)

        let total = parseFloat(cap.reduce((a, b) => Number(a) + Number(b), 0)).toFixed(2);
        setCapacity(total)
      }

    })

    var price = [];
    plant.value.map((itemplant, index) => {
      var sum_logger = [];
      let logger_ = logger.value.filter(data => data.pplantid == itemplant.plantid)
      //console.log(logger_)
      logger_.map((item, i) => {
        const type = (item.pdata.pro_3.type);
        const cal = JSON.parse(item.pdata.pro_3.cal);

        switch (type) {
          case "sum":
            break;
          case "word":
            let d = JSON.parse(item.pdata.pro_3.register);
            let e = [invt[item.psn]?.[d[0]] || 0, invt[item.psn]?.[d[1]]] || 0;

            const convertToDoublewordAndFloat = (word, type) => {
              var doubleword = ((word[1]) << 16) | (word[0]);
              var buffer = new ArrayBuffer(4);
              var intView = new Int32Array(buffer);
              var floatView = new Float32Array(buffer);
              intView[0] = doubleword;
              var float_value = floatView[0];

              return type === "int" ? parseFloat(doubleword).toFixed(2) : parseFloat(float_value).toFixed(2) || 0;
            }

            sum_logger[i] = convertToDoublewordAndFloat(e, "int");

            if (i == logger_.length - 1) {
              let total = parseFloat(sum_logger.reduce((accumulator, currentValue) => {
                return Number(accumulator) + Number(currentValue)
              }, 0) * parseFloat(cal)).toFixed(2);

              if (itemplant.currency == 'vnd') {
                price[index] = total * itemplant.price;
              } else {
                price[index] = total * itemplant.price * usd.value;
              }
            }
            break;
          default:
            break;
        }
      })



      if (index == plant.value.length - 1) {
        let total = parseFloat(price.reduce((accumulator, currentValue) => {
          return Number(accumulator) + Number(currentValue)
        }, 0)).toFixed(2);
        setPrice(total);
      }
    })


    var cal = {}
    var num_ = {
      bat_1: [],
      bat_2: [],
      bat_in_1: [],
      bat_out_1: [],
      con_1: [],
      con_2: [],
      grid_1: [],
      grid_in_1: [],
      grid_in_2: [],
      grid_out_1: [],
      grid_out_2: [],
      pro_1: [],
      pro_2: [],
      pro_3: []
    }
    logger.value.map((item, i) => {
      Object.entries(item.pdata).map(([key, value]) => {
        switch (value.type) {
          case "sum":
            let inum = [];
            let cal_ = JSON.parse(value.cal);
            Object.entries(value.register).map(([key, value]) => {
              let n = JSON.parse(value)
              inum[key] = parseFloat(invt[item.psn]?.[n[0]] || 0) * parseFloat(cal_[0]) * parseFloat(invt[item.psn]?.[n[1]] || 0) * parseFloat(cal_[1]);
            });

            num_[key][i] = inum.reduce((accumulator, currentValue) => {
              return Number(accumulator) + Number(currentValue)
            }, 0)
            if (i == logger.value.length - 1) {

              if (invt[item.psn]?.enabled == 1) {
                cal[key] = parseFloat(num_[key].reduce((accumulator, currentValue) => {
                  return Number(accumulator) + Number(currentValue)
                }, 0) / 1000).toFixed(2);
              } else {
                cal[key] = 0
              }

            }
            break;
          case "word":
            //console.log(key, value)
            let d = JSON.parse(value.register);
            let e = [invt[item.psn]?.[d[0]] || 0, invt[item.psn]?.[d[1]] || 0];

            const convertToDoublewordAndFloat = (word, type) => {
              var doubleword = ((word[1]) << 16) | (word[0]);
              var buffer = new ArrayBuffer(4);
              var intView = new Int32Array(buffer);
              var floatView = new Float32Array(buffer);
              intView[0] = doubleword;
              var float_value = floatView[0];
              return type === "int" ? parseFloat(doubleword).toFixed(2) : parseFloat(float_value).toFixed(2) || 0;
            }
            num_[key][i] = convertToDoublewordAndFloat(e, "int");

            if (i == logger.value.length - 1) {
              //console.log(num_)
              cal[key] = parseFloat(num_[key].reduce((accumulator, currentValue) => {
                return Number(accumulator) + Number(currentValue)
              }, 0) * parseFloat(value.cal)).toFixed(2);


            }

            break;
          default:
            num_[key][i] = parseFloat(invt[item.psn]?.[value.register] || 0) * parseFloat(value.cal);
            if (i == logger.value.length - 1) {
              //console.log(num_)
              cal[key] = parseFloat(num_[key].reduce((accumulator, currentValue) => {
                return accumulator + currentValue
              })).toFixed(2)
            }
            break;
        }
      })
    })
    //console.log(num_)
    setProduction(cal?.pro_1 || 0)
    setDailyProduction(cal?.pro_2 || 0)
    setTotalProduction(cal?.pro_3 || 0)

    coalsave.value = {
      ...coalsave.value,
      value: cal.pro_3
    }



  }, [invt])

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
                <div className="DAT_Home_Overview-Main-Percent-Item-value">
                  <div className="DAT_Home_Overview-Main-Percent-Item-value_num">
                    {parseFloat((production / capacity) * 100).toFixed(2)}
                  </div>
                  <div className="DAT_Home_Overview-Main-Percent-Item-value_unit">%</div>
                </div>
              </div>
            </div>
            <div className="DAT_Home_Overview-Main-Value">
              <div className="DAT_Home_Overview-Main-Value-Item">
                <div className="DAT_Home_Overview-Main-Value-Item-Title">
                  {dataLang.formatMessage({ id: 'totalPower' })}
                </div>
                <div>
                  <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>{production}</span>
                  &nbsp;
                  <span style={{ color: "gray", fontSize: "13px" }}>kW</span>
                </div>
              </div>
              <div className="DAT_Home_Overview-Main-Value-Item">
                <div className="DAT_Home_Overview-Main-Value-Item-Title">
                  {dataLang.formatMessage({ id: 'inCapacity' })}
                </div>
                <div>
                  <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>{capacity}</span>
                  &nbsp;
                  <span style={{ color: "gray", fontSize: "13px" }}>kWp</span>
                </div>
              </div>
            </div>
          </div>

          <div className="DAT_Home_Overview-Sub">
            <div className="DAT_Home_Overview-Sub-Item"
              style={{ backgroundColor: "rgba(68, 186, 255, 0.2)" }}
            >
              <div className="DAT_Home_Overview-Sub-Item-Title">
                {dataLang.formatMessage({ id: 'dailyOutputSmall' })}
              </div>
              <div>
                <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>{dailyproduction}</span>
                &nbsp;
                <span style={{ color: "gray", fontSize: "13px" }}>kwh</span>
              </div>
            </div>
            <div className="DAT_Home_Overview-Sub-Item"
              style={{ backgroundColor: "rgb(255, 68, 68,0.2)" }}
            >
              <div className="DAT_Home_Overview-Sub-Item-Title">
                {dataLang.formatMessage({ id: 'monthOutputSmall' })}
              </div>
              <div>
                <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>{monthlyproduction}</span>
                &nbsp;
                <span style={{ color: "gray", fontSize: "13px" }}>kwh</span>
              </div>
            </div>
            <div className="DAT_Home_Overview-Sub-Item"
              style={{ backgroundColor: "rgba(87, 250, 46, 0.2)" }}
            >
              <div className="DAT_Home_Overview-Sub-Item-Title">
                {dataLang.formatMessage({ id: 'yearOutputSmall' })}
              </div>
              <div>
                <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>{yearlyproduction}</span>
                &nbsp;
                <span style={{ color: "gray", fontSize: "13px" }}>kwh</span>
              </div>
            </div>
            <div className="DAT_Home_Overview-Sub-Item"
              style={{ backgroundColor: "rgba(255, 248, 51, 0.2)" }}
            >
              <div className="DAT_Home_Overview-Sub-Item-Title">
                {dataLang.formatMessage({ id: 'totalPower' })}
              </div>
              <div>
                <span style={{ color: "black", fontSize: "20px", fontWeight: "650", fontFamily: "sans-serif" }}>{totalproduction}</span>
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
                  backgroundColor: chart === "year" ? "#8adeff" : "white",
                  border: chart === "year" ? 'solid 1.5px rgb(6, 126, 255)' : "solid 1.5px gray",
                  color: chart === "year" ? "rgb(6, 126, 255)" : "gray",
                }}

                onClick={() => {
                  setChart("year");
                }}
              >
                {dataLang.formatMessage({ id: 'year' })}
              </span>
              <span
                style={{
                  backgroundColor: chart === "month" ? "#8adeff" : "white",
                  border: chart === "month" ? 'solid 1.5px rgb(6, 126, 255)' : "solid 1.5px gray",
                  color: chart === "month" ? "rgb(6, 126, 255)" : "gray",
                }}

                onClick={() => {
                  setChart("month");
                }}
              >
                {dataLang.formatMessage({ id: 'month' })}
              </span>
            </div>
            <div className="DAT_Home_History-Head-Datetime">
              {chart === "year" ? moment(new Date()).format("YYYY") : moment(new Date()).format("MM/YYYY")}
              {/* <input
                type="month"
                defaultValue={moment(new Date()).format("YYYY-MM")}
              ></input> */}
            </div>
          </div>

          <div className="DAT_Home_History-Chart">
            <div className="DAT_Home_History-Chart-label">
              <div className="DAT_Home_History-Chart-label-Unit">MWh</div>
              <div className="DAT_Home_History-Chart-label-Label">
                {dataLang.formatMessage({ id: 'monthOutputSmall' })}: {chart === "year" ? yearlyproduction : monthlyproduction} kWh
              </div>
            </div>
            <div className="DAT_Home_History-Chart-Content">
              {chart === "year" ?
                <ResponsiveContainer
                  style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                >
                  <BarChart width={150} height={200} data={datayear}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      shape={<TriangleBar />}
                      dataKey={vyear}
                      fill="#6495ed"
                      barSize={15}
                      legendType="circle"
                      style={{ fill: "#6495ed" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
                : <ResponsiveContainer
                  style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                >
                  <BarChart width={150} height={200} data={datamonth}>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      shape={<TriangleBar />}
                      dataKey={vmonth}
                      fill="#6495ed"
                      barSize={15}
                      legendType="circle"
                      style={{ fill: "#6495ed" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              }

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
              {/* <input
                type="month"
                defaultValue={moment(new Date()).format("YYYY-MM")}
              ></input> */}
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
                <div>
                  {parseFloat(coalsave.value.value * coalsave.value.ef).toFixed(2)}
                  &nbsp;
                  <span style={{ color: "grey", fontSize: "12px" }}>
                    t
                  </span>
                </div>
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
                <div>
                  {parseFloat(coalsave.value.value * coalsave.value.tree).toFixed(2)}
                  &nbsp;
                  <span style={{ color: "grey", fontSize: "12px" }}>
                    {dataLang.formatMessage({ id: 'tree' })}
                  </span>
                </div>
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
                <div>
                  {parseFloat(coalsave.value.value * coalsave.value.avr).toFixed(2)}
                  &nbsp;
                  <span style={{ color: "grey", fontSize: "12px" }}>
                    t
                  </span>
                </div>
              </div>
            </div>
            <div className="DAT_Home_Benefit_Content_Item">
              <div className="DAT_Home_Benefit_Content_Item_Icon">
                <FaMoneyBill size={24} color="#6495ed" />
              </div>
              <div className="DAT_Home_Benefit_Content_Item_Detail">
                <div style={{ fontSize: "14px", color: "grey" }}>
                  {dataLang.formatMessage({ id: 'totalRevenue' })}
                </div>
                <div>
                  {parseFloat((price) / 1000).toFixed(2)}
                  &nbsp;
                  <span style={{ color: "grey", fontSize: "12px" }}>
                    k{plant.value.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
