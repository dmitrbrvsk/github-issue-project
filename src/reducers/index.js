import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; 

import SearchIssues from './SearchIssues';
import SearchRepos from './SearchRepos';
import IssuePage from './IssuePage';

export default combineReducers({
    routing: routerReducer,
    search_issues: SearchIssues,
    search_repos: SearchRepos,
    page_issue: IssuePage
})
