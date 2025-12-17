import React, { Component } from "react";

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
    selectedEvent: null,
  };

  isActive = true;
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
  
  //event that set me the creating state on true
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
      query: `mutation CreateEventQuery($titleCEQ: String!, $descriptionCEQ: String!, $priceCEQ: Float!, $dateCEQ: String!){
                        createEvent(eventInput: {
                            title: $titleCEQ,
                            description: $descriptionCEQ,
                            price: $priceCEQ,
                            date: $dateCEQ"
                        }){ _id
                            title
                            description
                            price
                            date} 
                    }`,
      variables:{
        $titleCEQ: title,
        $descriptionCEQ: description,
        $priceCEQ: price,
        $dateCEQ: date
      }
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

  // set a event selected to null
  onCancelHandler = () => {
    this.setState({ creating:false, selectedEvent:null });
  };

  //request a book when a event are selected
  bookEventHandler =() =>{
    if (!this.context.token){
      this.setState({selectedEvent:null})
      return
      }
      const requestBody = {
        query: `mutation BookEventHnd($idEvent: ID!){
              bookEvent(eventId: $idEvent)
                { _id
                  createdAt
                  updatedAt
                }
            }`,
        variables:{
          idEvent: this.state.selectedEvent._id
        }
      };

      const token = this.context.token;

      //to send http request to the backend and as a second argument the json with the post
      fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.context.token,
        },
      })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("failed");
          }
          return res.json();
        })
        .then((resData) => {
          console.log(resData);
          this.setState({selectedEvent:null})
        })
        .catch((err) => {
          console.log(err);
        });
  }


  //fuction that request a event
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

    console.log(this.isActive);
    // const token = this.context.token;

    //to send http request to the backend and as a second argument the json with the post
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + this.context.token
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed");
        }
        return res.json();
      })
      .then(resData => {
        const events = resData.data.events;

        if(!this.isActive){
          this.setState({ events: events, isLoading: false });
          console.log("is showing events")
        }
      })
      .catch(err => {

        this.setState({ isLoading: false });
        console.log("is active")
      });
  };
//editing show detal to find the event by id and set it to the state
  showDetailHandler = eventId => {
    this.setState(prevState => {
      const selectedEvent = prevState.events.find(e => e._id === eventId)
      return {selectedEvent: selectedEvent}
    })
  }

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {

    return (
      <React.Fragment>
        {(this.state.creating || this.state.selectedEvent) && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onConfirm={this.onConfirmHandler}
            onCancel={this.onCancelHandler}
            confirmText="Confirm"
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
        {this.state.selectedEvent && (
          <div className="modal-details">
            <Modal
            title={this.state.selectedEvent.title}
            canCancel
            canConfirm
            onConfirm={this.bookEventHandler}
            onCancel={this.onCancelHandler}
            confirmText={this.context.token ? 'Book!' : 'Confirm'}>
              <h1>{this.state.selectedEvent.title}</h1>
              <h3>price: ${this.state.selectedEvent.price} - date: {new Date(this.state.selectedEvent.date).toLocaleDateString()}</h3>
              <p>{this.state.selectedEvent.description}</p>
            </Modal>
          </div> )
        }

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
          onViewDetail={this.showDetailHandler}
        />
        }
     
      </React.Fragment>
    );
  }
}

export default EventsPage;
