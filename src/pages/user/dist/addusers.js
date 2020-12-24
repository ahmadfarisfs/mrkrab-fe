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
var react_router_dom_1 = require("react-router-dom");
var react_hook_form_1 = require("react-hook-form");
var sweetalert2_1 = require("sweetalert2");
var sweetalert2_react_content_1 = require("sweetalert2-react-content");
var config_json_1 = require("../../config.json");
var axios_1 = require("axios");
var antd_1 = require("antd");
require("antd/dist/antd.css"); // or 'antd/dist/antd.less'
var MySwal = sweetalert2_react_content_1["default"](sweetalert2_1["default"]);
var Option = antd_1.Select.Option;
var Meta = antd_1.Card.Meta;
var AddUserPage = function () {
    var form = antd_1.Form.useForm()[0];
    var history = react_router_dom_1.useHistory();
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var _b = react_hook_form_1.useForm({ mode: 'onChange' }), register = _b.register, errors = _b.errors, handleSubmit = _b.handleSubmit, watch = _b.watch;
    var onSubmit = function (data) {
        console.log(data);
        MySwal.fire({
            title: 'Are you sure ?',
            text: "Make sure to inform the password to the newly created user",
            showCancelButton: true,
            icon: 'question',
            showLoaderOnConfirm: true,
            preConfirm: function (login) {
                return axios_1["default"].post(config_json_1["default"].baseURL + "/users", data)
                    .then(function (response) {
                    if (response.status != 200) {
                        console.log("NOT 200");
                        throw new Error(response.statusText);
                    }
                    console.log("ret data");
                    console.log(response);
                    return "OK";
                })["catch"](function (error) {
                    console.log(error);
                    sweetalert2_1["default"].showValidationMessage("Registration Failed: " + error);
                });
            },
            allowOutsideClick: function () { return !sweetalert2_1["default"].isLoading(); }
        }).then(function (result) {
            if (result.isConfirmed) {
                sweetalert2_1["default"].fire('User Created!', '', 'success').then(function () {
                    history.push('/user');
                });
            }
        });
    };
    var tailLayout = {
        wrapperCol: {
            offset: 6,
            span: 16
        }
    };
    var password = react_1.useRef({});
    password.current = watch("Password", "");
    console.log(errors);
    var layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
    };
    return (react_1["default"].createElement(antd_1.Card, { title: "Add User" },
        react_1["default"].createElement(antd_1.Form, __assign({}, layout, { form: form, name: "control-hooks", onFinish: onSubmit }),
            react_1["default"].createElement(antd_1.Form.Item, { name: "Fullname", label: "Name", rules: [
                    {
                        required: true,
                        message: 'Please input your name'
                    },
                ] },
                react_1["default"].createElement(antd_1.Input, null)),
            react_1["default"].createElement(antd_1.Form.Item, { name: "Username", label: "Username", rules: [
                    {
                        required: true,
                        message: 'Username must have 3 to 16 alphanumeric character that may include _ and -',
                        pattern: /^[a-z0-9_-]{3,16}$/
                    },
                ] },
                react_1["default"].createElement(antd_1.Input, null)),
            react_1["default"].createElement(antd_1.Form.Item, { name: "Email", label: "Email", rules: [
                    {
                        type: "email",
                        message: 'Invalid Email',
                        required: true
                    },
                ] },
                react_1["default"].createElement(antd_1.Input, null)),
            react_1["default"].createElement(antd_1.Form.Item, { name: "Password", label: "Password", rules: [
                    {
                        required: true,
                        message: 'Password must have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long',
                        pattern: /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/
                    },
                ], hasFeedback: true },
                react_1["default"].createElement(antd_1.Input.Password, null)),
            react_1["default"].createElement(antd_1.Form.Item, { name: "confirm", label: "Confirm Password", dependencies: ['Password'], hasFeedback: true, rules: [
                    {
                        required: true,
                        message: 'Please confirm your Password!'
                    },
                    function (_a) {
                        var getFieldValue = _a.getFieldValue;
                        return ({
                            validator: function (rule, value) {
                                if (!value || getFieldValue('Password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            }
                        });
                    },
                ] },
                react_1["default"].createElement(antd_1.Input.Password, null)),
            react_1["default"].createElement(antd_1.Form.Item, { name: "Role", label: "Role", rules: [{ required: true }] },
                react_1["default"].createElement(antd_1.Select, { placeholder: "Select role", 
                    //onChange={onGenderChange}
                    allowClear: true },
                    react_1["default"].createElement(Option, { value: "owner" }, "Owner"),
                    react_1["default"].createElement(Option, { value: "sa" }, "System Admin"),
                    react_1["default"].createElement(Option, { value: "secretary" }, "Secretary"),
                    react_1["default"].createElement(Option, { value: "member" }, "Member"))),
            react_1["default"].createElement(antd_1.Form.Item, __assign({}, tailLayout),
                react_1["default"].createElement(antd_1.Space, null,
                    react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"),
                    react_1["default"].createElement(antd_1.Button, { htmlType: "button", onClick: function () {
                            form.resetFields();
                        } }, "Reset"))))));
};
exports["default"] = AddUserPage;
