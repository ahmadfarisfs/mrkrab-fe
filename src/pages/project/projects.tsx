import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import movies from "../../movies";
import axios from 'axios';
import { useHistory, Route } from 'react-router-dom';
import { PlusCircle, CashStack, Bricks, Cash, TrashFill } from 'react-bootstrap-icons';
import { Card, Row, Col, Form, Container, Button, ButtonGroup, Badge,CardGroup } from 'react-bootstrap';
import AddProjectPage from './addprojects';
import moment from 'moment';
import configData from "../../config.json";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const FilterComponent = () => {
  return (

    <Form>
      <Form.Group controlId="exampleForm.SelectCustomSizeSm">
        <Form.Label>Status: </Form.Label>
        <Form.Control as="select" size="sm" custom>
          <option>All</option>
          <option>Open</option>
          <option>Close</option>
        </Form.Control>
      </Form.Group>



    </Form>





  )
};

const ListProject = () => {
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const history = useHistory();
  const handleSetStatus = (id: any, status: string) => {
    MySwal.fire(
      {
        title: 'Set Status Confirmation ?',
        text: "Are you sure you want to " + status + " this project ?",
        showCancelButton: true,
        icon: 'warning',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return axios.put(configData.baseURL + `/projects`, {
            "Status": status,
            "ProjectID": id,
          })
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
                `Set Status Failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }
    ).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Status Set!', '', 'success').then(() => {
          history.go(0);
        })
      }
    })

  };
  const handleDelete = (id: any) => {
    MySwal.fire(
      {
        title: 'Delete Confirmation ?',
        text: "Are you sure you want to delete this project ?",
        showCancelButton: true,
        icon: 'warning',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return axios.delete(configData.baseURL + `/projects/` + id)
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
                `Delete Failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }
    ).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Project Deleted!', '', 'success').then(() => {
          history.go(0);
        })
      }
    })

  };
  const columns = [
    {
      name: "ID",
      selector: "ID",
      sortable: false
    },
    {
      name: "Name",
      selector: "Name",
      sortable: false
    },
    {
      name: "Description",
      selector: "Description",
      sortable: false
    },
    {
      name: "Status",
      selector: "IsOpen",
      sortable: false,
      cell: (row: any) => <>
        {      row.IsOpen ? <Badge variant="success">Open</Badge> :
          <Badge variant="warning">Closed</Badge>
        }


      </>
    },

    {
      name: "Created Since",
      selector: "CreatedAt",
      sortable: false,
      format: (row: any) => <>{row.CreatedAt ? moment(row.CreatedAt).fromNow() : null}</>,

    }, {
      name: 'Action',
      button: true,
      cell: (row: any) => <>
        <ButtonGroup size="sm" aria-label="Project Action">
          <Button
            onClick={() => {
              handleSetStatus(row.ID, row.IsOpen ? "close" : "open")
            }}
            variant={row.IsOpen ? "outline-warning" : "outline-success"}>{row.IsOpen ? "Close" :
              "Open"}</Button>
          <Button onClick={() => handleDelete(row.ID)} variant="outline-danger"><TrashFill /></Button>
        </ButtonGroup>

      </>,
    },
  ];

  const fetchProjects = async (page: number, newPage?: number) => {
    setLoading(true);

    let perPageLocal = newPage ? newPage : perPage;
    let fromIndex = (perPageLocal * (page - 1));
    let toIndex = fromIndex + perPageLocal - 1;
    console.log("req " + fromIndex + " to " + toIndex);
    let response;
    try {
      response = await axios.get(
        configData.baseURL + `/projects?range=[` + fromIndex + `,` + toIndex + `]`,
      );
      if (response.status != 200) {
        throw new Error('Unexpected response code');
      }
      console.log(response);
      setData(response.data);
      var totalData = parseInt(response.headers["content-range"].split("/")[1]);
      console.log("total data " + totalData);
      setTotalRows(totalData);

    } catch (error) {
      console.log(error);
      setData([]);
      MySwal.fire(
        {
          title: 'Error',
          icon: 'error',
          text: error,
        }
      )
    } finally {
      setLoading(false);
    }


  };

  const handlePageChange = (page: number, totalRows: number) => {
    console.log("page change handler")
    fetchProjects(page);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    console.log("row change handler " + newPerPage);
    fetchProjects(page, newPerPage);
    setPerPage(newPerPage);
  };
  useEffect(() => {
    fetchProjects(1);
    console.log("Projects page loaded");
  }, [])
  return (
    <DataTable
    striped
    expandableRows
    expandableRowsComponent={<ExpandedProject/>}
    expandOnRowClicked
      paginationRowsPerPageOptions={[2, 5, 10]}
      progressPending={loading}
      actions={<Button onClick={() => {
        history.push('/project/add');
      }} className="d-flex align-items-center"  >
        <PlusCircle className="m-1" /> Add Project</Button>}

      title="Projects"
      columns={columns}
      data={data}

      pagination
      paginationServer
      paginationTotalRows={totalRows}
      //    selectableRows
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
    />
  );
};

const ExpandedProject = ()=>{
  return (<>
<CardGroup className="mb-3 mt-1" >
  <Card bg="secondary" text="white" >
    
    <Card.Body>
      <Card.Title  className="text-center">Rp 10,000,000</Card.Title>
      <Card.Text  className="text-center">
Total Expense
      </Card.Text>
    </Card.Body>
    <Card.Footer color="white">
      <small className="text-muted">From 100 transactions</small>
    </Card.Footer>
  </Card>
  <Card>
    
    <Card.Body>
      <Card.Title>Rp 200,000,000</Card.Title>
      <Card.Text>
        Total Income
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">From 4 transactions</small>
    </Card.Footer>
  </Card>
  <Card>
    
    <Card.Body>
      <Card.Title>Rp 20,000,000</Card.Title>
      <Card.Text>
        Account Payable
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">From 24 transactions</small>
    </Card.Footer>
  </Card>
  <Card>
    
    <Card.Body>
      <Card.Title>Rp 20,000,000</Card.Title>
      <Card.Text>
        Account Receivable
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">From 24 transactions</small>
    </Card.Footer>
  </Card>
</CardGroup>
  
  </>)
};

const ProjectPage = ({ match }: { match: any }) => {

  return (<>
    <Route exact path={match.url + "/add"} component={AddProjectPage} />
    <Route exact path={match.url} component={
      ListProject

    } />



  </>
  )
};
export default ProjectPage;