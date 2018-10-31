import React, { Component } from 'react';
import '../Quotes.css'
import '../App.css'

import Quote from './Quote';
import RenderLogin from './RenderLogin';

class QuoteApp extends Component {
  constructor(props){
    super(props); 
    this.state = {
      quotes: []
    }
  }

  componentDidMount(){
    this.setState({ 
    quotes: [{quote: "'The difference between succeeding and failing is consistency.'"
  }]
  })
  }

  render() {
    return (
      

      <div className="jumbotron jumbotron-fluid">
      <h2 className ="header"><strong>BUDGET+</strong></h2>
      <RenderLogin/> <br/>
      <Quote quote = {this.state.quotes} />
      <div className="App-bg">
      
            
      </div>   
     
    
      
      </div>
    );
  }
}

export default QuoteApp;
