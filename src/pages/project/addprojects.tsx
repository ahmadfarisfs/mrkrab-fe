import '../../App.css';
import React, { useEffect, useState } from 'react';
import { PlusCircle, CashStack, Bricks, Cash, Trash, PlusCircleFill } from 'react-bootstrap-icons';
import { Card, Row, Col, Form, Container, Button, Badge,InputGroup } from 'react-bootstrap';
import { BrowserRouter, withRouter } from "react-router-dom";
import { stringify } from 'querystring';
import NumberFormat from 'react-number-format';
export interface IProjectPocket {
    pocketName: string;
    pocketBudget: number;
    useBudget: boolean;
};


const AddProjectPage = () => {
    const [budgets, setBudgets] = useState<IProjectPocket[]>([]);
    const handleSubmit = () => {

    };
    const onChangeLimit = (event: any, index: any) => {
        console.log(event.target.checked);
        console.log(index);
        let items = [...budgets];
        let item = { ...items[index] };
        item.useBudget = event.target.checked;
       
        if (!event.target.checked){
             item.pocketBudget=0;
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
                                        <Col sm={1} lg={1}>
                                            <Badge className="align-middle text-center" variant="primary">{index + 1}</Badge>
                                        </Col>
                                        <Col >

                                            <Form.Control onChange={(event) => {
                                                let items = [...budgets];
                                                let item = { ...items[index] };
                                                item.pocketName = event.target.value;
                                                items[index] = item;
                                                setBudgets(items);

                                                console.log(budgets);
                                            }} value={budgets[index].pocketName} size="sm" type="text" placeholder="Pocket Name" />

                                        </Col>
                                        <Col sm={2}>

                                            <Form.Check
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
              <InputGroup.Text id={"inputGroupBudget"+index}>Rp</InputGroup.Text>
            </InputGroup.Prepend>

            <NumberFormat 
          //  value={budgets[index].useBudget? budgets[index].pocketBudget :'' }
            thousandSeparator={true} customInput={Form.Control} id={"limitBudget" + index}
            disabled={!budgets[index].useBudget}
          //  type="number"
          //  size="sm" 

            placeholder="Pocket Limit"
            />
                                           
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