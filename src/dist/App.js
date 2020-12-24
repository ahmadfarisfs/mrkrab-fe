"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var react_router_dom_1 = require("react-router-dom");
var projects_1 = require("./pages/project/projects");
var transactions_1 = require("./pages/transaction/transactions");
var users_1 = require("./pages/user/users");
var dashboard_1 = require("./pages/dashboard/dashboard");
require("antd/dist/antd.css"); // or 'antd/dist/antd.less'
require("./App.css");
var react_2 = require("react");
var Header = antd_1.Layout.Header, Content = antd_1.Layout.Content, Footer = antd_1.Layout.Footer, Sider = antd_1.Layout.Sider;
var SubMenu = antd_1.Menu.SubMenu;
var App = function () {
    var items = [
        { key: '1', label: 'Dashboard', path: '/', icon: react_1["default"].createElement(icons_1.DashboardOutlined, null), content: dashboard_1["default"] },
        { key: '2', label: 'User', path: '/user', icon: react_1["default"].createElement(icons_1.TeamOutlined, null), content: users_1["default"] },
        { key: '3', label: 'Project', path: '/project', icon: react_1["default"].createElement(icons_1.ProjectOutlined, null), content: projects_1["default"] },
        { key: '4', label: 'Transaction', path: '/transaction', icon: react_1["default"].createElement(icons_1.TransactionOutlined, null), content: transactions_1["default"] },
        { key: '5', label: 'Payable & Receivable', path: '/pending', icon: react_1["default"].createElement(icons_1.AccountBookOutlined, null), content: dashboard_1["default"] },
    ];
    var _a = react_2.useState(false), collapsed = _a[0], setCollapse = _a[1];
    var onCollapse = function (collapse) {
        setCollapse(collapse);
    };
    return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        react_1["default"].createElement(antd_1.Layout, { style: { minHeight: '100vh' } },
            react_1["default"].createElement(Sider, { breakpoint: "lg", collapsible: true, collapsed: collapsed, onCollapse: onCollapse },
                react_1["default"].createElement("div", { className: "logo" }),
                react_1["default"].createElement(antd_1.Menu, { mode: 'inline', theme: "dark", defaultSelectedKeys: ['1'] }, items.map(function (item) { return (react_1["default"].createElement(antd_1.Menu.Item, { key: item.key, icon: item.icon },
                    react_1["default"].createElement(react_router_dom_1.Link, { to: item.path }, item.label))); }))),
            react_1["default"].createElement(antd_1.Layout, { className: "site-layout" },
                react_1["default"].createElement(Header, { className: "site-layout-background", style: { padding: 0,
                        backgroundColor: 'white'
                    } }),
                react_1["default"].createElement(Content, { style: { margin: '0 16px' } },
                    react_1["default"].createElement("div", { className: "site-layout-background", style: {
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            borderRadius: 5
                        } },
                        react_1["default"].createElement(react_router_dom_1.Switch, null, items.map(function (item) { return (react_1["default"].createElement(react_router_dom_1.Route, { exact: item.path === "/" ? true : false, path: item.path, component: item.content })); })))),
                react_1["default"].createElement(Footer, { style: { textAlign: 'center' } }, "HM PMS \u00A92020 Created by AFFS")))));
};
exports["default"] = App;
