import React, {Component} from "react";
import './search.css';

const base_url = "http://3.17.216.66:4000"

class Search extends Component {
    constructor() {
        super()

        this.state={
            location:'',
            restData:''
        }
    }

    renderCity = (data) => {
        console.log('>>>>>renderCity', data)
        if(data){
            return data.map((item) => {
                return(
                    <option value={item.state_id} key={item.state_id}>
                        {item.state}
                    </option>
                )
            })
        }
    }

    renderRest = (data) =>{
        if(data){
            return data.map((item) => {
                return(
                    <option value={item.restaurant_id} key={item.restaurant_id}>
                        {item.restaurant_name} | {item.address}
                    </option>
                )
            })
        }
    }

    handleCity = (e) => {
        let stateId = e.target.value
        fetch(`${base_url}/restaurant?stateId=${stateId}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({restData:data})
        })
    }

    render() {
        return(
            <div>
                <div id="search">
                    <div id="logo">
                        <span>D!</span>
                    </div>
                    <div id="heading">
                        Search Place Near To You
                    </div>
                    <div id="dropdown">
                        <select onChange={this.handleCity}>
                            <option>
                                ---Select Your City---
                            </option>
                            {this.renderCity(this.state.location)}
                        </select>
                        <select class="restSelect">
                            <option>
                                ---Select Restaurants---
                            </option>
                            {this.renderRest(this.state.restData)}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        fetch(`${base_url}/location`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({location:data})
        })
    }
}

export default Search