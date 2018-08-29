import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from '@material-ui/core/TextField'
import ReactPaginate from 'react-paginate'

import { debounce } from 'throttle-debounce'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as SearchIssuesAction from '../../actions/SearchIssues'

import IssueList from '../../components/IssueList'
import Loader from '../../components/Loader'

class SearchIssues extends Component {
	state = {
		user: '',
		repo: '',
		offset: 0,
		perPage: 5,
		isDisibleSearchButton: true
	}

	componentDidMount() {
		this.props.actions.clearIssues()
	}

	search = debounce(600, q => {
		this.props.actions.search({ q })
		// TODO HOW TO GET COUNT iSSUES API GITHUB
		// this.setState({pageCount: Math.ceil(total_count / this.state.perPage)});
	})

	handleSearch = () => {
		const { user, repo } = this.state

		this.setState({
			user,
			repo
		})

		this.search({
			user,
			repo,
			limit: this.state.perPage,
			offset: this.state.offset
		})
	}

	checkDisibleSearchButton = () => {
		const { user, repo } = this.state
		const isDisibleSearchButton = !(user.length > 0 && repo.length > 0)
		this.setState({ isDisibleSearchButton })
	}

	handleChangeInput = event => {
		const { name, value } = event.target
		this.setState({ [name]: value }, () => {
			this.checkDisibleSearchButton()
		})
	}

	handlePageClick = data => {
		const { selected } = data
		const offset = Math.ceil(selected * this.state.perPage)
		this.setState({ offset }, () => this.handleSearch())
	}

	handleUpdateCountIssue = e => {
		const countIssue = e.target.value
		this.setState({ perPage: countIssue }, () => {
			if (!this.state.isDisibleSearchButton) this.handleSearch()
		})
	}

	render() {
		const { user, repo } = this.state
		const searchData = { userSearch: user, repoSearch: repo }
		const { issues } = this.props
		const isVisiblePagination = (!issues.loading && issues.search_results.length > 0) ? 'show-pagination' : ''

		return (
			<MuiThemeProvider>
				<Paper>
					<form className='form-search'>
						<TextField
							name='user'
							className='fs-input'
							onChange={ this.handleChangeInput }
							fullWidth
							placeholder='reactjs'
							label='Введите имя пользователя'
							margin='normal'
						/>
						<TextField
							name='repo'
							className='fs-input'
							onChange={ this.handleChangeInput }
							fullWidth
							placeholder='redux'
							label='Введите название репозитория'
							margin='normal'
						/>
						<TextField
							defaultValue='5'
							label='Количество элементов отображаемых на странице'
							fullWidth
							onChange={ this.handleUpdateCountIssue }
							margin='normal'
						/>
						<Button
							variant='contained'
							fullWidth
							onClick={ this.handleSearch }
							disabled={ this.state.isDisibleSearchButton }
						>
							Поиск
						</Button>
					</form>
					{issues.loading ? (
						<Loader />
					) : (
						issues.search_results.length > 0 &&
							<IssueList
								issueList={ issues.search_results }
								searchData={ searchData }
							/>
					)}
					<ReactPaginate
						previousLabel='previous'
						nextLabel='next'
						breakLabel={ <a href=''>...</a> }
						breakClassName='break-me'
						pageCount={ 10 }
						marginPagesDisplayed={ 2 }
						pageRangeDisplayed={ 5 }
						onPageChange={ this.handlePageClick }
						containerClassName={ `pagination ${isVisiblePagination}` }
						subContainerClassName='pages pagination'
						activeClassName='active'
						pageClassName='pagination-item'
						pageLinkClassName='pagination-item-link'
					/>
				</Paper>
			</MuiThemeProvider>
		)
	}
}

const mapStateToProps = state => ({
	issues: state.search_issues
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(SearchIssuesAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchIssues)
