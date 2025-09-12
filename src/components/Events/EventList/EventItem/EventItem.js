import React from "react";

import "./EventItem.css";

const eventItem = props => (
    <li key={props.eventId} className="event_list_item">
          {props.title}
        </li>
)

export default eventItem;