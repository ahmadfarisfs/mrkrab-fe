import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
// import movies from "../../movies";
import axios from 'axios';
import { Button, Drawer, Badge,Switch } from 'antd';
import { useHistory, Route } from 'react-router-dom';
import AddProjectPage from './addprojects';
import moment from 'moment';
import configData from "../../config.json";
import {
  PlusCircleOutlined,
  DeleteOutlined,ProjectOutlined
} from '@ant-design/icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const ListProject = () => {
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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
          fetchProjects(currentPage,perPage);
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
         // history.go(0);
         fetchProjects(currentPage,perPage);
        })
      }
    })

  };
  const columns = [
    {
      name: "ID",
      selector: "ID",
      sortable: false,width:"5%",
      allowOverflow:true,
      wrap:false,
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
      button:true,
      cell: (row: any) => <>
        {//      row.IsOpen ?
        <Switch size="small" checkedChildren="Open" 
        onClick={() => {
          handleSetStatus(row.ID, row.IsOpen ? "close" : "open")
        }}
        unCheckedChildren="Closed" checked={row.IsOpen}  /> 
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
          <Button onClick={() => handleDelete(row.ID)} size="small" danger icon={<DeleteOutlined />}></Button>
     
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
    setCurrentPage(page);
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
      dense
      progressPending={loading}
      actions={<Button type="primary" onClick={() => {
        history.push('/project/add');
      }} icon={<PlusCircleOutlined />}  >
         Add Project</Button>}
      title={<><ProjectOutlined /> Project</>}
      columns={columns}
      data={data}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
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