import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import movies from "../../movies";
import axios from 'axios';
import { PlusCircle, CashStack, Bricks, Cash } from 'react-bootstrap-icons';
import { Card, Row,Col, Form,Container,Button } from 'react-bootstrap';
import { stringify } from 'querystring';
import { useHistory, Route } from 'react-router-dom';
import AddUserPage from './addusers';

const ListUserPage = () => {
    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const history = useHistory();
    const columns = [
        {
            name: "ID",
            selector: "id",
            sortable: false
        },
        {
            name: "Name",
            selector: "name",
            sortable: false
        },
        {
            name: "Username",
            selector:"username",
            sortable:false
        },
        {
            name: "Role",
            selector: "role",
            sortable: false,
            right: false
        }
    ];
    const fakeData=[
        {
            id:100,
            name: "Ahmad",
            role:"admin",
        },{
            id:110,
            name: "Junaedi",
            role:"owner",
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

    const handlePageChange = (page: number, totalRows:number) => {
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
        actions={<Button  onClick={() => {
            history.push('/user/add')
        }} className="d-flex align-items-center"  >
        <PlusCircle className="m-1" /> Add User</Button>}
     
            title="Users"
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
    )
};
const UserPage =({ match }: { match: any })=>{
    return(
        <>
        <Route exact path={match.url + "/add"} component={AddUserPage} />
        <Route exact path={match.url} component={
            ListUserPage

        } />
        </>
    );
}
export default UserPage;