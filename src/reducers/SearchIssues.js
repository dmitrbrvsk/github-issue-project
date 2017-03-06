import { SEARCH_ISSUES_REQUEST, SEARCH_ISSUES_SUCCESS, SEARCH_ISSUES_FAILED } from '../constants/constants';

const initialState = {
  loading: false,
  search_results: [],
  meta: {
    total_count: 0
  }
};

export default function SearchIssuesReducer (state = initialState, action) {

  switch (action.type) {

      case SEARCH_ISSUES_REQUEST:
        return {
          loading: true
        }

      case SEARCH_ISSUES_SUCCESS:
        return {
          loading: false,
          search_results: action.payload.results,
          meta: {
            total_count: action.payload.results.length
          }
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