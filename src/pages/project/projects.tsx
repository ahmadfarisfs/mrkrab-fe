import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import movies from "../../movies";
import axios from 'axios';
import { useHistory, Route } from 'react-router-dom';
import { PlusCircle, CashStack, Bricks, Cash } from 'react-bootstrap-icons';
import { Card, Row, Col, Form, Container, Button } from 'react-bootstrap';
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
            name: "Created Since",
            selector: "CreatedAt",
            sortable: false,
            format: (row:any)=><>{row.CreatedAt? moment(row.CreatedAt).fromNow():null}</>,
           
        }
    ];

    const fetchProjects = async (page: number, newPage?:number) => {
        setLoading(true);

        let perPageLocal = newPage?newPage:perPage;
        let fromIndex = (perPageLocal * (page - 1));
        let toIndex = fromIndex + perPageLocal - 1;
        console.log("req " + fromIndex + " to " + toIndex);
        let response;
        try {
             response = await axios.get(
                configData.baseURL + `/projects?range=[` + fromIndex + `,` + toIndex + `]`,
            );
            if (response.status!=200){
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
                    title:'Error',
                    icon:'error',
                    text: error,
                }
            )
        } finally{
            setLoading(false); 
        }
        
        
    };

    const handlePageChange = (page: number, totalRows: number) => {
        console.log("page change handler")
        fetchProjects(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        console.log("row change handler " + newPerPage);
        fetchProjects(page,newPerPage);
        setPerPage(newPerPage);
    };
    useEffect(() => {
        fetchProjects(1);
        console.log("Projects page loaded");
    }, [])
    return (
        <DataTable
            paginationRowsPerPageOptions={[2, 5, 10]}
            progressPending={loading}
            actions={<Button onClick={() => {
                history.push('/project/add')
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