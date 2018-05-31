import {
	LOAD_ISSUE_REQUEST,
	LOAD_ISSUE_SUCCESS,
	LOAD_ISSUE_FAILED,
	URL_API
} from '../constants/constants'

export const loadIssue = payload => {
	return dispatch => {
		dispatch({
			type: LOAD_ISSUE_REQUEST
		})

		fetch(`${URL_API}/repos/${payload.user}/${payload.repo}/issues/${payload.id}`)
			.then(response => {
				return response.json()
			}).then(json => {
				dispatch({
					type: LOAD_ISSUE_SUCCESS,
					payload: {
						results: json
					}
				})
			}).catch(ex => {
				dispatch({
					type: LOAD_ISSUE_FAILED
				})
				console.log('parsing failed', ex)
			})
	}
}
