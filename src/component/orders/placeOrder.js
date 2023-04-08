import React, { Component } from "react";
import Header from "../header";
import './placeOrder.css';


const url = "http://3.17.216.66:4000/menuItem"

const purl = " http://localhost:8300/orders"

class PlaceOrder extends Component {

    constructor(props){
        super(props)
        let sessionData = sessionStorage.getItem('userInfo')
        let data = JSON.parse(sessionData)
        this.state={
            id:Math.floor(Math.random()*10000),
            hotel_name:this.props.match.params.restName,
            name: data.name,
            email:data.email,
            cost:0,
            phone:data.phone,
            address: 'G Block Hno 57 Sainagar',
            menuItem:''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    PlaceOrder = () => {
        let obj = this.state
        obj.menuItem = sessionStorage.getItem('menu')
        fetch(purl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        .then(this.props.history.push(`/viewBooking`))
    }

    renderItem = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <div className="orderItem" key={item.menu_id}>
                        <img src={item.menu_image} alt={item.menu_name} />
                        <h3>{item.menu_name}</h3>
                        <h4>Rs. {item.menu_price}</h4>
                    </div>
                )
            })
        }
    }



    render(){
        return(
            <div>
                <Header />
                <div className="container">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3>Your Order for Rest {this.state.hotel_name}</h3>
                        </div>
                        <div className="panel-body">
                            <form action="http://localhost:4100/paynow" method="POST">
                            <div className="row">
                                <input type='hidden' name='cost' value={this.state.cost} />
                                <input type='hidden' name='id' value={this.state.cost} />
                                <input type='hidden' name='hotel_name' value={this.state.hotel_name} />
                                <div className="form-group col-md-6">
                                    <label>Name</label>
                                    <input className="form-control" name="name" value={this.state.name} onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Email</label>
                                    <input className="form-control" name="email" value={this.state.email} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Phone</label>
                                    <input className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Address</label>
                                    <input className="form-control" name="address" value={this.state.address} onChange={this.handleChange}/>
                                </div>
                                {this.renderItem(this.state.menuItem)}
                            </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2>Total Price is Rs.{this.state.cost}</h2>
                                    </div>
                                </div>
                                <button className="btn btn-success" onClick={this.PlaceOrder}>
                                    Checkout
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    componentDidMount(){
        let menuItem = sessionStorage.getItem('menu');
        let orderId = []
        menuItem.split(',').map((item) => {
            orderId.push(parseInt(item))
            return 'ok'
        })
        console.log(orderId)
        fetch(url,{
            method: 'POST',
            headers:{
                'accept':'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(orderId)
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            let totalPrice = 0;
            data.map((item) => {
                totalPrice += parseFloat(item.menu_price)
                return 'ok'
            })
            this.setState({menuItem:data,cost:totalPrice})
        })
    }
}

export default PlaceOrder