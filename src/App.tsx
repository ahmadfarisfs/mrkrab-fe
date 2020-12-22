import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import { PersonLinesFill, CashStack, Bricks, Cash, HandThumbsDown, ArrowRepeat, MenuApp } from 'react-bootstrap-icons';
import logo from './assets/icon.png';

import UserPage from "./pages/user/users";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import DataTable from "react-data-table-component";
import ProjectPage from './pages/project/projects';
import TransactionPage from './pages/transaction/transactions';
import { Card } from 'react-bootstrap';
import DashboardPage from './pages/dashboard/dashboard';

const App = () => (
  <>
    <Router>
      <div>
        <Navbar variant="dark" className="bg-dark justify-content-between p-3">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="20"
              height="20"

            />{' '}
      Mr. Krab
    </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid>
          <Row>
            <Col md={3} className="p-3">
              <ListGroup  >
                <ListGroup.Item action as={NavLink} exact to="/">
                  <MenuApp className="m-1" />Dashboard
                </ListGroup.Item>

                <ListGroup.Item action to="/user" as={NavLink}>
                  <PersonLinesFill className="m-1" />User
                </ListGroup.Item>
                <ListGroup.Item action to="/project" as={NavLink}>
                  <Bricks className="m-1" />Project</ListGroup.Item>
                <ListGroup.Item action as={NavLink} to="/transaction">
                  <CashStack className="m-1" />Transaction</ListGroup.Item>
                <ListGroup.Item action to="/transfer" as={NavLink}>
                  <ArrowRepeat className="m-1" />Transfer</ListGroup.Item>

                <ListGroup.Item action as={NavLink} to="/loan" >
                  <HandThumbsDown className="m-1" />Loan</ListGroup.Item>

              </ListGroup>
            </Col>
            <Col className="p-3"><Switch>

              <Route exact path="/" component={DashboardPage}>

              </Route>
              <Route path="/user" component={UserPage}>

              </Route>
              <Route path="/project" component={ProjectPage}>
              </Route>
              <Route path="/transaction">

                <TransactionPage />

              </Route>
            </Switch></Col>
          </Row>
        </Container>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

      </div>
    </Router>



  </>
);
export default App;
