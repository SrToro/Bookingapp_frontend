import React, { Component } from "react";
import AuthContext from "../context/auth-context";

import Spinner from '../components/Spinner/Spinner'


class BookingsPage extends Component {

    state = {
        isLoading: false,   
        bookings: []
    }

    static contextType = AuthContext;

    //called when the component is rendered the first time
    componentDidMount() {
        this.fetchBookings();
    }

    // to fetch the events from the backend
    fetchBookings = () => {

        this.setState({ isLoading: true });

        const requestBody = {
            query: `query{
                    bookings{ 
                        _id 
                        createdAt
                        event{
                            _id
                            title
                            date
                            
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
              'Authorization': 'Bearer ' + this.context.token
            },
          })
            .then((res) => {
              if (res.status !== 200 && res.status !== 201) {
                throw new Error("failed");
              }
              return res.json();
            })
            .then((resData) => {
              const bookings = resData.data.bookings;
              this.setState({ bookings: bookings, isLoading: false });
            })
            .catch((err) => {
              console.log(err);
              this.setState({ isLoading: false });
            });
    }
    
    render() {
        return (
          <React.Fragment>
            {this.state.isLoading ? <Spinner /> : (
              <ul>
                  {this.state.bookings.map(booking => 
                      <li>
                          {booking.event.title} - 
                          {new Date(booking.createdAt).toLocaleDateString()}
                      </li>
                  )}
              </ul> 

            )}
          </React.Fragment>       
        )
    }
}

export default BookingsPage;