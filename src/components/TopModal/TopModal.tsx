import { Modal, Table } from "antd";
import { AlignType } from "rc-table/lib/interface";

import { useLocation } from "react-router-dom";
import { ActiveKeyType } from "../../App";
import s from "./TopModal.module.scss";

interface TopModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setActiveKey: (value: ActiveKeyType) => void;
}

const TopModal = ({ open, setOpen, setActiveKey }: TopModalProps) => {
  const location = useLocation();

  const dataSource = [
    {
      key: "1",
      userId: "8920580493",
      chanceValue: "34 %",
    },
    {
      key: "2",
      userId: "892536475943",
      chanceValue: "31 %",
    },
    {
      key: "3",
      userId: "78345789438",
      chanceValue: "29 %",
    },
    {
      key: "4",
      userId: "3475894375",
      chanceValue: "24 %",
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
