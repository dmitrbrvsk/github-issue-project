import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import SearchIssues from './SearchIssues'
import IssuePage from './IssuePage'

export default combineReducers({
	search_issues: SearchIssues,
	page_issue: IssuePage,
	routing: routerReducer
})

