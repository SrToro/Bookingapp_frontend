import React, { Component, useState } from "react";

import Modal from '../components/Modal/Modal'
import Backdrop from "../components/Backdrop/Backdrop";

import './Events.css';

class EventsPage extends Component {

    state={
        creating: false
    }

    constructor(props){
        super(props);
        this.titleElRef = React.createRef();
        this.priceElRef = React.createRef();
        this.dateElRef = React.createRef();
        this.descriptionElRef = React.createRef();
    }

    startCreateEventHandler = () =>{
        this.setState({creating: true})
    }

    onConfirmHandler = () =>{
        this.setState({creating:false})
        const title = this.titleElRef.current.value;
        const price = +this.priceElRef.current.value;
        const description = this.descriptionElRef.current.value;
        const date = this.dateElRef.current.value;

        if (title.trim().length === 0 || price.trim().length === 0 || description.trim().length === 0 || date.trim().length === 0){
            return;
        }
        const event = {title, price, description, date}
        console.log(event)
    }

    onCancelHandler = () =>{
        this.setState({creating:false})
    }

    render() {
        return (
            <React.Fragment>
                { this.state.creating  &&<Backdrop/>}
                { this.state.creating && <Modal title="Add Event" canCancel canConfirm onConfirm={this.onConfirmHandler} onCancel={this.onCancelHandler}>
                    <form>
                        <div className="form-control">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" ref={this.titleElRef}></input>  
                        </div>
                        <div className="form-control">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" rows={4} ref={this.descriptionElRef}></textarea>
                        </div>
                        <div className="form-control">
                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" ref={this.priceElRef}></input>  
                        </div>
                        <div className="form-control">
                            <label htmlFor="date">Date</label>
                            <input type="date" id="date" ref={this.dateElRef}></input>  
                        </div>
                    </form>
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