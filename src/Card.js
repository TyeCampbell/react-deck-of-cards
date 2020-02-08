import React, {Component} from 'react';


class Card extends Component {
    
    
    render() {
        return (
            <div>
                <img src={this.props.image}></img>
            </div> 
        )
    }
}


export default Card; 