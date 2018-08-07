import parse from 'parse-link-header'
import {
	SEARCH_ISSUES_REQUEST,
	SEARCH_ISSUES_SUCCESS,
	SEARCH_ISSUES_FAILED,
	RESET,
	URL_API
} from '../constants'

export const search = payload => {
	return dispatch => {
		const searchObject = payload.q
		const { user, repo, offset, limit } = searchObject
		const url = `${URL_API}/repos/${user}/${repo}/issues?state=all&page=${offset}&per_page=${limit}`
		dispatch({
			type: SEARCH_ISSUES_REQUEST
		})

		if (searchObject === '') {
			return dispatch({
				type: SEARCH_ISSUES_SUCCESS,
				payload: {
					results: [],
					meta: {
						total_count: 0
					}
				}
			})
		}

		fetch(url)
			.then(response => {
				console.log(parse(response.headers.get('Link')))
				return response.json()
			}).then(json => {
				dispatch({
					type: SEARCH_ISSUES_SUCCESS,
					payload: {
						results: json
					}
				})
			}).catch(ex => {
				dispatch({
					type: SEARCH_ISSUES_FAILED
				})
				console.log('parsing failed', ex)
			})
	}
}

export const clearIssues = () => {
	return dispatch => {
		dispatch({
			type: RESET
		})
	}
}
