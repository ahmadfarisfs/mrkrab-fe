
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import configData from "../config.json";
const MySwal = withReactContent(Swal);
export   const submitWithConfirm = (data: any,confirmTitle:string, 
    confirmText:string, uri:string,
     successMessage:string,onSuccess:any,onFailure:any,method:any) => {
    console.log(data);

    MySwal.fire(
      {
        title: confirmTitle,
        text: confirmText,
        showCancelButton: true,
        icon: 'question',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return axios({
            method:method,
            data:data,
            url:configData.baseURL + uri,
          }

             )
            .then(response => {
              if (response.status != 200) {
                console.log("NOT 200")
                console.log(response)
                
                throw new Error(response.statusText)
              }
              console.log("ret data")
              console.log(response)
              return "OK"
            })
            .catch(error => {
              console.log(error)
              console.log(error.response.data);  
     console.log(error.response.status);  
     console.log(error.response.headers); 
              onFailure();
              Swal.showValidationMessage(
                `Failed: ${error.response.data}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }
    ).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(successMessage, '', 'success').then(() => {
         onSuccess();
            //history.push('/user');
        })
      }
    })


  };