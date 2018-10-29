import React, {Component} from 'react';

class QuoteItem extends Component{
    render(){
        return(
            <li className = "Quote">
            <strong>{this.props.quote}</strong>
            </li>
            )
    }
}

export default QuoteItem;