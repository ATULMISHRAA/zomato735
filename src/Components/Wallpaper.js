import React from "react";
import "../Style/Home.css";
import axios from "axios";
import { withRouter } from "react-router-dom";


class Wallpaper extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            inputText: undefined,
            suggestions: []
        }
    }
    handleLocationChange = (event) => {
        const locationId = event.target.value;
        sessionStorage.setItem('locationId', locationId);

        axios({
            method: "GET",
            url: `http://localhost:5656/restaurants/${locationId}`,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, inputText: '' });
            })
            .catch()
    }

    handleSerach = (event) => {
        const { restaurants } = this.state;
        const inputText = event.target.value;

        const suggestions = restaurants.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()))
        this.setState({ inputText, suggestions })

    }
    selectingRestaurant = (resObj) => {
        this.props.history.push(`/details?restaurant=${resObj._id}`);
    }

    showSuggestion = () => {
        const { suggestions, inputText } = this.state;

        if (suggestions.length == 0 && inputText == undefined) {
            return null;
        }
        if (suggestions.length > 0 && inputText == '') {
            return null;
        }
        if (suggestions.length == 0 && inputText) {
            return <ul >
                <li>No Search Results Found</li>
            </ul>
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectingRestaurant(item)}>{`${item.name} -   ${item.locality},${item.city}`}</li>))
                }
            </ul>
        );

    }


    render() {
        const { locationsData, restaurants, inputText } = this.props;
        return (

            <div>
                <img src="./Assets/aaa1.jpg" width='100%' height="500px" className="wall-img" alt="" />
                <div className="absolute-block">
                    <div className="logo">
                        <b>e!</b>
                    </div>
                    <div className="main-heading">Find the best restaurants , cafes and bars</div>
                    <div className="locationSelector">
                        <select className="locationDropdown" onChange={this.handleLocationChange}>
                            <option value="0">search</option>
                            {locationsData.map((item) => {
                                return <option value={item.location_id}>{`${item.name},${item.city}`}</option>
                            })}
                        </select>
                        <div className="search-bo">
                           {/* <span> <i className="fa fa-search"></i></span>*/}

                            <input className="search" type="text" value={inputText} placeholder="Search for restaurants" onChange={this.handleSerach} />
                            {this.showSuggestion()}

                        </div>
                    </div>

                </div>
            </div>


        )
    }
}
export default withRouter(Wallpaper);