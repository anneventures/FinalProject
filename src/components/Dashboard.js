import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import formula from './Formula/formula'

import { LOCAL_STRAGE_KEY } from '../utils/Settings'

//semantic-ui
import { Container, Form, Input, Button, Grid, Header } from 'semantic-ui-react'


// API
import * as MyAPI from '../utils/MyAPI'

//chart
import FormulaChart from './Formula/FormulaChart';

class Dashboard extends Component {

  state = {
    income: 0,
    showGraph: false
  }

  onSubmit = () => {
    console.log("income" + this.state.income +" data: " + this.data)
    // after user enters annual income and clicks Submit button

    this.setState ({showGraph: true})


    this.props.history.push("/formula")


    // const { income } = this.state
    // const params = {
    //   income: income,
    // }

  }  

  logoutRequest = () => {

    const { user } = this.props

    const param = {
      login_token: user.login_token
    }

    MyAPI.logout(param)
    .then((results) => {
      localStorage.removeItem(LOCAL_STRAGE_KEY);
      this.props.history.push("/")
    })
    .catch((err) => {
      console.log("err: ", err)
      localStorage.removeItem(LOCAL_STRAGE_KEY);
      this.props.history.push("/")
    })
  }


    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
      }
      

  render() {

    const { user } = this.props

    const { income } = this.state
    const formulaLabels = formula.map(formula => formula.Category);
    let formulaData = formula.map(formula => (formula.Percent*income/100/12).toFixed(2));
    
    const data = {
      labels: formulaLabels,
      datasets: [{
        data: formulaData,
        backgroundColor: [
          'red',
          'grey',
          'orange',
          'blue',
          'yellow',
          'lightgreen',
          'purple',
          'magenta',
          'cyan'
          ],
          hoverBackgroundColor: [
          ]
    
      }]
    };
    

    return(
      <div className='dashboard' style={{textAlign: 'center'}}>

        <div style={{marginTop:60}}>
          <div>
            <span style={{cursor: 'pointer'}} onClick={() => this.logoutRequest()}>logout</span>
          </div>
        </div>

        <div>
          <div>
            { JSON.stringify(user)}

            <Container text className='create_acount_form'>

            <Form onSubmit={this.onSubmit} style={{marginTop:60}}>
              
            <Grid>
            <Grid.Column textAlign='left' width={16}>              
              <Header as='h1'>What is your annual income?</Header>
              <p>Please enter you annual income below then click the <em>Calculate</em> button to see how much of your income you should save towards your goal(s).</p>
              <Input
                style={{width: '100%'}}
                icon='dollar sign'
                iconPosition='left'
                name='income'
                onChange={this.handleChange}
                value={income}
                placeholder='40000' /> 
            </Grid.Column>
                
            <Grid.Column width={16}>
              <Button
                style={{width: '100%'}}
                loading={this.state.loading}
                disabled={this.state.loading}
                type='submit'>Calculate</Button>
            </Grid.Column>
            
            <Grid.Column width={16}>
            {this.state.showGraph ? <FormulaChart
            data = {this.data}
            /> : null }
            </Grid.Column>

            {/* <Grid.Column textAlign='left' width={16}>
              <Header as='h2'>Savings</Header>
              <p>Based on your income, you should be saving the following amount towards your goal(s):</p>
                <Header sub>Goal 1:</Header> {this.state.goalOne}
                <Header sub>Goal 2:</Header> {this.state.goalTwo}
                <Header sub>Goal 3:</Header> {this.state.goalThree}

            </Grid.Column> */}

          </Grid>
        </Form>
        </Container>


          </div>
        </div>

      </div>
    )
  }
}
// react-redux
function mapStateToProps ( {user} ) {
  return {
    user
  }
}

// export default withRouter(MainPage);
export default withRouter( connect( mapStateToProps )(Dashboard) )
