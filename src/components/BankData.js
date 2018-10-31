import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PlaidLink from 'react-plaid-link';
import plaid from 'plaid';

//Hi team, use this dummy code to log in to any of the banks:
//username: user_good
//password: pass_good

const CLIENT_ID = '5bccf13344fc260011e054b9';
const SECRET = '1ed5257d83985b9fa3b21a8456745f';
const PUBLIC_KEY = '0041305fbda5475f0b057587d99cff';

const KEY_ITEMS = 'items';

const getItems = () => {
  let items = JSON.parse(localStorage.getItem(KEY_ITEMS));
  if (!items) {
    items = {
      byID: {},
      allIds: [],
    };
    setItems(items);

  }
  return items;
}

const setItems = items => {
  localStorage.setItem(KEY_ITEMS, JSON.stringify(items))
}

const addItem = item => {
  const oldItems = getItems();
  if (oldItems.byID[item.id]){
    return;
  }

  const items = {
    byID :{
      ...oldItems.byID,
      [item.id]: item,
    },
    allIds: [...oldItems.allIds, item.id],

  };

  setItems(items);
}


class BankData extends Component {

  constructor(props){
    super(props);

    this.state = {
      items: getItems(),
      balance: 0,
      loading: false,
      error: null
    };

    this.client = new plaid.Client(CLIENT_ID, SECRET, PUBLIC_KEY, plaid.environments.sandbox)
  }

  componentWillMount() {
    this.fetchBalance();
  }

  fetchBalance() {
    const items = getItems();
  }

  fetchBalance() {
    const items = getItems();

    if (items.allIds.length > 0) {
      const item = items.byID[items.allIds[0]];
      const {accessToken} =item;
      this.setState({ ...this.state, loading: true });
      this.client
        .getBalance(accessToken, {})
        .then(res => {
          const balance = res.accounts.reduce((val, acct) => val + acct.balances.available, 0);
          this.setState({ ...this.state, balance, loading: false});
        })
        .catch(() => {
          this.setState({
            ...this.state,
            loading: false,
            error: 'Unable to get balance.',
          });
        });
    }
  }

  onItemLinked(publicToken, metadata) {
    const { institution_id: id, name } = metadata.institution;

    this.client
      .exchangePublicToken(publicToken)
      .then(res => {
        const {access_token: accessToken } = res;
        addItem({
          id,
          name,
          publicToken,
          accessToken,
        });

      this.fetchBalance();
      })
      .catch(() => {
        this.setState({
          ...this.state,
        error: 'Unable to authenticate with service',
        });
        
      });
  }
    
    
    render() {
      const { balance, loading, error } = this.state;
      const items = getItems();
      let value;
      if (loading) {
        value = 'Loading...';
      }else{
        value = `$${balance}}`;
      }
      
      return (
        <div>
          {!error && (
            <div>
              <h1>Balance</h1>
              <h2>{value}</h2>
              </div>
          )}
          {error && <h3>{error}</h3>}
          {items.allIds.length < 1 && (
            <div>
              <h3>Link to your bank account to view you account balance</h3>
              <PlaidLink
                  clientName="Budget+"
                  env="sandbox"
                  product={["auth", "transactions"]}
                  publicKey= {PUBLIC_KEY}
                  onExit={this.handleOnExit}
                  onSuccess={this.onItemLinked.bind(this)}
                  
              />
            </div>
            
          )}
          </div>
        
      )
    }
  }
 
  function mapStateToProps ( {user} ) {
    return {
      user
    }
  }
  
  export default withRouter( connect( mapStateToProps)(BankData));
  