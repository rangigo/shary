import * as actionTypes from '../actions/actionTypes'

const initState = null

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return action.userData || false
    default:
      return state
  }
}
