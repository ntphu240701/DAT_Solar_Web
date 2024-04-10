import React, { useEffect, useState } from "react";
import "./Device.scss";

import { info, tab } from "./Device";
import { useIntl } from "react-intl";
import DatePicker from "react-datepicker";
import PopupState, { bindHover, bindPopper } from "material-ui-popup-state";
import { Fade, Paper, Popper, Typography } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DataTable from "react-data-table-component";
import { Empty } from "../Project/Project";
import moment from "moment-timezone";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line, Legend, } from "recharts";
import { signal } from "@preact/signals-react";

import { IoCalendarOutline, IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { isMobile } from "../Navigation/Navigation";
import { CiSearch } from "react-icons/ci";

const data = [
  {
    //   senttime: "2021-09-01 00:00:00",
    //   name: "Grid Start Settings",
    //   type: "Setting",
    //   input: "--",
    //   result: "264.5 V",
    //   state: "Succeeded",
    //   reason: "--",
    //   operator: "Datsolar",
    //   feedbacktime: "2021-09-01 00:00:00",
  },
];

const data_ = [
  {
    //   upgradedtime: "2021-09-01 00:00:00",
    //   package: "Grid Start Settings",
    //   target: "Setting",
    //   related: "--",
    //   state: "Succeeded",
    //   result: "264.5 V",
    //   reason: "--",
    //   operator: "Datsolar",
    //   feedbacktime: "2021-09-01 00:00:00",
  },
];

const viewNav = signal(false);
const viewStateNav = signal([false, false]);

const BasicInformation = (props) => {
  const dataLang = useIntl();
  const [display, setDisplay] = useState(true);

  return (
    <div className="DAT_Info_Databox" id="Basic Information">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'basicInfo' })}</div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <div className="DAT_Info_Databox_Content">
            {(() => {
              switch (tab.value) {
                case 'logger':
                  return (
                    <>
                      <div className="DAT_Info_Databox_Content_Column">
                        <p>SN: {info.value.psn}</p>
                        {/* <p>Sản lượng hàng ngày: {info.value.dailyproduction}</p> */}
                      </div>
                      <div className="DAT_Info_Databox_Content_Column">
                        <p>{dataLang.formatMessage({ id: 'name' })}: {info.value.pname}</p>
                      </div>
                      <div className="DAT_Info_Databox_Content_Column">
                        <p>{dataLang.formatMessage({ id: 'project' })}: {info.value.pplantname}</p>
                        {/* <p>Sản lượng: {info.value.production}</p> */}
                        {/* <p>Cập nhật mới nhất: {info.value.updated}</p> */}
                      </div>
                    </>
                  )
                case 'inverter':
                  return (
                    <>
                      <div className="DAT_Info_Databox_Content_Column">
                        <p>SN: {info.value.psn}</p>
                        {/* <p>Sản lượng hàng ngày: {info.value.dailyproduction}</p> */}
                      </div>
                      <div className="DAT_Info_Databox_Content_Column">
                        <p>{dataLang.formatMessage({ id: 'name' })}: {info.value.pname}</p>
                      </div>
                      <div className="DAT_Info_Databox_Content_Column">
                        <p>{dataLang.formatMessage({ id: 'project' })}: {info.value.pplantname}</p>
                        {/* <p>Sản lượng: {info.value.production}</p> */}
                        {/* <p>Cập nhật mới nhất: {info.value.updated}</p> */}
                      </div>
                    </>
                  )
                default:
                  <></>
              }
            })()}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const VersionInformation = (props) => {
  const dataLang = useIntl()

  const [display, setDisplay] = useState(true);

  return (
    <div className="DAT_Info_Databox" id="Version Information">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">
          {dataLang.formatMessage({ id: 'versionInfo' })}
        </div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <div className="DAT_Info_Databox_Content">
            {(() => {
              switch (tab.value) {
                case 'logger':
                  return (
                    <div className="DAT_Info_Databox_Content_Column">
                      <p>
                        {dataLang.formatMessage({ id: 'moduleVersion' })}: {info.value.pversion}
                      </p>
                    </div>
                  )
                case 'inverter':
                  return (
                    <>
                      <div className="DAT_Info_Databox_Content_Column">
                        <p>
                          {dataLang.formatMessage({ id: 'masterVersion' })}: {`${info.value.invt[info.value.pdata.masterver.register]?.[0] || 0}.${info.value.invt[info.value.pdata.masterver.register]?.[1] || 0}.${info.value.invt[info.value.pdata.masterver.register]?.[2] || 0}`}
                        </p>
                      </div>
                      <div className="DAT_Info_Databox_Content_Column">
                        <p>
                          {dataLang.formatMessage({ id: 'viceVersion' })}: {`${info.value.invt[info.value.pdata.vicever.register]?.[0] || 0}.${info.value.invt[info.value.pdata.vicever.register]?.[1] || 0}.${info.value.invt[info.value.pdata.vicever.register]?.[2] || 0}`}
                        </p>
                      </div>
                      <div className="DAT_Info_Databox_Content_Column">
                        <p>
                          {dataLang.formatMessage({ id: 'hmiVersion' })}: {`${info.value.invt[info.value.pdata.hmiver.register]?.[0] || 0}.${info.value.invt[info.value.pdata.hmiver.register]?.[1] || 0}.${info.value.invt[info.value.pdata.hmiver.register]?.[2] || 0}`}
                        </p>
                      </div>
                    </>
                  )
                default:
                  <></>
              }
            })()}

          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const OperationInformation = (props) => {
  const dataLang = useIntl()

  const [display, setDisplay] = useState(true);

  return (
    <div className="DAT_Info_Databox" id="Version Information">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">
          {dataLang.formatMessage({ id: 'operationInfo' })}
        </div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <div className="DAT_Info_Databox_Content">
            <div className="DAT_Info_Databox_Content_Column">
              <p>{dataLang.formatMessage({ id: 'dataUpload' })}: 5m</p>
              <p>{dataLang.formatMessage({ id: 'signalStrength' })}: 74</p>
            </div>
            <div className="DAT_Info_Databox_Content_Column">
              <p>{dataLang.formatMessage({ id: 'dataAcquisition' })}: 60s</p>
              <p>{dataLang.formatMessage({ id: 'moduleMac' })}: F0FE6B2D42F6</p>
            </div>
            <div className="DAT_Info_Databox_Content_Column">
              <p>{dataLang.formatMessage({ id: 'maxDevices' })}: 1 </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const ElectricityGeneration = (props) => {
  const dataLang = useIntl()
  const [display, setDisplay] = useState(true);

  const dataAC = [
    {
      ac: "R",
      voltage: parseFloat(info.value.invt[info.value.pdata.pha.voltage.register] * info.value.pdata.pha.voltage.cal).toFixed(2) + " V",
      current: parseFloat(info.value.invt[info.value.pdata.pha.current.register] * info.value.pdata.pha.current.cal).toFixed(2) + " A",
      frequency: parseFloat(info.value.invt[info.value.pdata.fre.register] * info.value.pdata.fre.cal).toFixed(2) + " Hz",
    },
    {
      ac: "S",
      voltage: parseFloat(info.value.invt[info.value.pdata.phb.voltage.register] * info.value.pdata.phb.voltage.cal).toFixed(2) + " V",
      current: parseFloat(info.value.invt[info.value.pdata.phb.current.register] * info.value.pdata.phb.current.cal).toFixed(2) + " A",
      frequency: "--",
    },
    {
      ac: "T",
      voltage: parseFloat(info.value.invt[info.value.pdata.phc.voltage.register] * info.value.pdata.phc.voltage.cal).toFixed(2) + " V",
      current: parseFloat(info.value.invt[info.value.pdata.phc.current.register] * info.value.pdata.phc.current.cal).toFixed(2) + " A",
      frequency: "--",
    },
  ];

  const dataTemp = [
    {
      dc: "PV1",
      voltage: parseFloat(info.value.invt[info.value.pdata.pv1.voltage.register] * info.value.pdata.pv1.voltage.cal).toFixed(2) + " V",
      current: parseFloat(info.value.invt[info.value.pdata.pv1.current.register] * info.value.pdata.pv1.current.cal).toFixed(2) + " A",
      power: parseFloat(((info.value.invt[info.value.pdata.pv1.voltage.register] * info.value.pdata.pv1.voltage.cal) * (info.value.invt[info.value.pdata.pv1.current.register] * info.value.pdata.pv1.current.cal)) / 1000).toFixed(2) + " kW",
    },
    {
      dc: "PV2",
      voltage: parseFloat(info.value.invt[info.value.pdata.pv2.voltage.register] * info.value.pdata.pv2.voltage.cal).toFixed(2) + " V",
      current: parseFloat(info.value.invt[info.value.pdata.pv2.current.register] * info.value.pdata.pv2.current.cal).toFixed(2) + " A",
      power: parseFloat(((info.value.invt[info.value.pdata.pv2.voltage.register] * info.value.pdata.pv2.voltage.cal) * (info.value.invt[info.value.pdata.pv2.current.register] * info.value.pdata.pv2.current.cal)) / 1000).toFixed(2) + " kW",
    },
    {
      dc: "PV3",
      voltage: parseFloat(info.value.invt[info.value.pdata.pv3.voltage.register] * info.value.pdata.pv3.voltage.cal).toFixed(2) + " V",
      current: parseFloat(info.value.invt[info.value.pdata.pv3.current.register] * info.value.pdata.pv3.current.cal).toFixed(2) + " A",
      power: parseFloat(((info.value.invt[info.value.pdata.pv3.voltage.register] * info.value.pdata.pv3.voltage.cal) * (info.value.invt[info.value.pdata.pv3.current.register] * info.value.pdata.pv3.current.cal)) / 1000).toFixed(2) + " kW",
    },
    {
      dc: "PV4",
      voltage: parseFloat(info.value.invt[info.value.pdata.pv4.voltage.register] * info.value.pdata.pv4.voltage.cal).toFixed(2) + " V",
      current: parseFloat(info.value.invt[info.value.pdata.pv4.current.register] * info.value.pdata.pv4.current.cal).toFixed(2) + " A",
      power: parseFloat(((info.value.invt[info.value.pdata.pv4.voltage.register] * info.value.pdata.pv4.voltage.cal) * (info.value.invt[info.value.pdata.pv4.current.register] * info.value.pdata.pv4.current.cal)) / 1000).toFixed(2) + " kW",
    },
    // {
    //   dc: "PV5",
    //   voltage: "0 V",
    //   current: "0 A",
    //   power: "1.3763 kW",
    // },
    // {
    //   dc: "PV6",
    //   voltage: "0 V",
    //   current: "0 A",
    //   power: "1.3763 kW",
    // },
    // {
    //   dc: "PV7",
    //   voltage: "0 V",
    //   current: "0 A",
    //   power: "1.3763 kW",
    // },
    // {
    //   dc: "PV8",
    //   voltage: "0 V",
    //   current: "0 A",
    //   power: "1.3763 kW",
    // },
  ];

  return (
    <div className="DAT_Info_Databox" id="Electricity Generation">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'ElectricityGeneration' })}</div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <>
            <div className="DAT_Info_Databox_Content">
              <div className="DAT_Info_Databox_Content_ColumnElec">
                <div className="DAT_Info_Databox_Content_ColumnElec_Head">
                  <p>DC</p>
                  <p>{dataLang.formatMessage({ id: 'voltage' })}</p>
                  <p>{dataLang.formatMessage({ id: 'current' })}</p>
                  <p>{dataLang.formatMessage({ id: 'powerFactor' })}</p>
                </div>
                {dataTemp.map((item, index) => {
                  return (
                    <div key={index} className="DAT_Info_Databox_Content_ColumnElec_Body">
                      <p>{item.dc}</p>
                      <p>{item.voltage}</p>
                      <p>{item.current}</p>
                      <p>{item.power}</p>
                    </div>
                  );
                })}
              </div>
              <div className="DAT_Info_Databox_Content_ColumnElec">
                <div className="DAT_Info_Databox_Content_ColumnElec_Art">
                  <div className="DAT_Info_Databox_Content_ColumnElec_Art_BarLeft"></div>
                  <div className="DAT_Info_Databox_Content_ColumnElec_Art_Icon">
                    DC/AC
                  </div>
                  <div className="DAT_Info_Databox_Content_ColumnElec_Art_BarRight"></div>
                </div>
              </div>
              <div className="DAT_Info_Databox_Content_ColumnElec">
                <div className="DAT_Info_Databox_Content_ColumnElec_Head">
                  <p>AC</p>
                  <p>{dataLang.formatMessage({ id: 'voltage' })}</p>
                  <p>{dataLang.formatMessage({ id: 'current' })}</p>
                  <p>{dataLang.formatMessage({ id: 'frequencyInv' })}</p>
                </div>
                {dataAC.map((item, index) => {
                  return (
                    <div key={index} className="DAT_Info_Databox_Content_ColumnElec_Body">
                      <p>{item.ac}</p>
                      <p>{item.voltage}</p>
                      <p>{item.current}</p>
                      <p>{item.frequency}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <div className="DAT_Info_Databox_Content">
              <div className="DAT_Info_Databox_Content_ColumnElec">
                <p>String Input Current1：0.54 A</p>
                <p>String Input Current1：0.54 A</p>
                <p>String Input Current1：0.54 A</p>
                <p>String Input Current1：0.54 A</p>
                <p>String Input Current1：0.54 A</p>
              </div>
              <div className="DAT_Info_Databox_Content_ColumnElec">
                <p>String Input Current1：0.54 A</p>
                <p>String Input Current1：0.54 A</p>
                <p>String Input Current1：0.54 A</p>
                <p>String Input Current1：0.54 A</p>
                <p>String Input Current1：0.54 A</p>
              </div>
              <div className="DAT_Info_Databox_Content_ColumnElec">
                <p>String Input Current1：0.54 A</p>
                <p>String Input Current1：0.54 A</p>
                <p>String Input Current1：0.54 A</p>
                <p>String Input Current1：0.54 A</p>
                <p>String Input Current1：0.54 A</p>
              </div>
            </div> */}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const PowerGrid = (props) => {
  const [display, setDisplay] = useState(true);

  return (
    <div className="DAT_Info_Databox" id="PowerGrid">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">Mạng lưới điện</div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>
      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <div className="DAT_Info_Databox_Content">
            <div className="DAT_Info_Databox_Content_Column">
              <p>Dòng điện rò rỉ: 1,40 mA</p>
              <p>Nguồn cấp vào lưới tích lũy: 0,00 kWh</p>
              <p>Năng lượng mua hàng ngày: 0,00 kWh</p>
              <p>Máy đo pha R Công suất: 0,00 W</p>
            </div>
            <div className="DAT_Info_Databox_Content_Column">
              <p>Điện áp NBUS: 363,10 V</p>
              <p>Năng lượng tích lũy đã mua: 0,00 kWh</p>
              <p>Máy đo công suất: 0,00 W</p>
              <p>Máy đo pha S Công suất: 0,00 W</p>
            </div>
            <div className="DAT_Info_Databox_Content_Column">
              <p>Cấp điện áp lưới: 0</p>
              <p>Nguồn cấp vào lưới hàng ngày: 0,00 kWh</p>
              <p>Điện áp PBUS1:365,00 V</p>
              <p>Máy đo pha T Công suất: 0,00 W</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const ElectricityConsumption = (props) => {
  const [display, setDisplay] = useState(true);
  const dataLang = useIntl();
  return (
    <div className="DAT_Info_Databox" id="ElectricityConsumption">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">
          {dataLang.formatMessage({ id: "electricConsumption" })}
        </div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <div className="DAT_Info_Databox_Content">
            <div className="DAT_Info_Databox_Content_Column">
              <p>{dataLang.formatMessage({ id: "totalConsumption" })}: 0,00 W</p>
            </div>
            <div className="DAT_Info_Databox_Content_Column">
              <p>Tiêu thụ tích lũy: 0,00 kWh</p>
            </div>
            <div className="DAT_Info_Databox_Content_Column">
              <p>{dataLang.formatMessage({ id: "dailyConsumption" })}:  kWh</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const Temperature = (props) => {
  const dataLang = useIntl();
  const [display, setDisplay] = useState(true);

  return (
    <div className="DAT_Info_Databox" id="Temperature">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'temperatureInverter' })}: &nbsp;
          <span style={{ color: "grey", fontSize: "14px" }}>
            {parseFloat(info.value.invt[info.value.pdata.temp.register] * info.value.pdata.temp.cal).toFixed(2)} °C
          </span>
        </div>
        {/* <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div> */}
      </div>

      {/* <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <div className="DAT_Info_Databox_Content">
            <div className="DAT_Info_Databox_Content_Column">
              <p>Nhiệt độ Radiator: {parseFloat(info.value.invt[info.value.pdata.temp.register] * info.value.pdata.temp.cal).toFixed(2)} °C</p>
              <p>Nhiệt độ Module Pha S của Inverter: 39.80°C</p>
            </div>
            <div className="DAT_Info_Databox_Content_Column">
              <p>Nhiệt độ - tăng cường: 51.40°C</p>
              <p>Nhiệt độ mô-đun pha T của biến tần: 39.90°C</p>
            </div>
            <div className="DAT_Info_Databox_Content_Column">
              <p>Mô-đun pha R biến tần Nhiệt độ: 38,80°C</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div> */}
    </div>
  );
};

const State = (props) => {
  const dataLang = useIntl();
  const [display, setDisplay] = useState(true);

  return (
    <div className="DAT_Info_Databox" id="State">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'stateInverter' })}: &nbsp;
          {(() => {
            switch (parseInt(info.value.invt[info.value.pdata.status])) {
              case 0:
                return (
                  <span style={{ color: "grey", fontSize: "14px" }}>
                    {dataLang.formatMessage({ id: 'initialization' })}
                  </span>
                )
              case 1:
                return (
                  <span style={{ color: "grey", fontSize: "14px" }}>
                    {dataLang.formatMessage({ id: 'wait' })}
                  </span>
                )
              case 2:
                return (
                  <span style={{ color: "grey", fontSize: "14px" }}>
                    {dataLang.formatMessage({ id: 'gridconnection' })}
                  </span>
                )
              case 3:
                return (
                  <span style={{ color: "grey", fontSize: "14px" }}>
                    {dataLang.formatMessage({ id: 'failure' })}
                  </span>
                )
              case 4:
                return (
                  <span style={{ color: "grey", fontSize: "14px" }}>
                    {dataLang.formatMessage({ id: 'burn' })}
                  </span>
                )
              case 5:
                return (
                  <span style={{ color: "grey", fontSize: "14px" }}>
                    {dataLang.formatMessage({ id: 'offgrid' })}
                  </span>
                )
              default:
                <></>
            }
          })()}
        </div>
        {/* <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

const Control = (props) => {
  const [display, setDisplay] = useState(true);
  const datalang = useIntl();

  return (
    <div className="DAT_Info_Databox" id="Control">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{datalang.formatMessage({ id: 'control' })}</div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <div className="DAT_Info_Databox_Content">
            <div className="DAT_Info_Databox_Content_Column">
              <p>Bảo vệ hiệu ứng đảo: 0</p>
              <p>Thời gian tắt khi điện áp quá thấp: 1800 ms</p>
              <p>Thời gian ngắt kết nối khi tần số quá cao: 180 ms</p>
              <p>Thời gian tắt tần số thứ cấp: 180 ms</p>
              <p>Giá trị cài đặt công suất hoạt động: 044C KW</p>
              <p>Chế độ giảm tải: 4</p>
              <p>Khôi phục cài đặt gốc: 0</p>
              <p>DCI pha T (mA): 1.00 mA</p>
            </div>
            <div className="DAT_Info_Databox_Content_Column">
              <p>Tắt từ xa: 21845</p>
              <p>Thời gian tắt quá áp thứ hai: 40 ms</p>
              <p>Thời gian tắt tần số thấp: 180 ms</p>
              <p>
                Tỉ lệ Thay đổi Hoạt động Giảm công suất Quá tần số: 12%/0.1Hz
              </p>
              <p>Công suất giảm: 35.8032 kW</p>
              <p>Phương pháp kiểm soát phản ứng: 0</p>
              <p>Dòng DCI pha R(mA): -12.10 mA</p>
            </div>
            <div className="DAT_Info_Databox_Content_Column">
              <p>Thời gian ngắt kết nối quá áp: 1800 ms</p>
              <p>Thời gian tắt điện áp thấp cấp hai: 100 ms</p>
              <p>Thời gian tắt tần số quá mức cấp hai: 180 ms</p>
              <p>Chức năng giảm tải và tần số quá mức: 0</p>
              <p>Cài đặt giá trị phản ứng: 0.00%</p>
              <p>Xóa dữ liệu sản xuất: 0</p>
              <p>Dòng DCI giai đoạn S (mA): 19,10 mA</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const HistoricalData = (props) => {
  const lang = useSelector((state) => state.admin.lang);
  const dataLang = useIntl();
  const [display, setDisplay] = useState(true);
  const [dropConfig, setDropConfig] = useState(false);
  const [configname, setConfigname] = useState(dataLang.formatMessage({ id: "choosePara" }));
  const [chart, setChart] = useState([]);
  const [acfre, setACFre] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [acrcur, setACRcur] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [acscur, setACScur] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [actcur, setACTcur] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [acrvolt, setACRvolt] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [acsvolt, setACSvolt] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [actvolt, setACTvolt] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [pv1cur, setPV1cur] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [pv2cur, setPV2cur] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [pv3cur, setPV3cur] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [pv4cur, setPV4cur] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [pv1volt, setPV1volt] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [pv2volt, setPV2volt] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [pv3volt, setPV3volt] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [pv4volt, setPV4volt] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [pv1power, setPV1pow] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [pv2power, setPV2pow] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [pv3power, setPV3pow] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [pv4power, setPV4pow] = useState(dataLang.formatMessage({ id: "unknown" }));
  const [dateType, setDateType] = useState("date");
  const [mode, setMode] = useState('ACVOLT');
  const [d, setD] = useState({
    date: moment(new Date()).format("MM/DD/YYYY"),
  });

  useEffect(() => {
    const getChart = async () => {
      const req = await callApi("post", host.DATA + "/getInverterChart", {
        sn: info.value.psn,
        date: moment(new Date()).format("MM/DD/YYYY")
      });
      if (req.status) {
        let vACFre_ = dataLang.formatMessage({ id: "acfre" });
        let vACRcur_ = dataLang.formatMessage({ id: "acrcur" });
        let vACScur_ = dataLang.formatMessage({ id: "acscur" });
        let vACTcur_ = dataLang.formatMessage({ id: "actcur" });
        let vACRvolt_ = dataLang.formatMessage({ id: "acrvolt" });
        let vACSvolt_ = dataLang.formatMessage({ id: "acsvolt" });
        let vACTvol_ = dataLang.formatMessage({ id: "actvolt" });
        let vpv1cur_ = dataLang.formatMessage({ id: "pv1cur" });
        let vpv2cur_ = dataLang.formatMessage({ id: "pv2cur" });
        let vpv3cur_ = dataLang.formatMessage({ id: "pv3cur" });
        let vpv4cur_ = dataLang.formatMessage({ id: "pv4cur" });
        let vpv1volt_ = dataLang.formatMessage({ id: "pv1volt" });
        let vpv2volt_ = dataLang.formatMessage({ id: "pv2volt" });
        let vpv3volt_ = dataLang.formatMessage({ id: "pv3volt" });
        let vpv4volt_ = dataLang.formatMessage({ id: "pv4volt" });
        let vpv1pow_ = dataLang.formatMessage({ id: "pv1pow" });
        let vpv2pow_ = dataLang.formatMessage({ id: "pv2pow" });
        let vpv3pow_ = dataLang.formatMessage({ id: "pv3pow" });
        let vpv4pow_ = dataLang.formatMessage({ id: "pv4pow" });
        let x = []
        req.data.data.map((item) => {
          let arr = item.time.split(":");
          x = [
            ...x,
            {
              time: `${arr[0]}:${arr[1]}`,
              [vACFre_]: item.acfre,
              [vACRcur_]: item.acrcur,
              [vACScur_]: item.acscur,
              [vACTcur_]: item.actcur,
              [vACRvolt_]: item.acrvolt,
              [vACSvolt_]: item.acsvolt,
              [vACTvol_]: item.actvolt,
              [vpv1cur_]: item.pv1cur,
              [vpv2cur_]: item.pv2cur,
              [vpv3cur_]: item.pv3cur,
              [vpv4cur_]: item.pv4cur,
              [vpv1volt_]: item.pv1volt,
              [vpv2volt_]: item.pv2volt,
              [vpv3volt_]: item.pv3volt,
              [vpv4volt_]: item.pv4volt,
              [vpv1pow_]: item.pv1pow,
              [vpv2pow_]: item.pv2pow,
              [vpv3pow_]: item.pv3pow,
              [vpv4pow_]: item.pv4pow,
            }

          ]
        })

        for (let i = x.length; i < 500; i++) {
          if (
            moment(x[x.length - 1].time, "HH:mm") < moment("23:55", "HH:mm")
          ) {
            let nextTime = moment(x[x.length - 1].time, "HH:mm")
              .add(5, "minutes")
              .format("HH:mm");
            x.push({
              time: nextTime,
              [vACFre_]: 0,
              [vACRcur_]: 0,
              [vACScur_]: 0,
              [vACTcur_]: 0,
              [vACRvolt_]: 0,
              [vACSvolt_]: 0,
              [vACTvol_]: 0,
              [vpv1cur_]: 0,
              [vpv2cur_]: 0,
              [vpv3cur_]: 0,
              [vpv4cur_]: 0,
              [vpv1volt_]: 0,
              [vpv2volt_]: 0,
              [vpv3volt_]: 0,
              [vpv4volt_]: 0,
              [vpv1pow_]: 0,
              [vpv2pow_]: 0,
              [vpv3pow_]: 0,
              [vpv4pow_]: 0

            });
          }
        }

        setACFre(dataLang.formatMessage({ id: "acfre" }));
        setACRcur(dataLang.formatMessage({ id: "acrcur" }));
        setACScur(dataLang.formatMessage({ id: "acscur" }));
        setACTcur(dataLang.formatMessage({ id: "actcur" }));
        setACRvolt(dataLang.formatMessage({ id: "acrvolt" }));
        setACSvolt(dataLang.formatMessage({ id: "acsvolt" }));
        setACTvolt(dataLang.formatMessage({ id: "actvolt" }));
        setPV1cur(dataLang.formatMessage({ id: "pv1cur" }));
        setPV2cur(dataLang.formatMessage({ id: "pv2cur" }));
        setPV3cur(dataLang.formatMessage({ id: "pv3cur" }));
        setPV4cur(dataLang.formatMessage({ id: "pv4cur" }));
        setPV1volt(dataLang.formatMessage({ id: "pv1volt" }));
        setPV2volt(dataLang.formatMessage({ id: "pv2volt" }));
        setPV3volt(dataLang.formatMessage({ id: "pv3volt" }));
        setPV4volt(dataLang.formatMessage({ id: "pv4volt" }));
        setPV1pow(dataLang.formatMessage({ id: "pv1pow" }));
        setPV2pow(dataLang.formatMessage({ id: "pv2pow" }));
        setPV3pow(dataLang.formatMessage({ id: "pv3pow" }));
        setPV4pow(dataLang.formatMessage({ id: "pv4pow" }));
        setChart([...x])
      } else {
        setChart([])
      }
    }

    getChart()
  }, [lang])

  const handleChart = (date) => {
    setD({ ...d, date: moment(date).format("MM/DD/YYYY") })
    const getChart = async () => {
      const req = await callApi("post", host.DATA + "/getInverterChart", {
        sn: info.value.psn,
        date: moment(date).format("MM/DD/YYYY")
      });
      if (req.status) {
        let vACFre_ = dataLang.formatMessage({ id: "acfre" });
        let vACRcur_ = dataLang.formatMessage({ id: "acrcur" });
        let vACScur_ = dataLang.formatMessage({ id: "acscur" });
        let vACTcur_ = dataLang.formatMessage({ id: "actcur" });
        let vACRvolt_ = dataLang.formatMessage({ id: "acrvolt" });
        let vACSvolt_ = dataLang.formatMessage({ id: "acsvolt" });
        let vACTvol_ = dataLang.formatMessage({ id: "actvolt" });
        let vpv1cur_ = dataLang.formatMessage({ id: "pv1cur" });
        let vpv2cur_ = dataLang.formatMessage({ id: "pv2cur" });
        let vpv3cur_ = dataLang.formatMessage({ id: "pv3cur" });
        let vpv4cur_ = dataLang.formatMessage({ id: "pv4cur" });
        let vpv1volt_ = dataLang.formatMessage({ id: "pv1volt" });
        let vpv2volt_ = dataLang.formatMessage({ id: "pv2volt" });
        let vpv3volt_ = dataLang.formatMessage({ id: "pv3volt" });
        let vpv4volt_ = dataLang.formatMessage({ id: "pv4volt" });
        let vpv1pow_ = dataLang.formatMessage({ id: "pv1pow" });
        let vpv2pow_ = dataLang.formatMessage({ id: "pv2pow" });
        let vpv3pow_ = dataLang.formatMessage({ id: "pv3pow" });
        let vpv4pow_ = dataLang.formatMessage({ id: "pv4pow" });
        let x = []
        req.data.data.map((item) => {
          let arr = item.time.split(":");
          x = [
            ...x,
            {
              time: `${arr[0]}:${arr[1]}`,
              [vACFre_]: item.acfre,
              [vACRcur_]: item.acrcur,
              [vACScur_]: item.acscur,
              [vACTcur_]: item.actcur,
              [vACRvolt_]: item.acrvolt,
              [vACSvolt_]: item.acsvolt,
              [vACTvol_]: item.actvolt,
              [vpv1cur_]: item.pv1cur,
              [vpv2cur_]: item.pv2cur,
              [vpv3cur_]: item.pv3cur,
              [vpv4cur_]: item.pv4cur,
              [vpv1volt_]: item.pv1volt,
              [vpv2volt_]: item.pv2volt,
              [vpv3volt_]: item.pv3volt,
              [vpv4volt_]: item.pv4volt,
              [vpv1pow_]: item.pv1pow,
              [vpv2pow_]: item.pv2pow,
              [vpv3pow_]: item.pv3pow,
              [vpv4pow_]: item.pv4pow,
            }

          ]
        })

        for (let i = x.length; i < 500; i++) {
          if (
            moment(x[x.length - 1].time, "HH:mm") < moment("23:55", "HH:mm")
          ) {
            let nextTime = moment(x[x.length - 1].time, "HH:mm")
              .add(5, "minutes")
              .format("HH:mm");
            x.push({
              time: nextTime,
              [vACFre_]: 0,
              [vACRcur_]: 0,
              [vACScur_]: 0,
              [vACTcur_]: 0,
              [vACRvolt_]: 0,
              [vACSvolt_]: 0,
              [vACTvol_]: 0,
              [vpv1cur_]: 0,
              [vpv2cur_]: 0,
              [vpv3cur_]: 0,
              [vpv4cur_]: 0,
              [vpv1volt_]: 0,
              [vpv2volt_]: 0,
              [vpv3volt_]: 0,
              [vpv4volt_]: 0,
              [vpv1pow_]: 0,
              [vpv2pow_]: 0,
              [vpv3pow_]: 0,
              [vpv4pow_]: 0

            });
          }
        }

        setACFre(dataLang.formatMessage({ id: "acfre" }));
        setACRcur(dataLang.formatMessage({ id: "acrcur" }));
        setACScur(dataLang.formatMessage({ id: "acscur" }));
        setACTcur(dataLang.formatMessage({ id: "actcur" }));
        setACRvolt(dataLang.formatMessage({ id: "acrvolt" }));
        setACSvolt(dataLang.formatMessage({ id: "acsvolt" }));
        setACTvolt(dataLang.formatMessage({ id: "actvolt" }));
        setPV1cur(dataLang.formatMessage({ id: "pv1cur" }));
        setPV2cur(dataLang.formatMessage({ id: "pv2cur" }));
        setPV3cur(dataLang.formatMessage({ id: "pv3cur" }));
        setPV4cur(dataLang.formatMessage({ id: "pv4cur" }));
        setPV1volt(dataLang.formatMessage({ id: "pv1volt" }));
        setPV2volt(dataLang.formatMessage({ id: "pv2volt" }));
        setPV3volt(dataLang.formatMessage({ id: "pv3volt" }));
        setPV4volt(dataLang.formatMessage({ id: "pv4volt" }));
        setPV1pow(dataLang.formatMessage({ id: "pv1pow" }));
        setPV2pow(dataLang.formatMessage({ id: "pv2pow" }));
        setPV3pow(dataLang.formatMessage({ id: "pv3pow" }));
        setPV4pow(dataLang.formatMessage({ id: "pv4pow" }));
        setChart([...x])
      } else {
        setChart([])
      }
    }

    getChart()
  }

  const handleMode = () => {
    if (mode === 'AC') {
      setMode('DC')
    } else {
      setMode('AC')
    }
  }

  const handleChartMode = (e) => {
    setMode(e.target.value)
  }

  const handleShowConfig = (e) => {
    if (configname === dataLang.formatMessage({ id: "choosePara" })) {
      setConfigname(dataLang.formatMessage({ id: "minimize" }));
    } else if (configname === dataLang.formatMessage({ id: "minimize" })) {
      setConfigname(dataLang.formatMessage({ id: "choosePara" }));
    }
  };

  return (
    <div className="DAT_Info_Databox" id="HistoricalData">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'historyInverter' })}</div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ?
          <>
            {isMobile.value ?
              <div className="DAT_Info_Databox_HistoriccalData">
                <div className="DAT_Info_Databox_HistoricalData_Picker">
                  <select onChange={(e) => handleChartMode(e)}>
                    <option value={"ACVOLT"}>{dataLang.formatMessage({ id: "ACVolt" })}(V)</option>
                    <option value={"ACCUR"}>{dataLang.formatMessage({ id: "ACCurrent" })}(A)</option>
                    <option value={"ACFRE"}>{dataLang.formatMessage({ id: "acfre" })}(Hz)</option>
                    <option value={"DCVOLT"}>{dataLang.formatMessage({ id: "DCVolt" })}(V)</option>
                    <option value={"DCCUR"}>{dataLang.formatMessage({ id: "DCCurrent" })}(A)</option>
                    <option value={"DCPOWER"}>{dataLang.formatMessage({ id: "DCPower" })}(kW)</option>
                  </select>
                  {/* <div className="DAT_Info_Databox_HistoricalData_Picker_Type">
            <p>{dataLang.formatMessage({ id: "day" })}</p>
            <p>{dataLang.formatMessage({ id: "month" })}</p>
            <p>{dataLang.formatMessage({ id: "year" })}</p>
            <p>{dataLang.formatMessage({ id: "total" })}</p>
          </div>
          <div className="DAT_Info_Databox_HistoricalData_Picker_ParametersPicker">
            <div>{dataLang.formatMessage({ id: "choosePara" })}</div>
          </div>
          <div className="DAT_Info_Databox_HistoricalData_Picker_Export">
            <div>{dataLang.formatMessage({ id: "export" })}</div>
          </div> */}
                  <div className="DAT_Info_Databox_HistoricalData_Picker_ParametersPicker">
                    <button>{dataLang.formatMessage({ id: "choosePara" })}</button>
                  </div>
                  <DatePicker
                    onChange={(date) => handleChart(date)}
                    customInput={
                      <button className="DAT_CustomPicker" >
                        <span>{d[dateType]}</span>
                        <IoCalendarOutline color="gray" />
                      </button>
                    }
                  />
                </div>
                <div className="DAT_Info_Databox_HistoricalData_Chart">
                  {(() => {
                    switch (mode) {
                      case "ACFRE":
                        return (
                          <ResponsiveContainer
                            style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                          >


                            <LineChart width={100} height={500} data={chart}>
                              <XAxis dataKey="time" axisLine={false} tickLine={false} />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={[
                                  0,
                                  chart.reduce((max, item) => {
                                    // console.log(item)
                                    const values = Object.values({
                                      x: item[acfre],
                                    });
                                    const currentMax = Math.max(...values.map(Number));
                                    // console.log(currentMax)
                                    return currentMax > max ? currentMax : max;
                                  }, -Infinity),
                                ]}
                              />
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey={acfre}
                                stroke="red"
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )
                      case "ACVOLT":
                        return (
                          <ResponsiveContainer
                            style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                          >


                            <LineChart width={100} height={500} data={chart}>
                              <XAxis dataKey="time" axisLine={false} tickLine={false} />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={[
                                  0,
                                  chart.reduce((max, item) => {
                                    // console.log(item)
                                    const values = Object.values({
                                      x: item[acrvolt],
                                      y: item[acsvolt],
                                      z: item[actvolt],
                                    });
                                    const currentMax = Math.max(...values.map(Number));
                                    // console.log(currentMax)
                                    return currentMax > max ? currentMax : max;
                                  }, -Infinity),
                                ]} />
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey={acrvolt}
                                stroke="red"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={acsvolt}
                                stroke="green"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={actvolt}
                                stroke="purple"
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )
                      case "ACCUR":
                        return (
                          <ResponsiveContainer
                            style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                          >

                            <LineChart width={100} height={500} data={chart}>
                              <XAxis dataKey="time" axisLine={false} tickLine={false} />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={[
                                  0,
                                  chart.reduce((max, item) => {
                                    // console.log(item)
                                    const values = Object.values({
                                      x: item[acrcur],
                                      y: item[acscur],
                                      z: item[actcur],

                                    });
                                    const currentMax = Math.max(...values.map(Number));
                                    // console.log(currentMax)
                                    return currentMax > max ? currentMax : max;
                                  }, -Infinity),
                                ]}
                              />
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey={acrcur}
                                stroke="orange"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={acscur}
                                stroke="gray"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={actcur}
                                stroke="pink"
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )
                      case "DCCUR":
                        return (
                          <ResponsiveContainer
                            style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                          >

                            <LineChart width={100} height={500} data={chart}>
                              <XAxis dataKey="time" axisLine={false} tickLine={false} />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={[
                                  0,
                                  chart.reduce((max, item) => {
                                    // console.log(item)/
                                    const values = Object.values({
                                      x: item[pv1cur],
                                      y: item[pv2cur],
                                      z: item[pv3cur],
                                      t: item[pv4cur],
                                    });
                                    const currentMax = Math.max(...values.map(Number));
                                    // console.log(currentMax)
                                    return currentMax > max ? currentMax : max;
                                  }, -Infinity),
                                ]}
                              />

                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey={pv1cur}
                                stroke="rgb(4,143,255)"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv2cur}
                                stroke="red"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv3cur}
                                stroke="green"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv4cur}
                                stroke="purple"
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )
                      case 'DCVOLT':
                        return (
                          <ResponsiveContainer
                            style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                          >

                            <LineChart width={100} height={500} data={chart}>
                              <XAxis dataKey="time" axisLine={false} tickLine={false} />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={[
                                  0,
                                  chart.reduce((max, item) => {
                                    // console.log(item)
                                    const values = Object.values({
                                      x: item[pv1volt],
                                      y: item[pv2volt],
                                      z: item[pv3volt],
                                      w: item[pv4volt],
                                    });
                                    const currentMax = Math.max(...values.map(Number));
                                    // console.log(currentMax)
                                    return currentMax > max ? currentMax : max;
                                  }, -Infinity),
                                ]}
                              />
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey={pv1volt}
                                stroke="rgb(4,143,255)"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv2volt}
                                stroke="red"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv3volt}
                                stroke="green"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv4volt}
                                stroke="purple"
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )
                      case 'DCPOWER':
                        return (
                          <ResponsiveContainer
                            style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                          >

                            <LineChart width={100} height={500} data={chart}>
                              <XAxis dataKey="time" axisLine={false} tickLine={false} />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={[
                                  0,
                                  chart.reduce((max, item) => {
                                    // console.log(item)
                                    const values = Object.values({
                                      x: item[pv1power],
                                      y: item[pv2power],
                                      z: item[pv3power],
                                      w: item[pv4power],
                                    });
                                    const currentMax = Math.max(...values.map(Number));
                                    // console.log(currentMax)
                                    return currentMax > max ? currentMax : max;
                                  }, -Infinity),
                                ]}
                              />
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey={pv1power}
                                stroke="rgb(4,143,255)"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv2power}
                                stroke="red"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv3power}
                                stroke="green"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv4power}
                                stroke="purple"
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )
                      default:
                        return <></>;
                    }
                  })()}
                </div>
              </div>
              :
              <div className="DAT_Info_Databox_HistoriccalData">
                <div className="DAT_Info_Databox_HistoricalData_Picker">
                  {/* <div className="DAT_Info_Databox_HistoricalData_Picker_Type">
                <p>{dataLang.formatMessage({ id: "day" })}</p>
                <p>{dataLang.formatMessage({ id: "month" })}</p>
                <p>{dataLang.formatMessage({ id: "year" })}</p>
                <p>{dataLang.formatMessage({ id: "total" })}</p>
              </div> */}
                  {/* <div className="DAT_Info_Databox_HistoricalData_Picker_Export">
                <div>{dataLang.formatMessage({ id: "export" })}</div>
              </div> */}
                  <div className="DAT_Info_Databox_HistoricalData_Picker_ParametersPicker">
                    <button
                      onClick={(e) => {
                        handleShowConfig(e);
                        setDropConfig(!dropConfig);
                      }}
                    >
                      {configname}
                    </button>
                  </div>
                  <DatePicker
                    onChange={(date) => handleChart(date)}
                    customInput={
                      <button className="DAT_CustomPicker" >
                        <span>{d[dateType]}</span>
                        <IoCalendarOutline color="gray" />
                      </button>
                    }
                  />
                </div>

                <div className="DAT_Info_Databox_HistoricalData_Chart">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "40px", marginBottom: "16px" }}>
                    <div style={{ cursor: "pointer", color: mode === "ACVOLT" ? "rgb(4,143,255)" : "black" }} onClick={() => setMode('ACVOLT')}>{dataLang.formatMessage({ id: "ACVolt" })}(V)</div>
                    <div style={{ cursor: "pointer", color: mode === "ACCUR" ? "rgb(4,143,255)" : "black" }} onClick={() => setMode('ACCUR')}>{dataLang.formatMessage({ id: "ACCurrent" })}(A)</div>
                    <div style={{ cursor: "pointer", color: mode === "ACFRE" ? "rgb(4,143,255)" : "black" }} onClick={() => setMode('ACFRE')}>{dataLang.formatMessage({ id: "acfre" })}(Hz)</div>
                    <div style={{ cursor: "pointer", color: mode === "DCVOLT" ? "rgb(4,143,255)" : "black" }} onClick={() => setMode('DCVOLT')}>{dataLang.formatMessage({ id: "DCVolt" })}(V)</div>
                    <div style={{ cursor: "pointer", color: mode === "DCCUR" ? "rgb(4,143,255)" : "black" }} onClick={() => setMode('DCCUR')}>{dataLang.formatMessage({ id: "DCCurrent" })}(A)</div>
                    <div style={{ cursor: "pointer", color: mode === "DCPOWER" ? "rgb(4,143,255)" : "black" }} onClick={() => setMode('DCPOWER')}>{dataLang.formatMessage({ id: "DCPower" })}(kW)</div>
                  </div>
                  {(() => {
                    switch (mode) {
                      case "ACFRE":
                        return (
                          <ResponsiveContainer
                            style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                          >


                            <LineChart width={100} height={500} data={chart}>
                              <XAxis dataKey="time" axisLine={false} tickLine={false} />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={[
                                  0,
                                  chart.reduce((max, item) => {
                                    // console.log(item)
                                    const values = Object.values({
                                      x: item[acfre],
                                    });
                                    const currentMax = Math.max(...values.map(Number));
                                    // console.log(currentMax)
                                    return currentMax > max ? currentMax : max;
                                  }, -Infinity),
                                ]}
                              />
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <Tooltip />
                              {/* <Legend /> */}
                              <Line
                                type="monotone"
                                dataKey={acfre}
                                stroke="red"
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )
                      case "ACVOLT":
                        return (
                          <ResponsiveContainer
                            style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                          >


                            <LineChart width={100} height={500} data={chart}>
                              <XAxis dataKey="time" axisLine={false} tickLine={false} />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={[
                                  0,
                                  chart.reduce((max, item) => {
                                    // console.log(item)
                                    const values = Object.values({
                                      x: item[acrvolt],
                                      y: item[acsvolt],
                                      z: item[actvolt],
                                    });
                                    const currentMax = Math.max(...values.map(Number));
                                    // console.log(currentMax)
                                    return currentMax > max ? currentMax : max;
                                  }, -Infinity),
                                ]} />
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <Tooltip />
                              {/* <Legend /> */}
                              <Line
                                type="monotone"
                                dataKey={acrvolt}
                                stroke="red"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={acsvolt}
                                stroke="green"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={actvolt}
                                stroke="purple"
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )
                      case "ACCUR":
                        return (
                          <ResponsiveContainer
                            style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                          >

                            <LineChart width={100} height={500} data={chart}>
                              <XAxis dataKey="time" axisLine={false} tickLine={false} />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={[
                                  0,
                                  chart.reduce((max, item) => {
                                    // console.log(item)
                                    const values = Object.values({
                                      x: item[acrcur],
                                      y: item[acscur],
                                      z: item[actcur],

                                    });
                                    const currentMax = Math.max(...values.map(Number));
                                    // console.log(currentMax)
                                    return currentMax > max ? currentMax : max;
                                  }, -Infinity),
                                ]}
                              />
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <Tooltip />
                              {/* <Legend /> */}
                              <Line
                                type="monotone"
                                dataKey={acrcur}
                                stroke="orange"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={acscur}
                                stroke="gray"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={actcur}
                                stroke="pink"
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )
                      case "DCCUR":
                        return (
                          <ResponsiveContainer
                            style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                          >

                            <LineChart width={100} height={500} data={chart}>
                              <XAxis dataKey="time" axisLine={false} tickLine={false} />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={[
                                  0,
                                  chart.reduce((max, item) => {
                                    // console.log(item)/
                                    const values = Object.values({
                                      x: item[pv1cur],
                                      y: item[pv2cur],
                                      z: item[pv3cur],
                                      t: item[pv4cur],
                                    });
                                    const currentMax = Math.max(...values.map(Number));
                                    // console.log(currentMax)
                                    return currentMax > max ? currentMax : max;
                                  }, -Infinity),
                                ]}
                              />

                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <Tooltip />
                              {/* <Legend /> */}
                              <Line
                                type="monotone"
                                dataKey={pv1cur}
                                stroke="rgb(4,143,255)"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv2cur}
                                stroke="red"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv3cur}
                                stroke="green"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv4cur}
                                stroke="purple"
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )
                      case 'DCVOLT':
                        return (
                          <ResponsiveContainer
                            style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                          >

                            <LineChart width={100} height={500} data={chart}>
                              <XAxis dataKey="time" axisLine={false} tickLine={false} />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={[
                                  0,
                                  chart.reduce((max, item) => {
                                    // console.log(item)
                                    const values = Object.values({
                                      x: item[pv1volt],
                                      y: item[pv2volt],
                                      z: item[pv3volt],
                                      w: item[pv4volt],
                                    });
                                    const currentMax = Math.max(...values.map(Number));
                                    // console.log(currentMax)
                                    return currentMax > max ? currentMax : max;
                                  }, -Infinity),
                                ]}
                              />
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <Tooltip />
                              {/* <Legend /> */}
                              <Line
                                type="monotone"
                                dataKey={pv1volt}
                                stroke="rgb(4,143,255)"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv2volt}
                                stroke="red"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv3volt}
                                stroke="green"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv4volt}
                                stroke="purple"
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )
                      case 'DCPOWER':
                        return (
                          <ResponsiveContainer
                            style={{ width: "100%", height: "100%", marginLeft: "-20px" }}
                          >

                            <LineChart width={100} height={500} data={chart}>
                              <XAxis dataKey="time" axisLine={false} tickLine={false} />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={[
                                  0,
                                  chart.reduce((max, item) => {
                                    // console.log(item)
                                    const values = Object.values({
                                      x: item[pv1power],
                                      y: item[pv2power],
                                      z: item[pv3power],
                                      w: item[pv4power],
                                    });
                                    const currentMax = Math.max(...values.map(Number));
                                    // console.log(currentMax)
                                    return currentMax > max ? currentMax : max;
                                  }, -Infinity),
                                ]}
                              />
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <Tooltip />
                              {/* <Legend /> */}
                              <Line
                                type="monotone"
                                dataKey={pv1power}
                                stroke="rgb(4,143,255)"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv2power}
                                stroke="red"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv3power}
                                stroke="green"
                                dot={false}
                              />

                              <Line
                                type="monotone"
                                dataKey={pv4power}
                                stroke="purple"
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )
                      default:
                        return <></>;
                    }
                  })()}
                </div>

                <div className="DAT_Info_Databox_HistoricalData_SubConfig"
                  style={{
                    height: dropConfig ? "calc(100vh - 180px)" : "0px",
                    transition: "0.5s",
                  }}
                >
                  {dropConfig ?
                    <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown"
                      style={{
                        height: dropConfig ? "auto" : "0px",
                        transition: "0.5s",
                      }}
                    >
                      <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Search">
                        <input type="text" />
                        <CiSearch color="gray" size={20} />
                      </div>

                      <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item">
                        <table className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table">
                          <tbody>
                            <tr className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr">
                              <th className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Th">
                                {dataLang.formatMessage({ id: "basicInfo" })}:
                              </th>
                              <td className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td">
                                <div className="DAT_Info_Databox_HistoricalData_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                  <input
                                    type="checkbox"
                                    id={"productionData_"}
                                  />
                                  <label
                                    htmlFor={"productionData_"}
                                  >
                                    Rated Power
                                  </label>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    : <></>
                  }
                </div>
              </div>
            }
          </>
          :
          <></>
        }
      </div>
    </div >
  );
};

