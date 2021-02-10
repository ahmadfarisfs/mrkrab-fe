
import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
// import movies from "../../movies";
import axios from 'axios';
import { Spin, Button, Drawer, Tag, Badge, Switch, Radio, Card, Form, Input, Space, Select, Empty, InputNumber, Row, Col, Divider } from 'antd';
import { useHistory, Route } from 'react-router-dom';
//import debounce from 'lodash/debounce';
import _ from "lodash";
import moment from 'moment';
import configData from "../../config.json";
import {
    UserAddOutlined,
    DeleteOutlined,ArrowDownOutlined
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


const AddTransferPage = () => {
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
            "ProjectIDSource": data.Projectfrom,
            "BudgetIDSource": data.Pocketfrom === "No Pocket" ? null : data.Pocketfrom,
            "ProjectIDTarget": data.Projectto,
            "BudgetIDTarget": data.Pocketto === "No Pocket" ? null : data.Pocketto,
            "Amount":  data.Amount,
            "Remarks": data.Remarks,
            "Notes":"",
            "Meta":"",
        }
        console.log(payload)
        submitWithConfirm(payload, "Create new transfer ?",
            '', '/projects/transfer', 'Transfer created !', () => {
                history.push('/transaction')
            }, () => {
                //on failure after popup
            },"post")
    };

    return (<>

        <Card title="Create Transfer"  >
        <Divider>From </Divider> 
            <Form {...layout} form={form} name="control-hooks" onFinish={onSubmit} >


                
                        {/* FROM */}
                        <ProjectSelector forms={form}  nameSuffix="from" />
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

          <Divider>To <ArrowDownOutlined /></Divider>    
{/* TO */}
<ProjectSelector forms={form}  nameSuffix="to"/>
                    
             
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

export default AddTransferPage;