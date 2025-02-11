import React from "react";

import './MainNavigation.css';

//navlink dont reload the page, as a "<a href=""></a>" does
import { NavLink } from "react-router-dom";


const mainNavigation = props => (
    <header className="main-navigation">
        <div className="main-navigation-logo">

            <h1>Booking App </h1><i>by Santiago</i>

        </div>
        <div className="main-navigation-item">
            <ul>
                <li>
                    <NavLink to="/events">Events</NavLink>
                </li>
                <li>
                    <NavLink to="/Bookings">Bookings</NavLink>
                </li>
                <li>
                    <NavLink to="/User">Profile</NavLink>
                </li>
            </ul>
        </div>
    </header>


);


export default mainNavigation;