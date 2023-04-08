import React, { Component } from "react";
import axios from 'axios';
import Display from './displayOrder';
import Header from "../header";


const url = "http://localhost:8300/orders"


class ViewOrder extends Component {

    constructor(){
        super()

        this.state={
            orders:''
        }
    }


    render(){
        return(
            <div>
                <Header />
                <Display orderData={this.state.orders} />
            </div>
        )
    }

    componentDidMount(){
        axios.get(url).then((res) => {this.setState({orders:res.data})})
    }
}

export default ViewOrder