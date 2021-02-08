import Cookies from 'js-cookie'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import _ from 'lodash';


export const getSessionData = () =>{
    // let decoded = jwt_decode(getSession()as string)as string;
    console.log("decoded session data")
    // console.log(decoded)
    // return JSON.parse(decoded)
   let data;
   console.log(getSession());
    if (_.isNull(getSession()) || _.isUndefined(getSession()) ){
        
    }else{
        data = jwt_decode(getSession()as string)
    }
    // let data = jwt_decode(getSession()as string)
// console.log()
return data
}
export const getSession = () => {
  const jwt = Cookies.get('___session__MRKRAB___')
//   let session
//   try {
//     if (jwt) {
//       const base64Url = jwt.split('.')[1]
//       const base64 = base64Url.replace('-', '+').replace('_', '/')
//       // what is window.atob ?
//       // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
//       session = JSON.parse(window.atob(base64))
//     }
//   } catch (error) {
//     console.log(error)
//   }
  return jwt
}
export const logOut = () => {
  Cookies.remove('___session__MRKRAB___')
  axios.defaults.headers.common['Authorization'] = "";

}
export const logIn = (token:any) => {
    Cookies.set('___session__MRKRAB___',token)
    axios.defaults.headers.common['Authorization'] = "Bearer "+token;

  }