const GridStartSettings = (props) => {
  const dataLang = useIntl();
  const [display, setDisplay] = useState(true);

  return (
    <div className="DAT_Info_Databox" id="GridStartSettings">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'Gridstartsettings' })}</div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <>
            {(() => {
              switch (info.value.pdata.mode) {
                case "HYBRID":
                  return <div className="DAT_Info_Databox_GridStartSettings">
                    <div className="DAT_Info_Databox_GridStartSettings_Content">
                      <div className="DAT_Info_Databox_GridStartSettings_Content_Left">
                        <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACStartHighVoltage' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item_Content">
                            <input placeholder="10.0 ~ 1000.0" />
                            V
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item">
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACStartLowFrequency' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item_Content">
                            <input placeholder="45.00 ~ 65.00" />
                            Hz
                          </div>
                        </div>
                      </div>
                      <div className="DAT_Info_Databox_GridStartSettings_Content_Center">
                        <div className="DAT_Info_Databox_GridStartSettings_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Center_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACStartLowVoltage' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Center_Item_Content">
                            <input placeholder="10.0 ~ 1000.0" />
                            V
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridStartSettings_Content_Center_Item">
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Center_Item_Tit">
                            Start Delay Time:
                          </div>
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Center_Item_Content">
                            <input placeholder="20 ~ 600" />
                            s
                          </div>
                        </div>
                      </div>
                      <div className="DAT_Info_Databox_GridStartSettings_Content_Right">
                        <div className="DAT_Info_Databox_GridStartSettings_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Right_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACStartHighFrequency' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Right_Item_Content">
                            <input placeholder="45.00 ~ 65.00" />
                            Hz
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridStartSettings_Content_Right_Item">
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Right_Item_Tit">
                            Restart Delay Time:
                          </div>
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Right_Item_Content">
                            <input placeholder="20 ~ 1000" />
                            s
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="DAT_Info_Databox_GridStartSettings_Foot">
                      <button>{dataLang.formatMessage({ id: 'read' })}</button>
                      <button>{dataLang.formatMessage({ id: 'setup' })}</button>
                    </div>
                  </div>
                case "CONSUMPTION":
                  return <></>
                default:
                  return <div className="DAT_Info_Databox_GridStartSettings">
                    <div className="DAT_Info_Databox_GridStartSettings_Content">
                      <div className="DAT_Info_Databox_GridStartSettings_Content_Left">
                        <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACStartHighVoltage' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item_Content">
                            <input placeholder="10.0 ~ 1000.0" />
                            V
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item">
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACStartLowFrequency' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item_Content">
                            <input placeholder="45.00 ~ 65.00" />
                            Hz
                          </div>
                        </div>
                      </div>
                      <div className="DAT_Info_Databox_GridStartSettings_Content_Center">
                        <div className="DAT_Info_Databox_GridStartSettings_Content_Center_Item">
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Center_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACStartLowVoltage' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Center_Item_Content">
                            <input placeholder="10.0 ~ 1000.0" />
                            V
                          </div>
                        </div>
                      </div>
                      <div className="DAT_Info_Databox_GridStartSettings_Content_Right">
                        <div className="DAT_Info_Databox_GridStartSettings_Content_Right_Item">
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Right_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACStartHighFrequency' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridStartSettings_Content_Right_Item_Content">
                            <input placeholder="45.00 ~ 65.00" />
                            Hz
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="DAT_Info_Databox_GridStartSettings_Foot">
                      <button>{dataLang.formatMessage({ id: 'read' })}</button>
                      <button>{dataLang.formatMessage({ id: 'setup' })}</button>
                    </div>
                  </div>
              }
            })()}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const GridVolt = (props) => {
  const dataLang = useIntl();
  const [display, setDisplay] = useState(true);

  return (
    <div className="DAT_Info_Databox" id="GridVolt">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'GridVFreqP' })}</div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <>
            {(() => {
              switch (info.value.pdata.mode) {
                case "HYBRID":
                  return <div className="DAT_Info_Databox_GridVolt">
                    <div className="DAT_Info_Databox_GridVolt_Content">
                      <div className="DAT_Info_Databox_GridVolt_Content_Left">
                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderVolt1' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                            <input placeholder="10.0 ~ 1000.0" />
                            V
                          </div>
                        </div>

                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverVolt1Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>

                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderVolt2Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>

                        {/* <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: "24px" }}>
                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                          {dataLang.formatMessage({ id: 'ACUnderVolt3Time' })}:
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                          <input />
                          ms
                        </div>
                      </div> */}

                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverFreq1' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                            <input placeholder="45.00 ~ 65.00" />
                            Hz
                          </div>
                        </div>

                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderFreq2' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                            <input placeholder="45.00 ~ 65.00" />
                            Hz
                          </div>
                        </div>

                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item">
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverFreq2Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>
                      </div>

                      <div className="DAT_Info_Databox_GridVolt_Content_Center">
                        <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverVolt1' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                            <input placeholder="10.0 ~ 1000.0" />
                            V
                          </div>
                        </div>

                        <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderVolt2' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                            <input placeholder="10.0 ~ 1000.0" />
                            V
                          </div>
                        </div>

                        <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverVolt2Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>

                        <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderFreq1Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>

                        <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" >
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverFreq2' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                            <input placeholder="45.00 ~ 65.00" />
                            Hz
                          </div>
                        </div>
                      </div>

                      <div className="DAT_Info_Databox_GridVolt_Content_Right">
                        <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderVolt1Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>

                        <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverVolt2' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                            <input placeholder="10.0 ~ 1000.0" />
                            V
                          </div>
                        </div>

                        {/* <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" style={{ marginBottom: "24px" }}>
                        <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                          AC Under Volt 3:
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                          <input />
                          V
                        </div>
                      </div> */}

                        <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderFreq1' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                            <input placeholder="45.00 ~ 65.00" />
                            Hz
                          </div>
                        </div>

                        <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverFreq1Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>

                        <div className="DAT_Info_Databox_GridVolt_Content_Right_Item">
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderFreq2Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="DAT_Info_Databox_GridVolt_Foot">
                      <button>
                        {dataLang.formatMessage({ id: 'read' })}
                      </button>
                      <button>
                        {dataLang.formatMessage({ id: 'setup' })}
                      </button>
                    </div>
                  </div>
                case "CONSUMPTION":
                  return
                default:
                  return <div className="DAT_Info_Databox_GridVolt">
                    <div className="DAT_Info_Databox_GridVolt_Content">
                      <div className="DAT_Info_Databox_GridVolt_Content_Left">
                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderVolt1' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                            <input placeholder="10.0 ~ 1000.0" />
                            V
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverVolt1Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderVolt2Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>
                        {/* <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: "24px" }}>
                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                          {dataLang.formatMessage({ id: 'ACUnderVolt3Time' })}:
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                          <input />
                          ms
                        </div>
                      </div> */}
                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderFreq1Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverFreq2Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                            <input placeholder="45.00 ~ 65.00" />
                            ms
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Left_Item">
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'FreqSetting' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                            <select>
                              <option defaultValue={1} style={{ display: "none" }}>{dataLang.formatMessage({ id: 'PleaseSel' })}</option>
                              <option>50Hz</option>
                              <option>60Hz</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="DAT_Info_Databox_GridVolt_Content_Center">
                        <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverVolt1' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                            <input placeholder="10.0 ~ 1000.0" />
                            V
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderVolt2' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                            <input placeholder="10.0 ~ 1000.0" />
                            V
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverVolt2Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderFreq1' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                            <input placeholder="45.00 ~ 65.00" />
                            Hz
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverFreq1Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Center_Item">
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderFreq2Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>
                      </div>
                      <div className="DAT_Info_Databox_GridVolt_Content_Right">
                        <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderVolt1Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverVolt2' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                            <input placeholder="10.0 ~ 1000.0" />
                            V
                          </div>
                        </div>
                        {/* <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" style={{ marginBottom: "24px" }}>
                        <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                          AC Under Volt 3:
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                          <input />
                          V
                        </div>
                      </div> */}
                        <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverFreq1' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                            <input placeholder="45.00 ~ 65.00" />
                            Hz
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACUnderFreq2' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                            <input placeholder="45.00 ~ 65.00" />
                            Hz
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" >
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                            {dataLang.formatMessage({ id: 'ACOverFreq2Time' })}:
                          </div>
                          <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                            <input placeholder="20 ~ 5000" />
                            ms
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="DAT_Info_Databox_GridVolt_Foot">
                      <button>
                        {dataLang.formatMessage({ id: 'read' })}
                      </button>
                      <button>
                        {dataLang.formatMessage({ id: 'setup' })}
                      </button>
                    </div>
                  </div>
              }
            })()}

          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const SystemTime = (props) => {
  const dataLang = useIntl();
  const [display, setDisplay] = useState(true);

  return (
    <div className="DAT_Info_Databox" id="SystemTime">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: "SystemTime" })}</div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <div className="DAT_Info_Databox_ExportPowerSettings">
            <div className="DAT_Info_Databox_ExportPowerSettings_Content">
              <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left">
                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item">
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: "SystemTime" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Content">
                    <DatePicker
                      customInput={
                        <button className="DAT_CustomPicker" >
                          <span>{moment(new Date()).format("MM/DD/YYYY hh:mm:ss")}</span>
                          &nbsp;
                          <IoCalendarOutline color="gray" />
                        </button>
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center">
              </div>
              <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right">
              </div>
            </div>

            <div className="DAT_Info_Databox_ExportPowerSettings_Foot">
              <button>
                {dataLang.formatMessage({ id: 'read' })}
              </button>
              <button>
                {dataLang.formatMessage({ id: 'setup' })}
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const GridFirst = (props) => {
  const dataLang = useIntl();
  const [display, setDisplay] = useState(true);

  const hour = [
    {
      value: "00",
    },
    {
      value: "01",
    },
    {
      value: "02",
    },
    {
      value: "03",
    },
    {
      value: "04",
    },
    {
      value: "05",
    },
    {
      value: "06",
    },
    {
      value: "07",
    },
    {
      value: "08",
    },
    {
      value: "09",
    },
    {
      value: "10",
    },
    {
      value: "11",
    },
    {
      value: "12",
    },
    {
      value: "13",
    },
    {
      value: "14",
    },
    {
      value: "15",
    },
    {
      value: "16",
    },
    {
      value: "17",
    },
    {
      value: "18",
    },
    {
      value: "19",
    },
    {
      value: "20",
    },
    {
      value: "21",
    },
    {
      value: "22",
    },
    {
      value: "23",
    },
  ]

  const minute = [
    {
      value: "00",
    },
    {
      value: "01",
    },
    {
      value: "02",
    },
    {
      value: "03",
    },
    {
      value: "04",
    },
    {
      value: "05",
    },
    {
      value: "06",
    },
    {
      value: "07",
    },
    {
      value: "08",
    },
    {
      value: "09",
    },
    {
      value: "10",
    },
    {
      value: "11",
    },
    {
      value: "12",
    },
    {
      value: "13",
    },
    {
      value: "14",
    },
    {
      value: "15",
    },
    {
      value: "16",
    },
    {
      value: "17",
    },
    {
      value: "18",
    },
    {
      value: "19",
    },
    {
      value: "20",
    },
    {
      value: "21",
    },
    {
      value: "22",
    },
    {
      value: "23",
    },
    {
      value: "24",
    },
    {
      value: "25",
    },
    {
      value: "26",
    },
    {
      value: "27",
    },
    {
      value: "28",
    },
    {
      value: "29",
    },
    {
      value: "30",
    },
    {
      value: "31",
    },
    {
      value: "32",
    },
    {
      value: "33",
    },
    {
      value: "34",
    },
    {
      value: "35",
    },
    {
      value: "36",
    },
    {
      value: "37",
    },
    {
      value: "38",
    },
    {
      value: "39",
    },
    {
      value: "40",
    },
    {
      value: "41",
    },
    {
      value: "42",
    },
    {
      value: "43",
    },
    {
      value: "44",
    },
    {
      value: "45",
    },
    {
      value: "46",
    },
    {
      value: "47",
    },
    {
      value: "48",
    },
    {
      value: "49",
    },
    {
      value: "50",
    },
    {
      value: "51",
    },
    {
      value: "52",
    },
    {
      value: "53",
    },
    {
      value: "54",
    },
    {
      value: "55",
    },
    {
      value: "56",
    },
    {
      value: "57",
    },
    {
      value: "58",
    },
    {
      value: "59",
    },
  ]

  return (
    <div className="DAT_Info_Databox" id="SystemTime">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: "GridFirst" })}</div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <div className="DAT_Info_Databox_ExportPowerSettings">
            <div className="DAT_Info_Databox_ExportPowerSettings_Content">
              <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left">
                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: "GridFirstStartTime" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Content">
                    <select>
                      {hour.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                    :
                    <select>
                      {minute.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: "GridFirstStartTime2" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Content">
                    <select>
                      {hour.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                    :
                    <select>
                      {minute.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: "GridFirstStartTime3" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Content">
                    <select>
                      {hour.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                    :
                    <select>
                      {minute.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: 'DischargePowerLimit' })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Content">
                    <input placeholder="0 ~ 100" />
                    %
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item">
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: 'StopSOCatDischarge' })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Content">
                    <input placeholder="0 ~ 100" />
                    %
                  </div>
                </div>
              </div>

              <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center">
                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Tit">
                    {dataLang.formatMessage({ id: 'GridFirstEndTime' })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Content">
                    <select>
                      {hour.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                    :
                    <select>
                      {minute.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Tit">
                    {dataLang.formatMessage({ id: 'GridFirstEndTime2' })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Content">
                    <select>
                      {hour.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                    :
                    <select>
                      {minute.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Tit">
                    {dataLang.formatMessage({ id: 'GridFirstEndTime3' })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Content">
                    <select>
                      {hour.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                    :
                    <select>
                      {minute.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item">
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Tit">
                    {dataLang.formatMessage({ id: 'DischargePowerLimit2' })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Content">
                    <input placeholder="0 ~ 100" />
                    %
                  </div>
                </div>
              </div>

              <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right">
                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Tit">
                    {dataLang.formatMessage({ id: 'GridFirstEnable' })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Tit">
                    {dataLang.formatMessage({ id: 'GridFirstEnable2' })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Tit">
                    {dataLang.formatMessage({ id: 'GridFirstEnable3' })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item">
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Tit">
                    {dataLang.formatMessage({ id: 'DischargePowerLimit3' })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Content">
                    <input placeholder="0 ~ 100" />
                    %
                  </div>
                </div>
              </div>
            </div>

            <div className="DAT_Info_Databox_ExportPowerSettings_Foot">
              <button>
                {dataLang.formatMessage({ id: 'read' })}
              </button>
              <button>
                {dataLang.formatMessage({ id: 'setup' })}
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const BatteryFirst = (props) => {
  const dataLang = useIntl();
  const [display, setDisplay] = useState(true);

  const hour = [
    {
      value: "00",
    },
    {
      value: "01",
    },
    {
      value: "02",
    },
    {
      value: "03",
    },
    {
      value: "04",
    },
    {
      value: "05",
    },
    {
      value: "06",
    },
    {
      value: "07",
    },
    {
      value: "08",
    },
    {
      value: "09",
    },
    {
      value: "10",
    },
    {
      value: "11",
    },
    {
      value: "12",
    },
    {
      value: "13",
    },
    {
      value: "14",
    },
    {
      value: "15",
    },
    {
      value: "16",
    },
    {
      value: "17",
    },
    {
      value: "18",
    },
    {
      value: "19",
    },
    {
      value: "20",
    },
    {
      value: "21",
    },
    {
      value: "22",
    },
    {
      value: "23",
    },
  ]

  const minute = [
    {
      value: "00",
    },
    {
      value: "01",
    },
    {
      value: "02",
    },
    {
      value: "03",
    },
    {
      value: "04",
    },
    {
      value: "05",
    },
    {
      value: "06",
    },
    {
      value: "07",
    },
    {
      value: "08",
    },
    {
      value: "09",
    },
    {
      value: "10",
    },
    {
      value: "11",
    },
    {
      value: "12",
    },
    {
      value: "13",
    },
    {
      value: "14",
    },
    {
      value: "15",
    },
    {
      value: "16",
    },
    {
      value: "17",
    },
    {
      value: "18",
    },
    {
      value: "19",
    },
    {
      value: "20",
    },
    {
      value: "21",
    },
    {
      value: "22",
    },
    {
      value: "23",
    },
    {
      value: "24",
    },
    {
      value: "25",
    },
    {
      value: "26",
    },
    {
      value: "27",
    },
    {
      value: "28",
    },
    {
      value: "29",
    },
    {
      value: "30",
    },
    {
      value: "31",
    },
    {
      value: "32",
    },
    {
      value: "33",
    },
    {
      value: "34",
    },
    {
      value: "35",
    },
    {
      value: "36",
    },
    {
      value: "37",
    },
    {
      value: "38",
    },
    {
      value: "39",
    },
    {
      value: "40",
    },
    {
      value: "41",
    },
    {
      value: "42",
    },
    {
      value: "43",
    },
    {
      value: "44",
    },
    {
      value: "45",
    },
    {
      value: "46",
    },
    {
      value: "47",
    },
    {
      value: "48",
    },
    {
      value: "49",
    },
    {
      value: "50",
    },
    {
      value: "51",
    },
    {
      value: "52",
    },
    {
      value: "53",
    },
    {
      value: "54",
    },
    {
      value: "55",
    },
    {
      value: "56",
    },
    {
      value: "57",
    },
    {
      value: "58",
    },
    {
      value: "59",
    },
  ]

  return (
    <div className="DAT_Info_Databox" id="BatteryFirst">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: "BatteryFirst" })}</div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <div className="DAT_Info_Databox_ExportPowerSettings">
            <div className="DAT_Info_Databox_ExportPowerSettings_Content">
              <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left">
                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: "BatteryFirstStartTime" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Content">
                    <select>
                      {hour.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                    :
                    <select>
                      {minute.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: "BatteryFirstStartTime2" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Content">
                    <select>
                      {hour.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                    :
                    <select>
                      {minute.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: "BatteryFirstStartTime3" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Content">
                    <select>
                      {hour.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                    :
                    <select>
                      {minute.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: "ChargePowerLimit" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Content">
                    <input placeholder="0 ~ 100" />
                    %
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item">
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: "StopSOCatCharge" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Content">
                    <input placeholder="0 ~ 100" />
                    %
                  </div>
                </div>
              </div>

              <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center">
                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Tit">
                    {dataLang.formatMessage({ id: "BatteryFirstEndTime" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Content">
                    <select>
                      {hour.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                    :
                    <select>
                      {minute.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Tit">
                    {dataLang.formatMessage({ id: "BatteryFirstEndTime2" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Content">
                    <select>
                      {hour.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                    :
                    <select>
                      {minute.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Tit">
                    {dataLang.formatMessage({ id: "BatteryFirstEndTime3" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Content">
                    <select>
                      {hour.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                    :
                    <select>
                      {minute.map((item, i) => {
                        return <option key={i}>{item.value}</option>
                      }
                      )}
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Tit">
                    {dataLang.formatMessage({ id: "ChargePowerLimit2" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Content">
                    <input placeholder="0 ~ 100" />
                    %
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item">
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Tit">
                    {dataLang.formatMessage({ id: "InverterChargeEnable" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right">
                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Tit">
                    {dataLang.formatMessage({ id: "BatteryFirstEnable" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Tit">
                    {dataLang.formatMessage({ id: "BatteryFirstEnable2" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Tit">
                    {dataLang.formatMessage({ id: "BatteryFirstEnable3" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                    </select>
                  </div>
                </div>

                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item">
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Tit">
                    {dataLang.formatMessage({ id: "ChargePowerLimit3" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Content">
                    <input placeholder="0 ~ 100" />
                    %
                  </div>
                </div>
              </div>
            </div>

            <div className="DAT_Info_Databox_ExportPowerSettings_Foot">
              <button>
                {dataLang.formatMessage({ id: 'read' })}
              </button>
              <button>
                {dataLang.formatMessage({ id: 'setup' })}
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const ExportPowerSettings = (props) => {
  const dataLang = useIntl();
  const [display, setDisplay] = useState(true);

  return (
    <div className="DAT_Info_Databox" id="ExportPowerSettings">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'ExportPSetting' })}</div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <>
            {(() => {
              switch (info.value.pdata.mode) {
                case "HYBRID":
                  return <div className="DAT_Info_Databox_ExportPowerSettings">
                    <div className="DAT_Info_Databox_ExportPowerSettings_Content">
                      <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left">
                        <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item">
                          <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ExportPEnable' })}:
                          </div>
                          <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Content">
                            <select>
                              <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                              <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center">
                        <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item">
                          <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Tit">
                            {dataLang.formatMessage({ id: 'MetterType' })}:
                          </div>
                          <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Content">
                            <select>
                              <option defaultValue={1} style={{ display: "none" }}>No Meter</option>
                              <option>Tandardel Meter</option>
                              <option>DFUN Meter</option>
                              <option>Eastron Meter</option>
                              <option>Chint Meter</option>
                              <option>Gridbox2</option>
                              <option>Anti-Rejection Box</option>
                              <option>Yada Meter</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right">
                        <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item">
                          <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Tit">
                            {dataLang.formatMessage({ id: 'ExportPLimit' })}:
                          </div>
                          <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Content">
                            <input placeholder="-600.0 ~ 600.0" />
                            kW
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="DAT_Info_Databox_ExportPowerSettings_Foot">
                      <button>
                        {dataLang.formatMessage({ id: 'read' })}
                      </button>
                      <button>
                        {dataLang.formatMessage({ id: 'setup' })}
                      </button>
                    </div>
                  </div>
                case "CONSUMPTION":
                  return
                default:
                  return <div className="DAT_Info_Databox_ExportPowerSettings">
                    <div className="DAT_Info_Databox_ExportPowerSettings_Content">
                      <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left">
                        <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ExportPEnable' })}:
                          </div>
                          <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Content">
                            <select>
                              <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                              <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                            </select>
                          </div>
                        </div>
                        <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item">
                          <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Tit">
                            {dataLang.formatMessage({ id: 'ExportPLimit' })}:
                          </div>
                          <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Content">
                            <input placeholder="-600.0 ~ 600.0" />
                            kW
                          </div>
                        </div>
                      </div>
                      <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center">
                        {/* <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item" style={{ marginBottom: "24px" }}>
                        <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Tit">
                          Multi ExportLimit:
                          {dataLang.formatMessage({ id: 'MultiExportLimit' })}:
                        </div>
                        <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Content">
                          <select>
                            <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                            <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                          </select>
                        </div>
                      </div> */}
                        <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item">
                          <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Tit">
                            {dataLang.formatMessage({ id: 'ExportLimitWay' })} :
                          </div>
                          <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Content">
                            <select>
                              <option>{dataLang.formatMessage({ id: 'LimitSinglePhase' })}</option>
                              <option>{dataLang.formatMessage({ id: 'LimitThreePhase' })}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right">
                        <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                          <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Tit">
                            {dataLang.formatMessage({ id: 'MetterType' })} :
                          </div>
                          <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Content">
                            <select>
                              <option>CT</option>
                              <option>Tandardel Meter</option>
                              <option>DFUN Meter</option>
                              <option>Eastron Meter</option>
                              <option>Chint Meter</option>
                              <option>Gridbox2</option>
                              <option>Anti-Rejection Box</option>
                              <option>Yada Meter</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="DAT_Info_Databox_ExportPowerSettings_Foot">
                      <button>
                        {dataLang.formatMessage({ id: 'read' })}
                      </button>
                      <button>
                        {dataLang.formatMessage({ id: 'setup' })}
                      </button>
                    </div>
                  </div>
              }
            })()}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const BatterySettings = (props) => {
  const dataLang = useIntl();
  const [display, setDisplay] = useState(true);

  return (
    <div className="DAT_Info_Databox" id="BatterySettings">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: "BatterySettings" })}</div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <div className="DAT_Info_Databox_ExportPowerSettings">
            <div className="DAT_Info_Databox_ExportPowerSettings_Content">
              <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left">
                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item">
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: "BatteryType" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: "LeadAcidBattery" })}</option>
                      <option>{dataLang.formatMessage({ id: "LithumBattery" })}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center">
                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item">
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Tit">
                    {dataLang.formatMessage({ id: "BatteryManu" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Center_Item_Content">
                    <select>
                      <option>Lead Acid Battery</option>
                      <option>ATL Battery</option>
                      <option>PYLON Battery</option>
                      <option>Vestwoods Battery</option>
                      <option>Topband Battery</option>
                      <option>Sunwoda Battery</option>
                      <option>HANCHU Battery</option>
                      <option>INVT Battery</option>
                      <option>LiValley Battery</option>
                      <option>DONGCI Battery</option>
                      <option>JGNE Battery</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right">
                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item">
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Tit">
                    {dataLang.formatMessage({ id: "BatteryDOD" })}:
                  </div>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Content">
                    <input placeholder="0 ~ 100" /> %
                  </div>
                </div>
              </div>
            </div>

            <div className="DAT_Info_Databox_ExportPowerSettings_Foot">
              <button>
                {dataLang.formatMessage({ id: 'read' })}
              </button>
              <button>
                {dataLang.formatMessage({ id: 'setup' })}
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const DeviceSettings = (props) => {
  const dataLang = useIntl();
  const [display, setDisplay] = useState(true);

  return (
    <div className="DAT_Info_Databox" id="DeviceSettings">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'DeviceSettings' })}</div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <div className="DAT_Info_Databox_DeviceSettings">
            <div className="DAT_Info_Databox_DeviceSettings_Content">
              <div className="DAT_Info_Databox_DeviceSettings_Content_Left">
                <div className="DAT_Info_Databox_DeviceSettings_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: 'RemoteControl' })}:
                  </div>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Left_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: 'PowerOn' })}</option>
                      <option>{dataLang.formatMessage({ id: 'PowerOff' })}</option>
                    </select>
                  </div>
                </div>
                <div className="DAT_Info_Databox_DeviceSettings_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: 'SafetySetting' })}:
                  </div>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Left_Item_Content">
                    <select>
                      <option defaultValue={1} disabled hidden>{dataLang.formatMessage({ id: 'PleaseSel' })}</option>
                      <option>CQC2013</option>
                      <option>SKYWORTH</option>
                      <option>EN50549</option>
                      <option>Brazil</option>
                      <option>{dataLang.formatMessage({ id: 'Spain' })}</option>
                      <option>Philippines</option>
                      <option>{dataLang.formatMessage({ id: 'India' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Belgium' })}</option>
                      <option>EU EN50438</option>
                      <option>{dataLang.formatMessage({ id: 'SouthAfrica' })}</option>
                      <option>{dataLang.formatMessage({ id: 'WestAustralia' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Netherlands' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Thailand' })}</option>
                      <option>Bangkok</option>
                      <option>China CQC2018</option>
                      <option>{dataLang.formatMessage({ id: 'Greece' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Norway' })}</option>
                      <option>{dataLang.formatMessage({ id: 'SouthKorea' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Germany' })}</option>
                      <option>{dataLang.formatMessage({ id: 'France' })}</option>
                      <option>Ireland</option>
                      <option>{dataLang.formatMessage({ id: 'Turkey' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Taiwan' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Italy' })}</option>
                      <option>Slovakia</option>
                      <option>Romania 280V</option>
                    </select>
                  </div>
                </div>
                {/* <div className="DAT_Info_Databox_DeviceSettings_Content_Left_Item">
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Left_Item_Tit">
                    AC High-Voltage Load Limit:
                  </div>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Left_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                    </select>
                  </div>
                </div> */}
              </div>
              <div className="DAT_Info_Databox_DeviceSettings_Content_Center">
                <div className="DAT_Info_Databox_DeviceSettings_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Center_Item_Tit">
                    {dataLang.formatMessage({ id: 'ActivePowerSetting' })}:
                  </div>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Center_Item_Content">
                    <input placeholder="0.0 ~ 100.0" />
                    %
                  </div>
                </div>
                <div className="DAT_Info_Databox_DeviceSettings_Content_Center_Item">
                  {/* <div className="DAT_Info_Databox_DeviceSettings_Content_Center_Item_Tit">
                    Virtual Zero Line Enable:
                  </div>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Center_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: 'Enable' })}</option>
                      <option>{dataLang.formatMessage({ id: 'Disable' })}</option>
                    </select>
                  </div> */}
                </div>
              </div>
              <div className="DAT_Info_Databox_DeviceSettings_Content_Right">
                <div className="DAT_Info_Databox_DeviceSettings_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Right_Item_Tit">
                    {/* Reactive Power Control Way: */}
                    {dataLang.formatMessage({ id: 'ReactivePowerSetting' })}:
                  </div>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Right_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: 'PowerFactor' })}</option>
                      <option>{dataLang.formatMessage({ id: 'ReactivePPercentage' })}</option>
                    </select>
                  </div>
                </div>
                <div className="DAT_Info_Databox_DeviceSettings_Content_Right_Item">
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Right_Item_Tit">
                    {/* Input Mode Settings: */}
                    {dataLang.formatMessage({ id: 'InputModeSetting' })}:
                  </div>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Right_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: 'IndependentMode' })}</option>
                      <option>{dataLang.formatMessage({ id: 'ParrallellMode' })}</option>
                      <option>{dataLang.formatMessage({ id: 'DCSourceMode' })}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="DAT_Info_Databox_DeviceSettings_Foot">
              <button>
                {dataLang.formatMessage({ id: 'read' })}
              </button>
              <button>
                {dataLang.formatMessage({ id: 'setup' })}
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const GridInfo = (props) => {
  const dataLang = useIntl();
  const [display, setDisplay] = useState(true);

  return (
    <div className="DAT_Info_Databox" id="GridInfo">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'GridInfor' })}</div>
        <div className="DAT_Info_Databox_Title_Right"
          onClick={() => setDisplay(!display)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: display ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div className="Animation"
        style={{ height: display ? "100%" : "0px", transition: "0.5s" }}
      >
        {display ? (
          <div className="DAT_Info_Databox_GridInfo">
            <div className="DAT_Info_Databox_GridInfo_Content">
              <div className="DAT_Info_Databox_GridInfo_Content_Left">
                <div className="DAT_Info_Databox_GridInfo_Content_Left_Item">
                  <div className="DAT_Info_Databox_GridInfo_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: 'InverterStatus' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridInfo_Content_Left_Item_Content">
                    <select>
                      <option defaultValue={1} style={{ display: "none" }}>{dataLang.formatMessage({ id: 'PleaseSel' })}</option>
                      <option>{dataLang.formatMessage({ id: 'StatusInit' })}</option>
                      <option>{dataLang.formatMessage({ id: 'StatusWait' })}</option>
                      <option>{dataLang.formatMessage({ id: 'StatusOnGrid' })}</option>
                      <option>{dataLang.formatMessage({ id: 'failure' })}</option>
                      <option>{dataLang.formatMessage({ id: 'burn' })}</option>
                      <option>{dataLang.formatMessage({ id: 'StatusOffGrid' })}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="DAT_Info_Databox_GridInfo_Foot">
              <button>
                {dataLang.formatMessage({ id: 'read' })}
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const LastCommandRecord = (props) => {
  const dataLang = useIntl();

  return (
    <div className="DAT_Info_Databox" id="LastCommandRecord">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'LastCommandRecord' })}</div>
      </div>

      <div className="DAT_Info_Databox_LastCommandRecord">
        <div className="DAT_Info_Databox_LastCommandRecord_Content">
          <div className="DAT_Info_Databox_LastCommandRecord_Content_Left">
            <div className="DAT_Info_Databox_LastCommandRecord_Content_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Left_Item_Tit">
                {dataLang.formatMessage({ id: 'InverterStatus' })}:
              </div>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Left_Item_Content">
                {dataLang.formatMessage({ id: 'ReadACStartHighVolt' })}
              </div>
            </div>
            <div className="DAT_Info_Databox_LastCommandRecord_Content_Left_Item">
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Left_Item_Tit">
                {dataLang.formatMessage({ id: 'ReadResult' })}:
              </div>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Left_Item_Content">
                264.5 V
              </div>
            </div>
          </div>
          <div className="DAT_Info_Databox_LastCommandRecord_Content_Center">
            <div className="DAT_Info_Databox_LastCommandRecord_Content_Center_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Center_Item_Tit">
                {dataLang.formatMessage({ id: 'CommandType' })}:
              </div>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Center_Item_Content">
                {dataLang.formatMessage({ id: 'read' })}
              </div>
            </div>
            <div className="DAT_Info_Databox_LastCommandRecord_Content_Center_Item">
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Center_Item_Tit">
                {dataLang.formatMessage({ id: 'SendTime' })}:
              </div>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Center_Item_Content">
                2024/03/25 10:30:49 UTC+07:00
              </div>
            </div>
          </div>
          <div className="DAT_Info_Databox_LastCommandRecord_Content_Right">
            <div className="DAT_Info_Databox_LastCommandRecord_Content_Right_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Right_Item_Tit">
                {dataLang.formatMessage({ id: 'CommandState' })}:
              </div>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Right_Item_Content">
                <FaCheckCircle size={16} color="green" />
                <span style={{ color: "green" }}>
                  {dataLang.formatMessage({ id: 'success' })}
                </span>
              </div>
            </div>
            <div className="DAT_Info_Databox_LastCommandRecord_Content_Right_Item">
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Right_Item_Tit">
                {dataLang.formatMessage({ id: 'FeedbackTime' })}:
              </div>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Right_Item_Content">
                2024/03/25 10:30:50 UTC+07:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectCommand = (props) => {
  const dataLang = useIntl();

  const commandName = [
    // AC Start Voltage
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACStartHighVoltage' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACStartHighVoltage' }),
    },
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACStartLowVoltage' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACStartLowVoltage' }),
    },
    //AC Start Frequency 
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACStartHighFrequency' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACStartHighFrequency' }),
    },
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACStartLowFrequency' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACStartLowFrequency' }),
    },
    //AC Start Volt level 1 
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt1' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt1' }),
    },
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt1' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt1' }),
    },
    //AC Start Volt 1 Time
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt1Time' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt1Time' }),
    },
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt1Time' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt1Time' }),
    },
    //AC Start Volt 2
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt2' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt2' }),
    },
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt2' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt2' }),
    },
    //AC Start Volt 2 Time
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt2Time' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderVolt2Time' }),
    },
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt2Time' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverVolt2Time' }),
    },
    //AC Frequency level 1
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq1' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq1' }),
    },
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq1' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq1' }),
    },
    //AC Frequency 1 Time
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq1Time' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq1Time' }),
    },
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq1Time' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq1Time' }),
    },
    //AC Frequency level 2
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq2' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq2' }),
    },
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq2' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq2' }),
    },
    //AC Frequency 2 Time
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq2Time' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACUnderFreq2Time' }),
    },
    {
      name: dataLang.formatMessage({ id: 'read' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq2Time' }),
    },
    {
      name: dataLang.formatMessage({ id: 'Set' }) + " " + dataLang.formatMessage({ id: 'ACOverFreq2Time' }),
    },
    //Other Options
    {
      name: dataLang.formatMessage({ id: 'ReadInverters' })
    },
    {
      name: dataLang.formatMessage({ id: 'SetInverters' })
    },
    {
      name: dataLang.formatMessage({ id: 'ReadCTRatio' })
    },
    {
      name: dataLang.formatMessage({ id: 'SetCTRatio' })
    },
  ];

  return (
    <div className="DAT_Info_Databox" id="SelectCommand">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'SelCommand' })}</div>
      </div>

      <div className="DAT_Info_Databox_SelectCommand">
        <div className="DAT_Info_Databox_SelectCommand_Content">
          <div className="DAT_Info_Databox_SelectCommand_Content_Left">
            <div className="DAT_Info_Databox_SelectCommand_Content_Left_Item">
              <div className="DAT_Info_Databox_SelectCommand_Content_Left_Item_Tit">
                {dataLang.formatMessage({ id: 'InverterStatus' })}:
              </div>
              <div className="DAT_Info_Databox_SelectCommand_Content_Left_Item_Content">
                <select>
                  <option defaultValue={1} style={{ display: "none" }}>{dataLang.formatMessage({ id: 'PleaseSel' })}</option>
                  {commandName.map((item, i) => {
                    return <option key={i}>{item.name}</option>
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="DAT_Info_Databox_SelectCommand_Foot">
          <div className="DAT_Info_Databox_SelectCommand_Foot_Item">
            <span>
              {dataLang.formatMessage({ id: 'Timeout' })}:
            </span>
            <input />
            <span>{dataLang.formatMessage({ id: 'Timeout' })}</span>

            <div className="DAT_Home_Overview-Main-Percent-Icon" style={{ cursor: 'pointer' }}>
              <PopupState variant="popper" popupId="demo-popup-popper">
                {(popupState) => (
                  <div style={{ cursor: 'pointer' }}>
                    <HelpOutlineIcon
                      {...bindHover(popupState)}
                      color="action"
                      fontSize="9px" />
                    <Popper {...bindPopper(popupState)} transition >
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper sx={{ width: '400px', marginLeft: '200px', p: 2 }}>
                            <Typography sx={{ fontSize: '12px', textAlign: 'justify', marginBottom: 1.7 }}>
                              {dataLang.formatMessage({ id: 'timeoutInfo' })}
                            </Typography>
                          </Paper>
                        </Fade>
                      )}
                    </Popper>
                  </div>
                )}
              </PopupState>
            </div>
          </div>
          <button>{dataLang.formatMessage({ id: 'SendCommand' })}</button>
        </div>
      </div >
    </div >
  );
};

