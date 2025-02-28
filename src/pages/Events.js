import React, { Component } from "react";

import Modal from '../components/Modal/Modal'

import './Events.css';

class EventsPage extends Component {
    render() {
        return (
            <React.Fragment>
                <Modal title="Add Event" canCancel canConfirm>
                    <p>Modal content</p>
                </Modal>
                <div className="events-control">
                    <p>Share your own Events!</p>
                    <button className="btn">Create Event</button>
                </div>
            </React.Fragment>
        )
    }
}

export default EventsPage;