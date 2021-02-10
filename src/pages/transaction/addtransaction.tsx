
import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
// import movies from "../../movies";
import axios from 'axios';
import { Spin, Button,DatePicker, Drawer, Tag, Badge, Switch, Radio, Card, Form, Input, Space, Select, Empty, InputNumber } from 'antd';
import { useHistory, Route } from 'react-router-dom';
//import debounce from 'lodash/debounce';
import _ from "lodash";
import moment from 'moment';
import configData from "../../config.json";
import {
    UserAddOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { OptionProps, OptionType } from 'antd/lib/select';
import { formatCurrency } from '../../tools/format'
import { submitWithConfirm } from '../../tools/poster'
import { currencyFormatter, currencyParser } from '../../tools/format';
import ProjectSelector from '../../tools/project';

const { Option } = Select;


const MySwal = withReactContent(Swal);


const AddTransactionPage = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const [isPocketNeeded, setPocketNeeded] = useState(false);
    const tailLayout = {
        wrapperCol: {
            offset: 6,
            span: 16,
        },
    };

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const onSubmit = (data: any) => {
        console.log(data)
        const payload = {
            "ProjectID": data.Project,
            "BudgetID": data.Pocket === "No Pocket" ? null : data.Pocket,
            "Amount": data.Type === "expense" ? -data.Amount : data.Amount,
            "TransactionDate":data.Date,
            "Remarks": data.Remarks,
            "SoD":data.SoD,
        }
        submitWithConfirm(payload, "Create new transaction ?",
            '', '/projects/transaction', 'Transaction created !', () => {
                history.push('/transaction')
            }, () => {
                //on failure after popup
            },"post")
    };

    return (<>

        <Card title="Create Transaction"  >

            <Form {...layout} form={form} name="control-hooks" onFinish={onSubmit} >
                <Form.Item initialValue="expense" name="Type" label="Type" rules={[{ required: true }]}>
                    <Radio.Group onChange={(e) => {

                        console.log(e.target.value)
                        if (e.target.value === "income") {
                            setPocketNeeded(false);
                        } else {
                            setPocketNeeded(true);
                        }
                    }} defaultValue="expense">
                        <Radio value="expense">Expense</Radio>
                        <Radio value="income">Income</Radio>
                    </Radio.Group>
                </Form.Item>
                <ProjectSelector forms={form} pocketNotNeeded={!isPocketNeeded} />
                <Form.Item
                    label="Amount"
                    name="Amount"
                    rules={[{ required: true, message: 'Please input amount!' }]}
                >
                    <InputNumber formatter={currencyFormatter}
                        parser={currencyParser} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    label="Remarks"
                    name="Remarks"
                    rules={[{ required: true, message: 'Please input remarks' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="SoD"
                    name="SoD"
                    rules={[{ required: true, message: 'Please input source or destination description' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Date"
                    name="Date"
                    rules={[{ required: true, message: 'Please input date' }]}
                >
                    <DatePicker defaultValue={moment()} /> 
                </Form.Item>
                
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit" >
                            Submit
  </Button>
                        <Button htmlType="button" onClick={() => {
                            form.resetFields();

                        }} >
                            Reset
  </Button>
                    </Space>
                </Form.Item>
            </Form>

        </Card>
    </>)
};

export default AddTransactionPage;