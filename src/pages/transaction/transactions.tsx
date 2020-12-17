import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import movies from "../../movies";
import axios from 'axios';
import { PlusCircle, CashStack, Bricks, Cash } from 'react-bootstrap-icons';
import { Card, Button, Row, Col, Form, Container } from 'react-bootstrap';

const FilterComponent = () => {
    return (
        <Container fluid className="p-0">
            <Row>
                <Col ><Card style={{ width: '100%' }}>
                    <Card.Header>Summary</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>Total Debit</Col>
                            <Col>Total Credit</Col>
                            <Col>Total Transaction</Col>
                            
                        </Row>
                        
                    </Card.Body>
                </Card></Col>
                <Col lg={3}><Card style={{ width: '100%' }}>

                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
    </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card></Col>
            </Row>

        </Container>



    )
};

const TransactionPage = () => {
    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
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
    return (<>

        <DataTable
            subHeader
            actions={<Button  className="d-flex align-items-center"  >
                <PlusCircle className="m-1" /> Add Transaction</Button>}
            // subHeaderWrap={false}
            // subHeaderAlign="left"
            subHeaderComponent={[<FilterComponent />]}
            title="Transaction"
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


    </>
    )
};
export default TransactionPage;