import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { UrlEnum } from "./constant/urlPath";
import { Button, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { ReactComponent as GeneralIcon } from "./icons/generalIcon.svg";
import { ReactComponent as IndividualIcon } from "./icons/individualIcon.svg";
import { ReactComponent as TopIcon } from "./icons/topIcon.svg";
import { useEffect, useState } from "react";
import "./App.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Avatar from "./components/Avatar/Avatar";
import General from "./pages/General/General";
import Individual from "./pages/Individual/Individual";
import TopModal from "./components/TopModal/TopModal";

export type ActiveKeyType = UrlEnum | "top";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState<ActiveKeyType>(UrlEnum.general);
  const location = useLocation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setActiveKey(location.pathname as ActiveKeyType);
  }, []);

  const items = [
    {
      key: UrlEnum.general,
      icon: <GeneralIcon />,
      label: "Общая аналитика",
    },
    {
      key: UrlEnum.individual,
      icon: <IndividualIcon />,
      label: "Индивидуальная аналитика",
    },
    {
      key: "top",
      icon: <TopIcon />,
      label: "Топ клиентов по риску оттока",
    },
  ];

  return (
    <main>
      <Layout>
        <Sider width={290} theme="light" className="nav-panel" trigger={null} collapsible collapsed={collapsed}>
          <Avatar collapsed={collapsed} className="nav-panel__avatar" />
          <Menu
            className="nav-panel__menu"
            mode="inline"
            defaultSelectedKeys={[UrlEnum.general]}
            items={items}
            selectedKeys={[activeKey]}
            onClick={(e) => {
              if (e.key !== "top") {
                navigate(e.key);
              } else {
                setOpen(true);
              }
              setActiveKey(e.key as ActiveKeyType);
            }}
          />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="nav-panel__collapse-button"
            style={{
              right: collapsed ? "30%" : "50%",
            }}
          />
        </Sider>
        <Layout>
          <Content className="content" id="content">
            <TopModal open={open} setOpen={setOpen} setActiveKey={setActiveKey} />
            <Routes>
              <Route path={UrlEnum.general} element={<General />} />
              <Route path={UrlEnum.individual} element={<Individual />} />
              <Route path={"/*"} element={<General />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </main>
  );
};

export default App;
