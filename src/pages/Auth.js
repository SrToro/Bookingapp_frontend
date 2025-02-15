import React, { Component } from "react";

import './Auth.css';


class AuthPage extends Component {

    //router to signup page
    state = {
        isLogin: true
    }


    //constructor of the data from the form
    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return { isLogin: !prevState.isLogin }
        })
    }

    //handler that take the data from the form and make a backend request
    submitHandler = event => {

        //to prevent that the values and the request are sended 
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;


        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        
        //make a request body on a let with the values from the form that created as a cons but if the state isLogin is true
        let requestBody = {
            query: 
            `query{
                login(email: "${email}", password: "${password}"){
                    userId
                    token
                    tokenExpiration
                    }
                }`
        };

        //if the login state is false, make a create user
        if (!this.state.isLogin) {

            requestBody = {
                query: `mutation{
                            createUser(userInput: {
                                email: "${email}", 
                                password: "${password}"
                            }){ _id 
                                email}
                        }`
            };

        }


        //to send http request to the backend and as a second argument the json with the post
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('failed')
                }
                return requestBody.json();
            }).then(resData => {
                console.log(resData)
            }).catch(err => {
                console.log(err);
            })

    };

    render() {
        return (
            // conect the submithandler with the form and in each data, take the values. 
            // the values are sended to the development server (at the page)

            <form className="auth-form" onSubmit={this.submitHandler}>
                <div className="form-control">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" ref={this.emailEl} />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={this.passwordEl} />
                </div>
                <div className="form-actions">
                    <button type="submit">Login</button>
                    <button type="button" onClick={this.switchModeHandler}>switch to {this.state.isLogin ? 'Signup' : 'Login'}</button>
                </div>
            </form>

        )
    }
}

export default AuthPage;