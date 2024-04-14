import { Button, Form, InputNumber, Select, Space, Tooltip, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { forecastStore } from "../../../store/forecastStore";
import s from "./ForecastForm.module.scss";
import { DeleteOutlined } from "@ant-design/icons";
import { PredictiHttpResult } from "../../../api/api.types";
import ViewManager from "../../ViewManager/ViewManager";
import { ViewSettingsType } from "../../../pages/General/General";

enum ForecastFormFields {
  userId = "userId",
  val1_infl = "val1_infl",
  val2_bez = "val2_bez",
  val3_klst = "val3_klst",
  val4_vvp = "val4_vvp",
}

const required = {
  required: true,
  message: "Введите значение",
};

interface ForecastFormProps {
  viewSettings: ViewSettingsType;
  data: PredictiHttpResult | null;
  setViewSettings: (viewSettings: ViewSettingsType) => void;
  setData: (data: PredictiHttpResult | null) => void;
  onFinish: (values: Record<string, number>) => Promise<void>;
  isIndividualForm?: boolean;
}

const ForecastForm = observer(
  ({ data, setData, onFinish, setViewSettings, viewSettings, isIndividualForm = false }: ForecastFormProps) => {
    const [form] = Form.useForm();
    const userId = Form.useWatch(ForecastFormFields.userId, form);

    const onClick = () => {
      forecastStore.increaseState();
    };

    const onResetClick = () => {
      form.resetFields();
      setData(null);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validateNumberRange = (_: any, value: number) => {
      if (value > 500 || value < -500) {
        return Promise.reject("Некорректное значние");
      } else {
        return Promise.resolve();
      }
    };
    return (
      <>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {isIndividualForm && (
            <>
              <Space direction="vertical">
                <div>
                  <Typography.Title level={5}>
                    <span style={{ color: "red" }}>*</span> Выберете ID клиента
                  </Typography.Title>
                  <Typography.Text style={{ color: "#aeadad" }}>
                    Необходимо для отображения индивидуальной статистики
                  </Typography.Text>
                </div>

                <Form.Item
                  name={ForecastFormFields.userId}
                  label=""
                  rules={[
                    () => ({
                      validator() {
                        if (!userId) return Promise.reject(new Error("Выберете клиента"));
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Select placeholder="Выберете ID клиента" className="form__select">
                    <Select.Option value="17483729084723">17483729084723</Select.Option>
                    <Select.Option value="473585703434">473585703434</Select.Option>
                  </Select>
                </Form.Item>
              </Space>
            </>
          )}

          <div className={s["form"]}>
            <Space className={s["form__block"]}>
              <Form.Item
                name={ForecastFormFields.val1_infl}
                label="Прогнозируемая инфляция (%)"
                rules={[required, { validator: validateNumberRange }]}
              >
                <InputNumber className={s["form__input"]} />
              </Form.Item>
              <Form.Item
                name={ForecastFormFields.val3_klst}
                label="Прогнозируемая ключевая ставка (%)"
                rules={[required, { validator: validateNumberRange }]}
              >
                <InputNumber className={s["form__input"]} />
              </Form.Item>
            </Space>

            <Space className={s["form__block"]}>
              <Form.Item
                name={ForecastFormFields.val2_bez}
                label="Прогнозируемый уровень безработицы (%)"
                rules={[required, { validator: validateNumberRange }]}
              >
                <InputNumber className={s["form__input"]} />
              </Form.Item>
              <Form.Item
                name={ForecastFormFields.val4_vvp}
                label="Прогнозируемый рост/падение зарплаты (%)"
                rules={[required, { validator: validateNumberRange }]}
              >
                <InputNumber className={s["form__input"]} />
              </Form.Item>
            </Space>
          </div>

          <Space>
            <Form.Item>
              <Button htmlType="submit" onClick={onClick} type="primary">
                Получить аналитику
              </Button>
            </Form.Item>
            {data && (
              <Form.Item>
                <Tooltip title="Очистить запрос">
                  <Button icon={<DeleteOutlined />} onClick={onResetClick} type="primary" danger />
                </Tooltip>
              </Form.Item>
            )}
          </Space>
        </Form>
        <ViewManager
          data={data}
          form={form}
          onFinish={onFinish}
          setViewSettings={setViewSettings}
          viewSettings={viewSettings}
        />
      </>
    );
  },
);

export default ForecastForm;
