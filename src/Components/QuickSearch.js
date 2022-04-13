import React from "react";
import "../Style/Home.css";
import QuickSearchItem from "./QuickSearchItem";


class QuickSearch extends React.Component {

    render() {
        const {mealtypesData}=this.props
        return (

            <div className="container">
                <div className="heading"> Quick Searchs</div>
                <div className="sub-heading">Discover the restaurants by type or meal</div>
                <div className="container-fluid">
                    <div className="row">
                        {mealtypesData.map(item=>{
                        return <QuickSearchItem 
                            heading={item.name}
                            content={item.content}
                            image={item.image}
                            id={item.meal_type}
                        />
                        
                        })}
                        
                    </div>
                </div>

            </div>

        )
    }
}
export default QuickSearch;