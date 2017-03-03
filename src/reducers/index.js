import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; 

import SearchIssues from './SearchIssues';

export default combineReducers({
    routing: routerReducer,
    issues: SearchIssues
})
