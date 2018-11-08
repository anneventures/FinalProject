import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PlaidLink from 'react-plaid-link'
import * as MyAPI from '../utils/MyAPI'

const api = "http://localhost:4002"


const PLAID_CLIENT_ID= '5bccf13344fc260011e054b9'
const PLAID_SECRET= '1ed5257d83985b9fa3b21a8456745f'
const PLAID_PUBLIC_KEY= '0041305fbda5475f0b057587d99cff'
const PLAID_ENV= 'sandbox'


class BankData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      balance: 0,
      loading: false,
      error: null,
    };
  }

  

  handleOnSuccess(token, metadata) {
    console.log(token);
    console.log(metadata);
    

    
    let someFn = (data) => {
      console.log(JSON.stringify(data));
      localStorage.setItem('access_token', data.access_token);
    } 

    let anotherFn = (data) => {
      console.log(JSON.stringify(data));
    }

    MyAPI.get_access_token(`${api}/get_access_token`, {public_token: token})
    .then(someFn).catch(err => console.error(err));

    MyAPI.get_balance(`${api}/get_balance`)
    .then(anotherFn).catch(err => console.log(err));
    
    
    
   
  }
  handleOnExit() {
    // handle the case when your user exits Link
  }
  render() {
    return (
      <PlaidLink
        clientName="Budget +"
        env="sandbox"
        product={["auth", "transactions"]}
        publicKey = {PLAID_PUBLIC_KEY}
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess.bind(this)}>
        Open Link and connect your bank!
      </PlaidLink>
    )
  }
}
function mapStateToProps ( {user} ) {
  return {
    user
  }
}

export default withRouter( connect( mapStateToProps)(BankData));