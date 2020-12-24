"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_data_table_component_1 = require("react-data-table-component");
var axios_1 = require("axios");
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var addprojects_1 = require("./addprojects");
var moment_1 = require("moment");
var config_json_1 = require("../../config.json");
var icons_1 = require("@ant-design/icons");
var sweetalert2_1 = require("sweetalert2");
var sweetalert2_react_content_1 = require("sweetalert2-react-content");
var MySwal = sweetalert2_react_content_1["default"](sweetalert2_1["default"]);
var ListProject = function () {
    var _a = react_1.useState([{}]), data = _a[0], setData = _a[1];
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(0), totalRows = _c[0], setTotalRows = _c[1];
    var _d = react_1.useState(10), perPage = _d[0], setPerPage = _d[1];
    var _e = react_1.useState(1), currentPage = _e[0], setCurrentPage = _e[1];
    var history = react_router_dom_1.useHistory();
    var handleSetStatus = function (id, status) {
        MySwal.fire({
            title: 'Set Status Confirmation ?',
            text: "Are you sure you want to " + status + " this project ?",
            showCancelButton: true,
            icon: 'warning',
            showLoaderOnConfirm: true,
            preConfirm: function (login) {
                return axios_1["default"].put(config_json_1["default"].baseURL + "/projects", {
                    "Status": status,
                    "ProjectID": id
                })
                    .then(function (response) {
                    if (response.status != 200) {
                        throw new Error(response.statusText);
                    }
                    console.log("ret data");
                    console.log(response);
                    return "OK";
                })["catch"](function (error) {
                    sweetalert2_1["default"].showValidationMessage("Set Status Failed: " + error);
                });
            },
            allowOutsideClick: function () { return !sweetalert2_1["default"].isLoading(); }
        }).then(function (result) {
            if (result.isConfirmed) {
                sweetalert2_1["default"].fire('Status Set!', '', 'success').then(function () {
                    fetchProjects(currentPage, perPage);
                });
            }
        });
    };
    var handleDelete = function (id) {
        MySwal.fire({
            title: 'Delete Confirmation ?',
            text: "Are you sure you want to delete this project ?",
            showCancelButton: true,
            icon: 'warning',
            showLoaderOnConfirm: true,
            preConfirm: function (login) {
                return axios_1["default"]["delete"](config_json_1["default"].baseURL + "/projects/" + id)
                    .then(function (response) {
                    if (response.status != 200) {
                        throw new Error(response.statusText);
                    }
                    console.log("ret data");
                    console.log(response);
                    return "OK";
                })["catch"](function (error) {
                    sweetalert2_1["default"].showValidationMessage("Delete Failed: " + error);
                });
            },
            allowOutsideClick: function () { return !sweetalert2_1["default"].isLoading(); }
        }).then(function (result) {
            if (result.isConfirmed) {
                sweetalert2_1["default"].fire('Project Deleted!', '', 'success').then(function () {
                    // history.go(0);
                    fetchProjects(currentPage, perPage);
                });
            }
        });
    };
    var columns = [
        {
            name: "ID",
            selector: "ID",
            sortable: false
        },
        {
            name: "Name",
            selector: "Name",
            sortable: false
        },
        {
            name: "Description",
            selector: "Description",
            sortable: false
        },
        {
            name: "Status",
            selector: "IsOpen",
            sortable: false,
            button: true,
            cell: function (row) { return react_1["default"].createElement(react_1["default"].Fragment, null, //      row.IsOpen ?
            react_1["default"].createElement(antd_1.Switch, { checkedChildren: "Open", onClick: function () {
                    handleSetStatus(row.ID, row.IsOpen ? "close" : "open");
                }, unCheckedChildren: "Closed", checked: row.IsOpen })); }
        },
        {
            name: "Created Since",
            selector: "CreatedAt",
            sortable: false,
            format: function (row) { return react_1["default"].createElement(react_1["default"].Fragment, null, row.CreatedAt ? moment_1["default"](row.CreatedAt).fromNow() : null); }
        }, {
            name: 'Action',
            button: true,
            cell: function (row) { return react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(antd_1.Button, { onClick: function () { return handleDelete(row.ID); }, size: "small", danger: true, icon: react_1["default"].createElement(icons_1.DeleteOutlined, null) })); }
        },
    ];
    var fetchProjects = function (page, newPage) { return __awaiter(void 0, void 0, void 0, function () {
        var perPageLocal, fromIndex, toIndex, response, totalData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    perPageLocal = newPage ? newPage : perPage;
                    fromIndex = (perPageLocal * (page - 1));
                    toIndex = fromIndex + perPageLocal - 1;
                    console.log("req " + fromIndex + " to " + toIndex);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, axios_1["default"].get(config_json_1["default"].baseURL + "/projects?range=[" + fromIndex + "," + toIndex + "]")];
                case 2:
                    response = _a.sent();
                    if (response.status != 200) {
                        throw new Error('Unexpected response code');
                    }
                    console.log(response);
                    setData(response.data);
                    totalData = parseInt(response.headers["content-range"].split("/")[1]);
                    console.log("total data " + totalData);
                    setTotalRows(totalData);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    setData([]);
                    MySwal.fire({
                        title: 'Error',
                        icon: 'error',
                        text: error_1
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handlePageChange = function (page, totalRows) {
        console.log("page change handler");
        setCurrentPage(page);
        fetchProjects(page);
    };
    var handlePerRowsChange = function (newPerPage, page) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("row change handler " + newPerPage);
            fetchProjects(page, newPerPage);
            setPerPage(newPerPage);
            return [2 /*return*/];
        });
    }); };
    react_1.useEffect(function () {
        fetchProjects(1);
        console.log("Projects page loaded");
    }, []);
    return (react_1["default"].createElement(react_data_table_component_1["default"], { striped: true, 
        // expandableRows
        // expandableRowsComponent={<ExpandedProject />}
        // expandOnRowClicked
        paginationRowsPerPageOptions: [2, 5, 10], progressPending: loading, actions: react_1["default"].createElement(antd_1.Button, { onClick: function () {
                history.push('/project/add');
            }, icon: react_1["default"].createElement(icons_1.UserAddOutlined, null) }, "Add Project"), title: "Projects", columns: columns, data: data, pagination: true, paginationServer: true, paginationTotalRows: totalRows, 
        //    selectableRows
        onChangeRowsPerPage: handlePerRowsChange, onChangePage: handlePageChange }));
};
var ExpandedProject = function () {
    return (react_1["default"].createElement(react_1["default"].Fragment, null));
};
var ProjectPage = function (_a) {
    var match = _a.match;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: match.url + "/add", component: addprojects_1["default"] }),
        react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: match.url, component: ListProject })));
};
exports["default"] = ProjectPage;