const CustomizedCommand = (props) => {
  const dataLang = useIntl();

  return (
    <>
      <div className="DAT_Info_Databox" id="CustomizedCommand">
        <div className="DAT_Info_Databox_CustomizedCommand">
          <div className="DAT_Info_Databox_CustomizedCommand_Content" style={{ height: "300px" }}>
          </div>
        </div>
      </div>

      <div className="DAT_Info_Databox" id="CustomizedCommand">
        <div className="DAT_Info_Databox_CustomizedCommand">
          <div className="DAT_Info_Databox_CustomizedCommand_Foot">
            <div className="DAT_Info_Databox_CustomizedCommand_Foot_Func">
              <select>
                <option>{dataLang.formatMessage({ id: 'OneminsTimeout' })}</option>
                <option>{dataLang.formatMessage({ id: 'TwominsTimeout' })}</option>
                <option>{dataLang.formatMessage({ id: 'ThreeminsTimeout' })}</option>
                <option>{dataLang.formatMessage({ id: 'FourminsTimeout' })}</option>
                <option>{dataLang.formatMessage({ id: 'FiveminsTimeout' })}</option>
                <option>{dataLang.formatMessage({ id: 'SixminsTimeout' })}</option>
                <option>{dataLang.formatMessage({ id: 'SevenminsTimeout' })}</option>
                <option>{dataLang.formatMessage({ id: 'EightminsTimeout' })}</option>
                <option>{dataLang.formatMessage({ id: 'NineminsTimeout' })}</option>
                <option>{dataLang.formatMessage({ id: 'TenminsTimeout' })}</option>
              </select>
              <button>{dataLang.formatMessage({ id: 'ClickCalculateCRC' })}</button>
            </div>
            <textarea placeholder="Please Enter Command" />
            <div className="DAT_Info_Databox_CustomizedCommand_Foot_Button">
              <button>{dataLang.formatMessage({ id: 'confirm' })}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ControlLog = (props) => {
  const dataLang = useIntl();

  const paginationComponentOptions = {
    rowsPerPageText: dataLang.formatMessage({ id: "row" }),
    rangeSeparatorText: dataLang.formatMessage({ id: "to" }),
    selectAllRowsItem: true,
    selectAllRowsItemText: dataLang.formatMessage({ id: "showAll" }),
  };

  const columnLog = [
    {
      name: dataLang.formatMessage({ id: 'SentTime' }),
      selector: (row) => row.senttime,
      sortable: true,
      // width: "80px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'CommandName' }),
      selector: (row) => row.name,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'CommandType' }),
      selector: (row) => row.type,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'Inputs' }),
      selector: (row) => row.input,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'ReturnResult' }),
      selector: (row) => row.result,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'CommandState' }),
      selector: (row) => row.state,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'ReasonOfFailure' }),
      selector: (row) => row.reason,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'Operator' }),
      selector: (row) => row.operator,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'FeedbackTime' }),
      selector: (row) => row.feedbacktime,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
  ];

  return (
    <div className="DAT_Info_Databox" id="ControlLog">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">
          <select>
            <option>{dataLang.formatMessage({ id: 'CommandState' })}</option>
          </select>
        </div>
      </div>

      <div className="DAT_Info_Databox_ControlLog">
        <DataTable
          className="DAT_Table_Device"
          columns={columnLog}
          data={data}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader={true}
          noDataComponent={<Empty />}
        />
      </div>
    </div>
  );
};

