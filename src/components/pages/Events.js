import EventsList from "../EventsList";
import { useLoaderData, json } from "react-router-dom";

function Events() {
  const Data = useLoaderData();
  let events = Data.events;

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default Events;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {

    // throw new Response(JSON.stringify({message:'some thing went wrong'}),{status:500})
    throw json(
      { message: "some thing went wrong fetch path may be not correct" },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}
