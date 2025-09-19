import React, { Component, useState } from "react";

import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import AuthContext from "../context/auth-context";
import Spinner from "../components/Spinner/Spinner.js"

import EventList from "../components/Events/EventList/EventList.js";
import "./Events.css";

class EventsPage extends Component {
  state = {
    creating: false,
    events: [],
    isLoading: false,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchEventsHandler();
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  onConfirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleElRef.current.value;
    const price = +this.priceElRef.current.value;
    const description = this.descriptionElRef.current.value;
    const date = this.dateElRef.current.value;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      description.trim().length === 0 ||
      date.trim().length === 0
    ) {
      return;
    }
    const event = { title, price, description, date };
    console.log(event);

    //make a request body on a let with the values from the form that created as a cons but if the state isLogin is true

    const requestBody = {
      query: `mutation{
                        createEvent(eventInput: {
                            title: "${title}", 
                            description: "${description}", 
                            price: ${price}, 
                            date: "${date}"
                        }){ _id 
                            title
                            description
                            price
                            date}
                    }`,
    };

    const token = this.context.token;

    //to send http request to the backend and as a second argument the json with the post
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed");
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedEvents = [...prevState.events];
          updatedEvents.push({
            _id: resData.data.createEvent._id,
            title: resData.data.createEvent.title,
            description: resData.data.createEvent.description,
            date: resData.data.createEvent.date,
            price: resData.data.createEvent.price,
            creator: {
              _id: this.context.userId,
            },
          });
          return { events: updatedEvents };
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  onCancelHandler = () => {
    this.setState({ creating: false });
  };

  fetchEventsHandler = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `query{
            events{ _id 
                title
                description
                price
                date
              creator{
                _id
                email
              }
            }
        }`,
    };

    const token = this.context.token;

    //to send http request to the backend and as a second argument the json with the post
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed");
        }
        return res.json();
      })
      .then((resData) => {
        const events = resData.data.events;
        this.setState({ events: events, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {

    return (
      <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onConfirm={this.onConfirmHandler}
            onCancel={this.onCancelHandler}
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef}></input>
              </div>
              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows={4}
                  ref={this.descriptionElRef}
                ></textarea>
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
          </Modal>
        )}
        {this.context.token && (
          <div className="events-control">
            <p>Share your own Events!</p>
            <button className="btn" onClick={this.startCreateEventHandler}>
              Create Event
            </button>
          </div>
        )}
        {this.state.isLoading ? <Spinner/>: <EventList 
          events={this.state.events} 
          authUserId={this.context.userId}
        />
        }
              
      </React.Fragment>
    );
  }
}

export default EventsPage;
