import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { post, get } from "../../requester";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CPagination,
  CCallout,
} from "@coreui/react";
import Moment from "react-moment";
import { endpointURL } from "../../settings";
import CIcon from "@coreui/icons-react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { cifAU } from '@coreui/icons';
const getBadge = (status) => {
  switch (status) {
    case "sa":
      return "success";
    case "pic":
      return "secondary";
    case "member":
      return "primary";
    //case 'Banned': return 'danger'
    default:
      return "primary";
  }
};

const Users = () => {
  const itemPerpage = 5;

  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [usersData, setUsers] = useState([
    {
      photo: "",
      lastname: "",
      firstname: "",
      role: "",
      email: "",
      created_at: "",
    },
  ]);
  const [totalPage, setTotalPage] = useState();

  //  const userDetails = usersData ? Object.entries(usersData) :
  let dispatch = useDispatch();
  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };
  const onRowClick = (e) => {
    console.log(e);
  };
  useEffect(() => {
    dispatch(
      get(endpointURL + "/user", (res) => {
        setTotalPage(res.data.total_page);
        setUsers(res.data.records);
        currentPage !== page && setPage(currentPage);
      })
    );
  }, [currentPage, page]);

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title">
                Users
              </h4>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
            
              <CButton to="/users/add" color="primary" className="float-right">
              <div className="align-middle"><strong  >Add User</strong></div>
              </CButton>
             
            </CCol>
          </CRow>
          <br />
        
          <br />

          <table className="table table-hover table-outline mb-0 d-none d-sm-table">
            <thead className="thead-light">
              <tr key="header">
              <th key="username" className="text-right">
                  Username
                </th>
                
                <th key="photo" className="text-center">
                  <CIcon name="cil-contact" />
                </th>
                
                <th key="contact" className="text-left">
                  Contact Details
                </th>
                <th key="bday" className="text-center">
                <CIcon name="cil-birthday-cake" />
                </th>
                <th key="role" className="text-center">
                  Role
                </th>
                <th key="reg" className="text-center">
                  Registered
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((value,i) => {
                return <tr key={i}>
                    
                    <td  className="text-right" >{value.username}</td>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={value.photo} className="c-avatar-img" />
                      </div>
                    </td>
                    <td>
                      <div>
                        <strong>
                          {value.firstname + " " + value.lastname}
                        </strong>
                      </div>
                      <div className="small text-muted">
                        <span> <a href={"mailto:"+value.email}></a> {value.email}</span> | {value.phone}
                      </div>
                    </td>
                    <td className="text-center">
                    <Moment format="MMMM Do YYYY">
                          {value.birthday}
                        </Moment>
                    </td>
                    <td>
                      <div  className="text-center">
                        
                        <CBadge color={getBadge(value.role)}>
                      {value.role.toUpperCase()}
                    </CBadge>
                        </div>
                    </td>
                    <td>
                      <div  className="text-center">
                        <Moment format="MMMM Do YYYY">
                          {value.created_at}
                        </Moment>
                      </div>
                    </td>
                  </tr>;
              
              })}
            </tbody>
          </table>
<br/>
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={totalPage}
            doubleArrows={true} 
            align="center"
          />
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </>
  );

  /* return (
    <CRow>
      <CCol>
        <CCard>
       
          <CCardBody>
            <CRow>
              <CCol>          <CButton className="m-2" variant="outline"  color="primary"  size="sm" to="/users/add"  >
                  Add User
                </CButton>
</CCol>
            </CRow>

          <CDataTable
            items={usersData}
            fields={[
              { key: 'id', _classes: 'font-weight-bold' },
              'firstname','lastname','phone','email', 'role'
            ]}
            hover
            striped={true}
            itemsPerPage={itemPerpage}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/users/${item.id}`)}
           // noItemsView = {<CSpinner color="info" />}
            noItemsViewSlot = {
              <div className="d-flex justify-content-center">
            <CSpinner
            
            color="info" /></div>
          }
            scopedSlots = {{
              'role':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.role)}>
                      {item.role.toUpperCase()}
                    </CBadge>
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={totalPage}
            doubleArrows={true} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )*/
};

export default Users;
