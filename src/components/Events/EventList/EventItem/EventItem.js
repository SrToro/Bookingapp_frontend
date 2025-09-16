import React from "react";

import "./EventItem.css";

const eventItem = (props) => (
  <li key={props.eventId} className="event_list_item">
    <div>
      <h1>{props.title}</h1>
      <h2>$123</h2>
    </div>
    <div>
        <button className="btn">View Details</button>
    </div>
  </li>
);

export default eventItem;
