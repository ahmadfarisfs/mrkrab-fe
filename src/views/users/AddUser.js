import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CLabel,
  CSelect,
  CRow,
} from "@coreui/react";

import { endpointURL } from '../../settings';

import CIcon from "@coreui/icons-react";
const initialFormData = Object.freeze({
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  passwordre: "",
  role:"sa"
});

const AddUser = () => {
  const history = useHistory();
  const [formData, updateFormData] = useState(initialFormData);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [modalPayload, setModalPayload] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
if (formData.password !== formData.passwordre){
  setModalPayload("Please Enter Matching Password");
  setShowWarningModal(true);
  return
}
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    fetch(endpointURL+"/user", requestOptions)
      .then((res) => {
        if (res.status === 201) {
          console.log("201");
          setShowSuccessModal(true);
          return;
        } else {
          setShowWarningModal(true);
          console.log("Not Created");
          return res.json();
        }
      })
      .then((data) => {
        if (data !== null) {
          setModalPayload(JSON.stringify(data));
        }
      });
  };

  useEffect(() => {
    console.log("useEffect");
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };
  return (
    <CRow>
      <CModal
        id="warn"
        show={showWarningModal}
        onClosed={() => {
          setShowWarningModal(false);
        }}
      >
        <CModalHeader closeButton>Failed !</CModalHeader>
        <CModalBody>{modalPayload}</CModalBody>
      </CModal>
      <CModal
        show={showSuccessModal}
        id="sukes"
        onClosed={() => {
          setShowSuccessModal(false);
          history.push("/users");
        }}
      >
        <CModalHeader closeButton>Success !</CModalHeader>
        <CModalBody></CModalBody>
      </CModal>
      <CCol xl={5}>
        <CCard>
          <CCardBody>
            <CForm
              action=""
              method="post"
              encType="multipart/form-data"
              className="form-horizontal"
            >
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Firstname</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    onChange={handleChange}
                    id="text-input"
                    name="firstname"
                    placeholder="Enter Firstname"
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Lastname</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    onChange={handleChange}
                    id="text-input"
                    name="lastname"
                    placeholder="Enter Lastname"
                  />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Username</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    onChange={handleChange}
                    id="text-input"
                    name="username"
                    placeholder="Enter Username"
                  />
                  <CFormText>should contain at least 6 character</CFormText>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="email-input">Email Input</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    onChange={handleChange}
                    type="email"
                    id="email-input"
                    name="email"
                    placeholder="Enter Email"
                    autoComplete="email"
                  />
                  <CFormText className="help-block">
                    Please enter your email
                  </CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="phone-input">Phone Number</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    onChange={handleChange}
                    type="phone"
                    id="phone-input"
                    name="phone"
                    placeholder="Enter Phone"
                    autoComplete="phone"
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="password-input">Password</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    onChange={handleChange}
                    type="password"
                    id="password-input"
                    name="password"
                    placeholder="Password"
                    autoComplete="new-password"
                  />
                  <CFormText className="help-block">
                    Please enter a complex password
                  </CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="password-input-re">Re-enter Password</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    onChange={handleChange}
                    type="password"
                    id="password-input-re"
                    name="passwordre"
                    placeholder="Re-enter Password"
                    autoComplete="new-password"
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-input">Birthday</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    type="date"
                    id="date-input"
                    name="date-input"
                    placeholder="date"
                  />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Role</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect defaultValue="sa"  onChange={handleChange} custom name="role" id="role">
                    <option  value="sa">System Administrator</option>
                    <option value="pic">PIC</option>
                    <option value="member">Member</option>
                    <option value="secretary">Secretary</option>
                  </CSelect>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CLabel col md="3" htmlFor="file-input">
                  Upload Photos
                </CLabel>
                <CCol xs="12" md="9">
                  <CInputFile id="file-input" name="file-input" />
                </CCol>
              </CFormGroup>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton
              onClick={handleSubmit}
              className="m-2"
              type="submit"
              color="primary"
            >
              <CIcon name="cil-check-circle" size="lg" /> Submit
            </CButton>
            <CButton className="m-2" type="reset" color="danger">
              <CIcon name="cil-ban" size="lg" /> Reset
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddUser;
