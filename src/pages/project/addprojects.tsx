import '../../App.css';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { PlusCircle, CashStack, Bricks, Cash, Trash, PlusCircleFill } from 'react-bootstrap-icons';
import { Card, Row, Col, Form, Container, Button, Badge, InputGroup } from 'react-bootstrap';
import { BrowserRouter, withRouter ,useHistory} from "react-router-dom";
import { stringify } from 'querystring';
import NumberFormat from 'react-number-format';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import configData from "../../config.json";
import axios from 'axios';
const MySwal = withReactContent(Swal)
export interface IProjectPocket {
    pocketName: string;
    pocketBudget: number;
    useBudget: boolean;
};


const AddProjectPage = () => {
    const history = useHistory();
    const [budgets, setBudgets] = useState<IProjectPocket[]>([]);
    const onSubmit = (data: any) => {
        console.log(data)
        console.log(budgets)
        //prepare data
        let budgetsSend : { Name: string,Budget:any }[]=[];

        budgets.forEach((item, index) => {
            budgetsSend.push({
                "Name": item.pocketName,
                "Budget": item.useBudget ? item.pocketBudget : null
            })
        })
        let projData={
            "Name":data.ProjectName,
            "Description":data.ProjectDescription,
            "Budgets":budgetsSend,
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
              Swal.fire('Project Created!', '', 'success').then(()=>{
                history.push('/project');
              })
            }
          })
    };
    const { register, errors, handleSubmit, watch } = useForm({ mode: 'onChange', });
    const onChangeLimit = (event: any, index: any) => {
        console.log(event.target.checked);
        console.log(index);
        let items = [...budgets];
        let item = { ...items[index] };
        item.useBudget = event.target.checked;

        if (event.target.checked === false) {
            item.pocketBudget = 0;
        }
        items[index] = item;
        console.log(items);
        setBudgets(items);
    };
    return (
        <>
            <Card>

                <Card.Body>
                    <Card.Title>Add New Project </Card.Title>
                    <Form className="mt-4 mb-3" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Form.Group as={Row} controlId="projectName">
                            <Form.Label column lg={2} >Name</Form.Label>
                            <Col sm={10}>
                                <Form.Control name="ProjectName" isInvalid={!!errors.ProjectName} ref={register({ required: true, minLength: 5, maxLength: 60 })} type="text" placeholder="Enter project name" />
                                <Form.Control.Feedback type='invalid'>Name is required and must be more than 5 character and less than 60</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="projectDescription">
                            <Form.Label column lg={2} >Description</Form.Label>
                            <Col sm={10}>
                                <Form.Control ref={register} name="ProjectDescription" type="text" as="textarea" rows={3} placeholder="Enter project Description" />
                                <Form.Control.Feedback type='invalid'>Required</Form.Control.Feedback>

                            </Col>
                        </Form.Group>
                        {
                            budgets.map((item, index) => {
                                return (
                                    <Row key={index} className="mt-2 mb-2">
                                        <Col sm={1} lg={1}>
                                            <Badge className="align-middle text-center" variant="primary">{index + 1}</Badge>
                                        </Col>
                                        <Col >

                                            <Form.Control

                                                isInvalid={!!errors["PocketName" + index]}
                                                name={"PocketName" + index} ref={register({ required: true })}
                                                onChange={(event) => {
                                                    let items = [...budgets];
                                                    let item = { ...items[index] };
                                                    item.pocketName = event.target.value;
                                                    items[index] = item;
                                                    setBudgets(items);
                                                    console.log(budgets);
                                                }}  size="sm" type="text" placeholder="Pocket Name" />
                                            <Form.Control.Feedback type='invalid'>Required</Form.Control.Feedback>
                                        </Col>
                                        <Col sm={2}>

                                            <Form.Check
                                                name={"PocketUseLimit" + index}
                                                ref={register}
                                                checked={budgets[index].useBudget}
                                                label="Use Limit"
                                                onChange={(evt) => onChangeLimit(evt, index)}
                                                id={"useLimitCheck" + index}
                                                feedbackTooltip
                                            />

                                        </Col>
                                        <Col>
                                            <InputGroup size="sm">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text

                                                        id={"inputGroupBudget" + index}>Rp</InputGroup.Text>
                                                </InputGroup.Prepend>

                                                <NumberFormat
                                                    ref={register}
                                                    onChange={(event) => {
                                                        let items = [...budgets];
                                                        let item = { ...items[index] };
                                                        item.pocketBudget = parseInt(event.target.value.replace(/\D/g, ''));
                                                        items[index] = item;
                                                        setBudgets(items);
                                                        console.log(budgets);
                                                    }}
                                                    //isInvalid={!!errors["PocketBudget"+index]}
                                                    name={"PocketBudget" + index}
                                                    // value ={budgets[index].pocketBudget}// == 0 ? '':budgets[index].pocketBudget}
                                                    //  value={budgets[index].useBudget? budgets[index].pocketBudget :'' }
                                                    thousandSeparator={true}
                                                    customInput={Form.Control} id={"limitBudget" + index}
                                                    disabled={!budgets[index].useBudget}
                                                    //  type="number"
                                                    //  size="sm"
                                                    //https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate 
                                                    allowNegative={false}
                                                    placeholder="Pocket Limit"
                                                />
                                                <Form.Control.Feedback type='invalid'>Required</Form.Control.Feedback>
                                            </InputGroup>
                                        </Col>
                                        <Col sm={1}>

                                            <Button size="sm" variant="danger" onClick={() => {
                                                console.log("remove " + index);
                                                const newList = budgets.filter((item, id) => id !== index);
                                                console.log(newList);
                                                setBudgets(newList);
                                            }}><Trash size={15} className="align-middle" /></Button>
                                        </Col>

                                    </Row>
                                );
                            })
                        }
                        <Row>
                            <Col></Col>
                            <Col className="text-center">
                                <Button className="align-middle" size="sm" variant="success" type="" onClick={() => {
                                    let newPocket: IProjectPocket = { pocketBudget: 0, pocketName: "", useBudget: false, };
                                    setBudgets([...budgets, newPocket])
                                }}>
                                    Add Pocket
  </Button></Col>
                            <Col></Col>
                        </Row>

                        <Button variant="primary" type="submit" className="m-2">
                            Submit
  </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
export default AddProjectPage;