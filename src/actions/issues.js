import { SEARCH_REQUEST, SEARCH_SUCCESS, URL_API } from '../constants/constants'

export let search = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SEARCH_REQUEST
    })

    if(payload.q === ''){
      return dispatch({
        type: SEARCH_SUCCESS,
        payload: {
          results: []
        }
      })
    }

    fetch(URL_API + '/users/reactjs/repos')
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            console.log('parsed json', json);
            dispatch({
                type: SEARCH_SUCCESS,
                payload: {
                    results: json
                }
            })
        }).catch(function(ex) {
            console.log('parsing failed', ex);
    })
  }
}