const FirmwareUpgrade = (props) => {
  const dataLang = useIntl();

  return (
    <>
      <div className="DAT_Info_Databox" id="FirmwareUpgrade">
        <div className="DAT_Info_Databox_Title">
          <div className="DAT_Info_Databox_Title_Left">{dataLang.formatMessage({ id: 'CurrentVersion' })}</div>
        </div>

        <div className="DAT_Info_Databox_FirmwareUpgrade">
          <div className="DAT_Info_Databox_FirmwareUpgrade_Current">
            <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Left">
              <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Left_Item"
                style={{
                  display: isMobile.value ? "block" : "flex",
                  marginBottom: isMobile.value ? "16px" : "0px"
                }}
              >
                <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Left_Item_Tit"
                  style={{ marginBottom: isMobile.value ? "8px" : "0px" }}
                >
                  {dataLang.formatMessage({ id: 'CertificationVersion' })}:
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Left_Item_Content">
                  GAA
                </div>
              </div>
            </div>
            <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Center">
              <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Center_Item"
                style={{
                  display: isMobile.value ? "block" : "flex",
                  marginBottom: isMobile.value ? "16px" : "0px"
                }}

              >
                <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Center_Item_Tit"
                  style={{ marginBottom: isMobile.value ? "8px" : "0px" }}
                >
                  {dataLang.formatMessage({ id: 'InternalSoftwareVersion' })}:
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Center_Item_Content">
                  1110-0-0-203
                </div>
              </div>
            </div>
            <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Right">
              <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Right_Item"
                style={{ display: isMobile.value ? "block" : "flex" }}

              >
                <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Right_Item_Tit"
                  style={{ marginBottom: isMobile.value ? "8px" : "0px" }}
                >
                  {dataLang.formatMessage({ id: 'UpgradeFlagBit' })}:
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Right_Item_Content">
                  2
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="DAT_Info_Databox" id="FirmwareUpgrade">
        <div className="DAT_Info_Databox_Title">
          <div className="DAT_Info_Databox_Title_Left">
            {dataLang.formatMessage({ id: 'LastUpgradeRecord' })}:
          </div>
        </div>

        <div className="DAT_Info_Databox_FirmwareUpgrade">
          <div className="DAT_Info_Databox_FirmwareUpgrade_Last">
            <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Left">
              <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Left_Item" style={{ marginBottom: isMobile.value ? "16px" : "24px" }}>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Left_Item_Tit">
                  {dataLang.formatMessage({ id: "TargetVersion" })}:
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Left_Item_Content">
                  XG5-10KTL_arm_203_Vietnam
                </div>
              </div>
              <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Left_Item" style={{ marginBottom: isMobile.value ? "16px" : "0px" }}>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Left_Item_Tit">
                  {dataLang.formatMessage({ id: 'UpgradePhase' })}:
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Left_Item_Content">
                  <FaCheckCircle size={16} color="green" />
                  <span style={{ color: "green" }}>
                    {dataLang.formatMessage({ id: "success" })}
                  </span>
                </div>
              </div>
            </div>
            <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Center">
              <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Center_Item" style={{ marginBottom: isMobile.value ? "16px" : "24px" }}>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Center_Item_Tit">
                  {dataLang.formatMessage({ id: "RelatedVersion" })}::
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Center_Item_Content">
                  {dataLang.formatMessage({ id: "InternalSoftwareVersion" })}
                </div>
              </div>
              <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Center_Item" style={{ marginBottom: isMobile.value ? "16px" : "0px" }}>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Center_Item_Tit">
                  {dataLang.formatMessage({ id: "FeedbackTime" })}:
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Center_Item_Content">
                  2024/03/11 08:50:17 UTC+07:00
                </div>
              </div>
            </div>
            <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Right">
              <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Right_Item">
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Right_Item_Tit">
                  {dataLang.formatMessage({ id: "UpgradedTime" })}:
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Right_Item_Content">
                  2024/03/11 08:48:18 UTC+07:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="DAT_Info_Databox" id="FirmwareUpgrade">
        <div className="DAT_Info_Databox_Title">
          <div className="DAT_Info_Databox_Title_Left">
            {dataLang.formatMessage({ id: "UpgradeOperation" })}:
          </div>
          <div className="DAT_Info_Databox_Title_Right">
            <span>
              {dataLang.formatMessage({ id: "LoggerDownloadMethods" })}:
            </span>
            <select>
              <option>{dataLang.formatMessage({ id: "IPDownload" })}</option>
            </select>
          </div>
        </div>

        <div className="DAT_Info_Databox_FirmwareUpgrade">
          <div className="DAT_Info_Databox_FirmwareUpgrade_Upgrade">
            <div className="DAT_Info_Databox_FirmwareUpgrade_Upgrade_Left">
              <div className="DAT_Info_Databox_FirmwareUpgrade_Upgrade_Left_Item" style={{ marginBottom: isMobile.value ? "8px" : "24px" }}>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Upgrade_Left_Item_Tit">
                  {dataLang.formatMessage({ id: "SelFirmwarePackage" })}:
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Upgrade_Left_Item_Content">
                  <button>
                    {dataLang.formatMessage({ id: "ClickSelectFirmwarePackage" })}
                  </button>
                </div>
              </div>
              <div className="DAT_Info_Databox_FirmwareUpgrade_Upgrade_Left_Item">
                <div className="DAT_Info_Databox_FirmwareUpgrade_Upgrade_Left_Item_Tit">
                  {dataLang.formatMessage({ id: "Timeout" })}:

                  <div className="DAT_Home_Overview-Main-Percent-Icon" style={{ cursor: 'pointer' }}>
                    <PopupState variant="popper" popupId="demo-popup-popper">
                      {(popupState) => (
                        <div style={{ cursor: 'pointer' }}>
                          <HelpOutlineIcon
                            {...bindHover(popupState)}
                            color="action"
                            fontSize="9px" />
                          <Popper {...bindPopper(popupState)} transition >
                            {({ TransitionProps }) => (
                              <Fade {...TransitionProps} timeout={350}>
                                <Paper sx={{ width: '400px', marginLeft: '200px', p: 2 }}>
                                  <Typography sx={{ fontSize: '12px', textAlign: 'justify', marginBottom: 1.7 }}>
                                    {dataLang.formatMessage({ id: 'timeoutInfo' })}
                                  </Typography>
                                </Paper>
                              </Fade>
                            )}
                          </Popper>
                        </div>
                      )}
                    </PopupState>
                  </div>
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Upgrade_Left_Item_Content">
                  <input />
                  <span>
                    {dataLang.formatMessage({ id: "Minute" })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="DAT_Info_Databox_FirmwareUpgrade_Foot">
            <button>
              {dataLang.formatMessage({ id: "StartUpgrading" })}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const UpgradelLog = (props) => {
  const dataLang = useIntl();

  const paginationComponentOptions = {
    rowsPerPageText: dataLang.formatMessage({ id: "row" }),
    rangeSeparatorText: dataLang.formatMessage({ id: "to" }),
    selectAllRowsItem: true,
    selectAllRowsItemText: dataLang.formatMessage({ id: "showAll" }),
  };

  const columnLog = [
    {
      name: dataLang.formatMessage({ id: 'UpgradedTime' }),
      selector: (row) => row.upgradedtime,
      sortable: true,
      // width: "80px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'FirmwarePackage' }),
      selector: (row) => row.package,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'TargetVersion' }),
      selector: (row) => row.target,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'RelatedVersion' }),
      selector: (row) => row.related,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'UpgradeState' }),
      selector: (row) => row.state,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'ParseResult' }),
      selector: (row) => row.result,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'ReasonOfFailure' }),
      selector: (row) => row.reason,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'Operator' }),
      selector: (row) => row.operator,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: dataLang.formatMessage({ id: 'FeedbackTime' }),
      selector: (row) => row.feedbacktime,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
  ];

  return (
    <div className="DAT_Info_Databox" id="ControlLog">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">
          <select>
            <option>{dataLang.formatMessage({ id: 'UpgradeState' })}</option>
          </select>
        </div>
      </div>

      <div className="DAT_Info_Databox_ControlLog">
        <DataTable
          className="DAT_Table_Device"
          columns={columnLog}
          data={data_}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader={true}
          noDataComponent={<Empty />}
        />
      </div>
    </div>
  );
};

