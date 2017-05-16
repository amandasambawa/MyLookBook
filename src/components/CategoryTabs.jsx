import React, { Component } from 'react';
import { auth } from '../firebase.js';
import '../styles/CategoryTabs.css';


class CategoryTabs extends Component {
    constructor(){
        super();
        this.state = {
            selected:''
        };
        this.setFilter = this.setFilter.bind(this);
        this.isActive = this.isActive.bind(this);
    }

    setFilter(filter) {
        this.setState({selected: filter});
    }

    isActive(value){
        return 'btn '+((value===this.state.selected) ?'active':'default');
    }

    render() {
    return (
        <div className="flex-container">
            <div className={'flex-item item1 ' + this.isActive('tops')} onClick={this.setFilter.bind(this, 'tops')}>Tops</div>
            <div className={'flex-item item2 ' + this.isActive('bottoms')} onClick={this.setFilter.bind(this, 'bottoms')}>Bottoms</div>
            <div className={'flex-item item3 ' + this.isActive('shoes')} onClick={this.setFilter.bind(this, 'shoes')}>Shoes</div>
            <div className={'flex-item item4 ' + this.isActive('accessories')} onClick={this.setFilter.bind(this, 'accessories')}>Accessories</div>
        </div>)
}

}


export default CategoryTabs;
