import React, {Component} from 'react';
import '../Quotes.css'
class Buttons extends Component{
render(){
    return(
        <div id = 'butn'>
        <button id = "butn" onClick = {this.props.onClick}> Inspire me </button>
        </div>
    )
}
}
export default Buttons;