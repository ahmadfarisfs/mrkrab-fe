import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
// import movies from "../../movies";
import axios from 'axios';
import { Button, Drawer, Badge,Tag } from 'antd';
import { useHistory, Route } from 'react-router-dom';
// import AddProjectPage from './addPayRecs';
import moment from 'moment';
import configData from "../../config.json";
import {
  UserAddOutlined,CloseOutlined,CheckCircleFilled,
  AccountBookOutlined,CheckOutlined,PlusCircleOutlined
} from '@ant-design/icons';
import { formatCurrency } from '../../tools/format'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import AddPayRecPage from './addpayrecs';
import ButtonGroup from 'antd/lib/button/button-group';
import { submitWithConfirm } from '../../tools/poster'

const MySwal = withReactContent(Swal)

const ListPayRec = () => {
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const history = useHistory();
  const onApprove =(id:any)=>{
      submitWithConfirm(null,"Approve ?","","/payrec/approve/"+id,"Approved",()=>{
        fetchPayRecs(1);
      },()=>{

      },"patch")
  };
  const onReject =(id:any)=>{
    submitWithConfirm(null,"Reject ?","","/payrec/reject/"+id,"Rejected",()=>{
        fetchPayRecs(1);
    },()=>{

    },"patch")

  };

  const handleSetStatus = (id: any, status: string) => {
    MySwal.fire(
      {
        title: 'Set Status Confirmation ?',
        text: "Are you sure you want to " + status + " this project ?",
        showCancelButton: true,
        icon: 'warning',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return axios.put(configData.baseURL + `/PayRecs`, {
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
          fetchPayRecs(currentPage,perPage);
        })
      }
    })

  };

  const columns = [
    {
      name: "ID",
      selector: "ID",
      sortable: false ,width:"5%",
      allowOverflow:true,
      wrap:false,
    },
    {
        name: "Project",
        selector: "Project",
        sortable: false,
        format: (row: any) => <>{row.Project?.Name }</>,

    },
    {
        name: null,
        selector: "Pocket",
        sortable: false,
        right:true,
        format: (row: any) => <>
        <Tag  color={row.Pocket?.Name ? "geekblue":"default"}>
          {row.Pocket?.Name?row.Pocket?.Name :"Non-Pocket"}
        </Tag>
        </>
    },
    
    {
      name: "Remarks",
      selector: "Remarks",
      sortable: false
    },   {
      name: "SoD",
      selector: "SoD",
      sortable: false
    },
    {
        name: "Type",
        // selector: "Remarks",
        sortable: false,
        cell:(row: any) => <>
            {row.Amount < 0 ? 
            
            <Tag color="warning">Payable</Tag> 
            :
            <Tag color="success">Receivable</Tag> 

             }
        </>
      },
    {
      name: "Amount",
      selector: "Amount",
      sortable: false,
      allowOverflow:true,
      right: true,
      format: (row: any) => <>
    
      {/* {row.Amount < 0 ? <CaretDownOutlined style={{ color: "red" }} /> 
      :
       <CaretUpOutlined style={{ color: "green" }} /> 
       } */}

       {formatCurrency(Math.abs(row.Amount))}
    
     

       </>
    },
    {
        name: "Transaction Ref",
        selector: "TransactionCode",
        sortable: false,
        // format: (row: any) => <>{row.Pocket?.Name }</>,

    },
    {
      name: "Created At (GMT+7)",
      selector: "CreatedAt",
      sortable: false,//'YYYY/MM/DD'
      format: (row: any) => <>{moment(row.CreatedAt).format('DD/MM/YYYY HH:mm')}</>,
    }, {
      name: 'Action',
      button: true,
      cell: (row: any) => <>
          { row.TransactionCode ? 
        //   <CheckCircleFilled style={{color:"green"}}
          <Badge text="Complete" color="green"
          />: <ButtonGroup>
          <Button
        //    onClick={() => handleDelete(row.ID)}
           size="small" type="primary" onClick={()=>{onApprove(row.ID)}} icon={<CheckOutlined />}> </Button>
         
          <Button
          onClick={()=>{onReject(row.ID)}}
        //    onClick={() => handleDelete(row.ID)}
           size="small"  icon={<CloseOutlined />}></Button>
         
          </ButtonGroup> }
      </>,
    },
  ];

  const fetchPayRecs = async (page: number, newPage?: number) => {
    setLoading(true);

    let perPageLocal = newPage ? newPage : perPage;
    let fromIndex = (perPageLocal * (page - 1));
    let toIndex = fromIndex + perPageLocal - 1;
    console.log("req " + fromIndex + " to " + toIndex);
    let response;
    try {
      response = await axios.get(
        configData.baseURL + `/payrec?range=[` + fromIndex + `,` + toIndex + `]`+`&sort=["transaction_code","asc"]`,
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
    fetchPayRecs(page);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    console.log("row change handler " + newPerPage);
    fetchPayRecs(page, newPerPage);
    setPerPage(newPerPage);
  };
  useEffect(() => {
    fetchPayRecs(1);
    console.log("PayRecs page loaded");
  }, [])
  return (
    <DataTable
      striped
      dense
      progressPending={loading}
      actions={<Button type="primary" onClick={() => {
        history.push('/payrec/add');
      }} icon={<PlusCircleOutlined/>}  >
         Create Payable or Receivable</Button>}
      title={<><AccountBookOutlined/> Payable & Receivable</>}
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

const PayRecPage = ({ match }: { match: any }) => {

  return (<>
    <Route exact path={match.url + "/add"} component={AddPayRecPage} />
    <Route exact path={match.url} component={
      ListPayRec

    } />



  </>
  )
};
export default PayRecPage;