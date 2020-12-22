import '../../App.css';
import React, { useEffect, useRef, useState } from 'react';
import { PlusCircle, CashStack, Bricks, Cash, Trash, PlusCircleFill } from 'react-bootstrap-icons';
import { Card, Row, Col, Form, Container, Button, Badge } from 'react-bootstrap';
import { BrowserRouter, withRouter } from "react-router-dom";
import { stringify } from 'querystring';
import { useHistory, Route } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import configData from "../../config.json";
import axios from 'axios';
const MySwal = withReactContent(Swal)
const AddUserPage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { register, errors, handleSubmit, watch } = useForm({ mode: 'onChange', });
  const onSubmit = (data: any) => {
    console.log(data);

    MySwal.fire(
      {
        title: 'Are you sure ?',
        text: "Make sure to inform the password to the newly created user",
        showCancelButton: true,
        icon: 'question',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return axios.post(configData.baseURL + `/users`, data)
            .then(response => {
              if (response.status != 200) {
                console.log("NOT 200")
                throw new Error(response.statusText)
              }
              console.log("ret data")
              console.log(response)
              return "OK"
            })
            .catch(error => {
              console.log(error)
              Swal.showValidationMessage(
                `Registration Failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }
    ).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('User Created!', '', 'success').then(()=>{
          history.push('/user');
        })
      }
    })


  };

  const password = useRef({});
  password.current = watch("Password", "");
  console.log(errors);
  return (
    <Card>

      <Card.Body>
        <Card.Title>Add User</Card.Title>
        <Form className="pt-2" onSubmit={handleSubmit(onSubmit)} noValidate>

          <Form.Group as={Row} controlId="user.fullname">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control

                name="Fullname"
                //isValid={errors.Fullname}
                isInvalid={!!errors.Fullname}
                ref={register({ required: true, maxLength: 40 })}
                type="text"
                placeholder="Full Name" />

              <Form.Control.Feedback type='invalid'>Name is required and must be less than 40 character</Form.Control.Feedback>
            </Col>

          </Form.Group>

          <Form.Group as={Row} controlId="user.username">
            <Form.Label column sm={2}>
              Username
    </Form.Label>
            <Col sm={10}>
              <Form.Control

                isInvalid={errors.Username}
                ref={register({ required: true, maxLength: 40, pattern: /^[a-z0-9_-]{3,16}$/ })}
                name="Username"
                type="text" placeholder="Username" />
              <Form.Control.Feedback type='invalid'>Username must have 3 to 16 alphanumeric character that may include _ and -</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="user.email">
            <Form.Label column sm={2}>
              Email
    </Form.Label>
            <Col sm={10}>
              <Form.Control isInvalid={errors.Email} name="Email"
                ref={register({ required: true, pattern: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/ })} type="email" placeholder="Email" />
              <Form.Control.Feedback type='invalid'>Invalid Email</Form.Control.Feedback>
            </Col>
          </Form.Group>


          <Form.Group as={Row} controlId="user.password"

          >
            <Form.Label column sm={2}>
              Password
    </Form.Label>
            <Col sm={10}>
              <Form.Control
                isInvalid={errors.Password}
                ref={register({ required: true, pattern: /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/ })}
                name="Password"
                type="password" placeholder="Password" />
              <Form.Control.Feedback type='invalid'>Password must have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long</Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="user.confirmpassword">
            <Form.Label column sm={2}>
              Confirm Password
    </Form.Label>
            <Col sm={10}>
              <Form.Control ref={register({
                validate: value =>
                  value === password.current || "The passwords do not match"
              })}
                name="PasswordConfirm"
                isInvalid={errors.PasswordConfirm}
                type="password" placeholder="Password" />
              <Form.Control.Feedback type='invalid'>Password does not match</Form.Control.Feedback>
            </Col>

          </Form.Group>
          <Form.Group as={Row} controlId="user.roleSelect">
            <Form.Label column >User Role</Form.Label>
            <Col sm={10}>
              <Form.Control ref={register({ required: true, })} as="select" name="Role">
                <option value="owner">Owner</option>
                <option value="sa">System Admin</option>
                <option value="secretary">Secretary</option>
                <option value="member">Member</option>
              </Form.Control></Col>
          </Form.Group>


          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Create User</Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>

    </Card>
  );
};

export default AddUserPage;