import React from "react";

import './BookingList.css'

const bookingList = props => (

    <ul className="bookings_list">
        {props.bookingList.map(booking => {
            return (
                <li className="Bookings_item">
                    <div className="bookings_item-data">
                        {booking.event.title} - 
                        {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                    <div className="booking_item-actions">
                        <button className="btn" onClick={props.onDelete.bind(this, booking._id)}>Cancel</button>
                    </div>
                </li>
            )
        })}

    </ul>
)

export default bookingList