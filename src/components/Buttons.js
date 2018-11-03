import React, {Component} from 'react';
import '../Quotes.css'
class Buttons extends Component{
render(){
    return(
        <div>
        <button id = "btn" onClick = {this.props.onClick}> Change Color </button>
        </div>
    )
}
}
export default Buttons;