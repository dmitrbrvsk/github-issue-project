import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; 

import SearchIssues from './SearchIssues';
import IssuePage from './IssuePage';

export default combineReducers({
    routing: routerReducer,
    issues: SearchIssues,
    issue: IssuePage
})
