import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { post,get } from '../../requester';
import {
  CBadge,
  CCard,
  CCardBody,
  CSpinner,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton
} from '@coreui/react'
import { endpointURL } from '../../settings';

import { createAsyncThunk } from '@reduxjs/toolkit';

const getBadge = status => {
  switch (status) {
    case 'sa': return 'success'
    case 'pic': return 'secondary'
    case 'member': return 'primary'
    //case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Users = () => {
  const itemPerpage = 5
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [usersData, setUsers] = useState()
  const [totalPage, setTotalPage] = useState()
  let dispatch = useDispatch();
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    dispatch(
      get(endpointURL+'/user',
      res =>{
        setTotalPage(res.data.total_page)
        setUsers(res.data.records)
        currentPage !== page && setPage(currentPage)
      })
    )
  }, [currentPage, page])

  return (
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
  )
}

export default Users
