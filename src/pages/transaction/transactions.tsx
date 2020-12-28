import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
//import movies from "../../movies";
import { useHistory, Route } from 'react-router-dom';
import AddTransactionPage from './addtransaction';
import axios from 'axios';
import moment from 'moment';
import configData from "../../config.json";
import { formatCurrency } from '../../tools/format'

import {
  UserAddOutlined, CaretUpOutlined, CaretDownOutlined,
  DeleteOutlined, CheckOutlined, CloseOutlined
} from '@ant-design/icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'antd/dist/antd.css';
import { Button, Drawer, Badge, Switch, Card, Form, Space, Input, Col, Row, Radio, DatePicker } from 'antd';
import ProjectSelector from '../../tools/project';
import { useForm } from 'antd/lib/form/Form';
import _ from 'lodash';
const MySwal = withReactContent(Swal)


const ListTransaction = () => {
  moment.locale("id");
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [useRange, setUseRange] = useState(false);
const [filter, setFilter]= useState({})
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const [form] = useForm();
  const history = useHistory();
  const columns = [
    {
      name: "ID",
      selector: "ID",
      sortable: false,
      grow: 0,
    },
    {
      name: "Project",
      selector: "ProjectName",
      sortable: false
    },
    {
      name: "Pocket",
      selector: "PocketName",
      sortable: false,
    },
    {
      name: "Remarks",
      selector: "Remarks",
      sortable: false,
    }
    ,
    {
      name: "Amount",
      selector: "Amount",
      sortable: false,
      format: (row: any) => <>{row.Amount < 0 ? <CaretDownOutlined style={{ color: "red" }} /> : <CaretUpOutlined style={{ color: "green" }} />}{formatCurrency(row.Amount)}</>,
    },
    {
      name: "Created At (GMT+7)",
      selector: "CreatedAt",
      sortable: false,//'YYYY/MM/DD'
      format: (row: any) => <>{moment(row.CreatedAt).format('DD/MM/YYYY HH:mm')}</>,
    }
  ];
//  let filterData:any = {};
  const fetchTransaction = async (page: number, newPage?: number) => {
    setLoading(true);

    let perPageLocal = newPage ? newPage : perPage;
    let fromIndex = (perPageLocal * (page - 1));
    let toIndex = fromIndex + perPageLocal - 1;
    console.log("req " + fromIndex + " to " + toIndex);
    let response;
    let strFilter = JSON.stringify(filter);
  //  + !_.isEmpty(filter ) ?`&filter=`+strFilter:""
    console.log(strFilter);
    console.log(_.isEmpty(filter ));
    try {
      let urls = configData.baseURL + `/transactions?range=[` + fromIndex + `,` + toIndex + `]`
      if (!_.isEmpty(filter )){
        urls +=`&filter=`+strFilter
      }
      console.log(urls)
      response = await axios.get(
        urls
        // configData.baseURL + `/transactions?range=[` + fromIndex + `,` + toIndex + `]` //+ !_.isEmpty(filter ) ?`&filter=`+strFilter:""
        // filter &&`&filter=`+strFilter,
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
    fetchTransaction(page);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    console.log("row change handler")
    // setLoading(true);

    fetchTransaction(page);

    setPerPage(newPerPage);
    // setLoading(false);
  };
  useEffect(() => {
    // setData(fakeData);
    fetchTransaction(1);
    console.log("trx page loaded");
  }, [filter])
  const { RangePicker } = DatePicker;
  const formItemLayout =
  {
    labelCol: { xl: 6, sm: 3 },
    wrapperCol: { xl: 18, sm: 21 },
  }
    ;
  const onFilter = (data: any) => {
    //let rangeQuery = [];
    let filterData:any={};
    console.log(data);
    if (data.DateRange){
      console.log(data.DateRange[0].startOf('day').format())
      console.log(data.DateRange[1].endOf('day').format())
      filterData.start_date = data.DateRange[0].startOf('day').format();
      filterData.end_date = data.DateRange[1].endOf('day').format();
    } 
   if (data.Project){
    filterData.projectIDs=[data.Project]
   }
   
    if (data.Pocket){
      filterData.pocketIDs=[data.Pocket]
    }
filterData.type =     data.Type;

console.log(filterData);

setFilter(filterData);

//console.log(JSON.stringify(filterData));

    // data.DateRange?.forEach((el:any)=>{
      

    //   //console.log(el.startOf('day').format())
    // })

  };
  return (<>

    <DataTable
      dense
      striped
      subHeader
      subHeaderComponent={
        // <Card style={{ width: "100%" }} >
        <Form style={{ width: "100%" }} size="small" form={form}
          {...formItemLayout}
          onFinish={onFilter}
        >
          <Row>

            <Col xl={12} sm={24}>           
             <ProjectSelector projectOptional={true} forms={form} />
            </Col>
            <Col xl={12} sm={24}>

              <Form.Item initialValue="all" name="Type" label="Type" rules={[{ required: true }]}>


                <Radio.Group defaultValue="all" >
                  <Radio value="all">All</Radio>

                  <Radio value="expense">Expense</Radio>
                  <Radio value="income">Income</Radio>
                </Radio.Group>
              </Form.Item>

              
                <Form.Item  style={{ marginBottom: 0 }}
                    label="Use Range" >
                     <Form.Item initialValue={false} style={{ display: 'inline-block', float:"left"}} name="UseDateRange" >
                 
                  <Switch  checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />} onClick={(state) => {
                      setUseRange(state)
                    }} />
                   </Form.Item>

                    <Form.Item rules={[{ required: useRange }]} style={{ display: 'inline-block', float:"right", width: '80%'}} name="DateRange" >
                        <RangePicker format='DD/MM/YYYY' disabled={!useRange} />
                    </Form.Item>

                </Form.Item>

                


              <Form.Item style={{ float: "right" }}  >
                <Space>
                  <Button type="primary" htmlType="submit">
                    Apply Filter
        </Button>
                  <Button htmlType="button" onClick={() => {
                    form.resetFields();
                  }} >
                    Reset
        </Button>
                </Space>


              </Form.Item>
            </Col>

          </Row>

        </Form>
        // </Card>
      }
      progressPending={loading}
      actions={
      
      <Space>
      <Button onClick={() => {
        history.push('/transaction/add');
      }} icon={<UserAddOutlined />}  >
        Create Transaction</Button>
        <Button onClick={() => {
        history.push('/transaction/add_transfer');
      }} icon={<UserAddOutlined />}  >
        Create Transfer</Button>
        
        </Space>
      }

      title="Transactions"
      columns={columns}
      data={data}

      pagination
      paginationServer
      paginationTotalRows={totalRows}
      //    selectableRows
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
    />


  </>
  )
};
const TransactionPage = ({ match }: { match: any }) => {

  return (<>
    <Route exact path={match.url + "/add"} component={AddTransactionPage} />
    <Route exact path={match.url} component={
      ListTransaction

    } />  </>)
};

export default TransactionPage;