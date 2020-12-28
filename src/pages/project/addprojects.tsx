//import '../../App.css';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
//import { PlusCircle, CashStack, Bricks, Cash, Trash, PlusCircleFill } from 'react-bootstrap-icons';
//import { Card, Row, Col, Form, Container, Button, Badge, InputGroup } from 'react-bootstrap';
import { BrowserRouter, withRouter, useHistory } from "react-router-dom";
import { stringify } from 'querystring';
import NumberFormat from 'react-number-format';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import configData from "../../config.json";
import axios from 'axios';
 import{ currencyFormatter, currencyParser} from '../../tools/format';
import {
    UserAddOutlined, PlusOutlined,
    DeleteOutlined, MinusCircleOutlined
} from '@ant-design/icons';
import { Form, Input, Button, Radio, Select, Space, Card, Avatar, InputNumber, Row, Col, Switch } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import add from 'immutability-helper';
const { Option } = Select;
const MySwal = withReactContent(Swal)
export interface IProjectPocket {
    key: string;
    pocketName: string;
    pocketBudget: number;
    useBudget: boolean;
};
export interface IProjectPocketSetting {
    key: string;
    useBudget: boolean;
};


const AddProjectPage = () => {
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const budgetLayout = {
        wrapperCol: {
            //offset: 6,
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 6,
            span: 16,
        },
    };
    const [form] = Form.useForm();
    const history = useHistory();
    const [isPocketUse, setUseBudgets] = useState(new Map<any, boolean>());
    const [biggestBudgetKey, setBiggestBudgetKey] = useState(-1);
    const [budgets, setBudgets] = useState<IProjectPocket[]>([]);
    const onSubmit = (data: any) => {
        console.log(data)
        console.log(budgets)
        //prepare data
        let budgetsSend: { Name: string, Budget: any }[] = [];

        data.Pocket?.forEach((item:any, index:any) => {
            budgetsSend.push({
                "Name": item.PocketName,
                "Budget": item.PocketUseBudget==="limited" ? item.PocketBudget : null
            })
        })
        let projData = {
            "Name": data.ProjectName,
            "Description": data.ProjectDescription,
            "Budgets": budgetsSend,
        }
        console.log(projData)
        MySwal.fire(
            {
                title: 'Create New Project ?',
                //text: "Make sure to inform the password to the newly created user",
                showCancelButton: true,
                icon: 'question',
                showLoaderOnConfirm: true,
                preConfirm: (login) => {
                    return axios.post(configData.baseURL + `/projects`, projData)
                        .then(response => {
                            if (response.status != 200) {
                                throw new Error(response.statusText)
                            }
                            console.log("ret data")
                            console.log(response)
                            return "OK"
                        })
                        .catch(error => {
                            Swal.showValidationMessage(
                                `Create Project Failed: ${error}`
                            )
                        })
                },
                allowOutsideClick: () => !Swal.isLoading()
            }
        ).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Project Created!', '', 'success').then(() => {
                    history.push('/project');
                })
            }
        })
    };
    useEffect(() => {
        console.log("use effisPocketUse");
        console.log(isPocketUse);
    }, [isPocketUse])
    const onChangeLimit = (value: any, key: any) => {

        console.log(value);
        console.log(key);
        let newsMaps = isPocketUse;
        let newMap = newsMaps.set(key, value === "unlimited" ? false : true);
        // let newMap2 = add(newMap,);
        //let newnew = new Map<any, boolean>();
        let newnew = new Map(newMap);
        console.log(newnew)
        setUseBudgets(newnew);
        //  console.log("isPocketUse");
        //   console.log(isPocketUse);

    };
    return (
        <>
            <Card title="Add Project">


                <Form {...layout} onFinish={onSubmit} >
                    <Form.Item
                        key="prjName"
                        name="ProjectName"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Name must be more than 5 character and less than 60',
                                min: 5,
                                max: 60,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        key="prjDesc"

                        name="ProjectDescription"
                        label="Description"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        key="prjBudget"
                        name="ProjectBudget"
                        label="Budget"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber style={{width:"100%"}} 
                        formatter={currencyFormatter}
                        parser={currencyParser}
                        min={0}
                        />
                    </Form.Item>
                    
                    <Form.Item label="Pockets"  >
                        <Form.List

                            name="Pocket">

                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(field => (

                                        <>

                                            <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="center">
                                                <Form.Item

                                                    {...field}
                                                    name={[field.name, 'PocketName']}
                                                    fieldKey={[field.fieldKey, 'PocketName']}
                                                    rules={[{ required: true, message: 'Please Input Pocket Name' }]}

                                                >
                                                    <Input placeholder="Enter Pocket Name" />
                                                </Form.Item>



                                                <Form.Item

                                                    {...field}
                                                    name={[field.name, 'PocketUseBudget']}
                                                    fieldKey={[field.fieldKey, 'PocketUseBudget']}
                                                    rules={[{ required: true, message: 'Please select' }]}

                                                >


                                                    <Select

                                                        key={field.key}
                                                        style={{
                                                            width: "100px"
                                                        }}
                                                        // defaultValue="unlimited"
                                                        onChange={
                                                            (value) => { onChangeLimit(value, field.key) }
                                                        } >
                                                        <Option key={field.key+"limited"} value="limited">w/ Limit</Option>
                                                        <Option key={field.key+"unlimited"}value="unlimited">w/o Limit</Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item

                                                    {...field}
                                                    name={[field.name, 'PocketBudget']}
                                                    fieldKey={[field.fieldKey, 'PocketBudget']}
                                                    rules={[{
                                                        required: isPocketUse.get(field.key),
                                                        message: 'Missing Budget',
                                                      //  min: isPocketUse.get(field.key) ? 0 : 1,
                                                    }]}

                                                >

                                                    <InputNumber
                                                        disabled={!isPocketUse.get(field.key)}
                                                        formatter={currencyFormatter}
                                                        parser={currencyParser}
                                                        style={{ width: '200px' }} />

                                                </Form.Item>

                                                <Form.Item {...field}

                                                >
                                                    <MinusCircleOutlined

                                                        key={field.key}

                                                        onClick={() => {
                                                            let newMaps = isPocketUse;
                                                            newMaps.delete(field.key);
                                                            let newnew = new Map(newMaps);
                                                            setUseBudgets(newnew);
                                                            remove(field.name)
                                                        }} />

                                                </Form.Item>

                                            </Space>
                                        </>

                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => {

                                            let newsMaps = isPocketUse;

                                            let newMap;

                                            newMap = newsMaps.set(biggestBudgetKey + 1, false);
                                            setBiggestBudgetKey(biggestBudgetKey + 1);

                                            setUseBudgets(newMap);
                                            add();
                                        }} block icon={<PlusOutlined />}>
                                            Add Pocket
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Form.Item>


                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </>
    );
};
export default AddProjectPage;