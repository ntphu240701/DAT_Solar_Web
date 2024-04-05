import React from "react";
import "./Project.scss";

import { projectData } from "./Project";
import { useIntl } from "react-intl";
import { CiClock1 } from "react-icons/ci";
import Graph from "./Graph";
import { useSelector } from "react-redux";
// import { cal } from './ProjectData';

export default function GraphComponent(props) {
  const dataLang = useIntl();
  const cal = useSelector((state) => state.tool.cal);

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center">
      <div className="DAT_ProjectData_Dashboard_Data_Center_Tit">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item">
          {(() => {
            switch (projectData.value.plantmode) {
              case "consumption":
                return (
                  <>
                    {dataLang.formatMessage({
                      id: "consumptionType",
                    })}
                  </>
                );
              case "hybrid":
                return (
                  <>
                    {dataLang.formatMessage({
                      id: "hybridType",
                    })}
                  </>
                );
              case "ESS":
                return <>{dataLang.formatMessage({ id: "ESS" })}</>;
              default:
                return <>{dataLang.formatMessage({ id: "gridType" })}</>;
            }
          })()}
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Tit_Timer">
          <CiClock1 size={13} color="13px" />
        </div>
      </div>
      <Graph type={projectData.value.plantmode} cal={cal} />
    </div>
  );
}
