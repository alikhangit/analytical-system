import { Button, Checkbox, GetProp, Space, Tabs, TabsProps } from "antd";
import { ViewSettingsType } from "../../pages/General/General";
import { FormInstance } from "antd/lib/form/Form";
import { useEffect } from "react";
import { PredictiHttpResult } from "../../api/api.types";
import "./ViewManager.scss";
import html2canvas from "html2canvas";

interface ViewManagerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
  data: PredictiHttpResult | null;
  onFinish: (values: Record<string, number>) => Promise<void>;
  setViewSettings: (viewSettings: ViewSettingsType) => void;
  viewSettings: ViewSettingsType;
}

const ViewManager = ({ setViewSettings, viewSettings, onFinish, form, data }: ViewManagerProps) => {
  const tabsOptions: TabsProps["items"] = [
    {
      key: "model_year",
      label: "Годовой",
    },
    {
      key: "model_10_years",
      label: "10 лет",
    },
    {
      key: "model_history_data",
      label: "Исторические данные",
    },
  ];

  const checkboxItems = [
    { label: "лояльность", value: "loyl", color: "#64d172" },
    { label: "кол-во взносов", value: "pmnts_nmbr", color: "#77aafc" },
    { label: "сумма взносов", value: "pmnts_sum", color: "#dd5161" },
  ];

  const modeOnChange = (value: string) => {
    setViewSettings({ ...viewSettings, mode: value as ViewSettingsType["mode"] });
  };

  useEffect(() => {
    onFinish(form.getFieldsValue());
  }, [form, viewSettings.mode]);

  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (checkedValues) => {
    setViewSettings({ ...viewSettings, checkbox: checkedValues as ViewSettingsType["checkbox"] });
  };

  const onExport = () => {
    html2canvas(document.querySelector("#content") as HTMLElement, {
      scrollX: 0,
      scrollY: 0,
      windowHeight: 2000,
    }).then(function (canvas) {
      // Создаем ссылку для скачивания
      const downloadLink = document.createElement("a");
      downloadLink.href = canvas.toDataURL(); // Преобразуем холст в Data URL
      downloadLink.download = "screenshot.png"; // Имя файла для скачивания
      downloadLink.click(); // Симулируем клик по ссылке
    });
  };

  return (
    <Space size={40}>
      <Tabs
        defaultActiveKey={viewSettings.mode}
        items={tabsOptions}
        onChange={modeOnChange}
        style={{ width: "fit-content" }}
      />
      {data && (
        <>
          <Checkbox.Group defaultValue={viewSettings.checkbox} onChange={onChange}>
            {checkboxItems.map((item) => (
              <Checkbox
                key={item.value}
                value={item.value}
                className="noHover"
                style={{
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  "--background-color": item.color,
                  "--border-color": item.color,
                }}
              >
                {item.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
          <Button onClick={onExport}>Экспортировать</Button>
        </>
      )}
    </Space>
  );
};

export default ViewManager;
