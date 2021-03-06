import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import axios from 'axios';
//import { Card, Row, Col, Form, Container, Button } from 'react-bootstrap';
import { Button,Drawer } from 'antd';
import { useHistory, Route } from 'react-router-dom';
import AddUserPage from './addusers';
import configData from "../../config.json";
import moment from 'moment';
import {
    UserAddOutlined,
    DeleteOutlined,TeamOutlined
  } from '@ant-design/icons';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const ListUserPage = () => {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
      setVisible(true);
    };
    const onClose = () => {
      setVisible(false);
    };
    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const history = useHistory();
    const handleDelete =(id:any)=>{
        MySwal.fire(
            {
              title: 'Delete Confirmation ?',
              text: "Are you sure you want to delete this user ?",
              showCancelButton: true,
              icon: 'warning',
              showLoaderOnConfirm: true,
              preConfirm: () => {
                return axios.delete(configData.baseURL + `/users/`+id)
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
              Swal.fire('User Deleted!', '', 'success').then(()=>{
                history.go(0);
              })
            }
          })
        
    };
    const columns = [
        {
            name: "ID",
            selector: "ID",
            sortable: false,
            width:"5%",
            allowOverflow:true,
            wrap:false,
        },
        {
            name: "Name",
            selector: "Fullname",
            sortable: false
        },
        {
            name: "Username",
            selector: "Username",
            sortable: false
        },
        {
            name: "Email",
            selector: "Email",
            sortable: false,
            format: (row:any)=><>{row.Email}</>,
        },
        {
            name: "Role",
            selector: "Role",
            sortable: false,
           
        },
        {
            name: "Registered Since",
            selector: "CreatedAt",
            sortable: false,
            format: (row:any)=><>{row.CreatedAt? moment(row.CreatedAt).fromNow():null}</>,
           
        },
        {
          name: 'Action',
          button: true,
          cell: (row:any) => <Button value={row.ID} onClick={() => handleDelete(row.ID)}  danger size="small" icon={<DeleteOutlined />}></Button>,
        },
        
    ];
    const fetchUsers = async (page: number, newPage?:number) => {
        setLoading(true);

        let perPageLocal = newPage?newPage:perPage;
        let fromIndex = (perPageLocal * (page - 1));
        let toIndex = fromIndex + perPageLocal - 1;
        console.log("req " + fromIndex + " to " + toIndex);
        let response;
        try {
             response = await axios.get(
                configData.baseURL + `/users?range=[` + fromIndex + `,` + toIndex + `]`,
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
    const handlePageChange = (page: number) => {
        console.log("page change handler")
        fetchUsers(page);
    };

    const handlePerRowsChange = (newPerPage: number, page: number) => {
        console.log("row change handler " + newPerPage);
        fetchUsers(page,newPerPage);
        setPerPage(newPerPage);
    };
    useEffect(() => {
        fetchUsers(1);
        console.log("user page loaded");
    }, [])
    return (
        <>
        <DataTable
        dense
            // paginationRowsPerPageOptions={[2, 5, 10]}
            progressPending={loading}
            actions={<Button type="primary"
                icon={<UserAddOutlined />}
                onClick={() => {
                history.push('/user/add')
            }} className="d-flex align-items-center"  >
                 Add User</Button>}

title={ <><TeamOutlined /> User</>}            columns={columns}
            data={data}

            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
        />
        
        </>
    )
};

const UserPage = ({ match }: { match: any }) => {
    return (
        <>
        
            <Route exact path={match.url + "/add"} component={AddUserPage} />
            <Route exact path={match.url} component={
                ListUserPage

            } />
        </>
    );
}
export default UserPage;