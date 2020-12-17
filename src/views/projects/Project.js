import React,{ useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { endpointURL } from '../../settings';
import { useSelector, useDispatch } from 'react-redux';
import { post,get } from '../../requester';

const Project = ({match}) => {
  const [project, setProject] = useState()
  const projectDetails = project ? Object.entries(project) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
    let dispatch = useDispatch();
    useEffect(() => {
      dispatch(
        get(endpointURL+'/project/'+match.params.id,
        res =>{
          setProject(res.data)
        })
      )
    },[])

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Project id: {match.params.id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    projectDetails.map(([key, value], index) => {
                    //  console.log(index + typeof(key))
                      if(( typeof(value) != "object"  )&&( typeof(value) != "array"  )) {   
                         return (
                          <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )}
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

export default Project
