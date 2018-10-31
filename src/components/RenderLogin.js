import React from 'react';
import {Redirect} from 'react-router-dom';
import '../Quotes.css'


class RenderLogin extends React.Component{

constructor(props){
    super(props)
    this.state= {
        redirect: false
    }
    this.setRedirect = this.setRedirect.bind(this)
}    

setRedirect =() => {
    this.state({
        redirect : true
    })
   
}

renderRedirect = () => {
    if (this.state.redirect) {
        console.log('Redirecting')
        return <Redirect to='/' />
}
}

render(){
    

    return (
        <div>
        {this.renderRedirect()}
        <button className ="btn btn-dark btn-block btn-text" onClick={this.setRedirect}>Login </button>
        </div>
    )
    }
}

export default RenderLogin;