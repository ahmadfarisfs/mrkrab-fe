import '../../App.css';
import React, { useEffect, useState } from 'react';
import { PlusCircle, CashStack, Bricks, Cash, Trash, PlusCircleFill } from 'react-bootstrap-icons';
import { Card, Row, Col, Form, Container, Button, Badge } from 'react-bootstrap';
import { BrowserRouter, withRouter } from "react-router-dom";
import { stringify } from 'querystring';
export interface IProjectPocket {
    pocketName: string;
    pocketBudget: number;
};


const AddProjectPage = () => {
    const [budgets, setBudgets] = useState<IProjectPocket[]>([]);
    return (
        <>
            <Card>
            
                <Card.Body>
                    <Card.Title>Add New Project </Card.Title>
                    <Form className="mt-4">
                        <Form.Group as={Row} controlId="formBasicEmail">
                            <Form.Label column lg={2} >Project Name</Form.Label>
                            <Col sm={10}>
                            <Form.Control type="text" placeholder="Enter project name" />
                            <Form.Text className="text-muted">
      Make sure it's unique
    </Form.Text></Col>
                        </Form.Group>
                        {
                            budgets.map((item, index) => {
                                return (
                                    <Row key={index} className="mt-2 mb-2">
                                        <Col   sm={1} lg={1}>
                                            <Badge className="align-middle text-center"  variant="primary">{index + 1}</Badge>
                                           </Col>
                                        <Col >
                                            
                                                <Form.Control  onChange={(event)=>{
                                                    const newList = budgets;
                                                    newList[index].pocketName=event.target.value;
                                                    setBudgets(newList);
                                                    console.log(budgets);
                                                }} size="sm" type="text" placeholder="Pocket Name" />
                                            
                                        </Col>
                                        <Col sm={2}>
                                           
                                                <Form.Check
                                                
                                                    //  required
//                                                    name="limit"
                                                    label="Use Limit"
                                                    //  onChange=
                                                    //  isInvalid={}
                                                    // feedback={errors.terms}
                                                    //onClick={}
                                                    id="validationFormik106"
                                                    feedbackTooltip
                                                />
                                        
                                        </Col>
                                        <Col>
                                            
                                                <Form.Control size="sm" type="number" placeholder="Pocket Limit" />
                                            
                                        </Col>
                                        <Col sm={1}>
                                            
                                              <Button size="sm" variant="danger" onClick={()=>{
                                                  console.log("remove "+index);
                                                   const newList = budgets.filter((item,id) => id !== index);
                                                    console.log(newList);
                                                   setBudgets(newList);
                                              }}><Trash size={15} className="align-middle"/></Button>
                                        </Col>
                                        
                                    </Row>
                                );
                            })
                        }
                        <Row>
                            <Col></Col>
                            <Col className="text-center">
<Button  className="align-middle"  size="sm" variant="success" type="" onClick={() => {
                            let newPocket: IProjectPocket = { pocketBudget: 0, pocketName: "" };
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