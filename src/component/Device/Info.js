import React, { useState } from "react";
import "./Device.scss";

import { infoState, info, tab } from "./Device";
import { useIntl } from "react-intl";

import { IoIosArrowDown } from "react-icons/io";
import { FaCheckCircle, FaSave } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

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
                          {dataLang.formatMessage({ id: 'masterVersion' })}: {`${info.value.invt[info.value.pdata.masterver.register][0]}.${info.value.invt[info.value.pdata.masterver.register][1]}.${info.value.invt[info.value.pdata.masterver.register][2]}`}
                        </p>
                      </div>
                      <div className="DAT_Info_Databox_Content_Column">
                        <p>
                          {dataLang.formatMessage({ id: 'viceVersion' })}: {`${info.value.invt[info.value.pdata.vicever.register][0]}.${info.value.invt[info.value.pdata.vicever.register][1]}.${info.value.invt[info.value.pdata.vicever.register][2]}`}
                        </p>
                      </div>
                      <div className="DAT_Info_Databox_Content_Column">
                        <p>
                          {dataLang.formatMessage({ id: 'hmiVersion' })}: {`${info.value.invt[info.value.pdata.hmiver.register][0]}.${info.value.invt[info.value.pdata.hmiver.register][1]}.${info.value.invt[info.value.pdata.hmiver.register][2]}`}
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

  return (
    <div className="DAT_Info_Databox" id="Control">
      <div className="DAT_Info_Databox_Title">
        <div className="DAT_Info_Databox_Title_Left">Điều khiển</div>
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
                <div>Select Parameters</div>
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

export default function Info(props) {
  const dataLang = useIntl();

  return (
    <div className="DAT_Info">
      <div className="DAT_Info_Header">
        <div className="DAT_Info_Header_Left">
          {(() => {
            switch (tab.value) {
              case 'logger':
                return (
                  <>
                    <p style={{ fontWeight: "bold" }}>
                      {info.value.pname}: {info.value.psn}
                    </p>
                    <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {info.value.pstate == 1 ? (
                        <FaCheckCircle size={20} color="green" />
                      ) : (
                        <MdOutlineError size={20} color="red" />
                      )}
                    </p>
                  </>
                )
              case 'inverter':
                return (
                  <>
                    <p style={{ fontWeight: "bold" }}>
                      {info.value.pname}: {info.value.psn}
                    </p>
                    <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {info.value.invt?.[info.value.pdata.status] == 2 ? (
                        <FaCheckCircle size={20} color="green" />
                      ) : (
                        <MdOutlineError size={22} color="red" />
                      )}
                    </p>
                  </>
                )
              default:
                return <></>;
            }
          })()}
        </div>

        <div className="DAT_Info_Header_Right">
          {/* <div className="DAT_Info_Header_Right_Save">
            <FaSave size={20} color="white" />
            <span>{dataLang.formatMessage({ id: 'save' })} </span>
          </div> */}
          <div className="DAT_Info_Header_Right_Close" onClick={() => {
            infoState.value = false;
          }}>
            <RxCross2
              size={20}
              color="white"
            />
          </div>
        </div>
      </div>

      {(() => {
        switch (tab.value) {
          case "inverter":
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
                {/* <HistoricalData /> */}
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
    </div>
  );
}
