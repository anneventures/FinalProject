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
  

  onClick(){
    this.getQuote();
   
  }
  
  render() {
    return (
      
<div className = "quoteApp">
      
      <h2 className ="header"><strong>BUDGET+</strong></h2>
     
      
       
      <QuoteBox />
      <div className="btn-group">
    
      <Buttons onClick = {this.onClick}
       />
       </div>
    <span id = "footer">
    <RenderLogin/> 
   
    </span>   
      </div> 

     
     
    );
  }
}

export default QuoteApp;
