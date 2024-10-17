import React, {useState} from 'react';
import {DesktopOutlined, PieChartOutlined,} from '@ant-design/icons';
import {Layout, Menu, theme} from 'antd';
import {Page1} from './Page1';
import {Page2} from './Page2';
import {Route, Routes, useNavigate} from 'react-router-dom';

const {Header, Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Demo Page 1', 'page1', <PieChartOutlined/>),
  getItem('Demo Page 2', 'page2', <DesktopOutlined/>),
];
export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  const navigate = useNavigate();

  const getContent = () => {
    return <Routes>
      <Route path="page1" element={<Page1/>}></Route>
      <Route path="page2" element={<Page2/>}></Route>
    </Routes>
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical"/>
        <Menu theme="dark" defaultSelectedKeys={['page1']} mode="inline" items={items}
              onClick={(e) => navigate(e.key)}/>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          {getContent()}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
        </Footer>
      </Layout>
    </Layout>
  );
};