import React from 'react'
import EventForm from '../EventForm'
import {useRouteLoaderData} from 'react-router-dom'

function EditEvent() {

  const data=useRouteLoaderData('detail_loader')
  return (
   
    <EventForm event={data.event} method={'patch'}/>
  )
}

export default EditEvent

