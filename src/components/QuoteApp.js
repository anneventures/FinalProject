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

  changeBg(){
    var colors = [ "grey", "#FFE4C4", "#00FFF", "BDB76B", "E9967A"];
    var randColor = Math.floor( Math.random() * colors.length )
    document.body.style.background = colors[randColor];

    document.getElementById('btn').style.color = colors[randColor];
  }

  onClick(){
    this.getQuote();
    this.changeBg();
  }
  
  render() {
    return (
      
<div>
      
      <h2 className ="header"><strong>BUDGET+</strong></h2>
      <br/>
      
       
       <div>
       <div className="App-bg">
      <QuoteBox />
      <div className="btn-group">
    
      <Buttons onClick = {this.onClick}
       />

       <RenderLogin/> 
    </div>  

      
      
            
      </div>   
     
    
      </div>
      </div>
    );
  }
}

export default QuoteApp;
