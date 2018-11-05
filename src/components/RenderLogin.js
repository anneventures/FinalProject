import React from 'react';
import {Redirect} from 'react-router-dom';

import {Link} from 'react-router-dom'

class RenderLogin extends React.Component{



render(){
    

    return (
        <div>
        <Link to = '/home'>
        <button id = "btn" className="btn btn-lg btn-block">
        <div className = "Login">Login</div> </button>
        </Link>
       
        </div>
    )
    }
}

export default RenderLogin;