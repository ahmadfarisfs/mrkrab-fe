import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton
} from '@coreui/react'

//import usersData from './UsersData'

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

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    console.log("useEffect");
    const urlFetch = fetch('http://localhost:9090/user')
    urlFetch.then(res=>{
      if(res.status === 200){
        console.log("200 !")
        return res.json()
      }
    }).then(resJson=>{
      console.log(resJson)
      setTotalPage(resJson.total_page)
      setUsers(resJson.records)
    })
    currentPage !== page && setPage(currentPage)
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
