import { SEARCH_ISSUES_REQUEST, SEARCH_ISSUES_SUCCESS, SEARCH_ISSUES_FAILED, URL_API } from '../constants/constants'

export let search = (payload) => {
  return (dispatch) => {
    const searchObject = payload.q;

    dispatch({
      type: SEARCH_ISSUES_REQUEST
    })

    if(payload.q === ''){
      return dispatch({
        type: SEARCH_ISSUES_SUCCESS,
        payload: {
          results: [],
          meta: {
            total_count: 0
          }
        }
      })
    }

    fetch(URL_API + '/repos/' + searchObject.user + '/' + searchObject.repo + '/issues?state=all&page=' + searchObject.offset + '&per_page=' + searchObject.limit)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            dispatch({
                type: SEARCH_ISSUES_SUCCESS,
                payload: {
                    results: json
                }
            })
        }).catch(function(ex) {
            dispatch({
              type: SEARCH_ISSUES_FAILED
            })
            console.log('parsing failed', ex);
    })
  }
}