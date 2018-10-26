import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import PlaidLink from 'react-plaid-link';



const CLIENT_ID = '5bccf13344fc260011e054b9';
const SECRET = '1ed5257d83985b9fa3b21a8456745f';
const PUBLIC_KEY = '0041305fbda5475f0b057587d99cff';


class BankData extends Component {
    handleOnSuccess(token, metadata) {
      // send token to client server
    }
    handleOnExit() {
      // handle the case when your user exits Link
    }
    render() {
      return (
        <PlaidLink
          clientName="Your app name"
          env="sandbox"
          product={["auth", "transactions"]}
          publicKey= {PUBLIC_KEY}
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}>
          Open Link and connect your bank!
        </PlaidLink>
      )
    }
  }
  export default BankData