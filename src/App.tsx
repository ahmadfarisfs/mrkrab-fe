import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  TransactionOutlined,
  TeamOutlined, AccountBookOutlined,
  UserOutlined, DashboardOutlined, ProjectOutlined
} from '@ant-design/icons';

import {
  Link, Route, Switch, useHistory, useLocation, BrowserRouter as Router
} from "react-router-dom";
import ProjectPage from './pages/project/projects';
import TransactionPage from './pages/transaction/transactions';
import UserPage from "./pages/user/users";
import DashboardPage from './pages/dashboard/dashboard';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';


import { useState, useEffect } from 'react';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const App = () => {
  const items: { key: string, label: string, icon: any, path: string, content: any }[] = [
    { key: '1', label: 'Dashboard', path: '/', icon: <DashboardOutlined />, content: DashboardPage },
    { key: '2', label: 'User', path: '/user', icon: <TeamOutlined />, content: UserPage },
    { key: '3', label: 'Project', path: '/project', icon: <ProjectOutlined />, content: ProjectPage },
    { key: '4', label: 'Transaction', path: '/transaction', icon: <TransactionOutlined />, content: TransactionPage },
    { key: '5', label: 'Payable & Receivable', path: '/pending', icon: <AccountBookOutlined />, content: DashboardPage },
  ];

  const [collapsed, setCollapse] = useState(false);
  const onCollapse = (collapse: boolean) => {
    setCollapse(collapse)
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint="lg" collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu

            mode='inline' theme="dark" defaultSelectedKeys={['1']}>
            {
              items.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.path}>{item.label}</Link>
                </Menu.Item>
              ))
            }

          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0,
          backgroundColor:'white'
          }} />
          <Content style={{ margin: '0 16px' }}>

            <div className="site-layout-background" style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              borderRadius:5,
//              border: '25px',
            }}>
              <Switch>
                {
                  items.map((item) => (
                    <Route exact={item.path === "/" ? true : false} path={item.path} component={item.content}>
                    </Route>
                  ))
                }
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>HM PMS ©2020 Created by AFFS</Footer>
        </Layout>
      </Layout></Router>)
};


export default App;
