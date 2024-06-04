import React from 'react'
import {useRouteError} from 'react-router-dom'



function ErrorPage() {


  let ErrorResponse=useRouteError()

  let title = "Error ocurred! ";

  
  if(ErrorResponse.status===500){
    title = ErrorResponse.data.message;
  }
 
  if(ErrorResponse.status===404){
    title='invalid path source or path not found '
  }

  
  return (
    <h1>{title}</h1>
  )
}

export default ErrorPage