import { LOAD_ISSUE_REQUEST, LOAD_ISSUE_SUCCESS, LOAD_ISSUE_FAILED, URL_API } from '../constants/constants'

export let load_ussue = (payload) => {
  return (dispatch) => {
    // const id_issue = payload;

    dispatch({
      type: LOAD_ISSUE_REQUEST
    })

    // fetch(URL_API + '/repos/' + searchObject.user + '/' + searchObject.repo +'/issues/2246')
    //     .then(function(response) {
    //         return response.json()
    //     }).then(function(json) {
    //         dispatch({
    //             type: GET_ISSUE_SUCCESS,
    //             payload: {
    //                 results: json
    //             }
    //         })
    //     }).catch(function(ex) {
    //         dispatch({
    //           type: GET_ISSUE_FAILED
    //         })
    //         console.log('parsing failed', ex);
    // })
  }
}