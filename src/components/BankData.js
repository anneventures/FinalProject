import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PlaidLink from 'react-plaid-link'


const PLAID_CLIENT_ID= '5bccf13344fc260011e054b9'
const PLAID_SECRET= '1ed5257d83985b9fa3b21a8456745f'
const PLAID_PUBLIC_KEY= '0041305fbda5475f0b057587d99cff'
const PLAID_ENV= 'sandbox'


class BankData extends Component {
  handleOnSuccess(token, metadata) {
    console.log(token);
    console.log(metadata);
   
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
        onSuccess={this.handleOnSuccess}>
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