export default function Info(props) {
  const dataLang = useIntl();
  const [dropState, setDropState] = useState(false);
  const [view, setView] = useState("detail");
  const [nav, setNav] = useState("batch");
  const [nav_, setNav_] = useState("firmware");

  const popup_state = {
    pre: { transform: "rotate(0deg)", transition: "0.5s", color: "rgba(11, 25, 103)" },
    new: { transform: "rotate(90deg)", transition: "0.5s", color: "rgba(11, 25, 103)" },
  };

  const handlePopup = (state) => {
    const popup = document.getElementById("Popup");
    popup.style.transform = popup_state[state].transform;
    popup.style.transition = popup_state[state].transition;
    popup.style.color = popup_state[state].color;
  };

  const handleOutsideView = (e) => {
    setTimeout(() => {
      if (viewStateNav.value[1] == false) {
        viewNav.value = false;
        viewStateNav.value = [false, false];
      }
      clearTimeout();
    }, 250);
  };

  return (
    <div className="DAT_Info">
      <div className="DAT_Info_Header">
        <div className="DAT_Info_Header_Left">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "16px" }}>
            {info.value.pname}: {info.value.psn}
            {tab.value == "logger"
              ? <>
                {info.value.pstate == 1 ? (
                  <FaCheckCircle size={20} color="green" />
                ) : (
                  <MdOutlineError size={22} color="red" />
                )}
              </>
              : <>
                {info.value.invt?.[info.value.pdata.status] == 2 ? (
                  <FaCheckCircle size={20} color="green" />
                ) : (
                  <MdOutlineError size={22} color="red" />
                )}
              </>
            }
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "16px" }}>
            {(() => {
              switch (tab.value) {
                case 'logger':
                  return (
                    <div className="DAT_Info_Header_Left_Close" onClick={() => props.handleClose()}>
                      <IoClose
                        id="Popup"
                        onMouseEnter={(e) => handlePopup("new")}
                        onMouseLeave={(e) => handlePopup("pre")}
                        size={25}
                        color="rgba(11, 25, 103)"
                      />
                    </div>
                  )
                case 'inverter':
                  return (
                    <>
                      <div className="DAT_Info_Header_Left_More">
                        <BsThreeDotsVertical
                          size={20}
                          color="#9e9e9e"
                          onClick={() => {
                            setDropState(!dropState);
                            viewNav.value = true;
                            viewStateNav.value = [true, false];
                          }}
                          onMouseLeave={() => handleOutsideView()}
                        />
                      </div>

                      <div className="DAT_Info_Header_Left_Close" onClick={() => props.handleClose()}>
                        <IoClose
                          id="Popup"
                          onMouseEnter={(e) => handlePopup("new")}
                          onMouseLeave={(e) => handlePopup("pre")}
                          size={25}
                          color="rgba(11, 25, 103)"
                        />
                      </div>
                    </>
                  )
                default:
                  return <></>
              }
            })()}
          </div>
        </div>

        <div className="DAT_Info_Header_Right">
          {(() => {
            switch (view) {
              case "control":
                return (
                  <div style={{ display: "flex", alignItems: "center", paddingLeft: isMobile.value ? "0px" : "16px", boxSizing: "border-box" }}>
                    <button className="DAT_Info_Header_Right_Item"
                      id="batch"
                      onClick={() => { setNav("batch") }}
                      style={{ color: nav === "batch" ? "rgba(11, 25, 103)" : "gray", borderBottom: nav === "batch" ? "solid 2px rgba(11, 25, 103)" : "solid 2px white" }}
                    >
                      {dataLang.formatMessage({ id: "BatchCommand" })}
                    </button>
                    <button className="DAT_Info_Header_Right_Item"
                      id="single"
                      onClick={() => { setNav("single") }}
                      style={{ color: nav === "single" ? "rgba(11, 25, 103)" : "gray", borderBottom: nav === "single" ? "solid 2px rgba(11, 25, 103)" : "solid 2px white" }}
                    >
                      {dataLang.formatMessage({ id: "SingleCommand" })}
                    </button>
                    <button className="DAT_Info_Header_Right_Item"
                      id="customized"
                      onClick={() => { setNav("customized") }}
                      style={{ color: nav === "customized" ? "rgba(11, 25, 103)" : "gray", borderBottom: nav === "customized" ? "solid 2px rgba(11, 25, 103)" : "solid 2px white" }}
                    >
                      {dataLang.formatMessage({ id: "CustomizedCommand" })}
                    </button>
                    <button className="DAT_Info_Header_Right_Item"
                      id="log"
                      onClick={() => { setNav("log") }}
                      style={{ color: nav === "log" ? "rgba(11, 25, 103)" : "gray", borderBottom: nav === "log" ? "solid 2px rgba(11, 25, 103)" : "solid 2px white" }}
                    >
                      {dataLang.formatMessage({ id: "ControlLog" })}
                    </button>
                  </div>
                )
              case "update":
                return (
                  <div style={{ display: "flex", alignItems: "center", paddingLeft: isMobile.value ? "0px" : "16px", boxSizing: "border-box" }}>
                    <button className="DAT_Info_Header_Right_Item"
                      id="firmware"
                      onClick={() => { setNav_("firmware") }}
                      style={{ color: nav_ === "firmware" ? "rgba(11, 25, 103)" : "gray", borderBottom: nav_ === "firmware" ? "solid 2px rgba(11, 25, 103)" : "solid 2px white" }}
                    >
                      {dataLang.formatMessage({ id: "FirmwareUpgrade" })}
                    </button>
                    <button className="DAT_Info_Header_Right_Item"
                      id="upgrade"
                      onClick={() => { setNav_("upgrade") }}
                      style={{ color: nav_ === "upgrade" ? "rgba(11, 25, 103)" : "gray", borderBottom: nav_ === "upgrade" ? "solid 2px rgba(11, 25, 103)" : "solid 2px white" }}
                    >
                      {dataLang.formatMessage({ id: "UpdateLog" })}
                    </button>
                  </div>
                )
              default:
                return <></>
            }
          })()}
        </div>
      </div>

      {(() => {
        switch (tab.value) {
          case "inverter":
            return (
              <>
                {(() => {
                  switch (view) {
                    case "control":
                      return (
                        <>
                          {(() => {
                            switch (nav) {
                              case "single":
                                return (
                                  <>
                                    <LastCommandRecord />
                                    <SelectCommand />
                                  </>
                                )
                              case "customized":
                                return (
                                  <>
                                    <CustomizedCommand />
                                  </>
                                )
                              case "log":
                                return (
                                  <>
                                    <ControlLog />
                                  </>
                                )
                              default:
                                return (
                                  <>
                                    {(() => {
                                      switch (info.value.pdata.mode) {
                                        case "HYBRID":
                                          return (
                                            <>
                                              <GridStartSettings />
                                              <GridVolt />
                                              <SystemTime />
                                              <GridFirst />
                                              <BatteryFirst />
                                              <ExportPowerSettings />
                                              <BatterySettings />
                                            </>
                                          )
                                        case "CONSUMPTION":
                                          return
                                        default:
                                          return (
                                            <>
                                              <GridStartSettings />
                                              <GridVolt />
                                              <ExportPowerSettings />
                                              <DeviceSettings />
                                              <GridInfo />
                                            </>
                                          )
                                      }
                                    })()}
                                  </>
                                )
                            }
                          })()}
                        </>
                      )
                    case "update":
                      return (
                        <>
                          {(() => {
                            switch (nav_) {
                              case "upgrade":
                                return (
                                  <>
                                    <UpgradelLog />
                                  </>
                                )
                              default:
                                return (
                                  <>
                                    <FirmwareUpgrade />
                                  </>
                                )
                            }
                          })()}
                        </>
                      )
                    default:
                      return (
                        <>
                          <BasicInformation />
                          <VersionInformation />
                          <ElectricityGeneration />
                          {/* <PowerGrid /> */}
                          {/* <ElectricityConsumption /> */}
                          <Temperature />
                          <State />
                          {/* <Control /> */}
                          <HistoricalData />
                        </>
                      )
                  }
                })()}
              </>
            );
          case "meter":
            return (
              <>
                <BasicInformation />
                <VersionInformation />
              </>
            );
          case "logger":
            return (
              <>
                <BasicInformation />
                <VersionInformation />
                <OperationInformation />
              </>
            );
          default:
            return <></>;
        }
      })()}

      {dropState ? (
        <div className="DAT_InfoDrop"
          style={{ display: viewNav.value ? "block" : "none" }}
          onMouseEnter={() => {
            viewStateNav.value = [true, true];
          }}
          onMouseLeave={() => {
            viewNav.value = false;
            viewStateNav.value = [false, false];
          }}
        >
          {(() => {
            switch (view) {
              case "control":
                return <>
                  <div className="DAT_InfoDrop_Item"
                    style={{ borderBottom: "1px solid #e0e0e0" }}
                    onClick={() => { setView("detail"); setDropState(false) }}
                  >
                    {dataLang.formatMessage({ id: 'monitor' })}
                  </div>
                  <div className="DAT_InfoDrop_Item"
                    onClick={() => { setView("update"); setDropState(false) }}
                  >
                    {dataLang.formatMessage({ id: 'update' })}
                  </div>
                </>
              case "update":
                return <>
                  <div className="DAT_InfoDrop_Item"
                    style={{ borderBottom: "1px solid #e0e0e0" }}
                    onClick={() => { setView("detail"); setDropState(false) }}
                  >
                    {dataLang.formatMessage({ id: 'monitor' })}
                  </div>
                  <div className="DAT_InfoDrop_Item"
                    style={{ borderBottom: "1px solid #e0e0e0" }}
                    onClick={() => { setView("control"); setDropState(false) }}
                  >
                    {dataLang.formatMessage({ id: 'control' })}
                  </div>
                </>
              default:
                return <>
                  <div className="DAT_InfoDrop_Item"
                    style={{ borderBottom: "1px solid #e0e0e0" }}
                    onClick={() => { setView("control"); setDropState(false) }}
                  >
                    {dataLang.formatMessage({ id: 'control' })}
                  </div>
                  <div className="DAT_InfoDrop_Item"
                    onClick={() => { setView("update"); setDropState(false) }}
                  >
                    {dataLang.formatMessage({ id: 'update' })}
                  </div>
                </>
            }
          })()}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
