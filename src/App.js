import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditEventPage from "./components/pages/EditEvent";
import ErrorPage from "./components/pages/ErrorPage";
import EventDetail, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './components/pages/EventDetail'
import EventsPage, { loader as eventsLoader } from "./components/pages/Events";

import HomePage from "./components/pages/Home";
import NewEventPage from "./components/pages/NewEvent";

import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, {
  action as newsletterAction,
} from "./components/pages/Newsletter";
import Roots from "./components/pages/Roots";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":id",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
