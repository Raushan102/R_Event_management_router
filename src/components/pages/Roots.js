import React from "react";
import { Outlet } from "react-router-dom";
import EventsNavigation from "../EventsNavigation";

function Roots() {
  return (
    <>
      <EventsNavigation/>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Roots;
export  function eventRootLayout(){
  return 'helll'
}
