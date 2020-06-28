import React, { useState, useEffect } from "react";
import { Link,useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {
 const isAuthorized = useSelector(state => state.auth.isAuthenticated);


  let history = useHistory();
  useEffect(() => {
   console.log("Check Auth")
    if (!isAuthorized){
      console.log("No Auth")

     history.push("/login")
   }else{
    console.log("Authed")

   }
    },[isAuthorized])

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
