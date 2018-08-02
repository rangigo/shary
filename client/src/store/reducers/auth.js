import * as actionTypes from '../actions/actionTypes'

const initState = {}

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return action.userData || false
    default:
      return state
  }
}
