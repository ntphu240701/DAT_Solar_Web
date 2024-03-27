import React, { useState } from "react";
import "./Device.scss";

import { infoState, info, tab } from "./Device";
import { useIntl } from "react-intl";

import { IoIosArrowDown } from "react-icons/io";
import { FaCheckCircle, FaSave } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import PopupState, { bindHover, bindPopper } from "material-ui-popup-state";
import { Fade, Paper, Popper, Typography } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DataTable from "react-data-table-component";
import { Empty } from "../Project/Project";

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

  return (
    <div className="DAT_Info_Databox" id="ElectricityConsumption">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">Tiêu thụ điện</div>
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
              <p>Tổng công suất tiêu thụ: 0,00 W</p>
            </div>
            <div className="DAT_Info_Databox_Content_Column">
              <p>Tiêu thụ tích lũy: 0,00 kWh</p>
            </div>
            <div className="DAT_Info_Databox_Content_Column">
              <p>Tiêu thụ hàng ngày: 0,00 kWh</p>
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

const Other = (props) => {
  const [display, setDisplay] = useState(true);
  return (
    <div className="DAT_Info_Databox" id="Other">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">Khác</div>
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
              <p>Năm: 24</p>
              <p>Giờ: 15</p>
              <p>Tuần: 4</p>
              <p>Ngưỡng bảo vệ áp suất thấp: 340.0 V</p>
              <p>Ngưỡng bảo vệ tần số cao: 52.50 Hz</p>
              <p>Thời gian trễ khởi động: 30 s</p>
              <p>Thông tin gỡ lỗi ARM2: 0</p>
              <p>Thông tin gỡ lỗi ARM5: 0</p>
              <p>Thông tin gỡ lỗi ARM8: 0</p>
              <p>Thông tin gỡ lỗi DSP BT3: 0</p>
              <p>Thông tin gỡ lỗi DSP BT6: 0</p>
              <p>Thông tin gỡ lỗi DSP INV1: 33</p>
              <p>Thông tin gỡ lỗi DSP INV4: 0</p>
              <p>Thông tin gỡ lỗi DSP INV7: 0</p>
              <p>Xóa hệ số hiệu chỉnh và hồ sơ lỗi: 0</p>
              <p>Điện áp khởi động AC cao: 440.00</p>
              <p>Tần số khởi động AC thấp: 49.50</p>
              <p>Giá trị điện áp quá áp phản ứng đường cong Q/U: 280.00</p>
              <p>Địa chỉ giao tiếp 485_2: 0</p>
            </div>
            <div className="DAT_Info_Databox_Content_Column">
              <p>Tháng: 1</p>
              <p>Phút: 37</p>
              <p>Ngưỡng bảo vệ chống áp suất quá mức: 440.00 V</p>
              <p>Ngưỡng bảo vệ chống áp suất dưới mức: 280.00 V</p>
              <p>Ngưỡng bảo vệ chống tần số thấp: 47.50 Hz</p>
              <p>Chọn chức năng bảo vệ: O701</p>
              <p>Thông tin gỡ lỗi ARM3: 0</p>
              <p>Thông tin gỡ lỗi ARM5: 0</p>
              <p>Thông tin gỡ lỗi DSP BT1: 0</p>
              <p>Thông tin gỡ lỗi DSP BT4: 0</p>
              <p>Thông tin gỡ lỗi DSP BT7: 0</p>
              <p>Thông tin gỡ lỗi DSP INV2: I</p>
              <p>Thông tin gỡ lỗi DSP INV5: </p>
              <p>Thông tin gỡ lỗi DSP INV8: </p>
              <p>Chế độ hiệu chỉnh tuổi: </p>
              <p>Điện áp khởi động AC thấp: </p>
              <p>Thời gian trễ khởi động lại: </p>
              <p>Tỉ lệ công suất phản ứng tối đa quá áp đường cong Q/U: </p>
              <p>Cài đặt ngưỡng phát hiện chuỗi: </p>
              <p>Điểm khởi đầu áp suất thấp: </p>
              <p>Giá trị điện áp ban đầu quá áp phản ứng đường cong Q/U: </p>
              <p>Dốc tải khởi động lại: </p>
              <p>Tốc độ baud giao tiếp 485_2: </p>
            </div>
            <div className="DAT_Info_Databox_Content_Column">
              <p>Ngày: 18</p>
              <p>Giây: 41</p>
              <p>Ngưỡng bảo vệ áp suất quá mức: 480.00 V</p>
              <p>Ngưỡng bảo vệ áp suất thấp: 280.00 V</p>
              <p>Ngưỡng bảo vệ tần số thấp: 47.50 Hz</p>
              <p>Chức năng bảo vệ: O701</p>
              <p>Thông tin gỡ lỗi ARM1: 0</p>
              <p>Thông tin gỡ lỗi ARM4: 0</p>
              <p>Thông tin gỡ lỗi ARM7: 0</p>
              <p>Thông tin gỡ lỗi DSP BT2: 0</p>
              <p>Thông tin gỡ lỗi DSP BT5: 0</p>
              <p>Thông tin gỡ lỗi DSP BT8: 0</p>
              <p>Thông tin gỡ lỗi DSP INV3: 0</p>
              <p>Thông tin gỡ lỗi DSP INV6: 0</p>
              <p>Bit lỗi: 0</p>
              <p>Cài đặt tốc độ Baud: 9600</p>
              <p>Tần số AC khởi động cao: 51.50</p>
              <p>Kích hoạt chức năng thấm thấp thấp: 0</p>
              <p>
                Giá trị ban đầu của đường cong phản ứng công suất điện áp quá
                thấp và quá cao: 210.00
              </p>
              <p>Điểm bắt đầu giảm áp suất cao: 280.00</p>
              <p>Điểm kết thúc giảm áp suất thấp: 170.00</p>
              <p>
                Giá trị điện áp cuối cùng của đường cong phản ứng công suất điện
                áp quá thấp và quá cao: 190.00
              </p>
              <p>Bật và kích hoạt chức năng phần mềm bảo vệ -</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
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
  const dataLang = useIntl();
  const [display, setDisplay] = useState(true);

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
        {display ? (
          <div className="DAT_Info_Databox_HistoriccalData">
            <div className="DAT_Info_Databox_HistoricalData_Picker">
              <div className="DAT_Info_Databox_HistoricalData_Picker_Type">
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
              </div>
              <div className="DAT_Info_Databox_HistoricalData_Picker_DatePicker">
                <input type="date"></input>
              </div>
            </div>
            <div className="DAT_Info_Databox_HistoricalData_Chart"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
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
          <div className="DAT_Info_Databox_GridStartSettings">
            <div className="DAT_Info_Databox_GridStartSettings_Content">
              <div className="DAT_Info_Databox_GridStartSettings_Content_Left">
                <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: 'ACStartHighVoltage' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item_Content">
                    <input />
                    V
                  </div>
                </div>
                <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item">
                  <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: 'ACStartLowVoltage' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridStartSettings_Content_Left_Item_Content">
                    <input />
                    Hz
                  </div>
                </div>
              </div>
              <div className="DAT_Info_Databox_GridStartSettings_Content_Center">
                <div className="DAT_Info_Databox_GridStartSettings_Content_Center_Item">
                  <div className="DAT_Info_Databox_GridStartSettings_Content_Center_Item_Tit">
                    {dataLang.formatMessage({ id: 'ACStartHighFrequency' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridStartSettings_Content_Center_Item_Content">
                    <input />
                    V
                  </div>
                </div>
              </div>
              <div className="DAT_Info_Databox_GridStartSettings_Content_Right">
                <div className="DAT_Info_Databox_GridStartSettings_Content_Right_Item">
                  <div className="DAT_Info_Databox_GridStartSettings_Content_Right_Item_Tit">
                    {dataLang.formatMessage({ id: 'ACStartLowFrequency' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridStartSettings_Content_Right_Item_Content">
                    <input />
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
          <div className="DAT_Info_Databox_GridVolt">
            <div className="DAT_Info_Databox_GridVolt_Content">
              <div className="DAT_Info_Databox_GridVolt_Content_Left">
                <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: 'ACUnderVolt1' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                    <input />
                    V
                  </div>
                </div>
                <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: 'ACUnderVolt1Time' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                    <input />
                    ms
                  </div>
                </div>
                <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                    {dataLang.formatMessage({ id: 'ACUnderVolt2Time' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                    <input />
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
                <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                    {/* AC Under Freq 1 Time: */}
                    {dataLang.formatMessage({ id: 'ACUnderFreq1Time' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                    <input />
                    ms
                  </div>
                </div>
                <div className="DAT_Info_Databox_GridVolt_Content_Left_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                    {/* AC Over Freq 2 Time: */}
                    {dataLang.formatMessage({ id: 'ACOverFreq2Time' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                    <input />
                    ms
                  </div>
                </div>
                <div className="DAT_Info_Databox_GridVolt_Content_Left_Item">
                  <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Tit">
                    {/* Frequency Setting: */}
                    {dataLang.formatMessage({ id: 'FreqSetting' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Left_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: 'PleaseSel' })}</option>
                      <option>50Hz</option>
                      <option>60Hz</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="DAT_Info_Databox_GridVolt_Content_Center">
                <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                    {/* AC Over Volt 1: */}
                    {dataLang.formatMessage({ id: 'ACOverVolt1' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                    <input />
                    V
                  </div>
                </div>
                <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                    {/* AC Under Volt 2: */}
                    {dataLang.formatMessage({ id: 'ACUnderVolt2' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                    <input />
                    V
                  </div>
                </div>
                <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                    {/* AC Over Volt 2 Time: */}
                    {dataLang.formatMessage({ id: 'ACOverVolt2Time' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                    <input />
                    ms
                  </div>
                </div>
                <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                    {/* AC Under Freq 1: */}
                    {dataLang.formatMessage({ id: 'ACUnderFreq1' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                    <input />
                    Hz
                  </div>
                </div>
                <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                    {/* AC Over Freq 1 Time: */}
                    {dataLang.formatMessage({ id: 'ACOverFreq1Time' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                    <input />
                    ms
                  </div>
                </div>
                <div className="DAT_Info_Databox_GridVolt_Content_Center_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Tit">
                    {/* AC Under Freq 2 Time: */}
                    {dataLang.formatMessage({ id: 'ACUnderFreq2Time' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Center_Item_Content">
                    <input />
                    ms
                  </div>
                </div>
              </div>
              <div className="DAT_Info_Databox_GridVolt_Content_Right">
                <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                    {/* AC Under Volt 1 Time: */}
                    {dataLang.formatMessage({ id: 'ACUnderVolt1Time' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                    <input />
                    ms
                  </div>
                </div>
                <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                    {/* AC Over Volt 2: */}
                    {dataLang.formatMessage({ id: 'ACOverVolt2' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                    <input />
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
                <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                    {/* AC Over Freq 1: */}
                    {dataLang.formatMessage({ id: 'ACOverFreq1' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                    <input />
                    Hz
                  </div>
                </div>
                <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                    {/* AC Under Freq 2: */}
                    {dataLang.formatMessage({ id: 'ACUnderFreq2' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                    <input />
                    Hz
                  </div>
                </div>
                <div className="DAT_Info_Databox_GridVolt_Content_Right_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Tit">
                    {/* AC Over Freq 2 Time: */}
                    {dataLang.formatMessage({ id: 'ACOverFreq2Time' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridVolt_Content_Right_Item_Content">
                    <input />
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
          <div className="DAT_Info_Databox_ExportPowerSettings">
            <div className="DAT_Info_Databox_ExportPowerSettings_Content">
              <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left">
                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Left_Item" style={{ marginBottom: "24px" }}>
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
                    <input />
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
                    {/* ExportLimit Way: */}
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
                <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_ExportPowerSettings_Content_Right_Item_Tit">
                    {/* Meter Type: */}
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
                <div className="DAT_Info_Databox_DeviceSettings_Content_Left_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Left_Item_Tit">
                    {/* Remote Control: */}
                    {dataLang.formatMessage({ id: 'RemoteControl' })}:
                  </div>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Left_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: 'PowerOn' })}</option>
                      <option>{dataLang.formatMessage({ id: 'PowerOff' })}</option>
                    </select>
                  </div>
                </div>
                <div className="DAT_Info_Databox_DeviceSettings_Content_Left_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Left_Item_Tit">
                    {/* Safety Setting: */}
                    {dataLang.formatMessage({ id: 'SafetySetting' })}:
                  </div>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Left_Item_Content">
                    <select>
                      <option selected disabled>---{dataLang.formatMessage({ id: 'PleaseSel' })}---</option>
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
                <div className="DAT_Info_Databox_DeviceSettings_Content_Center_Item" style={{ marginBottom: "24px" }}>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Center_Item_Tit">
                    {/* Active Power Setting: */}
                    {dataLang.formatMessage({ id: 'ActivePowerSetting' })}:
                  </div>
                  <div className="DAT_Info_Databox_DeviceSettings_Content_Center_Item_Content">
                    <input />
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
                <div className="DAT_Info_Databox_DeviceSettings_Content_Right_Item" style={{ marginBottom: "24px" }}>
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
                    {/* Inerter Status: */}
                    {dataLang.formatMessage({ id: 'InverterStatus' })}:
                  </div>
                  <div className="DAT_Info_Databox_GridInfo_Content_Left_Item_Content">
                    <select>
                      <option>{dataLang.formatMessage({ id: 'StatusInit' })}</option>
                      <option>{dataLang.formatMessage({ id: 'StatusWait' })}</option>
                      <option>{dataLang.formatMessage({ id: 'StatusOnGrid' })}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="DAT_Info_Databox_GridInfo_Foot">
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

const LastCommandRecord = (props) => {
  const dataLang = useIntl();

  return (
    <div className="DAT_Info_Databox" id="LastCommandRecord">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">Last Command Record</div>
      </div>

      <div className="DAT_Info_Databox_LastCommandRecord">
        <div className="DAT_Info_Databox_LastCommandRecord_Content">
          <div className="DAT_Info_Databox_LastCommandRecord_Content_Left">
            <div className="DAT_Info_Databox_LastCommandRecord_Content_Left_Item" style={{ marginBottom: "24px" }}>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Left_Item_Tit">
                Inerter Status:
              </div>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Left_Item_Content">
                Read AC Start High Volt
              </div>
            </div>
            <div className="DAT_Info_Databox_LastCommandRecord_Content_Left_Item">
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Left_Item_Tit">
                Read Result:
              </div>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Left_Item_Content">
                264.5 V
              </div>
            </div>
          </div>
          <div className="DAT_Info_Databox_LastCommandRecord_Content_Center">
            <div className="DAT_Info_Databox_LastCommandRecord_Content_Center_Item" style={{ marginBottom: "24px" }}>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Center_Item_Tit">
                Command Type:
              </div>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Center_Item_Content">
                Read
              </div>
            </div>
            <div className="DAT_Info_Databox_LastCommandRecord_Content_Center_Item">
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Center_Item_Tit">
                Send time:
              </div>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Center_Item_Content">
                2024/03/25 10:30:49 UTC+07:00
              </div>
            </div>
          </div>
          <div className="DAT_Info_Databox_LastCommandRecord_Content_Right">
            <div className="DAT_Info_Databox_LastCommandRecord_Content_Right_Item" style={{ marginBottom: "24px" }}>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Right_Item_Tit">
                Command State:
              </div>
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Right_Item_Content">
                <FaCheckCircle size={16} color="green" />
                <span style={{ color: "green" }}>
                  Succeeded
                </span>
              </div>
            </div>
            <div className="DAT_Info_Databox_LastCommandRecord_Content_Right_Item">
              <div className="DAT_Info_Databox_LastCommandRecord_Content_Right_Item_Tit">
                Feedback Time:
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
  const [display, setDisplay] = useState(true);

  return (
    <div className="DAT_Info_Databox" id="SelectCommand">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">Select Command</div>
      </div>

      <div className="DAT_Info_Databox_SelectCommand">
        <div className="DAT_Info_Databox_SelectCommand_Content">
          <div className="DAT_Info_Databox_SelectCommand_Content_Left">
            <div className="DAT_Info_Databox_SelectCommand_Content_Left_Item">
              <div className="DAT_Info_Databox_SelectCommand_Content_Left_Item_Tit">
                Inerter Status:
              </div>
              <div className="DAT_Info_Databox_SelectCommand_Content_Left_Item_Content">
                <select>
                  <option>Init</option>
                  <option>Wait</option>
                  <option>On Grid</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="DAT_Info_Databox_SelectCommand_Foot">
          <div className="DAT_Info_Databox_SelectCommand_Foot_Item">
            <span>
              Timeout:
            </span>
            <input />
            <span>Minute</span>

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
                              {dataLang.formatMessage({ id: 'overview1' })}
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
          <button>Send Command</button>
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
                <option>3 minutes timeout</option>
                <option>3 minutes timeout</option>
                <option>3 minutes timeout</option>
              </select>
              <button>Click Calculate CRC</button>
            </div>
            <textarea />
            <div className="DAT_Info_Databox_CustomizedCommand_Foot_Button">
              <button>Send</button>
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
      name: "Sent Time",
      selector: (row) => row.senttime,
      sortable: true,
      // width: "80px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Command Name",
      selector: (row) => row.name,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Command Type",
      selector: (row) => row.type,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Inputs",
      selector: (row) => row.input,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Return Result(s)",
      selector: (row) => row.result,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Command State",
      selector: (row) => row.state,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Reason of Failure",
      selector: (row) => row.reason,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Operator",
      selector: (row) => row.operator,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Feedback Time",
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
            <option>Command State</option>
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
          <div className="DAT_Info_Databox_Title_Left">Current Version Info</div>
        </div>

        <div className="DAT_Info_Databox_FirmwareUpgrade">
          <div className="DAT_Info_Databox_FirmwareUpgrade_Current">
            <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Left">
              <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Left_Item">
                <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Left_Item_Tit">
                  Certification Version Number:
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Left_Item_Content">
                  GAA
                </div>
              </div>
            </div>
            <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Center">
              <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Center_Item">
                <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Center_Item_Tit">
                  Internal Software Version Number:
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Center_Item_Content">
                  1110-0-0-203
                </div>
              </div>
            </div>
            <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Right">
              <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Right_Item">
                <div className="DAT_Info_Databox_FirmwareUpgrade_Current_Right_Item_Tit">
                  Upgrade Flag Bit:
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
          <div className="DAT_Info_Databox_Title_Left">Last Upgrade Record</div>
        </div>

        <div className="DAT_Info_Databox_FirmwareUpgrade">
          <div className="DAT_Info_Databox_FirmwareUpgrade_Last">
            <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Left">
              <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Left_Item" style={{ marginBottom: "24px" }}>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Left_Item_Tit">
                  Target Version:
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Left_Item_Content">
                  XG5-10KTL_arm_203_Vietnam
                </div>
              </div>
              <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Left_Item">
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Left_Item_Tit">
                  Upgrade phase:
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Left_Item_Content">
                  <FaCheckCircle size={16} color="green" />
                  <span style={{ color: "green" }}>
                    Succeeded
                  </span>
                </div>
              </div>
            </div>
            <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Center">
              <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Center_Item" style={{ marginBottom: "24px" }}>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Center_Item_Tit">
                  Related Version:
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Center_Item_Content">
                  Internal Software Version Number
                </div>
              </div>
              <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Center_Item">
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Center_Item_Tit">
                  Feedback Time:
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Center_Item_Content">
                  2024/03/11 08:50:17 UTC+07:00
                </div>
              </div>
            </div>
            <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Right">
              <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Right_Item">
                <div className="DAT_Info_Databox_FirmwareUpgrade_Last_Right_Item_Tit">
                  Upgraded Time:
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
          <div className="DAT_Info_Databox_Title_Left">Upgrade operation</div>
          <div className="DAT_Info_Databox_Title_Right">
            <span>Logger download methods:</span>
            <select>
              <option>IP Download</option>
            </select>
          </div>
        </div>

        <div className="DAT_Info_Databox_FirmwareUpgrade">
          <div className="DAT_Info_Databox_FirmwareUpgrade_Upgrade">
            <div className="DAT_Info_Databox_FirmwareUpgrade_Upgrade_Left">
              <div className="DAT_Info_Databox_FirmwareUpgrade_Upgrade_Left_Item" style={{ marginBottom: "24px" }}>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Upgrade_Left_Item_Tit">
                  Select Firmware Package:
                </div>
                <div className="DAT_Info_Databox_FirmwareUpgrade_Upgrade_Left_Item_Content">
                  <button>
                    Click Select Firmware Package
                  </button>
                </div>
              </div>
              <div className="DAT_Info_Databox_FirmwareUpgrade_Upgrade_Left_Item">
                <div className="DAT_Info_Databox_FirmwareUpgrade_Upgrade_Left_Item_Tit">
                  Timeout:

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
                                    {dataLang.formatMessage({ id: 'overview1' })}
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
                  <span>Minute</span>
                </div>
              </div>
            </div>
          </div>

          <div className="DAT_Info_Databox_FirmwareUpgrade_Foot">
            <button>Start upgrading</button>
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
      name: "Upgraded Time",
      selector: (row) => row.upgradedtime,
      sortable: true,
      // width: "80px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Firmware Package",
      selector: (row) => row.package,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Target Version",
      selector: (row) => row.target,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Related Version",
      selector: (row) => row.related,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Upgrade State",
      selector: (row) => row.state,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Parse Result",
      selector: (row) => row.result,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Reason of Failure",
      selector: (row) => row.reason,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Operator",
      selector: (row) => row.operator,
      sortable: true,
      // width: "180px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Feedback Time",
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
            <option>Upgrade State</option>
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

  return (
    <div className="DAT_Info">
      <div className="DAT_Info_Header">
        <div className="DAT_Info_Header_Left">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "16px" }}>
            <p style={{ fontWeight: "bold" }}>
              {info.value.pname}: {info.value.psn}
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
            </p>
          </div>
          {(() => {
            switch (view) {
              case "control":
                return (
                  <div style={{ display: "flex", alignItems: "center", gap: "20px", paddingLeft: "16px" }}>
                    <button className="DAT_Info_Header_Left_Item"
                      id="batch"
                      onClick={() => { setNav("batch") }}
                      style={{ color: nav === "batch" ? "#6495ed" : "gray", borderBottom: nav === "batch" ? "solid 2px #6495ed" : "solid 2px white" }}
                    >
                      {dataLang.formatMessage({ id: "BatchCommand" })}
                    </button>
                    {/* <button className="DAT_Info_Header_Left_Item"
                      id="single"
                      onClick={() => { setNav("single") }}
                      style={{ color: nav === "single" ? "#6495ed" : "gray", borderBottom: nav === "single" ? "solid 2px #6495ed" : "solid 2px white" }}
                    >
                      Single Command
                    </button>
                    <button className="DAT_Info_Header_Left_Item"
                      id="customized"
                      onClick={() => { setNav("customized") }}
                      style={{ color: nav === "customized" ? "#6495ed" : "gray", borderBottom: nav === "customized" ? "solid 2px #6495ed" : "solid 2px white" }}
                    >
                      Customized Command
                    </button>
                    <button className="DAT_Info_Header_Left_Item"
                      id="log"
                      onClick={() => { setNav("log") }}
                      style={{ color: nav === "log" ? "#6495ed" : "gray", borderBottom: nav === "log" ? "solid 2px #6495ed" : "solid 2px white" }}
                    >
                      Control Log
                    </button> */}
                  </div>
                )
              case "update":
                return (
                  <div style={{ display: "flex", alignItems: "center", gap: "20px", paddingLeft: "16px" }}>
                    <button className="DAT_Info_Header_Left_Item"
                      id="firmware"
                      onClick={() => { setNav_("firmware") }}
                      style={{ color: nav_ === "firmware" ? "#6495ed" : "gray", borderBottom: nav_ === "firmware" ? "solid 2px #6495ed" : "solid 2px white" }}
                    >
                      Firmware Upgrade
                    </button>
                    <button className="DAT_Info_Header_Left_Item"
                      id="upgrade"
                      onClick={() => { setNav_("upgrade") }}
                      style={{ color: nav_ === "upgrade" ? "#6495ed" : "gray", borderBottom: nav_ === "upgrade" ? "solid 2px #6495ed" : "solid 2px white" }}
                    >
                      Upgrade Log
                    </button>
                  </div>
                )
              default:
                return <></>
            }
          })()}
        </div>

        <div className="DAT_Info_Header_Right">
          {(() => {
            switch (tab.value) {
              case 'logger':
                return (
                  <div className="DAT_Info_Header_Right_Close" onClick={() => { infoState.value = false; }}>
                    <RxCross2
                      size={20}
                      color="white"
                    />
                  </div>
                )
              case 'inverter':
                return (
                  <>
                    <div className="DAT_Info_Header_Right_More">
                      <BsThreeDotsVertical
                        size={20}
                        color="#9e9e9e"
                        onClick={() => setDropState(!dropState)}
                      />
                    </div>

                    <div className="DAT_Info_Header_Right_Close" onClick={() => { infoState.value = false; }}>
                      <RxCross2
                        size={20}
                        color="white"
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
                          {/* <Other /> */}
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
        <div className="DAT_InfoDrop">
          {/* {view == "detail" ? (
            <> */}
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
          <div className="DAT_InfoDrop_Item"
            onClick={() => { setView("update"); setDropState(false) }}
          >
            {dataLang.formatMessage({ id: 'update' })}
          </div>
          {/* </>
          ) : (
            <>
              <div className="DAT_InfoDrop_Item"
                style={{ borderBottom: "1px solid #e0e0e0" }}
                onClick={() => { setView("detail"); setDropState(false) }}
              >
                {dataLang.formatMessage({ id: 'monitor' })}
              </div>
              <div className="DAT_InfoDrop_Item" onClick={() => { setView("update"); setDropState(false) }}>
                update
              </div>
            </>
          )} */}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
