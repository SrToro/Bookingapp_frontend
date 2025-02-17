import React from "react";

//navlink dont reload the page, as a "<a href=""></a>" does
import { NavLink } from "react-router-dom";

import AuthContext from "../../context/auth-context";
import './MainNavigation.css';



//we call here a funct that show the nav items if context get the necesary values for example the capability to authenticate li
const mainNavigation = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation">
                    <div className="main-navigation-logo">

                        <h1>Booking App </h1><i>by Santiago</i>

                    </div>
                    <div className="main-navigation-item">
                        <ul>
                            {!context.token && <li>
                                <NavLink to="/auth">Authenticate</NavLink>
                            </li>}
                            <li>
                                <NavLink to="/events">Events</NavLink>
                            </li>
                            {context.token && <li>
                                <NavLink to="/bookings">Bookings</NavLink>
                            </li>}
                            {context.token && <li>
                                <NavLink to="/user">Profile</NavLink>
                            </li>}
                            {context.token && <li>
                                <button onClick={context.logout}>Log out</button>
                            </li>}
                        </ul>
                    </div>
                </header>

            )
        }}
    </AuthContext.Consumer>

);


export default mainNavigation;