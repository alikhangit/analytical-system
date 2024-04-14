import { Modal, Table } from "antd";
import { AlignType } from "rc-table/lib/interface";

import { useLocation } from "react-router-dom";
import { ActiveKeyType } from "../../App";
import s from "./TopModal.module.scss";
import { useEffect } from "react";
import { api } from "../../api/api";

interface TopModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setActiveKey: (value: ActiveKeyType) => void;
}

const TopModal = ({ open, setOpen, setActiveKey }: TopModalProps) => {
  const location = useLocation();

  const dataSource = [
    {
      key: 1,
      userId: "6FB0DAB05D8EC24DABD333F2DC415270",
      chanceValue: "9 %",
    },
    {
      key: 2,
      userId: "C7BA7B0FAB1EB14797993776A115A3A7",
      chanceValue: "7 %",
    },
    {
      key: 3,
      userId: "D7B43197C206CD46B5F19F5D797E9C62",
      chanceValue: "7 %",
    },
    {
      key: 4,
      userId: "45993ADA8D4DBD47B49C0D2901C05913",
      chanceValue: "6 %",
    },
    {
      key: 5,
      userId: "E063BF936DD3344B984967FAE9664893",
      chanceValue: "5 %",
    },
  ];

  const columns = [
    {
      title: "ID клиента",
      dataIndex: "userId",
      key: "userId",
      align: "center" as AlignType,
    },
    {
      title: "Вероятность оттока в ближайший год",
      dataIndex: "chanceValue",
      key: "chanceValue",
      align: "center" as AlignType,
      render: (text: string) => (
        <span style={{ color: "red" }}>{text}</span> // применяем цвет из данных
      ),
    },
  ];

  useEffect(() => {
    if (open) {
      api.predict(
        {
          val1_infl: 123,
          val2_bez: 123,
          val3_klst: 123,
          val4_vvp: 123,
        },
        "model_10_years",
      );
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false);
        setActiveKey(location.pathname as ActiveKeyType);
      }}
      title=""
      footer={null}
      width={"60%"}
    >
      <div className={s["container"]}>
        <h2 className={s["title"]}>Топ клиентов по риску оттока</h2>
        <p className={s["subtitle"]}>Таблица с клиентами с наибольшей вероятностью оттока в ближайший год</p>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    </Modal>
  );
};

export default TopModal;
