import React from "react";

const eventItem = props => (
    <li key={props.eventId} className="events_list_item">
          {props.title}
        </li>
)

export default eventItem;