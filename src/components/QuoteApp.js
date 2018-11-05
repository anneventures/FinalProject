import React, { Component } from 'react';
import '../Quotes.css'

import '../App.css'

import QuoteBox from './QuoteBox';
import Buttons from './Buttons'
import RenderLogin from './RenderLogin';

class QuoteApp extends Component {
  constructor(props){
    super(props); 
    this.state = {};
    this.onClick = this.onClick.bind(this)
  }

componentDidMount(){
  var now = Date.now();
  fetch(this.props.src + now)
  .then(response =>{
    return response.json();
  })
  .then(quote => {
    this.setState({
      quote : quote[0].content,
      title : quote[0].title
    });
  });
}
getQuote() {
  var now = Date.now();
  fetch(this.props.src + now)
  .then(response =>{
    return response.json();
  })
  .then(quote => {
    this.setState({
      quote: quote[0].content,
      title: quote[0].title
    });
  }).then(this.display());
}

display(){
  let quote = this.state.quote;
  let author = this.state.title;

  document.getElementById("quoteTxt").innerHTML = quote;

  document.getElementById("author").innerHTML = "-" +author;
}
  //Change background/txt color onClick
  
  onClick(){
    this.getQuote();
    
  }
  
  render() {
    return (
      
<div className='homeApp'>
      
      <h1>BUDGET+</h1>

       <div className="App-bg">
        <div className ="quoteBox">
          <QuoteBox />
          <Buttons onClick = {this.onClick}
          />
          <RenderLogin/> 
       </div>

       {/* <RenderLogin/>  */}
    </div>  
</div>
      
    );
  }
}

export default QuoteApp;
