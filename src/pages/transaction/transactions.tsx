import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
//import movies from "../../movies";
import { useHistory, Route } from 'react-router-dom';
import AddTransactionPage from './addtransaction';
import axios from 'axios';
import moment from 'moment';
import configData from "../../config.json";
import {
  UserAddOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'antd/dist/antd.css';
import { Button, Drawer, Badge,Switch } from 'antd';
const MySwal = withReactContent(Swal)
//import { PlusCircle, CashStack, Bricks, Cash } from 'react-bootstrap-icons';
//import { Card, Button, Row, Col, Form, Container } from 'react-bootstrap';

// const FilterComponent = () => {
//     return (
//         <Container fluid className="p-0">
//             <Row>
//                 <Col ><Card style={{ width: '100%' }}>
//                     <Card.Header>Summary</Card.Header>
//                     <Card.Body>
//                         <Row>
//                             <Col>Total Debit</Col>
//                             <Col>Total Credit</Col>
//                             <Col>Total Transaction</Col>
                            
//                         </Row>
                        
//                     </Card.Body>
//                 </Card></Col>
//                 <Col lg={3}><Card style={{ width: '100%' }}>

//                     <Card.Body>
//                         <Card.Title>Card Title</Card.Title>
//                         <Card.Text>
//                             Some quick example text to build on the card title and make up the bulk of
//                             the card's content.
//     </Card.Text>
//                         <Button variant="primary">Go somewhere</Button>
//                     </Card.Body>
//                 </Card></Col>
//             </Row>

//         </Container>



//     )
// };

const ListTransaction = () => {
    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
  
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
   
    const fetchTransaction = async (page: number, newPage?: number) => {
        setLoading(true);
    
        let perPageLocal = newPage ? newPage : perPage;
        let fromIndex = (perPageLocal * (page - 1));
        let toIndex = fromIndex + perPageLocal - 1;
        console.log("req " + fromIndex + " to " + toIndex);
        let response;
        try {
          response = await axios.get(
            configData.baseURL + `/transactions?range=[` + fromIndex + `,` + toIndex + `]`,
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
        fetchTransaction(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        console.log("row change handler")
        setLoading(true);

        fetchTransaction(page);

        setPerPage(newPerPage);
        setLoading(false);
    };
    useEffect(() => {
        // setData(fakeData);
        fetchTransaction(1);
        console.log("trx page loaded");
    }, [])

    return (<>

        <DataTable
        striped
         progressPending={loading}
         actions={<Button onClick={() => {
           history.push('/transaction/add');
         }} icon={<UserAddOutlined/>}  >
            Add Transaction</Button>}
   
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
const TransactionPage = ({ match }: { match: any }) =>{

return(<>
    <Route exact path={match.url + "/add"} component={AddTransactionPage} />
    <Route exact path={match.url} component={
      ListTransaction

    } />  </>)
};

export default TransactionPage;