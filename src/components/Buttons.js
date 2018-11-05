import React, {Component} from 'react';
import '../Quotes.css'
class Buttons extends Component{
render(){
    return(
        <div className='btnBox'>
        <button id = "btn btn-Quote" onClick = {this.props.onClick}> Inspire me </button>
        </div>
    )
}
}
export default Buttons;