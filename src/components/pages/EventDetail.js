import React from "react";
import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../EventItem";

function EventDetail() {
  let useLoader = useRouteLoaderData("detail_loader");
  

  return (
    <>
      <EventItem event={useLoader.event} />
    </>
  );
}

export async function loader({ params, request }) {
  let id = params.id;

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json({ message: "unable to fetch data" }, { status: 500 });
  } else {
    return response;
  }
}

export default EventDetail;

export async function action({ params, request }) {
  const id = params.id;

  let response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });


  if (!response.ok) {
    throw json({ message: "unable to delete the  data" }, { status: 500 });
  }

  return redirect("/events");
}
