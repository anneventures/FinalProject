import React, {Component} from 'react';
import '../Quotes.css'
class Buttons extends Component{
render(){
    return(
        <div>
        <button id = "butn" onClick = {this.props.onClick}> New Quote </button>
        </div>
    )
}
}
export default Buttons;