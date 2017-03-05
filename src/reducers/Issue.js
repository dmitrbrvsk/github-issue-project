import { LOAD_ISSUE_REQUEST, LOAD_ISSUE_SUCCESS, LOAD_ISSUE_FAILED, URL_API } from '../constants/constants'

const initialState = {
  loading: false,
  loaded_ussue: []
};

export default function IssueReducer (state = initialState, action) {

  switch (action.type) {

      case LOAD_ISSUE_REQUEST:
        return {
          loading: true
        }

      case LOAD_ISSUE_SUCCESS:
        return {
          loading: false,
          loaded_issue: action.payload.results
        }

      case LOAD_ISSUE_FAILED:
        return {
          loading: false,
          loaded_issue: []
        }

      default:
        return state;
  }
}