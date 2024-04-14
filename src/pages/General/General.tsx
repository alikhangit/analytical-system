import { Space, Spin, Typography, message } from "antd";
import { useState } from "react";
import { PredictiHttpResult } from "../../api/api.types";
import { api } from "../../api/api";
import ForecastForm from "../../components/Forecast/ForecastForm/ForecastForm";
import ForecastChart from "../../components/Forecast/ForecastChart/ForecastChart";
import { chartsText } from "../mockText/mockText";

export interface ViewSettingsType {
  mode: "model_10_years" | "model_year" | "model_history_data";
  checkbox: ("loyl" | "pmnts_nmbr" | "pmnts_sum")[];
}

const General = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<PredictiHttpResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [viewSettings, setViewSettings] = useState<ViewSettingsType>({
    mode: "model_year",
    checkbox: ["loyl", "pmnts_nmbr", "pmnts_sum"],
  });

  const onFinish = async (values: Record<string, number>) => {
    setIsLoading(true);
    api
      .predict(values, viewSettings.mode)
      .then((data) => {
        if (data) {
          messageApi.open({
            type: "success",
            content: "Прогноз сформирован",
          });
          setData(data);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };
  return (
    <>
      {contextHolder}
      <div>
        <Typography.Title>Общая аналитика</Typography.Title>

        <ForecastForm
          data={data}
          setData={setData}
          onFinish={onFinish}
          setViewSettings={setViewSettings}
          viewSettings={viewSettings}
        />

        {isLoading && <Spin style={{ display: "flex", justifyContent: "center", marginTop: 100 }} size="large" />}

        {data && (
          <>
            <Space direction="vertical" size={40}>
              {Object.keys(chartsText).map((chartText) => (
                <ForecastChart
                  key={chartText}
                  title={chartsText[chartText].title}
                  text={chartsText[chartText].text}
                  dataKey={chartsText[chartText].dataKey}
                  viewSettings={viewSettings}
                  requestedData={data}
                />
              ))}
            </Space>
          </>
        )}
      </div>
    </>
  );
};

export default General;
