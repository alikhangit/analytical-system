import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { PredictiHttpResult } from "../../../api/api.types";
import { ViewSettingsType } from "../../../pages/General/General";
import { Flex, Typography } from "antd";
import { useState } from "react";
import { dataKeyEnum } from "../../../pages/mockText/mockText";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payloads, label }: any) => {
  if (active && payloads && payloads.length) {
    return (
      <div className="custom-tooltip">
        {payloads.map((payload: { value: number }) => (
          <>
            <p className="label">{payload.value}</p>
          </>
        ))}
        <p className="intro">{label}</p>
      </div>
    );
  }

  return null;
};

interface ForecastChartProps {
  dataKey: dataKeyEnum;
  requestedData: PredictiHttpResult | null;
  viewSettings: ViewSettingsType;
  title: string;
  text: string;
}
const ForecastChart = ({ requestedData, title, text, dataKey, viewSettings }: ForecastChartProps) => {
  const [divBox] = useState<number | undefined>(document.querySelector(".content")?.clientWidth);
  const dataKeySelector = `color${dataKey.charAt(0).toUpperCase() + dataKey.slice(1)}`;

  const dataKeyColors = {
    [dataKeyEnum.loyl]: "#8ed097",
    [dataKeyEnum.pmnts_nmbr]: "#abc9f8",
    [dataKeyEnum.pmnts_sum]: "#d8848e",
  };

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div style={{ pointerEvents: !requestedData ? "none" : "all" }}>
      <Flex vertical style={{ marginBottom: 25 }}>
        <Typography.Title level={4}>{title}</Typography.Title>
        <Typography.Text style={{ color: "#a5a5a5" }}>{text}</Typography.Text>
      </Flex>

      <AreaChart
        width={divBox && divBox - 100}
        height={250}
        data={requestedData ?? []}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          {dataKey !== "din" ? (
            <linearGradient id={dataKeySelector} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={dataKeyColors[dataKey]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={dataKeyColors[dataKey]} stopOpacity={0} />
            </linearGradient>
          ) : (
            <>
              <linearGradient id={"colorLoyl_din"} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={dataKeyColors[dataKeyEnum.loyl]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={dataKeyColors[dataKeyEnum.loyl]} stopOpacity={0} />
              </linearGradient>
              <linearGradient id={"colorPmnts_nmbr_din"} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={dataKeyColors[dataKeyEnum.pmnts_nmbr]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={dataKeyColors[dataKeyEnum.pmnts_nmbr]} stopOpacity={0} />
              </linearGradient>
              <linearGradient id={"colorPmnts_sum_din"} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={dataKeyColors[dataKeyEnum.pmnts_sum]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={dataKeyColors[dataKeyEnum.pmnts_sum]} stopOpacity={0} />
              </linearGradient>
            </>
          )}
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} />
        {dataKey !== "din" ? (
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={dataKeyColors[dataKey]}
            fillOpacity={1}
            fill={`url(#${dataKeySelector})`}
          />
        ) : (
          <>
            {viewSettings.checkbox.map((dinLine) => (
              <Area
                type="monotone"
                dataKey={dinLine + "_din"}
                stroke={dataKeyColors[dinLine]}
                fillOpacity={1}
                fill={`url(#color${capitalizeFirstLetter(dinLine)}_din`}
              />
            ))}
          </>
        )}
      </AreaChart>
    </div>
  );
};

export default ForecastChart;
