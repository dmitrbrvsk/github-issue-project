import { SEARCH_REPOS_REQUEST, SEARCH_REPOS_SUCCESS, SEARCH_REPOS_FAILED, RESET, URL_API } from '../constants/constants'

export let searchRepos = (payload) => {
  return (dispatch) => {
    const searchUser = payload.q;
    dispatch({
      type: SEARCH_REPOS_REQUEST
    })

    if(payload.q === ''){
      return dispatch({
        type: SEARCH_REPOS_SUCCESS,
        payload: {
          results: [],
        }
      })
    }

    fetch(URL_API + '/users/' + searchUser + '/repos?access_token=153cffde38f6085cd0fca9e0cb31232b45bbad0c')
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            dispatch({
                type: SEARCH_REPOS_SUCCESS,
                payload: {
                    results: json
                }
            })
        }).catch(function(ex) {
            dispatch({
              type: SEARCH_REPOS_FAILED
            })
            console.log('parsing failed', ex);
    })
  }
}

export let clearRepos = (payload) => {
   return (dispatch) => {
      dispatch({
        type: RESET
      })
   }
}