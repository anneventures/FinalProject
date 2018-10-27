import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Container, Grid } from 'semantic-ui-react'

import CreateAccountForm from './CreateAccountForm'

class CreateAccount extends Component {
	render() {
		return (
			<Container className='create_account' style={{textAlign: 'center'}}>       		

				<Grid style={{marginTop:60}}>
					<Grid.Column textAlign='right' width={16}>
						<Link to="/">Sign in</Link>
					</Grid.Column>
				</Grid>

			<CreateAccountForm />
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

export default withRouter ( connect( mapStateToProps )(CreateAccount))
