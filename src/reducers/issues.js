import { SEARCH_REQUEST, SEARCH_SUCCESS } from '../constants/constants';

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

      case SEARCH_REQUEST:
        return {
          loading: true
        }

      case SEARCH_SUCCESS:
        return {
          loading: false,
          search_results: action.payload.results
        }

      default:
        return state;
  }
}