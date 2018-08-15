import * as actionTypes from '../actions/actionTypes'

const initState = {
  user: {},
  loading: false
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_START:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.FETCH_USER:
      return {
        user: action.userData || false,
        loading: false,
      }
    default:
      return state
  }
}
