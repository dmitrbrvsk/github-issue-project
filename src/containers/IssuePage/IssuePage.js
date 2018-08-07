import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as contentActions from '../../actions/IssuePage'

import Header from '../../components/Header'
import Issue from '../../components/Issue'
import Loader from '../../components/Loader'

class IssuesPage extends Component {
	componentDidMount() {
		const { id, user, repo } = this.props.match.params

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
