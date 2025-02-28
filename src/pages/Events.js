import React, { Component, useState } from "react";

import Modal from '../components/Modal/Modal'
import Backdrop from "../components/Backdrop/Backdrop";

import './Events.css';

class EventsPage extends Component {

    state={
        creating: false
    }

    startCreateEventHandler = () =>{
        this.setState({creating: true})
    }

    onConfirmHandler = () =>{
        this.setState({creating:false})

    }

    onCancelHandler = () =>{
        this.setState({creating:false})
    }

    render() {
        return (
            <React.Fragment>
                { this.state.creating  &&<Backdrop/>}
                { this.state.creating && <Modal title="Add Event" canCancel canConfirm onConfirm={this.onConfirmHandler} onCancel={this.onCancelHandler}>
                    <p>Modal content</p>
                </Modal>}
                <div className="events-control">
                    <p>Share your own Events!</p>
                    <button className="btn" onClick={this.startCreateEventHandler}>Create Event</button>
                </div>
            </React.Fragment>
        )
    }
}

export default EventsPage;