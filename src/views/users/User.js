import React,{ useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { endpointURL } from '../../settings';
//import usersData from './UsersData'

const User = ({match}) => {
//  const user = usersData.find( user => user.id.toString() === match.params.id)
  const [user, setUser] = useState()
  const userDetails = user ? Object.entries(user) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

    useEffect(() => {
      //let isSubscribed = true
      console.log("useEffect");
      const urlFetch = fetch(endpointURL+'/user/'+match.params.id)
      urlFetch.then(res=>{
        if(res.status === 200){
          console.log("200 !")
          return res.json()
        }
      }).then(resJson=>{
        console.log(resJson)
       // setTotalPage(resJson.total_page)
      // if (isSubscribed){
        setUser(resJson)
     //  }
  
      })
   //  return () => isSubscribed = false
    //  currentPage !== page && setPage(currentPage)
    },[])

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    userDetails.map(([key, value], index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
