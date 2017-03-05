import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; 

import SearchIssues from './SearchIssues';
import Issue from './Issue';

export default combineReducers({
    routing: routerReducer,
    issues: SearchIssues,
    issue: Issue
})
