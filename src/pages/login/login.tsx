import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Modal,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../../App.css';
import axios from 'axios';
// import Swal from 'sweetalert2'
import {getSession,logIn,logOut} from '../../tools/cookies'

import configData from "../../config.json";
// import withReactContent from 'sweetalert2-react-content'
// const MySwal = withReactContent(Swal)

const NormalLoginForm = ({loggedIn,onLogin} : { loggedIn: any,onLogin:any}) => {
  const onFinish = (values:any) => {
    console.log('Received values of form: ', values);
    axios.post(configData.baseURL + `/auth/login`, {
      "Username": values.username,
      "Password": values.password,
    })
      .then(response => {
        if (response.status != 200) {
          throw new Error(response.statusText)
        }
        console.log("ret data")
        console.log(response)
        logIn(response.data)
        // axios.defaults.headers.common['Authorization'] = "Bearer "+response.data;
        onLogin();
        return "OK"
      })
      .catch(error => {
        console.log("Error loh")
        console.log(error.response.data)
        
        message.error(error.response.data)
        // Swal.showValidationMessage(
        //   `Set Status Failed: ${error}`
        // )
      })
  };
  const onLoginOk = ()=>{
   
  };
  return (
      <Modal 
      title="MrKrab PMS"
      // onOk={()=>{onLoginOk()}}
        visible centered width={300} closable={false}
        footer={false}
        >
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        {/* Or <a href="">register now!</a> */}
      </Form.Item>
    </Form></Modal>
  );
};

export default NormalLoginForm;