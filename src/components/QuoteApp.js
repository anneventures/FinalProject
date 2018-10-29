import React, { Component } from 'react';
import '../Quotes.css'
import '../App.css'

import Quote from './Quote';
import RenderLogin from './RenderLogin';

class App extends Component {
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
      <div className="background">
      <div className="App">

      <div className="jumbotron">
      <h2 className ="header"><strong>BUDGET+</strong></h2>
      <Quote quote = {this.state.quotes} />
      </div>
      </div>
    
     <RenderLogin/>
    
      
      </div>
    );
  }
}

export default App;
