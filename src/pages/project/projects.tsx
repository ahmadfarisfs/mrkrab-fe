import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import movies from "../../movies";
import axios from 'axios';
import { useHistory, Route } from 'react-router-dom';
import { PlusCircle, CashStack, Bricks, Cash } from 'react-bootstrap-icons';
import { Card, Row, Col, Form, Container, Button } from 'react-bootstrap';
import AddProjectPage from './addprojects';

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
            name: "No",
            selector: "id",
            sortable: false
        },
        {
            name: "Name",
            selector: "name",
            sortable: false
        },
        {
            name: "Role",
            selector: "role",
            sortable: false,
            right: false
        }
    ];
    const fakeData = [
        {
            id: 100,
            name: "Ahmad",
            role: "admin",
        }, {
            id: 110,
            name: "Junaedi",
            role: "owner",
        },
    ];
    const fetchUsers = async (page: number) => {
        setLoading(true);
        const response = await axios.get(
            `https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`,
        );
        setData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = (page: number, totalRows: number) => {
        console.log("page change handler")
        fetchUsers(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        console.log("row change handler")
        setLoading(true);

        fetchUsers(page);

        //setData(response.data.data);
        setPerPage(newPerPage);
        setLoading(false);
    };
    useEffect(() => {
        setData(fakeData);
        console.log("user page loaded");
    }, [])
    return (
        <DataTable
            actions={<Button onClick={() => {
                history.push('/project/add')
            }} className="d-flex align-items-center"  >
                <PlusCircle className="m-1" /> Add Project</Button>}
            // subHeader
            // subHeaderWrap={false}
            // subHeaderAlign="left"
            //   subHeaderComponent={[<FilterComponent/>]}
            title="Projct"
            columns={columns}
            data={fakeData}
            //  progressPending={loading}
            pagination
        //    paginationServer
        //   paginationTotalRows={totalRows}
        //    selectableRows
        //  onChangeRowsPerPage={handlePerRowsChange}
        //  onChangePage={handlePageChange}
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