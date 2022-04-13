import React from "react";
import "../Style/Filter.css";
import queryString from "query-string";
import axios from "axios";


class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            locations: [],
            mealtype: undefined,
            location: undefined,
            cuisine: [],
            lcost: undefined,
            hcost: undefined,
            sort: 1,
            page: 1,
            pageCount: []
        }
    }
    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { mealtype } = qs;

        const filterObj = {
            mealtype: Number(mealtype)
        };
        axios({
            method: "POST",
            url: 'http://localhost:5656/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, mealtype, pageCount: response.data.pageCount });
            })
            .catch()
        axios({
            method: "GET",
            url: 'http://localhost:5656/locations',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ locations: response.data.locations });
            })
            .catch()
    }

    handleSortChange = (sort) => {
        const { mealtype, location, cuisine, lcost, hcost, page, } = this.state;

        const filterObj = {
            mealtype: Number(mealtype),
            location,
            cuisine: cuisine.length==0?undefined:cuisine,
            lcost,
            hcost,
            page,
            sort: sort
        };
        axios({
            method: "POST",
            url: 'http://localhost:5656/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, sort, pageCount: response.data.pageCount });
            })
            .catch()
    }
    handleCostChange = (lcost, hcost) => {

        const { mealtype, location, cuisine, sort, page } = this.state;

        const filterObj = {
            mealtype: Number(mealtype),
            location,
            cuisine: cuisine.length==0?undefined:cuisine,
            sort,
            page,
            lcost,
            hcost
        };
        axios({
            method: "POST",
            url: 'http://localhost:5656/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, lcost, hcost, pageCount: response.data.pageCount });
            })
            .catch()
    }
    handleLocationChange = (event) => {
        const location = event.target.value;
        const { mealtype, cuisine, lcost, hcost, sort, page } = this.state;

        const filterObj = {
            mealtype: Number(mealtype),
            cuisine: cuisine.length==0?undefined:cuisine,
            location,
            sort,
            page,
            lcost,
            hcost
        };
        axios({
            method: "POST",
            url: 'http://localhost:5656/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, location, pageCount: response.data.pageCount });
            })
            .catch()
    }
    handlePageChange=(page)=>{
        const { mealtype, location, cuisine, lcost, hcost, sort,} = this.state;

        const filterObj = {
            mealtype: Number(mealtype),
            cuisine: cuisine.length==0?undefined:cuisine,
            location,
            sort,
            page,
            lcost,
            hcost
        };
        axios({
            method: "POST",
            url: 'http://localhost:5656/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, page, pageCount: response.data.pageCount });
            })
            .catch()
    }
    handleCuisineChange = (cuisineId) => {

        const { mealtype, location, cuisine, lcost, hcost, sort, page } = this.state;

        const index=cuisine.indexOf(cuisineId);
        if(index==-1){
            cuisine.push(cuisineId);
        }
        else{
            cuisine.splice(index,1);
        }
        const filterObj = {
            mealtype: Number(mealtype),
            location,
            cuisine: cuisine.length==0?undefined:cuisine,
            sort,
            page,
            lcost,
            hcost
        };
        axios({
            method: "POST",
            url: 'http://localhost:5656/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, cuisine, pageCount: response.data.pageCount });
            })
            .catch()

    }
    handleNavigate=(resId)=>{
        this.props.history.push(`/details?restaurant=${resId}`);
    }


    render() {
        const { restaurants, locations, pageCount } = this.state;
        return (

            <div className="container-fluid">
                <div className="heading">Breakfast Places in Mumbai</div>
                <div className="row">

                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <div className="filter-section">
                            <div>
                                <span className="text-style filter">Filter/Sort</span>
                                <span className="fa fa-angle-double-down filter-icon" data-bs-toggle="collapse" data-bs-target="#target"></span>
                                <div id="target" className="collapse-show">
                                    <div className="text-style sub-heading">Select Location</div>
                                    <select className="select" onChange={this.handleLocationChange}>
                                        <option value="0">search</option>
                                        {locations.map((item) => {
                                            return <option value={item.location_id}>{`${item.name},${item.city}`}</option>
                                        })}
                                    </select>

                                    <div className="text-style sub-heading">cuisine</div>
                                    <div>
                                        <input type="checkbox" className="click-box" onChange={() => this.handleCuisineChange(1)} /><span className="filter-option">North
                                            Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" className="click-box" onChange={() => this.handleCuisineChange(2)} /><span className="filter-option">South
                                            Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" className="click-box" onChange={() => this.handleCuisineChange(3)} /><span className="filter-option">Chinese</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" className="click-box" onChange={() => this.handleCuisineChange(4)} /><span className="filter-option">Fast Food</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" className="click-box" onChange={() => this.handleCuisineChange(5)} /><span className="filter-option">Street
                                            Food</span>
                                    </div>

                                    <div className="text-style sub-heading">Cost For Two</div>
                                    <div>
                                        <input type="radio" className="click-box" name="sort" onChange={() => this.handleCostChange(1, 500)} /><span className="filter-option">Less than
                                            &#8377;{500}</span>
                                    </div>
                                    <div>
                                        <input type="radio" className="click-box" name="sort" onChange={() => this.handleCostChange(500, 1000)} /><span className="filter-option">&#8377;{500} to
                                            &#8377;{1000}</span>
                                    </div>
                                    <div>
                                        <input type="radio" className="click-box" name="sort" onChange={() => this.handleCostChange(1000, 1500)} /><span className="filter-option">&#8377;{1000} to
                                            &#8377;{1500}</span>
                                    </div>
                                    <div>
                                        <input type="radio" className="click-box" name="sort" onChange={() => this.handleCostChange(1500, 2000)} /><span className="filter-option">&#8377;{1500} to
                                            &#8377;{2000}</span>
                                    </div>
                                    <div>
                                        <input type="radio" className="click-box" name="sort" onChange={() => this.handleCostChange(2000, 5000)} /><span className="filter-option">&#8377;{2000} to
                                            &#8377;{2500}</span>
                                    </div>
                                    <div className="text-style sub-heading">Sort</div>
                                    <div>
                                        <input type="radio" name="sort" className="click-box" onChange={() => this.handleSortChange(1)} /><span className="filter-option">Price low to
                                            high</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="sort" className="click-box" onChange={() => this.handleSortChange(-1)} /><span className="filter-option">Price high to
                                            low</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-12">

                        {restaurants.length > 0 ? restaurants.map(item => {
                            return <div className="item" onClick={()=> this.handleNavigate(item._id)}>
                                <div className="box1">
                                    <div className="img">
                                        <img src={`./${item.image}`} style={{ width: "100%", height: "100%", borderRadius: "10" }} alt="" />
                                    </div>
                                    <div className="text">
                                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.name}</div>
                                        <div>{item.locality}</div>
                                        <div style={{ color: 'gray' }}>{item.city}</div>
                                    </div>
                                </div>
                                <hr style={{ margin: '5px 15px 8px 15px', color: 'blue' }} />
                                <div className="box2">
                                    <div className="box2-list">
                                        <span style={{ color: 'gray' }}>CUISINES:</span>
                                        <span style={{ marginLeft: '60px' }}>{item.cuisine.map(cuisineItem => { return `${cuisineItem.name}, ` })}</span>
                                    </div>
                                    <div className="box2-list">
                                        <span style={{ color: 'gray' }}>COST FOR TWO:</span>
                                        <span style={{ marginLeft: "20px" }}>&#8377;{item.min_price}</span>
                                    </div>
                                </div>

                            </div>
                        }) : <div className="No-record">No Records Found...</div>}

                        {restaurants.length > 0 ?
                            <div className="pagination">
                                <span className="fas fa-hand-point-left page"></span>
                                {pageCount.map(pageNo => {
                                    return <span className="page" onClick={()=>this.handlePageChange(pageNo)}>{pageNo}</span>
                                })}

                                <span className="fas fa-hand-point-right page"></span>
                            </div> : null}


                    </div>


                </div>
            </div>


        )
    }
}
export default Filter;