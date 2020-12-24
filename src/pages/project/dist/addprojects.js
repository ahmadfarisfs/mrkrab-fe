"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
//import { PlusCircle, CashStack, Bricks, Cash, Trash, PlusCircleFill } from 'react-bootstrap-icons';
//import { Card, Row, Col, Form, Container, Button, Badge, InputGroup } from 'react-bootstrap';
var react_router_dom_1 = require("react-router-dom");
var sweetalert2_1 = require("sweetalert2");
var sweetalert2_react_content_1 = require("sweetalert2-react-content");
var config_json_1 = require("../../config.json");
var axios_1 = require("axios");
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
require("antd/dist/antd.css"); // or 'antd/dist/antd.less'
var Option = antd_1.Select.Option;
var MySwal = sweetalert2_react_content_1["default"](sweetalert2_1["default"]);
;
;
var AddProjectPage = function () {
    var layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
    };
    var budgetLayout = {
        wrapperCol: {
            //offset: 6,
            span: 16
        }
    };
    var tailLayout = {
        wrapperCol: {
            offset: 6,
            span: 16
        }
    };
    var locale = "id-ID";
    var currencyFormatter = function (selectedCurrOpt) { return function (value) {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: "IDR"
        }).format(value);
    }; };
    var currencyParser = function (val) {
        try {
            // for when the input gets clears
            if (typeof val === "string" && !val.length) {
                val = "0.0";
            }
            // detecting and parsing between comma and dot
            var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
            var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
            var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
            reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
            //  => 1232.21 €
            // removing everything except the digits and dot
            reversedVal = reversedVal.replace(/[^0-9.]/g, "");
            //  => 1232.21
            // appending digits properly
            var digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
            var needsDigitsAppended = digitsAfterDecimalCount > 2;
            if (needsDigitsAppended) {
                reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
            }
            return Number.isNaN(reversedVal) ? 0 : reversedVal;
        }
        catch (error) {
            console.error(error);
        }
    };
    var form = antd_1.Form.useForm()[0];
    var history = react_router_dom_1.useHistory();
    var _a = react_1.useState(new Map()), isPocketUse = _a[0], setUseBudgets = _a[1];
    var _b = react_1.useState(-1), biggestBudgetKey = _b[0], setBiggestBudgetKey = _b[1];
    var _c = react_1.useState([]), budgets = _c[0], setBudgets = _c[1];
    var onSubmit = function (data) {
        console.log(data);
        console.log(budgets);
        //prepare data
        var budgetsSend = [];
        budgets.forEach(function (item, index) {
            budgetsSend.push({
                "Name": item.pocketName,
                "Budget": item.useBudget ? item.pocketBudget : null
            });
        });
        var projData = {
            "Name": data.ProjectName,
            "Description": data.ProjectDescription,
            "Budgets": budgetsSend
        };
        console.log(projData);
        MySwal.fire({
            title: 'Create New Project ?',
            //text: "Make sure to inform the password to the newly created user",
            showCancelButton: true,
            icon: 'question',
            showLoaderOnConfirm: true,
            preConfirm: function (login) {
                return axios_1["default"].post(config_json_1["default"].baseURL + "/projects", projData)
                    .then(function (response) {
                    if (response.status != 200) {
                        throw new Error(response.statusText);
                    }
                    console.log("ret data");
                    console.log(response);
                    return "OK";
                })["catch"](function (error) {
                    sweetalert2_1["default"].showValidationMessage("Create Project Failed: " + error);
                });
            },
            allowOutsideClick: function () { return !sweetalert2_1["default"].isLoading(); }
        }).then(function (result) {
            if (result.isConfirmed) {
                sweetalert2_1["default"].fire('Project Created!', '', 'success').then(function () {
                    history.push('/project');
                });
            }
        });
    };
    react_1.useEffect(function () {
        console.log("use effisPocketUse");
        console.log(isPocketUse);
    }, [isPocketUse]);
    var onChangeLimit = function (value, key) {
        console.log(value);
        console.log(key);
        var newsMaps = isPocketUse;
        var newMap = newsMaps.set(key, value === "unlimited" ? false : true);
        // let newMap2 = add(newMap,);
        //let newnew = new Map<any, boolean>();
        var newnew = new Map(newMap);
        console.log(newnew);
        setUseBudgets(newnew);
        //  console.log("isPocketUse");
        //   console.log(isPocketUse);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Card, { title: "Add Project" },
            react_1["default"].createElement(antd_1.Form, __assign({}, layout, { onFinish: function (val) {
                    console.log(val);
                } }),
                react_1["default"].createElement(antd_1.Form.Item, { key: "prjName", name: "ProjectName", label: "Name", rules: [
                        {
                            required: true,
                            message: 'Name must be more than 5 character and less than 60',
                            min: 5,
                            max: 60
                        },
                    ] },
                    react_1["default"].createElement(antd_1.Input, null)),
                react_1["default"].createElement(antd_1.Form.Item, { key: "prjDesc", name: "ProjectDescription", label: "Description", rules: [
                        {
                            required: true
                        },
                    ] },
                    react_1["default"].createElement(antd_1.Input.TextArea, null)),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Pockets" },
                    react_1["default"].createElement(antd_1.Form.List, { name: "Pocket" }, function (fields, _a) {
                        var add = _a.add, remove = _a.remove;
                        return (react_1["default"].createElement(react_1["default"].Fragment, null,
                            fields.map(function (field) { return (react_1["default"].createElement(react_1["default"].Fragment, null,
                                react_1["default"].createElement(antd_1.Space, { key: field.key, style: { display: 'flex', marginBottom: 8 }, align: "center" },
                                    react_1["default"].createElement(antd_1.Form.Item, __assign({}, field, { name: [field.name, 'PocketName'], fieldKey: [field.fieldKey, 'PocketName'], rules: [{ required: true, message: 'Please Input Pocket Name' }] }),
                                        react_1["default"].createElement(antd_1.Input, { placeholder: "Enter Pocket Name" })),
                                    react_1["default"].createElement(antd_1.Form.Item, __assign({}, field, { name: [field.name, 'PocketUseBudget'], fieldKey: [field.fieldKey, 'PocketUseBudget'], rules: [{ required: true, message: 'Please select' }] }),
                                        react_1["default"].createElement(antd_1.Select, { key: field.key, style: {
                                                width: "100px"
                                            }, 
                                            // defaultValue="unlimited"
                                            onChange: function (value) { onChangeLimit(value, field.key); } },
                                            react_1["default"].createElement(Option, { value: "limited" }, "w/ Limit"),
                                            react_1["default"].createElement(Option, { value: "unlimited" }, "w/o Limit"))),
                                    react_1["default"].createElement(antd_1.Form.Item, __assign({}, field, { name: [field.name, 'PocketBudget'], fieldKey: [field.fieldKey, 'PocketBudget'], rules: [{
                                                required: isPocketUse.get(field.key),
                                                message: 'Missing Budget',
                                                min: isPocketUse.get(field.key) ? 1 : 0
                                            }] }),
                                        react_1["default"].createElement(antd_1.InputNumber, { disabled: !isPocketUse.get(field.key), formatter: currencyFormatter("Rupiah::IDR"), parser: currencyParser, style: { width: '200px' } })),
                                    react_1["default"].createElement(antd_1.Form.Item, __assign({}, field),
                                        react_1["default"].createElement(icons_1.MinusCircleOutlined, { key: field.key, onClick: function () {
                                                var newMaps = isPocketUse;
                                                newMaps["delete"](field.key);
                                                var newnew = new Map(newMaps);
                                                setUseBudgets(newnew);
                                                remove(field.name);
                                            } }))))); }),
                            react_1["default"].createElement(antd_1.Form.Item, null,
                                react_1["default"].createElement(antd_1.Button, { type: "dashed", onClick: function () {
                                        var newsMaps = isPocketUse;
                                        var newMap;
                                        newMap = newsMaps.set(biggestBudgetKey + 1, false);
                                        setBiggestBudgetKey(biggestBudgetKey + 1);
                                        setUseBudgets(newMap);
                                        add();
                                    }, block: true, icon: react_1["default"].createElement(icons_1.PlusOutlined, null) }, "Add Pocket"))));
                    })),
                react_1["default"].createElement(antd_1.Form.Item, __assign({}, tailLayout),
                    react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"))))));
};
exports["default"] = AddProjectPage;
