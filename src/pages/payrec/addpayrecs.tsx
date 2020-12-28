import React, { useEffect, useRef, useState } from 'react';
//import { PlusCircle, CashStack, Bricks, Cash, Trash, PlusCircleFill } from 'react-bootstrap-icons';
//import { Card, Row, Col, Form, Container, Button, Badge } from 'react-bootstrap';
import { BrowserRouter, withRouter } from "react-router-dom";
import { stringify } from 'querystring';
import { useHistory, Route } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import configData from "../../config.json";
import axios from 'axios';
import { currencyFormatter, currencyParser } from '../../tools/format';
import {
  UserAddOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { submitWithConfirm } from '../../tools/poster'

import { InputNumber, Form, Input, Button, Radio, Select, Space, Card, Avatar } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import ProjectSelector from '../../tools/project';
const MySwal = withReactContent(Swal)
const { Option } = Select;
const { Meta } = Card;
const AddPayRecPage = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [isPocketNeeded, setPocketNeeded] = useState(false);
   
   const onSubmit = (data: any) => {
    console.log(data);
    let payRecType;
    let payload:any = {};
    if (data.Type == "payable") {
      //payable
      payRecType = "payable"
      data.Amount = -Math.abs(data.Amount);
    } else {
      payRecType = "receiveable"
      data.Amount = Math.abs(data.Amount);
    }
    payload.Amount = data.Amount
    payload.ProjectID= data.Project
    payload.BudgetID=data.Pocket
    payload.Remarks = data.Remarks
    console.log(payload);
    submitWithConfirm(payload, "Create new " + payRecType + " ?",
      '', '/payrec', 'New ' + payRecType + ' created !', () => {
        history.push('/payrec')
      }, () => {
        //on failure after popup
      },"post")
  };

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
  return (
    <Card title="Create Payable or Receivable"  >

      <Form {...layout} form={form} name="control-hook" onFinish={onSubmit} >
   
      <Form.Item initialValue="receiveable" name="Type" label="Type" rules={[{ required: true }]}>
                    <Radio.Group onChange={(e) => {

                        console.log(e.target.value)
                        if (e.target.value === "payable") {
                            setPocketNeeded(true);
                        } else {
                            setPocketNeeded(false);
                        }
                    }} defaultValue="receiveable">
                      <Radio value="payable">Payable</Radio>
                        <Radio value="receiveable">Receiveable</Radio>
                        
                    </Radio.Group>
                </Form.Item>
        <ProjectSelector forms={form}  pocketNotNeeded={!isPocketNeeded}/>


        <Form.Item
          key="payRecAmount"
          name="Amount"
          label="Amount"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }}
            formatter={currencyFormatter}
            parser={currencyParser}
            min={0}
          />
        </Form.Item>

        <Form.Item
                    label="Remarks"
                    name="Remarks"
                    rules={[{ required: true, message: 'Please input remarks' }]}
                >
                    <Input />
                </Form.Item>


        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
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
  );
};

export default AddPayRecPage;