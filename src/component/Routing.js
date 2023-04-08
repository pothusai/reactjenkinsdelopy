import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import Footer from './footer';
import Home from '../component/Home/Home';
import Listing from "./listing/listing";
import Details from "../Details/details";
import PlaceOrder from "./orders/placeOrder";
import ViewOrder from "./orders/viewOrder";
import Login from "./login/login";
import Register from './login/register'

const Routing = () => {
    return(
        <BrowserRouter>
            <Route exact path='/' component={Home} />
            <Route path='/listing/:mealId' component={Listing} />
            <Route path='/details' component={Details} />
            <Route path='/viewBooking' component={ViewOrder} />
            <Route path='/placeOrder/:restName' component={PlaceOrder} />
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Footer />
        </BrowserRouter>
    )
}


export default Routing