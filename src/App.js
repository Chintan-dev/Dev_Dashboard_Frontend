import { BrowserRouter, BrowserRouter as Link, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, QRCode, Space, Switch } from 'antd';
import HeaderBar from './Components/TopHeader/HeaderBar';
import MainContent from './Components/MainContent/MainContent';
import DisplayRole from './Components/Admin/Roles/Role';
import UserCreate from './Components/Admin/UserCreate/UserCreate';
import CreateMenu from './Components/Admin/CreateMenu/CreateMenu';
const { Header, Sider } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          onClick={({ key }) => setSelectedMenuItem(key)}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to={"/role"}>DisplayRole</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="/menu">nav 3</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ background: '#85b8de', height: '100vh', overflowY: 'auto' }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: 'sticky',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <HeaderBar />
        </Header>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={<UserCreate />}
            ></Route>
            <Route
              exact
              path="/role"
              element={<DisplayRole />}
            ></Route>
            <Route
              exact
              path="/menu"
              element={<CreateMenu />}
            ></Route>
          </Routes>
        </BrowserRouter>
        {/* <UserCreate /> */}
        {/* <DisplayRole /> */}
      </Layout>
    </Layout>
  );
};
export default App;