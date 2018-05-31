import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as contentActions from '../actions/IssuePage'

import Header from './Header'
import Issue from './Issue'
import Loader from './Loader'

class IssuesPage extends Component {
	componentWillMount() {
		const { id, user, repo } = this.props.params

		this.props.actions.loadIssue({
			id,
			user,
			repo
		})
	}

	render() {
		return (
			<div className='main-container'>
				<Header />
				{this.props.issue.loading ? (
					<Loader />
				) : (
					!this.props.issue.loading && this.props.issue.loaded_issue &&
						<Issue issue={ this.props.issue.loaded_issue } />
				)}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	issue: state.page_issue
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(contentActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(IssuesPage)
