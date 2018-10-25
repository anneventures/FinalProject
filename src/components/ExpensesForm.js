import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

// semantic-ui
import { Container, Form, Input, Button, Grid } from 'semantic-ui-react'

class ExpensesForm extends Component {

    state = {
        income: 0,
        housing: 0,
        utilities: 0,
        transportation: 0,
        food: 0,
        entertainment: 0,
        debt: 0,
        personal: 0,
        savings: 0
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
      }

    onSubmit = () => {

//            handle the form submit
    }
    
      render() {
    
        const { income, housing, utilities, transportation, food, entertainment, debt, personal, savings } = this.state
    
        return(
          <Container text className='create_acount_form'>
          
            <Form onSubmit={this.onSubmit} style={{marginTop:60}}>
              <Grid>
    
                <Grid.Column textAlign='left' width={16}>
                  <label>Income</label>
                  <Input
                    style={{width: '100%'}}
                    name='income'
                    onChange={this.handleChange}
                    value= {income}
                    placeholder='annual income' />
                </Grid.Column>
    
                <Grid.Column textAlign='left' width={16}>
                  <label>Housing</label>
                  <Input
                    style={{width: '100%'}}
                    name='housing'
                    onChange={this.handleChange}
                    value={housing}
                    placeholder='rent/mortgage payments' />
                </Grid.Column>

                 <Grid.Column textAlign='left' width={16}>
                  <label>Utilities</label>
                  <Input
                    style={{width: '100%'}}
                    name='utilities'
                    onChange={this.handleChange}
                    value={utilities}
                    placeholder='utilities' />
                </Grid.Column>

                 <Grid.Column textAlign='left' width={16}>
                  <label>Transportation</label>
                  <Input
                    style={{width: '100%'}}
                    name='transportation'
                    onChange={this.handleChange}
                    value={transportation}
                    placeholder='Gas, insurance, metropass and taxis ' />
                </Grid.Column>

                 <Grid.Column textAlign='left' width={16}>
                  <label>Food</label>
                  <Input
                    style={{width: '100%'}}
                    name='food'
                    onChange={this.handleChange}
                    value={food}
                    placeholder='annual income' />
                </Grid.Column>

                 <Grid.Column textAlign='left' width={16}>
                  <label>Entertainment</label>
                  <Input
                    style={{width: '100%'}}
                    name='entertainment'
                    onChange={this.handleChange}
                    value={entertainment}
                    placeholder='Movies, concerts, etc.' />
                </Grid.Column>

                 <Grid.Column textAlign='left' width={16}>
                  <label>Debt</label>
                  <Input
                    style={{width: '100%'}}
                    name='debt'
                    onChange={this.handleChange}
                    value={debt}
                    placeholder='Monthly debt payments' />
                </Grid.Column>

                 <Grid.Column textAlign='left' width={16}>
                  <label>Personal</label>
                  <Input
                    style={{width: '100%'}}
                    name='income'
                    onChange={this.handleChange}
                    value={personal}
                    placeholder='Clothing, Cosmetics, etc.' />
                </Grid.Column>

                 <Grid.Column textAlign='left' width={16}>
                  <label>Savings</label>
                  <Input
                    style={{width: '100%'}}
                    name='income'
                    onChange={this.handleChange}
                    value={savings}
                    placeholder='savings' />
                </Grid.Column>

                <Grid.Column  width={16}>
                  <Button
                    style={{width: '100%'}}
                    type='submit'>Submit</Button>
                </Grid.Column>
    
              </Grid>
    
            </Form>
    
          </Container>
        )
    }
}
// react-redux
function mapStateToProps ( {user} ) {
  return {
    user
  }
}

export default withRouter( connect( mapStateToProps)(ExpensesForm));
