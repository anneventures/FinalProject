import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../components/font.css'
import '../components/CreateAccount.css'
 


// semantic-ui
import { Container, Grid } from 'semantic-ui-react'

import CreateAccontForm from './CreateAccontForm'


class CreateAccont extends Component {

  render() {

    return(

      <Container className="create" style={{textAlign: 'center'}}>
      <div className="box1">
       <h1>BUDGET+</h1>

        <CreateAccontForm />


        <Grid style={{marginTop:40}}>

          <Grid.Column textAlign='center' width={16}>
            <Link to="/">Sign in</Link>
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
export default withRouter( connect( mapStateToProps )(CreateAccont) )
