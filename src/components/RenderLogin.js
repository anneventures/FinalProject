import React from 'react';
import {Redirect} from 'react-router-dom';

import {Link} from 'react-router-dom'

class RenderLogin extends React.Component{



render(){
    

    return (
        <div>
        <footer>
        <Link to = '/'>
        <button id = "btn btn-primary btn-lg btn-block">
        Login </button>
        </Link>
        </footer>
        
       
        </div>
    )
    }
}

export default RenderLogin;