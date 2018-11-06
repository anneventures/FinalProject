import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import '../components/font.css'
import '../Quotes.css'

// semantic-ui
import { Container, Grid } from 'semantic-ui-react'

import LoginForm from './LoginForm'

class Home extends Component {

  render() {

    return(
    // <div className='box1'>  
      <Container className='home'>
      <div className='box1'>
       <h1>BUDGET+</h1>
      

        <LoginForm />

        <Grid style={{marginTop:40}}>
          <Grid.Column textAlign='center' width={16}>
            <Link to="/create_acount">Create an account</Link>
          </Grid.Column>
        </Grid>
        </div>
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

// export default withRouter(MainPage);
export default withRouter( connect( mapStateToProps )(Home) )
