import React from "react";
import {Link} from 'react-router-dom'



const QuickDisplay = (props) => {

    const listMeal = ({mealData}) => {
        if(mealData){
            return mealData.map((item) => {
                return(
                    <Link to={`/listing/${item.mealtype_id}`} key={item.id}>
                        <div className="tileContainer">
                            <div className="tileComponent1">
                                <img src={item.meal_image} alt="dinner" />
                            </div>
                            <div className="tileComponent2">
                                <div className="componentHeading1">
                                    {item.mealtype}
                                </div>
                                <div className="componentHeading2">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })
        }
    }



    return(
        <div>
            {listMeal(props)}
        </div>
    )
}


export default QuickDisplay