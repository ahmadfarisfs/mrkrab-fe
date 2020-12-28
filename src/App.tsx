import React from 'react';
import { Col, Layout, Mentions, Menu, Row, Modal } from 'antd';
import {
  ThunderboltOutlined,
  PieChartOutlined,SwapOutlined,
  TransactionOutlined,
  TeamOutlined, AccountBookOutlined, ExclamationCircleOutlined,
  UserOutlined, DashboardOutlined, ProjectOutlined, SettingOutlined, LogoutOutlined
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
import Avatar from 'antd/lib/avatar/avatar';
import NormalLoginForm from './pages/login/login';
import PayRecPage from './pages/payrec/payrecs';
// import { PlusCircle, PlusSquareFill } from 'react-bootstrap-icons';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { confirm } = Modal;
//const isLogin = true;
const Appt = () => {
const [isLogin,setLogin]=useState(false);
  const items: { key: string, label: string, icon: any, path: string, content: any }[] = [
    { key: '1', label: 'Dashboard', path: isLogin ? '/' : '/login', icon: <DashboardOutlined />, content: DashboardPage },
    { key: '2', label: 'User', path: '/user', icon: <TeamOutlined />, content: UserPage },
    { key: '3', label: 'Project', path: '/project', icon: <ProjectOutlined />, content: ProjectPage },
    { key: '4', label: 'Transaction', path: '/transaction', icon: <TransactionOutlined />, content: TransactionPage },
    // { key: '6', label: 'Transfer', path: '/pending', icon: <SwapOutlined />, content: DashboardPage },
    { key: '5', label: 'Payable & Receivable', path: '/payrec', icon: <AccountBookOutlined />, content: PayRecPage },
  ];
  useEffect(()=>{

  },[])
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
          <Header 
          style={{ padding: 0 ,margin:0,
            // height:50
          }}
          
          // className="site-layout-background" style={{
          //   height:70
          // }}
           >
<             Menu
 
              theme="dark"
             mode="horizontal"  style={{ float: "left" }} >
                <SubMenu 
                
                icon={<ThunderboltOutlined />}
                key="quick-menu" title="Quick Create">
                <Menu.Item icon={<TransactionOutlined />} key="quick-menu:trx">
                <Link to="/transaction/add">Transaction</Link>
                  
                  </Menu.Item>
                <Menu.Item  icon={<AccountBookOutlined />} key="quick-menu:parec"><Link to="/payrec/add">Payable & Recv</Link></Menu.Item>
                <Menu.Item icon={<SwapOutlined />} key="quick-menu:trf"><Link to="/transaction/add_transfer">Transfer</Link></Menu.Item></SubMenu>
               </             Menu>
            <Menu
              theme="dark"
             mode="horizontal" style={{ float: "right" }} >
              {/* <Menu.Item icon={<UserOutlined />} key="use1">nav 1</Menu.Item> */}

              <SubMenu key="user-menu" icon={<UserOutlined />} title="Ahmad Faris">
                <Menu.Item icon={<SettingOutlined />} key="user-menu:setting">Setting</Menu.Item>
                <Menu.Item icon={<LogoutOutlined />} key="user-menu:logout"
                  onClick={() => {
                    confirm({
                      title: 'Do you want to logout?',
                      icon: <ExclamationCircleOutlined />,
                      //content: 'When clicked the OK button, this dialog will be closed after 1 second',
                      onOk() {
                        return new Promise((resolve, reject) => {
                          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                        }).catch(() => console.log('Oops errors!'));
                      },
                      onCancel() { },
                    });

                  }}
                >Logout</Menu.Item>
              </SubMenu>
            </Menu>
          </Header>
          <Content
          //  style={{ margin: '0 16px' }}
          // style={{ borderRadius: 5}}
          >

            <div className="site-layout-background" style={{
              // margin: '24px 16px',
              // padding: 12,
              marginTop:16,
              padding:12,
              // paddingRight:12,
              marginLeft:12,
              marginRight:12,
              minHeight: 280,
              borderRadius: 8,
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
      </Layout>
    </Router>)
};

const App = () =>{
  const [isLogin,setLogin]=useState(false);
  return(<>
    {isLogin ? <Appt/> : <NormalLoginForm loggedIn={isLogin} onLogin={()=>{
      setLogin(true);
    }}/> }
  </>);
};

export default App;
