import React from 'react';
import Buttons from './Buttons';
class QuoteBox extends React.Component{

render(){
return(
<div className="quoteBox">
    <span id="quoteTxt">
        <p>
        Every child is an artist. The challenge is to remain an artist after you grow up.
        </p>
    </span>
<span id="author">— Pablo Picasso 
</span>
</div>
    );
  }
}
        
export default QuoteBox;