import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { json, redirect } from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const navigation = useNavigation();
  const actionData = useActionData();

  const isSubmitting = navigation.state === "submitting";

  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form className={classes.form} method={method}>
      {actionData && actionData.errors && (
        <ul>
          {Object.values(actionData.errors).map((err) => {
            return <li key={err}>{err}</li>;
          })}
        </ul>
      )}

      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  console.log("funciton called");

  const Data = await request.formData();
  const method = request.method;
  const id = params.id;

  console.log(id);

  const EventData = {
    title: Data.get("title"),
    image: Data.get("image"),
    date: Data.get("date"),
    description: Data.get("description"),
  };

  let url = "http://localhost:8080/events";

  console.log("method is", method);

  if (method === "PATCH") {
    const id = params.id;

    console.log(id);
    url = 'http://localhost:8080/events/'+ id;
  }

  console.log(url);

  const response = await fetch(url, {
    method: method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(EventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "could not save event" }, { status: 500 });
  }
  return redirect("/events");
}
