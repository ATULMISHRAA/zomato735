import React from "react";
import "../Style/Home.css";
import{withRouter} from "react-router-dom"
class QuickSearchItem extends React.Component {
    handleNavigate=(mealtypeID)=>{
        const locationId = sessionStorage.getItem('locationId');
        if(locationId){
            this.props.history.push(`/filter?mealtype=${mealtypeID}&location=${locationId}`);
        }else{
            this.props.history.push(`/filter?mealtype=${mealtypeID}`);
        }
        
    }

    render() {
        const {heading, content, image ,id}= this.props
        return (
            
            <div className="col-sm-12 col-md-6 col-lg-4" onClick={()=>this.handleNavigate(id)}>
                <div className="items">
                    <div className="item-left">
                        <img src={`./${image}`} height="100%" width="100%" alt=""/>
                    </div>
                    <div className="item-right">
                        <div className="qs-heading">{heading}</div>
                        <div className="qs-paragraph">{content}</div>
                    </div>
                </div>
            </div>
        
        
        )
    }
}
export default withRouter(QuickSearchItem);