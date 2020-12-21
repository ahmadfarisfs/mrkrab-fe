import React, { useEffect, useState ,PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
  } from 'recharts';
import DataTable from "react-data-table-component";
import movies from "../../movies";
import axios from 'axios';
import { PlusCircle, CashStack, Bricks, Cash } from 'react-bootstrap-icons';
import { Card, Row,Col, Form,Container,Button } from 'react-bootstrap';
import { stringify } from 'querystring';
import { useHistory, Route } from 'react-router-dom';

const DashboardPage = () => {
    
const datas = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
  ];
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
        <Card>
            <Card.Body>
                <Card.Title>Overview</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                <LineChart
        width={500}
        height={300}
        data={datas}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart></ResponsiveContainer>
            </Card.Body>
        </Card>
    )
};

export default DashboardPage;