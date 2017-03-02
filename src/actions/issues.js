import { SEARCH_ISSUES_REQUEST, SEARCH_ISSUES_SUCCESS, SEARCH_ISSUES_FAILED, URL_API } from '../constants/constants'

export let search = (payload) => {
  return (dispatch) => {
    const searchString = payload.q
    console.log('searchString',searchString)

    dispatch({
      type: SEARCH_ISSUES_REQUEST
    })

    if(payload.q === ''){
      return dispatch({
        type: SEARCH_ISSUES_SUCCESS,
        payload: {
          results: []
        }
      })
    }

    fetch(URL_API + '/search/repositories?q=' + searchString +  '+user:reactjs')
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            console.log('parsed json', json);
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