import React, {useState, useEffect} from "react";
import './search.css';

const base_url = "http://3.17.216.66:4000"

function Search(){

    const[location, setLocation] = useState('')
    const[restData, setRestData] = useState('')

    const renderCity = (data) => {
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


    const renderRest = (data) =>{
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

    const handleCity = (e) => {
        let stateId = e.target.value
        fetch(`${base_url}/restaurant?stateId=${stateId}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            setRestData(data)
        })
    }

    useEffect(() => {
        fetch(`${base_url}/location`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            setLocation(data)
        })
    },[])



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
                    <select onChange={handleCity}>
                        <option>
                            ---Select Your City---
                        </option>
                        {renderCity(location)}
                    </select>
                    <select class="restSelect">
                        <option>
                            ---Select Restaurants---
                        </option>
                        {renderRest(restData)}
                    </select>
                </div>
            </div>
        </div>
    )
}




export default Search