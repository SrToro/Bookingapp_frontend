import React from "react";


import "./EventList.css";
import EventItem from "../EventItem/EventItem";

const eventList = props => {

    const events = props.events.map((event) => {
        return (
            <EventItem key={event._id} eventId={event._id} title={event.title} />
        );
      });

    return (<ul className="event_list">{events}</ul>)
};

export default eventList;
