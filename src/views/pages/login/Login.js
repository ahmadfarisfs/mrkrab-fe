import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { Link,useHistory } from 'react-router-dom'
import { login, loginSuccess } from  './slice';
import { post } from '../../../requester';
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { endpointURL } from '../../../settings';

const Login = () => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showWarningModal, setShowWarningModal] = useState(false);
  let dispatch = useDispatch();
  const isAuthorized = useSelector(state => state.auth.isAuthenticated);


//  useEffect(() => {
//  //  console.log("use Effect")
//  //  console.log(isAuthorized)
// if (isAuthorized){
//   history.push("/dashboard")
// }
//  },[isAuthorized])


  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
    handleSubmit(event)
      //  console.log('do validate')
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login(username,password,history));
/*   console.log(username);
    console.log(password);
    var loginPayload ={password:"",username:""};
    loginPayload.password = password;
    loginPayload.username = username;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
loginPayload
      ),
    };
    fetch(endpointURL+'/user/login',requestOptions)
    .then(res=>{
      if (res.status===200){
          console.log("YES")
          return res.json()
      }else{
        setShowWarningModal(true);
        return
      }
    }).then(data =>{
      console.log(data)
      if (data != null){
          //redirect
          localStorage.setItem("mrkrab-token", data.token)
          console.log("SUCCESS LOGIN")
          console.log(data)
          dispatch(loginSuccess(data))
          history.push("/dashboard");
      }
    })*/
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
      <CModal
        id="warn"
        show={showWarningModal}
        onClosed={() => {
          setShowWarningModal(false);
        }}
      >
        <CModalHeader closeButton>Failed !</CModalHeader>
        <CModalBody>Fail</CModalBody>
      </CModal>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput 
                      onKeyDown={handleKeyDown}
                      onChange={e=>setUsername(e.target.value)}
                      type="text"
                       placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput 
                        onKeyDown={handleKeyDown}
                       onChange={e=>setPassword(e.target.value)}
                      type="password" placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={handleSubmit} color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Contact System Administrator to create account</p>
                    
                      <CButton  color="primary" className="mt-3" active tabIndex={-1}>Contact Now</CButton>
                    
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
