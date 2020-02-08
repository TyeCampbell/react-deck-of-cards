import React, {Component} from 'react';


class Card extends Component {
    
    
    render() {
        return (
                <img src={this.props.image}></img>
        )
    }
}


export default Card; 