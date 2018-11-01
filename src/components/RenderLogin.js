import React from 'react';
import {Redirect} from 'react-router-dom';

import {Link} from 'react-router-dom'

class RenderLogin extends React.Component{



render(){
    

    return (
        <div>
        <Link to = '/'>
        <button id = "btn">
        <div className = "Login">Login</div> </button>
        </Link>
       
        </div>
    )
    }
}

export default RenderLogin;