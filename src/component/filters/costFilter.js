import React, { Component } from "react";
import axios from "axios";

const url = "http://3.17.216.66:4000/filter"

class CostFilter extends Component{


    costFilter = (e) => {
        let mealId = this.props.mealId;
        let cost = (e.target.value).split('-');
        let lcost = cost[0];
        let hcost = cost[1];
        let costUrl = "";
        if(e.target.value === ""){
            costUrl = `${url}/${mealId}`
        }else{
            costUrl = `${url}/${mealId}?hcost=${hcost}&lcost=${lcost}`
        }
        axios.get(costUrl)
            .then((res) => {this.props.restPerCost(res.data)})
    }



    render(){
        return(
            <div>
                <center><h3>Cost Filter</h3></center>
                <div style={{marginLeft:'15%'}} onChange={this.costFilter}>
                    <label className="radio">
                        <input type='radio' name="cuisine" value='' />All
                    </label>
                    <label className="radio">
                        <input type='radio' name="cuisine" value='0-300' />0-300
                    </label>
                    <label className="radio">
                        <input type='radio' name="cuisine" value='301-600' />301-600
                    </label>
                    <label className="radio">
                        <input type='radio' name="cuisine" value='601-900' />601-900
                    </label>
                    <label className="radio">
                        <input type='radio' name="cuisine" value='901-5000' />901-5000
                    </label>
                </div>
            </div>
        )
    }
}

export default CostFilter