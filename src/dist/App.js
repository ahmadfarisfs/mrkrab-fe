"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
require("./App.css");
var Container_1 = require("react-bootstrap/Container");
var Col_1 = require("react-bootstrap/Col");
var Row_1 = require("react-bootstrap/Row");
var Navbar_1 = require("react-bootstrap/Navbar");
var ListGroup_1 = require("react-bootstrap/ListGroup");
var react_bootstrap_icons_1 = require("react-bootstrap-icons");
var icon_png_1 = require("./assets/icon.png");
var users_1 = require("./pages/user/users");
var react_router_dom_1 = require("react-router-dom");
var projects_1 = require("./pages/project/projects");
var transactions_1 = require("./pages/transaction/transactions");
var dashboard_1 = require("./pages/dashboard/dashboard");
var App = function () { return (react_1["default"].createElement(react_1["default"].Fragment, null,
    react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(Navbar_1["default"], { variant: "dark", className: "bg-dark justify-content-between p-3" },
                react_1["default"].createElement(Navbar_1["default"].Brand, { href: "#home" },
                    react_1["default"].createElement("img", { alt: "", src: icon_png_1["default"], width: "20", height: "20" }),
                    ' ',
                    "Mr. Krab"),
                react_1["default"].createElement(Navbar_1["default"].Collapse, { className: "justify-content-end" },
                    react_1["default"].createElement(Navbar_1["default"].Text, null,
                        "Signed in as: ",
                        react_1["default"].createElement("a", { href: "#login" }, "Mark Otto")))),
            react_1["default"].createElement(Container_1["default"], { fluid: true },
                react_1["default"].createElement(Row_1["default"], null,
                    react_1["default"].createElement(Col_1["default"], { md: 3, className: "p-3" },
                        react_1["default"].createElement(ListGroup_1["default"], null,
                            react_1["default"].createElement(ListGroup_1["default"].Item, { action: true, as: react_router_dom_1.NavLink, exact: true, to: "/" },
                                react_1["default"].createElement(react_bootstrap_icons_1.MenuApp, { className: "m-1" }),
                                "Dashboard"),
                            react_1["default"].createElement(ListGroup_1["default"].Item, { action: true, to: "/user", as: react_router_dom_1.NavLink },
                                react_1["default"].createElement(react_bootstrap_icons_1.PersonLinesFill, { className: "m-1" }),
                                "User"),
                            react_1["default"].createElement(ListGroup_1["default"].Item, { action: true, to: "/project", as: react_router_dom_1.NavLink },
                                react_1["default"].createElement(react_bootstrap_icons_1.Bricks, { className: "m-1" }),
                                "Project"),
                            react_1["default"].createElement(ListGroup_1["default"].Item, { action: true, as: react_router_dom_1.NavLink, to: "/transaction" },
                                react_1["default"].createElement(react_bootstrap_icons_1.CashStack, { className: "m-1" }),
                                "Transaction"),
                            react_1["default"].createElement(ListGroup_1["default"].Item, { action: true, to: "/transfer", as: react_router_dom_1.NavLink },
                                react_1["default"].createElement(react_bootstrap_icons_1.ArrowRepeat, { className: "m-1" }),
                                "Transfer"),
                            react_1["default"].createElement(ListGroup_1["default"].Item, { action: true, as: react_router_dom_1.NavLink, to: "/loan" },
                                react_1["default"].createElement(react_bootstrap_icons_1.HandThumbsDown, { className: "m-1" }),
                                "Loan"))),
                    react_1["default"].createElement(Col_1["default"], { className: "p-3" },
                        react_1["default"].createElement(react_router_dom_1.Switch, null,
                            react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/", component: dashboard_1["default"] }),
                            react_1["default"].createElement(react_router_dom_1.Route, { path: "/user", component: users_1["default"] }),
                            react_1["default"].createElement(react_router_dom_1.Route, { path: "/project", component: projects_1["default"] }),
                            react_1["default"].createElement(react_router_dom_1.Route, { path: "/transaction" },
                                react_1["default"].createElement(transactions_1["default"], null)))))))))); };
exports["default"] = App;
