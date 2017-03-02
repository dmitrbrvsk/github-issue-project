import { SEARCH_ISSUES_REQUEST, SEARCH_ISSUES_SUCCESS, SEARCH_ISSUES_FAILED } from '../constants/constants';

const initialState = {
  loading: false,
  search_results: [],
  items: ['issue 1','issue 2','issue 3']
};

export default function issueList(state = initialState, action) {

  switch (action.type) {
    
    case 'ADD_ISSUE':
      return [
        ...state,
        action.payload
      ];

      case SEARCH_ISSUES_REQUEST:
        return {
          loading: true
        }

      case SEARCH_ISSUES_SUCCESS:
        return {
          loading: false,
          search_results: action.payload.results
        }

      case SEARCH_ISSUES_FAILED:
        return {
          loading: false,
          search_results: []
        }

      default:
        return state;
  }
}