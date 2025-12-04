import React, { Component } from "react";
import AuthContext from "../context/auth-context";

import Spinner from '../components/Spinner/Spinner'
import BookingList from "../components/Bookings/BookingList/BookingList.js";


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
              console.log(resData); // me esta TRAYENDO UN ARRAY VACIO
            })
            .catch((err) => {
              console.log(err);
              this.setState({ isLoading: false });
            });
    }

    deleteBookingHandler = bookingId =>{
      this.setState({ isLoading: true });
 
        const requestBody = {
            query: `mutation CancelBooking($id: ID!) {
                      cancelBooking(bookingId: $id){ 
                        _id 
                        title
                      }
                    }`,
                    variables: {
                      id: bookingId 
                    } 
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
              
              this.setState(prevState =>{ 
                const updatedBookings = prevState.bookings.filter(booking =>{ 
                  return booking._id !== bookingId 
                }) 
                return{bookings: updatedBookings, isLoading: false} 
              }); 
            }) 

            .catch((err) => { 
              console.log(err); 
              this.setState({ isLoading: false }); 
            }); 
    }
    
    render() { 
      let content = <Spinner> </Spinner >; 
      if(!this.state.isLoading){ 
        content = ( 
          <React.Fragment> 
            <div> 
              <button>List</button> 
              <button>Chart</button> 
            </div> 
          </React.Fragment> 
        ) 
      }  
      return ( 
        <React.Fragment> 
          {content} 
        </React.Fragment>
      ) 
    } 
} 
 
export default BookingsPage; 